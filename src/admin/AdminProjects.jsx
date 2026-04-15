import { useEffect, useState } from 'react';
import {
  Plus, Pencil, Trash2, X, Check, MapPin,
  Search, Image as ImageIcon, AlertCircle, CheckCircle2,
  Building2, Calendar,
} from 'lucide-react';
import { supabase } from '../services/supabase';

/* ─── helpers ─────────────────────────────────────────────── */
const EMPTY = { title: '', description: '', location: '', image_url: '' };

function fmt(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

/* ─── Toast ────────────────────────────────────────────────── */
function Toast({ toast, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const isSuccess = toast.type === 'success';
  return (
    <div style={{
      position: 'fixed', bottom: '28px', right: '28px', zIndex: 9999,
      display: 'flex', alignItems: 'center', gap: '12px',
      background: isSuccess ? 'rgba(22,163,74,0.95)' : 'rgba(220,38,38,0.95)',
      color: '#fff', padding: '14px 20px', borderRadius: '8px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      animation: 'slideInRight 0.3s ease',
      minWidth: '260px',
    }}>
      {isSuccess
        ? <CheckCircle2 size={18} />
        : <AlertCircle size={18} />}
      <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{toast.msg}</span>
    </div>
  );
}

/* ─── Confirm Dialog ───────────────────────────────────────── */
function ConfirmDialog({ project, onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 3000, padding: '20px',
    }}>
      <div style={{
        background: '#111', border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: '12px', padding: '36px', width: '100%', maxWidth: '420px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
      }}>
        <div style={{
          width: '52px', height: '52px', borderRadius: '50%',
          background: 'rgba(239,68,68,0.12)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', marginBottom: '20px',
        }}>
          <Trash2 size={22} color="#f87171" />
        </div>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>Delete Project?</h3>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '8px' }}>
          You are about to delete:
        </p>
        <p style={{ color: '#fff', fontWeight: 600, marginBottom: '28px', fontSize: '0.95rem' }}>
          "{project?.title}"
        </p>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', marginBottom: '28px' }}>
          This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: '11px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
              borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600,
              transition: 'all 0.2s',
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: '11px',
              background: '#ef4444', border: 'none',
              color: '#fff', cursor: 'pointer',
              borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700,
              transition: 'all 0.2s',
            }}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Project Form Modal ───────────────────────────────────── */
function ProjectModal({ editItem, onClose, onSaved }) {
  const [form, setForm] = useState(
    editItem
      ? { title: editItem.title, description: editItem.description, location: editItem.location, image_url: editItem.image_url || '' }
      : EMPTY
  );
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');
  const [imgError, setImgError] = useState(false);
  const isEdit = Boolean(editItem);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (key === 'image_url') setImgError(false);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.location.trim()) {
      setError('Title, description, and location are required.');
      return;
    }
    setSaving(true);
    setError('');

    const payload = {
      title:       form.title.trim(),
      description: form.description.trim(),
      location:    form.location.trim(),
      image_url:   form.image_url.trim() || null,
    };

    let res;
    if (isEdit) {
      res = await supabase.from('projects').update(payload).eq('id', editItem.id).select().single();
    } else {
      res = await supabase.from('projects').insert([payload]).select().single();
    }

    if (res.error) {
      setError(res.error.message);
      setSaving(false);
    } else {
      onSaved(isEdit ? 'Project updated successfully.' : 'Project added successfully.');
    }
  };

  const field = (label, key, props = {}) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
      <label style={{
        fontSize: '0.7rem', fontWeight: 600, letterSpacing: '1.5px',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
      }}>
        {label}
      </label>
      {props.type === 'textarea' ? (
        <textarea
          value={form[key]}
          onChange={set(key)}
          placeholder={props.placeholder}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px', padding: '12px 14px',
            color: '#fff', fontSize: '0.9rem', outline: 'none',
            fontFamily: 'inherit', resize: 'vertical', minHeight: '110px',
            lineHeight: 1.6,
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--color-gold)')}
          onBlur={(e)  => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
        />
      ) : (
        <input
          type="text"
          value={form[key]}
          onChange={set(key)}
          placeholder={props.placeholder}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px', padding: '12px 14px',
            color: '#fff', fontSize: '0.9rem', outline: 'none',
            fontFamily: 'inherit',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--color-gold)')}
          onBlur={(e)  => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
        />
      )}
    </div>
  );

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 3000, padding: '20px',
    }}>
      <div style={{
        background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '14px', padding: '36px', width: '100%', maxWidth: '580px',
        maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 32px 80px rgba(0,0,0,0.8)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', marginBottom: '4px' }}>
              {isEdit ? 'Edit Project' : 'Add New Project'}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
              {isEdit ? `Editing: ${editItem.title}` : 'Fill in the project details below'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)', cursor: 'pointer', borderRadius: '8px',
              width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Gold accent line */}
        <div style={{ height: '2px', background: 'linear-gradient(to right, var(--color-gold), transparent)', marginBottom: '28px', borderRadius: '2px' }} />

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {field('Project Title *', 'title', { placeholder: 'e.g. Winstone Arcadia Villas' })}
          {field('Location (India only) *', 'location', { placeholder: 'e.g. Whitefield, Bangalore' })}
          {field('Description *', 'description', { type: 'textarea', placeholder: 'Describe the project, amenities, and key features...' })}

          {/* Image field with preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            <label style={{
              fontSize: '0.7rem', fontWeight: 600, letterSpacing: '1.5px',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
            }}>
              Image Path (from /public)
            </label>
            <input
              type="text"
              value={form.image_url}
              onChange={set('image_url')}
              placeholder="e.g. /hero_villa.png or https://..."
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px', padding: '12px 14px',
                color: '#fff', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--color-gold)')}
              onBlur={(e)  => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
            {form.image_url && (
              <div style={{ marginTop: '8px', borderRadius: '8px', overflow: 'hidden', height: '140px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {imgError ? (
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'rgba(255,255,255,0.25)', fontSize: '0.82rem' }}>
                    <ImageIcon size={16} /> Image not found
                  </div>
                ) : (
                  <img
                    src={form.image_url}
                    alt="preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={() => setImgError(true)}
                  />
                )}
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              color: '#f87171', fontSize: '0.82rem',
              background: 'rgba(239,68,68,0.08)', padding: '12px 14px',
              border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px',
            }}>
              <AlertCircle size={15} /> {error}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button
              onClick={onClose}
              style={{
                padding: '11px 24px', background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.55)', cursor: 'pointer',
                borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600,
                letterSpacing: '1px', textTransform: 'uppercase',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                padding: '11px 28px',
                background: saving ? 'rgba(201,164,92,0.5)' : 'var(--color-gold)',
                border: 'none', color: '#0a0a0a', cursor: saving ? 'not-allowed' : 'pointer',
                borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700,
                letterSpacing: '1px', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              <Check size={15} />
              {saving ? 'Saving…' : isEdit ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ────────────────────────────────────────────── */
export default function AdminProjects() {
  const [projects, setProjects]     = useState([]);
  const [filtered, setFiltered]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [showModal, setShowModal]   = useState(false);
  const [editItem, setEditItem]     = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast]           = useState(null);

  /* fetch */
  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) {
      setProjects(data || []);
      setFiltered(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  /* search */
  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      q ? projects.filter((p) =>
        p.title.toLowerCase().includes(q) || p.location?.toLowerCase().includes(q)
      ) : projects
    );
  }, [search, projects]);

  const showToast = (msg, type = 'success') => setToast({ msg, type });

  const handleSaved = (msg) => {
    setShowModal(false);
    setEditItem(null);
    showToast(msg);
    load();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from('projects').delete().eq('id', deleteTarget.id);
    setDeleteTarget(null);
    if (error) {
      showToast('Failed to delete project.', 'error');
    } else {
      showToast('Project deleted.');
      load();
    }
  };

  /* ── Render ── */
  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(120%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .proj-row:hover { background: rgba(255,255,255,0.025) !important; }
        .action-btn { transition: all 0.2s ease !important; }
        .action-btn:hover { filter: brightness(1.2); transform: translateY(-1px); }
      `}</style>

      {/* ── Page header ── */}
      <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, marginBottom: '4px' }}>
            Projects
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem' }}>
            {projects.length} project{projects.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button
          onClick={() => { setEditItem(null); setShowModal(true); }}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'var(--color-gold)', color: '#0a0a0a',
            border: 'none', padding: '11px 24px', borderRadius: '8px',
            fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1px',
            textTransform: 'uppercase', cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#b8923f'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-gold)'; e.currentTarget.style.transform = 'none'; }}
        >
          <Plus size={16} /> Add New Project
        </button>
      </div>

      {/* ── Search bar ── */}
      <div style={{ marginBottom: '24px', position: 'relative' }}>
        <Search size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)', pointerEvents: 'none' }} />
        <input
          type="text"
          placeholder="Search by title or location…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%', maxWidth: '380px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px', padding: '11px 14px 11px 40px',
            color: '#fff', fontSize: '0.88rem', outline: 'none', fontFamily: 'inherit',
          }}
          onFocus={(e)  => (e.target.style.borderColor = 'var(--color-gold)')}
          onBlur={(e)   => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
        />
      </div>

      {/* ── Table card ── */}
      <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', overflow: 'hidden' }}>
        {loading ? (
          /* skeleton */
          <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1,2,3].map((i) => (
              <div key={i} style={{ height: '64px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', animation: 'pulse 1.5s ease infinite' }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 40px' }}>
            <Building2 size={40} style={{ color: 'rgba(255,255,255,0.1)', margin: '0 auto 16px' }} />
            <p style={{ color: 'rgba(255,255,255,0.25)', marginBottom: '20px', fontSize: '0.9rem' }}>
              {search ? 'No projects match your search.' : 'No projects yet.'}
            </p>
            {!search && (
              <button
                onClick={() => { setEditItem(null); setShowModal(true); }}
                style={{ background: 'var(--color-gold)', color: '#0a0a0a', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '0.78rem' }}
              >
                <Plus size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Add First Project
              </button>
            )}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {['Image', 'Project', 'Location', 'Added', 'Actions'].map((h) => (
                    <th key={h} style={{
                      padding: '14px 18px', textAlign: 'left',
                      fontSize: '0.66rem', fontWeight: 700,
                      letterSpacing: '2px', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.3)',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr
                    key={p.id}
                    className="proj-row"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}
                  >
                    {/* Image */}
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ width: '64px', height: '48px', borderRadius: '6px', overflow: 'hidden', background: 'rgba(255,255,255,0.05)', flexShrink: 0 }}>
                        {p.image_url ? (
                          <img
                            src={p.image_url}
                            alt={p.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.3rem">🏠</div>';
                            }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>🏠</div>
                        )}
                      </div>
                    </td>

                    {/* Title + desc */}
                    <td style={{ padding: '14px 18px', maxWidth: '260px' }}>
                      <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>{p.title}</p>
                      <p style={{
                        color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem',
                        overflow: 'hidden', display: '-webkit-box',
                        WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                        lineHeight: 1.5,
                      }}>
                        {p.description}
                      </p>
                    </td>

                    {/* Location */}
                    <td style={{ padding: '14px 18px', whiteSpace: 'nowrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--color-gold)', fontSize: '0.8rem' }}>
                        <MapPin size={12} /> {p.location}
                      </span>
                    </td>

                    {/* Date */}
                    <td style={{ padding: '14px 18px', whiteSpace: 'nowrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}>
                        <Calendar size={12} /> {fmt(p.created_at)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button
                          className="action-btn"
                          onClick={() => { setEditItem(p); setShowModal(true); }}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            padding: '7px 14px', borderRadius: '6px',
                            background: 'rgba(96,165,250,0.08)',
                            border: '1px solid rgba(96,165,250,0.2)',
                            color: '#60a5fa', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
                          }}
                        >
                          <Pencil size={13} /> Edit
                        </button>
                        <button
                          className="action-btn"
                          onClick={() => setDeleteTarget(p)}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            padding: '7px 14px', borderRadius: '6px',
                            background: 'rgba(239,68,68,0.08)',
                            border: '1px solid rgba(239,68,68,0.2)',
                            color: '#f87171', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
                          }}
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer count */}
        {!loading && filtered.length > 0 && (
          <div style={{ padding: '12px 18px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)' }}>
              Showing {filtered.length} of {projects.length} project{projects.length !== 1 ? 's' : ''}
            </span>
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{ background: 'none', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', fontSize: '0.75rem' }}
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      {showModal && (
        <ProjectModal
          editItem={editItem}
          onClose={() => { setShowModal(false); setEditItem(null); }}
          onSaved={handleSaved}
        />
      )}

      {/* ── Delete Confirm ── */}
      {deleteTarget && (
        <ConfirmDialog
          project={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}

      {/* ── Toast ── */}
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
    </>
  );
}
