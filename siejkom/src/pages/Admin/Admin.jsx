import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChartLineUp,
  CheckCircle,
  CloudArrowUp,
  CurrencyCircleDollar,
  FileText,
  FolderOpen,
  House,
  Image,
  List,
  MagnifyingGlass,
  PhoneCall,
  Plus,
  SquaresFour,
  Trash,
  UploadSimple,
  X,
} from "@phosphor-icons/react";
import logo from "../../assets/logo.png";
import img1 from "../../assets/20230809_135439-2048x1153.jpg";
import img2 from "../../assets/20230711_154816-scaled-e1707271925260.jpg";
import img3 from "../../assets/20221130_105841-1-1536x2048.jpg";
import img4 from "../../assets/20230915_170846-2048x1153.jpg";
import img5 from "../../assets/20230718_100748-scaled.jpg";
import img6 from "../../assets/20220706_120424-scaled-e1707272113907-1140x2048.jpg";
import { loadAdminContent, saveAdminContent } from "./adminContentStore";
import {
  KATEGORIE,
  OPCJE_POMPY,
  POMPY,
  PRODUKTY_S1,
  PRODUKTY_S3,
  USLUGI_GRZANIE,
  DEFAULT_PRICE_OVERRIDES,
  DOPLATA_MALE_ZAMOWIENIE,
} from "../Kontakt/cennik";
import { savePriceOverrides } from "./priceOverrides";
import "./Admin.css";

const sections = [
  {
    id: "home",
    label: "Strona główna",
    icon: House,
    title: "Strona główna",
    subtitle:
      "Pierwsze wrażenie ma znaczenie. Zarządzaj treścią strony startowej.",
    fields: [
      {
        key: "headline",
        label: "Nagłówek główny",
        value: "Solidny Beton, Pewna Inwestycja",
        type: "input",
      },
      {
        key: "description",
        label: "Opis",
        value:
          "Specjalizujemy się w produkcji i dostawie betonu bezpośrednio na plac budowy. Własna flota transportowa, nowoczesne technologie i pełna kontrola jakości.",
        type: "textarea",
      },
      {
        key: "button",
        label: "Tekst przycisku",
        value: "Zamów Beton",
        type: "input",
      },
    ],
  },
  {
    id: "offer",
    label: "Oferta",
    icon: FileText,
    title: "Oferta",
    subtitle: "Opisy usług i produktów prezentowanych na stronie.",
    fields: [
      {
        key: "headline",
        label: "Nagłówek strony",
        value: "Beton dopasowany do Twojej inwestycji",
        type: "input",
      },
      {
        key: "description",
        label: "Opis oferty",
        value:
          "Produkujemy beton towarowy, posadzkowy i nawierzchniowy. Dobieramy mieszankę do wymagań każdej budowy.",
        type: "textarea",
      },
      {
        key: "button",
        label: "Tekst przycisku",
        value: "Zapytaj o ofertę",
        type: "input",
      },
    ],
  },
  {
    id: "transport",
    label: "Transport i flota",
    icon: ChartLineUp,
    title: "Transport i flota",
    subtitle: "Informacje o dostawach, sprzęcie i zasięgu usług.",
    fields: [
      {
        key: "headline",
        label: "Nagłówek strony",
        value: "Transport, na którym możesz polegać",
        type: "input",
      },
      {
        key: "description",
        label: "Opis",
        value:
          "Własna flota betonomieszarek, pompogruszek i wywrotek. Dostarczamy beton na terenie całego Śląska.",
        type: "textarea",
      },
      {
        key: "button",
        label: "Tekst przycisku",
        value: "Sprawdź dostępność",
        type: "input",
      },
    ],
  },
  {
    id: "projects",
    label: "Realizacje",
    icon: FolderOpen,
    title: "Realizacje",
    subtitle: "Pokaż projekty i zdjęcia z placów budowy.",
    fields: [
      {
        key: "headline",
        label: "Nagłówek strony",
        value: "Nasze realizacje",
        type: "input",
      },
      {
        key: "description",
        label: "Opis",
        value:
          "Każde zdjęcie to dowód zaangażowania zespołu Siejkom Invest i jakości naszych usług.",
        type: "textarea",
      },
      {
        key: "button",
        label: "Tekst przycisku",
        value: "Zobacz realizacje",
        type: "input",
      },
    ],
  },
  {
    id: "contact",
    label: "Kontakt",
    icon: PhoneCall,
    title: "Kontakt",
    subtitle: "Dane kontaktowe i teksty zachęcające do złożenia zamówienia.",
    fields: [
      {
        key: "headline",
        label: "Nagłówek strony",
        value: "Porozmawiajmy o Twojej budowie",
        type: "input",
      },
      {
        key: "description",
        label: "Opis",
        value:
          "Skontaktuj się z nami — pomożemy dobrać beton, transport i termin dostawy.",
        type: "textarea",
      },
      {
        key: "button",
        label: "Tekst przycisku",
        value: "Wyślij zapytanie",
        type: "input",
      },
    ],
  },
  {
    id: "photos",
    label: "Zdjęcia",
    icon: Image,
    title: "Biblioteka zdjęć",
    subtitle:
      "Zarządzaj zdjęciami wykorzystywanymi na stronie i w realizacjach.",
  },
  {
    id: "pricing",
    label: "Zmiany cennika",
    icon: CurrencyCircleDollar,
    title: "Zmiany cennika",
    subtitle:
      "Aktualizuj ceny betonu, pomp i usług dodatkowych w jednym miejscu.",
  },
];

const initialPhotos = [
  { id: "photo-1", src: img1, name: "Betonowanie osiedla.jpg" },
  { id: "photo-2", src: img2, name: "Fundament płytowy.jpg" },
  { id: "photo-3", src: img3, name: "Posadzka hali.jpg" },
  { id: "photo-4", src: img4, name: "Budowa domu.jpg" },
  { id: "photo-5", src: img5, name: "Dostawa betonu.jpg" },
  { id: "photo-6", src: img6, name: "Pompowanie betonu.jpg" },
];

function PhotosLibrary({ photos, fileInputRef, addPhotos, removePhoto }) {
  return (
    <section className="admin-photos-panel">
      <div className="admin-panel-heading">
        <div>
          <span className="admin-panel-heading__icon">
            <Image size={18} />
          </span>
          <div>
            <h2>Biblioteka zdjęć</h2>
            <p>Zdjęcia przechowywane niezależnie od treści realizacji</p>
          </div>
        </div>
        <button
          className="admin-upload-button"
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          <Plus size={17} weight="bold" />
          Dodaj zdjęcia
        </button>
        <input
          ref={fileInputRef}
          className="admin-file-input"
          type="file"
          accept="image/*"
          multiple
          onChange={addPhotos}
          aria-label="Wybierz zdjęcia do dodania"
        />
      </div>

      {photos.length ? (
        <div className="admin-photo-grid">
          {photos.map((photo, index) => (
            <article
              className="admin-photo-item"
              key={photo.id}
              style={{ "--photo-index": index }}
            >
              <div className="admin-photo-item__image">
                <img src={photo.src} alt={photo.name} />
                <button
                  type="button"
                  onClick={() => removePhoto(photo)}
                  aria-label={`Usuń ${photo.name}`}
                >
                  <Trash size={16} />
                </button>
                {photo.uploaded && (
                  <span className="admin-photo-item__new">NOWE</span>
                )}
              </div>
              <div className="admin-photo-item__caption">
                <span>{photo.name}</span>
                <span>{photo.format || "JPG"}</span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="admin-empty-state">
          <span className="admin-empty-state__icon">
            <Image size={25} />
          </span>
          <h3>Biblioteka jest pusta</h3>
          <p>Dodaj pierwsze zdjęcia z realizacji lub floty.</p>
          <button
            className="admin-upload-button"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadSimple size={17} /> Wybierz pliki
          </button>
        </div>
      )}

      {photos.length > 0 && (
        <div className="admin-photo-footer">
          <span>
            Wyświetlono {photos.length}{" "}
            {photos.length === 1 ? "zdjęcie" : "zdjęć"}
          </span>
          <span>
            Pliki graficzne <ArrowDown size={14} />
          </span>
        </div>
      )}
    </section>
  );
}

function createDefaultPriceDraft() {
  return {
    s1: { ...DEFAULT_PRICE_OVERRIDES.s1 },
    s3: { ...DEFAULT_PRICE_OVERRIDES.s3 },
    pumps: Object.fromEntries(
      Object.entries(DEFAULT_PRICE_OVERRIDES.pumps).map(([id, values]) => [
        id,
        { ...values },
      ]),
    ),
    heating: { ...DEFAULT_PRICE_OVERRIDES.heating },
    pumpOptions: { ...DEFAULT_PRICE_OVERRIDES.pumpOptions },
    transport: { ...DEFAULT_PRICE_OVERRIDES.transport },
  };
}

function createPriceDraft() {
  const collectPrices = (groups) =>
    Object.values(groups)
      .flatMap((products) => products || [])
      .reduce((prices, product) => {
        prices[product.id] = product.price;
        return prices;
      }, {});

  return {
    s1: collectPrices(PRODUKTY_S1),
    s3: collectPrices(PRODUKTY_S3),
    pumps: Object.fromEntries(
      POMPY.filter((pump) => pump.id !== "brak").map((pump) => [
        pump.id,
        {
          rate_m3: pump.rate_m3,
          rate_h: pump.rate_h,
          dojazd: pump.dojazd,
        },
      ]),
    ),
    heating: Object.fromEntries(
      USLUGI_GRZANIE.map((service) => [service.id, service.price_m3]),
    ),
    pumpOptions: Object.fromEntries(
      OPCJE_POMPY.map((option) => [
        option.id,
        option.price_unit ?? option.price_fixed,
      ]),
    ),
    transport: { smallOrder: DOPLATA_MALE_ZAMOWIENIE },
  };
}

function PricingEditor({ prices, setPrices, onReset }) {
  const [priceList, setPriceList] = useState("s1");
  const [category, setCategory] = useState(KATEGORIE[0].id);
  const products = (priceList === "s1" ? PRODUKTY_S1 : PRODUKTY_S3)[category] || [];

  const updateProductPrice = (productId, value) => {
    setPrices((current) => ({
      ...current,
      [priceList]: { ...current[priceList], [productId]: value },
    }));
  };

  const updateServicePrice = (group, id, key, value) => {
    setPrices((current) => ({
      ...current,
      [group]: {
        ...current[group],
        [id]:
          typeof current[group][id] === "object"
            ? { ...current[group][id], [key]: value }
            : value,
      },
    }));
  };

  const groupLabels = {
    towarowy: "Beton towarowy",
    posadzkowy: "Beton posadzkowy",
    nawierzchniowy: "Beton nawierzchniowy",
    stabilizacje: "Stabilizacje / podsypki",
  };

  return (
    <div className="admin-pricing">
      <section className="admin-pricing-summary">
        <div className="admin-pricing-summary__intro">
          <span className="admin-pricing-summary__icon">
            <CurrencyCircleDollar size={21} />
          </span>
          <div>
            <h2>Cennik produktów i usług</h2>
            <p>
              Ceny są netto. Zapisane stawki będą używane w kalkulatorze
              zamówienia i na stronie oferty po jej ponownym załadowaniu.
            </p>
          </div>
        </div>
        <div className="admin-pricing-summary__meta">
          <span className="admin-pricing-summary__dot" />
          PLN <span>/</span> m³
        </div>
      </section>

      <section className="admin-price-panel">
        <div className="admin-price-panel__header">
          <div>
            <span className="admin-price-panel__eyebrow">CENNIK BETONU</span>
            <h2>Wybierz cennik i kategorię</h2>
          </div>
          <div className="admin-price-switch" role="tablist" aria-label="Rodzaj cennika">
            <button
              className={priceList === "s1" ? "admin-price-switch__active" : ""}
              type="button"
              role="tab"
              aria-selected={priceList === "s1"}
              onClick={() => setPriceList("s1")}
            >
              Loco wytwórnia <span>S1</span>
            </button>
            <button
              className={priceList === "s3" ? "admin-price-switch__active" : ""}
              type="button"
              role="tab"
              aria-selected={priceList === "s3"}
              onClick={() => setPriceList("s3")}
            >
              Franco budowa <span>S3</span>
            </button>
          </div>
        </div>

        <div className="admin-price-categories" role="tablist" aria-label="Kategoria betonu">
          {KATEGORIE.map((item) => {
            const available = (priceList === "s1" ? PRODUKTY_S1 : PRODUKTY_S3)[item.id];
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={category === item.id}
                disabled={!available}
                className={`${category === item.id ? "admin-price-category--active" : ""}${!available ? " admin-price-category--disabled" : ""}`}
                onClick={() => setCategory(item.id)}
              >
                <span>{groupLabels[item.id]}</span>
                {available && <small>{available.length} pozycji</small>}
                {!available && <small>Brak cennika S3</small>}
              </button>
            );
          })}
        </div>

        <div className="admin-price-table-wrap">
          <table className="admin-price-table">
            <thead>
              <tr>
                <th scope="col">Produkt</th>
                <th scope="col">Cena netto</th>
                <th scope="col">Jednostka</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <th scope="row">
                    <span className="admin-price-product__name">{product.label}</span>
                    <span className="admin-price-product__id">ID: {product.id}</span>
                  </th>
                  <td>
                    <label className="admin-price-input">
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={prices[priceList][product.id] ?? product.price}
                        onChange={(event) => updateProductPrice(product.id, event.target.value)}
                        aria-label={`Cena produktu ${product.label}`}
                      />
                      <span>PLN</span>
                    </label>
                  </td>
                  <td><span className="admin-price-unit">za m³</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="admin-price-panel__footer">
          <span>{products.length} {products.length === 1 ? "produkt" : "produktów"} w kategorii</span>
          <span>Ceny podawane są w złotych netto</span>
        </div>
      </section>

      <section className="admin-price-panel admin-price-panel--services">
        <div className="admin-price-panel__header">
          <div>
            <span className="admin-price-panel__eyebrow">TRANSPORT I POMPOWANIE</span>
            <h2>Stawki usług dodatkowych</h2>
          </div>
          <span className="admin-price-panel__count">
            {POMPY.length - 1 +
              USLUGI_GRZANIE.length +
              OPCJE_POMPY.length +
              1}{" "}
            pozycji
          </span>
        </div>

        <div className="admin-service-prices">
          <div className="admin-service-group">
            <div className="admin-service-group__heading">
              <h3>Pompy do betonu</h3>
              <p>Stawki za m³, godzinę pracy i dojazd</p>
            </div>
            <div className="admin-service-table-wrap">
              <table className="admin-service-table">
                <thead>
                  <tr><th>Usługa</th><th>PLN / m³</th><th>PLN / h</th><th>Dojazd</th></tr>
                </thead>
                <tbody>
                  {POMPY.filter((pump) => pump.id !== "brak").map((pump) => (
                    <tr key={pump.id}>
                      <th scope="row">{pump.label}</th>
                      {["rate_m3", "rate_h", "dojazd"].map((key) => (
                        <td key={key}>
                          <label className="admin-service-input">
                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={prices.pumps[pump.id][key]}
                              onChange={(event) => updateServicePrice("pumps", pump.id, key, event.target.value)}
                              aria-label={`${pump.label}, ${key}`}
                            />
                            <span>zł</span>
                          </label>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admin-service-group">
            <div className="admin-service-group__heading">
              <h3>Dodatki do betonu</h3>
              <p>Stawka doliczana do każdego metra sześciennego</p>
            </div>
            <div className="admin-service-list">
              {USLUGI_GRZANIE.map((service) => (
                <div className="admin-service-row" key={service.id}>
                  <div><strong>{service.label}</strong><span>{service.opis}</span></div>
                  <label className="admin-service-input">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={prices.heating[service.id]}
                      onChange={(event) => updateServicePrice("heating", service.id, null, event.target.value)}
                      aria-label={`Cena: ${service.label}`}
                    />
                    <span>PLN / m³</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-service-group">
            <div className="admin-service-group__heading">
              <h3>Opcje pompy</h3>
              <p>Dodatkowe elementy i dostawa rurociągu</p>
            </div>
            <div className="admin-service-list">
              {OPCJE_POMPY.map((option) => (
                <div className="admin-service-row" key={option.id}>
                  <div><strong>{option.label}</strong><span>{option.opis}</span></div>
                  <label className="admin-service-input">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={prices.pumpOptions[option.id]}
                      onChange={(event) => updateServicePrice("pumpOptions", option.id, null, event.target.value)}
                      aria-label={`Cena: ${option.label}`}
                    />
                    <span>{option.unit}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-service-group">
            <div className="admin-service-group__heading">
              <h3>Transport betonu</h3>
              <p>Dopłata dla dostawy małego zamówienia</p>
            </div>
            <div className="admin-service-list">
              <div className="admin-service-row">
                <div>
                  <strong>Małe zamówienie gruszką</strong>
                  <span>Dostawa betonu w ilości poniżej 6 m³</span>
                </div>
                <label className="admin-service-input">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={prices.transport.smallOrder}
                    onChange={(event) =>
                      setPrices((current) => ({
                        ...current,
                        transport: {
                          ...current.transport,
                          smallOrder: event.target.value,
                        },
                      }))
                    }
                    aria-label="Dopłata za małe zamówienie gruszką"
                  />
                  <span>PLN</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="admin-pricing-footer">
        <p>
          Zmiany zapisują się w tej przeglądarce. Po publikacji backendu można
          podłączyć ten sam formularz do centralnego cennika.
        </p>
        <button type="button" onClick={onReset}>Przywróć cennik bazowy</button>
      </div>
    </div>
  );
}

export default function Admin() {
  const [activeSection, setActiveSection] = useState("home");
  const [content, setContent] = useState({});
  const [prices, setPrices] = useState(createPriceDraft);
  const [photos, setPhotos] = useState(initialPhotos);
  const [saveState, setSaveState] = useState("saved");
  const [notice, setNotice] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const fileInputRef = useRef(null);
  const photosRef = useRef(photos);
  photosRef.current = photos;
  const currentSection = sections.find(
    (section) => section.id === activeSection,
  );
  const isPhotoLibrary = activeSection === "photos";
  const isPricing = activeSection === "pricing";

  useEffect(() => {
    try {
      setContent(loadAdminContent());
    } catch {
      setNotice("Nie udało się odczytać zapisanych treści z tej przeglądarki.");
    }

    return () => {
      photosRef.current
        .filter((photo) => photo.uploaded)
        .forEach((photo) => URL.revokeObjectURL(photo.src));
    };
  }, []);

  useEffect(() => {
    if (!notice) return undefined;
    const timeout = window.setTimeout(() => setNotice(""), 5000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const updateField = (sectionId, key, value) => {
    setContent((current) => ({
      ...current,
      [sectionId]: { ...current[sectionId], [key]: value },
    }));
    setSaveState("unsaved");
  };

  const saveContent = () => {
    try {
      saveAdminContent(content);
      setSaveState("saved");
      setNotice("Zmiany zapisane w tej przeglądarce.");
    } catch {
      setSaveState("error");
      setNotice(
        "Nie udało się zapisać zmian. Sprawdź ustawienia pamięci przeglądarki.",
      );
    }
  };

  const updatePrices = (updater) => {
    setPrices(updater);
    setSaveState("unsaved");
  };

  const resetPrices = () => {
    setPrices(createDefaultPriceDraft());
    setSaveState("unsaved");
  };

  const savePrices = () => {
    try {
      const parseValue = (value) => {
        const parsed = Number(value);
        if (String(value).trim() === "" || !Number.isFinite(parsed) || parsed < 0) {
          throw new Error("Invalid price");
        }
        return parsed;
      };
      const validatedPrices = {
        s1: Object.fromEntries(Object.entries(prices.s1).map(([id, value]) => [id, parseValue(value)])),
        s3: Object.fromEntries(Object.entries(prices.s3).map(([id, value]) => [id, parseValue(value)])),
        pumps: Object.fromEntries(
          Object.entries(prices.pumps).map(([id, values]) => [
            id,
            Object.fromEntries(Object.entries(values).map(([key, value]) => [key, parseValue(value)])),
          ]),
        ),
        heating: Object.fromEntries(Object.entries(prices.heating).map(([id, value]) => [id, parseValue(value)])),
        pumpOptions: Object.fromEntries(Object.entries(prices.pumpOptions).map(([id, value]) => [id, parseValue(value)])),
        transport: {
          smallOrder: parseValue(prices.transport.smallOrder),
        },
      };
      savePriceOverrides(validatedPrices);
      setPrices(validatedPrices);
      setSaveState("saved");
      setNotice("Nowy cennik zapisany. Kalkulator i oferta użyją tych stawek po ponownym załadowaniu strony.");
    } catch (error) {
      if (error.message === "Invalid price") {
        setSaveState("error");
        setNotice("Każda cena musi być liczbą większą lub równą zero.");
        return;
      }
      setSaveState("error");
      setNotice("Nie udało się zapisać cennika w tej przeglądarce.");
    }
  };

  const addPhotos = (event) => {
    const files = Array.from(event.target.files || []);
    const invalidFiles = files.filter(
      (file) => !file.type.startsWith("image/"),
    );
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (invalidFiles.length)
      setNotice("Pominięto pliki, które nie są obrazami.");
    if (imageFiles.length) {
      const newPhotos = imageFiles.map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        src: URL.createObjectURL(file),
        name: file.name,
        format: file.name.split(".").pop().toUpperCase(),
        uploaded: true,
      }));
      setPhotos((current) => [...newPhotos, ...current]);
      setNotice(
        `${imageFiles.length} ${imageFiles.length === 1 ? "zdjęcie dodane" : "zdjęcia dodane"} do podglądu.`,
      );
    }
    event.target.value = "";
  };

  const removePhoto = (photo) => {
    if (photo.uploaded) URL.revokeObjectURL(photo.src);
    setPhotos((current) => current.filter((item) => item.id !== photo.id));
  };

  const resetSection = () => {
    setContent((current) => ({ ...current, [activeSection]: undefined }));
    setSaveState("unsaved");
  };

  return (
    <div className="admin">
      <aside
        className={`admin-sidebar ${mobileNavOpen ? "admin-sidebar--open" : ""}`}
      >
        <div className="admin-sidebar__brand">
          <img src={logo} alt="Siejkom" />
          <span className="admin-sidebar__label">PANEL CMS</span>
          <button
            className="admin-icon-button admin-sidebar__close"
            type="button"
            aria-label="Zamknij menu"
            onClick={() => setMobileNavOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="admin-sidebar__group-label">ZARZĄDZANIE</div>
        <nav className="admin-sidebar__nav" aria-label="Sekcje panelu">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              className={`admin-nav-link ${activeSection === id ? "admin-nav-link--active" : ""}`}
              key={id}
              type="button"
              onClick={() => {
                setActiveSection(id);
                setMobileNavOpen(false);
              }}
            >
              <Icon
                size={19}
                weight={activeSection === id ? "fill" : "regular"}
              />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar__bottom">
          <a className="admin-back-link" href="/">
            <ArrowUpRight size={17} />
            <span>Wróć na stronę</span>
          </a>
        </div>
      </aside>

      {mobileNavOpen && (
        <button
          className="admin-backdrop"
          type="button"
          aria-label="Zamknij menu"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar__left">
            <button
              className="admin-icon-button admin-menu-toggle"
              type="button"
              aria-label="Otwórz menu"
              onClick={() => setMobileNavOpen(true)}
            >
              <List size={22} />
            </button>
            <div className="admin-breadcrumb">
              <span>Panel</span>
              <span className="admin-breadcrumb__slash">/</span>
              <strong>{currentSection.label}</strong>
            </div>
          </div>
          <div className="admin-topbar__right">
            <a
              className="admin-preview-link"
              href="/"
              target="_blank"
              rel="noreferrer"
            >
              <span>Wróć do strony</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </header>

        <div className="admin-content">
          <section className="admin-page-heading">
            <div>
              <p className="admin-eyebrow">
                ZARZĄDZANIE TREŚCIĄ I CENNIKIEM
              </p>
              <h1>{currentSection.title}</h1>
              <p className="admin-page-heading__description">
                {currentSection.subtitle}
              </p>
            </div>
            {!isPhotoLibrary && (
              <div className="admin-heading-actions">
                <div
                  className={`admin-save-status admin-save-status--${saveState}`}
                >
                  <span />
                  {saveState === "unsaved"
                    ? "Niezapisane zmiany"
                    : saveState === "error"
                      ? "Błąd zapisu"
                      : "Wszystko zapisane"}
                </div>
                <button
                  className="admin-save-button"
                  type="button"
                  onClick={isPricing ? savePrices : saveContent}
                >
                  <Check size={17} weight="bold" />
                  Zapisz zmiany
                </button>
              </div>
            )}
          </section>

          {notice && (
            <div
              className={`admin-notice ${saveState === "error" ? "admin-notice--error" : ""}`}
              role="status"
            >
              <CheckCircle size={18} />
              <span>{notice}</span>
              <button
                type="button"
                aria-label="Zamknij komunikat"
                onClick={() => setNotice("")}
              >
                <X size={17} />
              </button>
            </div>
          )}

          {isPhotoLibrary ? (
            <PhotosLibrary
              photos={photos}
              fileInputRef={fileInputRef}
              addPhotos={addPhotos}
              removePhoto={removePhoto}
            />
          ) : isPricing ? (
            <PricingEditor
              prices={prices}
              setPrices={updatePrices}
              onReset={resetPrices}
            />
          ) : (
            <div className="admin-dashboard-grid">
              <section className="admin-editor-panel">
                <div className="admin-panel-heading">
                  <div>
                    <span className="admin-panel-heading__icon">
                      <FileText size={17} />
                    </span>
                    <div>
                      <h2>Treści na stronie</h2>
                      <p>Wybierz tekst i wprowadź własne zmiany</p>
                    </div>
                  </div>
                  <span className="admin-editing-label">EDYCJA</span>
                </div>

                <div className="admin-fields">
                  {currentSection.fields.map((field) => {
                    const value =
                      content[activeSection]?.[field.key] ?? field.value;
                    return (
                      <label className="admin-field" key={field.key}>
                        <span className="admin-field__label">
                          {field.label}
                        </span>
                        {field.type === "textarea" ? (
                          <textarea
                            value={value}
                            onChange={(event) =>
                              updateField(
                                activeSection,
                                field.key,
                                event.target.value,
                              )
                            }
                            rows={5}
                          />
                        ) : (
                          <input
                            type="text"
                            value={value}
                            onChange={(event) =>
                              updateField(
                                activeSection,
                                field.key,
                                event.target.value,
                              )
                            }
                          />
                        )}
                        <span className="admin-field__helper">
                          Zmiana pojawi się po zapisaniu.
                        </span>
                      </label>
                    );
                  })}
                </div>

                <div className="admin-editor-footer">
                  <span>
                    <CheckCircle size={16} /> Edytujesz: {currentSection.label}
                  </span>
                  <button type="button" onClick={resetSection}>
                    Przywróć domyślne
                  </button>
                </div>
              </section>

              <aside className="admin-side-column">
                <section className="admin-preview-panel">
                  <div className="admin-panel-heading admin-panel-heading--compact">
                    <div>
                      <span className="admin-panel-heading__icon">
                        <SquaresFour size={17} />
                      </span>
                      <div>
                        <h2>Teoretyczny podgląd treści</h2>
                        <p>Tak zobaczy ją odwiedzający</p>
                      </div>
                    </div>
                    <MagnifyingGlass size={17} className="admin-muted-icon" />
                  </div>
                  <div className="admin-live-preview">
                    <div className="admin-live-preview__bar">
                      <div className="admin-browser-dots">
                        <i />
                        <i />
                        <i />
                      </div>
                      <span>siejkom.pl</span>
                      <ArrowUpRight size={13} />
                    </div>
                    <div className="admin-live-preview__content">
                      <span className="admin-live-preview__tag">
                        SIEJKOM INVEST
                      </span>
                      <h3>
                        {content[activeSection]?.headline ??
                          currentSection.fields[0].value}
                      </h3>
                      <p>
                        {content[activeSection]?.description ??
                          currentSection.fields.find(
                            (field) => field.key === "description",
                          ).value}
                      </p>
                      <span className="admin-live-preview__button">
                        {content[activeSection]?.button ??
                          currentSection.fields.find(
                            (field) => field.key === "button",
                          ).value}
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </section>

                <section className="admin-help-panel">
                  <span className="admin-help-panel__icon">
                    <CloudArrowUp size={21} />
                  </span>
                  <div>
                    <h3>Twoje zmiany są bezpieczne</h3>
                    <p>
                      Treści zapisują się lokalnie w tej przeglądarce. Dodane
                      zdjęcia są podglądem w bieżącej sesji.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveSection("photos")}
                    >
                      Przejdź do zdjęć <ArrowUpRight size={14} />
                    </button>
                  </div>
                </section>
              </aside>
            </div>
          )}

          <footer className="admin-footer">
            <span>© 2026 Siejkom Invest</span>
            <span>
              Panel zarządzania treścią <span className="admin-footer__dot" />{" "}
              Wersja robocza
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}
