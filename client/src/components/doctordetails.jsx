import React, { useEffect, useState } from 'react';
import "../style/viewpatient.css";
import { Navbar } from './navbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { searchDoctors, getdeptdoctors } from '../services/services';
import { InputText } from 'primereact/inputtext';



export const Doctordetails = () => {
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
      });
    }
    else{
      searchDoctors(dept, searchText).then((response2) => {
        setDoctorList(response2.data);
      }).catch(error=>{
        console.error("error in fetching data",error);
      });
    }
});

  return (
      <Navbar>
        <div className="status">
          <div className="page-heading">
              <h2>Doctor List</h2>
          </div>  

          <div style={{ display: "flex", alignItems:"center", justifyContent:"space-evenly"}}>
            <div style={{flex: "1"}}>
              <select value = {dept} onChange={handleDepratment} style={{flex :"1", margin: "10px 0px", height: "30px" }} className='dropdown'>
                <option value="all" className='dropdown-content'>All</option>
                {
                  departments.map((department)=>(
                    <option key = {department} value={department} className='dropdown-content'>{department}</option>
                  ))
                }
              </select>
            </div>
            <InputText type="text" style={{width: '50%', padding: '15px 50px', borderRadius: '15px', backgroundColor:"#bae8ca"}} value={searchText} onChange={handleInputChange} placeholder="Search Name or ID..." />
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
              <Card className="custom-card" style={{width: "450px"}}  title={
                      <div className="card-title" style={{display: "flex", alignItems:"center"}}>
                          <span style={{flex: "1"}}>DOCTOR INFO</span>
                          <i style={{flex: "0"}} className="pi pi-times" onClick={handleCloseCard}></i>
                      </div>
                } >
                  <div>
                  <div style={{display: "flex", flexDirection:"column", justifyContent:"space-evenly"}}>
                    <div style={{fontSize:"1.5rem" ,color: "#00856c"}}>
                      <span>{`${selectedDetails.first_name} ${selectedDetails.last_name}`}</span>
                    </div>
                    <div  style={{display: "flex"}}>
                      <p style={{flex: "1"}}><b>Age :</b><br></br><span style={{color: "#00856c"}}> {selectedDetails.age}</span></p>
                      <p style={{flex: "1"}}><b>Department :</b><br></br><span style={{color: "#00856c"}}> {selectedDetails.department}</span></p>
                    </div>
                    <div  style={{display: "flex"}}>
                      <p style={{flex: "1"}}><b>Experience :</b><br></br><span style={{color: "#00856c"}}> {selectedDetails.year_of_exp}</span></p>
                      <p style={{flex: "1"}}><b>Patients Handling :</b><br></br><span style={{color: "#00856c"}}> {selectedDetails.handling}</span></p>
                    </div>
                  </div>
                </div>
              </Card>  
            </div>  
          )} 
        </div>
      </Navbar>
  );
}