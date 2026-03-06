import { useState, useEffect } from 'react';
import { Save, GraduationCap, Plus, X, Trash2 } from 'lucide-react';
import { getEducation, updateEducation } from '../../firebase/services';

export default function EducationManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    degree: {
      title: '', university: '', period: '', location: '', gpa: '', status: '',
    },
    overview: '',
    achievements: [],
  });
  const [achTitle, setAchTitle] = useState('');
  const [achDesc, setAchDesc] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getEducation();
        if (data) setForm(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateDegree = (key, value) => {
    setForm({ ...form, degree: { ...form.degree, [key]: value } });
  };

  const addAchievement = () => {
    if (achTitle.trim()) {
      setForm({
        ...form,
        achievements: [...(form.achievements || []), { title: achTitle.trim(), description: achDesc.trim() }],
      });
      setAchTitle('');
      setAchDesc('');
    }
  };

  const removeAchievement = (idx) => {
    setForm({
      ...form,
      achievements: form.achievements.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateEducation(form);
      alert('Education updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="admin-loading"><div className="admin-spinner" /></div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Education</h2>
          <p style={{ fontSize: '13px', color: 'var(--admin-text-muted)' }}>
            Manage your education information
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Degree Info */}
        <div className="admin-card" style={{ marginBottom: '20px' }}>
          <div className="admin-card-header">
            <h3 className="admin-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GraduationCap size={20} /> Degree Information
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="admin-form-group">
              <label className="admin-label">Degree Title</label>
              <input className="admin-input" value={form.degree.title} onChange={(e) => updateDegree('title', e.target.value)} placeholder="e.g. Bachelor of IT" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">University</label>
              <input className="admin-input" value={form.degree.university} onChange={(e) => updateDegree('university', e.target.value)} placeholder="e.g. Universitas Paramadina" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Period</label>
              <input className="admin-input" value={form.degree.period} onChange={(e) => updateDegree('period', e.target.value)} placeholder="e.g. Sep 2023 - Jan 2026" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Location</label>
              <input className="admin-input" value={form.degree.location} onChange={(e) => updateDegree('location', e.target.value)} placeholder="e.g. Jakarta, Indonesia" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">GPA</label>
              <input className="admin-input" value={form.degree.gpa} onChange={(e) => updateDegree('gpa', e.target.value)} placeholder="e.g. 3.85" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Status</label>
              <input className="admin-input" value={form.degree.status} onChange={(e) => updateDegree('status', e.target.value)} placeholder="e.g. Still Ongoing" />
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="admin-card" style={{ marginBottom: '20px' }}>
          <div className="admin-card-header">
            <h3 className="admin-card-title">Overview</h3>
          </div>
          <div className="admin-form-group" style={{ marginBottom: 0 }}>
            <textarea className="admin-textarea" value={form.overview} onChange={(e) => setForm({ ...form, overview: e.target.value })} placeholder="Write about your academic journey..." rows={4} />
          </div>
        </div>

        {/* Achievements */}
        <div className="admin-card" style={{ marginBottom: '20px' }}>
          <div className="admin-card-header">
            <h3 className="admin-card-title">Achievements & Certifications</h3>
          </div>

          {form.achievements && form.achievements.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              {form.achievements.map((ach, idx) => (
                <div key={idx} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '12px',
                  padding: '14px', background: 'var(--admin-bg)', borderRadius: '8px',
                  marginBottom: '8px'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{ach.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--admin-text-secondary)', marginTop: '4px' }}>{ach.description}</div>
                  </div>
                  <button type="button" className="admin-btn-icon danger" onClick={() => removeAchievement(idx)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div style={{ padding: '16px', background: 'var(--admin-bg)', borderRadius: '8px' }}>
            <div className="admin-form-group">
              <label className="admin-label">Achievement Title</label>
              <input className="admin-input" value={achTitle} onChange={(e) => setAchTitle(e.target.value)} placeholder="e.g. Best Student Award" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Description</label>
              <textarea className="admin-textarea" value={achDesc} onChange={(e) => setAchDesc(e.target.value)} placeholder="Describe the achievement..." rows={2} />
            </div>
            <button type="button" className="admin-btn admin-btn-secondary" onClick={addAchievement}>
              <Plus size={14} /> Add Achievement
            </button>
          </div>
        </div>

        {/* Save */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
