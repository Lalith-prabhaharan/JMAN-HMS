import React, { useState } from 'react';
import '../style/AdminAllPatientStatus.css';
import { Navbar } from './navbar';
import axios from 'axios';
import { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { approvedpatients } from '../services/services';

export default function AdminAllPatient() { 

    const [approvedList,setApprovedList]=useState([[]])
    useEffect(() => {
        const fetchData=()=>{
            approvedpatients("http://localhost:5000/api/v1/admin/patient/status")
            .then(response=>{
                if(response.length==0) console.log("Error")
                else setApprovedList(response.data)
            })
        }
        fetchData();
    }, [approvedList])

  return (
        <Navbar>
          <div className='status'>
          <h2 style={{textAlign:"center",color:"#00866E",display: "inline",
                verticalAlign:"middle"}}>All Patients</h2>
                    <DataTable removableSort paginator rows={10} value={approvedList}>
                        <Column field="patient_id" alignHeader={'center'} sortable header="Patient ID"></Column>
                        <Column field="first_name" alignHeader={'center'} sortable header="Name"></Column>
                        <Column field="status" alignHeader={'center'} sortable header="Status"></Column>
                    </DataTable>
            </div>

        </Navbar>
  )
}
