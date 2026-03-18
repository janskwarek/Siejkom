// src/pages/Kontakt/kroki/KrokTransport.jsx
import { TRANSPORT_OPCJE, TRANSPORT_MAP } from "../cennik";

export default function KrokTransport({ z, set }) {
  const dostepny = TRANSPORT_MAP[z.kategoria] || [];

  return (
    <div className="krok">
      <div className="krok__header">
        <span className="krok__num">03</span>
        <h2 className="krok__title">Transport</h2>
      </div>
      <div className="krok__body">
        {dostepny.length < 3 && (
          <div className="info-note">
            ℹ️ Dla wybranej kategorii dostępne są tylko określone formy transportu.
          </div>
        )}
        <div className="transport-grid">
          {TRANSPORT_OPCJE.filter(t => dostepny.includes(t.id)).map(t => (
            <button
              key={t.id}
              className={`transport-card ${z.transport === t.id ? "transport-card--active" : ""}`}
              onClick={() => { set("transport", t.id); set("produkt", ""); set("pompa", "brak"); }}
            >
              <span className="transport-card__icon">{t.icon}</span>
              <span className="transport-card__label">{t.label}</span>
              <span className="transport-card__opis">{t.opis}</span>
              <span className="transport-card__modifier">
                {t.id === "własny" ? "Cena loco wytwórnia" : "Cena franco — dostawa wliczona"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
