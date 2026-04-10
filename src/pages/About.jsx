import { Link } from 'react-router-dom';
import { ArrowRight, Quote, Award, Target, Users, MapPin, TrendingUp, Building2 } from 'lucide-react';
import { companyInfo, founderInfo, whyChooseUs, stats } from '../data/constants';

const iconMap = { Award, MapPin, TrendingUp, Building2, Users };

const founderStats = [
  { value: '6+',    label: 'Years of Excellence',  Icon: Award  },
  { value: '20+',   label: 'Projects Completed',   Icon: Target },
  { value: '2000+', label: 'Lives Impacted',        Icon: Users  },
];

const leadershipTags = [
  'Luxury Real Estate',
  'Design-Driven Architecture',
  'Technology Integration',
  'Premium Development',
  'Pan-India Expansion',
  'Award-Winning Projects',
];

export default function About() {
  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header__bg">
          <img src="/winstone-foundation-CnK31L2s.jpg" alt="About Winstone Projects" />
          <div className="page-header__overlay" />
        </div>
        <div className="page-header__content container">
          <span className="section-subtitle">Who We Are</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            About Winstone Projects
          </h1>
        </div>
      </div>

      {/* Mission */}
      <section className="section section-dark">
        <div className="container about-strip">
          <div className="about-strip__image">
            <img src="/winstone-projects-B0mWZxEY.jpg" alt="Winstone Bangalore" />
            <div className="about-strip__badge">
              <span className="about-strip__badge-num">2018</span>
              <span className="about-strip__badge-text">Established in Bangalore</span>
            </div>
          </div>
          <div className="about-strip__content">
            <span className="section-subtitle">Our Story</span>
            <h2 className="section-title">Crafting India's Most Premium Living Experiences</h2>
            <div className="gold-divider" />
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, marginBottom: '16px', marginTop: '24px' }}>
              {companyInfo.description}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, marginBottom: '32px' }}>
              {companyInfo.vision}
            </p>
            <Link to="/projects" className="btn">
              View Our Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--color-gold)', padding: '60px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', textAlign: 'center' }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ padding: '20px', borderRight: i < stats.length - 1 ? '1px solid rgba(10,10,10,0.2)' : 'none' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', fontWeight: 700, color: '#0a0a0a', lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(10,10,10,0.6)', marginTop: '8px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section className="section section-black">
        <div className="container">
          <div className="founder-new">

            {/* ── Left col ── */}
            <div className="founder-new__left">
              <div className="founder-new__img-wrap" style={{ marginBottom: '20px' }}>
                <img src={founderInfo.image} alt={founderInfo.name} />
              </div>
              <div className="founder-new__quote-card" style={{ marginBottom: '20px' }}>
                <Quote size={22} style={{ color: 'var(--color-gold)', marginBottom: '10px', opacity: 0.8 }} />
                <p>"Excellence is not a destination, but a journey of continuous innovation and meaningful impact."</p>
              </div>

              <div className="founder-new__stats">
                {founderStats.map(({ value, label, Icon }) => (
                  <div key={label} className="founder-new__stat">
                    <Icon size={22} style={{ color: 'var(--color-gold)' }} />
                    <div className="founder-new__stat-val">{value}</div>
                    <div className="founder-new__stat-label">{label}</div>
                  </div>
                ))}
              </div>

              <Link to="/portfolio" style={{
                marginTop: '28px',
                alignSelf: 'flex-start',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'var(--color-gold)',
                color: '#0a0a0a',
                padding: '14px 36px',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
                textDecoration: 'none',
                transition: 'background 0.3s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#b8923f'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-gold)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Know More <ArrowRight size={16} />
              </Link>
            </div>

            {/* ── Right col ── */}
            <div className="founder-new__right">
              <span className="section-subtitle">Visionary Leadership</span>
              <h2 className="section-title">{founderInfo.name}</h2>
              <p className="founder-strip__role">{founderInfo.title} · {founderInfo.company}</p>
              <div className="gold-divider" />
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, margin: '24px 0 32px', fontSize: '0.95rem' }}>
                {founderInfo.bio}
              </p>

              <h3 className="founder-new__qualities-title">Core Leadership Qualities</h3>
              <div className="founder-new__tags">
                {leadershipTags.map((tag) => (
                  <span key={tag} className="founder-new__tag">{tag}</span>
                ))}
              </div>

              <div className="founder-new__mission">
                <div className="gold-divider" style={{ margin: '0 auto 20px' }} />
                <h4 className="founder-new__mission-title">Mission Statement</h4>
                <Quote size={24} style={{ color: 'var(--color-gold)', opacity: 0.35, margin: '0 auto 12px', display: 'block' }} />
                <p className="founder-new__mission-text">
                  "Homes should be more than just spaces to live in; they should be sanctuaries that inspire, comfort, and elevate the lives of those within."
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Why Us</span>
            <h2 className="section-title">The Winstone Difference</h2>
            <div className="gold-divider" style={{ margin: '16px auto' }} />
          </div>
          <div className="why-grid">
            {whyChooseUs.map((r) => {
              const Icon = iconMap[r.icon];
              return (
                <div key={r.id} className="why-card">
                  <div className="why-card__icon">
                    {Icon && <Icon size={28} />}
                  </div>
                  <h3 className="why-card__title">{r.title}</h3>
                  <p className="why-card__desc">{r.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="cta-banner__content container">
          <h2 className="cta-banner__title">Start Your Journey with Winstone Projects</h2>
          <p className="cta-banner__sub">
            From dream to doorstep — let our experts guide you to the perfect property in Bangalore.
          </p>
          <div className="cta-banner__actions">
            <Link to="/contact" className="btn">Get in Touch</Link>
            <Link to="/projects" className="btn btn-outline">View Properties</Link>
          </div>
        </div>
      </section>
    </>
  );
}
