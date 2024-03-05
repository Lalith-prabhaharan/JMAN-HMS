import React, { useEffect, useState } from 'react'
import "../style/viewpatient.css"
import { Navbar } from './navbar'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';
import { searchDoctors, getdeptdoctors } from '../services/services'
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';



export const Doctordetails = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [doctorList,setDoctorList]=useState([])
  const [dept, setDept] = useState("all");
  const departments = ['cardiology','dermatology','pediatrics','gynecology','neurology','urology','orthopedics','radiology','oncology','general'];
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleDepratment=(event)=>{
    setDept(event.target.value);
  };

  const handleRowClick = (e) => {
    setSelectedDetails(e.data);
  };

  const handleCloseCard = () => {
    setSelectedDetails(null);
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };


  useEffect( ()=>{
    if(searchText === ""){
      getdeptdoctors(dept).then((response)=>{
        setDoctorList(response.data)
      }).catch(error=>{
        console.error("error in fetching data",error)
      })
    }
    else{
      searchDoctors(dept, searchText).then((response2) => {
        setDoctorList(response2.data);
      }).catch(error=>{
        console.error("error in fetching data",error);
      })
    }
});

  return (
      <Navbar>
        <div className="status">

          <div style={{display: 'flex', justifyContent: 'center'}}>
            <InputText type="text" style={{width: '50%', padding: '15px 50px', borderRadius: '30px', margin: "15px"}} value={searchText} onChange={handleInputChange} placeholder="Search by Name or ID..." />
          </div>

          <div style={{ display: "flex", alignItems: "center"}}>
            <div>
              <select value = {dept} onChange={handleDepratment} style={{margin: "0"}} className='dropdown'>
                <option value="all" className='dropdown-content'>All</option>
                {
                  departments.map((department)=>(
                    <option key = {department} value={department} className='dropdown-content'>{department}</option>
                  ))
                }
              </select>
            </div>
            <div style={{ textAlign: "center", width: "70%" }}>
              <h2 style={{ margin: "0px" }} className="page-heading">Doctor List</h2>
            </div> 
          </div>
          
          <DataTable removableSort paginator rows={10} stripedRows  value={doctorList} onRowClick={handleRowClick}>
            <Column field="doc_id" alignHeader={'center'} sortable header="ID"></Column>
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
                <p>Department: {selectedDetails.department}</p><br />
                <Button label="Close" className='close' onClick={handleCloseCard} />
              </Card>
            </div>  
          )} 
        </div>
      </Navbar>
  )
}