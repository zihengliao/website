import React from "react";
import NavBar from "./Navbar.jsx";
import Intro from "./Intro.jsx";
import Experience from "./Experience.jsx";
import Projects from "./Projects.jsx";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <Intro />
      <Experience />
      <Projects />
      
      {/* <section id="projects" className="projects-section">
        <h2>Projects</h2>
        <p>Your projects go here...</p>
      </section>

      <section id="contact" className="contact-section">
        <h2>Contact Me</h2>
        <p>Your contact information goes here...</p>
      </section> */}
    </div>
  );
};

export default App;