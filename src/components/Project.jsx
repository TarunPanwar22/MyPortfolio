import React, { useRef, useEffect, useState } from "react";
import "./Project.css";

const Project = ({ title, description, animationType }) => {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`card-container ${animationType} ${visible ? "visible" : ""}`}
      style={{ width: "450px", height: "300px" }} // larger card size
    >
      <div className="card">
        <div className="card-front">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Project;
