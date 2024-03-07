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
      });
    }
    else{
      searchApplications(status, searchText).then((response2) => {
        setStatusList(response2.data);
      }).catch(error=>{
        console.error("error in fetching data",error);
      });
    }
  });

  return (
      <Navbar>
        <div className='status'>
          <div className="page-heading">
            <h2>Applications</h2>
          </div>
          <div style={{ display: "flex", alignItems:"center", justifyContent:"space-evenly"}}>
            <div style={{flex: "1"}}>
              <select value={status} onChange={handleStatus} style={{flex :"1", margin: "10px 0px", height: "30px" }} className="dropdown" >
                <option value="pending" className="dropdown-content"> Pending </option>
                <option value="approved" className="dropdown-content"> Approved </option>
                <option value="rejected" className="dropdown-content"> Rejected </option>
                <option value="all" className="dropdown-content"> All </option>
              </select>
            </div>
              <InputText type="text" style={{width: '50%', padding: '15px 50px', borderRadius: '15px', backgroundColor:"#bae8ca"}} value={searchText} onChange={handleInputChange} placeholder="Search Name or ID..." />
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
              <Card className="custom-card" title="Patient Information" style={{color: "blue"}}>
                <div className='patient-status'>
                  <h3 style={{color: "green"}}>{`${selectedDetails.first_name} ${selectedDetails.last_name}`} </h3>
                  <i className="pi pi-times" onClick={handleCloseCard}></i>
                </div>
                <div style={{color: "black"}}>
                  <p><b>Entry Date:</b><span style={{color: "blue"}}> {selectedDetails.entry_date}</span></p>
                  <p><b>Appointed Doctor:</b><span style={{color: "blue"}}> {selectedDetails.doctor_name}</span></p>
                  <p><b>Status:</b><span style={{color: "blue"}}> {selectedDetails.status}</span></p>
                  <p><b>Description:</b><span style={{color: "blue"}}> {selectedDetails.diseases_description}</span></p>
                  <div style={{display: "flex"}}><div><b>History:&nbsp;</b></div> <div style={{color: "blue"}}> {selectedDetails.history}</div></div>
                  <p><b>Risk:</b><span style={{color: "blue"}}> {riskBodyTemplate(selectedDetails)}</span></p>
                </div>
                {selectedDetails.reason !== null && (<div style={{display: "flex"}}><div style={{color:"red"}}><b>Reason:&nbsp;</b></div> <div style={{color: "blue"}}> {selectedDetails.reason}</div></div>)}
                {selectedDetails.status === 'rejected' &&<Button label="reapply" className='approve' onClick={(e) => {handleReapply(e, selectedDetails)}} style={{marginLeft: "35%", marginTop: "15px"}} text/>}
              </Card>
            </div>  
          )} 
        </div>
      </Navbar>
  );
}
