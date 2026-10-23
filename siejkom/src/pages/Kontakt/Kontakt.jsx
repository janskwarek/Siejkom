// src/pages/Kontakt/Kontakt.jsx
import { useState } from "react";
import { COMPANY } from "../../data/company";
import { Helmet } from "react-helmet-async";
import {
  getKroki,
  obliczCene,
  walidujDane,
  przygotujWiadomoscEmail,
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
  nip: "",
  phone: "",
  email: "",
  adres: "",
  data: "",
  godzina: "",
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

function EmailText({ email }) {
  return email.split(/([@.])/).map((part, index) =>
    part === "@" || part === "." ? (
      <span key={index}>
        {part}
        <wbr />
      </span>
    ) : (
      part
    ),
  );
}

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
  const [emailOpened, setEmailOpened] = useState(false);
  const [errors, setErrors] = useState({});
  const [z, setZ] = useState(PUSTY_STAN);

  const set = (field, val) => setZ((prev) => ({ ...prev, [field]: val }));
  const reset = () => {
    setKrok(0);
    setZ(PUSTY_STAN);
    setEmailOpened(false);
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

  const handleWysylka = () => {
    window.location.href = przygotujWiadomoscEmail(z, cena);
    setEmailOpened(true);
  };

  if (emailOpened)
    return (
      <>
        <PageHero />
        <section className="section">
          <div className="container">
            <div className="zamowienie-success" role="status">
              <h2>Wiadomość przygotowana</h2>
              <p>
                Przygotowaliśmy wiadomość e-mail. Jeśli otworzył się program
                pocztowy, zatwierdź jej wysłanie w tym programie. Jeśli nie,
                napisz do nas na adres {COMPANY.email}.
              </p>
              <button className="btn btn--outline" onClick={reset}>
                Wróć do formularza
              </button>
            </div>
          </div>
        </section>
      </>
    );

  return (
    <>
      <Helmet>
        <title>Zamów beton — Siejkom Piekary Śląskie</title>
        <meta
          name="description"
          content="Zamów beton online z wyceną. Wybierz klasę betonu, ilość betonu, transport i pompowanie betonu. Szybki kontakt ."
        />
        <link rel="canonical" href="https://siejkom.pl/kontakt" />
        <meta property="og:title" content="Zamów beton — Siejkom Piekary Śląskie" />
        <meta property="og:description" content="Zamów beton online z wyceną. Wybierz klasę betonu, ilość betonu, transport i pompowanie betonu." />
        <meta property="og:url" content="https://siejkom.pl/kontakt" />
      </Helmet>
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
                <span className="kontakt__detail-value">
                  <EmailText email={COMPANY.email} />
                </span>
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
                    <EmailText email={COMPANY.email2} />
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
