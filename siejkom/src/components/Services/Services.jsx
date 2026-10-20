// src/components/Services/Services.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { SERVICES } from "../../data/company";
import SectionTitle from "../SectionTitle/SectionTitle";
import "./Services.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 22 },
  },
};

function ServiceCard({ service, index }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 200 } }}
      className="service-card"
    >
      <div className="service-card__glow" />

      <div className="service-card__header">
        <span className="service-card__number">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.desc}</p>

      <Link to={service.link} className="service-card__link">
        Dowiedz się więcej
        <ArrowRight size={14} weight="bold" />
      </Link>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section className="section services">
      <div className="container">
        <SectionTitle
          eyebrow="Co robimy"
          title={
            <>
              Nasze
              <br />
              <span style={{ color: "var(--color-accent)" }}>Usługi</span>
            </>
          }
          subtitle="Kompleksowe rozwiązania w branży budowlanej — od produkcji betonu po gotowy dom."
        />

        <motion.div
          className="services__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
