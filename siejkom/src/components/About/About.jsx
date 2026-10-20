// src/components/About/About.jsx
import { motion } from "framer-motion";
import SectionTitle from "../SectionTitle/SectionTitle";
import { COMPANY, STATS } from "../../data/company";
import img from "../../assets/20230915_170846-2048x1153.jpg";
import "./About.css";

export default function About() {
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 20, delay: 0.2 },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4,
      },
    },
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className="section about">
      <div className="container about__inner">
        <motion.div
          className="about__image-wrap"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="about__image-placeholder">
            <img
              src={img}
              alt="Betonowanie fundamentu — Siejkom Invest"
              className="about__image"
            />
          </div>
          <motion.div
            className="about__badge"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <span className="about__badge-year">{COMPANY.founded}</span>
            <span className="about__badge-label">Rok założenia</span>
          </motion.div>
        </motion.div>

        <div className="about__content">
          <SectionTitle
            eyebrow="O nas"
            title={
              <>
                Produkcja
                <br />
                Betonu
              </>
            }
            subtitle={`Swoją działalność rozpoczęliśmy w ${COMPANY.founded} roku. Jesteśmy firmą z Piekar Śląskich, specjalizującą się w produkcji i dostarczaniu betonu. Dbamy o najwyższą jakość naszych produktów, korzystając z wysokiej klasy surowców i nowoczesnych technologii.`}
          />

          <motion.p
            className="about__extra-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            Nasze produkty spełniają wszelkie normy i wymagania, a także są
            regularnie kontrolowane pod względem jakości. Wyróżnia nas
            elastyczność i terminowość w realizacji zamówień oraz konkurencyjne
            ceny. Zaufało nam już wielu Klientów, którzy doceniają nasze
            doświadczenie i profesjonalizm.
          </motion.p>

          <motion.div
            className="about__stats"
            variants={statsVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {STATS.map((stat, index) => (
              <motion.div key={index} className="about__stat" variants={statItemVariants}>
                <span className="about__stat-value">{stat.value}</span>
                <span className="about__stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
