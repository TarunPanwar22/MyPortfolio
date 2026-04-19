import React, { useState, useEffect } from "react";
import { FaLinkedin, FaInstagram, FaGithub, FaDownload } from "react-icons/fa";

const Profile = () => {
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Phrases to be typed and colors to cycle through
  const toRotate = [
    "Tarun Panwar",
    "Programmer",
    "Full Stack Developer",
    "Data Engineer",
    "Quick Learner",
  ];
  const colors = ["#FF6347", "#4169E1", "#32CD32"]; // Red, Blue, Green
  const [currentColor, setCurrentColor] = useState(colors[0]);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % toRotate.length;
      const fullText = toRotate[i];

      setTypedText(
        isDeleting
          ? fullText.substring(0, typedText.length - 1)
          : fullText.substring(0, typedText.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && typedText === fullText) {
        setIsDeleting(true);
        setTypingSpeed(1000); // Pause before deleting
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        // Change the color when the typing loop restarts
        setCurrentColor(colors[(loopNum + 1) % colors.length]);
        setTypingSpeed(150);
      }
    };

    const ticker = setTimeout(() => {
      handleTyping();
    }, typingSpeed);

    return () => clearTimeout(ticker);
  }, [typedText, isDeleting, loopNum, typingSpeed, colors]);

  // All styling is embedded here to meet the single-file requirement
  const styleSheet = `
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 80px 20px;
  max-width: 800px;
  margin: auto;
  opacity: 0;
  transform: translateY(-100%); /* Start from the top */
  animation: slideIn 1s forwards;
}

@media (min-width: 768px) {
  .profile {
    flex-direction: row;
    text-align: left;
    gap: 40px;
    padding: 120px 20px;
  }
}

.profile-img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${currentColor};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
}

.profile-img:hover {
  transform: scale(1.05);
}

.profile-info {
  margin-top: 40px;
}

@media (min-width: 768px) {
  .profile-info {
    margin-top: 0;
  }
}

.profile-info h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.2;
}

.profile-info h2 .accent {
  color: ${currentColor};
  font-weight: 900;
}

.profile-info p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #666;
}

body.dark .profile-info p {
  color: #ccc;
}

body.dark .profile-info h2 {
  color: #f4f4f4;
}

body.dark .profile-img {
  border: 4px solid #333;
}

.typed-text {
  border-right: 2px solid ${currentColor};
  padding-right: 5px;
  animation: blink-caret 0.75s step-end infinite;
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: ${currentColor} }
}

@keyframes slideIn {
  to {
    transform: translateY(0); /* Final position */
    opacity: 1;
  }
}

.social-icons {
  margin-top: 20px;
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}

.icon {
  font-size: 2rem;
  color: #666;
  transition: transform 0.3s ease, color 0.3s ease;
  animation: float 3s ease-in-out infinite;
}

.icon:hover {
  transform: rotate(360deg) scale(1.2);
  color: ${currentColor};
}

/* Resume download icon - styled like social icons */
.resume-icon {
  font-size: 2rem;
  color: #666;
  transition: transform 0.3s ease, color 0.3s ease;
  animation: float 3s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
}

.resume-icon:hover {
  transform: rotate(360deg) scale(1.2);
  color: ${currentColor};
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
}

@media (min-width: 768px) {
  .social-icons {
    justify-content: flex-start;
  }
}
`;

  return (
    <section className="profile" id="About">
      <style>{styleSheet}</style>
      <img src="/tarunpanwar.png" alt="My Profile" className="profile-img" />
      <h1></h1>
      <div className="profile-info">
        <h2>
          Hello, I'm <br className="lg:hidden" />
          <span className="accent typed-text">{typedText}</span>
        </h2>
        <p>
          I'm a full-stack developer dedicated to building immersive digital
          experiences. My expertise lies in crafting dynamic 3D interfaces,
          designing seamless responsive websites, and leveraging AI to build
          smarter, more engaging web applications.
        </p>
        <div className="social-icons" style={{ fontSize: "3rem" }}>
          <a
            href="https://www.linkedin.com/in/tarun-panwar-026418212/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
            title="Connect on LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/tarunpanwar22"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
            title="Connect on github"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/tarunpanwar_05/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
            title="Connect on Instagram"
          >
            <FaInstagram />
          </a>
          {/* Resume Download Icon - Added alongside social icons */}
          <a
            href="/resume.pdf"
            download="Tarun_Panwar_Resume.pdf"
            className="resume-icon"
            title="Download Resume"
          >
            <FaDownload />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Profile;