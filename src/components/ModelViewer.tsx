import {
  Suspense,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type Ref,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { MODELS } from "../data/portfolioData";

/* ============================================================
   Socle 3D — chargeur GLB normalisé, cadrage automatique
   sur la boîte englobante, éclairage de nuit bleu / violet.
   Les matériaux d'origine des modèles sont conservés tels quels.
   ============================================================ */

export type StageHandle = {
  reset: () => void;
  frontView: () => void;
  topView: () => void;
};

/** Demi-diagonale d'un cube de 2 unités : le modèle normalisé y tient toujours. */
const RADIUS = Math.sqrt(3);
const FOV = 40;

/** Distance de caméra qui fait tenir le modèle en entier, hauteur ET largeur. */
function frameDistance(aspect: number, padding: number) {
  const vFov = (FOV * Math.PI) / 180;
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * Math.max(aspect, 0.05));
  return (
    Math.max(RADIUS / Math.sin(vFov / 2), RADIUS / Math.sin(hFov / 2)) * padding
  );
}

type GltfProps = {
  url: string;
  fit?: number;
  lift?: number;
  spin: boolean;
  spinSpeed?: number;
  sway?: number;
  float?: boolean;
  onReady?: () => void;
};

function Gltf({
  url,
  fit = 1,
  lift = 0,
  spin,
  spinSpeed = 0.35,
  sway = 0.35,
  float = false,
  onReady,
}: GltfProps) {
  const { scene } = useGLTF(url);
  const pivot = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);

  /* Chaque modèle vient d'une source différente : on le recentre et on le
     ramène à une boîte englobante unitaire. Les matériaux d'origine ne sont
     pas touchés — c'est l'éclairage seul qui donne l'ambiance. */
  const normalized = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const k = (2 / maxDim) * fit;
    clone.scale.setScalar(k);
    clone.position.set(-center.x * k, -center.y * k + lift, -center.z * k);
    return clone;
  }, [scene, fit, lift]);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useFrame((state, delta) => {
    if (!pivot.current || !inner.current) return;
    const { x, y } = state.pointer;

    if (spin) {
      pivot.current.rotation.y += delta * spinSpeed;
    } else {
      /* Le modèle « regarde » doucement le curseur, sans jamais se braquer. */
      pivot.current.rotation.y = THREE.MathUtils.lerp(
        pivot.current.rotation.y,
        x * sway * Math.PI * 0.5,
        0.055,
      );
    }

    inner.current.rotation.x = THREE.MathUtils.lerp(
      inner.current.rotation.x,
      THREE.MathUtils.clamp(-y * sway * 0.55, -0.4, 0.4),
      0.055,
    );

    if (float) {
      inner.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.06;
    }
  });

  return (
    <group ref={pivot}>
      <group ref={inner}>
        <primitive object={normalized} />
      </group>
    </group>
  );
}

/* Éclairage de nuit : clé bleue, contre-jour violet, lampadaire orange. */
function NightRig({ contact }: { contact: boolean }) {
  return (
    <>
      <ambientLight intensity={0.5} color="#c9c2ee" />
      <directionalLight
        position={[4, 6, 4]}
        intensity={2.6}
        color="#7c8cff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 2, -4]} intensity={1.8} color="#e58bff" />
      <pointLight position={[2.5, -2.5, 3]} intensity={1.3} color="#ff7a18" />
      <pointLight position={[-3, -1, 2]} intensity={0.9} color="#ff4d9d" />
      <spotLight
        position={[0, 7, 0]}
        angle={0.65}
        penumbra={1}
        intensity={1.5}
        color="#ffffff"
      />

      {/* Carte d'environnement générée localement : aucun HDRI distant. */}
      <Environment resolution={256}>
        <Lightformer
          intensity={3.4}
          color="#7c8cff"
          position={[0, 4, 3]}
          scale={[8, 8, 1]}
        />
        <Lightformer
          intensity={2.2}
          color="#e58bff"
          position={[-5, 1, -3]}
          rotation-y={Math.PI / 2}
          scale={[6, 6, 1]}
        />
        <Lightformer
          intensity={1.3}
          color="#ffffff"
          position={[5, 0, 2]}
          rotation-y={-Math.PI / 3}
          scale={[4, 6, 1]}
        />
        <Lightformer
          intensity={1}
          color="#ff7a18"
          position={[0, -4, 0]}
          rotation-x={Math.PI / 2}
          scale={[8, 8, 1]}
        />
      </Environment>

      {contact && (
        <ContactShadows
          position={[0, -1.22, 0]}
          opacity={0.45}
          scale={10}
          blur={2.8}
          far={4}
          color="#0b0720"
        />
      )}
    </>
  );
}

/* Recadre quand le conteneur change de forme — sauf si l'utilisateur
   a la main sur la caméra via OrbitControls. */
function Reframe({ distance, locked }: { distance: number; locked: boolean }) {
  const { camera } = useThree();

  useEffect(() => {
    if (locked) return;
    camera.position.setLength(distance);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, distance, locked]);

  return null;
}

/* Pilotage externe de la caméra (boutons du laboratoire). */
function Director({
  handleRef,
  controls,
  distance,
}: {
  handleRef?: Ref<StageHandle>;
  controls: React.RefObject<OrbitControlsImpl | null>;
  distance: number;
}) {
  const { camera } = useThree();

  useImperativeHandle(
    handleRef,
    () => {
      const place = (x: number, y: number, z: number) => {
        camera.position.set(x, y, z).setLength(distance);
        camera.lookAt(0, 0, 0);
        controls.current?.update?.();
      };
      return {
        reset: () => {
          controls.current?.reset?.();
          place(0, 0.35, 1);
        },
        frontView: () => place(0, 0.12, 1),
        topView: () => place(0, 1, 0.001),
      };
    },
    [camera, controls, distance],
  );

  return null;
}

function Loader({ label }: { label: string }) {
  return (
    <div className="loader3d">
      <div className="loader3d__ring" />
      <div className="loader3d__t">{label}</div>
    </div>
  );
}

/* Mesure le conteneur : c'est elle qui donne l'aspect, donc le cadrage.
   Le canvas n'est monté qu'une fois la mesure connue — et, en mode `lazy`,
   qu'une fois la scène approchée du viewport. */
function useStageBox(lazy: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [aspect, setAspect] = useState(0);
  const [near, setNear] = useState(!lazy);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setAspect(width / height);
    });
    ro.observe(el);

    let io: IntersectionObserver | undefined;
    if (lazy) {
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setNear(true);
            io?.disconnect();
          }
        },
        { rootMargin: "300px" },
      );
      io.observe(el);
    }

    return () => {
      ro.disconnect();
      io?.disconnect();
    };
  }, [lazy]);

  return { ref, aspect, near };
}

export type ModelViewerProps = {
  url: string;
  className?: string;
  /** Multiplicateur de taille après normalisation. */
  fit?: number;
  lift?: number;
  /** Marge autour du modèle : 1 = au ras, 1.3 = large. */
  padding?: number;
  spin?: boolean;
  spinSpeed?: number;
  sway?: number;
  float?: boolean;
  orbit?: boolean;
  zoom?: boolean;
  contact?: boolean;
  grid?: boolean;
  loaderLabel?: string;
  lazy?: boolean;
  /** Plafond de résolution : à baisser quand plusieurs scènes cohabitent. */
  maxDpr?: number;
  handleRef?: Ref<StageHandle>;
  overlay?: ReactNode;
};

export default function ModelViewer({
  url,
  className = "",
  fit = 1,
  lift = 0,
  padding = 1.12,
  spin = false,
  spinSpeed = 0.35,
  sway = 0.35,
  float = false,
  orbit = false,
  zoom = false,
  contact = true,
  grid = true,
  loaderLabel = "Chargement",
  lazy = false,
  maxDpr = 1.75,
  handleRef,
  overlay,
}: ModelViewerProps) {
  const { ref, aspect, near } = useStageBox(lazy);
  const controls = useRef<OrbitControlsImpl | null>(null);
  const [ready, setReady] = useState(false);

  const distance = aspect > 0 ? frameDistance(aspect, padding) : 5;
  const mounted = near && aspect > 0;

  return (
    <div ref={ref} className={`stage ${className}`}>
      {grid && <div className="stage__grid" />}

      {mounted && (
        <Canvas
          dpr={[1, maxDpr]}
          shadows
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, distance * 0.14, distance], fov: FOV }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Suspense fallback={null}>
            <NightRig contact={contact} />
            <Gltf
              url={url}
              fit={fit}
              lift={lift}
              spin={spin}
              spinSpeed={spinSpeed}
              sway={sway}
              float={float}
              onReady={() => setReady(true)}
            />
          </Suspense>

          {orbit && (
            <OrbitControls
              ref={controls}
              enablePan={false}
              enableZoom={zoom}
              minDistance={distance * 0.55}
              maxDistance={distance * 2.1}
              minPolarAngle={0.25}
              maxPolarAngle={Math.PI - 0.25}
              dampingFactor={0.08}
              enableDamping
            />
          )}

          <Reframe distance={distance} locked={orbit} />
          <Director
            handleRef={handleRef}
            controls={controls}
            distance={distance}
          />
        </Canvas>
      )}

      {!ready && <Loader label={loaderLabel} />}
      {overlay}
    </div>
  );
}

useGLTF.preload(MODELS.profil);
