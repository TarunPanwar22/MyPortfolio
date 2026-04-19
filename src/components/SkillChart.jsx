// src/components/SkillChart.jsx
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const skillsData = {
  React: { level: 90, color: "#61DAFB" },
  Angular: { level: 75, color: "#DD0031" },
  "Node.js": { level: 85, color: "#68A063" },
  MongoDB: { level: 80, color: "#4DB33D" },
  MySql: { level: 70, color: "#4479A1" },
  HTML: { level: 95, color: "#E34F26" },
  CSS: { level: 90, color: "#1572B6" },
  JavaScript: { level: 95, color: "#F7DF1E" },
  Redux: { level: 88, color: "#000000" },
  "Socket Io": { level: 80, color: "#E82A1B" },
  Tailwind: { level: 85, color: "#38B2AC" },
  Git: { level: 90, color: "#F05032" },
};

const SkillChart = ({ skillName, skillLevel, skillColor }) => {
  const pieData = {
    labels: [skillName, "Remaining"],
    datasets: [
      {
        data: [skillLevel, 100 - skillLevel],
        backgroundColor: [skillColor, "rgba(200, 200, 200, 0.5)"],
        borderColor: [skillColor, "rgba(200, 200, 200, 0.5)"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.parsed !== null ? `${context.parsed}%` : "";
            return `${label}: ${value}`;
          },
        },
      },
      title: {
        display: true,
        text: `${skillName} Proficiency`,
        color: "var(--text)",
        font: { size: 20 },
      },
    },
    hoverOffset: 10,
  };

  const barData = {
    labels: Object.keys(skillsData),
    datasets: [
      {
        label: "Skill Proficiency",
        data: Object.values(skillsData).map((skill) => skill.level),
        backgroundColor: Object.values(skillsData).map((skill) => skill.color),
        borderColor: "rgba(255, 255, 255, 0.8)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    indexAxis: "x",
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Overall Skills Comparison",
        color: "var(--text)",
        font: { size: 20 },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { display: false },
        ticks: { color: "var(--text)" },
      },
      y: {
        grid: { display: false },
        ticks: { color: "var(--text)" },
      },
    },
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3 style={{ color: "var(--text)", marginBottom: "20px" }}>
        {skillName} Skill Level
      </h3>

      <div className="chart-flex">
        {/* Pie Chart */}
        <div style={{ flex: 1, minWidth: "100px" }}>
          <h4 style={{ color: "var(--text)" }}>Detailed View</h4>
          <Pie data={pieData} options={pieOptions} />
          <p
            style={{
              marginTop: "20px",
              fontSize: "1.2rem",
              color: "var(--text)",
            }}
          >
            My <strong>{skillName}</strong> proficiency is at{" "}
            <strong>{skillLevel}%</strong>.
          </p>
        </div>

        {/* Bar Chart */}
        <div style={{ flex: 1, minWidth: "400px" }}>
          <h4 style={{ color: "var(--text)" }}>Overall Comparison</h4>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default SkillChart;
