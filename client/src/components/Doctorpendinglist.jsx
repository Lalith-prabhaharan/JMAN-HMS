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
    const [pendingList, setPendingList] = useState([[]]);
    const [flag, setflag] = useState(true);
    const [selectedDetails, setSelectedDetails] = useState(null);
    const [rejectReason, setRejectReason] = useState("");
    const [reasonCard, setReasonCard] = useState(false);
    const [appId, setAppID] = useState('');
    const [rejectError, setRejectError] = useState(false);

    const handleApprove = (id)=> {
        const toastSuccess = () => {
            toast.success('Approved Successfully');
        };
        approvePatients(id).then(response => {
            if(response.data.msg === "Success")
                toastSuccess();
        }).catch(err=>{
            console.log(err)
        });
    };

    const handleReject = (e, id)=> {
        try {
            if(rejectReason === "") {
                throw new Error("");
            }
            const toastSuccess = () => {
                toast.success('Rejected Successfully');
            };
            rejectPatients(id, rejectReason).then(response => {
                if(response.data.msg === "Success")
                    toastSuccess();
                    setAppID("");
                    setRejectError(false);
                    setReasonCard(false);
                    setRejectReason("");
            }).catch(err=>{
                setRejectError(true);
            }) ;            
        } catch (error) {
            setRejectError(true);
        }
    };

    const handleView = (pending) => {
        setSelectedDetails(pending);
    };

    const handleCloseCard = () => {
        setSelectedDetails(null);
    };

    useEffect(() => {
        doctorpending().then(response=>{
            if(pendingList.length>0){
                setPendingList(response.data)
                if(pendingList.msg === "No applicants Available" && flag === true){
                    setflag(false)
                }
            }
        }).catch(err=>{
            console.log(err)
        });
    });

    const viewButton=(pending)=>{
        return(
            <div className='action'> 
                <i className="pi pi-eye" style={{ fontSize: '1rem',marginBottom:'2%' }} onClick={() => handleView(pending)}></i><br></br>
                <i className='pi pi-check'  style={{  fontSize: '1rem', marginBottom:'2%' }}  onClick={
                    (e) => {
                        const id = pending.application_id;
                        setAppID(id); 
                        handleApprove(id)
                    }
                } /> <br></br>
                <i className='pi pi-trash' style={{  fontSize: '1rem', marginBottom:'2%' }} onClick={(e) => {setAppID(pending.application_id); setReasonCard(true)}} />
            </div>
        );
    };

    const getRiskLabel = (risk) => {
        switch (risk) {
          case "0":
            return 'Low';
          case "1":
            return 'Moderate';
          case "2":
            return 'High';
          default:
            return 'Unknown';
        }
      };
    
    const riskBodyTemplate = (rowData) => {
        const riskLabel = getRiskLabel(rowData.risk);
        return <span>{riskLabel}</span>;
    };


    return (
        <DoctorNav>
            <div className='status'>
                <h1 className='heading'>Pending Patients List</h1>
                    {
                        pendingList.length > 0 ?
                        <DataTable removableSort paginator rows={10} value={pendingList} className='pending'>
                        <Column  field="application_id" alignHeader={'center'} sortable header="Application ID" hidden></Column>
                        <Column  field="name" alignHeader={'center'} style={{width: "20%"}} sortable header="Name"></Column>
                        <Column  field="risk" alignHeader={'center'} style={{width: "20%"}} body={riskBodyTemplate} sortable header="Risk"></Column>
                        <Column  alignHeader={'center'} body={viewButton} headerStyle={{color: "white"}} style={{width: "20%"}}  header="Actions"></Column>
                    </DataTable>
                    :<p style={{textAlign:"center"}}>No Pending Patients !!</p>
                    }

                {selectedDetails && (
                    <div className="custom-card-overlay">
                        <Card className="custom-card"  title={
                            <div className="card-title" style={{display: "flex", alignItems:"center"}}>
                                <span style={{flex: "1"}}>OVERVIEW DETAILS</span>
                                <i style={{flex: "0"}} className="pi pi-times" onClick={handleCloseCard}></i>
                            </div>}>
                            <div>
                            <div style={{display: "flex", flexDirection:"column", justifyContent:"space-evenly"}}>
                                <div style={{fontSize:"1.5rem" ,color: "#00856c"}}>
                                <span>{`${selectedDetails.name}`}</span>
                                </div>
                                <div  style={{display: "flex"}}>
                                <p style={{flex: "1"}}><b>Age :</b><br></br><span style={{color: "#00856c"}}> {selectedDetails.age}</span></p>
                                <p style={{flex: "1"}}><b>Description :</b><br></br><span style={{color: "#00856c"}}> {selectedDetails.diseases_description}</span></p>
                                </div>
                                <div  style={{display: "flex"}}>
                                <p style={{flex: "1"}}><b>Phone :</b><br></br><span style={{color: "#00856c"}}> {selectedDetails.phone}</span></p>
                                <p style={{flex: "1"}}><b>History :</b><br></br><span style={{color: "#00856c"}}> {selectedDetails.history}</span></p>
                                </div>
                                <div  style={{display: "flex"}}>
                                <p style={{flex: "1"}}><b>Blood Group :</b><br></br><span style={{color: "#00856c"}}> {selectedDetails.blood_group}</span></p>
                                
                                {(selectedDetails.risk === '0') &&
                                    <p style={{flex: "1"}}><b>Risk :</b><br></br><span style={{color: "#00856c"}}> {riskBodyTemplate(selectedDetails)}</span></p>
                                }
                                {(selectedDetails.risk === '1') &&
                                    <p style={{flex: "1"}}><b>Risk :</b><br></br><span style={{color: "#e5ac02"}}> {riskBodyTemplate(selectedDetails)}</span></p>
                                }
                                {(selectedDetails.risk === '2') &&
                                    <p style={{flex: "1"}}><b>Risk :</b><br></br><span style={{color: "red"}}> {riskBodyTemplate(selectedDetails)}</span></p>
                                }
                                </div>
                            </div>
                            </div>
                        </Card>
                    </div>
                )}

                {reasonCard && (    
                    <div className="custom-card-overlay">
                        <Card className="custom-card" style={{padding: "0px", color: "red"}}>
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
                                style={{width: "353px", height: "188px", backgroundColor: "#eff3ef"}}/>
                            {rejectError && (<small className="p-error" style={{display: "block", marginLeft: "3px", fontWeight: "500"}}>Reason is required.</small>)}
                            <Button className='reject' style={{marginLeft: "130px", marginTop: "30px"}} onClick= {(e) => handleReject(e, appId)}>Reject</Button>
                        </Card>
                    </div>
                )}
            </div>
            
        </DoctorNav>
    );
}
