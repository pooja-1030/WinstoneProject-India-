import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { portfolioService } from '../services/supabase';

const CATEGORIES = ['Villa', 'Residential', 'Commercial', 'Layout', 'Township'];
const STATUSES   = ['Completed', 'Ongoing', 'Upcoming'];
const EMPTY_FORM = { title: '', category: 'Villa', description: '', image: '', status: 'Completed', year: '' };

const statusStyle = {
  Completed: { background: 'rgba(34,197,94,0.15)',  color: '#4ade80' },
  Ongoing:   { background: 'rgba(251,191,36,0.15)', color: '#fbbf24' },
  Upcoming:  { background: 'rgba(96,165,250,0.15)', color: '#60a5fa' },
};

export default function AdminPortfolio() {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showModal, setModal]   = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm]         = useState(EMPTY_FORM);
  const [saving, setSaving]     = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError]       = useState('');

  const fetchItems = async () => {
    const { data } = await portfolioService.getAll();
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const openAdd  = ()     => { setEditItem(null); setForm(EMPTY_FORM); setError(''); setModal(true); };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({ title: item.title, category: item.category || 'Villa', description: item.description, image: item.image || '', status: item.status || 'Completed', year: item.year || '' });
    setError('');
    setModal(true);
  };
  const closeModal = () => { setModal(false); setEditItem(null); setForm(EMPTY_FORM); setError(''); };

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.title || !form.description || !form.category) {
      setError('Title, category, and description are required.');
      return;
    }
    setSaving(true);
    setError('');
    const payload = { title: form.title, category: form.category, description: form.description, image: form.image || null, status: form.status, year: form.year || null };
    const result  = editItem
      ? await portfolioService.update(editItem.id, payload)
      : await portfolioService.insert(payload);
    if (result.error) { setError(result.error.message); }
    else              { closeModal(); fetchItems(); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    await portfolioService.delete(id);
    setDeleteId(null);
    fetchItems();
  };

  return (
    <>
      <div className="admin-header">
        <h1>Portfolio</h1>
        <button className="btn" onClick={openAdd} style={{ fontSize: '0.72rem', padding: '10px 22px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={15} /> Add Item
        </button>
      </div>

      <div className="admin-card" style={{ padding: 0 }}>
        {loading ? (
          <p style={{ padding: '40px', color: 'rgba(255,255,255,0.25)' }}>Loading…</p>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 40px' }}>
            <p style={{ color: 'rgba(255,255,255,0.25)', marginBottom: '20px' }}>No portfolio items yet.</p>
            <button className="btn" onClick={openAdd}><Plus size={15} /> Add First Item</button>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const sc = statusStyle[item.status] || statusStyle.Completed;
                return (
                  <tr key={item.id}>
                    <td>
                      {item.image ? (
                        <img src={item.image} alt={item.title} style={{ width: 60, height: 44, objectFit: 'cover', borderRadius: '2px' }} onError={(e) => { e.target.style.display = 'none'; }} />
                      ) : (
                        <div style={{ width: 60, height: 44, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🏗️</div>
                      )}
                    </td>
                    <td style={{ color: '#fff', fontWeight: 600 }}>{item.title}</td>
                    <td>
                      <span style={{ padding: '3px 10px', background: 'rgba(201,164,92,0.12)', color: 'var(--color-gold)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                        {item.category}
                      </span>
                    </td>
                    <td>
                      {item.status && (
                        <span style={{ ...sc, padding: '3px 10px', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '2px' }}>
                          {item.status}
                        </span>
                      )}
                    </td>
                    <td style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{item.year || '—'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => openEdit(item)} style={{ padding: '7px 12px', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', color: '#60a5fa', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem' }}>
                          <Pencil size={13} /> Edit
                        </button>
                        <button onClick={() => setDeleteId(item.id)} style={{ padding: '7px 12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem' }}>
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '36px', width: '100%', maxWidth: '580px', maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem' }}>
                {editItem ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
              </h3>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Title */}
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input className="form-input" value={form.title} onChange={(e) => setField('title', e.target.value)} placeholder="e.g. Arcadia Villa — Whitefield" />
              </div>

              {/* Category + Status row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select className="form-input" value={form.category} onChange={(e) => setField('category', e.target.value)} style={{ cursor: 'pointer' }}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-input" value={form.status} onChange={(e) => setField('status', e.target.value)} style={{ cursor: 'pointer' }}>
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Year */}
              <div className="form-group">
                <label className="form-label">Year (optional)</label>
                <input className="form-input" value={form.year} onChange={(e) => setField('year', e.target.value)} placeholder="e.g. 2024" />
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea className="form-input" value={form.description} onChange={(e) => setField('description', e.target.value)} placeholder="Describe the portfolio item…" style={{ minHeight: '110px' }} />
              </div>

              {/* Image */}
              <div className="form-group">
                <label className="form-label">Image Path (from /public)</label>
                <input className="form-input" value={form.image} onChange={(e) => setField('image', e.target.value)} placeholder="e.g. /hero_villa.png" />
                {form.image && (
                  <img src={form.image} alt="preview" style={{ marginTop: '10px', height: '90px', objectFit: 'cover', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.1)' }} onError={(e) => { e.target.style.display = 'none'; }} />
                )}
              </div>

              {error && <p style={{ color: '#f87171', fontSize: '0.82rem', background: 'rgba(239,68,68,0.1)', padding: '10px 14px', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</p>}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button onClick={closeModal} style={{ padding: '10px 22px', background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '0.78rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving} className="btn" style={{ padding: '10px 26px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={15} /> {saving ? 'Saving…' : editItem ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: '#111', border: '1px solid rgba(239,68,68,0.2)', padding: '36px', width: '100%', maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '12px' }}>Delete Portfolio Item?</h3>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', marginBottom: '28px' }}>This cannot be undone.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setDeleteId(null)} style={{ flex: 1, padding: '11px', background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', cursor: 'pointer', fontSize: '0.82rem' }}>Cancel</button>
              <button onClick={() => handleDelete(deleteId)} style={{ flex: 1, padding: '11px', background: '#ef4444', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700 }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
