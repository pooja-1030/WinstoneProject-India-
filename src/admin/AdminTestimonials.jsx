import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, Star } from 'lucide-react';
import { testimonialsService } from '../services/supabase';

const EMPTY = { name: '', message: '', designation: '', location: '', rating: 5, image_url: '' };

function StarRating({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
        >
          <Star
            size={22}
            fill={n <= value ? 'var(--color-gold)' : 'none'}
            style={{ color: n <= value ? 'var(--color-gold)' : 'rgba(255,255,255,0.2)', transition: 'all 0.15s' }}
          />
        </button>
      ))}
    </div>
  );
}

function Toast({ msg, type }) {
  if (!msg) return null;
  const isErr = type === 'error';
  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, background: isErr ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)', border: `1px solid ${isErr ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`, color: isErr ? '#f87171' : '#4ade80', padding: '13px 20px', fontSize: '0.82rem', fontWeight: 500, zIndex: 3000, maxWidth: 340 }}>
      {msg}
    </div>
  );
}

export default function AdminTestimonials() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setModal] = useState(false);
  const [editItem, setEdit]   = useState(null);
  const [form, setForm]       = useState(EMPTY);
  const [saving, setSaving]   = useState(false);
  const [deleteId, setDelId]  = useState(null);
  const [error, setError]     = useState('');
  const [toast, setToast]     = useState({ msg: '', type: 'success' });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: 'success' }), 3000);
  };

  const fetchItems = async () => {
    const { data } = await testimonialsService.getAll();
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const openAdd  = () => { setEdit(null); setForm(EMPTY); setError(''); setModal(true); };
  const openEdit = (item) => {
    setEdit(item);
    setForm({ name: item.name || '', message: item.message || '', designation: item.designation || '', location: item.location || '', rating: item.rating ?? 5, image_url: item.image_url || '' });
    setError(''); setModal(true);
  };
  const close = () => { setModal(false); setEdit(null); setForm(EMPTY); setError(''); };

  const handleSave = async () => {
    if (!form.name.trim() || !form.message.trim()) { setError('Name and message are required.'); return; }
    setSaving(true); setError('');
    const payload = { name: form.name.trim(), message: form.message.trim(), designation: form.designation.trim(), location: form.location.trim(), rating: Number(form.rating) || 5, image_url: form.image_url.trim() };
    const result = editItem
      ? await testimonialsService.update(editItem.id, payload)
      : await testimonialsService.insert(payload);
    if (result.error) { setError(result.error.message); }
    else { showToast(editItem ? 'Testimonial updated.' : 'Testimonial added.'); close(); fetchItems(); }
    setSaving(false);
  };

  const handleDelete = async () => {
    await testimonialsService.delete(deleteId);
    setDelId(null);
    showToast('Testimonial deleted.', 'error');
    fetchItems();
  };

  const renderStars = (n) => [...Array(5)].map((_, i) => (
    <Star key={i} size={13} fill={i < n ? 'var(--color-gold)' : 'none'} style={{ color: i < n ? 'var(--color-gold)' : 'rgba(255,255,255,0.2)' }} />
  ));

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Testimonials</h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem', marginTop: '4px' }}>
            {items.length} client review{items.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button className="btn" onClick={openAdd} style={{ fontSize: '0.72rem', padding: '10px 22px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={15} /> Add Testimonial
        </button>
      </div>

      <div className="admin-card" style={{ padding: 0 }}>
        {loading ? (
          <div style={{ padding: '40px 24px' }}>
            {[...Array(3)].map((_, i) => <div key={i} style={{ height: 64, background: 'rgba(255,255,255,0.03)', marginBottom: 8, borderRadius: 2 }} />)}
          </div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 40px' }}>
            <Star size={40} style={{ color: 'rgba(255,255,255,0.08)', margin: '0 auto 16px' }} />
            <p style={{ color: 'rgba(255,255,255,0.25)', marginBottom: '20px' }}>No testimonials yet.</p>
            <button className="btn" onClick={openAdd} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem' }}>
              <Plus size={14} /> Add First Testimonial
            </button>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Rating</th>
                <th>Message</th>
                <th>Location</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                      ) : (
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--color-gold)', color: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                          {item.name?.[0]?.toUpperCase() || '?'}
                        </div>
                      )}
                      <div>
                        <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.88rem' }}>{item.name}</div>
                        {item.designation && <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginTop: '1px' }}>{item.designation}</div>}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '2px' }}>{renderStars(item.rating ?? 5)}</div>
                  </td>
                  <td style={{ maxWidth: 320 }}>
                    <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: '0.82rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.45)' }}>
                      "{item.message}"
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>{item.location || '—'}</td>
                  <td style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>
                    {item.created_at ? new Date(item.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => openEdit(item)} style={{ padding: '7px 12px', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', color: '#60a5fa', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem' }}>
                        <Pencil size={13} /> Edit
                      </button>
                      <button onClick={() => setDelId(item.id)} style={{ padding: '7px 12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem' }}>
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '36px', width: '100%', maxWidth: '580px', maxHeight: '92vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem' }}>
                {editItem ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={close} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Client Name *</label>
                  <input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Rajesh Kumar" />
                </div>
                <div className="form-group">
                  <label className="form-label">Designation</label>
                  <input className="form-input" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} placeholder="e.g. Business Owner" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input className="form-input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Bangalore" />
                </div>
                <div className="form-group">
                  <label className="form-label">Profile Image URL</label>
                  <input className="form-input" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
                </div>
              </div>

              {form.image_url && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <img src={form.image_url} alt="Preview" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-gold)' }} onError={(e) => { e.target.style.display = 'none'; }} />
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Image preview</span>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Rating</label>
                <StarRating value={form.rating} onChange={(n) => setForm({ ...form, rating: n })} />
              </div>

              <div className="form-group">
                <label className="form-label">Testimonial Message *</label>
                <textarea className="form-input" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Client's experience with Winstone Projects..." style={{ minHeight: '120px' }} />
              </div>

              {error && <p style={{ color: '#f87171', fontSize: '0.82rem', background: 'rgba(239,68,68,0.1)', padding: '10px 14px', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</p>}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button onClick={close} style={{ padding: '10px 22px', background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '0.78rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Cancel</button>
                <button onClick={handleSave} disabled={saving} className="btn" style={{ padding: '10px 26px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={15} /> {saving ? 'Saving...' : editItem ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: '#111', border: '1px solid rgba(239,68,68,0.2)', padding: '36px', width: '100%', maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '10px' }}>Delete Testimonial?</h3>
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
