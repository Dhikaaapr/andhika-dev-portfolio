import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Briefcase } from 'lucide-react';
import {
  getExperiences, addExperience, updateExperience, deleteExperience
} from '../../firebase/services';

const emptyExp = {
  company: '', role: '', period: '', description: [], tech: [], order: 0,
};

export default function ExperienceManager() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...emptyExp });
  const [descInput, setDescInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getExperiences();
      setExperiences(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyExp, order: experiences.length });
    setDescInput('');
    setTechInput('');
    setModalOpen(true);
  };

  const openEdit = (exp) => {
    setEditing(exp.id);
    setForm({ ...emptyExp, ...exp });
    setDescInput('');
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
        await updateExperience(editing, data);
      } else {
        await addExperience(data);
      }
      closeModal();
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExperience(id);
      setDeleteConfirm(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const addDesc = () => {
    if (descInput.trim()) {
      setForm({ ...form, description: [...form.description, descInput.trim()] });
      setDescInput('');
    }
  };

  const removeDesc = (idx) => {
    setForm({ ...form, description: form.description.filter((_, i) => i !== idx) });
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

  if (loading) {
    return <div className="admin-loading"><div className="admin-spinner" /></div>;
  }

  return (
    <div>
      <div className="admin-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Experience</h2>
          <p style={{ fontSize: '13px', color: 'var(--admin-text-muted)' }}>
            Manage your work experience ({experiences.length} total)
          </p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <Plus size={16} /> <span>Add Experience</span>
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon"><Briefcase size={28} /></div>
            <div className="admin-empty-title">No experience added</div>
            <div className="admin-empty-text">Add your work experience to showcase</div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {experiences.map((exp) => (
            <div key={exp.id} className="admin-card" style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, #7C3AED, #6366F1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', flexShrink: 0
                  }}>
                    <Briefcase size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '2px' }}>{exp.role}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--admin-text-secondary)', marginBottom: '4px' }}>{exp.company}</p>
                    <p style={{ fontSize: '12px', color: 'var(--admin-text-muted)' }}>{exp.period}</p>
                    {exp.description && exp.description.length > 0 && (
                      <ul style={{ marginTop: '10px', paddingLeft: '16px', fontSize: '13px', color: 'var(--admin-text-secondary)' }}>
                        {exp.description.map((d, i) => <li key={i} style={{ marginBottom: '4px' }}>{d}</li>)}
                      </ul>
                    )}
                    {exp.tech && exp.tech.length > 0 && (
                      <div className="admin-tags" style={{ marginTop: '10px' }}>
                        {exp.tech.map((t) => <span key={t} className="admin-tag">{t}</span>)}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                  <button className="admin-btn-icon" onClick={() => openEdit(exp)} title="Edit"><Edit2 size={16} /></button>
                  <button className="admin-btn-icon danger" onClick={() => setDeleteConfirm(exp.id)} title="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">{editing ? 'Edit Experience' : 'Add Experience'}</h3>
              <button className="admin-btn-icon" onClick={closeModal}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-label">Role / Position *</label>
                  <input className="admin-input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required placeholder="e.g. Fullstack Developer" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Company / Project *</label>
                    <input className="admin-input" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required placeholder="e.g. Tech Corp" />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Period</label>
                    <input className="admin-input" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} placeholder="e.g. Jan 2024 - Present" />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Description Points</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input className="admin-input" value={descInput} onChange={(e) => setDescInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addDesc(); } }}
                      placeholder="Add a description point — press Enter" />
                    <button type="button" className="admin-btn admin-btn-secondary" onClick={addDesc}>Add</button>
                  </div>
                  {form.description.length > 0 && (
                    <ul style={{ marginTop: '10px', listStyle: 'none', padding: 0 }}>
                      {form.description.map((d, i) => (
                        <li key={i} style={{
                          display: 'flex', alignItems: 'center', gap: '8px',
                          padding: '8px 12px', background: 'var(--admin-bg)', borderRadius: '6px',
                          marginBottom: '4px', fontSize: '13px'
                        }}>
                          <span style={{ flex: 1 }}>{d}</span>
                          <button type="button" className="admin-tag-remove" onClick={() => removeDesc(i)}>
                            <X size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
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

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="admin-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <div className="admin-modal-body" style={{ textAlign: 'center', padding: '32px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--admin-danger-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--admin-danger)' }}>
                <Trash2 size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Delete Experience?</h3>
              <p style={{ fontSize: '14px', color: 'var(--admin-text-muted)', marginBottom: '24px' }}>This action cannot be undone.</p>
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
