import './Partners.css'

const partners = [
  { name: 'GODREJ', sub: 'PROPERTIES' },
  { name: 'PRESTIGE', sub: 'GROUP' },
  { name: 'SOBHA', sub: 'LIMITED' },
  { name: 'BRIGADE', sub: 'GROUP' },
  { name: 'DLF', sub: '' },
  { name: 'LODHA', sub: 'GROUP' },
  { name: 'OBEROI', sub: 'REALTY' },
  { name: 'PURAVANKARA', sub: '' },
  { name: 'MAHINDRA', sub: 'LIFESPACES' },
  { name: 'TATA', sub: 'HOUSING' },
]

export default function Partners() {
  const doubled = [...partners, ...partners]

  return (
    <section className="partners-section">
      <div className="container partners-header">
        <span className="partners-badge">STRATEGIC PARTNERSHIPS</span>
        <h2 className="partners-title">
          Trusted by <span className="text-gold">Industry Leaders</span>
        </h2>
        <div className="section-divider">
          <div className="line" /><div className="dot" /><div className="line" />
        </div>
        <p className="partners-desc">
          Collaborating with leading real estate companies across India,
          delivering excellence in every partnership
        </p>
      </div>

      {/* Scrolling logo track */}
      <div className="partners-marquee">
        <div className="partners-track">
          {doubled.map((p, i) => (
            <div key={i} className="partner-item">
              <div className="partner-logo-text">
                <span className="partner-name">{p.name}</span>
                {p.sub && <span className="partner-sub">{p.sub}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
