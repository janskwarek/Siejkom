// src/pages/Transport/Transport.jsx
import CtaBanner from "../../components/CtaBanner/CtaBanner";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useReveal } from "../../hooks/useReveal";
import { Helmet } from "react-helmet-async";
import "../Oferta/Oferta.css";
import "./Transport.css";

const FLEET = [
  {
    type: "Gruszka 9m³",
    desc: "Betonowóz do większości zamówień budowlanych. Dostawa betonu bezpośrednio na plac budowy.",
  },
  {
    type: "Pompogruszka 24m³",
    desc: "Betonowóz z wbudowaną pompą — łączy transport i pompowanie w jednym pojeździe.",
  },
  {
    type: "Pompogruszka 32m³",
    desc: "Większa pompogruszka do bardziej wymagających inwestycji z utrudnionym dostępem.",
  },
];

const POMPY = [
  {
    label: "Pompa 32 mb",
    desc: "Do trudno dostępnych miejsc i niższych kondygnacji.",
  },
  {
    label: "Pompa 40 mb",
    desc: "Standardowa pompa do większości inwestycji budowlanych.",
  },
  {
    label: "Pompa 50 mb",
    desc: "Do wyższych kondygnacji i odległych miejsc betonowania.",
  },
  {
    label: "Pompa 52 mb",
    desc: "Maksymalny zasięg — wysokie budynki i duże odległości.",
  },
];

const ADVANTAGES = [
  { label: "Gruszka 9m³", desc: "Dostawa betonu na każdą inwestycję." },
  { label: "Pompogruszki", desc: "Transport i pompowanie w jednym." },
  { label: "Pompy 32–52 mb", desc: "Zasięg do kilkudziesięciu metrów." },
  { label: "Cały Śląsk", desc: "Terminowe dostawy na terenie Śląska." },
];

function FleetCard({ item, i }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="fleet-card reveal"
      style={{ transitionDelay: `${i * 0.1}s` }}
    >
      <div className="fleet-card__icon">
        <svg viewBox="0 0 24 24">
          <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      </div>
      <h3 className="fleet-card__type">{item.type}</h3>
      <p className="fleet-card__desc">{item.desc}</p>
    </div>
  );
}

function PompaCard({ p, i }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="pompa-card reveal"
      style={{ transitionDelay: `${i * 0.08}s` }}
    >
      <div className="pompa-card__icon">
        <svg viewBox="0 0 24 24">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </div>
      <span className="pompa-card__label">{p.label}</span>
      <p className="pompa-card__desc">{p.desc}</p>
    </div>
  );
}

export default function Transport() {
  const adRef = useReveal();

  return (
    <>
      <Helmet>
        <title>Transport betonu — Siejkom Piekary Śląskie</title>
        <meta
          name="description"
          content="Dostawa betonu gruszką 9m³, pompogruszki 24 i 32m³, pompy 32–52 mb. Terminowe dostawy betonu na terenie Śląska i okolic."
        />
      </Helmet>

      <div className="page-hero">
        <div className="container">
          <p className="page-hero__eyebrow">Transport</p>
          <h1 className="page-hero__title">Dostawa Betonu</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* ── Flota ── */}
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

          {/* ── Pompy ── */}
          <div className="pompy__sekcja">
            <SectionTitle
              eyebrow="Pompy"
              title={
                <>
                  Pompowanie
                  <br />
                  Betonu
                </>
              }
              subtitle="Dysponujemy pompami o zasięgu ramion 32–52 mb. Beton sprawnie rozprowadzamy w pionie i poziomie — nawet na odległość kilkudziesięciu metrów."
            />
            <div className="pompy__grid">
              {POMPY.map((p, i) => (
                <PompaCard key={i} p={p} i={i} />
              ))}
            </div>
          </div>

          {/* ── Podsumowanie floty ── */}
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
