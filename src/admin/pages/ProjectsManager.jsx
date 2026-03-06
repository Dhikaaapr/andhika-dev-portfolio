import { useState, useEffect } from 'react';
import {
  Plus, Edit2, Trash2, Search, X, Save, Upload, ExternalLink, GripVertical
} from 'lucide-react';
import {
  getProjects, addProject, updateProject, deleteProject, uploadFile
} from '../../firebase/services';

const categories = ['Web App', 'Mobile App', 'Backend', 'Full Stack', 'UI/UX', 'Other'];
const statusOptions = ['published', 'draft', 'archived'];

const emptyProject = {
  name: '', description: '', category: 'Web App', tech: [],
  url: '', image: '', video: '', gradient: ['#7C3AED', '#6366F1'],
  status: 'published', isMobile: false, order: 0,
};

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...emptyProject });
  const [techInput, setTechInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyProject, order: projects.length });
    setTechInput('');
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setEditing(project.id);
    setForm({ ...emptyProject, ...project });
    setTechInput('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = { ...form };
      delete data.id;
      if (editing) {
        await updateProject(editing, data);
      } else {
        await addProject(data);
      }
      closeModal();
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Error saving project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setDeleteConfirm(null);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const addTech = () => {
    if (techInput.trim() && !form.tech.includes(techInput.trim())) {
      setForm({ ...form, tech: [...form.tech, techInput.trim()] });
      setTechInput('');
    }
  };

  const removeTech = (t) => {
    setForm({ ...form, tech: form.tech.filter((x) => x !== t) });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadFile(file);
      setForm({ ...form, image: url });
    } catch (err) {
      console.error(err);
      alert('Upload failed: ' + (err.message || 'Check Cloudinary config.'));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingVideo(true);
    try {
      const url = await uploadFile(file);
      setForm({ ...form, video: url });
    } catch (err) {
      console.error(err);
      alert('Upload failed: ' + (err.message || 'Check Cloudinary config.'));
    } finally {
      setUploadingVideo(false);
    }
  };

  const filtered = projects.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="admin-loading"><div className="admin-spinner" /></div>;
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--admin-text)' }}>Projects</h2>
          <p style={{ fontSize: '13px', color: 'var(--admin-text-muted)' }}>
            Manage your portfolio projects ({projects.length} total)
          </p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Search & Filters */}
      <div className="admin-card" style={{ marginBottom: '20px', padding: '16px' }}>
        <div style={{ position: 'relative', maxWidth: '360px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
          <input
            type="text"
            className="admin-input"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '40px' }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="admin-card">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Project Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Tech Stack</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    <div className="admin-empty">
                      <div className="admin-empty-icon"><FolderOpenIcon /></div>
                      <div className="admin-empty-title">No projects found</div>
                      <div className="admin-empty-text">Add your first project to get started</div>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((project, idx) => (
                  <tr key={project.id}>
                    <td style={{ color: 'var(--admin-text-muted)' }}>{idx + 1}</td>
                    <td>
                      <div className="project-name-cell">
                        <div className="project-thumb" style={{
                          background: project.gradient
                            ? `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`
                            : 'linear-gradient(135deg, #7C3AED, #6366F1)',
                        }}>
                          {project.image ? <img src={project.image} alt="" /> : project.name?.charAt(0)}
                        </div>
                        <div>
                          <div className="project-name-text">{project.name}</div>
                          <div className="project-tech-text">{(project.tech || []).slice(0, 2).join(', ')}</div>
                        </div>
                      </div>
                    </td>
                    <td>{project.category || 'Web App'}</td>
                    <td>
                      <span className={`badge badge-${project.status || 'published'}`}>
                        {(project.status || 'published').charAt(0).toUpperCase() + (project.status || 'published').slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="admin-tags">
                        {(project.tech || []).slice(0, 3).map((t) => (
                          <span key={t} className="admin-tag">{t}</span>
                        ))}
                        {(project.tech || []).length > 3 && (
                          <span className="admin-tag">+{project.tech.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td style={{ color: 'var(--admin-text-muted)', fontSize: '13px', whiteSpace: 'nowrap' }}>
                      {project.createdAt?.toDate ? project.createdAt.toDate().toLocaleDateString() : 'N/A'}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button className="admin-btn-icon" onClick={() => openEdit(project)} title="Edit">
                          <Edit2 size={16} />
                        </button>
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="admin-btn-icon" title="Visit">
                            <ExternalLink size={16} />
                          </a>
                        )}
                        <button className="admin-btn-icon danger" onClick={() => setDeleteConfirm(project.id)} title="Delete">
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

        {filtered.length > 0 && (
          <div className="admin-pagination">
            <span className="admin-pagination-info">
              Showing {filtered.length} of {projects.length} projects
            </span>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editing ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button className="admin-btn-icon" onClick={closeModal}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Project Name *</label>
                    <input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="e.g. TaskHub" />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Category</label>
                    <select className="admin-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Description</label>
                  <textarea className="admin-textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe your project..." rows={3} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Project URL</label>
                    <input className="admin-input" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Status</label>
                    <select className="admin-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                      {statusOptions.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Tech Stack</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input className="admin-input" value={techInput} onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
                      placeholder="e.g. React — press Enter" />
                    <button type="button" className="admin-btn admin-btn-secondary" onClick={addTech}>Add</button>
                  </div>
                  {form.tech.length > 0 && (
                    <div className="admin-tags">
                      {form.tech.map((t) => (
                        <span key={t} className="admin-tag">
                          {t}
                          <button type="button" className="admin-tag-remove" onClick={() => removeTech(t)}><X size={12} /></button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Image</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input className="admin-input" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="Image URL" style={{ flex: 1 }} />
                      {form.image && (
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--admin-border)' }}>
                          <img src={form.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      )}
                    </div>
                    <div style={{ position: 'relative' }}>
                      <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} style={{ fontSize: '13px' }} />
                      {uploadingImage && <span style={{ fontSize: '12px', color: 'var(--admin-primary)', marginLeft: '8px' }}>Uploading...</span>}
                    </div>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Video URL / Upload</label>
                    <input className="admin-input" value={form.video} onChange={(e) => setForm({ ...form, video: e.target.value })} placeholder="Video URL" style={{ marginBottom: '8px' }} />
                    <div style={{ position: 'relative' }}>
                      <input type="file" accept="video/*" onChange={handleVideoUpload} disabled={uploadingVideo} style={{ fontSize: '13px' }} />
                      {uploadingVideo && <span style={{ fontSize: '12px', color: 'var(--admin-primary)', marginLeft: '8px' }}>Uploading...</span>}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Gradient Color 1</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input type="color" value={form.gradient[0]} onChange={(e) => setForm({ ...form, gradient: [e.target.value, form.gradient[1]] })} style={{ width: '40px', height: '36px', cursor: 'pointer', border: 'none' }} />
                      <input className="admin-input" value={form.gradient[0]} onChange={(e) => setForm({ ...form, gradient: [e.target.value, form.gradient[1]] })} />
                    </div>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Gradient Color 2</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input type="color" value={form.gradient[1]} onChange={(e) => setForm({ ...form, gradient: [form.gradient[0], e.target.value] })} style={{ width: '40px', height: '36px', cursor: 'pointer', border: 'none' }} />
                      <input className="admin-input" value={form.gradient[1]} onChange={(e) => setForm({ ...form, gradient: [form.gradient[0], e.target.value] })} />
                    </div>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.isMobile} onChange={(e) => setForm({ ...form, isMobile: e.target.checked })} />
                    <span className="admin-label" style={{ margin: 0 }}>This is a mobile app project</span>
                  </label>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  <Save size={16} /> {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="admin-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <div className="admin-modal-body" style={{ textAlign: 'center', padding: '32px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--admin-danger-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--admin-danger)' }}>
                <Trash2 size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Delete Project?</h3>
              <p style={{ fontSize: '14px', color: 'var(--admin-text-muted)', marginBottom: '24px' }}>
                This action cannot be undone. The project will be permanently removed.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button className="admin-btn admin-btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(deleteConfirm)}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FolderOpenIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}
