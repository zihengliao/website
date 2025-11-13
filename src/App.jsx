import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Navbar.jsx";
import Intro from "./Intro.jsx";
import Experience from "./Experience.jsx";
import Projects from "./Projects.jsx";
import Contact from './Contact.jsx';
import Blog from './Blog/Blog.jsx';
import "./App.css";

const HomePage = () => {
  return (
    <>
      <Intro />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;