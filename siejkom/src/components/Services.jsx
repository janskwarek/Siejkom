// src/components/Services/Services.jsx
import { Link } from "react-router-dom";
import { SERVICES } from "../../data/company";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useReveal } from "../../hooks/useReveal";
import "./Services.css";

function ServiceCard({ service, index }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="service-card reveal"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <span className="service-card__number">0{index + 1}</span>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.desc}</p>
      <Link to={service.link} className="service-card__link">
        Dowiedz się więcej
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </Link>
    </div>
  );
}

export default function Services() {
  return (
    <section className="section services">
      <div className="container">
        <SectionTitle
          eyebrow="Co robimy"
          title={
            <>
              Nasze
              <br />
              <span style={{ color: "var(--color-accent)" }}>Usługi</span>
            </>
          }
          subtitle="Kompleksowe rozwiązania w branży budowlanej — od produkcji betonu po gotowy dom."
        />
        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
