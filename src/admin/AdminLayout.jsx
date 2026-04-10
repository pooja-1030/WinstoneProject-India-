import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, FolderOpen, MessageSquare, LogOut, Star, Images } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { path: '/admin/dashboard',    label: 'Dashboard',    Icon: LayoutDashboard },
  { path: '/admin/projects',     label: 'Projects',     Icon: FolderOpen },
  { path: '/admin/portfolio',    label: 'Portfolio',    Icon: Images },
  { path: '/admin/testimonials', label: 'Testimonials', Icon: Star },
  { path: '/admin/messages',     label: 'Messages',     Icon: MessageSquare },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">
          <img src="/winstonelogo.jpg" alt="Winstone" />
          <div>
            <span className="admin-sidebar__logo-text">WINSTONE</span>
            <span className="admin-sidebar__logo-sub">ADMIN</span>
          </div>
        </div>

        <nav className="admin-nav">
          {navItems.map(({ path, label, Icon }) => (
            <Link
              key={path}
              to={path}
              className={`admin-nav__link${pathname === path ? ' admin-nav__link--active' : ''}`}
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>

        {/* User + Logout */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: 32, height: 32, background: 'var(--color-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0a', fontWeight: 700, fontSize: '0.85rem' }}>
              A
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email || 'Admin'}
              </p>
              <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              width: '100%', background: 'none', border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.4)', padding: '9px 14px',
              fontSize: '0.75rem', fontWeight: 500, letterSpacing: '1px',
              cursor: 'pointer', transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
