import React, { useState } from "react";
import EducationScene from "./components/EducationScene";
import GalaxyBackground from "./components/GalaxyBackground";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Chatbot from "./components/Chatbot";
import { educationData } from "./components/data";
import InfiniteSlider from "./components/InfiniteSlider";
import ExperienceScene from "./components/ExperienceScene";
import ProjectScene from "./components/ProjectScene";
import { useTheme } from "./context/ThemeContext";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";

const App = () => {
  const { darkMode } = useTheme();

  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="relative h-screen w-screen overflow-hidden font-[Inter] antialiased">
        <GalaxyBackground mode={darkMode ? "dark" : "light"} />
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-4">
          <Navbar />
          <Profile />
          <ExperienceScene />
          <main style={{ paddingTop: "80px", position: "relative", zIndex: 1 }}>
            <InfiniteSlider />
            <EducationScene />
          </main>
          <main>
            <ProjectScene darkMode={darkMode} />
          </main>
        </div>
        <ContactUs darkMode={darkMode} />
        <Footer darkMode={darkMode} />
        <Chatbot />
      </div>
    </>
  );
};

export default App;
