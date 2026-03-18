// src/pages/Kontakt/kroki/KrokDane.jsx
export default function KrokDane({ z, set, errors, setErrors }) {
  const clear = (field) => setErrors((prev) => ({ ...prev, [field]: "" }));

  return (
    <div className="krok">
      <div className="krok__header">
        <span className="krok__num">01</span>
        <h2 className="krok__title">Twoje dane</h2>
      </div>
      <div className="krok__body">
        <div className="form-row">
          <div className="form-field">
            <label>Imię i nazwisko / Firma*</label>
            <input
              type="text"
              value={z.name}
              onChange={(e) => {
                set("name", e.target.value);
                clear("name");
              }}
              placeholder="Jan Kowalski"
              className={errors.name ? "input--error" : ""}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>
          <div className="form-field">
            <label>NIP</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={10}
              value={z.nip}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                set("nip", val);
              }}
              placeholder="1234567890"
            />
            {errors.nip && <span className="field-error">{errors.nip}</span>}
          </div>
          <div className="form-field">
            <label>Telefon *</label>
            <input
              type="tel"
              value={z.phone}
              onChange={(e) => {
                set("phone", e.target.value);
                clear("phone");
              }}
              placeholder="+48 600 000 000"
              className={errors.phone ? "input--error" : ""}
            />
            {errors.phone && (
              <span className="field-error">{errors.phone}</span>
            )}
          </div>
        </div>
        <div className="form-field">
          <label>E-mail *</label>
          <input
            type="email"
            value={z.email}
            onChange={(e) => {
              set("email", e.target.value);
              clear("email");
            }}
            placeholder="jan@firma.pl"
            className={errors.email ? "input--error" : ""}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
        <div className="form-field">
          <label>Adres budowy *</label>
          <input
            type="text"
            value={z.adres}
            onChange={(e) => {
              set("adres", e.target.value);
              clear("adres");
            }}
            placeholder="ul. Przykładowa 1, Katowice"
            className={errors.adres ? "input--error" : ""}
          />
          {errors.adres && <span className="field-error">{errors.adres}</span>}
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Data dostawy *</label>
            <input
              type="date"
              value={z.data}
              onChange={(e) => {
                set("data", e.target.value);
                clear("data");
              }}
              min={new Date().toISOString().split("T")[0]}
              className={errors.data ? "input--error" : ""}
            />
            {errors.data && <span className="field-error">{errors.data}</span>}
          </div>
          <div className="form-field">
            <label>Godzina dostawy *</label>
            <input
              type="time"
              value={z.godzina}
              onChange={(e) => {
                set("godzina", e.target.value);
                clear("godzina");
              }}
              min="06:00"
              max="16:00"
              className={errors.godzina ? "input--error" : ""}
            />
            {errors.godzina && (
              <span className="field-error">{errors.godzina}</span>
            )}
          </div>
        </div>
        <p className="krok__note">* Pola wymagane</p>
      </div>
    </div>
  );
}
