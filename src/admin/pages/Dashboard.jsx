import { useState, useEffect } from 'react';
import {
  Eye,
  FolderOpen,
  Mail,
  Download,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Plus,
  Edit2,
  Trash2,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  getDashboardStats,
  getProjects,
  getSkills,
  getExperiences,
  getMessages,
} from '../../firebase/services';

// Mock analytics data (replace with real analytics later)
const visitorData = [
  { day: 'Mon', visitors: 180 },
  { day: 'Tue', visitors: 220 },
  { day: 'Wed', visitors: 310 },
  { day: 'Thu', visitors: 275 },
  { day: 'Fri', visitors: 390 },
  { day: 'Sat', visitors: 420 },
  { day: 'Sun', visitors: 350 },
];

const trafficData = [
  { name: 'Direct', value: 40, color: '#7C3AED' },
  { name: 'Social', value: 30, color: '#6366F1' },
  { name: 'Search', value: 20, color: '#A78BFA' },
  { name: 'Referral', value: 10, color: '#C4B5FD' },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalViews: 0,
    totalProjects: 0,
    newMessages: 0,
    cvDownloads: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsData, projectsData, skillsData, expData, msgData] =
        await Promise.all([
          getDashboardStats(),
          getProjects(),
          getSkills(),
          getExperiences(),
          getMessages(),
        ]);

      setStats(statsData);
      setRecentProjects(projectsData.slice(0, 3));
      setSkills(skillsData.slice(0, 4));
      setExperiences(expData.slice(0, 3));
      setMessages(msgData.slice(0, 3));
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
      </div>
    );
  }

  return (
    <div>
      {/* Welcome Section */}
      <div className="admin-welcome">
        <div className="admin-welcome-row">
          <div>
            <h1>Welcome back, Admin! 👋</h1>
            <p>Here's what's happening with your portfolio today.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="admin-btn admin-btn-secondary" onClick={fetchData}>
              <RefreshCw size={16} />
              <span>Refresh Data</span>
            </button>
            <Link to="/admin/projects" className="admin-btn admin-btn-primary">
              <Plus size={16} />
              <span>Add New Project</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card purple">
          <div className="stat-card-header">
            <div className="stat-card-icon purple">
              <Eye size={22} />
            </div>
            <div className="stat-card-badge up">
              <TrendingUp size={12} />
              +13.5%
            </div>
          </div>
          <div className="stat-card-label">Total Views</div>
          <div className="stat-card-value">
            {stats.totalViews.toLocaleString()}
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-card-header">
            <div className="stat-card-icon green">
              <FolderOpen size={22} />
            </div>
            <span className="badge badge-published">Active</span>
          </div>
          <div className="stat-card-label">Total Projects</div>
          <div className="stat-card-value">{stats.totalProjects}</div>
        </div>

        <div className="stat-card orange">
          <div className="stat-card-header">
            <div className="stat-card-icon orange">
              <Mail size={22} />
            </div>
          </div>
          <div className="stat-card-label">New Messages</div>
          <div className="stat-card-value">{stats.newMessages}</div>
        </div>

        <div className="stat-card blue">
          <div className="stat-card-header">
            <div className="stat-card-icon blue">
              <Download size={22} />
            </div>
            <span className="stat-card-badge up" style={{ fontSize: '11px' }}>
              This Month
            </span>
          </div>
          <div className="stat-card-label">CV Downloads</div>
          <div className="stat-card-value">{stats.cvDownloads}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Visitor Analytics */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Visitor Analytics</h3>
            <select
              className="admin-select"
              style={{ width: 'auto', padding: '6px 12px', fontSize: '13px' }}
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
              />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#7C3AED"
                strokeWidth={2.5}
                dot={{ fill: '#7C3AED', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#7C3AED' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Sources */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Traffic Sources</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={trafficData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                dataKey="value"
                stroke="none"
              >
                {trafficData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {trafficData.map((item) => (
              <div
                key={item.name}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: item.color,
                  }}
                />
                <span style={{ color: 'var(--admin-text-secondary)' }}>
                  {item.name} ({item.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="admin-card" style={{ marginBottom: '28px' }}>
        <div className="admin-card-header">
          <h3 className="admin-card-title">Recent Projects</h3>
          <Link
            to="/admin/projects"
            style={{
              fontSize: '13px',
              color: 'var(--admin-primary)',
              textDecoration: 'none',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: 'var(--admin-text-muted)', padding: '40px' }}>
                    No projects yet. Add your first project!
                  </td>
                </tr>
              ) : (
                recentProjects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <div className="project-name-cell">
                        <div
                          className="project-thumb"
                          style={{
                            background: project.gradient
                              ? `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`
                              : undefined,
                          }}
                        >
                          {project.image ? (
                            <img src={project.image} alt={project.name} />
                          ) : (
                            project.name?.charAt(0)
                          )}
                        </div>
                        <div>
                          <div className="project-name-text">{project.name}</div>
                          <div className="project-tech-text">
                            {(project.tech || []).join(', ')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{project.category || 'Web App'}</td>
                    <td>
                      <span className={`badge badge-${project.status || 'published'}`}>
                        {project.status === 'draft' ? 'Draft' : 'Published'}
                      </span>
                    </td>
                    <td style={{ color: 'var(--admin-text-muted)', fontSize: '13px' }}>
                      {project.createdAt?.toDate
                        ? project.createdAt.toDate().toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <Link
                          to="/admin/projects"
                          className="admin-btn-icon"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button className="admin-btn-icon danger" title="Delete">
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
      </div>

      {/* Skills + Experience Row */}
      <div className="dashboard-grid-2">
        {/* Skills Management */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Skills Management</h3>
            <Link
              to="/admin/skills"
              className="admin-btn admin-btn-secondary admin-btn-sm"
            >
              <Plus size={14} />
              Add Skill
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {skills.length === 0 ? (
              <p style={{ color: 'var(--admin-text-muted)', fontSize: '14px', textAlign: 'center', padding: '20px' }}>
                No skills added yet
              </p>
            ) : (
              skills.map((skill) => (
                <div key={skill.id} className="skill-item-card">
                  <div
                    className="skill-item-icon"
                    style={{
                      color: skill.color || 'var(--admin-primary)',
                      background: `${skill.color || 'var(--admin-primary)'}15`,
                    }}
                  >
                    {skill.icon || '⚡'}
                  </div>
                  <div className="skill-item-info">
                    <div className="skill-item-name">{skill.name}</div>
                    <div className="skill-item-level">
                      {skill.level || 'Advanced'} • {skill.years || '2'} Years
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Work Experience */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Work Experience</h3>
            <Link
              to="/admin/experience"
              className="admin-btn admin-btn-secondary admin-btn-sm"
            >
              <Plus size={14} />
              Add Job
            </Link>
          </div>
          <div>
            {experiences.length === 0 ? (
              <p style={{ color: 'var(--admin-text-muted)', fontSize: '14px', textAlign: 'center', padding: '20px' }}>
                No experience added yet
              </p>
            ) : (
              experiences.map((exp) => (
                <div key={exp.id} className="exp-item">
                  <div className="exp-dot" />
                  <div className="exp-info">
                    <div className="exp-role">{exp.role}</div>
                    <div className="exp-company">{exp.company}</div>
                    <div className="exp-period">{exp.period}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Recent Messages</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link
              to="/admin/messages"
              style={{
                fontSize: '13px',
                color: 'var(--admin-primary)',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              All
            </Link>
            <span
              style={{
                fontSize: '13px',
                color: 'var(--admin-text-muted)',
                cursor: 'pointer',
              }}
            >
              Unread
            </span>
          </div>
        </div>
        <div>
          {messages.length === 0 ? (
            <p style={{ color: 'var(--admin-text-muted)', fontSize: '14px', textAlign: 'center', padding: '20px' }}>
              No messages yet
            </p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-item ${!msg.isRead ? 'unread' : ''}`}
              >
                <div className="message-avatar">
                  {msg.name?.charAt(0).toUpperCase() || '?'}
                </div>
                <div className="message-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span className="message-name">{msg.name}</span>
                      <span className="message-email" style={{ marginLeft: '8px' }}>
                        {msg.email}
                      </span>
                    </div>
                    <span className="message-time">
                      {msg.createdAt?.toDate
                        ? msg.createdAt.toDate().toLocaleDateString()
                        : ''}
                    </span>
                  </div>
                  <div className="message-text">{msg.message}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
