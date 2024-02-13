import React from "react";
import { useState } from "react";
import "../style/nav.css";
import { useAuth } from "../utils/authentication";

export const DoctorNav=()=> {
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
        <a href="/mypatients">Patient List</a>
        <a href="/pending">Pending List</a>
        <a onClick={logout}>Logout</a>
      </div>
      <button className="menu-icon" onClick={toggleNav}>
        <span>&#9776;</span>
      </button>
    </nav>
    );
}
