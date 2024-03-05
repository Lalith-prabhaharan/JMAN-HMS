import React, { useState } from 'react';
import { useAuth } from '../utils/authentication';
import logo from "../images/logo1.png";
import "../style/nav.css";

export const Navbar = ({ children }) => {
  const [showNav, setShowNav] = useState(false);
  const [ setActiveTab] = useState('addpatient');
  const [showDropdown,setShowDropdown]=useState(false);

  const activeColor = '#0e0e0e'; 
  const inactiveColor = '#f8f9fa'; 
  const auth=useAuth();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    localStorage.setItem('activetab',tabName)
  };
  
  const logout=()=>{
    auth.logout();
  };

  const toggleNav = () => {
    setShowNav(!showNav);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src={logo}></img>
          {/* HEALTH CARE */}
        </div>
        <div className={`nav-links ${showNav ? 'show' : ''}`} style={{paddingTop:"10px"}}>
          <a
            href="/allpatients"
            style={{ color: localStorage.getItem("activetab") === 'allpatients' ? activeColor : inactiveColor }}
            onClick={() => handleTabClick('allpatients')}
          >
            <b>All Patients</b>
          </a>
          <a
            href="/addpatient"
            style={{ color: localStorage.getItem("activetab") === 'addpatient' ? activeColor : inactiveColor }}
            onClick={() => handleTabClick('addpatient')}
          >
            <b>Add Patients</b>
          </a>
          <a
            href="/viewstatus"
            style={{ color: localStorage.getItem("activetab") === 'viewstatus' ? activeColor : inactiveColor }}
            onClick={() => handleTabClick('viewstatus')}
          >
            <b>View Status</b>
          </a>
          <div className="navdropdown">
            <div className="navdropdown-toggle"
                onClick={toggleDropdown}
                style={{
                  color: localStorage.getItem('activetab') === 'doctordetails' ? activeColor : inactiveColor,
                  marginLeft:"20px"
                }}
              >
                  <b>Doctor</b>
            </div>
            {showDropdown && (
              <div className="navdropdown-content">
                <a href="/doctordetails"  onClick={() => handleTabClick('doctordetails')}><b>View Doctors</b></a>
                <a href="/adddoctor" onClick={() => handleTabClick('doctordetails')}><b>Add Doctor</b></a>
              </div>
            )}
          </div>
          <a onClick={logout}>
            <b>Logout</b>
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

