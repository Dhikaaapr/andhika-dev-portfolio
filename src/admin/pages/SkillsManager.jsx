import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Zap } from 'lucide-react';
import {
  getSkills, addSkill, updateSkill, deleteSkill
} from '../../firebase/services';

const levelOptions = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const emptySkill = {
  name: '', category: 'Languages', color: '#7C3AED',
  level: 'Advanced', years: '', icon: '⚡', order: 0,
};

const skillCategories = ['Languages', 'Frameworks & Libraries', 'Databases & Tools', 'Other'];

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...emptySkill });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const data = await getSkills();
      setSkills(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptySkill, order: skills.length });
    setModalOpen(true);
  };

  const openEdit = (skill) => {
    setEditing(skill.id);
    setForm({ ...emptySkill, ...skill });
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
        await updateSkill(editing, data);
      } else {
        await addSkill(data);
      }
      closeModal();
      fetchSkills();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSkill(id);
      setDeleteConfirm(null);
      fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  const grouped = {};
  filtered.forEach((s) => {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(s);
  });

  if (loading) {
    return <div className="admin-loading"><div className="admin-spinner" /></div>;
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Skills</h2>
          <p style={{ fontSize: '13px', color: 'var(--admin-text-muted)' }}>
            Manage your technical skills ({skills.length} total)
          </p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['All', ...skillCategories].map((cat) => (
          <button
            key={cat}
            className={`admin-btn admin-btn-sm ${activeCategory === cat ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      {Object.entries(grouped).length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon"><Zap size={28} /></div>
            <div className="admin-empty-title">No skills found</div>
            <div className="admin-empty-text">Add your first skill to get started</div>
          </div>
        </div>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="admin-card" style={{ marginBottom: '16px' }}>
            <div className="admin-card-header">
              <h3 className="admin-card-title">{category}</h3>
              <span style={{ fontSize: '13px', color: 'var(--admin-text-muted)' }}>
                {items.length} items
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
              {items.map((skill) => (
                <div key={skill.id} className="skill-item-card" style={{ position: 'relative' }}>
                  <div className="skill-item-icon" style={{
                    color: skill.color || 'var(--admin-primary)',
                    background: `${skill.color || '#7C3AED'}15`,
                  }}>
                    {skill.icon || '⚡'}
                  </div>
                  <div className="skill-item-info" style={{ flex: 1 }}>
                    <div className="skill-item-name">{skill.name}</div>
                    <div className="skill-item-level">
                      {skill.level} {skill.years ? `• ${skill.years} Years` : ''}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <button className="admin-btn-icon" onClick={() => openEdit(skill)} title="Edit">
                      <Edit2 size={14} />
                    </button>
                    <button className="admin-btn-icon danger" onClick={() => setDeleteConfirm(skill.id)} title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">{editing ? 'Edit Skill' : 'Add New Skill'}</h3>
              <button className="admin-btn-icon" onClick={closeModal}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-label">Skill Name *</label>
                  <input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="e.g. React.js" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Category</label>
                    <select className="admin-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                      {skillCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Level</label>
                    <select className="admin-select" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
                      {levelOptions.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Years of Experience</label>
                    <input className="admin-input" type="number" value={form.years} onChange={(e) => setForm({ ...form, years: e.target.value })} placeholder="e.g. 3" />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Icon (Emoji)</label>
                    <input className="admin-input" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="⚡" />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Color</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} style={{ width: '40px', height: '36px', cursor: 'pointer', border: 'none' }} />
                    <input className="admin-input" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
                  </div>
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
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Delete Skill?</h3>
              <p style={{ fontSize: '14px', color: 'var(--admin-text-muted)', marginBottom: '24px' }}>
                This action cannot be undone.
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
