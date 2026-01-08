import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  LayoutGrid,
  Plus,
  LogOut,
  Loader2,
  Trash2,
  Edit3,
  ExternalLink,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
      } else {
        setUser(user);
        fetchProjects();
      }
    };
    checkUser();
  }, [navigate]);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: false });

    if (!error) setProjects(data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    setActionLoading(true);
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      showStatus("error", "Failed to delete project");
    } else {
      setProjects(projects.filter((p) => p.id !== id));
      showStatus("success", "Project deleted successfully");
    }
    setActionLoading(false);
  };

  const showStatus = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg({ type: "", text: "" }), 3000);
  };

  const openModal = (project = null) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  if (loading && projects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Admin Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0a0a0a] p-8 rounded-2xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="p-4 bg-blue-500/10 rounded-xl">
            <Shield className="text-blue-500" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Dashboard</h1>
            <p className="text-gray-500 text-sm">
              Active Session: {user?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <Plus size={20} />
            <span>Add Project</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-3 bg-white/5 text-gray-400 font-bold rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all border border-white/5"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </section>

      {/* Status Toaster */}
      <AnimatePresence>
        {statusMsg.text && (
          <Motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`flex items-center gap-3 p-4 rounded-xl border ${
              statusMsg.type === "success"
                ? "bg-green-500/10 border-green-500/20 text-green-500"
                : "bg-red-500/10 border-red-500/20 text-red-500"
            }`}
          >
            {statusMsg.type === "success" ? (
              <CheckCircle2 size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <span className="text-sm font-medium">{statusMsg.text}</span>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-lg">
            <LayoutGrid className="text-purple-500" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">
              Total Projects
            </p>
            <p className="text-2xl font-black text-white">{projects.length}</p>
          </div>
        </div>
      </div>

      {/* Project Registry */}
      <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <LayoutGrid size={20} className="text-blue-500" />
            Project Registry
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/5">
                <th className="px-6 py-4 font-black">Project</th>
                <th className="px-6 py-4 font-black">Category</th>
                <th className="px-6 py-4 font-black">Status</th>
                <th className="px-6 py-4 font-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-20 text-center text-gray-600 italic"
                  >
                    No records found in database. Add your first project.
                  </td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr
                    key={p.id}
                    className="group hover:bg-white/[0.01] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 border border-white/10 shrink-0">
                          <img
                            src={p.image}
                            alt=""
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">
                            {p.title}
                          </p>
                          <div className="flex gap-1 mt-1">
                            {p.stacks?.slice(0, 3).map((s, i) => (
                              <span
                                key={i}
                                className="text-[8px] text-gray-500 bg-white/5 px-1.5 py-0.5 rounded border border-white/5"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-blue-400 font-mono uppercase bg-blue-400/10 px-2 py-1 rounded-md border border-blue-400/20">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-tighter px-2 py-1 rounded-full border ${
                          p.status === "Completed"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(p)}
                          className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <ProjectFormModal
            project={editingProject}
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => {
              setIsModalOpen(false);
              fetchProjects();
              showStatus(
                "success",
                `Project ${editingProject ? "updated" : "added"} successfully`
              );
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectFormModal({ project, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "web",
    status: "Completed",
    stacks: "",
    demourl: "",
    githuburl: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        stacks: project.stacks ? project.stacks.join(", ") : "",
      });
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      stacks: formData.stacks
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== ""),
    };

    let result;
    if (project) {
      result = await supabase
        .from("projects")
        .update(payload)
        .eq("id", project.id);
    } else {
      result = await supabase.from("projects").insert([payload]);
    }

    if (result.error) {
      alert("Error: " + result.error.message);
    } else {
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      <Motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        className="bg-[#0d0d0d] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl no-scrollbar"
      >
        <div className="sticky top-0 bg-[#0d0d0d] p-6 border-b border-white/5 flex justify-between items-center z-20">
          <div>
            <h3 className="text-xl font-bold text-white">
              {project ? "Edit Project" : "New Registry Entry"}
            </h3>
            <p className="text-xs text-gray-500 font-mono mt-1">
              {project ? `ID: ${project.id}` : "MODE: CREATE_NEW_OBJECT"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-gray-500">
                Project Title
              </label>
              <input
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                placeholder="Ex: E-commerce Platform"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-gray-500">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium appearance-none"
              >
                <option value="web" className="bg-[#0d0d0d]">
                  Web Development
                </option>
                <option value="python" className="bg-[#0d0d0d]">
                  Python Automation
                </option>
                <option value="iot" className="bg-[#0d0d0d]">
                  IoT / Robotics
                </option>
                <option value="logiciel" className="bg-[#0d0d0d]">
                  Software
                </option>
                <option value="design" className="bg-[#0d0d0d]">
                  Graphic Design
                </option>
              </select>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-gray-500">
                Cover Image URL
              </label>
              <input
                required
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all font-mono text-xs"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-gray-500">
                Project Narrative
              </label>
              <textarea
                required
                rows="4"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-sm leading-relaxed"
                placeholder="Describe the challenges and solutions..."
              />
            </div>

            {/* Stacks */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-gray-500">
                Tech Stacks (comma separated)
              </label>
              <input
                value={formData.stacks}
                onChange={(e) =>
                  setFormData({ ...formData, stacks: e.target.value })
                }
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all font-mono text-xs"
                placeholder="React, Node.js, Supabase, Tailwind..."
              />
            </div>

            {/* URLs */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-gray-500">
                Demo Link
              </label>
              <input
                value={formData.demourl}
                onChange={(e) =>
                  setFormData({ ...formData, demourl: e.target.value })
                }
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all font-mono text-xs"
                placeholder="https://demo.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-gray-500">
                Github Link
              </label>
              <input
                value={formData.githuburl}
                onChange={(e) =>
                  setFormData({ ...formData, githuburl: e.target.value })
                }
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all font-mono text-xs"
                placeholder="https://github.com/..."
              />
            </div>

            {/* Status */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-gray-500">
                Project Status
              </label>
              <div className="flex gap-4">
                {["Completed", "In Progress", "Maintenance"].map((s) => (
                  <label
                    key={s}
                    className={`flex-1 flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all gap-2 ${
                      formData.status === s
                        ? "bg-blue-600/10 border-blue-500 text-blue-400 font-bold"
                        : "bg-white/5 border-white/5 text-gray-500 hover:bg-white/[0.08]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      className="hidden"
                      checked={formData.status === s}
                      onChange={() => setFormData({ ...formData, status: s })}
                    />
                    <span className="text-[10px] uppercase tracking-widest">
                      {s}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <Save size={20} />
                  <span>{project ? "Sync Update" : "Inject Data"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </Motion.div>
    </div>
  );
}
