import React, { useEffect, useState } from 'react'
import "../style/viewpatient.css"
import { Navbar } from './navbar'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { doctordetails, getdeptdoctors } from '../services/services'

export const Doctordetails = () => {
  const [doctorList,setDoctorList]=useState([])
  const [dept, setDept] = useState("");
  const departments = ['cardiology','dermatology','pediatrics','gynecology','neurology','urology','orthopedics','radiology','oncology','general'];
  const handleDepratment=(event)=>{
    setDept(event.target.value)
  }
  useEffect(()=>{
    getdeptdoctors(dept).then((response)=>{
      setDoctorList(response.data)
    })
    .catch(error=>{
      console.error("error in fetching data",error)
    })
  })
  return (
    <Navbar>
    <div className="status">
          <div style={{paddingTop:"50px"}}>
            <select value = {dept} onChange={handleDepratment} style={{margin: "0"}} className='dropdown'>
              <option value="" className='dropdown-content'>All</option>
              {
                  departments.map((department)=>(
                    <option key = {department} value={department} className='dropdown-content'>{department}</option>
                  ))
                }
            </select>
            <p style={
              {
                fontSize:"2rem", 
                fontWeight:"bold",
                textAlign:"center",
                color:"#00866E", 
                display: "inline",
                marginLeft: "175px",
                verticalAlign:"middle"
              }
            }>Doctors List</p>    
          </div>
          <DataTable removableSort paginator rows={10} value={doctorList}>
              <Column field="first_name" alignHeader={'center'} sortable header="Name"></Column>
              <Column field="age" alignHeader={'center'} sortable header="Age"></Column>
              <Column field="year_of_exp" alignHeader={'center'} sortable header="Yoe"></Column>
              <Column field="department" alignHeader={'center'} sortable header="Department"></Column>
          </DataTable>
    </div>
    </Navbar>
  )
}
