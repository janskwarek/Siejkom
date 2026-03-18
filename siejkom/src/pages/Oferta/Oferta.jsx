// src/pages/Oferta/Oferta.jsx
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import CtaBanner from "../../components/CtaBanner/CtaBanner";
import { useReveal } from "../../hooks/useReveal";
import { Helmet } from "react-helmet-async";
import "./Oferta.css";

const KATEGORIE = [
  {
    id: "towarowy",
    eyebrow: "Loco wytwórnia — S1",
    name: "Beton Towarowy",
    zakres: "C8/10 — C25/30",
    desc: "Beton konstrukcyjny do fundamentów, słupów, belek i stropów. Produkowany na wytwórni, odbór własny lub za pośrednictwem naszej floty.",
    pozycje: [
      {
        klasa: "C 8/10 S1",
        cena: "325 PLN/m³",
        zastosowanie: "Podkłady, chude betony",
      },
      {
        klasa: "C 12/15 S1",
        cena: "335 PLN/m³",
        zastosowanie: "Fundamenty, ławy",
      },
      {
        klasa: "C 16/20 S1",
        cena: "345 PLN/m³",
        zastosowanie: "Posadzki, podkłady",
      },
      {
        klasa: "C 20/25 S1",
        cena: "355 PLN/m³",
        zastosowanie: "Stropy, schody, belki",
      },
      {
        klasa: "C 25/30 S1",
        cena: "365 PLN/m³",
        zastosowanie: "Słupy, ściany, elementy obciążone",
      },
    ],
  },
  {
    id: "franco",
    eyebrow: "Franco budowa do 15 km — S3",
    name: "Beton z Dostawą",
    zakres: "C8/10 — C30/37",
    desc: "Beton dostarczany gruszką bezpośrednio na plac budowy. Cena franco — dostawa do 15 km wliczona w cenę.",
    pozycje: [
      {
        klasa: "C 8/10 S3",
        cena: "365 PLN/m³",
        zastosowanie: "Podkłady, chude betony",
      },
      {
        klasa: "C 12/15 S3",
        cena: "375 PLN/m³",
        zastosowanie: "Fundamenty, ławy",
      },
      {
        klasa: "C 16/20 S3",
        cena: "385 PLN/m³",
        zastosowanie: "Posadzki, stropy",
      },
      {
        klasa: "C 20/25 S3",
        cena: "395 PLN/m³",
        zastosowanie: "Konstrukcje żelbetowe",
      },
      {
        klasa: "C 25/30 S3",
        cena: "410 PLN/m³",
        zastosowanie: "Słupy, ściany oporowe",
      },
      {
        klasa: "C 30/37 S3",
        cena: "425 PLN/m³",
        zastosowanie: "Hale, obiekty przemysłowe",
      },
    ],
  },
  {
    id: "stabilizacje",
    eyebrow: "Podbudowy i SCP",
    name: "Stabilizacje",
    zakres: "SCP 1:2 — 5,0 MPa",
    desc: "Mieszanki cementowo-gruntowe do podbudów drogowych i przemysłowych. Różne proporcje i klasy wytrzymałości na zamówienie.",
    pozycje: [
      {
        klasa: "SCP 1:2",
        cena: "390 PLN/m³",
        zastosowanie: "Intensywnie obciążone podbudowy",
      },
      {
        klasa: "SCP 1:4",
        cena: "300 PLN/m³",
        zastosowanie: "Podbudowy drogowe",
      },
      {
        klasa: "SCP 1:6",
        cena: "290 PLN/m³",
        zastosowanie: "Podbudowy ogólne",
      },
      {
        klasa: "SCP 1:8",
        cena: "280 PLN/m³",
        zastosowanie: "Lekkie podbudowy",
      },
      {
        klasa: "SCP 0,5 – 1,5 MPa",
        cena: "220 PLN/m³",
        zastosowanie: "Stabilizacja gruntu",
      },
      {
        klasa: "SCP 1,5 – 2,5 MPa",
        cena: "225 PLN/m³",
        zastosowanie: "Podbudowy średnio obciążone",
      },
      {
        klasa: "SCP 2,5 – 5,0 MPa",
        cena: "235 PLN/m³",
        zastosowanie: "Drogi, place przemysłowe",
      },
    ],
  },
  {
    id: "specjalne",
    eyebrow: "Na zamówienie",
    name: "Betony Specjalne",
    zakres: "Dostosowane do potrzeb",
    desc: "Betony z dodatkami dopasowanymi do warunków pogodowych i wymagań inwestycji. Skontaktuj się — dobierzemy mieszankę.",
    pozycje: [
      {
        klasa: "Wodoszczelny W2–W12",
        cena: "wycena",
        zastosowanie: "Piwnice, baseny, fundamenty",
      },
      {
        klasa: "Mrozoodporny F25–F300",
        cena: "wycena",
        zastosowanie: "Nawierzchnie, parkingi",
      },
      {
        klasa: "Z włóknami stalowymi",
        cena: "wycena",
        zastosowanie: "Posadzki przemysłowe",
      },
      {
        klasa: "Z włóknami polipropylen.",
        cena: "wycena",
        zastosowanie: "Zbrojenie rozproszone",
      },
      {
        klasa: "Grzany +5°C / –10°C",
        cena: "+25 PLN/m³",
        zastosowanie: "Betonowanie w zimie",
      },
      {
        klasa: "Dodatek p/mrozowy",
        cena: "+25 PLN/m³",
        zastosowanie: "Ochrona w niskich temp.",
      },
    ],
  },
];

function RowItem({ p, i }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="oferta-tabela__row reveal"
      style={{ transitionDelay: `${i * 0.05}s` }}
    >
      <span className="oferta-tabela__klasa">{p.klasa}</span>
      <span className="oferta-tabela__zastosowanie">{p.zastosowanie}</span>
      <span className="oferta-tabela__cena">{p.cena}</span>
      <a href="/kontakt" className="oferta-tabela__cta">
        Zamów →
      </a>
    </div>
  );
}

function KategoriaSection({ kat }) {
  const titleRef = useReveal();
  return (
    <div className="oferta-kategoria">
      <div ref={titleRef} className="oferta-kategoria__header reveal">
        <span className="oferta-kategoria__eyebrow">{kat.eyebrow}</span>
        <h2 className="oferta-kategoria__name">{kat.name}</h2>
        <span className="oferta-kategoria__zakres">{kat.zakres}</span>
        <p className="oferta-kategoria__desc">{kat.desc}</p>
      </div>
      <div className="oferta-tabela">
        <div className="oferta-tabela__head">
          <span>Klasa / Typ</span>
          <span>Zastosowanie</span>
          <span>Cena netto</span>
          <span></span>
        </div>
        {kat.pozycje.map((p, i) => (
          <RowItem key={i} p={p} i={i} />
        ))}
      </div>
    </div>
  );
}

export default function Oferta() {
  return (
    <>
      <Helmet>
        <title>Oferta — Siejkom Piekary Śląskie Siemianowice Śląskie</title>
        <meta
          name="description"
          content="Beton towarowy C8/10–C50/60, beton posadzkowy, beton nawierzchniowy, stabilizacje SCP. Zamów online z wyceną. Piekary Śląskie, Siemianowice Śląskie."
        />
      </Helmet>

      <div className="page-hero">
        <div className="container">
          <p className="page-hero__eyebrow">Oferta</p>
          <h1 className="page-hero__title">Nasze Produkty</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Cennik"
            title={
              <>
                Beton na
                <br />
                Każdą Potrzebę
              </>
            }
            subtitle="Kompleksowa produkcja i dostawa betonu bezpośrednio na plac budowy. Ceny netto, bez VAT. Oferta ważna od 11.08.2025 r."
          />

          <div className="oferta-sekcje">
            {KATEGORIE.map((kat) => (
              <KategoriaSection key={kat.id} kat={kat} />
            ))}
          </div>

          <div className="oferta-nota">
            <p>
              * Ceny netto, bez VAT. Ceny franco budowa (dostawa do 15 km)
              zawarte w cenniku S3. Powyżej 15 km — cena transportu ustalana
              indywidualnie. Ceny obowiązują od 11.08.2025 r.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
