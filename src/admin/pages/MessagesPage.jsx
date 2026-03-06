import { useState, useEffect } from 'react';
import { Mail, Trash2, Eye, Check, X, Search } from 'lucide-react';
import { getMessages, markMessageRead, deleteMessage } from '../../firebase/services';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleMarkRead = async (id) => {
    try {
      await markMessageRead(id);
      setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m));
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMessage(id);
      setMessages(messages.filter(m => m.id !== id));
      if (selected?.id === id) setSelected(null);
      setDeleteConfirm(null);
    } catch (err) { console.error(err); }
  };

  const openMessage = (msg) => {
    setSelected(msg);
    if (!msg.isRead) handleMarkRead(msg.id);
  };

  const filtered = messages.filter((m) => {
    if (filter === 'unread' && m.isRead) return false;
    if (filter === 'read' && !m.isRead) return false;
    if (search) {
      const s = search.toLowerCase();
      return m.name?.toLowerCase().includes(s) ||
             m.email?.toLowerCase().includes(s) ||
             m.message?.toLowerCase().includes(s);
    }
    return true;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  if (loading) return <div className="admin-loading"><div className="admin-spinner" /></div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Messages</h2>
          <p style={{ fontSize: '13px', color: 'var(--admin-text-muted)' }}>
            {messages.length} total • {unreadCount} unread
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="admin-card" style={{ marginBottom: '20px', padding: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '340px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
            <input className="admin-input" placeholder="Search messages..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: '40px' }} />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'unread', 'read'].map((f) => (
              <button key={f} className={`admin-btn admin-btn-sm ${filter === f ? 'admin-btn-primary' : 'admin-btn-secondary'}`} onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f === 'unread' && unreadCount > 0 && (
                  <span style={{ background: 'rgba(255,255,255,0.3)', padding: '1px 6px', borderRadius: '8px', fontSize: '11px', marginLeft: '4px' }}>
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '20px' }}>
        {/* Message List */}
        <div className="admin-card" style={{ padding: 0 }}>
          {filtered.length === 0 ? (
            <div className="admin-empty">
              <div className="admin-empty-icon"><Mail size={28} /></div>
              <div className="admin-empty-title">No messages found</div>
              <div className="admin-empty-text">Messages from your contact form will appear here</div>
            </div>
          ) : (
            filtered.map((msg) => (
              <div
                key={msg.id}
                className={`message-item ${!msg.isRead ? 'unread' : ''}`}
                onClick={() => openMessage(msg)}
                style={{
                  background: selected?.id === msg.id ? 'var(--admin-primary-50)' : undefined,
                  borderLeft: selected?.id === msg.id ? '3px solid var(--admin-primary)' : '3px solid transparent',
                }}
              >
                <div className="message-avatar">
                  {msg.name?.charAt(0).toUpperCase() || '?'}
                </div>
                <div className="message-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="message-name" style={{ fontWeight: msg.isRead ? 500 : 700 }}>
                      {msg.name}
                    </span>
                    <span className="message-time">
                      {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleDateString() : ''}
                    </span>
                  </div>
                  <div className="message-email">{msg.email}</div>
                  <div className="message-text">{msg.message}</div>
                </div>
                {!msg.isRead && (
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: 'var(--admin-primary)', flexShrink: 0, alignSelf: 'center'
                  }} />
                )}
              </div>
            ))
          )}
        </div>

        {/* Message Detail */}
        {selected && (
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <div className="message-avatar" style={{ width: '52px', height: '52px', fontSize: '20px' }}>
                  {selected.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} style={{ fontSize: '13px', color: 'var(--admin-primary)', textDecoration: 'none' }}>
                    {selected.email}
                  </a>
                  <div style={{ fontSize: '12px', color: 'var(--admin-text-muted)', marginTop: '2px' }}>
                    {selected.createdAt?.toDate ? selected.createdAt.toDate().toLocaleString() : ''}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button className="admin-btn-icon" onClick={() => setSelected(null)} title="Close">
                  <X size={18} />
                </button>
                <button className="admin-btn-icon danger" onClick={() => setDeleteConfirm(selected.id)} title="Delete">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div style={{
              padding: '20px', background: 'var(--admin-bg)', borderRadius: '10px',
              fontSize: '14px', lineHeight: '1.7', color: 'var(--admin-text-secondary)',
              whiteSpace: 'pre-wrap'
            }}>
              {selected.message}
            </div>
            <div style={{ marginTop: '16px' }}>
              <a
                href={`mailto:${selected.email}?subject=Re: Portfolio Contact`}
                className="admin-btn admin-btn-primary"
              >
                <Mail size={16} /> Reply via Email
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="admin-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <div className="admin-modal-body" style={{ textAlign: 'center', padding: '32px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--admin-danger-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--admin-danger)' }}>
                <Trash2 size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Delete Message?</h3>
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
