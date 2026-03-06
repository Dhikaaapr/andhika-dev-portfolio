import { useState, useEffect } from 'react';
import { Save, Settings as SettingsIcon, Globe, Mail, Shield, Palette } from 'lucide-react';
import { getSettings, updateSettings } from '../../firebase/services';
import { useAuth } from '../context/AuthContext';

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [form, setForm] = useState({
    siteTitle: 'Portfolio | Andhika Presha Saputra',
    siteDescription: '',
    siteUrl: '',
    email: '',
    linkedIn: '',
    github: '',
    instagram: '',
    totalViews: 0,
    cvDownloads: 0,
    primaryColor: '#7C3AED',
    accentColor: '#6366F1',
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getSettings();
        if (data) setForm(prev => ({ ...prev, ...data }));
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSettings(form);
      alert('Settings saved!');
    } catch (err) {
      console.error(err);
      alert('Error saving');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loading"><div className="admin-spinner" /></div>;

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'social', label: 'Social Links', icon: Mail },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'account', label: 'Account', icon: Shield },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Settings</h2>
        <p style={{ fontSize: '13px', color: 'var(--admin-text-muted)' }}>
          Manage your portfolio settings
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '0' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '10px 16px', fontSize: '14px', fontWeight: 500,
              border: 'none', background: 'none', cursor: 'pointer',
              color: activeTab === tab.id ? 'var(--admin-primary)' : 'var(--admin-text-muted)',
              borderBottom: activeTab === tab.id ? '2px solid var(--admin-primary)' : '2px solid transparent',
              transition: 'all 0.2s',
              marginBottom: '-1px',
            }}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* General */}
        {activeTab === 'general' && (
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">General Settings</h3>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Site Title</label>
              <input className="admin-input" value={form.siteTitle} onChange={(e) => setForm({ ...form, siteTitle: e.target.value })} placeholder="Portfolio title" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Site Description</label>
              <textarea className="admin-textarea" value={form.siteDescription} onChange={(e) => setForm({ ...form, siteDescription: e.target.value })} placeholder="Meta description for SEO" rows={3} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Site URL</label>
              <input className="admin-input" value={form.siteUrl} onChange={(e) => setForm({ ...form, siteUrl: e.target.value })} placeholder="https://yourportfolio.com" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="admin-form-group">
                <label className="admin-label">Total Views (Manual)</label>
                <input className="admin-input" type="number" value={form.totalViews} onChange={(e) => setForm({ ...form, totalViews: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">CV Downloads (Manual)</label>
                <input className="admin-input" type="number" value={form.cvDownloads} onChange={(e) => setForm({ ...form, cvDownloads: parseInt(e.target.value) || 0 })} />
              </div>
            </div>
          </div>
        )}

        {/* Social */}
        {activeTab === 'social' && (
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Social Links</h3>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Email</label>
              <input className="admin-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="contact@example.com" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">LinkedIn URL</label>
              <input className="admin-input" value={form.linkedIn} onChange={(e) => setForm({ ...form, linkedIn: e.target.value })} placeholder="https://linkedin.com/in/..." />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">GitHub URL</label>
              <input className="admin-input" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} placeholder="https://github.com/..." />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Instagram URL</label>
              <input className="admin-input" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} placeholder="https://instagram.com/..." />
            </div>
          </div>
        )}

        {/* Appearance */}
        {activeTab === 'appearance' && (
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Appearance</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="admin-form-group">
                <label className="admin-label">Primary Color</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input type="color" value={form.primaryColor} onChange={(e) => setForm({ ...form, primaryColor: e.target.value })} style={{ width: '40px', height: '36px', border: 'none', cursor: 'pointer' }} />
                  <input className="admin-input" value={form.primaryColor} onChange={(e) => setForm({ ...form, primaryColor: e.target.value })} />
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Accent Color</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input type="color" value={form.accentColor} onChange={(e) => setForm({ ...form, accentColor: e.target.value })} style={{ width: '40px', height: '36px', border: 'none', cursor: 'pointer' }} />
                  <input className="admin-input" value={form.accentColor} onChange={(e) => setForm({ ...form, accentColor: e.target.value })} />
                </div>
              </div>
            </div>
            <div style={{
              marginTop: '16px', padding: '20px', borderRadius: '10px',
              background: `linear-gradient(135deg, ${form.primaryColor}, ${form.accentColor})`,
              color: 'white', textAlign: 'center'
            }}>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>Color Preview</div>
              <div style={{ fontSize: '13px', opacity: 0.8 }}>This is how your accent colors will look</div>
            </div>
          </div>
        )}

        {/* Account */}
        {activeTab === 'account' && (
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Account Information</h3>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Email</label>
              <input className="admin-input" value={currentUser?.email || ''} disabled style={{ opacity: 0.6 }} />
              <p style={{ fontSize: '12px', color: 'var(--admin-text-muted)', marginTop: '4px' }}>
                Email can be changed in Firebase Console
              </p>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">User ID</label>
              <input className="admin-input" value={currentUser?.uid || ''} disabled style={{ opacity: 0.6, fontFamily: 'monospace' }} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Last Login</label>
              <input className="admin-input" value={currentUser?.metadata?.lastSignInTime || ''} disabled style={{ opacity: 0.6 }} />
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            <Save size={16} /> {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
