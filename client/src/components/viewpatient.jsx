import React from 'react'
import "../style/viewpatient.css"
import { DoctorNav } from '../components/DoctorNav'
export const Viewpatient = () => {
  return (
    <DoctorNav>
    <h1 style={{padding:"20px",textAlign:"center",textDecoration:"underline",color:"wheat"}}>Patient List</h1>
    <div className="card-container">
      <div className="glass-card">
        Abhay <br></br>
        Age:23
      </div>
      <div className="glass-card">
        Abhay <br></br>
        Age:23
      </div>
      <div className="glass-card">
        Abhay <br></br>
        Age:23
      </div>
      <div className="glass-card">
        Abhay <br></br>
        Age:23
      </div>
      <div className="glass-card">
        Abhay <br></br>
        Age:23
      </div>
    </div>
    </DoctorNav>
  )
}
