// src/pages/Kontakt/kroki/KrokPompa.jsx
import { POMPY, POMPA_PROG_M3 } from "../cennik";

export default function KrokPompa({ z, set }) {
  const ilosc_num = parseFloat(z.ilosc) || 0;
  const pompaPerM3 = ilosc_num >= POMPA_PROG_M3;

  const estCena = () => {
    const pump = POMPY.find((p) => p.id === z.pompa);
    if (!pump || pump.id === "brak") return null;
    return pompaPerM3
      ? Math.round(pump.rate_m3 * ilosc_num + pump.dojazd)
      : Math.round(
          pump.rate_h * (parseFloat(z.godzinyPompy) || 1) + pump.dojazd,
        );
  };

  return (
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
              ✅ <strong>Cennik za m³</strong> — zamówienie ≥{POMPA_PROG_M3} m³
              ({z.ilosc} m³). Cena = stawka/m³ × ilość + dojazd.
            </>
          ) : (
            <>
              <strong>Cennik godzinowy</strong> — zamówienie poniżej{" "}
              {POMPA_PROG_M3} m³ ({z.ilosc} m³). Rozliczenie za m³ dostępne od{" "}
              {POMPA_PROG_M3} m³. Min. 1h.
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
              {z.pompa === p.id && <span className="klasa-row__check">✓</span>}
            </button>
          ))}
        </div>

        {!pompaPerM3 && z.pompa !== "brak" && (
          <div className="form-field" style={{ marginTop: "1rem" }}>
            <label>Szacowana liczba godzin pompowania</label>
            <div className="ilosc-input-wrap" style={{ maxWidth: "220px" }}>
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

        {estCena() !== null && (
          <div className="ilosc-podglad" style={{ marginTop: "1rem" }}>
            <span className="ilosc-podglad__label">
              Szacowana cena pompowania
            </span>
            <span className="ilosc-podglad__value">≈ {estCena()} PLN</span>
          </div>
        )}

        <p className="krok__note">
          * Dojazd liczony do 25 km od jednego z dwóch zakładów. Powyżej 25 km —
          cena ustalana indywidualnie.
        </p>
      </div>
    </div>
  );
}
