import { useEffect, useState } from 'react';
import { Check, Save, Globe, Phone, Mail, MapPin, Building2, Search, AlertCircle } from 'lucide-react';
import { settingsService, seoService } from '../services/supabase';

const TABS = [
  { key: 'company',  label: 'Company Info' },
  { key: 'contact',  label: 'Contact Details' },
  { key: 'social',   label: 'Social Media' },
  { key: 'seo',      label: 'SEO Settings' },
];

const SEO_PAGES = [
  { key: 'home',      label: 'Home Page' },
  { key: 'about',     label: 'About Page' },
  { key: 'projects',  label: 'Projects Page' },
  { key: 'portfolio', label: 'Portfolio Page' },
  { key: 'services',  label: 'Services Page' },
  { key: 'contact',   label: 'Contact Page' },
];

const DEFAULT_KEYWORDS = 'luxury real estate India, premium villas Bangalore, property investment India, gated community Bangalore, luxury apartments Bangalore';

function Toast({ msg, type }) {
  if (!msg) return null;
  const isErr = type === 'error';
  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, background: isErr ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)', border: `1px solid ${isErr ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`, color: isErr ? '#f87171' : '#4ade80', padding: '13px 20px', fontSize: '0.82rem', fontWeight: 500, zIndex: 3000, maxWidth: 380 }}>
      {msg}
    </div>
  );
}

export default function AdminSettings() {
  const [activeTab, setTab]   = useState('company');
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState({ msg: '', type: 'success' });
  const [seoPage, setSeoPage] = useState('home');

  // Company fields
  const [company, setCompany] = useState({
    name: '', tagline: '', established: '', description: '', mission: '', vision: '',
  });

  // Contact fields
  const [contact, setContact] = useState({
    phone: '', email: '', address: '', whatsapp: '', whatsapp_message: '',
  });

  // Social fields
  const [social, setSocial] = useState({
    instagram: '', facebook: '', linkedin: '', twitter: '', youtube: '',
  });

  // SEO per page
  const [seoData, setSeoData] = useState({});
  const [seoLoading, setSeoLoading] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: 'success' }), 3500);
  };

  // Load all settings on mount
  useEffect(() => {
    settingsService.getAll().then(({ data }) => {
      if (!data) return;
      const map = Object.fromEntries(data.map((r) => [r.key, r.value]));
      setCompany({
        name:        map.company_name        || 'Winstone Projects',
        tagline:     map.company_tagline     || 'Redefining Luxury Living in Bangalore',
        established: map.company_established || '2018',
        description: map.company_description || '',
        mission:     map.company_mission     || '',
        vision:      map.company_vision      || '',
      });
      setContact({
        phone:             map.contact_phone             || '+91 98450 12345',
        email:             map.contact_email             || 'info@winstoneprojects.in',
        address:           map.contact_address           || '',
        whatsapp:          map.contact_whatsapp          || '',
        whatsapp_message:  map.contact_whatsapp_message  || '',
      });
      setSocial({
        instagram: map.social_instagram || '',
        facebook:  map.social_facebook  || '',
        linkedin:  map.social_linkedin  || '',
        twitter:   map.social_twitter   || '',
        youtube:   map.social_youtube   || '',
      });
    });
  }, []);

  // Load SEO when tab or page changes
  useEffect(() => {
    if (activeTab !== 'seo') return;
    setSeoLoading(true);
    seoService.getByPage(seoPage).then(({ data }) => {
      setSeoData((prev) => ({
        ...prev,
        [seoPage]: data || { page: seoPage, meta_title: '', meta_description: '', keywords: DEFAULT_KEYWORDS },
      }));
      setSeoLoading(false);
    });
  }, [activeTab, seoPage]);

  const saveCompany = async () => {
    setSaving(true);
    await settingsService.upsertMany([
      { key: 'company_name',        value: company.name        },
      { key: 'company_tagline',     value: company.tagline     },
      { key: 'company_established', value: company.established },
      { key: 'company_description', value: company.description },
      { key: 'company_mission',     value: company.mission     },
      { key: 'company_vision',      value: company.vision      },
    ]);
    showToast('Company info saved.');
    setSaving(false);
  };

  const saveContact = async () => {
    setSaving(true);
    await settingsService.upsertMany([
      { key: 'contact_phone',            value: contact.phone            },
      { key: 'contact_email',            value: contact.email            },
      { key: 'contact_address',          value: contact.address          },
      { key: 'contact_whatsapp',         value: contact.whatsapp         },
      { key: 'contact_whatsapp_message', value: contact.whatsapp_message },
    ]);
    showToast('Contact details saved.');
    setSaving(false);
  };

  const saveSocial = async () => {
    setSaving(true);
    await settingsService.upsertMany([
      { key: 'social_instagram', value: social.instagram },
      { key: 'social_facebook',  value: social.facebook  },
      { key: 'social_linkedin',  value: social.linkedin  },
      { key: 'social_twitter',   value: social.twitter   },
      { key: 'social_youtube',   value: social.youtube   },
    ]);
    showToast('Social media links saved.');
    setSaving(false);
  };

  const saveSeo = async () => {
    const current = seoData[seoPage];
    if (!current) return;
    setSaving(true);
    await seoService.upsert({ page: seoPage, meta_title: current.meta_title, meta_description: current.meta_description, keywords: current.keywords });
    showToast(`SEO saved for ${SEO_PAGES.find((p) => p.key === seoPage)?.label}.`);
    setSaving(false);
  };

  const updateSeo = (field, val) => {
    setSeoData((prev) => ({ ...prev, [seoPage]: { ...(prev[seoPage] || {}), [field]: val } }));
  };

  const curSeo = seoData[seoPage] || { meta_title: '', meta_description: '', keywords: '' };

  const Field = ({ label, value, onChange, placeholder, type = 'text', hint }) => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {hint && <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', marginBottom: '6px' }}>{hint}</p>}
      {type === 'textarea' ? (
        <textarea className="form-input" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ minHeight: 90 }} />
      ) : (
        <input className="form-input" type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      )}
    </div>
  );

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Settings & SEO</h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem', marginTop: '4px' }}>
            Manage site-wide content, contact details, and SEO metadata
          </p>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '4px', marginBottom: '28px', width: 'fit-content' }}>
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: '9px 20px',
              background: activeTab === key ? 'rgba(201,164,92,0.15)' : 'transparent',
              border: activeTab === key ? '1px solid rgba(201,164,92,0.3)' : '1px solid transparent',
              color: activeTab === key ? 'var(--color-gold)' : 'rgba(255,255,255,0.45)',
              cursor: 'pointer', fontSize: '0.8rem', fontWeight: activeTab === key ? 700 : 500,
              transition: 'all 0.2s',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ══ COMPANY INFO ══ */}
      {activeTab === 'company' && (
        <div className="admin-card" style={{ maxWidth: 760 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <Building2 size={20} style={{ color: 'var(--color-gold)' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Company Information</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field label="Company Name" value={company.name} onChange={(v) => setCompany({ ...company, name: v })} placeholder="Winstone Projects" />
              <Field label="Established Year" value={company.established} onChange={(v) => setCompany({ ...company, established: v })} placeholder="2018" />
            </div>
            <Field label="Tagline" value={company.tagline} onChange={(v) => setCompany({ ...company, tagline: v })} placeholder="Redefining Luxury Living in Bangalore" />
            <Field label="Company Description" value={company.description} onChange={(v) => setCompany({ ...company, description: v })} placeholder="About your company..." type="textarea" />
            <Field label="Mission Statement" value={company.mission} onChange={(v) => setCompany({ ...company, mission: v })} placeholder="Our mission..." type="textarea" />
            <Field label="Vision Statement" value={company.vision} onChange={(v) => setCompany({ ...company, vision: v })} placeholder="Our vision..." type="textarea" />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={saveCompany} disabled={saving} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '11px 28px' }}>
                <Save size={15} /> {saving ? 'Saving...' : 'Save Company Info'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ CONTACT DETAILS ══ */}
      {activeTab === 'contact' && (
        <div className="admin-card" style={{ maxWidth: 760 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <Phone size={20} style={{ color: 'var(--color-gold)' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Contact Details</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field label="Phone Number" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} placeholder="+91 98450 12345" />
              <Field label="Email Address" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} placeholder="info@winstoneprojects.in" type="email" />
            </div>
            <Field label="Office Address" value={contact.address} onChange={(v) => setContact({ ...contact, address: v })} placeholder="Prestige Tech Park, Outer Ring Road, Bangalore – 560 103" type="textarea" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field label="WhatsApp Number (with country code)" value={contact.whatsapp} onChange={(v) => setContact({ ...contact, whatsapp: v })} placeholder="919845012345" hint="Format: 91XXXXXXXXXX (no + or spaces)" />
              <Field label="WhatsApp Pre-filled Message" value={contact.whatsapp_message} onChange={(v) => setContact({ ...contact, whatsapp_message: v })} placeholder="Hello, I'm interested in your properties." />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={saveContact} disabled={saving} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '11px 28px' }}>
                <Save size={15} /> {saving ? 'Saving...' : 'Save Contact Details'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ SOCIAL MEDIA ══ */}
      {activeTab === 'social' && (
        <div className="admin-card" style={{ maxWidth: 760 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <Globe size={20} style={{ color: 'var(--color-gold)' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Social Media Links</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/winstoneprojects' },
              { key: 'facebook',  label: 'Facebook',  placeholder: 'https://facebook.com/winstoneprojects' },
              { key: 'linkedin',  label: 'LinkedIn',  placeholder: 'https://linkedin.com/company/winstoneprojects' },
              { key: 'twitter',   label: 'X (Twitter)', placeholder: 'https://twitter.com/winstoneprojects' },
              { key: 'youtube',   label: 'YouTube',   placeholder: 'https://youtube.com/@winstoneprojects' },
            ].map(({ key, label, placeholder }) => (
              <div key={key} className="form-group">
                <label className="form-label">{label}</label>
                <input className="form-input" value={social[key]} onChange={(e) => setSocial({ ...social, [key]: e.target.value })} placeholder={placeholder} />
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={saveSocial} disabled={saving} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '11px 28px' }}>
                <Save size={15} /> {saving ? 'Saving...' : 'Save Social Links'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ SEO SETTINGS ══ */}
      {activeTab === 'seo' && (
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px', alignItems: 'start' }}>
          {/* Page picker */}
          <div className="admin-card" style={{ padding: '8px 0' }}>
            <div style={{ padding: '12px 16px', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
              Pages
            </div>
            {SEO_PAGES.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSeoPage(key)}
                style={{
                  display: 'flex', alignItems: 'center', width: '100%', padding: '11px 16px',
                  background: seoPage === key ? 'rgba(201,164,92,0.1)' : 'transparent',
                  borderLeft: `2px solid ${seoPage === key ? 'var(--color-gold)' : 'transparent'}`,
                  border: 'none', color: seoPage === key ? 'var(--color-gold)' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer', fontSize: '0.82rem', fontWeight: seoPage === key ? 600 : 400,
                  transition: 'all 0.2s', textAlign: 'left',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* SEO form */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <Search size={20} style={{ color: 'var(--color-gold)' }} />
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>
                  {SEO_PAGES.find((p) => p.key === seoPage)?.label} — SEO
                </h3>
                <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>
                  Optimise this page for search engines
                </p>
              </div>
            </div>

            {seoLoading ? (
              <div style={{ padding: '40px 0' }}>
                {[...Array(3)].map((_, i) => <div key={i} style={{ height: 48, background: 'rgba(255,255,255,0.03)', marginBottom: 12, borderRadius: 2 }} />)}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Meta Title</label>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginBottom: '6px' }}>Recommended: 50–60 characters</p>
                  <input className="form-input" value={curSeo.meta_title || ''} onChange={(e) => updateSeo('meta_title', e.target.value)} placeholder="e.g. Luxury Villas & Apartments in Bangalore | Winstone Projects" />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                    <span style={{ fontSize: '0.68rem', color: (curSeo.meta_title || '').length > 60 ? '#f87171' : 'rgba(255,255,255,0.3)' }}>
                      {(curSeo.meta_title || '').length} / 60
                    </span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Meta Description</label>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginBottom: '6px' }}>Recommended: 140–160 characters</p>
                  <textarea className="form-input" value={curSeo.meta_description || ''} onChange={(e) => updateSeo('meta_description', e.target.value)} placeholder="e.g. Discover premium residential and commercial properties by Winstone Projects across Bangalore, Mysore and Hyderabad." style={{ minHeight: 90 }} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                    <span style={{ fontSize: '0.68rem', color: (curSeo.meta_description || '').length > 160 ? '#f87171' : 'rgba(255,255,255,0.3)' }}>
                      {(curSeo.meta_description || '').length} / 160
                    </span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Keywords</label>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginBottom: '6px' }}>Comma-separated keywords</p>
                  <textarea className="form-input" value={curSeo.keywords || ''} onChange={(e) => updateSeo('keywords', e.target.value)} placeholder="luxury real estate India, premium villas Bangalore, property investment India..." style={{ minHeight: 80 }} />
                </div>

                {/* Google Preview */}
                {(curSeo.meta_title || curSeo.meta_description) && (
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '16px 20px' }}>
                    <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '10px' }}>Google Preview</p>
                    <p style={{ fontSize: '1rem', color: '#8ab4f8', marginBottom: '2px', fontWeight: 500 }}>
                      {curSeo.meta_title || 'Page Title'}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#4ade80', marginBottom: '4px' }}>
                      winstoneprojects.in › {seoPage === 'home' ? '' : seoPage}
                    </p>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                      {curSeo.meta_description || 'Page description will appear here…'}
                    </p>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)' }}>
                    <AlertCircle size={13} />
                    Changes apply to your site metadata after deploying
                  </div>
                  <button onClick={saveSeo} disabled={saving} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '11px 28px' }}>
                    <Save size={15} /> {saving ? 'Saving...' : 'Save SEO'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Toast msg={toast.msg} type={toast.type} />
    </>
  );
}
