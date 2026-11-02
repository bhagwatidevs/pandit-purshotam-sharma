import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "../css/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  // Active link class
  const getLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`;

  return (
    <header className="navbar">
      {/* Logo */}
      <NavLink
        to="/"
        className="navbar-logo"
        onClick={closeMenu}
      >
        <span className="brand-name-hi" aria-label="पंडित पुरुषोत्तम गौड़ ज्योतिष केंद्र">
          पंडित पुरुषोत्तम गौड़<br />ज्योतिष केंद्र
        </span>
      </NavLink>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Navigation Links */}
      <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <NavLink
          to="/"
          end
          className={getLinkClass}
          onClick={closeMenu}
        >
          Home
        </NavLink>

        <NavLink
          to="/know-more"
          className={getLinkClass}
          onClick={closeMenu}
        >
          Know More
        </NavLink>

        <NavLink
          to="/photo-gallery"
          className={getLinkClass}
          onClick={closeMenu}
        >
          Photo Gallery
        </NavLink>

        {/* Services Dropdown */}
        <div className="nav-dropdown">
          <button
            type="button"
            className={`nav-link dropdown-toggle ${
              servicesOpen ? "active" : ""
            }`}
            onClick={() => setServicesOpen(!servicesOpen)}
            aria-expanded={servicesOpen}
          >
            Our Services
            <span className="arrow">
              {servicesOpen ? "⌃" : "⌄"}
            </span>
          </button>

          {servicesOpen && (
            <div className="dropdown-menu">
              <NavLink to="/astrologyconsultation" onClick={closeMenu}>
                Astrology Consultation
              </NavLink>

              <NavLink to="/jap" onClick={closeMenu}>
                Jap
              </NavLink>

              <NavLink to="/yagya-homam" onClick={closeMenu}>
                YAGYA (HOMAM)
              </NavLink>

              <NavLink to="/newbornastrology" onClick={closeMenu}>
                Newborn Astrology
              </NavLink>

              <NavLink to="/drishti" onClick={closeMenu}>
                Drishti
              </NavLink>

              <NavLink to="/mantrahealing" onClick={closeMenu}>
                Mantra Healing
              </NavLink>

              <NavLink to="/poojaservice" onClick={closeMenu}>
                Pooja Service
              </NavLink>

              <NavLink to="/vastushastra" onClick={closeMenu}>
                Vastu Shastra
              </NavLink>

              <NavLink to="/luckystonechart" onClick={closeMenu}>
                Lucky Stone Chart
              </NavLink>
            </div>
          )}
        </div>

        <NavLink
          to="/press-release"
          className={getLinkClass}
          onClick={closeMenu}
        >
          Press Release
        </NavLink>

        <NavLink
          to="/product"
          className={getLinkClass}
          onClick={closeMenu}
        >
          Product
        </NavLink>

        <NavLink
          to="/blog"
          className={getLinkClass}
          onClick={closeMenu}
        >
          Blog
        </NavLink>

        <NavLink
          to="/inquiry-form"
          className={getLinkClass}
          onClick={closeMenu}
        >
          Inquiry Form
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;