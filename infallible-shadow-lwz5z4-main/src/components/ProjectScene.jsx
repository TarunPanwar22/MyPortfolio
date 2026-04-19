import React, { useEffect } from "react";
import "./ProjectScene.css";

// Fixed image paths (from public folder)
const QuantumNight = "/quantum.png";
const QuantumDay = "/images.jpeg";
const PortfolioImg = "/tarunpanwar.png"; // optional placeholder

const projects = [
  {
    title: "Alumni Portal",
    description:
      "Official alumni management system for Quantum University with profile management, event tracking, and networking features",
    tech: "React • Tailwind CSS • Node.js, Socket.io, MYSQL",
    liveLink: "https://alumni.quantumuniversity.edu.in/# ",
    image: QuantumNight,
  },
  {
    title: "QLRC Portal",
    description:
      "Quantum University Learning Resource Center - digital library and resource management platform for students and faculty",
    tech: "React • MongoDB • Express",
    liveLink: "https://qlrc.quantumuniversity.edu.in/ ",
    image: QuantumDay,
  },
  {
    title: "Portfolio Website",
    description:
      "3D interactive React site with galaxy background, animations, and chatbot integration",
    tech: "React • Three.js • CSS Animations",
    liveLink: "#",
    image: PortfolioImg,
  },
];

const ProjectScene = ({ darkMode = false }) => {
  // SCROLL ANIMATION EFFECT - This makes cards animate when scrolling into view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of card is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    // Get all project cards and observe them
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => observer.observe(card));

    // Cleanup
    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, []); // Empty array = run once on mount

  return (
    <div id="projects" className={`project-section-container ${darkMode ? "dark" : "light"}`}>
      <h2 className={`section-title ${darkMode ? "dark" : "light"}`}>My Live Projects</h2>
      <div className="projects-row">
        {projects.map((p, i) => (
          <div
            key={i}
            className={`project-card ${
              i % 3 === 0 ? "slide-top" : i % 3 === 1 ? "slide-left" : "slide-right"
            }`}
          >
            <div className="project-card-header">
              <img
                src={p.image}
                alt={`${p.title} screenshot`}
                className="project-image"
                loading="lazy"
              />
              <div className="project-card-header-overlay" />
              <div className="project-card-header-content">
                <span className="project-icon" aria-hidden>
                  🚀
                </span>
                <span className="live-badge">LIVE</span>
              </div>
            </div>

            <div className="project-card-body">
              <h3 className="project-title">{p.title}</h3>
              <p className="project-description">{p.description}</p>
              <span className="project-tech">{p.tech}</span>
              {p.liveLink !== "#" && (
                <a
                  href={p.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View Live Project →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectScene;