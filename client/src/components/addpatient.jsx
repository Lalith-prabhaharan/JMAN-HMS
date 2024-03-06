import React from 'react';
import { useState } from 'react';
import '../style/addpatient.css'
import { Navbar } from './navbar';
import { adminadd, getdeptdoctors, reapplyPatient } from '../services/services';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Calendar } from 'primereact/calendar';
import { useLocation } from 'react-router-dom';
import { RadioButton } from 'primereact/radiobutton';



export const Addpatient = () => {

  const location = useLocation();
  const data = location.state ? location.state.data : null;

  const navigate=useNavigate();

  const [firstname,setFirstname]=useState(data!= null ? data.first_name : "");
  const [lastname,setLastname]=useState(data!= null ? data.last_name : "");
  const [age,setAge]=useState(data!= null ? data.age: "");
  const [dob,setDob]=useState(data!= null ? new Date(data.dob) : "");
  const [contact,setContact]=useState(data!= null ? data.phone : "");
  const [email,setEmail]=useState(data != null ? data.email: "");
  const [address,setAddress]=useState(data != null ? data.address: "");
  const [weight,setWeight]=useState(data != null ? data.weight:"");
  const [disease,setDisease]=useState(data != null ? data.diseases_description:"");
  const [history,setHistory]=useState(data != null ? data.history:"");
  const [bloodgroup,setBloodgroup]=useState(data != null ? data.blood_group:"");
  const [doctor,setDoctor]=useState("");
  const [selectedRisk,setRisk]=useState("");
  const [riskCode,setRiskCode]=useState("");
  const [docid,setDocid]=useState(data != null ? data.doc_id : "");
  const [id, setId] = useState(data != null ? data.application_id: "");
  const [selectedOption, setSelectedOption] = useState(data != null ? data.gender : "");
  const [selectedDepartment, setSelectedDepartment] = useState(data != null ? data.department.toLowerCase(): '');
  const [doctorList,setDoctorList]=useState([""]);
  const [currentStep,setCurrentStep]=useState(1);

  const departments = ['cardiology','dermatology','pediatrics','gynecology','neurology','urology','orthopedics','radiology','oncology','general'];
  const bloodgroups=['A+','A-','O+','O-','AB+','AB-','B+','B-'];
  const risk=[{name:"Low",code:"0"},{name:"Moderate",code:"1"},{name:"High", code:"2"}];
  
  const handleDepartmentChange=(event)=>{
    const dep=event.target.value; 
    if(data != null) {
      data.department = dep; 
    }
    getdeptdoctors(dep).then((response)=>{
      if(response.length===0){} // console.log("No data found");
      else setDoctorList(response.data);
    }).catch(error => {
      console.error('Error fetching doctor data:', error);
    });
    setSelectedDepartment(dep);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleBloodgroup=(event)=>{
    setBloodgroup(event.target.value);
  };
  
  const handleRiskChange=(event)=>{
    setRisk(event.target.value);
    setRiskCode(event.target.value.code);
  };
  
  const handleDoctorChange=(event)=>{
    const doc=event.target.value;
    setDoctor(doc);
    
    const selectedDoctorObject = doctorList.find((doctor) => doctor.first_name === doc);
    
    if (selectedDoctorObject) {
      const selectedDoctorId = selectedDoctorObject.doc_id;
      setDocid(selectedDoctorId);
    }
  };
  

  const toastSuccess = () => {
    toast.success('Request Sent to Doctor');
  };

  const reapply = async (e) => {
    const updatePatient = async()=>{
      const response = await reapplyPatient({
        application_id: id,
        firstname:firstname, 
        lastname:lastname, 
        age:age, 
        dob:dob, 
        gender:selectedOption, 
        phone:contact, 
        email:email,
        address:address, 
        blood:bloodgroup,
        weight:weight,
        description:disease,
        history:history,
        dept:selectedDepartment,
        doctor_name:doctor.first_name,
        doctor_id:doctor.doc_id,
        risk:riskCode
      });
    };

    await updatePatient().then((response) => {  
      console.log(response)     
      if (response.msg === 'Success') {
        toastSuccess();
        navigate('/viewstatus');
      } 
    }).catch(() => {
      toast.error("Enter all required inputs");
    }); 
  };
  
  const submit= async (e)=>{
    if(validateForm2()){
      // console.log(firstname,lastname,dob,selectedDepartment,doctor.doc_id,bloodgroup,selectedOption,riskCode);
      const addPatient=async()=>{
        const response= await adminadd({
          firstname:firstname, 
          lastname:lastname, 
          age:age, 
          dob:dob, 
          gender:selectedOption, 
          phone:contact, 
          email:email,
          address:address, 
          blood:bloodgroup,
          weight:weight,
          description:disease,
          history:history,
          dept:selectedDepartment,
          doctor_name:doctor.first_name,
          doctor_id:doctor.doc_id,
          risk:riskCode
        });
      };
      await addPatient().then((response) => {
        if (response.msg === 'success') {
          toastSuccess();
          navigate('/viewstatus', {state : "pending"});
        }
      }).catch(() => {
        toast.error("Enter required inputs");
      });
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

  const validateForm1 = () => {
    let returnval = true;
    clearErrors();
    
    if(firstname === ""){
      seterror("fname", "Enter First Name!");
      returnval = false;
    }
    if(age === ""){
      seterror("fage", "Enter Age!");
      returnval = false;
    }
    if(dob === ""){
      seterror("fdob", "Enter DOB!");
      returnval = false;
    }
    if(selectedOption === ""){
      seterror("fgender", "Select Gender!");
      returnval = false;
    }
    if(contact === ""){
      seterror("fph", "Enter Contact Details!");
      returnval = false;
    }
    if(email === ""){
      seterror("femail", "Enter Email!");
      returnval = false;
    }
    if(!email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/
    )){
      seterror("femail", "Enter Valid Email!");
      setEmail("");
      returnval = false;
    }
    if(address === ""){
      seterror("fadd", "Enter Address!");
      returnval = false;
    }

    let x = firstname.trim();
    if (x.length === 0) {
      seterror("fname", "Provide a valid name!");
      setFirstname("");
      returnval = false;
    }

    if (age <0 || age>150){
      seterror("fage", "must be between 0 to 150!");
      returnval = false;
    }

    if (contact < 1000000000 || contact > 9999999999){
      seterror("fph", "Mobile number must be in 10 digits!");
      setContact("");
      returnval = false;
    }
    
    x = address.trim();
    if (x.length === 0) {
      seterror("fadd", "Provide valid Address!");
      setAddress("");
      returnval = false;
    }

    return returnval;
  };
  
  const validateForm2 = () => {
    let returnval = true;
    clearErrors();
    
    if(weight === ""){
      seterror("fweight", "Enter Weight!");
      returnval = false;
    }
    if(bloodgroup === ""){
      seterror("fbgrp", "Select Blood Group!");
      returnval = false;
    }
    if(disease === ""){
      seterror("fdisease", "Enter Disease Description!");
      returnval = false;
    }
    if(history === ""){
      seterror("fhistory", "Enter Medical History!");
      returnval = false;
    }
    if(selectedDepartment === ""){
      seterror("fdept", "Select Department!");
      returnval = false;
    }
    if(doctor === ""){
      seterror("fdoctor", "Select Doctor!");
      returnval = false;
    }
    if(selectedRisk === ""){
      seterror("frisk", "Select Risk!");
      returnval = false;
    }
    if (weight<0 || weight>600){
      seterror("fweight", "must be between 0 to 600!");
      setWeight("");
      returnval = false;
    }
    let x = disease.trim();
    if (x.length === 0) {
      seterror("fdisease", "Enter Disease Description!");
      setDisease("");
      returnval = false;
    }
    x = history.trim();
    if (x.length === 0) {
      seterror("fhistory", "Enter Valid data!");
      setHistory("");
      returnval = false;
    }

    return returnval;
  };
  
  const nextStep = () => {
    if(validateForm1()){
      if(data !== null) {
        getdeptdoctors(selectedDepartment).then((response)=>{
          if(response.length===0){} // console.log("No data found")
          else setDoctorList(response.data)
        }).catch(error => {
          console.error('Error fetching doctor data:', error);
        });
        const selectedRiskObject = risk.find(item => item.code === data.risk);
        if (selectedRiskObject) {
          setRisk(selectedRiskObject);
          setRiskCode(selectedRiskObject.code);
        }
      }  
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
      <Navbar>
        <div>
          { currentStep===1 && (
            <div className='addpatient'>
              <h1 className='heading'>Enter Personal Details</h1>
              <form className='addform'>
                <div className='form-left' style={{paddingLeft: '80px'}}>
                  <label style={{display: 'inline-block'}}><b>First Name:</b></label><b className="required">*<span id="fname" className="formerror"></span></b><br/>
                  <input type="text" value={firstname} className="addhotelinp" onChange={(e)=>setFirstname(e.target.value)} required />
                  
                  <label><b>Last Name:</b></label>
                  <input type="text" value={lastname} className="addhotelinp" onChange={(e)=>setLastname(e.target.value)}/><br/>
                  
                  <label style={{display: 'inline-block'}}><b>Age:</b></label><b className="required">*<span id="fage" className="formerror"></span></b><br/>
                  <input type="number" value={age} className="addhotelinp" min="0" max="150"  onChange={(e)=>setAge(e.target.value)} required/><br/>
                  
                  <label style={{display: 'inline-block'}}><b>Date of Birth:</b></label><b className="required">*<span id="fdob" className="formerror"></span></b><br/>
                  <Calendar className="addhotelinp" style={{width: '80%'}} value={dob} onChange={(e) => setDob(e.value)} required/>
                </div>

                <div className='form-right' style={{paddingLeft: '80px'}}>
                  <label style={{display: 'inline-block'}}><b>Gender:</b></label><b className="required">*<span id="fgender" className="formerror"></span></b><br/>  
                  <label style={{display: 'inline-block', paddingRight:"10px"}}><RadioButton  value="M" style={{marginBottom:"3px"}} checked={selectedOption === 'M'} onChange={handleOptionChange} required></RadioButton>  Male</label>
                  <label style={{display: 'inline-block',  paddingRight:"10px"}}><RadioButton value="F" style={{marginBottom:"3px"}}  checked={selectedOption === 'F'} onChange={handleOptionChange} required></RadioButton>  Female</label>
                  <label style={{display: 'inline-block', paddingBottom:"30px"}}><RadioButton value="N" style={{marginBottom:"3px"}}   checked={selectedOption === 'N'} onChange={handleOptionChange} required></RadioButton>  Prefer Not to Say</label><br/>  
                
                  <label style={{display: 'inline-block',}}><b>Contact:</b></label><b className="required">*<span id="fph" className="formerror"></span></b><br/>  
                  <input type="number" id="fphval" value={contact} className="addhotelinp" onChange={(e)=>setContact(e.target.value)} required/><br/>
                  
                  <label style={{display: 'inline-block'}}><b>Email:</b></label><b className="required">*<span id="femail" className="formerror"></span></b><br/>  
                  <input type="email" value={email} className="addhotelinp" onChange={(e)=>setEmail(e.target.value)} required /><br/>
                  
                  <label style={{display: 'inline-block'}}><b>Address:</b></label><b className="required">*<span id="fadd" className="formerror"></span></b><br/>  
                  <textarea className="addhotelinp" value={address} onChange={(e)=>setAddress(e.target.value)} required> </textarea><br/>
                  
                  <button className="button-1" id="nextButton" style={{fontSize: "20px"}} onClick={nextStep}><b>Next</b></button>
                </div>
              </form>
            </div>
          )}


          { currentStep===2 && (
            <div className='addpatient'>
              <h1 className='heading'>Enter Medical Details</h1>
              <form className='addform'>
                <div className='form-left' style={{paddingLeft: '80px'}}>
                  <label style={{display: 'inline-block'}}><b>Weight:</b></label><b className="required">*<span id="fweight" className="formerror"></span></b><br/>
                  <input type="number" className="addhotelinp" min="0" max="600" value={weight} onChange={(e)=>setWeight(e.target.value)} />
                  
                  <label style={{display: 'inline-block'}}><b>Blood Group:</b></label><b className="required">*<span id="fbgrp" className="formerror"></span></b><br/>  
                  <Dropdown value={bloodgroup} style={{width: '80%', marginBottom:"30px"}} onChange={handleBloodgroup} options={bloodgroups} optionLabel="" placeholder="Select the Blood Group" className="w-full md:w-14rem" required/> 
                  
                  <label style={{display: 'inline-block'}}><b>Diseases Description:</b></label><b className="required">*<span id="fdisease" className="formerror"></span></b><br/>  
                  <textarea className="addhotelinp" value={disease} onChange={(e)=>setDisease(e.target.value)} required> </textarea>
                  
                  <label style={{display: 'inline-block'}}><b>Medical History:</b></label><b className="required">*<span id="fhistory" className="formerror"></span></b><br/>  
                  <textarea className="addhotelinp" value={history} onChange={(e)=>setHistory(e.target.value)} required> </textarea>
                </div>

                <div className='form-right' style={{paddingLeft: '80px'}}>
                  <label style={{display: 'inline-block'}}><b>Department:</b></label><b className="required">*<span id="fdept" className="formerror"></span></b><br/>  
                  <Dropdown style={{width: '80%', marginBottom:"30px"}}  value={selectedDepartment} onChange={handleDepartmentChange} options={departments} optionLabel="" placeholder="Select the Department" className="w-full md:w-14rem" required/><br/>
                  
                  <label style={{display: 'inline-block'}}><b>Doctor:</b></label><b className="required">*<span id="fdoctor" className="formerror"></span></b><br/>  
                  <Dropdown style={{width: '80%', marginBottom:"30px"}} value={doctor}  onChange={handleDoctorChange} options={doctorList} optionLabel="first_name" placeholder="Select the Doctor" className="w-full md:w-14rem" requiredrequired/>    

                  <label style={{display: 'inline-block'}}><b>Patient Risk:</b></label><b className="required">*<span id="frisk" className="formerror"></span></b><br/>  
                  <Dropdown style={{width: '80%', marginBottom:"30px"}} value={selectedRisk} onChange={handleRiskChange} options={risk} optionLabel="name" placeholder="Patient Risk" className="w-full md:w-14rem" required/>    

                  <button style={{width: '39%', fontSize: "20px"}} className="button-1" onClick={prevStep}><b>Previous</b></button>
                  {data == null && <button style={{width: '39%', fontSize: "20px"}} className="button-1" onClick={submit}><b>Submit</b></button>}
                  {data != null && <button style={{width: '39%', fontSize: "20px"}} className="button-1" onClick={reapply}><b>Reapply</b></button>}
                </div>
              </form>
            </div>
          )}
        </div>
      </Navbar>
  );
};
