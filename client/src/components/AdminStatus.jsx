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
              <Card className="custom-card"  title={
                      <div className="card-title" style={{display: "flex", alignItems:"center"}}>
                          <span style={{flex: "1"}}>APPLICANT INFO</span>
                          <i style={{flex: "0"}} className="pi pi-times" onClick={handleCloseCard}></i>
                      </div>
                } >
                <div>
                  <div style={{display: "flex", flexDirection:"column", justifyContent:"space-evenly"}}>
                    <div style={{fontSize:"1.5rem" ,color: "#00856c"}}>
                      <span>{`${selectedDetails.first_name} ${selectedDetails.last_name}`}</span>
                    </div>
                    <div  style={{display: "flex"}}>
                      <p style={{flex: "1"}}><b>Entry Date :</b><br></br><span style={{color: "#00856c"}}> {selectedDetails.entry_date}</span></p>
                      <p style={{flex: "1"}}><b>Description :</b><br></br><span style={{color: "#00856c"}}> {selectedDetails.diseases_description}</span></p>
                    </div>
                    <div  style={{display: "flex"}}>
                      <p style={{flex: "1"}}><b>Doctor :</b><br></br><span style={{color: "#00856c"}}> {selectedDetails.doctor_name}</span></p>
                      <p style={{flex: "1"}}><b>History :</b><br></br><span style={{color: "#00856c"}}> {selectedDetails.history}</span></p>
                    </div>
                    <div  style={{display: "flex"}}>
                      <p style={{flex: "1"}}><b>Status :</b><br></br><span style={{color: "#00856c"}}> {selectedDetails.status}</span></p>
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
                {selectedDetails.reason !== null && (<div style={{display: "flex"}}><div style={{color:"red"}}><b>Reason:&nbsp;</b></div> <div style={{color: "blue"}}> {selectedDetails.reason}</div></div>)}
                {selectedDetails.status === 'rejected' &&<Button label="Reapply" className='approve' onClick={(e) => {handleReapply(e, selectedDetails)}} style={{marginLeft: "35%", marginTop: "15px"}} text/>}
              </Card>
            </div>  
          )} 
        </div>
      </Navbar>
  );
}
