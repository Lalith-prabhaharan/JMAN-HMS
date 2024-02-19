import React, { useState } from 'react'
import { Navbar } from './navbar'
import { InputText } from 'primereact/inputtext'
import "../style/addDoctor.css"
import { doctordetails } from '../services/services'
import { Dropdown } from 'primereact/dropdown'

export const Adddoctor = () => {

    const [docdetails,setdocdetails]=useState({
        docname:"",doclastname:"",docemail:"",docage:"",docpass:"",doccontact:"",docgender:"",docdept:"",docexp:""
    })

    const departments = ['cardiology','dermatology','pediatrics','gynecology','neurology','urology','orthopedics','radiology'
    ,'oncology','general'];
  
    const gender=['Male','Female','Nil']

    const handleChange=(e)=>{
        setdocdetails({...docdetails,[e.target.name]:e.target.value})
        console.log(docdetails)
    }

  return (
    <Navbar>
        <h2 style={{marginTop:"20px",textAlign:"center"}}>Add Doctor</h2>
        <div className="add-doctor">
            <div className='left-det'>
            <span className="p-float-label" >
                <InputText id="username" value={docdetails.docname} onChange={handleChange} name='docname' />
                <label htmlFor="username">First name</label>
            </span>
            <span className="p-float-label">
                <InputText id="username" value={docdetails.doclastname} onChange={handleChange} name='doclastname' />
                <label htmlFor="username">Last name</label>
            </span>
            <span className="p-float-label">
                <InputText id="username" value={docdetails.docage} onChange={handleChange} name='docage'/>
                <label htmlFor="username">Age</label>
            </span>
            <span className="p-float-label">
                <InputText id="username" value={docdetails.docemail} onChange={handleChange} name='docemail' />
                <label htmlFor="username">Email</label>
            </span>
            </div>
            <div className='right-det'>
            <span style={{marginTop:"3%"}} className="p-float-label" >
                <InputText id="username" value={docdetails.doccontact} onChange={handleChange} name='doccontact' />
                <label htmlFor="username">Contact</label>
            </span>
            <div  className="card flex justify-content-center">
                <Dropdown value={docdetails.docgender} onChange={handleChange} options={gender} optionLabel=""  name='docgender'
                    placeholder="Select Gender" className="w-full md:w-14rem" />    
            </div>
            <div className="card flex justify-content-center">
                <Dropdown value={docdetails.docdept} onChange={handleChange} options={departments} optionLabel=""  name='docdept'
                    placeholder="Select the Department" className="w-full md:w-14rem" />    
            </div>
            <span className="p-float-label" >
                <InputText id="username" value={docdetails.docexp} onChange={handleChange} name='docexp' />
                <label htmlFor="username">Year of Experience</label>
            </span>
            </div>
        </div>
        <div className='btn-center'>
            <button className="button-1" style={{alignContent:'center'}}>Submit</button>
        </div>
    </Navbar>
  )
}
