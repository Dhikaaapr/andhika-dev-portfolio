import { useState, useEffect } from 'react';
import { Save, User, Plus, X, Trash2 } from 'lucide-react';
import { getAbout, updateAbout } from '../../firebase/services';

export default function AboutManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [descInput, setDescInput] = useState('');
  const [form, setForm] = useState({
    title: 'About Me',
    description: [],
    stats: [],
  });
  const [statLabel, setStatLabel] = useState('');
  const [statValue, setStatValue] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getAbout();
        if (data) setForm(prev => ({ ...prev, ...data }));
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    })();
  }, []);

  const addDesc = () => {
    if (descInput.trim()) {
      setForm({ ...form, description: [...form.description, descInput.trim()] });
      setDescInput('');
    }
  };

  const removeDesc = (idx) => {
    setForm({ ...form, description: form.description.filter((_, i) => i !== idx) });
  };

  const addStat = () => {
    if (statLabel.trim() && statValue.trim()) {
      setForm({
        ...form,
        stats: [...(form.stats || []), { label: statLabel.trim(), value: statValue.trim() }],
      });
      setStatLabel('');
      setStatValue('');
    }
  };

  const removeStat = (idx) => {
    setForm({ ...form, stats: form.stats.filter((_, i) => i !== idx) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateAbout(form);
      alert('About section updated!');
    } catch (err) {
      console.error(err);
      alert('Error saving');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loading"><div className="admin-spinner" /></div>;

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700 }}>About Me</h2>
        <p style={{ fontSize: '13px', color: 'var(--admin-text-muted)' }}>
          Customize the about section of your portfolio
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="admin-card" style={{ marginBottom: '20px' }}>
          <div className="admin-card-header">
            <h3 className="admin-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} /> About Information
            </h3>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Section Title</label>
            <input className="admin-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="About Me" />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Description Paragraphs</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <textarea className="admin-textarea" value={descInput} onChange={(e) => setDescInput(e.target.value)}
                placeholder="Add a paragraph — click Add"
                rows={2} style={{ minHeight: '60px' }} />
              <button type="button" className="admin-btn admin-btn-secondary" onClick={addDesc} style={{ alignSelf: 'flex-end' }}>
                <Plus size={14} /> Add
              </button>
            </div>
            {form.description.length > 0 && (
              <div style={{ marginTop: '12px' }}>
                {form.description.map((d, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '8px',
                    padding: '10px 14px', background: 'var(--admin-bg)', borderRadius: '6px',
                    marginBottom: '6px', fontSize: '13px', lineHeight: '1.5'
                  }}>
                    <span style={{ color: 'var(--admin-primary)', fontWeight: 600, marginTop: '1px' }}>P{i + 1}</span>
                    <span style={{ flex: 1 }}>{d}</span>
                    <button type="button" className="admin-tag-remove" onClick={() => removeDesc(i)}>
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="admin-card" style={{ marginBottom: '20px' }}>
          <div className="admin-card-header">
            <h3 className="admin-card-title">Quick Stats</h3>
          </div>

          {form.stats && form.stats.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', marginBottom: '16px' }}>
              {form.stats.map((stat, idx) => (
                <div key={idx} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px', background: 'var(--admin-primary-50)', borderRadius: '8px',
                  border: '1px solid var(--admin-primary-light)',
                }}>
                  <div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--admin-primary)' }}>{stat.value}</div>
                    <div style={{ fontSize: '12px', color: 'var(--admin-text-muted)' }}>{stat.label}</div>
                  </div>
                  <button type="button" className="admin-btn-icon danger" onClick={() => removeStat(idx)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
            <div className="admin-form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label className="admin-label">Label</label>
              <input className="admin-input" value={statLabel} onChange={(e) => setStatLabel(e.target.value)} placeholder="e.g. Projects Completed" />
            </div>
            <div className="admin-form-group" style={{ width: '120px', marginBottom: 0 }}>
              <label className="admin-label">Value</label>
              <input className="admin-input" value={statValue} onChange={(e) => setStatValue(e.target.value)} placeholder="e.g. 10+" />
            </div>
            <button type="button" className="admin-btn admin-btn-secondary" onClick={addStat}>
              <Plus size={14} /> Add
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
