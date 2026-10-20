// src/components/SectionTitle/SectionTitle.jsx
import { motion } from "framer-motion";
import "./SectionTitle.css";

/**
 * Props:
 *   eyebrow  – small label above heading (optional)
 *   title    – main heading (can contain <br /> or <span>)
 *   subtitle – short paragraph below heading (optional)
 *   align    – 'left' | 'center' (default: 'left')
 */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <motion.div
      className={`section-title section-title--${align}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {eyebrow && (
        <motion.p className="section-title__eyebrow" variants={itemVariants}>
          <span className="section-title__line" />
          {eyebrow}
        </motion.p>
      )}
      <motion.h2 className="section-title__heading" variants={itemVariants}>
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p className="section-title__subtitle" variants={itemVariants}>
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
