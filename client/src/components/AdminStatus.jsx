import React, { useEffect, useState } from 'react';
import '../style/AdminAllPatientStatus.css';
import { Navbar } from './navbar';
import { adminstatus } from '../services/services';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export default function AdminStatus() {
  const[statusList,setStatusList]=useState([])
  const statuses=["approved","pending","Rejected"]
  const[status,setStatus]=useState("")
  const [selectedDetails, setSelectedDetails] = useState(null);
  const handleStatus=(event)=>{
    setStatus(event.target.value)
  }

  const handleRowClick = (e) => {
    setSelectedDetails(e.data);
  };

  const handleCloseCard = () => {
    setSelectedDetails(null);
  };
 
  const navigate = useNavigate();
  const handleReapply = (e, patient) => {
    patient.riskCode = getRiskLabel(patient.risk);
    e.preventDefault();
    navigate('/addpatient', {state: {data: patient}});
    localStorage.setItem('activetab','addpatient')
  }

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

  useEffect(() => {
        adminstatus(status)
        .then((response)=>{
            if(response.length===0){console.log("No data found")}
            else{
                setStatusList(response.data)
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
                <DataTable removableSort paginator rows={10} value={statusList} onRowClick={handleRowClick}>
                    <Column field="application_id" alignHeader={'center'} sortable header="Application ID" hidden></Column>
                    <Column field="first_name" alignHeader={'center'} sortable header="Name"></Column>
                    <Column field="doctor_name" alignHeader={'center'} sortable header="Doctor"></Column>
                    <Column field="risk" alignHeader={'center'} sortable header="Risk" body={riskBodyTemplate}></Column>
                    <Column field="status" alignHeader={'center'} sortable header="Status"></Column>
                </DataTable>

                {selectedDetails && (
                    <div className="custom-card-overlay">
                        <Card className="custom-card">
                            <div className='patient-status'>
                                <h3>{`${selectedDetails.first_name} ${selectedDetails.last_name}`} </h3>
                                <i className="pi pi-times" onClick={handleCloseCard}></i>
                            </div>
                            <p>Entry Date: {selectedDetails.entry_date}</p>
                            <p>Appointed Doctor: {selectedDetails.doctor_name}</p>
                            <p>Status: {selectedDetails.status}</p>
                            <p>Description: {selectedDetails.description}</p>
                            <p>History: {selectedDetails.history}</p>
                            <p>Risk: {riskBodyTemplate(selectedDetails)}</p>
                            {selectedDetails.reason !== null && (<p>Reason: {selectedDetails.reason}</p>)}
                            {selectedDetails.status !== 'approved' &&<Button label="Reapply" className='approve' onClick={(e) => {handleReapply(e, selectedDetails)}} style={{marginLeft: "35%"}} text/>}
                        </Card>
                    </div>  
                )} 
            </div>
        </Navbar>
  )
}
