import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={() => setDarkMode((prev) => !prev)}
    >
      {darkMode ? "☀️" : "🌙"}
      <span className="theme-label">
        {darkMode ? " Light Mode" : " Dark Mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;
