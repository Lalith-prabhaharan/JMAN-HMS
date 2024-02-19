import React, { useEffect,useState } from 'react'
import {DoctorNav }from "./DoctorNav";
import "../style/Doctorviewpendingpatient.css";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Doctorviewpendingpatient() {
    const loc=useLocation();
    const {data}=loc.state;
    const [detailsList, setDetailsList] = useState([" "])
    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/doctor/pending/${data.application_id}`,{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(response=>{
            if(response.length==0)console.log("No data found")
            else{
                setDetailsList(response.data)
            }
        }).catch(err=>console.log(err))
    })
    return (
        <div>
            <div>
                <DoctorNav />
            </div>
            <div className='form-container'>
                <form >
                    <fieldset>
                        <h2 style={{textAlign:'center'}}>Patient Details</h2>
                        
                        <div className="flex-container">
                            <label>Name:</label>
                            <b>{detailsList.name}</b>
                        </div>

                        <div className="flex-container">
                            <label>Age:</label>
                            <b>{detailsList.age}</b>                 
                        </div>

                        <div className="flex-container">
                            <label>Phone:</label>
                            <b>{detailsList.phone}</b>
                        </div>

                        <div className="flex-container">
                            <label >Blood Group:</label>
                            <b>{detailsList.blood_group}</b>                    
                        </div>

                        <div className="flex-container">
                            <label >Diseases Description:</label>
                            <b>{detailsList.description} </b>
                        </div>

                        <div className="flex-container">
                            <label >History:</label>
                            <b>{detailsList.history}</b>
                        </div>                      
                    </fieldset>
                    <div className='btndoctor'>
                        <button id='btn1doc' >Approve</button>
                        <button id='btn2doc'> Reject </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
