// src/pages/Kontakt/Kontakt.jsx
import { useState } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { COMPANY } from "../../data/company";
import "../Oferta/Oferta.css";
import "./Kontakt.css";

// ─── CENNIK ──────────────────────────────────────────────────

const KATEGORIE = [
  {
    id: "towarowy",
    label: "Beton towarowy",
    icon: "◈",
    opis: "Fundamenty, słupy, belki",
  },
  {
    id: "posadzkowy",
    label: "Beton posadzkowy",
    icon: "◉",
    opis: "Posadzki przemysłowe",
  },
  {
    id: "nawierzchniowy",
    label: "Beton nawierzchniowy",
    icon: "◎",
    opis: "Drogi, place, parkingi",
  },
  {
    id: "stabilizacje",
    label: "Stabilizacje / Podsypki",
    icon: "◇",
    opis: "SCP, podbudowy",
  },
];

// S1 = loco wytwórnia, S3 = franco budowa do 15km
const PRODUKTY_S1 = {
  towarowy: [
    { id: "c8s1", label: "C 8/10 S1", price: 325 },
    { id: "c12s1", label: "C 12/15 S1", price: 335 },
    { id: "c16s1", label: "C 16/20 S1", price: 345 },
    { id: "c20s1", label: "C 20/25 S1", price: 355 },
    { id: "c25s1", label: "C 25/30 S1", price: 365 },
  ],
  posadzkowy: [
    { id: "c16s1p", label: "C 16/20 S1", price: 345 },
    { id: "c20s1p", label: "C 20/25 S1", price: 355 },
    { id: "c25s1p", label: "C 25/30 S1", price: 365 },
  ],
  nawierzchniowy: [
    { id: "c16s1n", label: "C 16/20 S1", price: 345 },
    { id: "c20s1n", label: "C 20/25 S1", price: 355 },
    { id: "c25s1n", label: "C 25/30 S1", price: 365 },
    { id: "c30s1n", label: "C 30/37 S1", price: 375 },
  ],
  stabilizacje: [
    { id: "scp12", label: "SCP 1:2", price: 390 },
    { id: "scp14", label: "SCP 1:4", price: 300 },
    { id: "scp16", label: "SCP 1:6", price: 290 },
    { id: "scp18", label: "SCP 1:8", price: 280 },
    { id: "scp05", label: "SCP 0,5 – 1,5 MPa", price: 220 },
    { id: "scp15", label: "SCP 1,5 – 2,5 MPa", price: 225 },
    { id: "scp25", label: "SCP 2,5 – 5,0 MPa", price: 235 },
  ],
};

const PRODUKTY_S3 = {
  towarowy: [
    { id: "c8s3", label: "C 8/10 S3", price: 365 },
    { id: "c12s3", label: "C 12/15 S3", price: 375 },
    { id: "c16s3", label: "C 16/20 S3", price: 385 },
    { id: "c20s3", label: "C 20/25 S3", price: 395 },
    { id: "c25s3", label: "C 25/30 S3", price: 410 },
    { id: "c30s3", label: "C 30/37 S3", price: 425 },
  ],
  posadzkowy: [
    { id: "c16s3p", label: "C 16/20 S3", price: 385 },
    { id: "c20s3p", label: "C 20/25 S3", price: 395 },
    { id: "c25s3p", label: "C 25/30 S3", price: 410 },
    { id: "c30s3p", label: "C 30/37 S3", price: 425 },
  ],
  nawierzchniowy: [
    { id: "c8s3n", label: "C 8/10 S3", price: 365 },
    { id: "c12s3n", label: "C 12/15 S3", price: 375 },
    { id: "c16s3n", label: "C 16/20 S3", price: 385 },
    { id: "c20s3n", label: "C 20/25 S3", price: 395 },
    { id: "c25s3n", label: "C 25/30 S3", price: 410 },
    { id: "c30s3n", label: "C 30/37 S3", price: 425 },
  ],
  stabilizacje: null, // stabilizacje nie mają S3
};

// Transport dostępny per kategoria
const TRANSPORT_MAP = {
  towarowy: ["własny", "gruszka", "wywrotka"],
  posadzkowy: ["gruszka"],
  nawierzchniowy: ["gruszka"],
  stabilizacje: ["własny", "wywrotka"],
};

const TRANSPORT_OPCJE = [
  {
    id: "własny",
    label: "Własny odbiór",
    opis: "Odbiór z wytwórni — cena loco",
    icon: "🏗",
  },
  {
    id: "gruszka",
    label: "Gruszka",
    opis: "Dostawa betonomieszarką — franco",
    icon: "🚛",
  },
  {
    id: "wywrotka",
    label: "Wywrotka",
    opis: "Dostawa wywrotką — franco",
    icon: "🚚",
  },
];

// Pompy — dwa cenniki
const POMPY = [
  { id: "brak", label: "Bez pompy", rate_m3: 0, rate_h: 0, dojazd: 0 },
  { id: "p32", label: "Pompa 32 mb", rate_m3: 20, rate_h: 350, dojazd: 300 },
  { id: "p40", label: "Pompa 40 mb", rate_m3: 25, rate_h: 380, dojazd: 350 },
  { id: "p50", label: "Pompa 50 mb", rate_m3: 29, rate_h: 450, dojazd: 450 },
  { id: "p52", label: "Pompa 52 mb", rate_m3: 29, rate_h: 450, dojazd: 450 },
];

// Dodatkowe usługi (grzanie)
const USLUGI_GRZANIE = [
  {
    id: "grzanie_temp",
    label: "+5°C do −10°C",
    opis: "Grzanie betonu w warunkach zimowych (temp. mierzona o 7:00 na wytwórni)",
    price_m3: 25,
    unit: "PLN/m³",
  },
  {
    id: "grzanie_mrozowy",
    label: "Dodatek p/mrozowy",
    opis: "Dodatek przeciwmrozowy — na życzenie klienta",
    price_m3: 25,
    unit: "PLN/m³",
  },
];

// Opcje dodatkowe pompy
const OPCJE_POMPY = [
  {
    id: "weze_gumowe",
    label: "Dodatkowe węże gumowe",
    opis: "35 PLN za każdy metr bieżący",
    typ: "mb", // wymaga podania liczby mb
    price_unit: 35,
    unit: "PLN/mb",
  },
  {
    id: "rurociag",
    label: "Dostawa rurociągu (powyżej 15 mb)",
    opis: "Jednorazowa opłata 800 PLN",
    typ: "checkbox",
    price_fixed: 800,
    unit: "PLN",
  },
];

// ─── HELPER: dostępne produkty ────────────────────────────────
function getProdukty(kategoria, transport) {
  if (!kategoria || !transport) return [];
  if (kategoria === "stabilizacje") return PRODUKTY_S1.stabilizacje;
  if (transport === "gruszka") return PRODUKTY_S3[kategoria] || [];
  return PRODUKTY_S1[kategoria] || [];
}

// ─── HELPER: dynamiczne kroki ────────────────────────────────
function getKroki(z) {
  const base = [
    "Dane",
    "Kategoria",
    "Transport",
    "Klasa",
    "Ilość",
    "Usługi dodatkowe",
  ];
  if (z.transport !== "gruszka") return [...base, "Podsumowanie"];
  if (z.pompa && z.pompa !== "brak")
    return [...base, "Pompa", "Opcje pompy", "Podsumowanie"];
  return [...base, "Pompa", "Podsumowanie"];
}

// ─── OBLICZENIE CENY ─────────────────────────────────────────
function obliczCene(z) {
  const {
    kategoria,
    produkt,
    ilosc,
    transport,
    pompa,
    uslugi,
    opcjePompy,
    godzinyPompy,
  } = z;
  if (!produkt || !ilosc || !transport) return null;

  const ilosc_num = parseFloat(ilosc) || 0;
  const produkty = getProdukty(kategoria, transport);
  const prod = produkty.find((p) => p.id === produkt);
  const pump = POMPY.find((p) => p.id === pompa);
  if (!prod) return null;

  // Beton
  const cenaBeton = prod.price * ilosc_num;

  // Dopłata gruszka <6m³
  const dopłataGruszka = transport === "gruszka" && ilosc_num < 6 ? 400 : 0;

  // Grzanie
  const cenaGrzanie = (uslugi || []).reduce((sum, uid) => {
    const u = USLUGI_GRZANIE.find((x) => x.id === uid);
    return sum + (u ? u.price_m3 * ilosc_num : 0);
  }, 0);

  // Pompa
  let cenaPompa = 0;
  let cenaPompaBase = 0;
  if (pump && pump.id !== "brak") {
    const perM3 = ilosc_num > 15;
    if (perM3) {
      cenaPompaBase = pump.rate_m3 * ilosc_num + pump.dojazd;
    } else {
      const godz = parseFloat(godzinyPompy) || 1;
      cenaPompaBase = pump.rate_h * godz + pump.dojazd;
    }
    cenaPompa = cenaPompaBase;
  }

  // Opcje dodatkowe pompy
  let cenaOpcjePompy = 0;
  const opcjeBreakdown = [];
  if (opcjePompy) {
    if (
      opcjePompy.weze_gumowe_mb &&
      parseFloat(opcjePompy.weze_gumowe_mb) > 0
    ) {
      const kwota = parseFloat(opcjePompy.weze_gumowe_mb) * 35;
      cenaOpcjePompy += kwota;
      opcjeBreakdown.push({
        label: `Węże gumowe (${opcjePompy.weze_gumowe_mb} mb)`,
        kwota,
      });
    }
    if (opcjePompy.rurociag) {
      cenaOpcjePompy += 800;
      opcjeBreakdown.push({ label: "Dostawa rurociągu >15mb", kwota: 800 });
    }
  }

  return {
    cenaBeton: Math.round(cenaBeton),
    dopłataGruszka,
    cenaGrzanie: Math.round(cenaGrzanie),
    cenaPompa: Math.round(cenaPompa),
    cenaOpcjePompy: Math.round(cenaOpcjePompy),
    opcjeBreakdown,
    razem: Math.round(
      cenaBeton + dopłataGruszka + cenaGrzanie + cenaPompa + cenaOpcjePompy,
    ),
    prod,
    pump,
    transport: TRANSPORT_OPCJE.find((t) => t.id === transport),
    perM3Pump: pump && pump.id !== "brak" && parseFloat(ilosc) > 15,
  };
}

// ─── WYSYŁKA ────────────────────────────────────────────────
async function wyslijEmail(z, cena) {
  const SERVICE_ID = "TWOJ_SERVICE_ID";
  const TEMPLATE_ID = "TWOJ_TEMPLATE_ID";
  const PUBLIC_KEY = "TWOJ_PUBLIC_KEY";
  const emailjs = window.emailjs;
  if (!emailjs) throw new Error("no emailjs");

  const kat = KATEGORIE.find((k) => k.id === z.kategoria)?.label;
  const uslugi =
    (z.uslugi || [])
      .map((u) => USLUGI_GRZANIE.find((x) => x.id === u)?.label)
      .join(", ") || "—";

  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      to_email: "maksymilian@siejkom.pl",
      imie: z.name,
      telefon: z.phone,
      email: z.email,
      kategoria: kat,
      klasa: cena.prod?.label,
      ilosc: `${z.ilosc} m³`,
      transport: cena.transport?.label,
      uslugi,
      pompa: cena.pump?.label || "—",
      opcje_pompy: cena.opcjeBreakdown.map((o) => o.label).join(", ") || "—",
      cena_beton: `${cena.cenaBeton} PLN`,
      cena_grzanie: cena.cenaGrzanie ? `${cena.cenaGrzanie} PLN` : "—",
      cena_pompa: cena.cenaPompa ? `${cena.cenaPompa} PLN` : "—",
      cena_opcje: cena.cenaOpcjePompy ? `${cena.cenaOpcjePompy} PLN` : "—",
      cena_razem: `${cena.razem} PLN`,
      wiadomosc: z.wiadomosc || "—",
    },
    PUBLIC_KEY,
  );
}

// ─── KOMPONENT ───────────────────────────────────────────────
export default function Kontakt() {
  const [krok, setKrok] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const [z, setZ] = useState({
    name: "",
    phone: "",
    email: "",
    kategoria: "",
    produkt: "",
    ilosc: "",
    transport: "",
    pompa: "brak",
    uslugi: [], // tablica id grzania
    opcjePompy: { weze_gumowe_mb: "", rurociag: false },
    godzinyPompy: "1",
    wiadomosc: "",
  });

  const set = (field, val) => setZ((prev) => ({ ...prev, [field]: val }));

  const cena = obliczCene(z);
  const kroki = getKroki(z);
  const maxStep = kroki.length - 1;

  const ilosc_num = parseFloat(z.ilosc) || 0;
  const pompaPerM3 = ilosc_num > 15; // czy cennik m³ dla pompy
  const gruszkaWarn =
    z.transport === "gruszka" && ilosc_num < 6 && ilosc_num > 0;

  // dostępne opcje transportu dla danej kategorii
  const transportDostepny = TRANSPORT_MAP[z.kategoria] || [];

  // czy krok "Dalej" jest zablokowany
  const disabled = () => {
    const stepName = kroki[krok];
    if (stepName === "Dane") return !z.name || !z.phone || !z.email;
    if (stepName === "Kategoria") return !z.kategoria;
    if (stepName === "Transport") return !z.transport;
    if (stepName === "Klasa") return !z.produkt;
    if (stepName === "Ilość") return !z.ilosc || ilosc_num <= 0;
    if (stepName === "Pompa") return false; // można przejść bez pompy
    if (stepName === "Opcje pompy") return false;
    return false;
  };

  const handleToggleUsluga = (id) => {
    setZ((prev) => ({
      ...prev,
      uslugi: prev.uslugi.includes(id)
        ? prev.uslugi.filter((x) => x !== id)
        : [...prev.uslugi, id],
    }));
  };

  const handleWysylka = async () => {
    setSending(true);
    setError("");
    try {
      await wyslijEmail(z, cena);
      setSent(true);
    } catch {
      const kat = KATEGORIE.find((k) => k.id === z.kategoria)?.label;
      const body = `Imię: ${z.name}%0ATelefon: ${z.phone}%0AEmail: ${z.email}%0AKategoria: ${kat}%0AKlasa: ${cena?.prod?.label}%0AIlość: ${z.ilosc} m³%0ATransport: ${cena?.transport?.label}%0APompa: ${cena?.pump?.label}%0ASzacowana cena: ${cena?.razem} PLN%0AUwagi: ${z.wiadomosc}`;
      window.location.href = `mailto:maksymilian@siejkom.pl?subject=Zamówienie betonu - ${z.name}&body=${body}`;
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  // ── Success screen ──
  if (sent)
    return (
      <>
        <div className="page-hero">
          <div className="container">
            <p className="page-hero__eyebrow">Kontakt</p>
            <h1 className="page-hero__title">
              Zamów
              <br />
              Beton
            </h1>
          </div>
        </div>
        <section className="section">
          <div className="container">
            <div className="zamowienie-success">
              <span className="zamowienie-success__icon">✓</span>
              <h2>Zamówienie wysłane!</h2>
              <p>Odezwiemy się najszybciej jak to możliwe.</p>
              <button
                className="btn btn--outline"
                onClick={() => {
                  setSent(false);
                  setKrok(0);
                  setZ({
                    name: "",
                    phone: "",
                    email: "",
                    kategoria: "",
                    produkt: "",
                    ilosc: "",
                    transport: "",
                    pompa: "brak",
                    uslugi: [],
                    opcjePompy: { weze_gumowe_mb: "", rurociag: false },
                    godzinyPompy: "1",
                    wiadomosc: "",
                  });
                }}
              >
                Złóż kolejne zamówienie
              </button>
            </div>
          </div>
        </section>
      </>
    );

  const stepName = kroki[krok];

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className="page-hero__eyebrow">Kontakt</p>
          <h1 className="page-hero__title">
            Oszacuj cenę
            <br />
            Betonu
          </h1>
        </div>
      </div>

      <section className="section zamowienie">
        <div className="container zamowienie__wrap">
          {/* ── Pasek postępu ── */}
          <div className="progress-bar">
            {kroki.map((label, i) => (
              <div
                key={i}
                className={`progress-bar__step ${i === krok ? "active" : ""} ${i < krok ? "done" : ""}`}
              >
                <div className="progress-bar__dot">
                  {i < krok ? "✓" : i + 1}
                </div>
                <span className="progress-bar__label">{label}</span>
              </div>
            ))}
          </div>

          {/* ════════ KROK: DANE ════════ */}
          {stepName === "Dane" && (
            <div className="krok">
              <div className="krok__header">
                <span className="krok__num">01</span>
                <h2 className="krok__title">Twoje dane</h2>
              </div>
              <div className="krok__body">
                <div className="form-row">
                  <div className="form-field">
                    <label>Imię i nazwisko *</label>
                    <input
                      type="text"
                      value={z.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Jan Kowalski"
                    />
                  </div>
                  <div className="form-field">
                    <label>Telefon *</label>
                    <input
                      type="tel"
                      value={z.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="+48 600 000 000"
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label>E-mail *</label>
                  <input
                    type="email"
                    value={z.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="jan@firma.pl"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ════════ KROK: KATEGORIA ════════ */}
          {stepName === "Kategoria" && (
            <div className="krok">
              <div className="krok__header">
                <span className="krok__num">02</span>
                <h2 className="krok__title">Rodzaj produktu</h2>
              </div>
              <div className="krok__body">
                <div className="kafelki-grid">
                  {KATEGORIE.map((k) => (
                    <button
                      key={k.id}
                      className={`kafelek ${z.kategoria === k.id ? "kafelek--active" : ""}`}
                      onClick={() => {
                        set("kategoria", k.id);
                        set("transport", "");
                        set("produkt", "");
                      }}
                    >
                      <span className="kafelek__icon">{k.icon}</span>
                      <span className="kafelek__label">{k.label}</span>
                      <span className="kafelek__opis">{k.opis}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════════ KROK: TRANSPORT ════════ */}
          {stepName === "Transport" && (
            <div className="krok">
              <div className="krok__header">
                <span className="krok__num">03</span>
                <h2 className="krok__title">Transport</h2>
              </div>
              <div className="krok__body">
                {transportDostepny.length < 3 && (
                  <div className="info-note">
                    ℹ️ Dla wybranej kategorii dostępne są tylko określone formy
                    transportu.
                  </div>
                )}
                <div className="transport-grid">
                  {TRANSPORT_OPCJE.filter((t) =>
                    transportDostepny.includes(t.id),
                  ).map((t) => (
                    <button
                      key={t.id}
                      className={`transport-card ${z.transport === t.id ? "transport-card--active" : ""}`}
                      onClick={() => {
                        set("transport", t.id);
                        set("produkt", "");
                        set("pompa", "brak");
                      }}
                    >
                      <span className="transport-card__icon">{t.icon}</span>
                      <span className="transport-card__label">{t.label}</span>
                      <span className="transport-card__opis">{t.opis}</span>
                      {t.id === "własny" && (
                        <span className="transport-card__modifier">
                          Cena loco wytwórnia
                        </span>
                      )}
                      {t.id !== "własny" && (
                        <span className="transport-card__modifier">
                          Cena franco — dostawa wliczona
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════════ KROK: KLASA ════════ */}
          {stepName === "Klasa" && (
            <div className="krok">
              <div className="krok__header">
                <span className="krok__num">04</span>
                <h2 className="krok__title">Klasa betonu</h2>
              </div>
              <div className="krok__body">
                {z.transport === "gruszka" && (
                  <div className="info-note info-note--orange">
                    🚛 Wybrałeś dostawę gruszką — cennik{" "}
                    <strong>franco budowa (S3)</strong>, dostawa do 15 km
                    wliczona w cenę.
                  </div>
                )}
                {z.transport !== "gruszka" &&
                  z.kategoria !== "stabilizacje" && (
                    <div className="info-note">
                      🏗 Odbiór własny lub wywrotka — cennik{" "}
                      <strong>loco wytwórnia (S1)</strong>.
                    </div>
                  )}
                <div className="klasy-lista">
                  {getProdukty(z.kategoria, z.transport).map((p) => (
                    <button
                      key={p.id}
                      className={`klasa-row ${z.produkt === p.id ? "klasa-row--active" : ""}`}
                      onClick={() => set("produkt", p.id)}
                    >
                      <span className="klasa-row__label">{p.label}</span>
                      <span className="klasa-row__price">
                        {p.price} PLN <small>/ m³</small>
                      </span>
                      {z.produkt === p.id && (
                        <span className="klasa-row__check">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════════ KROK: ILOŚĆ ════════ */}
          {stepName === "Ilość" && (
            <div className="krok">
              <div className="krok__header">
                <span className="krok__num">05</span>
                <h2 className="krok__title">Ilość betonu</h2>
              </div>
              <div className="krok__body">
                <div className="ilosc-wrap">
                  <div className="form-field">
                    <label>Ilość w m³ *</label>
                    <div className="ilosc-input-wrap">
                      <input
                        type="number"
                        min="0.5"
                        step="0.5"
                        value={z.ilosc}
                        onChange={(e) => set("ilosc", e.target.value)}
                        placeholder="np. 10"
                        className="ilosc-input"
                      />
                      <span className="ilosc-unit">m³</span>
                    </div>
                  </div>
                  {ilosc_num > 0 && (
                    <div className="ilosc-podglad">
                      <span className="ilosc-podglad__label">
                        Szacowana cena betonu
                      </span>
                      <span className="ilosc-podglad__value">
                        {Math.round(
                          (getProdukty(z.kategoria, z.transport).find(
                            (p) => p.id === z.produkt,
                          )?.price || 0) * ilosc_num,
                        )}{" "}
                        PLN
                      </span>
                    </div>
                  )}
                  {gruszkaWarn && (
                    <div className="alert-warning">
                      ⚠️ Przy zamówieniu poniżej 6 m³ gruszką doliczamy{" "}
                      <strong>+400 PLN</strong> za niepełny kurs.
                    </div>
                  )}
                  {z.transport === "gruszka" && ilosc_num > 0 && (
                    <div className="info-note">
                      {ilosc_num > 15
                        ? "✅ Zamówienie powyżej 15 m³ — w następnym kroku pompa rozliczana za m³."
                        : "ℹ️ Zamówienie do 15 m³ — w następnym kroku pompa rozliczana godzinowo."}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ════════ KROK: USŁUGI DODATKOWE ════════ */}
          {stepName === "Usługi dodatkowe" && (
            <div className="krok">
              <div className="krok__header">
                <span className="krok__num">06</span>
                <h2 className="krok__title">Usługi dodatkowe</h2>
              </div>
              <div className="krok__body">
                <p className="krok__desc">
                  Wybierz jeśli dotyczą Twojego zamówienia. Możesz wybrać kilka
                  opcji.
                </p>
                <div className="uslugi-lista">
                  <p className="uslugi-lista__sekcja">
                    🌡 Grzanie betonu w warunkach zimowych
                  </p>
                  {USLUGI_GRZANIE.map((u) => (
                    <button
                      key={u.id}
                      className={`usluga-row ${z.uslugi.includes(u.id) ? "usluga-row--active" : ""}`}
                      onClick={() => handleToggleUsluga(u.id)}
                    >
                      <div className="usluga-row__info">
                        <span className="usluga-row__label">{u.label}</span>
                        <span className="usluga-row__opis">{u.opis}</span>
                      </div>
                      <div className="usluga-row__right">
                        <span className="usluga-row__price">
                          +{u.price_m3} PLN<small>/m³</small>
                        </span>
                        {ilosc_num > 0 && (
                          <span className="usluga-row__total">
                            = +{u.price_m3 * ilosc_num} PLN
                          </span>
                        )}
                        <span className="usluga-row__check">
                          {z.uslugi.includes(u.id) ? "✓" : "+"}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                {z.uslugi.length === 0 && (
                  <p className="krok__note">
                    Nie wybrano żadnych usług dodatkowych — możesz przejść
                    dalej.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ════════ KROK: POMPA (tylko gruszka) ════════ */}
          {stepName === "Pompa" && (
            <div className="krok">
              <div className="krok__header">
                <span className="krok__num">07</span>
                <h2 className="krok__title">Pompowanie betonu</h2>
              </div>
              <div className="krok__body">
                <div
                  className={`info-note ${pompaPerM3 ? "info-note--green" : "info-note--blue"}`}
                >
                  {pompaPerM3 ? (
                    <>
                      ✅ <strong>Cennik za m³</strong> — zamówienie powyżej 15
                      m³ ({z.ilosc} m³). Cena = stawka za m³ × ilość + dojazd.
                    </>
                  ) : (
                    <>
                      ℹ️ <strong>Cennik godzinowy</strong> — zamówienie do 15 m³
                      ({z.ilosc} m³). Minimalna jednostka to 1 godzina pracy
                      pompy.
                    </>
                  )}
                </div>

                <div className="klasy-lista">
                  {POMPY.map((p) => (
                    <button
                      key={p.id}
                      className={`klasa-row ${z.pompa === p.id ? "klasa-row--active" : ""}`}
                      onClick={() => set("pompa", p.id)}
                    >
                      <span className="klasa-row__label">{p.label}</span>
                      <span className="klasa-row__price">
                        {p.id === "brak"
                          ? "—"
                          : pompaPerM3
                            ? `${p.rate_m3} PLN/m³ + ${p.dojazd} PLN dojazd`
                            : `${p.rate_h} PLN/h + ${p.dojazd} PLN dojazd`}
                      </span>
                      {z.pompa === p.id && (
                        <span className="klasa-row__check">✓</span>
                      )}
                    </button>
                  ))}
                </div>

                {!pompaPerM3 && z.pompa !== "brak" && (
                  <div className="form-field" style={{ marginTop: "1rem" }}>
                    <label>Szacowana liczba godzin pompowania</label>
                    <div
                      className="ilosc-input-wrap"
                      style={{ maxWidth: "220px" }}
                    >
                      <input
                        type="number"
                        min="1"
                        step="0.5"
                        value={z.godzinyPompy}
                        onChange={(e) => set("godzinyPompy", e.target.value)}
                        className="ilosc-input"
                        style={{ fontSize: "1.8rem" }}
                      />
                      <span className="ilosc-unit">h</span>
                    </div>
                  </div>
                )}

                {z.pompa !== "brak" &&
                  (() => {
                    const pump = POMPY.find((p) => p.id === z.pompa);
                    const est = pompaPerM3
                      ? Math.round(pump.rate_m3 * ilosc_num + pump.dojazd)
                      : Math.round(
                          pump.rate_h * (parseFloat(z.godzinyPompy) || 1) +
                            pump.dojazd,
                        );
                    return (
                      <div
                        className="ilosc-podglad"
                        style={{ marginTop: "1rem" }}
                      >
                        <span className="ilosc-podglad__label">
                          Szacowana cena pompowania
                        </span>
                        <span className="ilosc-podglad__value">
                          ≈ {est} PLN
                        </span>
                      </div>
                    );
                  })()}

                <p className="krok__note">
                  * Dojazd liczony do 25 km od WBT Siemianowice Śląskie. Powyżej
                  25 km — cena ustalana indywidualnie. Minimalna jednostka pracy
                  pompy: 1 godzina.
                </p>
              </div>
            </div>
          )}

          {/* ════════ KROK: OPCJE POMPY ════════ */}
          {stepName === "Opcje pompy" && (
            <div className="krok">
              <div className="krok__header">
                <span className="krok__num">08</span>
                <h2 className="krok__title">Opcje dodatkowe pompy</h2>
              </div>
              <div className="krok__body">
                <p className="krok__desc">
                  Wybierz dodatkowe opcje związane z pompowaniem. Możesz wybrać
                  kilka.
                </p>
                <div className="uslugi-lista">
                  {OPCJE_POMPY.map((op) => {
                    const selected =
                      op.typ === "checkbox"
                        ? z.opcjePompy.rurociag
                        : z.opcjePompy.weze_gumowe_mb &&
                          parseFloat(z.opcjePompy.weze_gumowe_mb) > 0;
                    return (
                      <div
                        key={op.id}
                        className={`usluga-row ${selected ? "usluga-row--active" : ""}`}
                      >
                        <div className="usluga-row__info">
                          <span className="usluga-row__label">{op.label}</span>
                          <span className="usluga-row__opis">{op.opis}</span>
                        </div>
                        <div className="usluga-row__right">
                          {op.typ === "checkbox" ? (
                            <button
                              className={`toggle-btn ${z.opcjePompy.rurociag ? "toggle-btn--on" : ""}`}
                              onClick={() =>
                                setZ((prev) => ({
                                  ...prev,
                                  opcjePompy: {
                                    ...prev.opcjePompy,
                                    rurociag: !prev.opcjePompy.rurociag,
                                  },
                                }))
                              }
                            >
                              {z.opcjePompy.rurociag ? "✓ Dodano" : "+ Dodaj"}
                            </button>
                          ) : (
                            <div className="mb-input-wrap">
                              <input
                                type="number"
                                min="0"
                                step="1"
                                placeholder="0 mb"
                                value={z.opcjePompy.weze_gumowe_mb}
                                onChange={(e) =>
                                  setZ((prev) => ({
                                    ...prev,
                                    opcjePompy: {
                                      ...prev.opcjePompy,
                                      weze_gumowe_mb: e.target.value,
                                    },
                                  }))
                                }
                                className="mb-input"
                              />
                              <span className="mb-label">mb</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="krok__note">
                  Jeśli nie potrzebujesz opcji dodatkowych — przejdź dalej.
                </p>
              </div>
            </div>
          )}

          {/* ════════ KROK: PODSUMOWANIE ════════ */}
          {stepName === "Podsumowanie" && cena && (
            <div className="krok">
              <div className="krok__header">
                <span className="krok__num">{kroki.length}</span>
                <h2 className="krok__title">Podsumowanie zamówienia</h2>
              </div>
              <div className="krok__body">
                <div className="summary-grid">
                  <div className="summary-col">
                    <h4 className="summary-section-title">Dane klienta</h4>
                    <div className="summary-rows">
                      <div className="summary-row">
                        <span>Imię i nazwisko</span>
                        <span>{z.name}</span>
                      </div>
                      <div className="summary-row">
                        <span>Telefon</span>
                        <span>{z.phone}</span>
                      </div>
                      <div className="summary-row">
                        <span>E-mail</span>
                        <span>{z.email}</span>
                      </div>
                    </div>
                    <h4 className="summary-section-title">Zamówienie</h4>
                    <div className="summary-rows">
                      <div className="summary-row">
                        <span>Rodzaj</span>
                        <span>
                          {KATEGORIE.find((k) => k.id === z.kategoria)?.label}
                        </span>
                      </div>
                      <div className="summary-row">
                        <span>Klasa</span>
                        <span>{cena.prod?.label}</span>
                      </div>
                      <div className="summary-row">
                        <span>Ilość</span>
                        <span>{z.ilosc} m³</span>
                      </div>
                      <div className="summary-row">
                        <span>Transport</span>
                        <span>{cena.transport?.label}</span>
                      </div>
                      {z.uslugi.length > 0 && (
                        <div className="summary-row">
                          <span>Usługi dodatkowe</span>
                          <span>
                            {z.uslugi
                              .map(
                                (u) =>
                                  USLUGI_GRZANIE.find((x) => x.id === u)?.label,
                              )
                              .join(", ")}
                          </span>
                        </div>
                      )}
                      {z.pompa !== "brak" && (
                        <div className="summary-row">
                          <span>Pompa</span>
                          <span>{cena.pump?.label}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="summary-col">
                    <h4 className="summary-section-title">
                      Szacowana cena netto
                    </h4>
                    <div className="cena-breakdown">
                      <div className="cena-row">
                        <span>
                          Beton ({cena.prod?.label} × {z.ilosc} m³)
                        </span>
                        <span>{cena.cenaBeton} PLN</span>
                      </div>
                      {cena.dopłataGruszka > 0 && (
                        <div className="cena-row cena-row--warning">
                          <span>Dopłata: zamówienie &lt;6 m³</span>
                          <span>+{cena.dopłataGruszka} PLN</span>
                        </div>
                      )}
                      {cena.cenaGrzanie > 0 && (
                        <div className="cena-row">
                          <span>Usługi dodatkowe (grzanie)</span>
                          <span>+{cena.cenaGrzanie} PLN</span>
                        </div>
                      )}
                      {cena.cenaPompa > 0 && (
                        <div className="cena-row">
                          <span>Pompowanie ({cena.pump?.label})</span>
                          <span>+{cena.cenaPompa} PLN</span>
                        </div>
                      )}
                      {cena.opcjeBreakdown.map((o, i) => (
                        <div key={i} className="cena-row">
                          <span>{o.label}</span>
                          <span>+{o.kwota} PLN</span>
                        </div>
                      ))}
                      <div className="cena-row cena-row--total">
                        <span>Razem (szacunkowo)</span>
                        <span>{cena.razem} PLN</span>
                      </div>
                    </div>
                    <p className="cena-note">
                      Cena netto, bez VAT. Ostateczna wycena zostanie
                      potwierdzona przez nasz dział handlowy.
                    </p>

                    <div className="form-field" style={{ marginTop: "1.5rem" }}>
                      <label>Dodatkowa wiadomość (opcjonalnie)</label>
                      <textarea
                        rows="3"
                        value={z.wiadomosc}
                        onChange={(e) => set("wiadomosc", e.target.value)}
                        placeholder="Adres budowy, uwagi..."
                      />
                    </div>
                  </div>
                </div>

                {error && <div className="alert-error">{error}</div>}

                <button
                  className="btn btn--primary zamowienie-submit"
                  onClick={handleWysylka}
                  disabled={sending}
                >
                  {sending ? "Wysyłanie..." : "Wyślij zamówienie →"}
                </button>
              </div>
            </div>
          )}

          {/* ── Nawigacja ── */}
          <div className="krok-nav">
            {krok > 0 && (
              <button
                className="btn btn--outline"
                onClick={() => setKrok((k) => k - 1)}
              >
                ← Wstecz
              </button>
            )}
            {krok < maxStep && (
              <button
                className="btn btn--primary"
                onClick={() => setKrok((k) => k + 1)}
                disabled={disabled()}
              >
                Dalej →
              </button>
            )}
          </div>

          {/* ── Sidebar kontakt ── */}
          <div className="kontakt__details kontakt__details--aside">
            <a href={`tel:${COMPANY.phone}`} className="kontakt__detail-item">
              <span className="kontakt__detail-icon">☏</span>
              <div>
                <span className="kontakt__detail-label">Telefon</span>
                <span className="kontakt__detail-value">{COMPANY.phone}</span>
              </div>
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="kontakt__detail-item"
            >
              <span className="kontakt__detail-icon">✉</span>
              <div>
                <span className="kontakt__detail-label">E-mail</span>
                <span className="kontakt__detail-value">{COMPANY.email}</span>
              </div>
            </a>
            <a
              href={`mailto:${COMPANY.email2}`}
              className="kontakt__detail-item"
            >
              <span className="kontakt__detail-icon">✉</span>
              <div>
                <span className="kontakt__detail-label">E-mail</span>
                <span className="kontakt__detail-value">{COMPANY.email2}</span>
              </div>
            </a>
            <div className="kontakt__detail-item">
              <span className="kontakt__detail-icon">◷</span>
              <div>
                <span className="kontakt__detail-label">Godziny pracy</span>
                <span className="kontakt__detail-value">
                  Pon–Pt: 7:00 – 17:00
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
