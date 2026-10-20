// src/pages/Kontakt/helpers.js
// Logika biznesowa — bez JSX

import {
  PRODUKTY_S1,
  PRODUKTY_S3,
  TRANSPORT_OPCJE,
  POMPY,
  USLUGI_GRZANIE,
  POMPA_PROG_M3,
  KATEGORIE,
} from "./cennik";

// ── Zwraca listę produktów zależnie od kategorii i transportu ──
export function getProdukty(kategoria, transport) {
  if (!kategoria || !transport) return [];
  if (kategoria === "stabilizacje") return PRODUKTY_S1.stabilizacje;
  if (transport === "gruszka") return PRODUKTY_S3[kategoria] || [];
  return PRODUKTY_S1[kategoria] || [];
}

// ── Generuje listę nazw kroków dynamicznie ──
export function getKroki(z) {
  const base = [
    "Dane",
    "Kategoria",
    "Transport",
    "Klasa",
    "Ilość",
    "Usługi dodatkowe",
  ];
  if (z.transport !== "gruszka") return [...base, "Podsumowanie"];
  if (z.pompa && z.pompa !== "brak")
    return [...base, "Pompa", "Opcje pompy", "Podsumowanie"];
  return [...base, "Pompa", "Podsumowanie"];
}

// ── Oblicza szacowaną cenę zamówienia ──
export function obliczCene(z) {
  const {
    kategoria,
    produkt,
    ilosc,
    transport,
    pompa,
    uslugi,
    opcjePompy,
    godzinyPompy,
  } = z;
  if (!produkt || !ilosc || !transport) return null;

  const ilosc_num = parseFloat(ilosc) || 0;
  const produkty = getProdukty(kategoria, transport);
  const prod = produkty.find((p) => p.id === produkt);
  const pump = POMPY.find((p) => p.id === pompa);
  if (!prod) return null;

  const cenaBeton = prod.price * ilosc_num;
  const dopłataGruszka = transport === "gruszka" && ilosc_num < 6 ? 400 : 0;

  const cenaGrzanie = (uslugi || []).reduce((sum, uid) => {
    const u = USLUGI_GRZANIE.find((x) => x.id === uid);
    return sum + (u ? u.price_m3 * ilosc_num : 0);
  }, 0);

  let cenaPompa = 0;
  const perM3 = ilosc_num >= POMPA_PROG_M3;
  if (pump && pump.id !== "brak") {
    cenaPompa = perM3
      ? pump.rate_m3 * ilosc_num + pump.dojazd
      : pump.rate_h * (parseFloat(godzinyPompy) || 1) + pump.dojazd;
  }

  let cenaOpcjePompy = 0;
  const opcjeBreakdown = [];
  if (opcjePompy) {
    const wezeM = parseFloat(opcjePompy.weze_gumowe_mb) || 0;
    if (wezeM > 0) {
      const kwota = wezeM * 35;
      cenaOpcjePompy += kwota;
      opcjeBreakdown.push({ label: `Węże gumowe (${wezeM} mb)`, kwota });
    }
    if (opcjePompy.rurociag) {
      cenaOpcjePompy += 800;
      opcjeBreakdown.push({ label: "Dostawa rurociągu >15mb", kwota: 800 });
    }
  }

  return {
    cenaBeton: Math.round(cenaBeton),
    dopłataGruszka,
    cenaGrzanie: Math.round(cenaGrzanie),
    cenaPompa: Math.round(cenaPompa),
    cenaOpcjePompy: Math.round(cenaOpcjePompy),
    opcjeBreakdown,
    razem: Math.round(
      cenaBeton + dopłataGruszka + cenaGrzanie + cenaPompa + cenaOpcjePompy,
    ),
    prod,
    pump,
    transport: TRANSPORT_OPCJE.find((t) => t.id === transport),
    perM3Pump: pump && pump.id !== "brak" && perM3,
  };
}

// ── Walidacja kroku Dane ──
export function walidujDane(z) {
  const e = {};
  if (!z.adres.trim() || z.adres.trim().length < 5) e.adres = "Adres za krótki";
  if (!z.data) e.data = "Wybierz datę dostawy";
  if (!z.godzina) e.godzina = "Wybierz godzinę dostawy";

  if (!z.name.trim() || z.name.trim().length < 3)
    e.name = "Wpisz imię i nazwisko (min. 3 znaki)";
  else if (!/^[\p{L}\s'-]{3,}$/u.test(z.name.trim()))
    e.name = "Tylko litery i spacje";
  if (z.nip && z.nip.length !== 10) e.nip = "NIP musi mieć 10 cyfr";
  if (!/^(\+48\s?)?(\d[\s-]?){9}$/.test(z.phone.replace(/\s/g, "")))
    e.phone = "Podaj poprawny numer (9 cyfr, np. +48 600 000 000)";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(z.email))
    e.email = "Podaj poprawny adres e-mail";
  return e; // pusty obiekt = brak błędów
}

// ── Przygotowuje wiadomość w domyślnym programie pocztowym ──
export function przygotujWiadomoscEmail(z, cena) {
  const kat = KATEGORIE.find((k) => k.id === z.kategoria)?.label;
  const uslugi =
    (z.uslugi || [])
      .map((u) => USLUGI_GRZANIE.find((x) => x.id === u)?.label)
      .join(", ") || "—";
  const opcjePompy =
    cena.opcjeBreakdown.map((opcja) => opcja.label).join(", ") || "—";
  const body = [
    `Imię: ${z.name}`,
    `NIP: ${z.nip || "—"}`,
    `Telefon: ${z.phone}`,
    `Email: ${z.email}`,
    `Adres budowy: ${z.adres}`,
    `Termin dostawy: ${z.data}, ${z.godzina}`,
    `Kategoria: ${kat}`,
    `Klasa: ${cena.prod?.label}`,
    `Ilość: ${z.ilosc} m³`,
    `Transport: ${cena.transport?.label}`,
    `Usługi dodatkowe: ${uslugi}`,
    `Pompa: ${cena.pump?.label || "—"}`,
    `Opcje pompy: ${opcjePompy}`,
    `Szacowana cena netto: ${cena.razem} PLN`,
    `Uwagi: ${z.wiadomosc || "—"}`,
  ].join("\r\n");
  const subject = `Zamówienie betonu - ${z.name}`;

  return `mailto:maksymilian@siejkom.pl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
