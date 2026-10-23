// src/pages/Oferta/Oferta.jsx
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import CtaBanner from "../../components/CtaBanner/CtaBanner";
import { useReveal } from "../../hooks/useReveal";
import { Helmet } from "react-helmet-async";
import {
  PRODUKTY_S1,
  PRODUKTY_S3,
  USLUGI_GRZANIE,
} from "../Kontakt/cennik";
import "./Oferta.css";

const PRICE_BY_ID = Object.fromEntries(
  [
    ...Object.values(PRODUKTY_S1).flat(),
    ...Object.values(PRODUKTY_S3).flat(),
    ...USLUGI_GRZANIE,
  ]
    .filter(Boolean)
    .map((product) => [
      product.id,
      product.price ?? product.price_m3,
    ]),
);

const KATEGORIE = [
  {
    id: "towarowy",
    eyebrow: "Loco wytwórnia — S1",
    name: "Beton Towarowy",
    zakres: "C8/10 — C25/30",
    desc: "Beton konstrukcyjny do fundamentów, słupów, belek i stropów. Produkowany na wytwórni, odbór własny lub za pośrednictwem naszej floty.",
    pozycje: [
      {
        cenaId: "c8s1",
        klasa: "C 8/10 S1",
        zastosowanie: "Podkłady, chude betony",
      },
      {
        cenaId: "c12s1",
        klasa: "C 12/15 S1",
        zastosowanie: "Fundamenty, ławy",
      },
      {
        cenaId: "c16s1",
        klasa: "C 16/20 S1",
        zastosowanie: "Posadzki, podkłady",
      },
      {
        cenaId: "c20s1",
        klasa: "C 20/25 S1",
        zastosowanie: "Stropy, schody, belki",
      },
      {
        cenaId: "c25s1",
        klasa: "C 25/30 S1",
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
        cenaId: "c8s3",
        klasa: "C 8/10 S3",
        zastosowanie: "Podkłady, chude betony",
      },
      {
        cenaId: "c12s3",
        klasa: "C 12/15 S3",
        zastosowanie: "Fundamenty, ławy",
      },
      {
        cenaId: "c16s3",
        klasa: "C 16/20 S3",
        zastosowanie: "Posadzki, stropy",
      },
      {
        cenaId: "c20s3",
        klasa: "C 20/25 S3",
        zastosowanie: "Konstrukcje żelbetowe",
      },
      {
        cenaId: "c25s3",
        klasa: "C 25/30 S3",
        zastosowanie: "Słupy, ściany oporowe",
      },
      {
        cenaId: "c30s3",
        klasa: "C 30/37 S3",
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
        cenaId: "scp12",
        klasa: "SCP 1:2",
        zastosowanie: "Intensywnie obciążone podbudowy",
      },
      {
        cenaId: "scp14",
        klasa: "SCP 1:4",
        zastosowanie: "Podbudowy drogowe",
      },
      {
        cenaId: "scp16",
        klasa: "SCP 1:6",
        zastosowanie: "Podbudowy ogólne",
      },
      {
        cenaId: "scp18",
        klasa: "SCP 1:8",
        zastosowanie: "Lekkie podbudowy",
      },
      {
        cenaId: "scp05",
        klasa: "SCP 0,5 – 1,5 MPa",
        zastosowanie: "Stabilizacja gruntu",
      },
      {
        cenaId: "scp15",
        klasa: "SCP 1,5 – 2,5 MPa",
        zastosowanie: "Podbudowy średnio obciążone",
      },
      {
        cenaId: "scp25",
        klasa: "SCP 2,5 – 5,0 MPa",
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
        cenaId: null,
        zastosowanie: "Piwnice, baseny, fundamenty",
      },
      {
        klasa: "Mrozoodporny F25–F300",
        cenaId: null,
        zastosowanie: "Nawierzchnie, parkingi",
      },
      {
        klasa: "Z włóknami stalowymi",
        cenaId: null,
        zastosowanie: "Posadzki przemysłowe",
      },
      {
        klasa: "Z włóknami polipropylen.",
        cenaId: null,
        zastosowanie: "Zbrojenie rozproszone",
      },
      {
        cenaId: "grzanie_temp",
        klasa: "Grzany +5°C / –10°C",
        zastosowanie: "Betonowanie w zimie",
      },
      {
        cenaId: "grzanie_mrozowy",
        klasa: "Dodatek p/mrozowy",
        zastosowanie: "Ochrona w niskich temp.",
      },
    ],
  },
];

function RowItem({ p, i }) {
  const ref = useReveal();
  const price = p.cenaId ? PRICE_BY_ID[p.cenaId] : null;
  return (
    <div
      ref={ref}
      className="oferta-tabela__row reveal"
      style={{ transitionDelay: `${i * 0.05}s` }}
    >
      <span className="oferta-tabela__klasa">{p.klasa}</span>
      <span className="oferta-tabela__zastosowanie">{p.zastosowanie}</span>
      <span className="oferta-tabela__cena">
        {price == null
          ? "wycena"
          : `${p.cenaId.startsWith("grzanie_") ? "+" : ""}${price} PLN/m³`}
      </span>
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
        <link rel="canonical" href="https://siejkom.pl/oferta" />
        <meta property="og:title" content="Oferta — Siejkom Piekary Śląskie Siemianowice Śląskie" />
        <meta property="og:description" content="Beton towarowy C8/10–C50/60, beton posadzkowy, beton nawierzchniowy, stabilizacje SCP. Zamów online z wyceną. Piekary Śląskie, Siemianowice Śląskie." />
        <meta property="og:url" content="https://siejkom.pl/oferta" />
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
