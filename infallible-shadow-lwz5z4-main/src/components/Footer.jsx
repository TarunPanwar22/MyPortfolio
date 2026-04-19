import React from "react";
import { useTheme } from "../context/ThemeContext";
import { FaLinkedin, FaGithub, FaInstagram, FaHeart, FaArrowUp } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const { darkMode } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/tarun-panwar-026418212/",
      label: "LinkedIn"
    },
    {
      icon: <FaGithub />,
      url: "https://github.com/tarunpanwar22",
      label: "GitHub"
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/tarunpanwar_05/",
      label: "Instagram"
    }
  ];

  const navLinks = [
    { label: "About", href: "#About" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <footer className={`footer ${darkMode ? "dark" : "light"}`}>
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-name">Tarun Panwar</h3>
            <p className="footer-tagline">
              Full Stack Developer | Data Engineer | Creative Thinker
            </p>
          </div>
          
          <button 
            className="scroll-to-top"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </button>
        </div>

        {/* Middle Section */}
        <div className="footer-middle">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p className="footer-contact">
              Open for opportunities and collaborations.<br />
              Let's build something amazing together!
            </p>
            <a href="mailto:your.email@example.com" className="footer-email">
              Get in Touch
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-line" />
          <p className="footer-copyright">
            © {currentYear} Developed with{" "}
            <FaHeart className="heart-icon" /> by{" "}
            <span className="footer-highlight">Tarun Panwar</span>
          </p>
          <p className="footer-tech">
            Built with React • Tailwind CSS • Passion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;