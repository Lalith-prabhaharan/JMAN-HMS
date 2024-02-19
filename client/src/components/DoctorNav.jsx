import React from "react";
import { useState } from "react";
import "../style/nav.css";
import { useAuth } from "../utils/authentication";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const DoctorNav=({children})=> {
  const activeColor='#000';
  const inactiveColor='#fff';
  const [showNav, setShowNav] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const auth=useAuth()

 

  const logout=()=>{
    auth.logout();
  }
  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    localStorage.setItem('activetab',tabName)

  };

  return (
    <div>
    <nav className="navbar">
      <div className="logo">HEALTH CARE</div>
      <div className={`nav-links ${showNav ? 'show' : ''}`}>
      <a
          href="/mypatients"
          style={{ color: localStorage.getItem("activetab") === 'mypatients' ? activeColor : inactiveColor }}
          onClick={() => handleTabClick('mypatients')}
        >
          All Patients
        </a>
        <a
          href="/pending"
          style={{ color: localStorage.getItem("activetab") === 'pending' ? activeColor : inactiveColor }}
          onClick={() => handleTabClick('pending')}
        >
          Doctors Details
        </a>
        <a onClick={logout}>
          Logout
        </a>
      </div>
      <button className="menu-icon" onClick={toggleNav}>
        <span>&#9776;</span>
      </button>
    </nav>
    {children}
    </div>
    );
}
