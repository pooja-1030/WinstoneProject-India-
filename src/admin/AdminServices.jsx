import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, GripVertical, Briefcase } from 'lucide-react';
import { servicesService } from '../services/supabase';

const ICONS = ['Briefcase','Star','Shield','Home','TrendingUp','Award','MapPin','Users','Building2','CheckCircle','Zap','Heart'];

const EMPTY = { title: '', description: '', icon: 'Star', sort_order: 0 };

function Toast({ msg, type }) {
  if (!msg) return null;
  const bg = type === 'error' ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)';
  const border = type === 'error' ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)';
  const color  = type === 'error' ? '#f87171' : '#4ade80';
  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, background: bg, border: `1px solid ${border}`, color, padding: '13px 20px', fontSize: '0.82rem', fontWeight: 500, zIndex: 3000, maxWidth: 340 }}>
      {msg}
    </div>
  );
}

export default function AdminServices() {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showModal, setModal]   = useState(false);
  const [editItem, setEdit]     = useState(null);
  const [form, setForm]         = useState(EMPTY);
  const [saving, setSaving]     = useState(false);
  const [deleteId, setDelId]    = useState(null);
  const [error, setError]       = useState('');
  const [toast, setToast]       = useState({ msg: '', type: 'success' });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: 'success' }), 3000);
  };

  const fetch = async () => {
    const { data } = await servicesService.getAll();
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const openAdd  = () => { setEdit(null); setForm({ ...EMPTY, sort_order: items.length + 1 }); setError(''); setModal(true); };
  const openEdit = (item) => { setEdit(item); setForm({ title: item.title, description: item.description || '', icon: item.icon || 'Star', sort_order: item.sort_order || 0 }); setError(''); setModal(true); };
  const close    = () => { setModal(false); setEdit(null); setForm(EMPTY); setError(''); };

  const handleSave = async () => {
    if (!form.title.trim()) { setError('Title is required.'); return; }
    setSaving(true); setError('');
    const payload = { title: form.title.trim(), description: form.description.trim(), icon: form.icon, sort_order: Number(form.sort_order) || 0 };
    const result = editItem
      ? await servicesService.update(editItem.id, payload)
      : await servicesService.insert(payload);
    if (result.error) { setError(result.error.message); }
    else { showToast(editItem ? 'Service updated.' : 'Service added.'); close(); fetch(); }
    setSaving(false);
  };

  const handleDelete = async () => {
    await servicesService.delete(deleteId);
    setDelId(null);
    showToast('Service deleted.', 'error');
    fetch();
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Services</h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem', marginTop: '4px' }}>
            {items.length} service{items.length !== 1 ? 's' : ''} listed
          </p>
        </div>
        <button className="btn" onClick={openAdd} style={{ fontSize: '0.72rem', padding: '10px 22px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={15} /> Add Service
        </button>
      </div>

      <div className="admin-card" style={{ padding: 0 }}>
        {loading ? (
          <div style={{ padding: '40px 24px' }}>
            {[...Array(3)].map((_, i) => <div key={i} style={{ height: 56, background: 'rgba(255,255,255,0.03)', marginBottom: 8, borderRadius: 2 }} />)}
          </div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 40px' }}>
            <Briefcase size={40} style={{ color: 'rgba(255,255,255,0.08)', margin: '0 auto 16px' }} />
            <p style={{ color: 'rgba(255,255,255,0.25)', marginBottom: '20px' }}>No services yet.</p>
            <button className="btn" onClick={openAdd} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem' }}>
              <Plus size={14} /> Add First Service
            </button>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Icon</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.id}>
                  <td style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem' }}>{idx + 1}</td>
                  <td style={{ color: '#fff', fontWeight: 600 }}>{item.title}</td>
                  <td style={{ maxWidth: 320 }}>
                    <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)' }}>
                      {item.description || '—'}
                    </span>
                  </td>
                  <td>
                    <span style={{ background: 'rgba(201,164,92,0.12)', color: 'var(--color-gold)', padding: '3px 10px', fontSize: '0.68rem', fontWeight: 600 }}>
                      {item.icon || 'Star'}
                    </span>
                  </td>
                  <td style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem' }}>{item.sort_order ?? 0}</td>
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
          <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '36px', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem' }}>
                {editItem ? 'Edit Service' : 'Add Service'}
              </h3>
              <button onClick={close} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="form-group">
                <label className="form-label">Service Title *</label>
                <input className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Luxury Villa Sales" />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description of this service..." style={{ minHeight: '100px' }} />
              </div>

              <div className="form-group">
                <label className="form-label">Icon Name (Lucide icon)</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                  {ICONS.map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setForm({ ...form, icon: ic })}
                      style={{
                        padding: '5px 12px', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                        background: form.icon === ic ? 'var(--color-gold)' : 'rgba(255,255,255,0.05)',
                        color: form.icon === ic ? '#0a0a0a' : 'rgba(255,255,255,0.5)',
                        border: `1px solid ${form.icon === ic ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
                <input className="form-input" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="Or type any Lucide icon name" />
              </div>

              <div className="form-group">
                <label className="form-label">Sort Order</label>
                <input className="form-input" type="number" min="0" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} placeholder="0" style={{ maxWidth: 100 }} />
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
            <h3 style={{ marginBottom: '10px' }}>Delete Service?</h3>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', marginBottom: '28px' }}>This action cannot be undone.</p>
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
