// src/components/Features/Features.jsx
import { FEATURES } from "../../data/company";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useReveal } from "../../hooks/useReveal";
import "./Features.css";

function FeatureCard({ feature, index }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="feature-card reveal"
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <span className="feature-card__icon" aria-hidden="true">
        {feature.icon}
      </span>
      <h4 className="feature-card__title">{feature.title}</h4>
      <p className="feature-card__desc">{feature.desc}</p>
    </div>
  );
}

export default function Features() {
  return (
    <section className="section features">
      <div className="container">
        <SectionTitle
          eyebrow="Dlaczego my"
          title={
            <>
              Jakość
              <br />
              Bez Kompromisów
            </>
          }
          align="center"
          subtitle="Wyróżnia nas elastyczność, terminowość i konkurencyjne ceny. Zaufało nam już wielu klientów."
        />
        <div className="features__grid">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.id} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
