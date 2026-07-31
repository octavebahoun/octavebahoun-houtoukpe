import {
  Suspense,
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdaptiveDpr,
  Billboard,
  Environment,
  Grid,
  Lightformer,
  Preload,
  Sparkles,
  Stars,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import { MODELS } from "../data/portfolioData";
import { WorldCtx, type Quality, type WorldApi } from "./worldContext";

/* ============================================================
   LE MONDE — une scène 3D unique, fixée derrière tout le site.
   Elle survit aux changements de route : seul le sujet au centre
   change, la caméra se déplace, le brouillard reste.
   Un seul contexte WebGL pour l'ensemble du portfolio.
   ============================================================ */

const FOG = "#150e2e";

/** Amplitude du balancement du sujet, en radians (~34° de part et d'autre). */
const SWING = 0.6;

/** Le sujet affiché par défaut sur chaque route. */
const ROUTE_SUBJECT: Record<string, string> = {
  "/": MODELS.profil,
  "/about": MODELS.trophy,
  "/projects": MODELS.chip,
  "/jarvis-lab": MODELS.vanguard,
  "/contact": MODELS.avatar,
};

/** Position de caméra propre à chaque salle. */
const ROUTE_CAMERA: Record<string, [number, number, number]> = {
  "/": [1.6, 0.5, 6.4],
  "/about": [-1.9, 0.9, 6.8],
  "/projects": [2.2, 0.2, 7],
  "/jarvis-lab": [0, 0.6, 6.2],
  "/contact": [-1.4, 0.3, 6.6],
};

/* ---------------- Le sujet au centre ---------------- */

/* Aucun clone n'est fait ici, et c'est délibéré : `scene.clone()` partage les
   géométries et les textures avec l'original géré par le cache de useGLTF, on
   ne peut donc pas les libérer sans casser l'original. Sur /projects, où le
   survol change de sujet en permanence, cloner ferait grimper la VRAM sans
   jamais rien rendre. On laisse la scène intacte et on porte le cadrage sur
   un groupe parent. */
function Subject({ url, sober }: { url: string; sober: boolean }) {
  const { scene } = useGLTF(url);
  const pivot = useRef<THREE.Group>(null);
  const born = useRef(0);

  const fit = useMemo(() => {
    /* La scène est mesurée à l'identité : on ne pose jamais de transform
       dessus, donc cette remise à zéro est un simple garde-fou. */
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);
    scene.scale.set(1, 1, 1);
    scene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const k = 3.4 / (Math.max(size.x, size.y, size.z) || 1);

    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = !sober;
        mesh.receiveShadow = !sober;
      }
    });

    return {
      scale: k,
      offset: [-center.x * k, -center.y * k, -center.z * k] as const,
    };
  }, [scene, sober]);

  useFrame((state, delta) => {
    const g = pivot.current;
    if (!g) return;

    const clock = state.clock.elapsedTime;

    /* Apparition : le sujet monte du brouillard et grandit. */
    born.current = Math.min(1, born.current + delta * 1.5);
    const t = 1 - Math.pow(1 - born.current, 3);
    g.scale.setScalar(0.72 + t * 0.28);
    g.position.y = Math.sin(clock * 0.55) * 0.16 - (1 - t) * 2;

    /* Balancement borné, pas de tour complet : un avatar qui présente
       son dos au visiteur n'accueille personne. Le curseur incline
       légèrement la pose par-dessus. */
    const swing = Math.sin(clock * 0.22) * SWING;
    g.rotation.y = THREE.MathUtils.lerp(
      g.rotation.y,
      swing + state.pointer.x * 0.28,
      0.04,
    );
    g.rotation.z = Math.sin(clock * 0.4) * 0.03;
  });

  return (
    <group ref={pivot}>
      <group scale={fit.scale} position={fit.offset}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

/* ---------------- Halos additifs (le bloom sans passe de rendu) ---------------- */

function Halo({
  position,
  color,
  size,
  opacity = 0.5,
  speed = 0.6,
  drift = 0,
}: {
  position: [number, number, number];
  color: string;
  size: number;
  opacity?: number;
  speed?: number;
  /** Amplitude de la dérive lente, en unités de scène. */
  drift?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const phase = useMemo(() => position[0] + position[1], [position]);

  /* Un dégradé radial peint dans un canvas : pas de texture à télécharger. */
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.42)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      mesh.current.scale.setScalar(1 + Math.sin(t * speed + phase) * 0.14);
    }
    /* La dérive empêche les halos de se figer : la nuit respire. */
    if (group.current && drift > 0) {
      group.current.position.x =
        position[0] + Math.sin(t * 0.13 + phase) * drift;
      group.current.position.y =
        position[1] + Math.cos(t * 0.09 + phase) * drift * 0.6;
    }
  });

  return (
    <group ref={group} position={position}>
      <Billboard>
        <mesh ref={mesh}>
          <planeGeometry args={[size, size]} />
          <meshBasicMaterial
            map={texture}
            color={color}
            transparent
            opacity={opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            fog={false}
          />
        </mesh>
      </Billboard>
    </group>
  );
}

/* ---------------- Caméra : scroll + curseur ---------------- */

function Rig({
  home,
  sober,
}: {
  home: [number, number, number];
  sober: boolean;
}) {
  const target = useRef(new THREE.Vector3(...home));
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const { camera, pointer: p, size } = state;

    /* Progression de la page, 0 en haut, 1 en bas. */
    const doc = document.documentElement;
    const span = doc.scrollHeight - window.innerHeight;
    const scroll = span > 0 ? doc.scrollTop / span : 0;

    const follow = sober ? 0 : 1;
    pointer.current.x += (p.x - pointer.current.x) * 0.05;
    pointer.current.y += (p.y - pointer.current.y) * 0.05;

    /* Travelling : on recule et on descend au fil du défilement,
       le curseur ajoute une parallaxe légère par-dessus. */
    target.current.set(
      home[0] + pointer.current.x * 1.1 * follow,
      home[1] + pointer.current.y * 0.6 * follow - scroll * 2.6,
      home[2] + scroll * 3.2,
    );

    const speed = 1 - Math.pow(0.001, delta);
    camera.position.lerp(target.current, speed);
    camera.lookAt(0, -scroll * 0.8, 0);

    /* Cadrage adapté aux écrans étroits. */
    const cam = camera as THREE.PerspectiveCamera;
    const wanted = size.width < 760 ? 58 : 46;
    if (Math.abs(cam.fov - wanted) > 0.1) {
      cam.fov += (wanted - cam.fov) * 0.1;
      cam.updateProjectionMatrix();
    }
  });

  return null;
}

/* ---------------- La scène ---------------- */

function Scene({
  subject,
  home,
  sober,
}: {
  subject: string;
  home: [number, number, number];
  sober: boolean;
}) {
  return (
    <>
      <fog attach="fog" args={[FOG, 7, 30]} />

      <ambientLight intensity={0.45} color="#c9c2ee" />
      <directionalLight position={[5, 7, 4]} intensity={2.4} color="#7c8cff" />
      <directionalLight position={[-6, 2, -4]} intensity={1.7} color="#e58bff" />
      <pointLight position={[3, -2, 3]} intensity={2} color="#ff7a18" distance={14} />
      {!sober && (
        <pointLight position={[-4, 1, 2]} intensity={1.4} color="#ff4d9d" distance={12} />
      )}

      <Environment resolution={sober ? 128 : 256}>
        <Lightformer intensity={3.2} color="#7c8cff" position={[0, 4, 3]} scale={[9, 9, 1]} />
        <Lightformer
          intensity={2.2}
          color="#e58bff"
          position={[-6, 1, -3]}
          rotation-y={Math.PI / 2}
          scale={[7, 7, 1]}
        />
        <Lightformer
          intensity={1.1}
          color="#ff7a18"
          position={[0, -5, 0]}
          rotation-x={Math.PI / 2}
          scale={[9, 9, 1]}
        />
      </Environment>

      {/* Le sol fuit vers l'horizon et se dissout dans le brouillard. */}
      <Grid
        position={[0, -2.6, 0]}
        args={[40, 40]}
        cellSize={0.7}
        cellThickness={0.6}
        cellColor="#3b4fe0"
        sectionSize={3.5}
        sectionThickness={1.1}
        sectionColor="#b44be8"
        fadeDistance={34}
        fadeStrength={1.4}
        infiniteGrid
        followCamera
      />

      {/* Profondeur : étoiles lointaines, poussière proche. */}
      <Stars
        radius={70}
        depth={40}
        count={sober ? 500 : 1400}
        factor={3.2}
        saturation={0}
        fade
        speed={sober ? 0 : 0.4}
      />
      {!sober && (
        <>
          <Sparkles count={70} scale={11} size={2.6} speed={0.32} opacity={0.55} color="#7c8cff" />
          <Sparkles count={40} scale={8} size={3.4} speed={0.2} opacity={0.4} color="#ff4d9d" />
        </>
      )}

      <Halo position={[-3.6, 1.4, -3]} color="#3b4fe0" size={7} opacity={0.34} speed={0.5} drift={sober ? 0 : 0.5} />
      <Halo position={[3.8, -0.8, -2.5]} color="#b44be8" size={6} opacity={0.3} speed={0.7} drift={sober ? 0 : 0.4} />
      <Halo position={[0.6, -2.1, 1.5]} color="#ff7a18" size={3.4} opacity={0.4} speed={0.9} drift={sober ? 0 : 0.3} />
      {!sober && (
        <Halo position={[-2.4, -1.9, 2]} color="#ff4d9d" size={2.8} opacity={0.35} speed={1.1} drift={0.35} />
      )}

      <Suspense fallback={null}>
        {/* La clé force une nouvelle animation d'apparition à chaque sujet. */}
        <Subject key={subject} url={subject} sober={sober} />
      </Suspense>

      <Rig home={home} sober={sober} />
      <AdaptiveDpr pixelated />
      <Preload all />
    </>
  );
}

/* ---------------- Réglage automatique du niveau de rendu ---------------- */

/* Décidé une fois, avant le premier rendu : une machine modeste, un petit
   écran ou un utilisateur qui a demandé moins de mouvement n'a pas à subir
   la scène complète. */
function initialQuality(): Quality {
  if (typeof window === "undefined") return "full";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return "off";

  const narrow = window.innerWidth < 760;
  const weak = (navigator.hardwareConcurrency ?? 8) <= 4;
  return narrow || weak ? "sober" : "full";
}

/* ---------------- Le composant exporté ---------------- */

export default function World({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [hovered, setHovered] = useState<string | null>(null);
  const [quality, setQuality] = useState<Quality>(initialQuality);

  const subject = hovered ?? ROUTE_SUBJECT[pathname] ?? MODELS.profil;
  const home = ROUTE_CAMERA[pathname] ?? ROUTE_CAMERA["/"];
  const sober = quality === "sober";

  const focus = useCallback((url: string | null) => setHovered(url), []);
  const api = useMemo<WorldApi>(
    () => ({ focus, quality, setQuality }),
    [focus, quality],
  );

  return (
    <WorldCtx value={api}>
      {quality !== "off" && (
        <div className="world" aria-hidden="true">
          <Canvas
            /* Plafonné à 2 : au-delà, le coût GPU quadruple sans gain visible. */
            dpr={[1, sober ? 1.25 : 1.8]}
            shadows={!sober}
            gl={{
              antialias: !sober,
              alpha: true,
              powerPreference: "high-performance",
            }}
            camera={{ position: home, fov: 46 }}
            /* Le canvas est décoratif : il ne doit jamais voler un clic. */
            style={{ pointerEvents: "none" }}
          >
            <Scene subject={subject} home={home} sober={sober} />
          </Canvas>
        </div>
      )}

      {children}
    </WorldCtx>
  );
}

useGLTF.preload(MODELS.profil);
