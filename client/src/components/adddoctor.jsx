import React, { useState } from 'react'
import { Navbar } from './navbar'
import { InputText } from 'primereact/inputtext'
import "../style/addDoctor.css"
import { adddoctor, doctordetails } from '../services/services'
import { Dropdown } from 'primereact/dropdown'
import { Calendar} from 'primereact/calendar'
import { Password } from 'primereact/password'
import { Divider } from 'primereact/divider'
import { useEffect } from 'react'
import axios from 'axios'

export const Adddoctor = () => {

    const [docdetails,setdocdetails]=useState({
        docfirstname:"",doclastname:"",docemail:"",docpass:"",docage:"",docdob:"",docgender:"",doccontact:"",docdept:"",docexp:""
    })

    const departments = ['cardiology','dermatology','pediatrics','gynecology','neurology','urology','orthopedics','radiology'
    ,'oncology','general'];
  
    const gender=[{ label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
    { label: 'Prefer Not to Say', value: 'N' }]
    const handleChange=(e)=>{
        setdocdetails({...docdetails,[e.target.name]:e.target.value})
    }

    const header = <div className="font-bold mb-3">Pick a password</div>;
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </>
    );

    const submit=()=>{
        console.log(docdetails)
        const addDoctor=async()=>{
            const response=adddoctor({
                first_name:docdetails.docfirstname,
                last_name:docdetails.doclastname,
                email:docdetails.docemail,
                password:docdetails.docpass,
                age:docdetails.docage,
                dob:docdetails.docdob,
                gender:docdetails.docgender,
                phone:docdetails.doccontact,
                department:docdetails.docdept,
                year_of_exp:docdetails.docexp,
            })
        }
        addDoctor();
        const sendMail=async()=>{
            const res=axios.post("http://localhost:5000/api/v1/admin/add/doctor",{
                name:docdetails.docfirstname,
                email:docdetails.docemail,
                department:docdetails.docdept
            })
        }
        sendMail()
    }
    

  return (
    <Navbar>
        <h2 className='heading' style={{marginTop: "20px"}}>Add Doctor</h2>
        <div className="add-doctor">
            <div className='left-det'>
            <span className="p-float-label" >
                <InputText id="username" value={docdetails.docfirstname} onChange={handleChange} name='docfirstname' />
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
            <span className="p-float-label" >
                <InputText id="username" value={docdetails.doccontact} onChange={handleChange} name='doccontact' />
                <label htmlFor="username">Contact</label>
            </span>
            </div>
            <div className='right-det'>
            <div  className="right-input">
                <Calendar value={docdetails.docdob} onChange={handleChange} name='docdob' placeholder='Select DOB'/>
            </div>
            <div className="right-input">
                <Password value={docdetails.docpass} onChange={handleChange} header={header} footer={footer} placeholder='Enter Password'  name='docpass' toggleMask/>    
            </div>
            <div  className="right-input">
                <Dropdown value={docdetails.docgender} onChange={handleChange} options={gender} optionLabel="label"  name='docgender'
                    placeholder="Select Gender" />    
            </div>
            <div className="right-input">
                <Dropdown value={docdetails.docdept} onChange={handleChange} options={departments} optionLabel=""  name='docdept'
                    placeholder="Select the Department" />    
            </div>
            <div className="right-input p-float-label" style={{marginTop: "12px"}}>
                <InputText id="username" value={docdetails.docexp} onChange={handleChange} name='docexp' />
                <label htmlFor="Experience">Year of Experience</label>
            </div>
            </div>
        </div>
        <div className='btn-center'>
            <button className="button-1" onClick={submit} style={{alignContent:'center'}}>Submit</button>
        </div>
    </Navbar>
  )
}
