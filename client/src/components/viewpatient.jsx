import "../style/viewpatient.css"
import { DoctorNav } from '../components/DoctorNav'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useEffect, useState } from 'react'
import { doctorhandling} from "../services/services";
import { useNavigate} from "react-router-dom";
export const Viewpatient = () => {

  const [patientList,setPatientList]=useState([])
  const navigate=useNavigate();
  const handleRowClick = (e) => {
    navigate("/viewpatient" ,{state:{data:e.data.patient_id}})
  };

  useEffect(()=>{
    doctorhandling().then((response)=>{
        setPatientList(response.data)
    })
    .catch(error=>{
      console.error("error in fetching data",error)
    })
  })
  const getRiskLabel = (risk) => {
    switch (risk) {
      case "0":
        return 'Low';
      case "1":
        return 'Moderate';
      case "2":
        return 'High';
      default:
        return 'Unknown';
    }
  };

  const riskBodyTemplate = (rowData) => {
    const riskLabel = getRiskLabel(rowData.risk);
    return <span>{riskLabel}</span>;
  };

  return (
    <DoctorNav>
      <div className="status">
          <h1 className='heading'>Handling Patients</h1>
          {
          patientList.length > 0 &&
          <DataTable removableSort paginator rows={10} stripedRows  value={patientList} onRowClick={handleRowClick}>
              <Column field="patient_id" alignHeader={'center'} sortable header="id" ></Column>
              <Column field="first_name" alignHeader={'center'} sortable header="FirstName"></Column>
              <Column field="age" alignHeader={'center'} sortable header="Age"></Column>
              <Column field="risk" alignHeader={'center'} sortable header="Risk" body={riskBodyTemplate}></Column>
          </DataTable>}
      </div>
    </DoctorNav>
  )
}
