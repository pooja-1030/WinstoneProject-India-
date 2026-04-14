import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderOpen, MessageSquare, Star, Images, ArrowRight,
  Briefcase, TrendingUp, Users, CheckSquare, Plus,
} from 'lucide-react';
import {
  projectsService, testimonialsService, contactsService,
  portfolioService, servicesService,
} from '../services/supabase';

const fmt = (d) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

const statusColour = (s) => ({
  new:       { bg: 'rgba(239,68,68,0.12)',   text: '#f87171',   label: 'New'       },
  contacted: { bg: 'rgba(34,197,94,0.12)',   text: '#4ade80',   label: 'Contacted' },
  closed:    { bg: 'rgba(255,255,255,0.07)', text: 'rgba(255,255,255,0.35)', label: 'Closed' },
}[s] || { bg: 'rgba(239,68,68,0.12)', text: '#f87171', label: 'New' });

export default function AdminDashboard() {
  const [counts, setCounts]         = useState({ projects: 0, portfolio: 0, testimonials: 0, leads: 0, newLeads: 0, services: 0 });
  const [recentLeads, setLeads]     = useState([]);
  const [recentProjects, setProjs]  = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    Promise.all([
      projectsService.getAll(),
      portfolioService.getAll(),
      testimonialsService.getAll(),
      contactsService.getAll(),
      servicesService.getAll(),
    ]).then(([proj, pf, testi, contacts, svcs]) => {
      const allLeads = contacts.data || [];
      const newLeads = allLeads.filter((l) => !l.status || l.status === 'new');
      setCounts({
        projects:     proj.data?.length    || 0,
        portfolio:    pf.data?.length      || 0,
        testimonials: testi.data?.length   || 0,
        leads:        allLeads.length,
        newLeads:     newLeads.length,
        services:     svcs.data?.length    || 0,
      });
      setLeads(allLeads.slice(0, 6));
      setProjs((proj.data || []).slice(0, 4));
      setLoading(false);
    });
  }, []);

  const statCards = [
    { label: 'Total Projects',   value: counts.projects,     Icon: FolderOpen,   color: 'var(--color-gold)', path: '/admin/projects',     sub: 'Properties listed' },
    { label: 'Total Leads',      value: counts.leads,        Icon: Users,         color: '#f87171',           path: '/admin/leads',        sub: `${counts.newLeads} new unread` },
    { label: 'Testimonials',     value: counts.testimonials, Icon: Star,          color: '#a78bfa',           path: '/admin/testimonials', sub: 'Client reviews' },
    { label: 'Portfolio Items',  value: counts.portfolio,    Icon: Images,        color: '#60a5fa',           path: '/admin/portfolio',    sub: 'Gallery images' },
    { label: 'Services',         value: counts.services,     Icon: Briefcase,     color: '#4ade80',           path: '/admin/services',     sub: 'Offerings listed' },
  ];

  const quickActions = [
    { path: '/admin/projects',     label: 'Add New Project',     Icon: Plus,         color: 'var(--color-gold)' },
    { path: '/admin/leads',        label: 'View All Leads',       Icon: Users,        color: '#f87171' },
    { path: '/admin/testimonials', label: 'Add Testimonial',      Icon: Star,         color: '#a78bfa' },
    { path: '/admin/services',     label: 'Manage Services',      Icon: Briefcase,    color: '#4ade80' },
    { path: '/admin/why-us',       label: 'Edit Why Us',          Icon: CheckSquare,  color: '#60a5fa' },
    { path: '/admin/settings',     label: 'Site Settings',        Icon: TrendingUp,   color: '#fb923c' },
  ];

  return (
    <>
      {/* ── Header ── */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{ fontSize: '1.7rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Welcome back</h1>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.88rem' }}>
          Here's what's happening with Winstone Projects today.
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '18px', marginBottom: '36px' }}>
        {statCards.map(({ label, value, Icon, color, path, sub }) => (
          <Link key={label} to={path} style={{ textDecoration: 'none' }}>
            <div
              className="admin-card"
              style={{ cursor: 'pointer', transition: 'border-color 0.25s, transform 0.2s', padding: '22px' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}18`, border: `1px solid ${color}30`, color, flexShrink: 0 }}>
                  <Icon size={20} />
                </div>
                {label === 'Total Leads' && counts.newLeads > 0 && (
                  <span style={{ background: '#ef4444', color: '#fff', borderRadius: 20, padding: '2px 8px', fontSize: '0.6rem', fontWeight: 700 }}>
                    {counts.newLeads} new
                  </span>
                )}
              </div>
              <div style={{ fontSize: '2.2rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                {loading ? '—' : value}
              </div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: '6px' }}>{label}</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', marginTop: '4px' }}>{sub}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Main Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', marginBottom: '24px' }}>

        {/* Recent Leads */}
        <div className="admin-card" style={{ padding: 0 }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>Recent Leads</h3>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>Latest contact form submissions</p>
            </div>
            <Link to="/admin/leads" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: 'var(--color-gold)', letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none' }}>
              View All <ArrowRight size={12} />
            </Link>
          </div>
          {loading ? (
            <div style={{ padding: '40px 24px' }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ height: 48, background: 'rgba(255,255,255,0.03)', marginBottom: 8, borderRadius: 2 }} />
              ))}
            </div>
          ) : recentLeads.length === 0 ? (
            <div style={{ padding: '60px 24px', textAlign: 'center' }}>
              <MessageSquare size={36} style={{ color: 'rgba(255,255,255,0.08)', margin: '0 auto 12px' }} />
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.85rem' }}>No leads yet.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => {
                  const sc = statusColour(lead.status);
                  return (
                    <tr key={lead.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                          <div style={{ width: 30, height: 30, background: 'var(--color-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0a', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
                            {lead.name?.[0]?.toUpperCase() || '?'}
                          </div>
                          <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem' }}>{lead.name}</span>
                        </div>
                      </td>
                      <td style={{ fontSize: '0.8rem' }}>
                        <div>{lead.email}</div>
                        {lead.phone && <div style={{ color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>{lead.phone}</div>}
                      </td>
                      <td>
                        <span style={{ background: sc.bg, color: sc.text, padding: '3px 9px', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', borderRadius: 2 }}>
                          {sc.label}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>{fmt(lead.created_at)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Recent Projects */}
        <div className="admin-card" style={{ padding: 0 }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>Recent Projects</h3>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>Latest added properties</p>
            </div>
            <Link to="/admin/projects" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: 'var(--color-gold)', letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none' }}>
              View All <ArrowRight size={12} />
            </Link>
          </div>
          {loading ? (
            <div style={{ padding: '24px' }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ height: 64, background: 'rgba(255,255,255,0.03)', marginBottom: 8, borderRadius: 2 }} />
              ))}
            </div>
          ) : recentProjects.length === 0 ? (
            <div style={{ padding: '60px 24px', textAlign: 'center' }}>
              <FolderOpen size={36} style={{ color: 'rgba(255,255,255,0.08)', margin: '0 auto 12px' }} />
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.85rem' }}>No projects yet.</p>
            </div>
          ) : (
            <div style={{ padding: '12px 0' }}>
              {recentProjects.map((proj) => (
                <div key={proj.id} style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  {proj.image_url ? (
                    <img src={proj.image_url} alt={proj.name} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.04)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <FolderOpen size={18} style={{ color: 'rgba(255,255,255,0.2)' }} />
                    </div>
                  )}
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{proj.name}</p>
                    <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>{proj.location || '—'}</p>
                  </div>
                  <span style={{
                    fontSize: '0.6rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '3px 8px', flexShrink: 0,
                    ...({
                      completed: { background: 'rgba(34,197,94,0.12)', color: '#4ade80' },
                      ongoing:   { background: 'rgba(251,146,60,0.12)', color: '#fb923c' },
                      upcoming:  { background: 'rgba(96,165,250,0.12)', color: '#60a5fa' },
                    }[proj.status?.toLowerCase()] || { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }),
                  }}>
                    {proj.status || '—'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="admin-card" style={{ padding: '20px 24px' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '18px', letterSpacing: '0.5px' }}>Quick Actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
          {quickActions.map(({ path, label, Icon, color }) => (
            <Link key={path} to={path} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  padding: '16px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)',
                  display: 'flex', flexDirection: 'column', gap: '10px', cursor: 'pointer',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = `${color}08`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
              >
                <Icon size={20} style={{ color }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#fff' }}>{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
