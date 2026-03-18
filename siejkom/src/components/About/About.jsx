// src/components/About/About.jsx
import SectionTitle from '../SectionTitle/SectionTitle';
import { useReveal } from '../../hooks/useReveal';
import { COMPANY, STATS } from '../../data/company';
import img from '../../assets/20230915_170846-2048x1153.jpg';
import './About.css';

export default function About() {
  const imgRef   = useReveal(0.1);
  const statsRef = useReveal(0.1);

  return (
    <section className="section about">
      <div className="container about__inner">

        <div ref={imgRef} className="about__image-wrap reveal">
          <div className="about__image-placeholder">
            <img
              src={img}
              alt="Betonowanie fundamentu — Siejkom Invest"
              className="about__image"
            />
          </div>
          <div className="about__badge">
            <span className="about__badge-year">{COMPANY.founded}</span>
            <span className="about__badge-label">Rok założenia</span>
          </div>
        </div>

        <div className="about__content">
          <SectionTitle
            eyebrow="O nas"
            title={<>Produkcja<br />Betonu</>}
            subtitle={`Swoją działalność rozpoczęliśmy w ${COMPANY.founded} roku. Jesteśmy firmą z Piekar Śląskich, specjalizującą się w produkcji i dostarczaniu betonu. Dbamy o najwyższą jakość naszych produktów, korzystając z wysokiej klasy surowców i nowoczesnych technologii.`}
          />

          <p style={{ marginTop: '1.25rem', color: 'var(--color-muted)', lineHeight: '1.8', fontSize: '1rem' }}>
            Nasze produkty spełniają wszelkie normy i wymagania, a także są regularnie kontrolowane
            pod względem jakości. Wyróżnia nas elastyczność i terminowość w realizacji zamówień oraz
            konkurencyjne ceny. Zaufało nam już wielu Klientów, którzy doceniają nasze doświadczenie
            i profesjonalizm.
          </p>

          <div ref={statsRef} className="about__stats reveal">
            {STATS.map((s, i) => (
              <div key={i} className="about__stat">
                <span className="about__stat-value">{s.value}</span>
                <span className="about__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
