import React, { useEffect, useState } from 'react';
import { DoctorNav } from './DoctorNav';
import '../style/Doctorviewpatient.css';
import axios from 'axios';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ScrollPanel } from 'primereact/scrollpanel';
import axiosInstance from '../interceptor/axios-config';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Doctorviewpatient() {
    const loc=useLocation();
    const {data}=loc.state;
    const [handlingDetails,setHandlingDetails]=useState([]);
    useEffect(() => {
        axiosInstance.get(`http://localhost:5000/api/v1/doctor/handling/${data}`).then((res)=>{
            setHandlingDetails(res.data)
        })
        .catch((err)=>console.log(err))
    },[handlingDetails])

    const [activeTab, setActiveTab] = useState('personalInfo');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className='main'>
        <div>
            <DoctorNav />
        </div>
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
                Personal Info
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
                    <form>
                        <fieldset>
                            <div className="form-row">
                                <label for="name" className="form-label">Name:</label>
                                <input type="text" id="name" name="name" className="form-input" required />
                            </div>
                            <div className="form-row">
                                <label for="age" className="form-label">Age:</label>
                                <input type="number" id="age" name="age" className="form-input" required />
                            </div>
                            <div className="form-row">
                                <label for="dob" className="form-label">Phone No:</label>
                                <input type="text" id="phoneno" name="phoneno" className="form-input" required />
                            </div>
                            <div className="form-row">
                                <label for="bloodGroup" className="form-label">Blood Group:</label>
                                <input type="text" id="bloodGroup" name="bloodGroup" className="form-input" required />
                            </div>
                            <div className="form-row">
                                <label for="description" className="form-label">Description:</label>
                                <textarea id="description" name="description" className="form-input" rows="4"></textarea>
                            </div>
                            <div className="form-row">
                                <label for="medicalHistory" className="form-label">Medical History:</label>
                                <textarea id="medicalHistory" name="medicalHistory" className="form-input" rows="4"></textarea>
                            </div>
                        </fieldset>
                    </form>
                    <div className="card">
                        <h2>Report Details</h2>
                        <div className="card-body">
                            <a href="report1.pdf" className="report-link" download>Download Report 1</a>
                            <a href="report2.pdf" className="report-link" download>Download Report 2</a>
                            <a href="report3.pdf" className="report-link" download>Download Report 3</a>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'prescription' && (
                <div className='right-col'>
                    <div className='btndoctor'>
                        <textarea className="text-box" placeholder="add new suggestion/medication" ></textarea>
                        <div className='btnViewdoc'>
                            <button id='btn1doc'>Add</button>
                        </div>
                    </div>

                    <div id="suggestions-card">
                        <h2>Suggestions and Medications</h2>
                        <ScrollPanel style={{ width: '100%', height: '200px' }}>
                            <div className="suggestion-item">Suggestion 1</div>
                            <div className="suggestion-item">Suggestion 2</div>
                            <div className="suggestion-item">Suggestion 3</div>
                            <div className="suggestion-item">Suggestion 4</div>
                            <div className="suggestion-item">Suggestion 5</div>
                            <div className="suggestion-item">Suggestion 6</div>
                            <div className="suggestion-item">Suggestion 7</div>
                            <div className="suggestion-item">Suggestion 8</div>
                        </ScrollPanel>
                    </div>
                </div>
            )}
        </div>
    </div>
    )
}
