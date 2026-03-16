// src/pages/Transport/Transport.jsx
import CtaBanner from "../../components/CtaBanner/CtaBanner";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useReveal } from "../../hooks/useReveal";
import "../Oferta/Oferta.css";
import "./Transport.css";

const FLEET = [
  {
    type: "Gruszka 6m³",
    desc: "Idealna do mniejszych zleceń i trudno dostępnych placów budowy.",
  },
  {
    type: "Gruszka 9m³",
    desc: "Standardowa pojazd do większości zamówień budowlanych.",
  },
  {
    type: "Gruszka 12m³",
    desc: "Dla dużych inwestycji — maksymalna wydajność dostawy.",
  },
];

const ADVANTAGES = [
  { label: "GPS Tracking", desc: "Śledzenie dostawy w czasie rzeczywistym." },
  {
    label: "Terminowość 98%",
    desc: "Dotrzymujemy umówionych terminów dostaw.",
  },
  { label: "Cały Śląsk", desc: "Obsługujemy cały region śląski i okolice." },
  {
    label: "Dostawa 24/7",
    desc: "Możliwość dostaw w trybie pilnym przez całą dobę.",
  },
];

function FleetCard({ item, i }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="fleet-card reveal"
      style={{ transitionDelay: `${i * 0.1}s` }}
    >
      <span className="fleet-card__icon">🚛</span>
      <h3 className="fleet-card__type">{item.type}</h3>
      <p className="fleet-card__desc">{item.desc}</p>
    </div>
  );
}

export default function Transport() {
  const adRef = useReveal();
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className="page-hero__eyebrow">Transport</p>
          <h1 className="page-hero__title">Dostawa Betonu</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Flota"
            title={
              <>
                Nasza
                <br />
                Flota
              </>
            }
            subtitle="Dysponujemy flotą nowoczesnych betoniarek zapewniających terminową i bezpieczną dostawę betonu na każdą budowę."
          />
          <div className="fleet__grid">
            {FLEET.map((item, i) => (
              <FleetCard key={i} item={item} i={i} />
            ))}
          </div>

          {/* Advantages */}
          <div ref={adRef} className="transport__advantages reveal">
            {ADVANTAGES.map((a, i) => (
              <div key={i} className="transport__adv">
                <span className="transport__adv-label">{a.label}</span>
                <p className="transport__adv-desc">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
