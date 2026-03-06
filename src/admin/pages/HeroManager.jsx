import { useState, useEffect } from 'react';
import { Save, Home, Upload, X, Plus } from 'lucide-react';
import { getHero, updateHero, uploadFile } from '../../firebase/services';

export default function HeroManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [typedInput, setTypedInput] = useState('');
  const [form, setForm] = useState({
    name: '', firstName: '', lastName: '', greeting: 'Hi, I\'m',
    typedStrings: [], description: '', profileImage: '', cvUrl: '',
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getHero();
        if (data) setForm(prev => ({ ...prev, ...data }));
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    })();
  }, []);

  const addTypedString = () => {
    if (typedInput.trim()) {
      setForm({ ...form, typedStrings: [...form.typedStrings, typedInput.trim()] });
      setTypedInput('');
    }
  };

  const removeTypedString = (idx) => {
    setForm({ ...form, typedStrings: form.typedStrings.filter((_, i) => i !== idx) });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await uploadFile(file, `hero/${Date.now()}_${file.name}`);
      setForm({ ...form, profileImage: url });
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateHero(form);
      alert('Hero section updated!');
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
        <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Home / Hero Section</h2>
        <p style={{ fontSize: '13px', color: 'var(--admin-text-muted)' }}>
          Customize the hero section of your portfolio
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          {/* Left - Form */}
          <div>
            <div className="admin-card" style={{ marginBottom: '20px' }}>
              <div className="admin-card-header">
                <h3 className="admin-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Home size={18} /> Personal Info
                </h3>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Greeting Text</label>
                <input className="admin-input" value={form.greeting} onChange={(e) => setForm({ ...form, greeting: e.target.value })} placeholder="Hi, I'm" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="admin-form-group">
                  <label className="admin-label">First Name</label>
                  <input className="admin-input" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="Andhika" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Last Name</label>
                  <input className="admin-input" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Presha Saputra" />
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Full Name</label>
                <input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Andhika Presha Saputra" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Description</label>
                <textarea className="admin-textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Write a short description..." />
              </div>
            </div>

            <div className="admin-card" style={{ marginBottom: '20px' }}>
              <div className="admin-card-header">
                <h3 className="admin-card-title">Typed Animation Strings</h3>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input className="admin-input" value={typedInput} onChange={(e) => setTypedInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTypedString(); } }}
                  placeholder="e.g. A Fullstack Developer — press Enter" />
                <button type="button" className="admin-btn admin-btn-secondary" onClick={addTypedString}>Add</button>
              </div>
              {form.typedStrings.length > 0 && (
                <div style={{ marginTop: '12px' }}>
                  {form.typedStrings.map((s, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '8px 12px', background: 'var(--admin-bg)', borderRadius: '6px',
                      marginBottom: '4px', fontSize: '13px'
                    }}>
                      <span style={{ flex: 1 }}>{s}</span>
                      <button type="button" className="admin-tag-remove" onClick={() => removeTypedString(i)}><X size={14} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">Files</h3>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">CV / Resume URL</label>
                <input className="admin-input" value={form.cvUrl} onChange={(e) => setForm({ ...form, cvUrl: e.target.value })} placeholder="/assets/documents/CV.pdf or external URL" />
              </div>
            </div>
          </div>

          {/* Right - Preview Card */}
          <div>
            <div className="admin-card" style={{ position: 'sticky', top: '100px' }}>
              <div className="admin-card-header">
                <h3 className="admin-card-title">Profile Image</h3>
              </div>
              <div style={{
                width: '100%', aspectRatio: '1', borderRadius: '12px', overflow: 'hidden',
                background: 'linear-gradient(135deg, #7C3AED, #6366F1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px', position: 'relative'
              }}>
                {form.profileImage ? (
                  <img src={form.profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ color: 'white', fontSize: '48px', fontWeight: 700 }}>
                    {form.firstName?.charAt(0) || 'A'}
                  </span>
                )}
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Image URL</label>
                <input className="admin-input" value={form.profileImage} onChange={(e) => setForm({ ...form, profileImage: e.target.value })} placeholder="/assets/profile/photo.jpg" />
              </div>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ fontSize: '13px' }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
