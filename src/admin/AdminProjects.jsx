import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, MapPin } from 'lucide-react';
import { projectsService } from '../services/supabase';

const EMPTY_FORM = { title: '', description: '', location: '', image: '' };

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    const { data } = await projectsService.getAll();
    setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const openAdd = () => {
    setEditItem(null);
    setForm(EMPTY_FORM);
    setError('');
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({ title: item.title, description: item.description, location: item.location, image: item.image || '' });
    setError('');
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditItem(null); setForm(EMPTY_FORM); setError(''); };

  const handleSave = async () => {
    if (!form.title || !form.description || !form.location) {
      setError('Title, description, and location are required.');
      return;
    }
    setSaving(true);
    setError('');
    const payload = { title: form.title, description: form.description, location: form.location, image: form.image || null };
    let result;
    if (editItem) {
      result = await projectsService.update(editItem.id, payload);
    } else {
      result = await projectsService.insert(payload);
    }
    if (result.error) {
      setError(result.error.message);
    } else {
      closeModal();
      fetchProjects();
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    await projectsService.delete(id);
    setDeleteId(null);
    fetchProjects();
  };

  return (
    <>
      <div className="admin-header">
        <h1>Projects</h1>
        <button className="btn" onClick={openAdd} style={{ fontSize: '0.72rem', padding: '10px 22px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={15} /> Add Project
        </button>
      </div>

      <div className="admin-card" style={{ padding: 0 }}>
        {loading ? (
          <p style={{ padding: '40px', color: 'rgba(255,255,255,0.25)', fontSize: '0.9rem' }}>Loading...</p>
        ) : projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 40px' }}>
            <p style={{ color: 'rgba(255,255,255,0.25)', marginBottom: '20px' }}>No projects yet.</p>
            <button className="btn" onClick={openAdd}><Plus size={15} /> Add First Project</button>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Location</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.image ? (
                      <img src={p.image} alt={p.title} style={{ width: 60, height: 44, objectFit: 'cover', borderRadius: '2px' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    ) : (
                      <div style={{ width: 60, height: 44, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🏠</div>
                    )}
                  </td>
                  <td style={{ color: '#fff', fontWeight: 600 }}>{p.title}</td>
                  <td>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--color-gold)', fontSize: '0.8rem' }}>
                      <MapPin size={12} />{p.location}
                    </span>
                  </td>
                  <td style={{ maxWidth: '300px' }}>
                    <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: '0.82rem' }}>
                      {p.description}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => openEdit(p)} style={{ padding: '7px 12px', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', color: '#60a5fa', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', transition: 'all 0.2s' }}>
                        <Pencil size={13} /> Edit
                      </button>
                      <button onClick={() => setDeleteId(p.id)} style={{ padding: '7px 12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', transition: 'all 0.2s' }}>
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '36px', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem' }}>
                {editItem ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="form-group">
                <label className="form-label">Project Title *</label>
                <input className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Winstone Arcadia Villas" />
              </div>
              <div className="form-group">
                <label className="form-label">Location (India only) *</label>
                <input className="form-input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Whitefield, Bangalore" />
              </div>
              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea className="form-input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the project..." style={{ minHeight: '110px' }} />
              </div>
              <div className="form-group">
                <label className="form-label">Image Path (from /public)</label>
                <input className="form-input" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="e.g. /hero_villa.png" />
                {form.image && (
                  <img src={form.image} alt="preview" style={{ marginTop: '10px', height: '100px', objectFit: 'cover', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.1)' }} onError={(e) => { e.target.style.display = 'none'; }} />
                )}
              </div>

              {error && <p style={{ color: '#f87171', fontSize: '0.82rem', background: 'rgba(239,68,68,0.1)', padding: '10px 14px', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</p>}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
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
          <div style={{ background: '#111', border: '1px solid rgba(239,68,68,0.2)', padding: '36px', width: '100%', maxWidth: '420px' }}>
            <h3 style={{ marginBottom: '12px' }}>Delete Project?</h3>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', marginBottom: '28px' }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setDeleteId(null)} style={{ flex: 1, padding: '11px', background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', cursor: 'pointer', fontSize: '0.82rem' }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)} style={{ flex: 1, padding: '11px', background: '#ef4444', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700 }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
