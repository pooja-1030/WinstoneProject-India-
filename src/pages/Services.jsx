import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    emoji: '🏡',
    title: 'Luxury Villas',
    subtitle: 'Independent Living Redefined',
    desc: 'Bespoke independent villas crafted with premium materials, smart-home integrations, and curated landscaping. Each villa is designed to reflect the modern Indian family\'s aspirations for space, privacy, and sophistication.',
    features: ['Custom Architecture', 'Private Pools', 'Smart Home Integration', 'Vastu-Compliant Design', 'Landscaped Gardens'],
    image: '/hero_villa.png',
  },
  {
    emoji: '🏢',
    title: 'Residential Projects',
    subtitle: 'Urban Luxury Apartments',
    desc: 'High-rise and mid-rise residential developments in Bangalore\'s prime neighbourhoods. World-class amenities, thoughtfully designed floor plans, and sustainable building practices define every tower we build.',
    features: ['3 & 4 BHK Configurations', 'Sky Lounges', 'Resort-style Clubhouses', 'RERA Registered', 'IGBC Certified'],
    image: '/project_apartments.png',
  },
  {
    emoji: '🌳',
    title: 'Land Development',
    subtitle: 'Plotted Developments',
    desc: 'BMRDA and RERA-approved plotted layouts in Bangalore\'s fastest-growing corridors including Devanahalli, Sarjapur, and Hosur Road. Clear titles and complete legal documentation guaranteed.',
    features: ['BMRDA Approved Layouts', 'Clear Title Properties', 'Gated Communities', 'Underground Utilities', 'Wide Internal Roads'],
    image: '/project_farms.png',
  },
  {
    emoji: '🏬',
    title: 'Commercial Spaces',
    subtitle: 'Grade-A Office & Retail',
    desc: 'Future-ready commercial developments designed for Bangalore\'s booming IT, startup, and retail sectors. Flexible floor plates, LEED certification, and premium infrastructure for businesses that demand the best.',
    features: ['LEED Green Certification', 'Flexible Floor Plates', 'High-Speed Connectivity', 'Multi-Level Parking', 'Concierge Services'],
    image: '/project_villa_interior.png',
  },
  {
    emoji: '🏘️',
    title: 'Township Development',
    subtitle: 'Integrated Self-Sufficient Communities',
    desc: 'Large-scale integrated townships that blend premium residential zones with retail, education, healthcare, and green spaces. A complete ecosystem designed for India\'s next generation of communities.',
    features: ['120+ Acre Developments', 'Schools & Healthcare Nearby', 'Retail Promenades', 'Parks & Open Spaces', 'Community Clubhouses'],
    image: '/winstone-foundation-CnK31L2s.jpg',
  },
];

export default function Services() {
  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header__bg">
          <img src="/professional-pattern-76L9dIPN.jpg" alt="Winstone Services" />
          <div className="page-header__overlay" />
        </div>
        <div className="page-header__content container">
          <span className="section-subtitle">What We Offer</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            Our Services
          </h1>
        </div>
      </div>

      {/* Services */}
      {services.map((s, i) => (
        <section key={s.title} className={`section ${i % 2 === 0 ? 'section-black' : 'section-dark'}`}>
          <div className={`container service-row${i % 2 !== 0 ? ' service-row--reverse' : ''}`}>
            {/* Image */}
            <div className="service-row__img-wrap">
              <img
                src={s.image}
                alt={s.title}
                className="service-row__img"
                onError={(e) => { e.target.src = '/hero_villa.png'; }}
              />
              <div className="service-row__img-overlay" />
              <div className="service-row__badge">
                {s.emoji} {s.title}
              </div>
            </div>
            {/* Text */}
            <div className="service-row__body">
              <span className="section-subtitle">{s.subtitle}</span>
              <h2 className="section-title">{s.title}</h2>
              <div className="gold-divider" />
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, margin: '24px 0' }}>{s.desc}</p>
              <ul className="service-row__features">
                {s.features.map((f) => (
                  <li key={f} className="service-row__feature">
                    <span className="service-row__diamond" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn">
                Enquire Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="cta-banner">
        <div className="cta-banner__content container">
          <h2 className="cta-banner__title">Find Your Perfect Property in Bangalore</h2>
          <p className="cta-banner__sub">Our team of experts will help you navigate every option to find the development that's right for you.</p>
          <div className="cta-banner__actions">
            <Link to="/contact" className="btn">Get in Touch</Link>
            <Link to="/projects" className="btn btn-outline">View Projects <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
