import "../style/viewpatient.css"
import { DoctorNav } from '../components/DoctorNav'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react'
import { doctorhandling} from "../services/services";
export const Viewpatient = () => {
  const [patientList,setPatientList]=useState([])
  useEffect(()=>{
    doctorhandling().then((response)=>{
      setPatientList(response.data)
    })
    .catch(error=>{
      console.error("error in fetching data",error)
    })
  })
  return (
    <DoctorNav>
      <div className="status">
      <h1 className='heading'>Handling Patients</h1>
          <DataTable removableSort paginator rows={10} stripedRows  value={patientList}>
              <Column field="patient_id" alignHeader={'center'} sortable header="id" hidden></Column>
              <Column field="first_name" alignHeader={'center'} sortable header="FirstName"></Column>
              <Column field="last_name" alignHeader={'center'} sortable header="LastName"></Column>
              <Column field="age" alignHeader={'center'} sortable header="Age"></Column>
          </DataTable>
      </div>
    </DoctorNav>
  )
}
