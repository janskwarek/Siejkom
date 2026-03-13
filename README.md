# Siejkom — Nowa Strona

Nowoczesna strona internetowa zbudowana w React (Create React App).

## 🚀 Uruchomienie

```bash
# 1. Skopiuj ten folder lub utwórz projekt CRA i nadpisz pliki
npx create-react-app siejkom
cd siejkom

# 2. Zainstaluj react-router-dom
npm install react-router-dom

# 3. Skopiuj pliki z tego szkieletu do folderu src/

# 4. Uruchom serwer deweloperski
npm start
```

## 📁 Struktura plików

```
src/
├── components/
│   ├── Navbar/          — Pasek nawigacji (fixed, animowany scroll)
│   ├── Footer/          — Stopka
│   ├── Hero/            — Sekcja hero strony głównej
│   ├── Services/        — 3 karty usług
│   ├── About/           — O firmie z obrazem i statystykami
│   ├── Features/        — 4 karty cech firmy
│   ├── CtaBanner/       — Baner z wezwaniem do działania
│   └── SectionTitle/    — Reusable nagłówek sekcji
├── pages/
│   ├── Home/            — Strona główna
│   ├── Oferta/          — Lista produktów betonowych
│   ├── Transport/       — Flota i zalety transportu
│   ├── Realizacje/      — Portfolio projektów (galeria)
│   └── Kontakt/         — Formularz + dane kontaktowe
├── data/
│   └── company.js       — ⭐ Centralne dane firmy (edytuj tutaj!)
├── hooks/
│   └── useReveal.js     — Hook animacji scroll (IntersectionObserver)
├── styles/
│   └── global.css       — Zmienne CSS, reset, typografia, utilities
└── App.js               — Router + layout
```

## 🎨 Design System

**Estetyka:** Industrial Minimalism

- **Tło:** `#0f0f0f` (głęboka czerń)
- **Akcent:** `#e8a020` (bursztyn / beton)
- **Typografia:** Bebas Neue (display) + DM Sans (body)

## ✏️ Szybka edycja treści

Wszystkie dane firmy (nazwa, telefon, email, usługi, statystyki) znajdują się w:

```
src/data/company.js
```

## 📸 Zdjęcia

Wymień placeholder-owe URL z Unsplash na prawdziwe zdjęcia:

- `src/components/About/About.jsx` — zdjęcie betonu/budowy
- `src/pages/Realizacje/Realizacje.jsx` — zdjęcia realizacji

## 📦 Zależności

- `react-router-dom` — routing
- Google Fonts (Bebas Neue + DM Sans) — ładowane z CDN w `global.css`

## 🔧 TODO przed wdrożeniem

- [ ] Podmień zdjęcia placeholder na własne
- [ ] Podłącz formularz kontaktowy (EmailJS / Formspree / własny backend)
- [ ] Dodaj Google Maps w sekcji kontakt
- [ ] Dodaj prawdziwe realizacje z opisami
- [ ] SEO: uzupełnij meta tagi w `public/index.html`
- [ ] Dodaj favicon (`public/favicon.ico`)
