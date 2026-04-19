import React, { useState } from "react";
import "./InfiniteSlider.css";
import SkillChart from "./SkillChart"; // ✅ Replace PieChart import with SkillChart

const items = [
  "React",
  "Angular",
  "Node.js",
  "MongoDB",
  "MySql",
  "HTML",
  "CSS",
  "JavaScript",
  "Next.js",
  "Three.js",
  "Tailwind",
  "Git",
];

const skillsData = {
  React: { level: 90, color: "#61DAFB" },
  Angular: { level: 75, color: "#DD0031" },
  "Node.js": { level: 85, color: "#68A063" },
  MongoDB: { level: 80, color: "#4DB33D" },
  MySql: { level: 70, color: "#4479A1" },
  HTML: { level: 95, color: "#E34F26" },
  CSS: { level: 90, color: "#1572B6" },
  JavaScript: { level: 95, color: "#F7DF1E" },
  "Next.js": { level: 88, color: "#000000" },
  "Three.js": { level: 80, color: "#E82A1B" },
  Tailwind: { level: 85, color: "#38B2AC" },
  Git: { level: 90, color: "#F05032" },
};

const InfiniteSlider = () => {
  const [activeSkill, setActiveSkill] = useState(null);

  const handleItemClick = (item) => {
    setActiveSkill(item);
  };

  return (
    <div className="skills-section">
      <div className="slider-container">
        <h2 className="section-heading">Skills</h2>
        <div className="slider-track">
          {items.concat(items).map((item, index) => (
            <div
              className="slide-item"
              key={index}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {activeSkill && skillsData[activeSkill] && (
        <div className="skill-chart-wrapper">
          <SkillChart
            skillName={activeSkill}
            skillLevel={skillsData[activeSkill].level}
            skillColor={skillsData[activeSkill].color}
          />
        </div>
      )}
    </div>
  );
};

export default InfiniteSlider;
