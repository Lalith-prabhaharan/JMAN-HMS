import "../style/viewpatient.css"
import { DoctorNav } from '../components/DoctorNav'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react'
import { getAllPatients } from "../services/services";
export const Viewpatient = () => {
  const [patientList,setPatientList]=useState([])
  useEffect(()=>{
    getAllPatients().then((response)=>{
      setPatientList(response.data)
      console.log(patientList);
    })
    .catch(error=>{
      console.error("error in fetching data",error)
    })
  })
  return (
    <DoctorNav>
    </DoctorNav>
  )
}
