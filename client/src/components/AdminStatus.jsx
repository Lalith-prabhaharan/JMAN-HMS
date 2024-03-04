import React, { useEffect, useState } from 'react';
import '../style/AdminAllPatientStatus.css';
import { Navbar } from './navbar';
import { adminstatus, searchApplications } from '../services/services';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';



export default function AdminStatus() {
  
  const navigate = useNavigate();
  const[statusList,setStatusList]=useState([]);
  const statuses=["approved","pending","rejected"];
  const[status,setStatus]=useState("pending");
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleStatus=(event)=>{
    setStatus(event.target.value);
  };

  const handleRowClick = (e) => {
    setSelectedDetails(e.data);
  };

  const handleCloseCard = () => {
    setSelectedDetails(null);
  };
 
  const handleReapply = (e, patient) => {
    patient.riskCode = getRiskLabel(patient.risk);
    e.preventDefault();
    navigate('/addpatient', {state: {data: patient}});
    localStorage.setItem('activetab','addpatient')
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const getRiskLabel = (risk) => {
    switch (risk) {
      case "0":
        return 'Low';
      case "1":
        return 'Moderate';
      case "2":
        return 'High';
    }
  };

  const riskBodyTemplate = (rowData) => {
    const riskLabel = getRiskLabel(rowData.risk);
    return <span>{riskLabel}</span>;
  };

  useEffect( ()=>{
    if(searchText === ""){
      adminstatus(status).then((response)=>{
        if(response.length===0){
          setStatusList([]);
        }else{
          setStatusList(response.data);
        }
      }).catch(error=>{
        console.error("error in fetching data",error);
      })
    }
    else{
      searchApplications(status, searchText).then((response2) => {
        setStatusList(response2.data);
      }).catch(error=>{
        console.error("error in fetching data",error);
      })
    }
  });

  return (
      <Navbar>
        <div className='status'>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <InputText type="text" style={{width: '50%', padding: '15px 50px', borderRadius: '30px', margin: "15px"}} value={searchText} onChange={handleInputChange} placeholder="Search by Name or ID..." />
          </div>

          <div style={{ display: "flex", alignItems: "center"}}>
            <div>
              <select value={status} onChange={handleStatus} style={{ margin: "10px 0px", height: "30px" }} className="dropdown" >
                <option value="pending" className="dropdown-content"> Pending </option>
                <option value="approved" className="dropdown-content"> Approved </option>
                <option value="rejected" className="dropdown-content"> Rejected </option>
                <option value="all" className="dropdown-content"> All </option>
              </select>
            </div>
            <div style={{ textAlign: "center", width: "70%" }}>
              <h2 style={{ margin: "0px" }} className="page-heading">Applications</h2>
            </div>
          </div>

          <DataTable removableSort paginator rows={10} value={statusList} onRowClick={handleRowClick}>
            <Column field="application_id" alignHeader={'center'} sortable header="ID"></Column>
            <Column field="first_name" alignHeader={'center'} sortable header="Name"></Column>
            <Column field="doctor_name" alignHeader={'center'} sortable header="Doctor"></Column>
            <Column field="risk" alignHeader={'center'} sortable header="Risk" body={riskBodyTemplate}></Column>
            <Column field="status" alignHeader={'center'} sortable header="Status"></Column>
          </DataTable>

          { selectedDetails && (
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
                {selectedDetails.status === 'Rejected' &&<Button label="Reapply" className='approve' onClick={(e) => {handleReapply(e, selectedDetails)}} style={{marginLeft: "35%"}} text/>}
              </Card>
            </div>  
          )} 
        </div>
      </Navbar>
  );
}
