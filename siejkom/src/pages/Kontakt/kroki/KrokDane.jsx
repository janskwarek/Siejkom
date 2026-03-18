// src/pages/Kontakt/kroki/KrokDane.jsx
export default function KrokDane({ z, set, errors, setErrors }) {
  const clear = (field) => setErrors(prev => ({ ...prev, [field]: "" }));

  return (
    <div className="krok">
      <div className="krok__header">
        <span className="krok__num">01</span>
        <h2 className="krok__title">Twoje dane</h2>
      </div>
      <div className="krok__body">
        <div className="form-row">
          <div className="form-field">
            <label>Imię i nazwisko *</label>
            <input
              type="text"
              value={z.name}
              onChange={e => { set("name", e.target.value); clear("name"); }}
              placeholder="Jan Kowalski"
              className={errors.name ? "input--error" : ""}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>
          <div className="form-field">
            <label>Telefon *</label>
            <input
              type="tel"
              value={z.phone}
              onChange={e => { set("phone", e.target.value); clear("phone"); }}
              placeholder="+48 600 000 000"
              className={errors.phone ? "input--error" : ""}
            />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>
        </div>
        <div className="form-field">
          <label>E-mail *</label>
          <input
            type="email"
            value={z.email}
            onChange={e => { set("email", e.target.value); clear("email"); }}
            placeholder="jan@firma.pl"
            className={errors.email ? "input--error" : ""}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
      </div>
    </div>
  );
}
