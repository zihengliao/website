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
          I’m a software engineer focused on machine learning and data science, 
          with a love for solving interesting problems and trying out new ideas. 
          I mix solid engineering with a healthy dose of curiosity.
        </span>
      </h1>
    </div>
  );
};

export default Intro;
