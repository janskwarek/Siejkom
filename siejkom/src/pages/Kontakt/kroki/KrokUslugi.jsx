// src/pages/Kontakt/kroki/KrokUslugi.jsx
import { USLUGI_GRZANIE } from "../cennik";

export default function KrokUslugi({ z, setZ }) {
  const ilosc_num = parseFloat(z.ilosc) || 0;

  const toggle = (id) => {
    setZ(prev => ({
      ...prev,
      uslugi: prev.uslugi.includes(id)
        ? prev.uslugi.filter(x => x !== id)
        : [...prev.uslugi, id],
    }));
  };

  return (
    <div className="krok">
      <div className="krok__header">
        <span className="krok__num">06</span>
        <h2 className="krok__title">Usługi dodatkowe</h2>
      </div>
      <div className="krok__body">
        <p className="krok__desc">Wybierz jeśli dotyczą Twojego zamówienia. Możesz wybrać kilka opcji.</p>
        <div className="uslugi-lista">
          <p className="uslugi-lista__sekcja">🌡 Grzanie betonu w warunkach zimowych</p>
          {USLUGI_GRZANIE.map(u => (
            <button
              key={u.id}
              className={`usluga-row ${z.uslugi.includes(u.id) ? "usluga-row--active" : ""}`}
              onClick={() => toggle(u.id)}
            >
              <div className="usluga-row__info">
                <span className="usluga-row__label">{u.label}</span>
                <span className="usluga-row__opis">{u.opis}</span>
              </div>
              <div className="usluga-row__right">
                <span className="usluga-row__price">+{u.price_m3} PLN<small>/m³</small></span>
                {ilosc_num > 0 && (
                  <span className="usluga-row__total">= +{u.price_m3 * ilosc_num} PLN</span>
                )}
                <span className="usluga-row__check">
                  {z.uslugi.includes(u.id) ? "✓" : "+"}
                </span>
              </div>
            </button>
          ))}
        </div>
        {z.uslugi.length === 0 && (
          <p className="krok__note">Nie wybrano żadnych usług dodatkowych — możesz przejść dalej.</p>
        )}
      </div>
    </div>
  );
}
