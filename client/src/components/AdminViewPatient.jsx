
import React, { useEffect, useState } from 'react';
import { Navbar } from './navbar';
import '../style/AdminViewPatient.css';
import axios from 'axios';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ScrollPanel } from 'primereact/scrollpanel';
import axiosInstance from '../interceptor/axios-config';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { useNavigate } from 'react-router-dom';


export default function AdminViewPatient() {
    const navigate=useNavigate();
    const loc = useLocation();
    const { data } = loc.state;
    const [handlingDetails, setHandlingDetails] = useState([]);
    const [prescriptionData, setPrescriptionData] = useState([]);
    const [risk, setRisk] = useState("");
    const[reports,setReports]=useState([]);

    useEffect(() => {
        axiosInstance.get(`http://localhost:5000/api/v1/admin/patient/status/${data}`).then((res) => {
            setHandlingDetails(res.data[0]);
        }).catch((err) => console.log(err));

        axiosInstance.get(`http://localhost:5000/api/v1/prescription/getDetails/${data}`).then((res) => {
            const resdata = res.data;
            if (res.data.length > 0) {
                const sortedData = resdata.sort((a, b) => new Date(b.time_stamp) - new Date(a.time_stamp));
                setPrescriptionData(sortedData);
            }
        }).catch((err) => console.log(err))

        const getRiskLabel = () => {
            if (handlingDetails.risk === "0") {
                setRisk('Low');
            }
            else if (handlingDetails.risk === "1") {
                setRisk('Moderate');
            }
            else if (handlingDetails.risk === "2") {
                setRisk('High');
            }
            else {
                setRisk('Unknown');
            }
        };

        if (handlingDetails)
            getRiskLabel();

        axiosInstance.get(`http://localhost:5000/api/v1/prescription/patient/report/${data}`)
        .then((res)=>{
            const resdata=res.data
            if (res.data.length > 0) {
                const sortedData = resdata.sort((a, b) => new Date(b.time_stamp) - new Date(a.time_stamp));
                setReports(sortedData)
            }
        })
        .catch(err=>console.log(err))

    }, [handlingDetails]);

    const [activeTab, setActiveTab] = useState('personalInfo');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };


    // For add files
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const renderUploadedFiles = () => {
        return uploadedFiles.map((file, index) => (
            <div key={index} className="uploaded-file">
                <span>{file.name}</span>
            </div>
        ));
    };
    
    const uploadfiles=()=>{
        for(let i=0; i<uploadedFiles.length;i++){
            const formData=new FormData();
            formData.append("patient_id",handlingDetails.patient_id);
            formData.append("doc_id",handlingDetails.doc_id);
            formData.append("file",uploadedFiles[i]);
            axios.post("http://localhost:5000/api/v1/prescription/report/upload",
                formData
            ,{headers: {
                'Content-Type': 'multipart/form-data',
            }}
            )
            .then((res)=>{
                console.log(res.data.message);
                if(res.data.message === 'Success'){
                    toast.success("File Uploaded Successfully!");
                }
                setUploadedFiles([]);
            }).catch((err)=>{
                if(err.response.data.message === 'Only PDF, JPEG, JPG, and PNG files are allowed!'){
                    toast.warn(err.response.data.message);
                }
                else if(err.response.data.message === 'Max file size: 5MB!'){
                    toast.warn(err.response.data.message);
                }
                setUploadedFiles([]);
            });
        }
    }

    const download=(report_id)=>{
        const fetch=()=>{
            const res=axiosInstance.get(`http://localhost:5000/api/v1/prescription/report/download/${report_id}`)
            .then((res)=>{
                toast.success("Report Downloaded Successfully!");
            }).catch(err=>console.log(err));
        }
        fetch();
    }

    const release=()=>{
        axiosInstance.delete(`http://localhost:5000/api/v1/admin/release/${handlingDetails.patient_id}`).then(res=>{
            toast.success('Patient Released');
            navigate('/allpatients');
        }).catch(err=>console.log(err));
    };

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
        <Navbar>
            <div className='adminviewpatient'>
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
                <div className='fullbody'>
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
                                            <input type="text" id="name" name="name" className="form-input" readOnly={true} style={{fontWeight:"bolder"}} value={handlingDetails.first_name + " " + handlingDetails.last_name} />
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
                                            <input type="text" id="weight" name="weight" className="form-input" value={handlingDetails.weight} />
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
                                {/* <button id='btn1doc' style={{ marginTop: "2%" }} onClick={release} >Release</button> */}
                            </form>
                            <div className="card">
                                <div className='h2Admin'>
                                    <h2>Report Details</h2>
                                    </div>
                    <div className="card-body">
                        {reports.length > 0 ?
                            // reports.map((report)=>(
                            // <div>
                            //     <p>{report.time_stamp}</p>
                            //     <div className="report-link"  key={report.report_id}  >{report.file_name}<i className="pi pi-download"style={{cursor:"pointer", fontSize: '1rem',marginLeft:'5%' }} onClick={() => download(report.report_id)} ></i></div> 
                            // </div>
                            // ))
                            <ScrollPanel style={{ width: '100%', height: '259px' }}>
                                {reports.map((report) => (
                                    <div key={report.report_id} className="suggestion-item">
                                        <h5>{formatDateToWords(report.time_stamp)}</h5>
                                        <p style={{ fontSize: "13px" }}>
                                            {report.file_name}
                                            <i className="pi pi-download" style={{ cursor: "pointer", fontSize: '1rem', marginLeft: '5%' }} onClick={() => download(report.report_id)} ></i>
                                        </p>
                                    </div>
                                ))}
                            </ScrollPanel>
                            : <p>No reports are uploaded !!</p>}
                    </div>
                    <div className="upload-section">
                        <label htmlFor="file-upload" className="custom-file-upload" style={{ marginTop: "15px" }}>Upload Files</label>
                        <input type="file"
                            id="file-upload"
                            accept=".pdf"
                            multiple
                            onChange={handleFileUpload}
                        
                        />
                        <button id="btn1doc" onClick={uploadfiles}>Upload</button>
                    </div>
                </div>
            </div>
                    )}
            {activeTab === 'prescription' && (
                <div className='right-col'>
                    <div id="suggestions-card">
                        <h2>Previous Suggestions and Medications</h2>
                        {prescriptionData.length > 0 ?
                            <ScrollPanel style={{ width: '100%', height: '383px' }}>
                                {prescriptionData.map((prescription) => (
                                    <div key={prescription.p_id} className="suggestion-item">
                                        <h5>{formatDateToWords(prescription.time_stamp)}</h5>
                                        {prescription.medication}
                                    </div>
                                ))}
                            </ScrollPanel> : <p>No prescription provided for the patient !!</p>
                        }
                    </div>
                </div>
            )}
        </div>
            </div >
        </Navbar >
    );
}