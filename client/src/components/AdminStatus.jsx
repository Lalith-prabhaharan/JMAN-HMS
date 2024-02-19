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
                <h2 style={{textAlign:"center",color:"#00866E",display: "inline",marginLeft: "20%",
                verticalAlign:"middle"}}>Application Status</h2>
            </div>
                    {/* <table>
                        <thead>
                            <tr>
                                <th>App_ID</th>
                                <th>Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                statusList.map((status)=>(
                                    <tr>
                                    <td>{status.application_id}</td>
                                    <td>{status.first_name} {status.last_name}</td>
                                    <td><a className="status1" href="">{status.status}</a></td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table> */}
                    <DataTable removableSort paginator rows={10} value={statusList}>
                        <Column field="application_id" alignHeader={'center'} sortable header="Application ID"></Column>
                        <Column field="first_name" alignHeader={'center'} sortable header="Name"></Column>
                        <Column field="status" alignHeader={'center'} sortable header="Status"></Column>
                    </DataTable>
            </div>
        </Navbar>
  )
}
