import "../style/viewpatient.css";
import { DoctorNav } from '../components/DoctorNav';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useEffect, useState } from 'react';
import { doctorhandling, searchHandlePatients} from "../services/services";
import { useNavigate} from "react-router-dom";
import { InputText } from 'primereact/inputtext';



export const Viewpatient = () => {

  const [patientList,setPatientList]=useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate=useNavigate();

  const handleRowClick = (e) => {
    navigate("/viewpatient" ,{state:{data:e.data.patient_id}});
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect( ()=>{
    if(searchText === ""){
      doctorhandling().then((response)=>{
        setPatientList(response.data);
      }).catch(error=>{
        console.error("error in fetching data",error);
      });
    }
    else{
      searchHandlePatients(searchText).then((response2) => {
        setPatientList(response2.data);
      }).catch(error=>{
        console.error("error in fetching data",error);
      });
    }
  });
  


  const getRiskLabel = (risk) => {
    switch (risk) {
      case "0":
        return 'Low';
      case "1":
        return 'Moderate';
      case "2":
        return 'High';
      default:
        return 'Unknown'
    }
  };

  const riskBodyTemplate = (rowData) => {
    const riskLabel = getRiskLabel(rowData.risk);
    return <span>{riskLabel}</span>;
  };

  return (
    <DoctorNav>
      <h1 style={{fontFamily:"sans-serif",marginLeft:"2%",marginBottom:"-2%"}}>Hi {localStorage.getItem('name')},</h1>
      <div className="status">
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <InputText type="text" style={{width: '70%', padding: '15px 50px', borderRadius: '15px', margin: "15px", backgroundColor:"#bae8ca",marginBottom:"30px"}}  value={searchText} onChange={handleInputChange} placeholder="Search by Name or ID..." />
        </div>

        <h2 style={{ margin: "0px" }} className='heading'>Handling Patients</h2>

        {
        patientList.length > 0 ?
        <DataTable removableSort paginator rows={10} stripedRows  value={patientList} onRowClick={handleRowClick}>
            <Column field="patient_id" alignHeader={'center'} sortable header="id" ></Column>
            <Column field="first_name" alignHeader={'center'} sortable header="FirstName"></Column>
            <Column field="age" alignHeader={'center'} sortable header="Age"></Column>
            <Column field="risk" alignHeader={'center'} sortable header="Risk" body={riskBodyTemplate}></Column>
        </DataTable>
        :<p style={{textAlign:"center"}}>No patients are handled by you !!</p>
        }
      </div>
    </DoctorNav>
  );
}
