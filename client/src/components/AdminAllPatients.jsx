import React, { useState } from 'react';
import '../style/AdminAllPatientStatus.css';
import { Navbar } from './navbar';
import axios from 'axios';
import { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { approvedpatients } from '../services/services';

export default function AdminAllPatient() { 
  const [status, setStatus] = useState("active");
  const [approvedList,setApprovedList]=useState([[]]);

  const handlePatient=(event)=>{
      setStatus(event.target.value);
  };

  useEffect(()=>{
      approvedpatients(status).then((response)=>{
        setApprovedList(response.data)
      })
      .catch(error=>{
        console.error("error in fetching data",error)
      })
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

  return (
      <Navbar>
        <div className='status'>
          <div style={{paddingTop:"50px"}}>
            <select value = {status} onChange={handlePatient} style={{margin: "0"}} className='dropdown'>
              <option value="active" className='dropdown-content'>active</option>
              <option value="all" className='dropdown-content'>All</option>
              <option value="discharge" className='dropdown-content'>discharge</option>
            </select>
            <h2 className='page-heading'>Patient List</h2>    
          </div>

          {/* <h2 style={{textAlign:"center",color:"#00866E", verticalAlign:"middle", margin:"0px 0px"}}>All Patients</h2> */}
          <DataTable removableSort paginator rows={10} value={approvedList}>
            <Column field="patient_id" alignHeader={'center'} sortable header="Patient ID"></Column>
            <Column field="first_name" alignHeader={'center'} sortable header="Name"></Column>
            <Column field="risk" alignHeader={'center'} body={riskBodyTemplate} sortable header="Risk"></Column>
            <Column field="status" alignHeader={'center'} sortable header="Status"></Column>
          </DataTable>
        </div>
      </Navbar>
  );
}