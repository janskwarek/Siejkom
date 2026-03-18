// src/pages/Kontakt/Kontakt.jsx
import { useState } from "react";
import { COMPANY } from "../../data/company";
import {
  getKroki,
  obliczCene,
  walidujDane,
  wyslijEmail,
  mailtoFallback,
} from "./helpers";
import KrokDane from "./kroki/KrokDane";
import KrokKategoria from "./kroki/KrokKategoria";
import KrokTransport from "./kroki/KrokTransport";
import KrokKlasa from "./kroki/KrokKlasa";
import KrokIlosc from "./kroki/KrokIlosc";
import KrokUslugi from "./kroki/KrokUslugi";
import KrokPompa from "./kroki/KrokPompa";
import KrokOpcjePompy from "./kroki/KrokOpcjePompy";
import KrokPodsumowanie from "./kroki/KrokPodsumowanie";
import "../Oferta/Oferta.css";
import "./Kontakt.css";

const PUSTY_STAN = {
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
};

function PageHero() {
  return (
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
  );
}

export default function Kontakt() {
  const [krok, setKrok] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [z, setZ] = useState(PUSTY_STAN);

  const set = (field, val) => setZ((prev) => ({ ...prev, [field]: val }));
  const reset = () => {
    setSent(false);
    setKrok(0);
    setZ(PUSTY_STAN);
  };

  const kroki = getKroki(z);
  const maxStep = kroki.length - 1;
  const stepName = kroki[krok];
  const cena = obliczCene(z);
  const ilosc_num = parseFloat(z.ilosc) || 0;

  const dalejDisabled = () => {
    if (stepName === "Kategoria") return !z.kategoria;
    if (stepName === "Transport") return !z.transport;
    if (stepName === "Klasa") return !z.produkt;
    if (stepName === "Ilość") return !z.ilosc || ilosc_num <= 0;
    return false;
  };

  const handleNext = () => {
    if (stepName === "Dane") {
      const e = walidujDane(z);
      if (Object.keys(e).length > 0) {
        setErrors(e);
        return;
      }
    }
    setErrors({});
    setKrok((k) => k + 1);
  };

  const handleWysylka = async () => {
    setSending(true);
    setError("");
    try {
      await wyslijEmail(z, cena);
      setSent(true);
    } catch {
      mailtoFallback(z, cena);
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  if (sent)
    return (
      <>
        <PageHero />
        <section className="section">
          <div className="container">
            <div className="zamowienie-success">
              <span className="zamowienie-success__icon">✓</span>
              <h2>Zamówienie wysłane!</h2>
              <p>Odezwiemy się najszybciej jak to możliwe.</p>
              <button className="btn btn--outline" onClick={reset}>
                Złóż kolejne zamówienie
              </button>
            </div>
          </div>
        </section>
      </>
    );

  return (
    <>
      <PageHero />
      <section className="section zamowienie">
        <div className="container zamowienie__wrap">
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

          {stepName === "Dane" && (
            <KrokDane z={z} set={set} errors={errors} setErrors={setErrors} />
          )}
          {stepName === "Kategoria" && <KrokKategoria z={z} set={set} />}
          {stepName === "Transport" && <KrokTransport z={z} set={set} />}
          {stepName === "Klasa" && <KrokKlasa z={z} set={set} />}
          {stepName === "Ilość" && <KrokIlosc z={z} set={set} />}
          {stepName === "Usługi dodatkowe" && <KrokUslugi z={z} setZ={setZ} />}
          {stepName === "Pompa" && <KrokPompa z={z} set={set} />}
          {stepName === "Opcje pompy" && <KrokOpcjePompy z={z} setZ={setZ} />}
          {stepName === "Podsumowanie" && cena && (
            <KrokPodsumowanie
              z={z}
              cena={cena}
              kroki={kroki}
              error={error}
              sending={sending}
              onWysylka={handleWysylka}
              set={set}
            />
          )}

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
                onClick={handleNext}
                disabled={dalejDisabled()}
              >
                Dalej →
              </button>
            )}
          </div>

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
            {COMPANY.email2 && (
              <a
                href={`mailto:${COMPANY.email2}`}
                className="kontakt__detail-item"
              >
                <span className="kontakt__detail-icon">✉</span>
                <div>
                  <span className="kontakt__detail-label">E-mail 2</span>
                  <span className="kontakt__detail-value">
                    {COMPANY.email2}
                  </span>
                </div>
              </a>
            )}
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
