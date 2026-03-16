// src/pages/Kontakt/Kontakt.jsx
import { useState } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { COMPANY } from "../../data/company";
import "../Oferta/Oferta.css";
import "./Kontakt.css";

export default function Kontakt() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: podłącz do backendu / EmailJS / formspree
    console.log("Form data:", form);
    setSent(true);
  };

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

      <section className="section kontakt">
        <div className="container kontakt__inner">
          {/* Info column */}
          <div className="kontakt__info">
            <SectionTitle
              eyebrow="Dane kontaktowe"
              title={
                <>
                  Jesteśmy
                  <br />
                  do dyspozycji
                </>
              }
              subtitle="Zadzwoń, napisz lub przyjdź osobiście — odpowiemy na każde pytanie."
            />

            <div className="kontakt__details">
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

              <div className="kontakt__detail-item">
                <span className="kontakt__detail-icon">◎</span>
                <div>
                  <span className="kontakt__detail-label">Adres</span>
                  <span className="kontakt__detail-value">
                    {COMPANY.address}
                  </span>
                </div>
              </div>

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

          {/* Form column */}
          <div className="kontakt__form-wrap">
            {sent ? (
              <div className="kontakt__success">
                <span className="kontakt__success-icon">✓</span>
                <h3>Wiadomość wysłana!</h3>
                <p>Odezwiemy się najszybciej jak to możliwe.</p>
              </div>
            ) : (
              <form
                className="kontakt__form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name">Imię i nazwisko *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Jan Kowalski"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="phone">Telefon</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+48 600 000 000"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="email">E-mail *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="jan@firma.pl"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="message">Wiadomość *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Opisz czego potrzebujesz..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn--primary kontakt__submit"
                >
                  Wyślij wiadomość
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
