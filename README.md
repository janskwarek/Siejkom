# Siejkom Invest - Strona Internetowa

Projekt strony internetowej dla firmy **Siejkom Invest**, producenta betonu działającego na terenie Śląska (Piekary Śląskie, Siemianowice Śląskie). Aplikacja służy jako wizytówka firmowa, prezentująca ofertę, realizacje, flotę transportową oraz umożliwiająca kontakt z firmą.

## 🛠 Technologie i Narzędzia

Projekt został stworzony przy użyciu **React** (Create React App) z wykorzystaniem nowoczesnych narzędzi i bibliotek front-endowych:

- **React 18** - biblioteka do budowy interfejsów użytkownika.
- **React Router v6** - do obsługi nawigacji (Single Page Application).
- **React Helmet Async** - do dynamicznego zarządzania tagami meta i optymalizacji SEO w widokach SPA.
- **EmailJS** - do bezpiecznej obsługi formularza kontaktowego bez konieczności utrzymywania własnego backendu.

## 📁 Struktura Projektu

Główny kod aplikacji znajduje się w folderze `src/`.

- `src/components/` - uniwersalne, reużywalne komponenty interfejsu wizualnego (np. `Navbar`, `Footer`, `Hero`, `CtaBanner`, `Features`, `MapSection`, `Services`).
- `src/pages/` - główne widoki/podstrony, podpięte bezpośrednio pod system routingu:
  - `Home` - Strona główna.
  - `Oferta` - Szczegółowa oferta firmy (beton towarowy, posadzkowy, stabilizacje SCP itp.).
  - `Transport` - Informacje o flocie pojazdów (np. transport i pompowanie).
  - `Realizacje` - Prezentacja zrealizowanych projektów.
  - `Kontakt` - Formularz kontaktowy i dane teleadresowe.
- `src/data/` - pliki przechowujące statyczne dane (np. konfiguracja, stałe treści na podstrony).
- `src/styles/` - pliki globalnych stylów (np. `global.css`).
- `src/hooks/` - customowe hooki React (narzędzia ponownego użycia logiki).
- `src/assets/` - grafiki, ikony, zdjęcia statyczne i inne zasoby wizualne.

## 🚀 Uruchomienie lokalne

Aby uruchomić projekt na własnym środowisku, wykonaj poniższe kroki.

### Wymagania wstępne
- Zainstalowane środowisko **Node.js** (zalecana wersja LTS) oraz menedżer pakietów **npm**.

### Instalacja i start

1. Zainstaluj zależności:
   ```bash
   npm install
   ```

2. Uruchom aplikację w trybie deweloperskim:
   ```bash
   npm start
   ```

Aplikacja będzie dostępna pod adresem [http://localhost:3000](http://localhost:3000). Strona odświeży się automatycznie po zapisaniu jakichkolwiek zmian. Błędy lintera pojawią się w logach konsoli.

## 📦 Budowanie do produkcji

Aby przygotować zoptymalizowaną (zminifikowaną) wersję aplikacji gotową do wdrożenia (np. na serwer hostingowy):

```bash
npm run build
```

Pliki gotowe do wdrożenia zostaną wygenerowane w folderze `build/`. Bundle reacta zostanie zoptymalizowany dla jak najwyższej wydajności, a pliki otrzymają hashe gwarantujące odświeżenie cache'u docelowych użytkowników.

## 🌍 SEO i Meta Tagi

Projekt posiada wdrożone zaawansowane dobre praktyki SEO – w głównym pliku `public/index.html` umieszczono odpowiednie opisy oraz metadane ustrukturyzowane w formacie **Schema.org** (LocalBusiness), z uwzględnieniem danych teleadresowych (Piekary Śląskie, Siemianowice Śląskie), godzin otwarcia oraz obszaru działalności i współrzędnych geograficznych. Pozostałe specyficzne meta-tagi dla podstron są zmieniane w locie za pomocą biblioteki `Helmet`.żż
