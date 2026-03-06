import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Home,
  User,
  Zap,
  FolderOpen,
  Briefcase,
  GraduationCap,
  Mail,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  {
    section: 'MAIN',
    items: [
      { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    ],
  },
  {
    section: 'CONTENT MANAGEMENT',
    items: [
      { name: 'Home / Hero', path: '/admin/hero', icon: Home },
      { name: 'About Me', path: '/admin/about', icon: User },
      { name: 'Skills', path: '/admin/skills', icon: Zap },
      { name: 'Projects', path: '/admin/projects', icon: FolderOpen },
      { name: 'Experience', path: '/admin/experience', icon: Briefcase },
      { name: 'Education', path: '/admin/education', icon: GraduationCap },
    ],
  },
  {
    section: 'INBOX',
    items: [
      { name: 'Messages', path: '/admin/messages', icon: Mail, badge: true },
    ],
  },
  {
    section: 'SYSTEM',
    items: [
      { name: 'Settings', path: '/admin/settings', icon: Settings },
    ],
  },
];

export default function Sidebar({ isOpen, onClose, unreadCount = 0 }) {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      <aside className={`admin-sidebar ${isOpen ? 'mobile-open' : ''}`}>
        {/* Logo */}
        <NavLink to="/admin" className="sidebar-logo" onClick={onClose}>
          <div className="sidebar-logo-icon">P</div>
          <div className="sidebar-logo-text">
            Portfolio<span>Admin</span>
          </div>
        </NavLink>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((group) => (
            <div key={group.section}>
              <div className="sidebar-section-title">{group.section}</div>
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                  onClick={onClose}
                >
                  <item.icon className="sidebar-link-icon" size={20} />
                  <span className="sidebar-link-text">{item.name}</span>
                  {item.badge && unreadCount > 0 && (
                    <span className="sidebar-badge">{unreadCount}</span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            {currentUser?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">
              {currentUser?.displayName || 'Admin User'}
            </div>
            <div className="sidebar-user-email">
              {currentUser?.email || 'admin@portfolio.com'}
            </div>
          </div>
          <button
            className="admin-btn-icon"
            onClick={handleLogout}
            title="Logout"
            style={{ flexShrink: 0 }}
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>
    </>
  );
}
