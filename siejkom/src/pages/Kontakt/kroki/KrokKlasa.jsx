// src/pages/Kontakt/kroki/KrokKlasa.jsx
import { getProdukty } from "../helpers";

export default function KrokKlasa({ z, set }) {
  const produkty = getProdukty(z.kategoria, z.transport);

  return (
    <div className="krok">
      <div className="krok__header">
        <span className="krok__num">04</span>
        <h2 className="krok__title">Klasa betonu</h2>
      </div>
      <div className="krok__body">
        {z.transport === "gruszka" ? (
          <div className="info-note info-note--orange">
            🚛 Wybrałeś dostawę gruszką — cennik <strong>franco budowa (S3)</strong>, dostawa do 15 km wliczona w cenę.
          </div>
        ) : z.kategoria !== "stabilizacje" && (
          <div className="info-note">
            🏗 Odbiór własny lub wywrotka — cennik <strong>loco wytwórnia (S1)</strong>.
          </div>
        )}
        <div className="klasy-lista">
          {produkty.map(p => (
            <button
              key={p.id}
              className={`klasa-row ${z.produkt === p.id ? "klasa-row--active" : ""}`}
              onClick={() => set("produkt", p.id)}
            >
              <span className="klasa-row__label">{p.label}</span>
              <span className="klasa-row__price">{p.price} PLN <small>/ m³</small></span>
              {z.produkt === p.id && <span className="klasa-row__check">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
