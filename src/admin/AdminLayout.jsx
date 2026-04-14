import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, FolderOpen, Images, Star, MessageSquare,
  Settings, LogOut, Menu, X, Bell, Sun, Moon, Briefcase,
  CheckSquare, Globe, ChevronRight, Users, Layers,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { contactsService } from '../services/supabase';

const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { path: '/admin/dashboard',    label: 'Dashboard',    Icon: LayoutDashboard },
    ],
  },
  {
    label: 'Content',
    items: [
      { path: '/admin/projects',     label: 'Projects',     Icon: FolderOpen },
      { path: '/admin/portfolio',    label: 'Portfolio',    Icon: Images },
      { path: '/admin/services',     label: 'Services',     Icon: Briefcase },
      { path: '/admin/testimonials', label: 'Testimonials', Icon: Star },
      { path: '/admin/why-us',       label: 'Why Us',       Icon: CheckSquare },
    ],
  },
  {
    label: 'Leads',
    items: [
      { path: '/admin/leads',        label: 'Contact Leads', Icon: Users },
    ],
  },
  {
    label: 'Configuration',
    items: [
      { path: '/admin/settings',     label: 'Settings & SEO', Icon: Settings },
    ],
  },
];

const PAGE_TITLES = {
  '/admin/dashboard':    'Dashboard',
  '/admin/projects':     'Projects',
  '/admin/portfolio':    'Portfolio',
  '/admin/services':     'Services',
  '/admin/testimonials': 'Testimonials',
  '/admin/why-us':       'Why Choose Us',
  '/admin/leads':        'Contact Leads',
  '/admin/settings':     'Settings & SEO',
};

export default function AdminLayout() {
  const { pathname } = useLocation();
  const { signOut, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen]     = useState(false);
  const [newLeads, setNewLeads]       = useState([]);
  const notifRef = useRef(null);

  const pageTitle = PAGE_TITLES[pathname] || 'Admin';

  // Fetch new leads count for notification badge
  useEffect(() => {
    contactsService.getNew().then(({ data }) => setNewLeads(data || []));
  }, [pathname]);

  // Close notif dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const isLight = theme === 'light';

  // Theme-aware colours
  const T = {
    bg:          isLight ? '#f1f5f9'               : '#0d0d0d',
    sidebar:     isLight ? '#1e293b'               : '#080808',
    sidebarBdr:  isLight ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)',
    topbar:      isLight ? '#fff'                  : '#0d0d0d',
    topbarBdr:   isLight ? 'rgba(0,0,0,0.08)'      : 'rgba(255,255,255,0.06)',
    card:        isLight ? '#fff'                  : '#111',
    navLabel:    isLight ? 'rgba(255,255,255,0.35)': 'rgba(255,255,255,0.25)',
    navLink:     isLight ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.45)',
    navHover:    isLight ? '#fff'                  : '#fff',
    text:        isLight ? '#1e293b'               : '#fff',
    textMuted:   isLight ? 'rgba(30,41,59,0.5)'    : 'rgba(255,255,255,0.35)',
    iconBg:      isLight ? 'rgba(0,0,0,0.06)'      : 'rgba(255,255,255,0.05)',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: T.bg }}>

      {/* ── Mobile Overlay ── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 999 }}
        />
      )}

      {/* ══ SIDEBAR ══════════════════════════════════════════ */}
      <aside style={{
        width: 260,
        background: T.sidebar,
        borderRight: `1px solid ${T.sidebarBdr}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        zIndex: 1000,
        transform: sidebarOpen ? 'translateX(0)' : undefined,
        transition: 'transform 0.3s ease',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: `1px solid ${T.sidebarBdr}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/winstonelogo.jpg" alt="Winstone" style={{ width: 34, height: 34, objectFit: 'cover', borderRadius: 4, border: '1px solid rgba(201,164,92,0.4)' }} />
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', color: '#fff' }}>WINSTONE</div>
              <div style={{ fontSize: '0.58rem', color: 'var(--color-gold)', letterSpacing: '3px' }}>ADMIN CMS</div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{ display: 'none', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}
            className="sidebar-close-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} style={{ marginBottom: '8px' }}>
              <div style={{ padding: '8px 20px 6px', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: T.navLabel }}>
                {section.label}
              </div>
              {section.items.map(({ path, label, Icon }) => {
                const active = pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setSidebarOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '11px',
                      padding: '10px 20px',
                      fontSize: '0.82rem', fontWeight: active ? 600 : 500,
                      color: active ? 'var(--color-gold)' : T.navLink,
                      textDecoration: 'none',
                      borderLeft: `2px solid ${active ? 'var(--color-gold)' : 'transparent'}`,
                      background: active ? 'rgba(201,164,92,0.07)' : 'transparent',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; } }}
                    onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = T.navLink; e.currentTarget.style.background = 'transparent'; } }}
                  >
                    <Icon size={16} style={{ flexShrink: 0 }} />
                    <span style={{ flex: 1 }}>{label}</span>
                    {label === 'Contact Leads' && newLeads.length > 0 && (
                      <span style={{ background: '#ef4444', color: '#fff', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, flexShrink: 0 }}>
                        {newLeads.length > 99 ? '99+' : newLeads.length}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Website link */}
        <div style={{ padding: '12px 20px', borderTop: `1px solid ${T.sidebarBdr}` }}>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '9px 14px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.5px',
            textDecoration: 'none', transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            <Globe size={13} /> View Website
          </a>
        </div>

        {/* User */}
        <div style={{ padding: '16px 20px', borderTop: `1px solid ${T.sidebarBdr}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: 34, height: 34, background: 'var(--color-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0a', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
              {user?.email?.[0]?.toUpperCase() || 'A'}
            </div>
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email || 'Admin'}
              </p>
              <p style={{ fontSize: '0.6rem', color: 'var(--color-gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
              background: 'none', border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.4)', padding: '9px 14px',
              fontSize: '0.72rem', fontWeight: 500, letterSpacing: '1px',
              cursor: 'pointer', transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ══ MAIN CONTENT ═════════════════════════════════════ */}
      <div style={{ flex: 1, marginLeft: 260, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* ── Top Bar ── */}
        <header style={{
          height: 64,
          background: T.topbar,
          borderBottom: `1px solid ${T.topbarBdr}`,
          display: 'flex', alignItems: 'center',
          padding: '0 32px', gap: '16px',
          position: 'sticky', top: 0, zIndex: 100,
        }}>
          {/* Hamburger (mobile) */}
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ display: 'none', background: 'none', border: 'none', color: T.textMuted, cursor: 'pointer' }}
            className="admin-hamburger"
          >
            <Menu size={20} />
          </button>

          {/* Breadcrumb */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.7rem', color: T.textMuted, letterSpacing: '0.5px' }}>Admin</span>
            <ChevronRight size={12} style={{ color: T.textMuted }} />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: T.text }}>{pageTitle}</span>
          </div>

          {/* Right: Notifications + Theme + Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              style={{
                width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: T.iconBg, border: `1px solid ${T.topbarBdr}`,
                color: T.textMuted, cursor: 'pointer', transition: 'all 0.2s ease',
                borderRadius: 4,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-gold)'; e.currentTarget.style.borderColor = 'var(--color-gold)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = T.textMuted; e.currentTarget.style.borderColor = T.topbarBdr; }}
            >
              {isLight ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Notifications */}
            <div ref={notifRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setNotifOpen((o) => !o)}
                style={{
                  width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: T.iconBg, border: `1px solid ${T.topbarBdr}`,
                  color: T.textMuted, cursor: 'pointer', transition: 'all 0.2s ease',
                  position: 'relative', borderRadius: 4,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-gold)'; e.currentTarget.style.borderColor = 'var(--color-gold)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = T.textMuted; e.currentTarget.style.borderColor = T.topbarBdr; }}
              >
                <Bell size={16} />
                {newLeads.length > 0 && (
                  <span style={{
                    position: 'absolute', top: -4, right: -4,
                    background: '#ef4444', color: '#fff', borderRadius: '50%',
                    width: 16, height: 16, fontSize: '0.58rem', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `2px solid ${T.topbar}`,
                  }}>
                    {newLeads.length > 9 ? '9+' : newLeads.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notifOpen && (
                <div style={{
                  position: 'absolute', top: '44px', right: 0, width: 320,
                  background: isLight ? '#fff' : '#151515',
                  border: `1px solid ${T.topbarBdr}`,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                  zIndex: 300,
                }}>
                  <div style={{ padding: '16px 18px', borderBottom: `1px solid ${T.topbarBdr}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: T.text, letterSpacing: '0.5px' }}>New Leads</span>
                    {newLeads.length > 0 && (
                      <span style={{ background: '#ef4444', color: '#fff', borderRadius: 20, padding: '2px 8px', fontSize: '0.62rem', fontWeight: 700 }}>
                        {newLeads.length} new
                      </span>
                    )}
                  </div>
                  <div style={{ maxHeight: 280, overflowY: 'auto' }}>
                    {newLeads.length === 0 ? (
                      <div style={{ padding: '32px', textAlign: 'center', color: T.textMuted, fontSize: '0.82rem' }}>
                        No new leads
                      </div>
                    ) : newLeads.slice(0, 5).map((lead) => (
                      <div key={lead.id} style={{ padding: '12px 18px', borderBottom: `1px solid ${T.topbarBdr}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: 30, height: 30, background: 'var(--color-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0a', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0 }}>
                          {lead.name?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: T.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lead.name}</p>
                          <p style={{ fontSize: '0.7rem', color: T.textMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lead.phone || lead.email}</p>
                        </div>
                        <span style={{ fontSize: '0.6rem', color: T.textMuted, flexShrink: 0 }}>
                          {lead.created_at ? new Date(lead.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/admin/leads"
                    onClick={() => setNotifOpen(false)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '12px', fontSize: '0.75rem', color: 'var(--color-gold)', textDecoration: 'none', borderTop: `1px solid ${T.topbarBdr}`, fontWeight: 600, letterSpacing: '0.5px' }}
                  >
                    View All Leads <ChevronRight size={13} />
                  </Link>
                </div>
              )}
            </div>

            {/* Profile pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: T.iconBg, border: `1px solid ${T.topbarBdr}`, borderRadius: 4 }}>
              <div style={{ width: 26, height: 26, background: 'var(--color-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0a', fontWeight: 700, fontSize: '0.75rem' }}>
                {user?.email?.[0]?.toUpperCase() || 'A'}
              </div>
              <span style={{ fontSize: '0.75rem', color: T.text, fontWeight: 500, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.email || 'Admin'}
              </span>
            </div>
          </div>
        </header>

        {/* ── Page Content ── */}
        <main style={{ flex: 1, padding: '36px 40px', background: T.bg }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
