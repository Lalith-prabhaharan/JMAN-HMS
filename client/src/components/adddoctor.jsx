import React, { useState } from 'react';
import { Navbar } from './navbar';
import { InputText } from 'primereact/inputtext';
import "../style/addDoctor.css";
import { adddoctor } from '../services/services';
import { Dropdown } from 'primereact/dropdown';
import { Calendar} from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



export const Adddoctor = () => {

    const [docdetails,setdocdetails]=useState({
        docfirstname:"",doclastname:"",docemail:"",docpass:"",docage:"",docdob:"",docgender:"",doccontact:"",docdept:"",docexp:""
    });

    const departments = ['cardiology','dermatology','pediatrics','gynecology','neurology','urology','orthopedics','radiology','oncology','general'];
    const gender=[{ label: 'Male', value: 'M' }, { label: 'Female', value: 'F' }, { label: 'Prefer Not to Say', value: 'N' }];

    const handleChange=(e)=>{
        setdocdetails({...docdetails,[e.target.name]:e.target.value});
    };

    const navigate=useNavigate();
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
        if (validateForm()){
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
                });
            };
            addDoctor();
            const sendMail=async()=>{
                const res=axios.post("http://localhost:5000/api/v1/admin/add/doctor",{
                    name:docdetails.docfirstname,
                    email:docdetails.docemail,
                    department:docdetails.docdept
                });
            };
            sendMail();
            toast.success('Doctor Added');
            navigate('/doctordetails', {state : null});
        }
    };

    function clearErrors() {
        let errors = document.getElementsByClassName('formerror');
        for (let item of errors) {
            item.innerHTML = "";
        }
    };
    
    function seterror(id, errormsg) {
        let element = document.getElementById(id);
        element.innerHTML = errormsg;
    };

    const validateForm = () => {
        let returnval = true;
        clearErrors();
        
        if(docdetails.docfirstname === ""){
            seterror("fname", "Enter First Name!");
            returnval = false;
        }
        if(docdetails.docage === ""){
            seterror("fage", "Enter Age!");
            returnval = false;
        }
        if(docdetails.docdob === ""){
            seterror("fdob", "Enter DOB!");
            returnval = false;
        }
        if(docdetails.docgender === ""){
            seterror("fgender", "Select Gender!");
            returnval = false;
        }
        if(docdetails.doccontact === ""){
            seterror("fcontact", "Enter Contact Details!");
            returnval = false;
        }
        if(docdetails.docemail === ""){
            seterror("femail", "Enter Email!");
            returnval = false;
        }
        if(!docdetails.docemail.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/
        )){
            seterror("femail", "Enter Valid Email!");
            returnval = false;
        }
        if(docdetails.docpass === ""){
            seterror("fpass", "Enter Password!");
            returnval = false;
        }
        if(docdetails.docdept === ""){
            seterror("fdept", "Enter Department!");
            returnval = false;
        }
        if(docdetails.docexp === ""){
            seterror("fexp", "Enter Experience!");
            returnval = false;
        }
    
        let x = docdetails.docfirstname.trim();
        if (x.length === 0) {
            seterror("fname", "Provide a valid name!");
            returnval = false;
        }
    
        if (docdetails.docage <0 || docdetails.docage>70){
            seterror("fage", "Must be between 0 to 70!");
            returnval = false;
        }
    
        if (docdetails.doccontact < 1000000000 || docdetails.doccontact > 9999999999){
            seterror("fcontact", "Mobile number must be in 10 digits!");
            returnval = false;
        }
    
        return returnval;
    };


    return (
        <Navbar>
            <h2 className='heading' style={{marginTop: "20px"}} >Add Doctor</h2>
            <div className="add-doctor">
                <div className='left-det'>
                    <div style={{display:"inline"}}>
                        <div id="fname"  className="required formerror"></div>
                        <span style={{width:"100%"}} className="p-float-label" >
                            <InputText id="username" value={docdetails.docfirstname} onChange={handleChange} name='docfirstname' required/>
                            <label htmlFor="username">First name<b className="required"> *</b></label>
                        </span>
                    </div>
                    <div style={{display:"inline"}}>
                        <div id="flname" style={{marginLeft: "30%"}} className="required formerror"></div>
                        <span className="p-float-label">
                            <InputText id="username" value={docdetails.doclastname} onChange={handleChange} name='doclastname' />
                            <label htmlFor="username">Last name</label>
                        </span>
                    </div>
                    <div style={{display:"inline"}}>
                        <div id="fage" style={{marginLeft: "30%"}} className="required formerror"></div>
                        <span className="p-float-label">
                            <InputText id="username" value={docdetails.docage} onChange={handleChange} name='docage' required/>
                            <label htmlFor="username">Age<b className="required">*</b></label>
                        </span>
                    </div>
                    <div style={{display:"inline"}}>
                        <div id="femail" style={{marginLeft: "30%"}} className="required formerror"></div>
                        <span className="p-float-label">
                            <InputText id="username" value={docdetails.docemail} onChange={handleChange} name='docemail' required/>
                            <label htmlFor="username">Email<b className="required"> *</b></label>
                        </span>
                    </div>
                    <div style={{display:"inline"}}>
                        <div id="fcontact" style={{marginLeft: "30%"}} className="required formerror"></div>
                        <span className="p-float-label" >
                            <InputText id="username" value={docdetails.doccontact} onChange={handleChange} name='doccontact' required/>
                            <label htmlFor="username">Contact<b className="required"> *</b></label>
                        </span>
                    </div>
                </div>
                <div className='right-det'>
                    <div style={{display:"inline"}}>
                        <div id="fdob" className="required formerror"></div>
                        <Calendar style={{marginTop:"0%"}} value={docdetails.docdob} onChange={handleChange} name='docdob' placeholder='select DOB *' required/>
                    </div>
                    <div style={{display:"inline"}}>
                        <div id="fpass" className="required formerror"></div>
                        <Password value={docdetails.docpass} onChange={handleChange} header={header} footer={footer} placeholder='Enter Password *'  name='docpass' toggleMask required/>    
                    </div>
                    <div style={{display:"inline"}}>
                        <div id="fgender" className="required formerror"></div>
                        <Dropdown value={docdetails.docgender} onChange={handleChange} options={gender} optionLabel="label"  name='docgender'
                            placeholder="Select Gender *" className="w-full md:w-14rem" required/>    
                    </div>
                    <div style={{display:"inline"}}>
                        <div id="fdept" className="required formerror"></div>
                        <Dropdown value={docdetails.docdept} onChange={handleChange} options={departments} optionLabel=""  name='docdept'
                            placeholder="Select the Department *" className="w-full md:w-14rem" required/>    
                    </div>
                    <div style={{display:"inline"}}>
                        <div id="fexp" className="required formerror"></div>
                        <span className="p-float-label">
                            <InputText id="username" value={docdetails.docexp} onChange={handleChange} name='docexp' required/>
                            <label htmlFor="username">Year of Experience<b className="required"> *</b></label>
                        </span>
                    </div>
                </div>
            </div>
            <div className='btn-center'>
                <button className="button-1" onClick={submit} style={{alignContent:'center', fontSize: "20px"}}><b>Submit</b></button>
            </div>
        </Navbar>
    );
}
