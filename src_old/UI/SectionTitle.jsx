import { motion as Motion } from "framer-motion";


export default function SectionTitle({
  number,
  label,
  title,
  highlight,
  className = "",
}) {
  // If highlight is provided, split the title around it
  const renderTitle = () => {
    if (!highlight) return title;
    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500">
          {highlight}
        </span>
        {parts[1] || ""}
      </>
    );
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${className}`}
    >
      {/* Number + Label Row */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-cyan-500/40 font-mono text-sm font-bold tracking-wider">
          {number}
        </span>
        <div className="h-px w-12 bg-gradient-to-r from-cyan-500/40 to-transparent" />
        <span className="text-cyan-400 text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] uppercase">
          {label}
        </span>
      </div>

      {/* Main Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
        {renderTitle()}
      </h2>
    </Motion.div>
  );
}
