import React from 'react'
import DoctorNav from "./DoctorNav";
import "../styles.css";
import "../style/Doctorviewpendingpatient.css";

export default function Doctorviewpendingpatient() {
    return (
        <div>
            <div>
                <DoctorNav />
            </div>
            <div className='form-container'>
                <form >
                    <fieldset>
                        <div className="flex-container">
                            <label>Name:</label>
                            <input type="text" className='inputboxDoc' required />
                        </div>

                        <div className="flex-container">
                            <label>Age:</label>
                            <input type="text" className='inputboxDoc' required  />
                        </div>

                        <div className="flex-container">
                            <label>Phone:</label>
                            <input type="text" className='inputboxDoc' required />
                        </div>

                        <div className="flex-container">
                            <label for="job">Blood Group:</label>
                            <input type="text" className='inputboxDoc' required />
                            
                        </div>

                        <div className="flex-container">
                            <label >Address:</label>
                            <textarea className='inputboxDoc' required > </textarea>
                        </div>

                        <div className="flex-container">
                            <label >Diseases Description:</label>
                            <textarea className='inputboxDoc'required > </textarea>
                        </div>

                    </fieldset>
                    <div className='btndoctor'>
                        <button id='btn1doc'>Approve</button>
                        <button id='btn2doc'> Reject </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
