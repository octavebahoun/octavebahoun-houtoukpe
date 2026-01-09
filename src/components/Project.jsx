import { motion as Motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Code2, Layers, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import projectsData from "../projects.json";
import { Helmet } from "react-helmet-async";
import { supabase } from "../lib/supabase";

export default function Projects() {
  const [filter, setFilter] = useState("tous");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["tous", "python", "web", "logiciel", "iot", "design"];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("id", { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          // Normalisation des noms de colonnes (Supabase lowercase -> camelCase)
          const normalizedData = data.map((p) => ({
            ...p,
            demoUrl: p.demourl || p.demoUrl,
            githubUrl: p.githuburl || p.githubUrl,
          }));
          setProjects(normalizedData);
        } else {
          // Fallback sur le JSON si la table est vide
          setProjects(projectsData);
        }
      } catch (err) {
        console.error("Error fetching projects from Supabase:", err);
        setProjects(projectsData);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    filter === "tous"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div className="py-20 px-4 md:px-0">
      <Helmet>
        <title>Projects | Octave Bahoun Portfolio</title>
        <meta
          name="description"
          content="Explore my portfolio of software development and AI projects, including web apps, IoT systems, and software solutions."
        />
      </Helmet>
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent inline-block">
          My Projects
        </h2>
        <p className="text-gray-400 mt-3 font-mono text-xs md:text-sm tracking-[0.2em] opacity-60 uppercase">
          Crafting solutions through code and creativity
        </p>
      </Motion.div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((cat) => (
          <Motion.button
            key={cat}
            onClick={() => setFilter(cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
              filter === cat
                ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
            }`}
          >
            {cat === "tous" ? "All" : cat === "logiciel" ? "Software" : cat}
          </Motion.button>
        ))}
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="animate-spin text-blue-500" size={40} />
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest animate-pulse">
            Syncing with database...
          </p>
        </div>
      ) : (
        <Motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </Motion.div>
      )}

      {filteredProjects.length === 0 && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-32 text-gray-500 font-mono text-sm"
        >
          No projects found in this category.
        </Motion.div>
      )}
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <Motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-dark-card border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-500 shadow-xl flex flex-col h-full"
    >
      {/* Partie visuelle - Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-30 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-linear-to-t from-dark-card via-transparent to-transparent opacity-60" />

        {/* Catégorie Badge (Small) */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 backdrop-blur-md border border-blue-500/20 text-[9px] font-black text-blue-400 uppercase tracking-tighter">
            <Layers size={10} />
            {project.category}
          </div>
        </div>

        {/* Badge Status */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[9px] font-bold tracking-tighter text-gray-300 uppercase">
            {project.status}
          </span>
        </div>

        {/* Overlay Buttons on Hover */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
          <Motion.a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, backgroundColor: "#2563eb" }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-blue-600 rounded-full text-white shadow-lg shadow-blue-500/20"
          >
            <ExternalLink size={20} />
          </Motion.a>
          <Motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white"
          >
            <Github size={20} />
          </Motion.a>
        </div>
      </div>

      {/* Contenu - Description et Stacks */}
      <div className="p-6 flex flex-col grow">
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors text-white">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Stack Technologique */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.stacks.map((stack) => (
            <div
              key={stack}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-medium text-gray-400 group-hover:border-blue-500/20 group-hover:text-blue-200 transition-colors"
            >
              <Code2 size={11} className="text-blue-500/50" />
              {stack}
            </div>
          ))}
        </div>

        {/* Mobile Action Buttons - Visible on touch devices/small screens */}
        <div className="flex gap-3 mt-6 md:hidden">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 rounded-xl text-white text-xs font-bold shadow-lg shadow-blue-500/20"
          >
            <ExternalLink size={14} />
            Preview
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 flex items-center justify-center py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs font-bold"
          >
            <Github size={14} />
          </a>
        </div>
      </div>

      {/* Animation de bordure subtile */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-700" />
    </Motion.div>
  );
}
