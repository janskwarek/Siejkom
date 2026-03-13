// src/components/About/About.jsx
import SectionTitle from "../SectionTitle/SectionTitle";
import { useReveal } from "../../hooks/useReveal";
import { COMPANY, STATS } from "../../data/company";
import "./About.css";

export default function About() {
  const imgRef = useReveal(0.1);
  const statsRef = useReveal(0.1);

  return (
    <section className="section about">
      <div className="container about__inner">
        {/* Image column */}
        <div ref={imgRef} className="about__image-wrap reveal">
          <div className="about__image-placeholder">
            {/* Zamień src na prawdziwe zdjęcie betonu / budowy */}
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
              alt="Produkcja betonu Siejkom"
              className="about__image"
            />
          </div>
          <div className="about__badge">
            <span className="about__badge-year">{COMPANY.founded}</span>
            <span className="about__badge-label">Rok założenia</span>
          </div>
        </div>

        {/* Text column */}
        <div className="about__content">
          <SectionTitle
            eyebrow="O nas"
            title={
              <>
                Produkcja
                <br />
                Betonu
              </>
            }
            subtitle={`Swoją działalność rozpoczęliśmy w ${COMPANY.founded} roku. Jesteśmy firmą z ${COMPANY.address}, specjalizującą się w produkcji i dostarczaniu betonu. Dbamy o najwyższą jakość naszych produktów, korzystając z wysokiej klasy surowców i nowoczesnych technologii.`}
          />

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
