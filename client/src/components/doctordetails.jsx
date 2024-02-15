import React, { useEffect, useState } from 'react'
import "../style/viewpatient.css"
import axios from 'axios'
import { Navbar } from './navbar'

export const Doctordetails = () => {
  const [doctorList,setDoctorList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:5000/api/v1/admin/doctor")
    .then((response)=>{
      setDoctorList(response.data)
    })
    .catch(error=>{
      console.error("error in fetching data",error)
    })
  })
  return (
    <Navbar>
    <h1 style={{padding:"20px",textAlign:"center",textDecoration:"underline",color:"wheat"}}>Doctors List</h1>
    <div className="card-container">
    {
      doctorList.map((doctor)=>(
      <div className="glass-card">
        Dr.{doctor.first_name} <br></br>
        Age:{doctor.age}<br></br>
        YOE:{doctor.year_of_exp} yrs<br></br>
        Department:{doctor.department}
      </div>
      ))
    } 
    </div>
    </Navbar>
  )
}
