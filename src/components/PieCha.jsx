// src/components/PieChart.jsx
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieCha = ({ skillName, skillLevel, skillColor }) => {
  const data = {
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += context.parsed + "%";
            }
            return label;
          },
        },
      },
      title: {
        display: true,
        text: `${skillName} Proficiency`,
        color: "#222",
        font: {
          size: 20,
        },
      },
    },
    hoverOffset: 10,
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3 style={{ color: "#222", marginBottom: "20px" }}>
        {skillName} Skill Level
      </h3>
      <div style={{ maxWidth: "300px", margin: "0 auto" }}>
        <Pie data={data} options={options} />
      </div>
      <p style={{ marginTop: "20px", fontSize: "1.2rem", color: "#555" }}>
        My **{skillName}** proficiency is at **{skillLevel}%**.
      </p>
    </div>
  );
};

export default PieCha;
