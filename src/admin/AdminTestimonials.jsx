import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { testimonialsService } from '../services/supabase';

const EMPTY_FORM = { name: '', message: '' };

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    const { data } = await testimonialsService.getAll();
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const openAdd = () => { setEditItem(null); setForm(EMPTY_FORM); setError(''); setShowModal(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ name: item.name, message: item.message }); setError(''); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditItem(null); setForm(EMPTY_FORM); setError(''); };

  const handleSave = async () => {
    if (!form.name || !form.message) { setError('Name and message are required.'); return; }
    setSaving(true);
    setError('');
    let result;
    if (editItem) {
      result = await testimonialsService.update(editItem.id, { name: form.name, message: form.message });
    } else {
      result = await testimonialsService.insert({ name: form.name, message: form.message });
    }
    if (result.error) { setError(result.error.message); } else { closeModal(); fetchItems(); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    await testimonialsService.delete(id);
    setDeleteId(null);
    fetchItems();
  };

  return (
    <>
      <div className="admin-header">
        <h1>Testimonials</h1>
        <button className="btn" onClick={openAdd} style={{ fontSize: '0.72rem', padding: '10px 22px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={15} /> Add Testimonial
        </button>
      </div>

      <div className="admin-card" style={{ padding: 0 }}>
        {loading ? (
          <p style={{ padding: '40px', color: 'rgba(255,255,255,0.25)' }}>Loading...</p>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 40px' }}>
            <p style={{ color: 'rgba(255,255,255,0.25)', marginBottom: '20px' }}>No testimonials yet.</p>
            <button className="btn" onClick={openAdd}><Plus size={15} /> Add First Testimonial</button>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Message</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--color-gold)', color: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                        {item.name?.[0]?.toUpperCase() || '?'}
                      </div>
                      <span style={{ color: '#fff', fontWeight: 600 }}>{item.name}</span>
                    </div>
                  </td>
                  <td style={{ maxWidth: '400px' }}>
                    <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: '0.82rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.5)' }}>
                      "{item.message}"
                    </span>
                  </td>
                  <td style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
                    {item.created_at ? new Date(item.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                  </td>
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
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '36px', width: '100%', maxWidth: '520px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem' }}>
                {editItem ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="form-group">
                <label className="form-label">Client Name *</label>
                <input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Rajesh Nair" />
              </div>
              <div className="form-group">
                <label className="form-label">Testimonial Message *</label>
                <textarea className="form-input" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Client's testimonial..." style={{ minHeight: '130px' }} />
              </div>

              {error && <p style={{ color: '#f87171', fontSize: '0.82rem', background: 'rgba(239,68,68,0.1)', padding: '10px 14px', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</p>}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button onClick={closeModal} style={{ padding: '10px 22px', background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '0.78rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving} className="btn" style={{ padding: '10px 26px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={15} /> {saving ? 'Saving...' : editItem ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: '#111', border: '1px solid rgba(239,68,68,0.2)', padding: '36px', width: '100%', maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '12px' }}>Delete Testimonial?</h3>
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
