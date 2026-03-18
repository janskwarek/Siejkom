// src/pages/Kontakt/kroki/KrokPodsumowanie.jsx
import { KATEGORIE, USLUGI_GRZANIE } from "../cennik";

export default function KrokPodsumowanie({ z, cena, kroki, error, sending, onWysylka, set }) {
  return (
    <div className="krok">
      <div className="krok__header">
        <span className="krok__num">{kroki.length}</span>
        <h2 className="krok__title">Podsumowanie zamówienia</h2>
      </div>
      <div className="krok__body">
        <div className="summary-grid">

          {/* Lewa kolumna — dane i zamówienie */}
          <div className="summary-col">
            <h4 className="summary-section-title">Dane klienta</h4>
            <div className="summary-rows">
              <div className="summary-row"><span>Imię i nazwisko</span><span>{z.name}</span></div>
              <div className="summary-row"><span>Telefon</span><span>{z.phone}</span></div>
              <div className="summary-row"><span>E-mail</span><span>{z.email}</span></div>
            </div>

            <h4 className="summary-section-title">Zamówienie</h4>
            <div className="summary-rows">
              <div className="summary-row">
                <span>Rodzaj</span>
                <span>{KATEGORIE.find(k => k.id === z.kategoria)?.label}</span>
              </div>
              <div className="summary-row"><span>Klasa</span><span>{cena.prod?.label}</span></div>
              <div className="summary-row"><span>Ilość</span><span>{z.ilosc} m³</span></div>
              <div className="summary-row"><span>Transport</span><span>{cena.transport?.label}</span></div>
              {z.uslugi.length > 0 && (
                <div className="summary-row">
                  <span>Usługi dodatkowe</span>
                  <span>{z.uslugi.map(u => USLUGI_GRZANIE.find(x => x.id === u)?.label).join(", ")}</span>
                </div>
              )}
              {z.pompa !== "brak" && (
                <div className="summary-row"><span>Pompa</span><span>{cena.pump?.label}</span></div>
              )}
            </div>
          </div>

          {/* Prawa kolumna — cena i uwagi */}
          <div className="summary-col">
            <h4 className="summary-section-title">Szacowana cena netto</h4>
            <div className="cena-breakdown">
              <div className="cena-row">
                <span>Beton ({cena.prod?.label} × {z.ilosc} m³)</span>
                <span>{cena.cenaBeton} PLN</span>
              </div>
              {cena.dopłataGruszka > 0 && (
                <div className="cena-row cena-row--warning">
                  <span>Dopłata: zamówienie &lt;6 m³</span>
                  <span>+{cena.dopłataGruszka} PLN</span>
                </div>
              )}
              {cena.cenaGrzanie > 0 && (
                <div className="cena-row">
                  <span>Usługi dodatkowe (grzanie)</span>
                  <span>+{cena.cenaGrzanie} PLN</span>
                </div>
              )}
              {cena.cenaPompa > 0 && (
                <div className="cena-row">
                  <span>Pompowanie ({cena.pump?.label})</span>
                  <span>+{cena.cenaPompa} PLN</span>
                </div>
              )}
              {cena.opcjeBreakdown.map((o, i) => (
                <div key={i} className="cena-row">
                  <span>{o.label}</span>
                  <span>+{o.kwota} PLN</span>
                </div>
              ))}
              <div className="cena-row cena-row--total">
                <span>Razem (szacunkowo)</span>
                <span>{cena.razem} PLN</span>
              </div>
            </div>
            <p className="cena-note">Cena netto, bez VAT. Ostateczna wycena zostanie potwierdzona przez nasz dział handlowy.</p>

            <div className="form-field" style={{ marginTop: "1.5rem" }}>
              <label>Dodatkowa wiadomość (opcjonalnie)</label>
              <textarea
                rows="3"
                value={z.wiadomosc}
                onChange={e => set("wiadomosc", e.target.value)}
                placeholder="Adres budowy, uwagi..."
              />
            </div>
          </div>
        </div>

        {error && <div className="alert-error">{error}</div>}

        <button className="btn btn--primary zamowienie-submit" onClick={onWysylka} disabled={sending}>
          {sending ? "Wysyłanie..." : "Wyślij zamówienie →"}
        </button>
      </div>
    </div>
  );
}
