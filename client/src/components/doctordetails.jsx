import React, { useEffect, useState } from 'react'
import "../style/viewpatient.css"
import { Navbar } from './navbar'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';
import { doctordetails, getdeptdoctors } from '../services/services'
import { Dropdown } from 'primereact/dropdown';


export const Doctordetails = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [doctorList,setDoctorList]=useState([])
  const [dept, setDept] = useState("");
  const departments = ['cardiology','dermatology','pediatrics','gynecology','neurology','urology','orthopedics','radiology','oncology','general'];
  const [selectedDetails, setSelectedDetails] = useState(null);
  const handleDepratment=(event)=>{
    setDept(event.target.value)
  }

  const handleRowClick = (e) => {
    console.log(e.data);
    setSelectedDetails(e.data);
  };

  const handleCloseCard = () => {
    setSelectedDetails(null);
  };

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
            <h2 style={
              {
                // fontSize:"2rem", 
                // fontWeight:"bold",
                textAlign:"center",
                color:"#00866E", 
                display: "inline",
                marginLeft: "20%",
                verticalAlign:"middle"
              }
            }>Doctors List</h2>    
          </div>
          <DataTable removableSort paginator rows={10} tableStyle={{ minWidth: '50rem' }} stripedRows  value={doctorList} onRowClick={handleRowClick}>
              <Column field="first_name" alignHeader={'center'} sortable header="Name"></Column>
              <Column field="age" alignHeader={'center'} sortable header="Age"></Column>
              <Column field="year_of_exp" alignHeader={'center'} sortable header="Yoe"></Column>
              <Column field="department" alignHeader={'center'} sortable header="Department"></Column>
          </DataTable>
       
            {selectedDetails && (
              <div className="custom-card-overlay">
                  <Card className="custom-card" title={`Name: ${selectedDetails.first_name} ${selectedDetails.last_name}`}>
                      <p>Age: {selectedDetails.age}</p>
                      <p>Year of Experience: {selectedDetails.year_of_exp}</p>
                      <p>Department: {selectedDetails.department}</p>
                      <Button label="Close" className='close' onClick={handleCloseCard} text
                      />
                  </Card>
              </div>  
              )} 

    </div>


    </Navbar>
  )
}