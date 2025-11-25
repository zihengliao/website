import React from "react";
import "./Intro.css";

const Intro = () => {
  return (
    <div className="intro-container">

      {/* Profile Image */}
      <div className="intro-image-container">
        <img
          src="/assets/profile.jfif"
          alt="Ziheng Liao"
          className="intro-image"
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
