import { useState, useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import { getUnreadMessageCount } from '../../firebase/services';
import { Menu, Search, ExternalLink } from 'lucide-react';
import '../admin.css';

const pageTitles = {
  '/admin': 'Dashboard Overview',
  '/admin/hero': 'Home / Hero Section',
  '/admin/about': 'About Me Section',
  '/admin/skills': 'Skills Management',
  '/admin/projects': 'Projects Management',
  '/admin/experience': 'Experience Management',
  '/admin/education': 'Education Management',
  '/admin/messages': 'Messages',
  '/admin/settings': 'Settings',
};

export default function AdminLayout() {
  const { currentUser, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      getUnreadMessageCount()
        .then(setUnreadCount)
        .catch(() => setUnreadCount(0));
    }
  }, [currentUser, location.pathname]);

  if (loading) {
    return (
      <div className="admin-loading" style={{ minHeight: '100vh' }}>
        <div className="admin-spinner" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  const pageTitle = pageTitles[location.pathname] || 'Admin Panel';

  return (
    <div className="admin-wrapper">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        unreadCount={unreadCount}
      />

      <main className="admin-main">
        {/* Top Bar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className="admin-menu-toggle"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <h1 className="admin-topbar-title">{pageTitle}</h1>
          </div>

          <div className="admin-topbar-actions">
            <div className="admin-search-wrapper" style={{ position: 'relative' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--admin-text-muted)',
                }}
              />
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search content..."
              />
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-view-live"
            >
              <ExternalLink size={15} />
              <span>View Live Site</span>
            </a>
          </div>
        </header>

        {/* Page Content */}
        <div className="admin-content">
          <Outlet context={{ setUnreadCount }} />
        </div>
      </main>
    </div>
  );
}
