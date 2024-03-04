import React, { useState } from 'react';
import '../style/AdminAllPatientStatus.css';
import { Navbar } from './navbar';
import axios from 'axios';
import { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { approvedpatients, searchPatients } from '../services/services';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext'


export default function AdminAllPatient() { 
  const navigate=useNavigate()
  const [status, setStatus] = useState("active");
  const [approvedList,setApprovedList]=useState([[]]);

  const handlePatient=(event)=>{
    setStatus(event.target.value);
  };


  /////////////// test///////////////
  const [inputText, setInputText] = useState('');

  // Event handler to update inputText state
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  ////////////////////////////////////



  useEffect( ()=>{
      if(inputText === ""){
        approvedpatients(status).then((response)=>{
          setApprovedList(response.data);
        }).catch(error=>{
          console.error("error in fetching data",error);
        })
      }
      else{
        searchPatients(status, inputText).then((response2) => {
          setApprovedList(response2.data);
        }).catch(error=>{
          console.error("error in fetching data",error);
        })
      }
  });

  const getRiskLabel = (risk) => {
      switch (risk) {
        case "0":
          return 'Low';
        case "1":
          return 'Moderate';
        case "2":
          return 'High';
      }
  };

  const riskBodyTemplate = (rowData) => {
    const riskLabel = getRiskLabel(rowData.risk);
    return <span>{riskLabel}</span>;
  };

  const handleRowClick=(e)=>{
    navigate("/adminviewpatient",{state:{data:e.data.patient_id}})
  }

  return (
      <Navbar>
        <div className='status'>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <InputText type="text" style={{width: '50%', padding: '15px 50px', borderRadius: '30px', margin: "15px"}} value={inputText} onChange={handleInputChange} placeholder="Search by Name or ID..." />
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <select value={status} onChange={handlePatient} style={{ margin: "10px 0px", height: "30px" }} className="dropdown" >
                <option value="active" className="dropdown-content"> active </option>
                <option value="all" className="dropdown-content"> All </option>
                <option value="discharge" className="dropdown-content"> discharge </option>
              </select>
            </div> 
            <div style={{ textAlign: "center", width: "70%" }}>
              <h2 style={{ margin: "0px" }} className="page-heading">
                Patient List
              </h2>
            </div>
          </div>

          {/* <h2 style={{textAlign:"center",color:"#00866E", verticalAlign:"middle", margin:"0px 0px"}}>All Patients</h2> */}
          <DataTable removableSort paginator rows={10} value={approvedList} onRowClick={handleRowClick}>
            <Column field="patient_id" alignHeader={'center'} sortable header="Patient ID"></Column>
            <Column field="first_name" alignHeader={'center'} sortable header="Name"></Column>
            <Column field="risk" alignHeader={'center'} body={riskBodyTemplate} sortable header="Risk"></Column>
            <Column field="status" alignHeader={'center'} sortable header="Status"></Column>
          </DataTable>
        </div>
      </Navbar>
  );
}