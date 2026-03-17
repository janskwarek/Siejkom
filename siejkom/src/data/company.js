// src/data/company.js
// Centralne dane firmy — edytuj w jednym miejscu

export const COMPANY = {
  name: "Siejkom",
  tagline: "Beton & Deweloper",
  phone: "+48 537 37 37 37",
  email: "biuro@siejkombetony.pl",
  email2: "maksymilian@siejkom.pl",
  address: "Piekary Śląskie, Śląsk",
  founded: 2015,
};

export const NAV_LINKS = [
  { label: "Strona Główna", path: "/" },
  { label: "Oferta", path: "/oferta" },
  { label: "Flota", path: "/transport" },
  { label: "Realizacje", path: "/realizacje" },
  { label: "Zamów Beton", path: "/kontakt" },
];

export const FEATURES = [
  {
    id: 1,
    icon: "◈",
    title: "Nowoczesny Design",
    desc: "Innowacyjne projekty z ergonomicznym układem, dostosowane do różnorodnych potrzeb inwestora.",
  },
  {
    id: 2,
    icon: "◉",
    title: "Nowoczesne Technologie",
    desc: "Najwyższa jakość budynków dzięki zaawansowanym technologiom i bezpiecznym inwestycjom.",
  },
  {
    id: 3,
    icon: "◎",
    title: "Terminowość i Ceny",
    desc: "Elastyczność i terminowość w realizacji zamówień oraz konkurencyjne ceny dla każdego projektu.",
  },
  {
    id: 4,
    icon: "◇",
    title: "Jakość Bez Kompromisów",
    desc: "Produkty spełniające wszystkie normy, regularnie kontrolowane pod względem jakości.",
  },
];

export const STATS = [
  { value: "9+", label: "Lat Doświadczenia" },
  { value: "500+", label: "Zrealizowanych Projektów" },
  { value: "100%", label: "Zadowolonych Klientów" },
  { value: "24/7", label: "Wsparcie Techniczne" },
];

export const SERVICES = [
  {
    id: "beton",
    title: "Produkcja Betonu",
    desc: "Specjalizujemy się w produkcji i dostarczeniu betonu najwyższej jakości. Korzystamy z wysokiej klasy surowców i nowoczesnych technologii.",
    link: "/oferta",
  },
  {
    id: "transport",
    title: "Transport",
    desc: "Profesjonalny transport materiałów budowlanych na terenie Śląska i okolic. Terminowość gwarantowana.",
    link: "/transport",
  },
  {
    id: "deweloper",
    title: "Deweloper",
    desc: "Budujemy nowoczesne domy i inwestycje dopasowane do marzeń klientów — od projektu do gotowego klucza.",
    link: "/realizacje",
  },
];
