// src/components/CtaBanner/CtaBanner.jsx
import { Link } from 'react-router-dom';
import { COMPANY } from '../../data/company';
import { useReveal } from '../../hooks/useReveal';
import './CtaBanner.css';

export default function CtaBanner() {
  const ref = useReveal(0.2);
  return (
    <section className="cta-banner">
      <div ref={ref} className="container cta-banner__inner reveal">
        <div className="cta-banner__text">
          <p className="cta-banner__eyebrow">Gotowy na swój projekt?</p>
          <h2 className="cta-banner__title">Zamów Beton<br />Bezpośrednio</h2>
        </div>
        <div className="cta-banner__actions">
          <Link to="/kontakt" className="btn btn--primary">
            Oszacuj cenę
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </Link>
          <a href={`tel:${COMPANY.phone}`} className="cta-banner__phone">
            {COMPANY.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
