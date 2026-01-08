import { motion as Motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function ImgCard() {
  // Premium Tilt Effect logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group cursor-pointer"
    >
      {/* Decorative background glow */}
      <div className="absolute -inset-8 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div
        style={{ transform: "translateZ(50px)" }}
        className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-500 bg-black"
      >
        <img
          src="src/assets/profil.png"
          alt="Profile"
          className="w-full h-auto max-w-sm grayscale group-hover:grayscale-0 transition-all duration-700 transform"
          onError={(e) => {
            e.target.src =
              "https://i.postimg.cc/25LwFT92/profil.png";
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
      </div>

      {/* Floating accent elements with 3D effect */}
      <Motion.div
        style={{ transform: "translateZ(80px)" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute -top-6 -right-4 w-12 h-12 bg-blue-500/20 backdrop-blur-xl border border-blue-500/30 rounded-lg flex items-center justify-center text-blue-400 font-mono text-xs font-bold shadow-lg"
      >
        JS
      </Motion.div>
      <Motion.div
        style={{ transform: "translateZ(80px)" }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute -bottom-6 -left-4 w-12 h-12 bg-purple-500/20 backdrop-blur-xl border border-purple-500/30 rounded-lg flex items-center justify-center text-purple-400 font-mono text-xs font-bold shadow-lg"
      >
        PY
      </Motion.div>
      <Motion.div
        style={{ transform: "translateZ(80px)" }}
        animate={{ x: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute -top-6 -left-8 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg flex items-center justify-center text-white font-mono text-xs font-bold shadow-lg"
      >
        C++
      </Motion.div>
    </Motion.div>
  );
}
