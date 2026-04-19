import React from "react";
import { motion } from "framer-motion";
import "./EducationScene.css";

const educationList = [
  {
    degree: "B.Tech in Computer Science",
    institute: "Quantum University",
    duration: "2020 - 2024",
    gradeLabel: "CGPA",
    grade: "8.1",
    location: "Roorkee",
  },
  {
    degree: "Senior Secondary School",
    institute: "S.A.M Inter College",
    duration: "2019 - 2020",
    gradeLabel: "Percentage",
    grade: "80%",
    location: "Saharanpur",
    board: "UP BOARD",
    Subject: "Physics Chemistry Mathematics",
  },
  {
    degree: "High School",
    institute: "S.A.M Inter College",
    duration: "2017 - 2018",
    gradeLabel: "Percentage",
    grade: "85%",
    location: "Saharanpur",
    board: "UP BOARD",
    Subject: "All Subject",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const EducationScene = () => {
  return (
    <section className="education-section" id="education">
      <div className="full-width-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          🎓 Education
        </motion.h2>

        <motion.div
          className="canvas-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {educationList.map((edu, index) => (
            <motion.div
              key={index}
              className="edu-card"
              variants={cardVariants}
            >
              <div className="edu-content">
                <h3>{edu.degree}</h3>
                <h4>{edu.institute}</h4>
                <p className="period">
                  {edu.duration} — {edu.location}
                </p>
                <p>
                  {edu.gradeLabel}: <strong>{edu.grade}</strong>
                </p>
                {edu.board && <p>Board: {edu.board}</p>}
                <strong>{edu.Subject}</strong>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EducationScene;
