import "../style/nav.css"
import React, { useState } from 'react';

export const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <nav className="navbar">
      <div className="logo">HEALTH CARE</div>
      <div className={`nav-links ${showNav ? 'show' : ''}`}>
        <a href="#">All Patients</a>
        <a href="#">Add Patients</a>
        <a href="#">View Status</a>
        <a href="#">Doctors Details</a>
        <a href="#">Logout</a>
      </div>
      <button className="menu-icon" onClick={toggleNav}>
        <span>&#9776;</span>
      </button>
    </nav>
  );
};

