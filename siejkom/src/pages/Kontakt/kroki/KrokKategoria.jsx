// src/pages/Kontakt/kroki/KrokKategoria.jsx
import { KATEGORIE } from "../cennik";

export default function KrokKategoria({ z, set }) {
  return (
    <div className="krok">
      <div className="krok__header">
        <span className="krok__num">02</span>
        <h2 className="krok__title">Rodzaj produktu</h2>
      </div>
      <div className="krok__body">
        <div className="kafelki-grid">
          {KATEGORIE.map(k => (
            <button
              key={k.id}
              className={`kafelek ${z.kategoria === k.id ? "kafelek--active" : ""}`}
              onClick={() => { set("kategoria", k.id); set("transport", ""); set("produkt", ""); }}
            >
              <span className="kafelek__icon">{k.icon}</span>
              <span className="kafelek__label">{k.label}</span>
              <span className="kafelek__opis">{k.opis}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
