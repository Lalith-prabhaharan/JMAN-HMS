import React from 'react';
import '../style/Doctorpendinglist.css';
import { DoctorNav } from './DoctorNav';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../interceptor/axios-config';
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { toast } from 'react-toastify';
import { doctorpending, approvePatients, rejectPatients } from '../services/services';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export default function Doctorpendinglist() {
    const [pendingList, setPendingList] = useState([[]])
    const [flag, setflag] = useState(true)
    const [selectedDetails, setSelectedDetails] = useState(null);
    const handleApprove = (id)=> {
        const toastSuccess = () => 
        {
            toast.success('Approved Successfully');
            console.log("Toast performed")
        }
        approvePatients(id)
        .then(response => {
            if(response.data.msg == "Success")
                toastSuccess();
          }
        )
        .catch(err=>{
            console.log(err)
        }) ;
    }

    const handleReject = (id)=> {
        console.log(id);
        const toastSuccess = () => 
        {
            toast.success('Rejected Successfully');
            console.log("Toast performed")
        }
        rejectPatients(id)
        .then(response => {
            if(response.data.msg == "Success")
                toastSuccess();
          }
        )
        .catch(err=>{
            console.log(err)
        }) ;
    }

    const handleView = (pending) => {
        setSelectedDetails(pending)
    };

    const handleCloseCard = () => {
        setSelectedDetails(null);
      };
    

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
        return <i className="pi pi-eye" style={{ fontSize: '1rem' }} onClick={() => handleView(pending)}></i>
    }
    const approveButton=(pending)=>{
        return <Button className='approve' onClick={() => handleApprove(pending.application_id)}>Approve</Button>
    }
    const rejectButton=(pending)=>{
        return <Button className='reject' onClick={() => handleReject(pending.application_id)}>Reject</Button>
    }

    const id=useParams();

    return (
        <DoctorNav>
            <div className='status'>
            <h1 className='heading'>Pending Patients List</h1>
                    {
                        pendingList.length > 0 &&
                        <DataTable removableSort paginator rows={10} value={pendingList}>
                        <Column field="application_id" alignHeader={'center'} sortable header="Application ID" hidden></Column>
                        <Column field="name" alignHeader={'center'} sortable header="Name"></Column>
                        <Column alignHeader={'center'}  body={viewButton}  header="View"></Column>
                        <Column alignHeader={'center'}  body={approveButton}  header="Approve"></Column>
                        <Column alignHeader={'center'}  body={rejectButton}  header="Reject"></Column>
                    </DataTable>
                    }

                {selectedDetails && (
                <div className="custom-card-overlay">
                  <Card className="custom-card" title={`Name: ${selectedDetails.name}`}>
                      <p>Age: {selectedDetails.age}</p>
                      <p>Phone: {selectedDetails.phone}</p>
                      <p>Blood Group: {selectedDetails.blood_group}</p>
                      <p>Description: {selectedDetails.diseases_description}</p>
                      <p>History: {selectedDetails.history}</p>
                      <Button label="Close" className='close' onClick={handleCloseCard} text
                      />
                  </Card>
                </div>  
              )} 
                    
            </div>
            
        </DoctorNav>
    )

    
}
