// src/components/SectionTitle/SectionTitle.jsx
import { useReveal } from "../../hooks/useReveal";
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
  const ref = useReveal();

  return (
    <div ref={ref} className={`section-title section-title--${align} reveal`}>
      {eyebrow && (
        <p className="section-title__eyebrow">
          <span className="section-title__line" />
          {eyebrow}
        </p>
      )}
      <h2 className="section-title__heading">{title}</h2>
      {subtitle && <p className="section-title__subtitle">{subtitle}</p>}
    </div>
  );
}
