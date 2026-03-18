// src/data/company.js — edytuj tutaj

export const COMPANY = {
  name:    'Siejkom',
  tagline: 'Produkcja Betonu & Transport',
  phone:   '+48 537 37 37 37',
  email:   'biuro@siejkombetony.pl',
  email2:  'maksymilian@siejkom.pl',
  founded: 2015,
  addresses: [
    { label: 'Wytwórnia',  full: 'ul. Parkowa 11, 41-940 Piekary Śląskie, woj. śląskie' },
    { label: 'Biuro',      full: 'ul. Towarowa 9, 41-103 Siemianowice Śląskie, woj. śląskie' },
  ],
};

export const NAV_LINKS = [
  { label: 'Strona Główna', path: '/'           },
  { label: 'Oferta',        path: '/oferta'      },
  { label: 'Flota',         path: '/transport'   },
  { label: 'Realizacje',    path: '/realizacje'  },
  { label: 'Zamów Beton',   path: '/kontakt'     },
];

export const FEATURES = [
  {
    id: 1,
    icon: '◈',
    title: 'Jakość Bez Kompromisów',
    desc: 'Stosujemy wyłącznie najlepsze materiały z aktualnymi dopuszczeniami i świadectwami jakości. Produkty regularnie kontrolowane zgodnie z normami.',
  },
  {
    id: 2,
    icon: '◉',
    title: 'Nowoczesne Technologie',
    desc: 'Zaawansowane technologie produkcji i wykwalifikowany zespół zapewniają najwyższe standardy jakościowe każdej partii betonu.',
  },
  {
    id: 3,
    icon: '◎',
    title: 'Terminowość Dostaw',
    desc: 'Własna flota betonowozów, pompogruszek i wywrotek gwarantuje terminowe dostawy na każdą inwestycję na Śląsku.',
  },
  {
    id: 4,
    icon: '◇',
    title: 'Elastyczność i Ceny',
    desc: 'Konkurencyjne ceny i elastyczność w realizacji zamówień — od małych inwestycji prywatnych po duże projekty komercyjne.',
  },
];

export const STATS = [
  { value: '10+',  label: 'Lat doświadczenia'  },
  { value: '2',    label: 'Lokalizacje Śląsk'   },
  { value: '100%', label: 'Kontrola jakości'    },
  { value: '32–52mb', label: 'Zasięg pomp'      },
];

export const SERVICES = [
  {
    id:    'beton',
    title: 'Produkcja Betonu',
    desc:  'Kompleksowa produkcja betonu — od towarowego C8/10 do C50/60, przez posadzkowy, nawierzchniowy, po stabilizacje SCP. Własne środki transportu.',
    link:  '/oferta',
  },
  {
    id:    'transport',
    title: 'Transport i Flota',
    desc:  'Własna flota betonowozów (gruszek), pompogruszek i wywrotek. Terminowe dostawy na terenie Śląska — inwestycje prywatne i komercyjne.',
    link:  '/transport',
  },
  {
    id:    'pompowanie',
    title: 'Pompowanie Betonu',
    desc:  'Pompy o zasięgu ramion 32–52 mb do trudno dostępnych miejsc i wyższych kondygnacji. Sprawne pompowanie w pionie i poziomie.',
    link:  '/kontakt',
  },
];
