import React, { useEffect, useState } from 'react';
import '../style/AdminAllPatientStatus.css';
import { Navbar } from './navbar';
import { adminstatus } from '../services/services';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
export default function AdminStatus() {
  const[statusList,setStatusList]=useState([])
  const statuses=["approved","pending","Rejected"]
  const[status,setStatus]=useState("")
  const handleStatus=(event)=>{
    setStatus(event.target.value)
  }
  useEffect(() => {
        adminstatus(status)
        .then((response)=>{
            if(response.length==0){console.log("No data found")}
            else{
                setStatusList(response.data)
                console.log(statusList)
            }
        })
        .catch(error=>{
            console.log("Error")
        })
  }, )
  return (
        <Navbar>
          <div className='status'>
            <div style={{marginTop:"50px"}}>
                <select value = {status} onChange={handleStatus} style={{margin: "0"}} className='dropdown'>
                <option value="" className='dropdown-content'>All</option>
                {
                    statuses.map((status)=>(
                        <option key = {status} value={status} className='dropdown-content'>{status}</option>
                    ))
                    }
                </select>
                <h2 className='page-heading'>Application Status</h2>
            </div>
                <DataTable removableSort paginator rows={10} value={statusList}>
                    <Column field="application_id" alignHeader={'center'} sortable header="Application ID" hidden></Column>
                    <Column field="first_name" alignHeader={'center'} sortable header="Name"></Column>
                    <Column field="entry_date" alignHeader={'center'} sortable header="Entry Date"></Column>
                    <Column field="doctor_name" alignHeader={'center'} sortable header="Doctor"></Column>
                    <Column field="status" alignHeader={'center'} sortable header="Status"></Column>
                </DataTable>
            </div>
        </Navbar>
  )
}
