import React from 'react';
import '../style/Doctorpendinglist.css';
import { DoctorNav } from './DoctorNav';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Doctorviewpendingpatient from './Doctorviewpendingpatient';
export default function Doctorpendinglist() {
    const [pendingList, setPendingList] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/api/v1/doctor/pending",{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(response=>{
            setPendingList(response.data)
        })
        .catch(err=>{
            console.log(err)
        })
    })

    const id=useParams();

    return (
        <div>
            <div>
                <DoctorNav/>
            </div>
            <div className='status'>
            <h2>Pending Patients List</h2>
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
                                pendingList.map((pendings)=>(
                                    <tr key={pendings.application_id}>
                                    <td>{pendings.application_id}</td>
                                    <td>{pendings.name}</td>
                                    <td><Link className="status1" to={`/pending/${pendings.application_id}`} state={{data:pendings}}>View</Link></td>
                                    </tr>
                                ))
                                
                            }
                        </tbody>
                    </table>
            </div>
        </div>
    )

    
}
