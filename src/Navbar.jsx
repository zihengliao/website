import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-home">
        <a href="/">Home</a>
      </div>
      <ul className="nav-links">
        <li><HashLink smooth to="/#experience">Experience</HashLink></li>
        <li><HashLink smooth to="/#projects">Projects</HashLink></li>
        <li><HashLink smooth to="/#contact">Contact</HashLink></li>
        <li><Link to="/blog">Blog</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;