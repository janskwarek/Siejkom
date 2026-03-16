// src/components/Footer/Footer.jsx
import { Link } from "react-router-dom";
import { COMPANY, NAV_LINKS } from "../../data/company";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        {/* Brand */}
        <div className="footer__brand">
          <span className="footer__logo">{COMPANY.name}</span>
          <p className="footer__desc">
            Producent betonu i deweloper z Piekar Śląskich. Działamy od{" "}
            {COMPANY.founded} roku.
          </p>
          <div className="footer__social">
            {/* Dodaj linki do social media */}
            <a href="#fb" className="footer__social-link" aria-label="Facebook">
              fb
            </a>
            <a href="#yt" className="footer__social-link" aria-label="YouTube">
              yt
            </a>
          </div>
        </div>

        {/* Navigation */}
        <nav className="footer__nav">
          <span className="footer__nav-title">Nawigacja</span>
          {NAV_LINKS.map(({ label, path }) => (
            <Link key={path} to={path} className="footer__nav-link">
              {label}
            </Link>
          ))}
        </nav>

        {/* Contact */}
        <div className="footer__contact">
          <span className="footer__nav-title">Kontakt</span>
          <a href={`tel:${COMPANY.phone}`} className="footer__contact-item">
            {COMPANY.phone}
          </a>
          <a href={`mailto:${COMPANY.email}`} className="footer__contact-item">
            {COMPANY.email}
          </a>
          <p className="footer__contact-item footer__address">
            {COMPANY.address}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>
            © {year} {COMPANY.name}. Wszelkie prawa zastrzeżone.
          </span>
          <span className="footer__credit">Autor Strony: Jan Skwarek</span>
        </div>
      </div>
    </footer>
  );
}
