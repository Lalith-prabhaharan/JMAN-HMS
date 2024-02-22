import React from 'react';
import '../style/Doctorpendinglist.css';
import { DoctorNav } from './DoctorNav';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../interceptor/axios-config';
import { useState } from 'react';
import { doctorpending } from '../services/services';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { toast } from 'react-toastify';

export default function Doctorpendinglist() {
    const [pendingList, setPendingList] = useState([[]])
    const [flag, setflag] = useState(true)
    useEffect(() => {
        doctorpending()
        .then(response=>{
            setPendingList(response.data)
            if(pendingList.msg=="No applicants Available" && flag==true){
                toast.warn(pendingList.msg)
                setflag(false)
            }
        })
        .catch(err=>{
            console.log(err)
        }) 
    })

    const viewButton=(pending)=>{
        return <Link className="status1" to={`/pending/${pending.application_id}`} state={{data:pending}}>View</Link>
    }


    const approveButton=()=>{
        return <button id='btn1doc' >Approve</button>
    }
    const rejectButton=()=>{
       return <button id='btn2doc'>Reject</button>
    }

    const id=useParams();

    return (
        <DoctorNav>
            <div className='status'>
            <h1 className='heading'>Pending Patients List</h1>
                    {/* <table>
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
                    </table> */}
                    {
                        pendingList.length>1 &&
                        <DataTable removableSort paginator rows={10} value={pendingList}>
                        <Column field="application_id" alignHeader={'center'} sortable header="Application ID" hidden></Column>
                        <Column field="name" alignHeader={'center'} sortable header="Name"></Column>
                        <Column  alignHeader={'center'}  body={viewButton}  header="Status"></Column>
                        <Column  alignHeader={'center'}  body={approveButton}  header="Status"></Column>
                        <Column  alignHeader={'center'}  body={rejectButton}  header="Status"></Column>
                    </DataTable>
                    }
                    
            </div>
        </DoctorNav>
    )

    
}
