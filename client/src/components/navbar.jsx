import "../style/nav.css"
import React, { useState } from 'react';
import { useAuth } from "../utils/authentication";

export const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const auth=useAuth()
  const logout=()=>{
    auth.logout();
  }
  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <nav className="navbar">
      <div className="logo">HEALTH CARE</div>
      <div className={`nav-links ${showNav ? 'show' : ''}`}>
        <a href="/allpatients">All Patients</a>
        <a href="#">Add Patients</a>
        <a href="/viewstatus">View Status</a>
        <a href="/doctordetails">Doctors Details</a>
        <a onClick={logout}>Logout</a>
      </div>
      <button className="menu-icon" onClick={toggleNav}>
        <span>&#9776;</span>
      </button>
    </nav>
  );
};


