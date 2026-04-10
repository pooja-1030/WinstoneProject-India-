import { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { supabase } from '../services/supabase';
import { contactInfo } from '../data/constants';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    const { name, email, phone, message } = form;
    const { error } = await supabase.from('contacts').insert([{ name, email, phone, message }]);
    if (error) {
      setErrorMsg(error.message);
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header__bg">
          <img src="/professional-pattern-76L9dIPN.jpg" alt="Contact Winstone Projects" />
          <div className="page-header__overlay" />
        </div>
        <div className="page-header__content container">
          <span className="section-subtitle">Get in Touch</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            Contact Us
          </h1>
        </div>
      </div>

      <section className="section section-black">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px', alignItems: 'start' }}>
          {/* Left – Info */}
          <div>
            <span className="section-subtitle">Our Office</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, marginBottom: '28px' }}>
              Let's Build Something Extraordinary Together
            </h2>
            <div className="gold-divider" />
            <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, marginBottom: '40px', marginTop: '24px' }}>
              Whether you're looking for your dream home, an investment opportunity, or a commercial space — our team is ready to guide you every step of the way.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                { Icon: MapPin, label: 'Address', value: contactInfo.address },
                { Icon: Phone, label: 'Phone', value: contactInfo.phone },
                { Icon: Mail, label: 'Email', value: contactInfo.email },
              ].map(({ Icon, label, value }) => (
                <div key={label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: 46, height: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(201,164,92,0.12)', border: '1px solid rgba(201,164,92,0.25)', color: 'var(--color-gold)', flexShrink: 0 }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>{label}</p>
                    <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                marginTop: '36px', background: '#25D366',
                color: '#fff', padding: '13px 28px',
                fontSize: '0.78rem', fontWeight: '700', letterSpacing: '1px',
                textTransform: 'uppercase', textDecoration: 'none',
                transition: 'opacity 0.3s ease',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Right – Form */}
          <div className="admin-card" style={{ padding: '40px' }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle2 size={48} style={{ color: '#4ade80', margin: '0 auto 20px' }} />
                <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>Message Received!</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button className="btn" onClick={() => setStatus('idle')} style={{ marginTop: '28px' }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', marginBottom: '8px' }}>
                  Send us a Message
                </h3>

                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input className="form-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea className="form-input" name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your requirements..." required />
                </div>

                {status === 'error' && (
                  <p style={{ color: '#f87171', fontSize: '0.85rem' }}>{errorMsg || 'Something went wrong. Please try again.'}</p>
                )}

                <button type="submit" className="btn" disabled={status === 'loading'} style={{ alignSelf: 'flex-start', opacity: status === 'loading' ? 0.6 : 1 }}>
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
