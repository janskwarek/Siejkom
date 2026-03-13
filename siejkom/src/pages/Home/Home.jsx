// src/pages/Home/Home.jsx
import Hero from "../../components/Hero/Hero";
import Services from "../../components/Services/Services";
import About from "../../components/About/About";
import Features from "../../components/Features/Features";
import CtaBanner from "../../components/CtaBanner/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Features />
      <CtaBanner />
    </>
  );
}
