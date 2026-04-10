import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navLinks, socialMedia } from '../data/constants';
import './Navbar.css';

// Inline SVG social icons (brand icons not in lucide-react)
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TwitterXIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img src="/winstonelogo.jpg" alt="Winstone Projects" className="navbar__logo-img" />
          <span className="navbar__logo-text">
            WINSTONE <span className="navbar__logo-sub">PROJECTS</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`navbar__link${pathname === link.path ? ' navbar__link--active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: Social icons + CTA */}
        <div className="navbar__right">
          <div className="navbar__social">
            <a
              href={socialMedia.instagram}
              target="_blank"
              rel="noreferrer"
              className="navbar__social-link"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href={socialMedia.twitter}
              target="_blank"
              rel="noreferrer"
              className="navbar__social-link"
              aria-label="Twitter / X"
            >
              <TwitterXIcon />
            </a>
          </div>
          <Link to="/contact" className="navbar__cta">
            Get in Touch
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="navbar__toggle" onClick={() => setMenuOpen((p) => !p)} aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`navbar__mobile-link${pathname === link.path ? ' navbar__mobile-link--active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
        {/* Mobile Social Row */}
        <div className="navbar__mobile-social">
          <a href={socialMedia.instagram} target="_blank" rel="noreferrer" className="navbar__mobile-social-link" aria-label="Instagram">
            <InstagramIcon /> Instagram
          </a>
          <a href={socialMedia.twitter} target="_blank" rel="noreferrer" className="navbar__mobile-social-link" aria-label="Twitter">
            <TwitterXIcon /> Twitter / X
          </a>
        </div>
        <Link to="/contact" className="navbar__mobile-cta">
          Get in Touch
        </Link>
      </div>
    </nav>
  );
}
