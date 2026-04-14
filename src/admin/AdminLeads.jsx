import { useEffect, useState } from 'react';
import { Trash2, Mail, Phone, Calendar, Check, Download, Search, Filter, MessageCircle, X, Users } from 'lucide-react';
import { contactsService } from '../services/supabase';

const STATUS_CFG = {
  new:       { bg: 'rgba(239,68,68,0.12)',   text: '#f87171',                        label: 'New'       },
  contacted: { bg: 'rgba(34,197,94,0.12)',   text: '#4ade80',                        label: 'Contacted' },
  closed:    { bg: 'rgba(255,255,255,0.07)', text: 'rgba(255,255,255,0.4)',           label: 'Closed'    },
};

const fmt = (d) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

function Toast({ msg, type }) {
  if (!msg) return null;
  const isErr = type === 'error';
  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, background: isErr ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)', border: `1px solid ${isErr ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`, color: isErr ? '#f87171' : '#4ade80', padding: '13px 20px', fontSize: '0.82rem', fontWeight: 500, zIndex: 3000, maxWidth: 360 }}>
      {msg}
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] || STATUS_CFG.new;
  return (
    <span style={{ background: cfg.bg, color: cfg.text, padding: '3px 10px', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
      {cfg.label}
    </span>
  );
}

export default function AdminLeads() {
  const [leads, setLeads]         = useState([]);
  const [filtered, setFiltered]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [tab, setTab]             = useState('all');
  const [search, setSearch]       = useState('');
  const [expanded, setExpanded]   = useState(null);
  const [deleteId, setDelId]      = useState(null);
  const [toast, setToast]         = useState({ msg: '', type: 'success' });
  const [updatingId, setUpdId]    = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: 'success' }), 3000);
  };

  const fetchLeads = async () => {
    const { data } = await contactsService.getAll();
    setLeads(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  useEffect(() => {
    let list = [...leads];
    if (tab === 'new')       list = list.filter((l) => !l.status || l.status === 'new');
    if (tab === 'contacted') list = list.filter((l) => l.status === 'contacted');
    if (tab === 'closed')    list = list.filter((l) => l.status === 'closed');
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((l) =>
        l.name?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.phone?.includes(q)
      );
    }
    setFiltered(list);
  }, [leads, tab, search]);

  const handleStatusChange = async (id, status) => {
    setUpdId(id);
    await contactsService.updateStatus(id, status);
    showToast(`Marked as ${status}.`);
    setUpdId(null);
    fetchLeads();
  };

  const handleDelete = async () => {
    await contactsService.delete(deleteId);
    setDelId(null);
    showToast('Lead deleted.', 'error');
    fetchLeads();
  };

  const exportCSV = () => {
    const rows = [
      ['Name', 'Email', 'Phone', 'Message', 'Status', 'Date'],
      ...filtered.map((l) => [
        `"${l.name || ''}"`,
        `"${l.email || ''}"`,
        `"${l.phone || ''}"`,
        `"${(l.message || '').replace(/"/g, '""')}"`,
        l.status || 'new',
        l.created_at ? new Date(l.created_at).toLocaleDateString('en-IN') : '',
      ]),
    ];
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `winstone-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Exported ${filtered.length} leads as CSV.`);
  };

  const counts = {
    all:       leads.length,
    new:       leads.filter((l) => !l.status || l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    closed:    leads.filter((l) => l.status === 'closed').length,
  };

  const TABS = [
    { key: 'all',       label: 'All Leads',  count: counts.all },
    { key: 'new',       label: 'New',         count: counts.new },
    { key: 'contacted', label: 'Contacted',   count: counts.contacted },
    { key: 'closed',    label: 'Closed',      count: counts.closed },
  ];

  return (
    <>
      {/* ── Header ── */}
      <div className="admin-header">
        <div>
          <h1>Contact Leads</h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem', marginTop: '4px' }}>
            {counts.all} total · <span style={{ color: '#f87171' }}>{counts.new} new</span>
          </p>
        </div>
        <button
          onClick={exportCSV}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 22px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.color = 'var(--color-gold)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
        >
          <Download size={15} /> Export CSV
        </button>
      </div>

      {/* ── Tabs + Search ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '4px' }}>
          {TABS.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                padding: '8px 16px', background: tab === key ? 'rgba(201,164,92,0.15)' : 'transparent',
                border: tab === key ? '1px solid rgba(201,164,92,0.3)' : '1px solid transparent',
                color: tab === key ? 'var(--color-gold)' : 'rgba(255,255,255,0.45)',
                cursor: 'pointer', fontSize: '0.78rem', fontWeight: tab === key ? 700 : 500,
                display: 'flex', alignItems: 'center', gap: '7px', transition: 'all 0.2s',
              }}
            >
              {label}
              <span style={{ background: tab === key ? 'rgba(201,164,92,0.25)' : 'rgba(255,255,255,0.1)', color: tab === key ? 'var(--color-gold)' : 'rgba(255,255,255,0.4)', borderRadius: 20, padding: '1px 7px', fontSize: '0.65rem', fontWeight: 700 }}>
                {count}
              </span>
            </button>
          ))}
        </div>

        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone..."
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '9px 14px 9px 36px', color: '#fff', fontSize: '0.82rem', outline: 'none', width: 280, fontFamily: 'inherit' }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer' }}>
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      {loading ? (
        <div className="admin-card">
          {[...Array(4)].map((_, i) => <div key={i} style={{ height: 80, background: 'rgba(255,255,255,0.03)', marginBottom: 12, borderRadius: 2 }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-card" style={{ textAlign: 'center', padding: '80px' }}>
          <Users size={40} style={{ color: 'rgba(255,255,255,0.08)', margin: '0 auto 16px' }} />
          <p style={{ color: 'rgba(255,255,255,0.25)' }}>
            {search ? 'No leads match your search.' : 'No leads in this category.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((lead) => (
            <div key={lead.id} className="admin-card" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>

                {/* Left: info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '10px' }}>
                    {/* Avatar */}
                    <div style={{ width: 38, height: 38, background: 'var(--color-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0a', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>
                      {lead.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{lead.name}</span>
                      <StatusBadge status={lead.status} />
                    </div>

                    {/* Contact chips */}
                    <a href={`mailto:${lead.email}`} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
                      <Mail size={12} style={{ color: 'var(--color-gold)' }} /> {lead.email}
                    </a>
                    {lead.phone && (
                      <a href={`tel:${lead.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
                        <Phone size={12} style={{ color: 'var(--color-gold)' }} /> {lead.phone}
                      </a>
                    )}
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)' }}>
                      <Calendar size={11} /> {fmt(lead.created_at)}
                    </span>
                  </div>

                  {/* Message */}
                  {lead.message && (
                    <>
                      <p style={{
                        fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7,
                        display: expanded === lead.id ? 'block' : '-webkit-box',
                        WebkitLineClamp: expanded === lead.id ? 'unset' : 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      }}>
                        {lead.message}
                      </p>
                      {lead.message.length > 140 && (
                        <button onClick={() => setExpanded(expanded === lead.id ? null : lead.id)} style={{ background: 'none', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', fontSize: '0.72rem', padding: '4px 0' }}>
                          {expanded === lead.id ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </>
                  )}
                </div>

                {/* Right: actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                  {/* WhatsApp */}
                  {lead.phone && (
                    <a
                      href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(lead.name)}%2C%20thank%20you%20for%20your%20interest%20in%20Winstone%20Projects.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ padding: '8px 14px', background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)', color: '#25d366', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, textDecoration: 'none' }}
                    >
                      <MessageCircle size={13} /> WhatsApp
                    </a>
                  )}

                  {/* Reply */}
                  <a
                    href={`mailto:${lead.email}?subject=Re: Your Enquiry - Winstone Projects`}
                    style={{ padding: '8px 14px', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, textDecoration: 'none' }}
                  >
                    <Mail size={13} /> Reply
                  </a>

                  {/* Mark as contacted / close */}
                  {(!lead.status || lead.status === 'new') && (
                    <button
                      onClick={() => handleStatusChange(lead.id, 'contacted')}
                      disabled={updatingId === lead.id}
                      style={{ padding: '8px 14px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600 }}
                    >
                      <Check size={13} /> {updatingId === lead.id ? '...' : 'Mark Contacted'}
                    </button>
                  )}
                  {lead.status === 'contacted' && (
                    <button
                      onClick={() => handleStatusChange(lead.id, 'closed')}
                      disabled={updatingId === lead.id}
                      style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600 }}
                    >
                      <Check size={13} /> Close Lead
                    </button>
                  )}
                  {lead.status === 'closed' && (
                    <button
                      onClick={() => handleStatusChange(lead.id, 'new')}
                      disabled={updatingId === lead.id}
                      style={{ padding: '8px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600 }}
                    >
                      Reopen
                    </button>
                  )}

                  {/* Delete */}
                  <button
                    onClick={() => setDelId(lead.id)}
                    style={{ padding: '8px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: '#111', border: '1px solid rgba(239,68,68,0.2)', padding: '36px', width: '100%', maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '10px' }}>Delete Lead?</h3>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', marginBottom: '28px' }}>This cannot be undone.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setDelId(null)} style={{ flex: 1, padding: '11px', background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', cursor: 'pointer', fontSize: '0.82rem' }}>Cancel</button>
              <button onClick={handleDelete} style={{ flex: 1, padding: '11px', background: '#ef4444', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700 }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <Toast msg={toast.msg} type={toast.type} />
    </>
  );
}
