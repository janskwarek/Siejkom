// src/components/Navbar/Navbar.jsx
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { COMPANY, NAV_LINKS } from "../../data/company";
import logo from "../../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        {/* Logo — obrazek */}
        <NavLink to="/" className="navbar__logo" onClick={close}>
          <img src={logo} alt={COMPANY.name} className="navbar__logo-img" />
        </NavLink>

        {/* Desktop nav */}
        <nav className="navbar__nav">
          {NAV_LINKS.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
          <a
            href={`tel:${COMPANY.phone}`}
            className="btn btn--primary navbar__cta"
          >
            {COMPANY.phone}
          </a>
        </nav>

        {/* Hamburger */}
        <motion.button
          className="navbar__burger"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          whileTap={{ scale: 0.95 }}
        >
          {menuOpen ? (
            <X size={24} weight="bold" />
          ) : (
            <List size={24} weight="bold" />
          )}
        </motion.button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            key="mobile-navigation"
            className="navbar__drawer"
            initial={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              paddingTop: "1.5rem",
              paddingBottom: "2rem",
            }}
            exit={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ overflow: "hidden" }}
          >
            {NAV_LINKS.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                className="navbar__drawer-link"
                onClick={close}
              >
                {label}
              </NavLink>
            ))}
            <a href={`tel:${COMPANY.phone}`} className="navbar__drawer-phone">
              {COMPANY.phone}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
