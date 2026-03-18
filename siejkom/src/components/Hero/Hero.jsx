// src/components/Hero/Hero.jsx
import { COMPANY } from '../../data/company';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero noise">
      <div className="hero__grid" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="hero__grid-line" style={{ '--i': i }} />
        ))}
      </div>

      <div className="container hero__inner">
        <p className="hero__eyebrow">
          <span className="hero__eyebrow-dot" />
          Od {COMPANY.founded} roku — Piekary Śląskie
        </p>

        <h1 className="hero__title">
          Beton Każdej<br />
          <span className="hero__title-accent">Klasy</span>
        </h1>

        <p className="hero__subtitle">
          Specjalizujemy się w produkcji i dostawie betonu bezpośrednio na plac budowy.
          Własna flota transportowa, nowoczesne technologie i pełna kontrola jakości.
        </p>

        <div className="hero__actions">
          <a href="/kontakt" className="btn btn--primary hero__btn">
            Zamów Beton
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
          <a href="/oferta" className="btn btn--outline hero__btn">
            Zobacz Ofertę
          </a>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-value">10<sup>+</sup></span>
            <span className="hero__stat-label">Lat doświadczenia</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">C8<sup>–C50</sup></span>
            <span className="hero__stat-label">Klasy betonu</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">32<sup>–52mb</sup></span>
            <span className="hero__stat-label">Zasięg pomp</span>
          </div>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-bar" />
      </div>
    </section>
  );
}
