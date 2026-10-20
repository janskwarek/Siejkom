// src/components/Hero/Hero.jsx
import { COMPANY } from "../../data/company";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__content">
        <div className="hero__text">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="hero__eyebrow">
              <CheckCircle size={16} weight="fill" />
              Od {COMPANY.founded} roku — Piekary Śl. / Siemianowice Śl.
            </p>
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              type: "spring",
              stiffness: 80,
            }}
          >
            Solidny Beton,
            <br />
            <span className="hero__title-accent">Pewna</span> Inwestycja
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Specjalizujemy się w produkcji i dostawie betonu bezpośrednio na
            plac budowy. Własna flota transportowa, nowoczesne technologie i
            pełna kontrola jakości.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href="/kontakt" className="btn btn--primary hero__btn">
              Zamów Beton
              <ArrowRight size={16} weight="bold" />
            </a>
            <a href="/oferta" className="btn btn--outline hero__btn">
              Zobacz Ofertę
            </a>
          </motion.div>

          <motion.div
            className="hero__stats"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="hero__stat">
              <span className="hero__stat-value">10+</span>
              <span className="hero__stat-label">Lat doświadczenia</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">C50</span>
              <span className="hero__stat-label">Klasy betonu do</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">52mb</span>
              <span className="hero__stat-label">Zasięg pomp</span>
            </div>
          </motion.div>
        </div>

        {/* <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            type: "spring",
            stiffness: 60,
          }}
        >
          <div className="hero__visual-card">
            <div className="hero__visual-accent" />
            <svg
              viewBox="0 0 400 300"
              className="hero__visual-svg"
              aria-hidden="true"
            >
              <rect
                x="20"
                y="20"
                width="360"
                height="260"
                fill="none"
                stroke="rgba(243, 129, 31, 0.3)"
                strokeWidth="2"
                rx="8"
              />
              <circle cx="100" cy="80" r="40" fill="rgba(243, 129, 31, 0.15)" />
              <rect
                x="160"
                y="60"
                width="100"
                height="80"
                fill="rgba(243, 129, 31, 0.1)"
                rx="4"
              />
              <path
                d="M 40 180 L 80 160 L 130 190 L 170 150 L 220 180 L 280 140"
                stroke="rgba(243, 129, 31, 0.4)"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
