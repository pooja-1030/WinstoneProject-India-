import { useEffect, useState } from 'react';
import { Trash2, Mail, Phone, User, Calendar } from 'lucide-react';
import { contactsService } from '../services/supabase';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const fetchMessages = async () => {
    const { data } = await contactsService.getAll();
    setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id) => {
    await contactsService.delete(id);
    setDeleteId(null);
    fetchMessages();
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

  return (
    <>
      <div className="admin-header">
        <h1>Messages</h1>
        <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '1px' }}>
          {messages.length} total enquir{messages.length === 1 ? 'y' : 'ies'}
        </span>
      </div>

      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.25)' }}>Loading...</p>
      ) : messages.length === 0 ? (
        <div className="admin-card" style={{ textAlign: 'center', padding: '80px' }}>
          <Mail size={40} style={{ color: 'rgba(255,255,255,0.1)', margin: '0 auto 16px' }} />
          <p style={{ color: 'rgba(255,255,255,0.25)' }}>No messages yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((msg) => (
            <div key={msg.id} className="admin-card" style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  {/* Header row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: 36, height: 36, background: 'var(--color-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0a', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>
                        {msg.name?.[0]?.toUpperCase() || '?'}
                      </div>
                      <span style={{ fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>{msg.name}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                      <Mail size={12} style={{ color: 'var(--color-gold)' }} />
                      <a href={`mailto:${msg.email}`} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{msg.email}</a>
                    </div>

                    {msg.phone && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                        <Phone size={12} style={{ color: 'var(--color-gold)' }} />
                        <a href={`tel:${msg.phone}`} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{msg.phone}</a>
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
                      <Calendar size={11} />
                      {formatDate(msg.created_at)}
                    </div>
                  </div>

                  {/* Message */}
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.55)',
                      lineHeight: 1.7,
                      display: expanded === msg.id ? 'block' : '-webkit-box',
                      WebkitLineClamp: expanded === msg.id ? 'unset' : 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {msg.message}
                  </p>
                  {msg.message?.length > 150 && (
                    <button
                      onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}
                      style={{ background: 'none', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', fontSize: '0.75rem', marginTop: '6px', padding: 0 }}
                    >
                      {expanded === msg.id ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <a href={`mailto:${msg.email}`} style={{ padding: '8px 14px', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', textDecoration: 'none' }}>
                    <Mail size={13} /> Reply
                  </a>
                  <button onClick={() => setDeleteId(msg.id)} style={{ padding: '8px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem' }}>
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: '#111', border: '1px solid rgba(239,68,68,0.2)', padding: '36px', width: '100%', maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '12px' }}>Delete Message?</h3>
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
