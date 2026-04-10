import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, MessageSquare, Star, Images, ArrowRight } from 'lucide-react';
import { projectsService, testimonialsService, contactsService, portfolioService } from '../services/supabase';

export default function AdminDashboard() {
  const [stats, setStats]               = useState({ projects: 0, portfolio: 0, testimonials: 0, messages: 0 });
  const [recentMessages, setRecentMsgs] = useState([]);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    Promise.all([
      projectsService.getAll(),
      portfolioService.getAll(),
      testimonialsService.getAll(),
      contactsService.getAll(),
    ]).then(([proj, pf, testi, contacts]) => {
      setStats({
        projects:     proj.data?.length    || 0,
        portfolio:    pf.data?.length      || 0,
        testimonials: testi.data?.length   || 0,
        messages:     contacts.data?.length || 0,
      });
      setRecentMsgs((contacts.data || []).slice(0, 5));
      setLoading(false);
    });
  }, []);

  const statCards = [
    { label: 'Total Projects',   value: stats.projects,     Icon: FolderOpen,   color: 'var(--color-gold)', path: '/admin/projects' },
    { label: 'Portfolio Items',  value: stats.portfolio,    Icon: Images,        color: '#a78bfa',           path: '/admin/portfolio' },
    { label: 'Testimonials',     value: stats.testimonials, Icon: Star,          color: '#60a5fa',           path: '/admin/testimonials' },
    { label: 'Messages',         value: stats.messages,     Icon: MessageSquare, color: '#4ade80',           path: '/admin/messages' },
  ];

  const quickActions = [
    { path: '/admin/projects',     label: 'Manage Projects' },
    { path: '/admin/portfolio',    label: 'Manage Portfolio' },
    { path: '/admin/testimonials', label: 'Manage Testimonials' },
    { path: '/admin/messages',     label: 'View Messages' },
  ];

  return (
    <>
      <div className="admin-header">
        <h1>Dashboard</h1>
        <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>
          Winstone Projects · Admin
        </span>
      </div>

      {/* ── Stat Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {statCards.map(({ label, value, Icon, color, path }) => (
          <Link key={label} to={path} style={{ textDecoration: 'none' }}>
            <div
              className="admin-card"
              style={{ display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', transition: 'border-color 0.3s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = color}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
            >
              <div style={{ width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}18`, border: `1px solid ${color}30`, color, flexShrink: 0 }}>
                <Icon size={22} />
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                  {loading ? '—' : value}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px' }}>
                  {label}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Recent Messages ── */}
      <div className="admin-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Recent Messages</h3>
          <Link to="/admin/messages" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--color-gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>
            View All <ArrowRight size={13} />
          </Link>
        </div>
        {loading ? (
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.88rem', padding: '20px 0' }}>Loading…</p>
        ) : recentMessages.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.88rem', padding: '20px 0' }}>No messages yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {recentMessages.map((msg) => (
                <tr key={msg.id}>
                  <td style={{ color: '#fff', fontWeight: 500 }}>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.phone || '—'}</td>
                  <td style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
                    {msg.created_at ? new Date(msg.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Quick Actions ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '28px' }}>
        {quickActions.map(({ path, label }) => (
          <Link key={path} to={path} style={{ textDecoration: 'none' }}>
            <div
              className="admin-card"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'border-color 0.3s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-gold)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
            >
              <div>
                <p style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '6px' }}>Quick Action</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{label}</p>
              </div>
              <ArrowRight size={18} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
