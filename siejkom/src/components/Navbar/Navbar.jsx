// src/components/Navbar/Navbar.jsx
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
        <button
          className={`navbar__burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`navbar__drawer ${menuOpen ? "navbar__drawer--open" : ""}`}
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
      </div>
    </header>
  );
}
