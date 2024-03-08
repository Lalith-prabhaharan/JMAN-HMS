import React, { useEffect, useState} from 'react';
import { DoctorNav } from './DoctorNav';
import '../style/Doctorviewpatient.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ScrollPanel } from 'primereact/scrollpanel';
import axiosInstance from '../interceptor/axios-config';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';



export default function Doctorviewpatient() {
    const navigate=useNavigate();
    const loc=useLocation();
    const {data}=loc.state || {};
    const [handlingDetails,setHandlingDetails]=useState([]);
    const [prescriptionData,setPrescriptionData]=useState([]);
    const [risk,setRisk]=useState("");
    const [changedRisk,setChangedRisk]=useState("");
    const [changeRiskFactor,setRiskFactor]=useState(false);
    const [reports,setReports]=useState([]);
    const risks=[{label:"Low",value:"0"}, {label:"Moderate",value:"1"}, {label:"High", value:"2"}];


    useEffect(() => {
        axiosInstance.get(`http://localhost:5000/api/v1/doctor/handling/${data}`).then((res)=>{
            setHandlingDetails(res.data);
        }).catch((err)=>console.log(err));

        axiosInstance.get(`http://localhost:5000/api/v1/prescription/getDetails/${data}`).then((res)=>{
            const resdata=res.data
            if(res.data.length>0){
                const sortedData = resdata.sort((a, b) => new Date(b.time_stamp) - new Date(a.time_stamp));
                setPrescriptionData(sortedData);
            }
        }).catch((err)=>console.log(err));

        const getRiskLabel = () => {
            if(handlingDetails.risk==="0") {
                setRisk('Low');
            }
            else if(handlingDetails.risk==="1") {
                setRisk('Moderate');
            }
            else if(handlingDetails.risk==="2") {
                setRisk('High');
            }
            else {
                setRisk('Unknown');
            }
        };
        if(handlingDetails)
            getRiskLabel();
          
        const res=axiosInstance.get(`http://localhost:5000/api/v1/prescription/patient/report/${data}`).then((res)=>{
            setReports(res.data);
        }).catch(err=>console.log(err));

    },[handlingDetails]);

    const [activeTab, setActiveTab] = useState('personalInfo');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const [medication,setMedication]=useState("");

    const addSuggestion=()=>{
        if (medication.trim().length !== 0){
            const response=axiosInstance.post("http://localhost:5000/api/v1/prescription/uploadprescription",{
                patient_id:handlingDetails.patient_id,
                doc_id:handlingDetails.doc_id,
                suggestion:medication
            });
            setMedication("");
            navigate('/viewpatient',{state:{data:data}});
        }
    };

    const discharge=(event)=>{
        event.preventDefault();
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept
        });
    };
    
    const accept=()=>{
        axiosInstance.patch(`http://localhost:5000/api/v1/doctor/discharge/${data}`).then(res=>{
            toast.success('Patient Discharged');
            navigate('/mypatients');
        }).catch(err=>console.log(err));
    };

    const handleRiskChange=()=>{
        axiosInstance.patch(`http://localhost:5000/api/v1/doctor//handling/risk/${data}`,{
            risk:changedRisk
        }).then(res=>{
            toast.success('Risk Changed');
            setRiskFactor(false);
        }).catch(err=>console.log(err));
    }

    const changeRisk=(e)=>{
        e.preventDefault();
        setRiskFactor(true);
    }

    const handleCloseCard=()=>{
        setRiskFactor(false);
    }

    const download=(report_id)=>{
        const fetch=()=>{
            const res=axiosInstance.get(`http://localhost:5000/api/v1/prescription/report/download/${report_id}`).then((res)=>{
                toast.success("Report Downloaded");
            }).catch(err=>console.log(err));
        }
        fetch();
    }

    const formatDateToWords = (inputDate) => {
        console.log(inputDate)
        const date = new Date(inputDate);
        // Format day with ordinal suffix
        const day = addOrdinalSuffix(date.getDate());
      
        // Get month name
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const month = monthNames[date.getMonth()];
      
        // Get year, hour, and minute
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();
      
        // Convert hour to 12-hour format and get am/pm
        const ampm = hour >= 12 ? 'pm' : 'am';
        const formattedHour = hour % 12 || 12;
      
        // Create the final formatted string
        const formattedDate = `${day} ${month} ${year} ${formattedHour}:${minute} ${ampm}`;
      
        return formattedDate;
      };

    const formatDate = (backendDate) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(backendDate);
        const formattedDate = date.toLocaleDateString('en-US', options);
        // Extract day, month, and year
        const [month, day, year] = formattedDate.split(' ');
        // Add ordinal suffix to the day
        const ordinalDay = addOrdinalSuffix(parseInt(day, 10));
      
        // Format the result
        return `${ordinalDay} ${month} ${year}`;
      };
      
      const addOrdinalSuffix = (num) => {
        const j = num % 10,
          k = num % 100;
        if (j === 1 && k !== 11) {
          return num + 'st';
        }
        if (j === 2 && k !== 12) {
          return num + 'nd';
        }
        if (j === 3 && k !== 13) {
          return num + 'rd';
        }
        return num + 'th';
      };

    return (
        <DoctorNav>
            <div className='docviewpatient'>
            <div className='sidetabs'>
                    <div
                        onClick={() => handleTabChange('personalInfo')}
                        style={{
                            cursor: 'pointer',
                            padding: '10px',
                            borderBottom: activeTab === 'personalInfo' ? '4px solid #3498db' : 'none',
                            color: activeTab === 'personalInfo' ? '#3498db' : '#333',
                        }}
                    >
                        Patient Info
                    </div>
                    <div
                        onClick={() => handleTabChange('prescription')}
                        style={{
                            cursor: 'pointer',
                            padding: '10px',
                            borderBottom: activeTab === 'prescription' ? '4px solid #3498db' : 'none',
                            color: activeTab === 'prescription' ? '#3498db' : '#333',
                        }}
                    >
                        Prescription
                    </div>
                </div>
                <div>
                    {activeTab === 'personalInfo' && (
                        <div className='form-containerdocview' id='left-col'>
                            <form className='AdminViewH2'>
                                <div className='h2Admin'>
                                    <h2>Patient Info</h2>
                                </div>
                                <div className='fieldsetmain'>
                                    <div className='left-view'>
                                        <div className="form-row">
                                            <label for="name" className="form-label">Name</label>
                                            <input type="text" id="name" name="name" style={{fontWeight:"bolder"}} className="form-input" readOnly={true} value={handlingDetails.first_name + " " + handlingDetails.last_name} />
                                        </div>
                                        <div className="form-row">
                                            <label for="age" className="form-label">Age</label>
                                            <input type="number" id="age" name="age" className="form-input" readOnly={true} value={handlingDetails.age} />
                                        </div>
                                        <div className="form-row">
                                            <label for="gender" className="form-label">Gender</label>
                                            <input type="text" id="gender" name="gender" className="form-input" readOnly={true} value={handlingDetails.gender} />
                                        </div>
                                        <div className="form-row">
                                            <label for="dob" className="form-label">Phone No</label>
                                            <input type="text" id="phoneno" name="phoneno" className="form-input" readOnly={true} value={handlingDetails.phone} />
                                        </div>
                                        <div className="form-row">
                                            <label for="patientaddress" className="form-label">Address</label>
                                            <textarea id="patientaddress" name="patientaddress" className="form-input" rows="3" readOnly={true} value={handlingDetails.address}  ></textarea>
                                        </div>
                                        <div className="form-row">
                                            <label for="weight" className="form-label">Weight:</label>
                                            <input type="text" id="weight" name="weight" className="form-input" value={handlingDetails.weight+" kg"} />
                                        </div>
                                    </div>
                                    <div className='right-view'>
                                        <div className="form-row">
                                            <label for="risk" className="form-label">Risk</label>
                                            <input id="risk" name="risk" className="form-input" readOnly={true} value={risk}  ></input>
                                        </div>
                                        <div className="form-row">
                                            <label for="description" className="form-label">Desc</label>
                                            <textarea id="description" name="description" className="form-input" readOnly={true} rows="3" value={handlingDetails.diseases_description}></textarea>
                                        </div>
                                        <div className="form-row">
                                            <label for="medicalHistory" className="form-label">Medical History</label>
                                            <textarea id="medicalHistory" name="medicalHistory" className="form-input" readOnly={true} rows="3" value={handlingDetails.history}  ></textarea>
                                        </div>
                                        <div className="form-row">
                                            <label for="bloodGroup" className="form-label">Blood Group</label>
                                            <input type="text" id="bloodGroup" name="bloodGroup" className="form-input" readOnly={true} value={handlingDetails.blood_group} />
                                        </div>  
                                        <div className="form-row">
                                            <label for="entry" className="form-label">Entry Date</label>
                                            <input id="entry" name="entry" className="form-input" value={formatDate(handlingDetails.entry_date)}  ></input>
                                        </div>
                                    </div>
                                </div>
                                <ConfirmPopup />
                                <div>
                                    <Button id='btn1doc'  onClick={discharge} icon="pi pi-check">Discharge</Button>
                                    <Button id='btn1doc'  style={{marginLeft:"2%"}} onClick={changeRisk} >Change Risk</Button>
                                </div>
                            </form>
                            {changeRiskFactor && (
                                <div className="custom-card-overlay">
                                    <Card className="custom-card" title="Change Risk Factor"> 
                                        <div className="flex justify-content-center">
                                            <Dropdown value={changedRisk} onChange={(e) => setChangedRisk(e.value)}
                                            options={risks} optionLabel='label' optionValue='value' placeholder='select Risk'/>
                                        </div>
                                        <button style={{marginTop:"4%"}} label="Submit" id='btn1doc' onClick={handleRiskChange}>Submit</button> 
                                        <button style={{marginLeft:"2%"}} id='btn1doc' onClick={handleCloseCard}>Close</button>
                                    </Card>
                                </div>
                            )}
                            <div className="card">
                                <h2>Report Details</h2>
                                <div className="card-body">
                                    {reports.length>0?
                                    //  reports.map((report)=>(
                                    //     <div className="report-link"  key={report.report_id} >{report.file_name}<i className="pi pi-download"style={{cursor:"pointer", fontSize: '1rem',marginLeft:'5%' }} onClick={() => download(report.report_id)} ></i></div> 
                                    // ))
                                    <ScrollPanel style={{ width: '100%', height: '408px' }}>
                                        {reports.map((report)=>(
                                            <div key={report.report_id} className="suggestion-item">
                                                <h5>{formatDateToWords(report.time_stamp)}</h5>
                                                {report.file_name}<i className="pi pi-download"style={{cursor:"pointer", fontSize: '1rem',marginLeft:'5%' }} onClick={() => download(report.report_id)} ></i>
                                            </div>
                                        ))}
                                    </ScrollPanel>
                                    :<p>No reports are uploaded !!</p>}
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'prescription' && (
                        <div className='right-col'>
                            <div className='btndoctor'>
                                <textarea className="text-box" style={{ fontSize: "20px" }} placeholder="add new suggestion/medication" value={medication} onChange={(e)=>setMedication(e.target.value)}></textarea>
                                <div className='btnViewdoc1'>
                                    <button id='btn1doc' onClick={addSuggestion}>Add</button>
                                </div>
                            </div>

                            <div id="suggestions-card">
                                <h2>Suggestions and Medications</h2>
                                { prescriptionData.length>0 ?
                                    <ScrollPanel style={{ width: '100%', height: '388px' }}>
                                        {prescriptionData.map((prescription)=>(
                                            <div key={prescription.p_id} className="suggestion-item">
                                                <h5>{formatDateToWords(prescription.time_stamp)}</h5>
                                                {prescription.medication}
                                            </div>
                                        ))}
                                    </ScrollPanel>:<p>No prescription provided for the patient !!</p>
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DoctorNav>
    );
}