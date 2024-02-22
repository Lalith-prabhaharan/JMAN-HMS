import React from 'react';
import { DoctorNav } from './DoctorNav';
import '../style/Doctorviewpatient.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ScrollPanel } from 'primereact/scrollpanel';
export default function Doctorviewpatient() {
    return (
        <DoctorNav>
            <div className='docviewcontainer'>
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
                            <div className="suggestion-item">Suggestion 3</div>
                            <div className="suggestion-item">Suggestion 4</div>
                            <div className="suggestion-item">Suggestion 5</div>
                        </ScrollPanel>
                    </div>
                </div>
            </div >
        </DoctorNav>
    )
}
