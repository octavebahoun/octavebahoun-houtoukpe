import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Shield, LayoutGrid, Plus, LogOut, Loader2, Trash2, Edit3,
  Save, X, CheckCircle2, AlertCircle, FolderKanban,
} from "lucide-react";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  if (!supabase) {
    return (
      <section className="section" style={{ minHeight: "80vh", display: "grid", placeItems: "center" }}>
        <div className="card" style={{ padding: "48px", maxWidth: "420px", textAlign: "center" }}>
          <AlertCircle size={32} style={{ color: "var(--accent)", marginBottom: "16px" }} />
          <h2 className="h3" style={{ marginBottom: "12px" }}>Supabase not configured</h2>
          <p style={{ color: "var(--muted)", fontSize: "13px" }}>
            Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in your <code>.env</code>.
          </p>
        </div>
      </section>
    );
  }

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
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
    if (!window.confirm("Delete this project permanently?")) return;
    setActionLoading(true);
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      showStatus("error", "Failed to delete: " + error.message);
    } else {
      setProjects(projects.filter((p) => p.id !== id));
      showStatus("success", "Project deleted");
    }
    setActionLoading(false);
  };

  const showStatus = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg({ type: "", text: "" }), 3500);
  };

  const openModal = (project = null) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  if (loading && projects.length === 0) {
    return (
      <section className="section" style={{ minHeight: "80vh", display: "grid", placeItems: "center" }}>
        <Loader2 size={36} className="admin-spin" style={{ color: "var(--accent)" }} />
      </section>
    );
  }

  return (
    <section className="section admin-dashboard">
      <Helmet>
        <title>Admin Dashboard — O&lt;ktav&gt;</title>
      </Helmet>

      <div className="container">

        {/* Header */}
        <div className="admin-header">
          <div className="admin-header__left">
            <div className="admin-header__icon">
              <Shield size={28} />
            </div>
            <div>
              <h1 className="h2" style={{ marginBottom: "4px" }}>Dashboard</h1>
              <p className="admin-header__email">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="admin-header__actions">
            <button onClick={() => openModal()} className="btn btn-primary">
              <Plus size={16} /> Add Project
            </button>
            <button onClick={handleLogout} className="btn btn-ghost admin-btn-logout">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Toast */}
        {statusMsg.text && (
          <div className={`admin-toast admin-toast--${statusMsg.type}`}>
            {statusMsg.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Stats */}
        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="admin-stat-card__icon" style={{ background: "rgba(255,69,0,0.12)", color: "var(--accent)" }}>
              <FolderKanban size={22} />
            </div>
            <div>
              <p className="admin-stat-card__label">Total Projects</p>
              <p className="admin-stat-card__value">{projects.length}</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="admin-table-wrap">
          <div className="admin-table-header">
            <h2 className="h3" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <LayoutGrid size={18} style={{ color: "var(--accent)" }} />
              Project Registry
            </h2>
          </div>

          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="admin-table__empty">
                      No records found. Add your first project.
                    </td>
                  </tr>
                ) : (
                  projects.map((p) => (
                    <tr key={p.id} className="admin-table__row">
                      <td>
                        <div className="admin-table__project">
                          <div className="admin-table__thumb">
                            <img src={p.image} alt="" />
                          </div>
                          <div>
                            <p className="admin-table__title">{p.title}</p>
                            <div className="admin-table__stacks">
                              {p.stacks?.slice(0, 3).map((s) => (
                                <span key={s} className="badge">{s}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="admin-table__cat">{p.category}</span>
                      </td>
                      <td>
                        <span className={`admin-table__status admin-table__status--${p.status?.toLowerCase().replace(/\s+/g, "_")}`}>
                          {p.status}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div className="admin-table__actions">
                          <button onClick={() => openModal(p)} className="admin-action-btn" title="Edit">
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="admin-action-btn admin-action-btn--danger"
                            title="Delete"
                            disabled={actionLoading}
                          >
                            <Trash2 size={16} />
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

        {/* Modal */}
        {isModalOpen && (
          <ProjectFormModal
            project={editingProject}
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => {
              setIsModalOpen(false);
              fetchProjects();
              showStatus("success", `Project ${editingProject ? "updated" : "created"}`);
            }}
          />
        )}
      </div>
    </section>
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
        demourl: project.demourl || project.demoUrl || "",
        githuburl: project.githuburl || project.githubUrl || "",
      });
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      category: formData.category,
      status: formData.status,
      stacks: formData.stacks.split(",").map((s) => s.trim()).filter(Boolean),
      demourl: formData.demourl || null,
      githuburl: formData.githuburl || null,
    };

    let result;
    if (project) {
      result = await supabase.from("projects").update(payload).eq("id", project.id);
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
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal__head">
          <div>
            <h3 className="h3">{project ? "Edit Project" : "New Project"}</h3>
            <p className="admin-modal__id">
              {project ? `ID: ${project.id}` : "MODE: CREATE_NEW"}
            </p>
          </div>
          <button onClick={onClose} className="admin-modal__close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-modal__form">
          <div className="admin-form-grid">
            <div className="form-group">
              <label className="form-label">Project Title</label>
              <input required value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-input" placeholder="E-commerce Platform" />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="form-input">
                <option value="web">Web Development</option>
                <option value="python">Python Automation</option>
                <option value="iot">IoT / Robotics</option>
                <option value="logiciel">Software</option>
                <option value="design">Graphic Design</option>
              </select>
            </div>

            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label className="form-label">Cover Image URL</label>
              <input required value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="form-input" placeholder="https://images.unsplash.com/..." />
            </div>

            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label className="form-label">Description</label>
              <textarea required rows={4} value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-textarea" placeholder="Describe the project..." />
            </div>

            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label className="form-label">Tech Stacks (comma separated)</label>
              <input value={formData.stacks}
                onChange={(e) => setFormData({ ...formData, stacks: e.target.value })}
                className="form-input" placeholder="React, Node.js, Supabase..." />
            </div>

            <div className="form-group">
              <label className="form-label">Demo Link</label>
              <input value={formData.demourl}
                onChange={(e) => setFormData({ ...formData, demourl: e.target.value })}
                className="form-input" placeholder="https://demo.com" />
            </div>

            <div className="form-group">
              <label className="form-label">Github Link</label>
              <input value={formData.githuburl}
                onChange={(e) => setFormData({ ...formData, githuburl: e.target.value })}
                className="form-input" placeholder="https://github.com/..." />
            </div>

            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label className="form-label">Status</label>
              <div className="admin-status-group">
                {["Completed", "In Progress", "Maintenance"].map((s) => (
                  <label key={s}
                    className={`admin-status-option${formData.status === s ? " admin-status-option--active" : ""}`}>
                    <input type="radio" name="status" className="admin-radio-hidden"
                      checked={formData.status === s}
                      onChange={() => setFormData({ ...formData, status: s })} />
                    {s}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="admin-form-actions">
            <button type="button" onClick={onClose} className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }}>
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="btn btn-primary" style={{ flex: 1, justifyContent: "center", opacity: loading ? 0.7 : 1 }}>
              {loading ? <><Loader2 size={16} className="admin-spin" /> Saving...</> : <><Save size={16} /> {project ? "Update" : "Create"}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
