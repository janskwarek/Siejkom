// src/pages/Home/Home.jsx
import Hero from "../../components/Hero/Hero";
import Services from "../../components/Services/Services";
import About from "../../components/About/About";
import Features from "../../components/Features/Features";
import MapSection from "../../components/MapSection/MapSection";
import CtaBanner from "../../components/CtaBanner/CtaBanner";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Siejkom — Producent betonu Piekary Śląskie</title>
        <meta
          name="description"
          content="Producent betonu od 2015 roku. Beton C8/10–C50/60, transport, pompowanie. Piekary Śląskie i Siemianowice Śląskie."
        />
      </Helmet>
      <Hero />
      <Services />
      <About />
      <Features />
      <MapSection />
      <CtaBanner />
    </>
  );
}
