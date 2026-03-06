import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, AlertCircle, Eye, EyeOff } from 'lucide-react';
import '../admin.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(
        err.code === 'auth/invalid-credential'
          ? 'Invalid email or password'
          : err.code === 'auth/too-many-requests'
          ? 'Too many attempts. Please try again later.'
          : 'Failed to login. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      {/* Floating bubbles */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none'
      }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${60 + i * 30}px`,
              height: `${60 + i * 30}px`,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              top: `${10 + i * 15}%`,
              left: `${5 + i * 16}%`,
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="admin-login-card">
        <div className="admin-login-logo">
          <div className="admin-login-logo-icon">
            <Shield size={28} />
          </div>
          <h1 className="admin-login-title">Welcome Back</h1>
          <p className="admin-login-subtitle">
            Sign in to manage your portfolio
          </p>
        </div>

        {error && (
          <div className="admin-login-error">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-label">Email Address</label>
            <input
              type="email"
              className="admin-input"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="admin-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingRight: '44px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--admin-text-muted)',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--admin-text-muted)',
          marginTop: '24px',
        }}>
          Portfolio Admin Panel © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
