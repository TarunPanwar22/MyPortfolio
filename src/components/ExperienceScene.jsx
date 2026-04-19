import React from "react";
import { motion } from "framer-motion";
import "./ExperienceScene.css";

const experienceList = [
  {
    company: "GlobalLogic",
    duration: "July 2023 - Present",
    designation: "Associate Software Engineer",
    location: "Google On Site",
    about:
      "GlobalLogic is a leader in digital engineering helping brands across industries design and build innovative products. I contribute to scalable MERN stack applications, team collaboration, and performance optimization.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
  },
  {
    company: "Smart Data Enterprises",
    duration: "Sep 2021 - July 2023",
    designation: "Software Developer Trainee",
    location: "on Site",
    about:
      "Smart Data Enterprises is a global IT consulting company. I was responsible for building full-stack features, debugging, and writing clean, maintainable code. This is where I honed my foundation in software engineering.",
    technologies: [
      "JavaScript",
      "React",
      "REST APIs",
      "Git",
      "MongoDB",
      "Redux",
      "Socket.Io",
    ],
  },
  {
    company: "OpenCubicles Technologies",
    duration: "Jun 2023 - Dec 2023",
    designation: "Software Developer Trainee",
    location: "remote",
    about:
      "OpenCubicles Technologies is a dynamic IT solutions company delivering innovative digital products. During my tenure, I was actively involved in developing real-time, scalable applications using the MERN stack. I contributed to building user-centric features, integrating RESTful APIs, managing global state with Redux, and implementing live communication using Socket.io. This experience sharpened my full-stack development skills and deepened my understanding of performance optimization and agile development practices.",
    technologies: ["Word Press", "React Native"],
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.3,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ExperienceScene = () => {
  return (
    <section className="experience-section" id="experience">
      <div className="full-width-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          💼 Experience
        </motion.h2>

        <h3 className="experience-summary">
          With 1.6 years of professional experience in the IT industry, I
          specialize in building scalable and performant applications using the
          MERN stack. I'm passionate about learning and adopting new
          technologies.
        </h3>

        <motion.div
          className="experience-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {experienceList.map((exp, index) => (
            <motion.div
              key={index}
              className="experience-card"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="exp-content">
                <h3>{exp.designation}</h3>
                <h4>{exp.company}</h4>
                <p>{exp.location}</p>
                <p className="duration">{exp.duration}</p>
                <p className="about">{exp.about}</p>
                <p className="tech-title">Technologies:</p>
                <ul className="tech-list">
                  {exp.technologies.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceScene;
