import React from 'react';
import '../style/Doctorpendinglist.css';
import { DoctorNav } from './DoctorNav';
import { useEffect } from 'react';
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { toast } from 'react-toastify';
import { doctorpending, approvePatients, rejectPatients } from '../services/services';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

export default function Doctorpendinglist() {
    const [pendingList, setPendingList] = useState([[]])
    const [flag, setflag] = useState(true)
    const [selectedDetails, setSelectedDetails] = useState(null);
    const [rejectReason, setRejectReason] = useState("");
    const [reasonCard, setReasonCard] = useState(false);
    const [appId, setAppID] = useState("");
    const [rejectError, setRejectError] = useState(false);

    const handleApprove = (id)=> {
        const toastSuccess = () => 
        {
            toast.success('Approved Successfully');
            console.log("Toast performed")
        }
        approvePatients(id)
        .then(response => {
            if(response.data.msg === "Success")
                toastSuccess();
          }
        )
        .catch(err=>{
            console.log(err)
        }) ;
    }

    const handleReject = (e, id)=> {
        try {
            if(rejectReason === "") {
                throw new Error("");
            }
            const toastSuccess = () => 
            {
                toast.success('Rejected Successfully');
                console.log("Toast performed")
            }
            rejectPatients(id, rejectReason)
            .then(response => {
                if(response.data.msg === "Success")
                    toastSuccess();
                    setAppID("");
                    setRejectError(false);
                    setReasonCard(false);
                    setRejectReason("");
              }
            )
            .catch(err=>{
                setRejectError(true);
            }) ;            
        } catch (error) {
            setRejectError(true);
        }
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
            if(pendingList.length>0){
                setPendingList(response.data)
                console.log(pendingList)
                if(pendingList.msg === "No applicants Available" && flag === true){
                    setflag(false)
                }
            }
            else{
                toast.warn("No pending applicants")
            }
        })
        .catch(err=>{
            console.log(err)
        }) 
    })

    const viewButton=(pending)=>{
        return(
            <div>
            <i className="pi pi-eye" style={{ fontSize: '1rem',marginBottom:'2%' }} onClick={() => handleView(pending)}></i><br></br>
            <Button className='approve'  style={{ marginBottom:'2%' }}  onClick={() => {setAppID(pending.application_id); handleApprove(appId)}}>Approve</Button> <br></br>
            <Button className='reject' onClick={() => {setAppID(pending.application_id); setReasonCard(true)}}>Reject</Button>
            </div>
        ) 
    }
    const approveButton=(pending)=>{
        return <Button className='approve' onClick={() => {setAppID(pending.application_id); handleApprove(appId)}}>Approve</Button>
    }
    const rejectButton=(pending)=>{
        return <Button className='reject' onClick={() => {setAppID(pending.application_id); setReasonCard(true)}}>Reject</Button>
    }

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
                        {/* <Column alignHeader={'center'}  body={approveButton}  header="Approve"></Column>
                        <Column alignHeader={'center'}  body={rejectButton}  header="Reject"></Column> */}
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

                {reasonCard && (    
                    <div className="custom-card-overlay">
                        <Card className="custom-card" style={{padding: "0px"}}>
                            <div style={{marginBottom: "30px"}}>
                                <h3 style={{display: "inline", marginRight:"140px"}}>Reason for Rejection </h3>
                                <i className="pi pi-times" onClick={() => setReasonCard(false)} style={{ fontSize: '1rem', cursor: "pointer"}}></i>
                            </div>
                            <InputTextarea 
                                autoResize
                                name='reason' 
                                rows={8} 
                                cols={20} 
                                onChange={(e) => {setRejectError(false); setRejectReason(e.target.value)}}
                                style={{width: "353px", height: "188px"}}/>
                            {rejectError && (<small className="p-error" style={{display: "block", marginLeft: "3px", fontWeight: "500"}}>Reason is required.</small>)}
                            <Button className='reject' style={{marginLeft: "130px", marginTop: "30px"}} onClick= {(e) => handleReject(e, appId)}>Reject</Button>
                        </Card>
                    </div>
                )}
            </div>
            
        </DoctorNav>
    )

    
}
