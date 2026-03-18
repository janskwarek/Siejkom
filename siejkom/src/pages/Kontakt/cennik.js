// src/pages/Kontakt/cennik.js
// Wszystkie stałe cennikowe — edytuj tutaj gdy zmienia się cennik

export const KATEGORIE = [
  {
    id: "towarowy",
    label: "Beton towarowy",
    icon: "◉",
    opis: "Fundamenty, słupy, belki",
  },
  {
    id: "posadzkowy",
    label: "Beton posadzkowy",
    icon: "◉",
    opis: "Posadzki przemysłowe",
  },
  {
    id: "nawierzchniowy",
    label: "Beton nawierzchniowy",
    icon: "◉",
    opis: "Drogi, place, parkingi",
  },
  {
    id: "stabilizacje",
    label: "Stabilizacje / Podsypki",
    icon: "◉",
    opis: "SCP, podbudowy",
  },
];

// S1 = loco wytwórnia
export const PRODUKTY_S1 = {
  towarowy: [
    { id: "c8s1", label: "C 8/10 S1", price: 325 },
    { id: "c12s1", label: "C 12/15 S1", price: 335 },
    { id: "c16s1", label: "C 16/20 S1", price: 345 },
    { id: "c20s1", label: "C 20/25 S1", price: 355 },
    { id: "c25s1", label: "C 25/30 S1", price: 365 },
  ],
  posadzkowy: [
    { id: "c16s1p", label: "C 16/20 S1", price: 345 },
    { id: "c20s1p", label: "C 20/25 S1", price: 355 },
    { id: "c25s1p", label: "C 25/30 S1", price: 365 },
  ],
  nawierzchniowy: [
    { id: "c16s1n", label: "C 16/20 S1", price: 345 },
    { id: "c20s1n", label: "C 20/25 S1", price: 355 },
    { id: "c25s1n", label: "C 25/30 S1", price: 365 },
    { id: "c30s1n", label: "C 30/37 S1", price: 375 },
  ],
  stabilizacje: [
    { id: "scp12", label: "SCP 1:2", price: 390 },
    { id: "scp14", label: "SCP 1:4", price: 300 },
    { id: "scp16", label: "SCP 1:6", price: 290 },
    { id: "scp18", label: "SCP 1:8", price: 280 },
    { id: "scp05", label: "SCP 0,5 – 1,5 MPa", price: 220 },
    { id: "scp15", label: "SCP 1,5 – 2,5 MPa", price: 225 },
    { id: "scp25", label: "SCP 2,5 – 5,0 MPa", price: 235 },
  ],
};

// S3 = franco budowa do 15 km (tylko przy gruszce)
export const PRODUKTY_S3 = {
  towarowy: [
    { id: "c8s3", label: "C 8/10 S3", price: 365 },
    { id: "c12s3", label: "C 12/15 S3", price: 375 },
    { id: "c16s3", label: "C 16/20 S3", price: 385 },
    { id: "c20s3", label: "C 20/25 S3", price: 395 },
    { id: "c25s3", label: "C 25/30 S3", price: 410 },
    { id: "c30s3", label: "C 30/37 S3", price: 425 },
  ],
  posadzkowy: [
    { id: "c16s3p", label: "C 16/20 S3", price: 385 },
    { id: "c20s3p", label: "C 20/25 S3", price: 395 },
    { id: "c25s3p", label: "C 25/30 S3", price: 410 },
    { id: "c30s3p", label: "C 30/37 S3", price: 425 },
  ],
  nawierzchniowy: [
    { id: "c8s3n", label: "C 8/10 S3", price: 365 },
    { id: "c12s3n", label: "C 12/15 S3", price: 375 },
    { id: "c16s3n", label: "C 16/20 S3", price: 385 },
    { id: "c20s3n", label: "C 20/25 S3", price: 395 },
    { id: "c25s3n", label: "C 25/30 S3", price: 410 },
    { id: "c30s3n", label: "C 30/37 S3", price: 425 },
  ],
  stabilizacje: null,
};

// Transport dostępny per kategoria
export const TRANSPORT_MAP = {
  towarowy: ["własny", "gruszka", "wywrotka"],
  posadzkowy: ["gruszka"],
  nawierzchniowy: ["gruszka"],
  stabilizacje: ["własny", "wywrotka"],
};

export const TRANSPORT_OPCJE = [
  {
    id: "własny",
    label: "Własny odbiór",
    opis: "Odbiór z wytwórni — cena loco",
    icon: "🏗",
  },
  {
    id: "gruszka",
    label: "Gruszka",
    opis: "Dostawa betonomieszarką — franco",
    icon: "🚛",
  },
  {
    id: "wywrotka",
    label: "Wywrotka",
    opis: "Dostawa wywrotką — franco",
    icon: "🚚",
  },
];

// Pompy — rozliczenie za h (poniżej 50 m³) lub za m³ (od 50 m³)
export const POMPY = [
  { id: "brak", label: "Bez pompy", rate_m3: 0, rate_h: 0, dojazd: 0 },
  { id: "p32", label: "Pompa 32 mb", rate_m3: 20, rate_h: 350, dojazd: 300 },
  { id: "p40", label: "Pompa 40 mb", rate_m3: 25, rate_h: 380, dojazd: 350 },
  { id: "p50", label: "Pompa 50 mb", rate_m3: 29, rate_h: 450, dojazd: 450 },
  { id: "p52", label: "Pompa 52 mb", rate_m3: 29, rate_h: 450, dojazd: 450 },
];

// Próg m³/h dla pompy (wg cennika— min. 50 m³ dla stawki za m³ -> z polecenia 15 za m³)
export const POMPA_PROG_M3 = 15;

// Usługi dodatkowe — grzanie zimowe
export const USLUGI_GRZANIE = [
  {
    id: "grzanie_temp",
    label: "+5°C do −10°C",
    opis: "Grzanie betonu w warunkach zimowych (temp. mierzona o 7:00 na wytwórni)",
    price_m3: 25,
  },
  {
    id: "grzanie_mrozowy",
    label: "Dodatek p/mrozowy",
    opis: "Dodatek przeciwmrozowy — na życzenie klienta",
    price_m3: 25,
  },
];

// Opcje dodatkowe pompy
export const OPCJE_POMPY = [
  {
    id: "weze_gumowe",
    label: "Dodatkowe węże gumowe",
    opis: "35 PLN za każdy metr bieżący (maks. 50 mb)",
    typ: "mb",
    price_unit: 35,
    unit: "PLN/mb",
  },
  {
    id: "rurociag",
    label: "Dostawa rurociągu (powyżej 15 mb)",
    opis: "Jednorazowa opłata 800 PLN",
    typ: "checkbox",
    price_fixed: 800,
    unit: "PLN",
  },
];
