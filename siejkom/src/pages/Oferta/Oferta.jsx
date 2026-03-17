// src/pages/Oferta/Oferta.jsx
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import CtaBanner from "../../components/CtaBanner/CtaBanner";
import { useReveal } from "../../hooks/useReveal";
import "./Oferta.css";

const PRODUCTS = [
  {
    name: "Beton C16/20",
    use: "Fundamenty, posadzki",
    desc: "Beton ogólnego zastosowania, idealny do fundamentów i podkładów pod posadzki.",
  },
  {
    name: "Beton C20/25",
    use: "Stropy, schody",
    desc: "Uniwersalny beton konstrukcyjny stosowany do stropów, schodów i belek.",
  },
  {
    name: "Beton C25/30",
    use: "Słupy, ściany",
    desc: "Beton o wysokiej wytrzymałości do elementów silnie obciążonych.",
  },
  {
    name: "Beton C30/37",
    use: "Hale, mosty",
    desc: "Beton wysokowytrzymały dla obiektów przemysłowych i infrastrukturalnych.",
  },
  {
    name: "Beton Wodoszczelny",
    use: "Baseny, piwnice",
    desc: "Specjalna mieszanka odporna na przenikanie wody — do obiektów podziemnych.",
  },
  {
    name: "Beton Pompowany",
    use: "Trudno dostępne miejsca",
    desc: "Mieszanka o podwyższonej ciekłości, przystosowana do pompowania na duże odległości.",
  },
];

function ProductCard({ product, index }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="product-card reveal"
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <span className="product-card__use">{product.use}</span>
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__desc">{product.desc}</p>
      <a href="/kontakt" className="product-card__cta">
        Zamów →
      </a>
    </div>
  );
}

export default function Oferta() {
  return (
    <>
      {/* Page hero */}
      <div className="page-hero">
        <div className="container">
          <p className="page-hero__eyebrow">Oferta</p>
          <h1 className="page-hero__title">Nasze Produkty</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Asortyment"
            title={
              <>
                Beton na
                <br />
                Każdą Potrzebę
              </>
            }
            subtitle="Oferujemy szeroki asortyment betonów towarowych dopasowanych do specyfiki każdej budowy. Wszystkie produkty produkowane są ze starannie dobranych surowców."
          />
          <div className="products__grid">
            {PRODUCTS.map((p, i) => (
              <ProductCard key={i} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
