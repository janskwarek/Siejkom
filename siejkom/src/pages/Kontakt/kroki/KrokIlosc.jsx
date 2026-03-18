// src/pages/Kontakt/kroki/KrokIlosc.jsx
import { getProdukty } from "../helpers";
import { POMPA_PROG_M3 } from "../cennik";

export default function KrokIlosc({ z, set }) {
  const ilosc_num   = parseFloat(z.ilosc) || 0;
  const gruszkaWarn = z.transport === "gruszka" && ilosc_num < 6 && ilosc_num > 0;
  const cenaBetonu  = Math.round(
    (getProdukty(z.kategoria, z.transport).find(p => p.id === z.produkt)?.price || 0) * ilosc_num
  );

  return (
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
                type="number" min="0.5" step="0.5"
                value={z.ilosc}
                onChange={e => set("ilosc", e.target.value)}
                placeholder="np. 10"
                className="ilosc-input"
              />
              <span className="ilosc-unit">m³</span>
            </div>
          </div>

          {ilosc_num > 0 && (
            <div className="ilosc-podglad">
              <span className="ilosc-podglad__label">Szacowana cena betonu</span>
              <span className="ilosc-podglad__value">{cenaBetonu} PLN</span>
            </div>
          )}

          {gruszkaWarn && (
            <div className="alert-warning">
              ⚠️ Przy zamówieniu poniżej 6 m³ gruszką doliczamy <strong>+400 PLN</strong> za niepełny kurs.
            </div>
          )}

          {z.transport === "gruszka" && ilosc_num > 0 && (
            <div className="info-note">
              {ilosc_num >= POMPA_PROG_M3
                ? `✅ Zamówienie ${POMPA_PROG_M3} m³ lub więcej — pompa może być rozliczana za m³.`
                : `ℹ️ Zamówienie poniżej ${POMPA_PROG_M3} m³ — pompa rozliczana godzinowo (min. 1h).`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
