import './Awards.css'

const awards = [
  {
    year: '2023',
    title: 'Excellence in Real Estate Development',
    org: 'NAR India (National Association of Realtors)',
    desc: 'Recognition for outstanding achievements in luxury real estate development and innovative architectural solutions.',
  },
  {
    year: '2022',
    title: 'Sustainable Development Excellence',
    org: "CREDAI (Confederation of Real Estate Developers' Associations of India)",
    desc: 'Recognized for implementing eco-friendly practices and sustainable construction methodologies in luxury developments.',
  },
  {
    year: '2021',
    title: 'Innovation in Design Excellence',
    org: 'Karnataka Real Estate Regulatory Authority',
    desc: 'Acknowledged for pioneering design-driven architecture and technology-integrated development projects.',
  },
  {
    year: '2020',
    title: 'Outstanding Project Management',
    org: 'NAREDCO (National Real Estate Development Council)',
    desc: 'Honored for exceptional project execution and timely delivery of large-scale residential and commercial projects.',
  },
  {
    year: '2019',
    title: 'Customer Satisfaction Award',
    org: 'Indian Real Estate Forum',
    desc: 'Awarded for maintaining highest standards of customer service and client satisfaction across all projects.',
  },
  {
    year: '2018',
    title: 'Best Luxury Villa Development',
    org: 'South India Property Awards',
    desc: 'Recognized as the best luxury villa developer for creating premium residential spaces with world-class amenities.',
  },
]

export default function Awards() {
  return (
    <section id="awards" className="awards-section">
      {/* Background image */}
      <div className="awards-bg-image" />

      <div className="container awards-inner">
        <div className="awards-header">
          <span className="awards-label">Recognition</span>
          <h2>Awards &amp; <span className="text-gold">Achievements</span></h2>
          <div className="section-divider">
            <div className="line" /><div className="dot" /><div className="line" />
          </div>
          <p className="awards-desc">
            Recognition for exceptional achievements in luxury real estate
            development, innovative design, and outstanding contributions to the
            industry by leading organizations including NAR India and CREDAI.
          </p>
        </div>

        {/* Awards Grid - 2 columns matching original */}
        <div className="awards-grid">
          {awards.map((award, i) => (
            <div key={i} className="award-card">
              <div className="award-card-top">
                <div className="award-trophy">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8 21h8M12 17v4M6 3h12M6 3c-1 0-3 1.5-3 4s2 4 3 4M18 3c1 0 3 1.5 3 4s-2 4-3 4M6 11h12M8 11a4 4 0 0 0 8 0"/>
                  </svg>
                </div>
                <h3 className="award-title">{award.title}</h3>
                <p className="award-org">{award.org}</p>
                <span className="award-year">{award.year}</span>
              </div>
              <p className="award-desc">{award.desc}</p>
              <div className="award-icons">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Summary stats */}
        <div className="awards-summary">
          <div className="awards-stat-card">
            <div className="awards-stat-value">6+</div>
            <div className="awards-stat-label">Industry Awards</div>
          </div>
          <div className="awards-stat-card">
            <div className="awards-stat-value">50+</div>
            <div className="awards-stat-label">Projects Delivered</div>
          </div>
          <div className="awards-stat-card">
            <div className="awards-stat-value">10+</div>
            <div className="awards-stat-label">Cities in India</div>
          </div>
        </div>
      </div>
    </section>
  )
}
