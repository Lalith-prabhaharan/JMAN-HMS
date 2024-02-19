import React from 'react';
import '../style/Doctorpendinglist.css';
import { DoctorNav } from './DoctorNav';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../interceptor/axios-config';
import { useState } from 'react';
import { doctorpending } from '../services/services';

export default function Doctorpendinglist() {
    const [pendingList, setPendingList] = useState([])
    useEffect(() => {
        doctorpending()
        .then(response=>{
            setPendingList(response.data)
        })
        .catch(err=>{
            console.log(err)
        })
    })

    const id=useParams();

    return (
        <DoctorNav>
            <div className='status'>
            <h2>Pending Patients List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>S. No.</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Approve</th>
                                <th>Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pendingList.map((pendings, index)=>(
                                    <tr key={pendings.application_id}>
                                    <td>{index+1}</td>
                                    <td>{pendings.name}</td>
                                    <td><Link className="status1" to={`/pending/${pendings.application_id}`} state={{data:pendings}}>View</Link></td>
                                    <td><button id='btn1doc' >Approve</button></td>
                                    <td><button id='btn2doc'> Reject </button></td>
                                    </tr>
                                ))
                                
                            }
                        </tbody>
                    </table>
            </div>
        </DoctorNav>
    )

    
}
