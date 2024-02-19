import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/authentication';

export const Navbar = ({ children }) => {
  const [showNav, setShowNav] = useState(false);
  const [activeTab, setActiveTab] = useState('addpatient');

  const activeColor = '#0e0e0e'; 
  const inactiveColor = '#f8f9fa'; 
  const auth=useAuth();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    localStorage.setItem('activetab',tabName)
  };
  const logout=()=>{
    auth.logout();
  }

  const toggleNav = () => {
    setShowNav(!showNav);

  };

  return (
    <div>
    <nav className="navbar">
      <div className="logo">HEALTH CARE</div>
      <div className={`nav-links ${showNav ? 'show' : ''}`}>
        <a
          href="/allpatients"
          style={{ color: localStorage.getItem("activetab") === 'allpatients' ? activeColor : inactiveColor }}
          onClick={() => handleTabClick('allpatients')}
        >
          All Patients
        </a>
        <a
          href="/addpatient"
          style={{ color: localStorage.getItem("activetab") === 'addpatient' ? activeColor : inactiveColor }}
          onClick={() => handleTabClick('addpatient')}
        >
          Add Patients
        </a>
        <a
          href="/viewstatus"
          style={{ color: localStorage.getItem("activetab") === 'viewstatus' ? activeColor : inactiveColor }}
          onClick={() => handleTabClick('viewstatus')}
        >
          View Status
        </a>
        <a
          href="/doctordetails"
          style={{ color: localStorage.getItem("activetab") === 'doctordetails' ? activeColor : inactiveColor }}
          onClick={() => handleTabClick('doctordetails')}
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
};

