// src/pages/Kontakt/kroki/KrokOpcjePompy.jsx
import { OPCJE_POMPY } from "../cennik";

export default function KrokOpcjePompy({ z, setZ }) {
  const setOpcja = (key, val) =>
    setZ((prev) => ({
      ...prev,
      opcjePompy: { ...prev.opcjePompy, [key]: val },
    }));

  return (
    <div className="krok">
      <div className="krok__header">
        <span className="krok__num">08</span>
        <h2 className="krok__title">Opcje dodatkowe pompy</h2>
      </div>
      <div className="krok__body">
        <p className="krok__desc">
          Wybierz dodatkowe opcje związane z pompowaniem.
        </p>
        <div className="uslugi-lista">
          {OPCJE_POMPY.map((op) => {
            const wezeActive =
              op.typ === "mb" &&
              z.opcjePompy.weze_gumowe_mb &&
              parseFloat(z.opcjePompy.weze_gumowe_mb) > 0;
            const active =
              op.typ === "checkbox" ? z.opcjePompy.rurociag : wezeActive;

            return (
              <div
                key={op.id}
                className={`usluga-row ${active ? "usluga-row--active" : ""}`}
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
                        setOpcja("rurociag", !z.opcjePompy.rurociag)
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
                        placeholder="0"
                        value={z.opcjePompy.weze_gumowe_mb}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, ""); // tylko cyfry
                          const num = parseInt(raw) || 0;
                          setOpcja("weze_gumowe_mb", num > 50 ? "50" : raw);
                        }}
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
  );
}
