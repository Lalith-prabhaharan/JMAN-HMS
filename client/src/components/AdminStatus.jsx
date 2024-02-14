import React, { useEffect, useState } from 'react';
import '../style/AdminAllPatientStatus.css';
import { Navbar } from './navbar';
import axios from 'axios';
export default function AdminStatus() {
  const[statusList,setStatusList]=useState([])
  useEffect(() => {
        axios.get("http://localhost:5000/api/v1/admin/patient/application/status")
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
      <div>
          <div>
          <Navbar/>
          </div>
          <div className='status'>
            <h2>Application Status</h2>
                    <table>
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
                    </table>
            </div>

    </div>
  )
}
