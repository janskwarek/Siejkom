// src/components/MapSection/MapSection.jsx
import SectionTitle from "../SectionTitle/SectionTitle";
import { useReveal } from "../../hooks/useReveal";
import "./MapSection.css";

const LOCATIONS = [
  {
    label: "Wytwórnia Piekary Śl.",
    address: "ul. Parkowa 11, 41-940 Piekary Śląskie",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2550.0!2d18.9479434!3d50.3652041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4713d342ea4b0949%3A0x54ca017c38bfdd78!2sParkowa%2011%2C%2041-940%20Piekary%20%C5%9Bl%C4%85skie!5e0!3m2!1spl!2spl!4v1234567890",
    mapsUrl:
      "https://maps.google.com/?q=ul.+Parkowa+11,+41-940+Piekary+Śląskie",
  },
  {
    label: "Wytwórnia Siemianowice Śl.",
    address: "ul. Towarowa 9, 41-103 Siemianowice Śląskie",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2550.0!2d19.0158592!3d50.3252116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4713d3d510ce5955%3A0xf7fd11fe3f6fec0a!2sTowarowa%209%2C%2041-103%20Siemianowice%20%C5%9Bl%C4%85skie!5e0!3m2!1spl!2spl!4v1234567890",
    mapsUrl:
      "https://maps.google.com/?q=ul.+Towarowa+9,+41-103+Siemianowice+Śląskie",
  },
];

function LocationCard({ loc, index }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="map-card reveal"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="map-card__embed-wrap">
        <iframe
          title={loc.label}
          src={loc.mapSrc}
          className="map-card__embed"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="map-card__info">
        <span className="map-card__label">{loc.label}</span>
        <p className="map-card__address">{loc.address}</p>
        <a
          href={loc.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="map-card__link"
        >
          Otwórz w Google Maps →
        </a>
      </div>
    </div>
  );
}

export default function MapSection() {
  return (
    <section className="section map-section">
      <div className="container">
        <SectionTitle
          eyebrow="Lokalizacje"
          title={
            <>
              Znajdź
              <br />
              Nas
            </>
          }
          subtitle={`Działamy w dwóch lokalizacjach na Śląsku.`}
        />
        <div className="map-section__grid">
          {LOCATIONS.map((loc, i) => (
            <LocationCard key={i} loc={loc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
