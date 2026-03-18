// src/components/Footer/Footer.jsx
import { Link } from "react-router-dom";
import { COMPANY, NAV_LINKS } from "../../data/company";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">{COMPANY.name}</span>
          <p className="footer__desc">
            Producent betonu z Piekar Śląskich. Działamy od {COMPANY.founded}{" "}
            roku. Własna flota transportowa, kontrola jakości, terminowe dostawy
            na Śląsku.
          </p>
          <div className="footer__social">
            <a
              href="https://www.facebook.com/Siejkom"
              className="footer__social-link"
              aria-label="Facebook"
            >
              fb
            </a>
          </div>
        </div>

        <nav className="footer__nav">
          <span className="footer__nav-title">Nawigacja</span>
          {NAV_LINKS.map(({ label, path }) => (
            <Link key={path} to={path} className="footer__nav-link">
              {label}
            </Link>
          ))}
        </nav>

        <div className="footer__contact">
          <span className="footer__nav-title">Kontakt</span>
          <a href={`tel:${COMPANY.phone}`} className="footer__contact-item">
            {COMPANY.phone}
          </a>
          <a href={`mailto:${COMPANY.email}`} className="footer__contact-item">
            {COMPANY.email}
          </a>
          <a href={`mailto:${COMPANY.email2}`} className="footer__contact-item">
            {COMPANY.email2}
          </a>
          {COMPANY.addresses.map((a, i) => (
            <p key={i} className="footer__contact-item footer__address">
              <small
                style={{
                  display: "block",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-accent)",
                  marginBottom: "2px",
                }}
              >
                {a.label}
              </small>
              {a.full}
            </p>
          ))}
        </div>
      </div>

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
