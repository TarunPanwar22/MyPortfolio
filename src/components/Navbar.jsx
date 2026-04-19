import React, { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const { darkMode } = useTheme();
  const navRef = useRef(null);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const navbarHeight = navRef.current?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      if (menuOpen) {
        closeMenu();
      }
    }
  };

  const toggleMenu = () => {
    if (menuOpen) {
      setAnimatingOut(true);
      setTimeout(() => {
        setMenuOpen(false);
        setAnimatingOut(false);
      }, 600);
    } else {
      setMenuOpen(true);
    }
  };

  const closeMenu = () => {
    if (menuOpen) {
      setAnimatingOut(true);
      setTimeout(() => {
        setMenuOpen(false);
        setAnimatingOut(false);
      }, 600);
    }
  };

  const textColor = darkMode ? "#FFFFFF" : "#000000";
  const themeClass = darkMode ? "dark" : "light";

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && menuOpen) {
        setAnimatingOut(true);
        setTimeout(() => {
          setMenuOpen(false);
          setAnimatingOut(false);
        }, 600);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

  const navItems = [
    { label: "About", href: "#About" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
  ];

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-content">
        <div className="navbar-left">
          <img
            src="/tarun.jpeg"
            alt="My Profile Photo"
            className="navbar-photo"
          />
          <h1 className="navbar-title" style={{ color: textColor }}>
            Tarun Panwar
          </h1>
        </div>

        <div className="navbar-center desktop-only">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`nav-link ${themeClass}`}
              onClick={(e) => handleSmoothScroll(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="navbar-right desktop-only">
          <a
            href="#contact"
            className={`nav-contact-btn ${themeClass}`}
            onClick={(e) => handleSmoothScroll(e, '#contact')}
          >
            Contact Us
          </a>
          <ThemeToggle />
        </div>

        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          style={{ color: textColor }}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {menuOpen && (
        <div className={`mobile-menu ${themeClass} ${animatingOut ? 'anim-out' : ''}`}>
          <ul>
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} onClick={(e) => handleSmoothScroll(e, item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className={`nav-contact-btn ${themeClass}`}
                onClick={(e) => handleSmoothScroll(e, '#contact')}
              >
                Contact Us
              </a>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;