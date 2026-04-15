import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import FadeUp from '../components/ui/FadeUp';
import BlurText from '../components/ui/BlurText';
import CountUp from '../components/ui/CountUp';
import { ArrowRight, Award, MapPin, TrendingUp, Building2, Users, Target } from 'lucide-react';
import { companyInfo, founderInfo, whyChooseUs } from '../data/constants';
import { getFeaturedProjects } from '../data/projects';
import { getFeaturedPortfolio } from '../data/portfolio';
import { projectsService, portfolioService } from '../services/supabase';

const iconMap = { Award, MapPin, TrendingUp, Building2, Users };

const founderStats = [
  { value: '6+',    label: 'Years of Excellence', Icon: Award  },
  { value: '20+',   label: 'Projects Completed',  Icon: Target },
  { value: '2000+', label: 'Lives Impacted',       Icon: Users  },
];

const leadershipTags = [
  'Luxury Real Estate',
  'Design-Driven Architecture',
  'Technology Integration',
  'Premium Development',
  'Pan-India Expansion',
  'Award-Winning Projects',
];

const services = [
  { icon: '🏡', title: 'Luxury Villas', desc: 'Private villas with premium finishes, smart-home features, and curated landscaping.' },
  { icon: '🏢', title: 'Residential Projects', desc: 'High-rise apartments in prime Bangalore locations with world-class amenities.' },
  { icon: '🌳', title: 'Land Development', desc: 'BMRDA-approved plotted developments with clear titles in high-growth corridors.' },
  { icon: '🏬', title: 'Commercial Spaces', desc: 'Grade-A office and retail spaces designed for modern businesses.' },
  { icon: '🏘️', title: 'Township Development', desc: 'Integrated self-sufficient townships blending community, nature, and convenience.' },
];

const ease = [0.22, 1, 0.36, 1];

export default function Home() {
  const [liveProjects, setLiveProjects] = useState([]);
  const [livePortfolio, setLivePortfolio] = useState([]);
  const staticProjects  = getFeaturedProjects().slice(0, 3);
  const staticPortfolio = getFeaturedPortfolio(6);

  useEffect(() => {
    projectsService.getAll().then(({ data }) => {
      if (data?.length > 0) setLiveProjects(data.slice(0, 3));
    });
    portfolioService.getAll().then(({ data }) => {
      if (data?.length > 0) setLivePortfolio(data.slice(0, 6));
    });
  }, []);

  const displayProjects  = liveProjects.length  > 0 ? liveProjects  : staticProjects;
  const displayPortfolio = livePortfolio.length > 0 ? livePortfolio : staticPortfolio;

  return (
    <>
      <Hero />

      {/* ── About Strip ── */}
      <section className="section section-dark">
        <div className="container about-strip">
          <FadeUp delay={0}>
            <div className="about-strip__image">
              <img src="/winstone-projects-B0mWZxEY.jpg" alt="Winstone Projects Bangalore" />
              <div className="about-strip__badge">
                <span className="about-strip__badge-num">Est. 2018</span>
                <span className="about-strip__badge-text">Bangalore's Premier Developer</span>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="about-strip__content">
              <span className="section-subtitle">Our Story</span>
              <h2 className="section-title">
                <BlurText text="Crafting Premium Living Experiences in India" delay={0.05} />
              </h2>
              <div className="gold-divider" />
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, marginBottom: '16px' }}>
                {companyInfo.description}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, marginBottom: '32px' }}>
                {companyInfo.vision}
              </p>
              <Link to="/about" className="btn btn-outline">Discover Our Story <ArrowRight size={16} /></Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section section-black">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-subtitle">What We Build</span>
              <h2 className="section-title">
                <BlurText text="Our Services" delay={0.1} />
              </h2>
              <div className="gold-divider" style={{ margin: '16px auto' }} />
            </div>
          </FadeUp>
          <div className="services-grid">
            {services.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.1}>
                <motion.div
                  className="service-card service-card--animated"
                  whileHover={{ y: -8, transition: { duration: 0.3, ease } }}
                >
                  <div className="service-card__icon">{s.icon}</div>
                  <h3 className="service-card__title">{s.title}</h3>
                  <p className="service-card__desc">{s.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="section section-dark">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-subtitle">Our Portfolio</span>
              <h2 className="section-title">
                <BlurText text="Featured Developments" delay={0.1} />
              </h2>
              <div className="gold-divider" style={{ margin: '16px auto' }} />
              <p className="section-desc">
                Explore our curated collection of luxury developments across Bangalore and South India
              </p>
            </div>
          </FadeUp>
          <div className="projects-grid">
            {displayProjects.map((project, i) => (
              <FadeUp key={project.id} delay={i * 0.12}>
                <motion.div
                  className="proj-card"
                  whileHover={{ y: -10, transition: { duration: 0.35, ease } }}
                >
                  <div className="proj-card__img-wrap">
                    <img
                      src={project.image || '/hero_villa.png'}
                      alt={project.title}
                      className="proj-card__img"
                      onError={(e) => { e.target.src = '/hero_villa.png'; }}
                    />
                    <div className="proj-card__overlay" />
                    <span className="proj-card__category">{project.category}</span>
                  </div>
                  <div className="proj-card__body">
                    <div className="proj-card__location">
                      <MapPin size={13} />
                      <span>{project.location}</span>
                    </div>
                    <h3 className="proj-card__title">{project.title}</h3>
                    <p className="proj-card__desc">{project.description?.slice(0, 110)}...</p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.2}>
            <div className="section-cta">
              <Link to="/projects" className="btn btn-outline">View All Projects <ArrowRight size={16} /></Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Portfolio Preview ── */}
      <section className="section section-black">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-subtitle">Completed &amp; Ongoing</span>
              <h2 className="section-title">
                <BlurText text="Our Portfolio" delay={0.1} />
              </h2>
              <div className="gold-divider" style={{ margin: '16px auto' }} />
              <p className="section-desc">
                A curated showcase of our finest villas, residences, commercial spaces, and plotted layouts
              </p>
            </div>
          </FadeUp>
          <div className="portfolio-grid">
            {displayPortfolio.map((item, i) => (
              <FadeUp key={item.id} delay={i * 0.1}>
                <motion.div
                  className="pf-card"
                  whileHover={{ y: -8, transition: { duration: 0.3, ease } }}
                >
                  <div className="pf-card__img-wrap">
                    <img
                      src={item.image || '/hero_villa.png'}
                      alt={item.title}
                      className="pf-card__img"
                      onError={(e) => { e.target.src = '/hero_villa.png'; }}
                    />
                    <div className="pf-card__img-overlay" />
                    <span className="pf-card__category">{item.category}</span>
                    {item.status && (
                      <span className="pf-card__status" style={{
                        background: item.status === 'Completed' ? 'rgba(34,197,94,0.15)' : 'rgba(251,191,36,0.15)',
                        color:      item.status === 'Completed' ? '#4ade80' : '#fbbf24',
                      }}>
                        {item.status}
                      </span>
                    )}
                    {item.year && <span className="pf-card__year">{item.year}</span>}
                  </div>
                  <div className="pf-card__body">
                    <h3 className="pf-card__title">{item.title}</h3>
                    <p className="pf-card__desc">{item.description?.slice(0, 100)}…</p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.2}>
            <div className="section-cta">
              <Link to="/portfolio" className="btn btn-outline">View Full Portfolio <ArrowRight size={16} /></Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="section section-black">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-subtitle">Trust &amp; Excellence</span>
              <h2 className="section-title">
                <BlurText text="Why Choose Winstone Projects" delay={0.08} />
              </h2>
              <div className="gold-divider" style={{ margin: '16px auto' }} />
            </div>
          </FadeUp>
          <div className="why-grid">
            {whyChooseUs.map((r, i) => {
              const Icon = iconMap[r.icon];
              return (
                <FadeUp key={r.id} delay={i * 0.1}>
                  <motion.div
                    className="why-card"
                    whileHover={{ y: -6, borderColor: 'rgba(201,164,92,0.3)', transition: { duration: 0.3 } }}
                  >
                    <div className="why-card__icon">
                      {Icon && <Icon size={28} />}
                    </div>
                    <h3 className="why-card__title">{r.title}</h3>
                    <p className="why-card__desc">{r.description}</p>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Founder ── */}
      <section className="section section-dark">
        <div className="container">
          <div className="founder-new">
            {/* Left col */}
            <FadeUp delay={0}>
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
                      <CountUp value={value} className="founder-new__stat-val" />
                      <div className="founder-new__stat-label">{label}</div>
                    </div>
                  ))}
                </div>
                <Link to="/portfolio" style={{
                  marginTop: '28px', alignSelf: 'flex-start',
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  background: 'var(--color-gold)', color: '#0a0a0a',
                  padding: '14px 36px', borderRadius: '50px',
                  fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.5px',
                  textDecoration: 'none', transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#b8923f'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(201,164,92,0.35)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-gold)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  Know More <ArrowRight size={16} />
                </Link>
              </div>
            </FadeUp>

            {/* Right col */}
            <FadeUp delay={0.18}>
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
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner">
        <FadeUp>
          <div className="cta-banner__content container">
            <h2 className="cta-banner__title">Ready to Own a Piece of Bangalore's Finest?</h2>
            <p className="cta-banner__sub">
              Connect with our experts to explore exclusive investment opportunities in India's most dynamic city.
            </p>
            <div className="cta-banner__actions">
              <Link to="/contact" className="btn">Get in Touch</Link>
              <Link to="/projects" className="btn btn-outline">Explore Properties</Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
