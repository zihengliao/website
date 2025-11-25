import React, { useState } from "react";
import "./Intro.css";

const Intro = () => {
  const [showGlasses, setShowGlasses] = useState(false);

  const toggleGlasses = () => {
    setShowGlasses(!showGlasses);
  };
  
  return (
    <div className="intro-container">

      {/* Profile Image */}
      <div className="intro-image-container" onClick={toggleGlasses}>
        <img
          src="/assets/profile.jfif"
          alt="Ziheng Liao"
          className="intro-image"
        />

        <img
          src="/assets/sunglasses.png"
          className={`sunglasses ${showGlasses ? "visible" : ""}`}
          alt="sunglasses overlay"
        />
      </div>

      {/* Text */}
      <h1 className="intro-text">
        Hey, I'm <span className="highlight name-drop">Ziheng Liao.</span>
        <br />
        <span className="subtext">
          I’m a software engineer with an interest in machine learning and data science. 
          I enjoy tracking down bugs, fixing them, and occasionally introducing a few new ones along the way.
        </span>
      </h1>
    </div>
  );
};

export default Intro;
