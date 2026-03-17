// src/components/Hero/Hero.jsx
import { COMPANY } from "../../data/company";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero noise">
      {/* Animated background lines */}
      <div className="hero__grid" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="hero__grid-line" style={{ "--i": i }} />
        ))}
      </div>

      <div className="container hero__inner">
        {/* Tag line */}
        <p className="hero__eyebrow">
          <span className="hero__eyebrow-dot" />
          Od {COMPANY.founded} roku — Piekary Śląskie
        </p>

        {/* Main heading */}
        <h1 className="hero__title">
          Twój Dom,
          <br />
          <span className="hero__title-accent">Nasza</span> Pasja
        </h1>

        <p className="hero__subtitle">
          Producent betonu i deweloper z pasją. Realizujemy inwestycje, które
          łączą nowoczesny design z najwyższą jakością wykonania.
        </p>

        <div className="hero__actions">
          <a href="/kontakt" className="btn btn--primary hero__btn">
            Zamów Beton
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </a>
          <a href="/oferta" className="btn btn--outline hero__btn">
            Zobacz Ofertę
          </a>
        </div>

        {/* Stats strip */}
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-value">
              9<sup>+</sup>
            </span>
            <span className="hero__stat-label">Lat doświadczenia</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">
              500<sup>+</sup>
            </span>
            <span className="hero__stat-label">Projektów</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-bar" />
      </div>
    </section>
  );
}
