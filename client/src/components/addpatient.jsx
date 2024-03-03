import React, { useEffect } from 'react'
import { useState } from 'react';
import '../style/addpatient.css'
import { Navbar } from './navbar';
import { adminadd, getdeptdoctors, reapplyPatient } from '../services/services';
import { Dropdown } from 'primereact/dropdown';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Calendar } from 'primereact/calendar';
import { useLocation } from 'react-router-dom';

export const Addpatient = () => {

  const location = useLocation();
  const data = location.state ? location.state.data : null;

  const navigate=useNavigate()

  let [firstname,setFirstname]=useState(data!= null ? data.first_name : "");
  let [lastname,setLastname]=useState(data!= null ? data.last_name : "");
  let [age,setAge]=useState(data!= null ? data.age: "");
  let [dob,setDob]=useState(data!= null ? new Date(data.dob) : "");
  let [contact,setContact]=useState(data!= null ? data.phone : "");
  let [email,setEmail]=useState(data != null ? data.email: "");
  let [address,setAddress]=useState(data != null ? data.address: "");
  const [weight,setWeight]=useState(data != null ? data.weight:"");
  const [disease,setDisease]=useState(data != null ? data.diseases_description:"");
  const [history,setHistory]=useState(data != null ? data.history:"");
  const [bloodgroup,setBloodgroup]=useState(data != null ? data.blood_group:"");
  const [doctor,setDoctor]=useState("");
  const [selectedRisk,setRisk]=useState("");
  const [riskCode,setRiskCode]=useState("");
  const [docid,setDocid]=useState(data != null ? data.doc_id : "");
  const [id, setId] = useState(data != null ? data.application_id: "");
  let [selectedOption, setSelectedOption] = useState(data != null ? data.gender :'');
  const [selectedDepartment, setSelectedDepartment] = useState(data != null ? data.department.toLowerCase(): '');

  const departments = ['cardiology','dermatology','pediatrics','gynecology','neurology','urology','orthopedics','radiology','oncology','general'];
  const bloodgroups=['A+','A-','O+','O-','AB+','AB-','B+','B-']
  const risk=[{name:"Low",code:"0"},{name:"Moderate",code:"1"},{name:"High", code:"2"}]
  
  const handleDepartmentChange=(event)=>{
      const dep=event.target.value; 
      if(data != null) {
        data.department = dep; 
      }
      getdeptdoctors(dep)
      .then((response)=>{
        if(response.length===0)console.log("No data found")
        else setDoctorList(response.data)
      })
      .catch(error => {
        console.error('Error fetching doctor data:', error);
      });
      setSelectedDepartment(dep);
  };

  const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
  };

  const handleBloodgroup=(event)=>{
      setBloodgroup(event.target.value);
  }
  
  const handleRiskChange=(event)=>{
      setRisk(event.target.value);
      setRiskCode(event.target.value.code);
  }
  
  const handleDoctorChange=(event)=>{
      // if(selectedDepartment===''){
      //   toast.warn("Select the Department");
      // }
      // else{
        const doc=event.target.value;
        setDoctor(doc);
        
        const selectedDoctorObject = doctorList.find((doctor) => doctor.first_name === doc);
        // console.log(selectedDoctorObject)
        
        if (selectedDoctorObject) {
          const selectedDoctorId = selectedDoctorObject.doc_id;
          setDocid(selectedDoctorId);
        }
      // } 
  }
  const [doctorList,setDoctorList]=useState([" "]);

  useEffect(()=>{
    
  })

  const toastSuccess = () => 
  {
    toast.success('Request Sent to Doctor');
  }

  const reapply = async (e) => {
    const updatePatient=async()=>{
      const response=reapplyPatient({
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
      })
    }
    updatePatient(); 
    toastSuccess();
    navigate('/viewstatus', {state: null});
    localStorage.setItem('activetab','viewstatus')
    
  }
  
  const submit=(e)=>{
    // e.preventDefault();
    console.log(firstname,lastname,dob,selectedDepartment,doctor.doc_id,bloodgroup,selectedOption,riskCode)
    const addPatient=async()=>{
      const response=adminadd({
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
      })

    }

    addPatient();
    toastSuccess();
    navigate('/addpatient', {state : null})
    
  }

  const[currentStep,setCurrentStep]=useState(1)

  function clearErrors() {
    let errors = document.getElementsByClassName('formerror');
    for (let item of errors) {
      item.innerHTML = "";
    }
  }

  function seterror(id, errormsg) {
      let element = document.getElementById(id);
      element.innerHTML = errormsg;
  }

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
      seterror("fgender", "Enter Gender!");
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
    if(email === ""){
      seterror("fadd", "Enter Address!");
      returnval = false;
    }

    firstname = firstname.trim();
    if (firstname.length === 0) {
      seterror("fname", "Provide a valid name!");
      returnval = false;
    }

    if (age <0 || age>150){
      seterror("fage", "must be between 0 to 150!");
      returnval = false;
    }

    contact = contact.trim();
    if (contact.length !== 10) {
      seterror("fph", "Mobile number must be in 10 digits!");
      returnval = false;
    }
    
    address = address.trim();
    if (address.length === 0) {
      seterror("fadd", "Provide valid Address!");
      returnval = false;
    }

    return returnval;
  }
  
  const nextStep = () => {
    if(validateForm1()){
      if(data !== null) {
        getdeptdoctors(selectedDepartment)
        .then((response)=>{
          if(response.length===0)console.log("No data found")
          else setDoctorList(response.data)
        })
        .catch(error => {
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
      { currentStep===1 && 
        (
          <div className='addpatient'>
          <h1 className='heading'>Enter Personal Details</h1>
          <form className='addform'>
            <div className='form-left' style={{paddingLeft: '100px'}}>
              <label style={{display: 'inline-block'}}><b>First Name:</b></label><b className="required">*<span id="fname" className="formerror"></span></b><br/>
              <input type="text" value={firstname} className="addhotelinp" onChange={(e)=>setFirstname(e.target.value)} required />
              
              <label><b>Last Name:</b></label>
              <input type="text" value={lastname} className="addhotelinp" onChange={(e)=>setLastname(e.target.value)}/><br/>
              
              <label style={{display: 'inline-block'}}><b>Age:</b></label><b className="required">*<span id="fage" className="formerror"></span></b><br/>
              <input type="number" value={age} className="addhotelinp" min="0" max="150"  onChange={(e)=>setAge(e.target.value)} required/><br/>
              
              <label style={{display: 'inline-block'}}><b>Date of Birth:</b></label><b className="required">*<span id="fdob" className="formerror"></span></b><br/>
              <Calendar className="addhotelinp" style={{width: '80%'}} value={dob} onChange={(e) => setDob(e.value)}/>
            </div>

            <div className='form-right'>
              <label style={{display: 'inline-block'}}><b>Gender:</b></label><b className="required">*<span id="fgender" className="formerror"></span></b><br/>  
              <label style={{display: 'inline-block'}}><input type="radio"  value="M" checked={selectedOption === 'M'} onChange={handleOptionChange} required></input>Male</label>
              <label style={{display: 'inline-block'}}><input type="radio"  value="F" checked={selectedOption === 'F'} onChange={handleOptionChange}></input>Female</label>
              <label style={{display: 'inline-block'}}><input type="radio"  value="N"  checked={selectedOption === 'N'} onChange={handleOptionChange}></input>Prefer Not to Say</label><br/>  
            
              <label style={{display: 'inline-block'}}><b>Contact:</b></label><b className="required">*<span id="fph" className="formerror"></span></b><br/>  
              <input type="tel" value={contact} className="addhotelinp" onChange={(e)=>setContact(e.target.value)} required/><br/>
              
              <label style={{display: 'inline-block'}}><b>Email:</b></label><b className="required">*<span id="femail" className="formerror"></span></b><br/>  
              <input type="email" value={email} className="addhotelinp" onChange={(e)=>setEmail(e.target.value)} required /><br/>
              
              <label style={{display: 'inline-block'}}><b>Address:</b></label><b className="required">*<span id="fadd" className="formerror"></span></b><br/>  
              <textarea className="addhotelinp" value={address} onChange={(e)=>setAddress(e.target.value)} required> </textarea><br/>
              
              <button className="button-1" id="nextButton" style={{fontSize: "20px"}} onClick={nextStep}><b>Next</b></button>
            </div>
          </form>
          </div>
        )
      }


      { currentStep===2 && 
        (
          <div className='addpatient'>
            <h1 className='heading'>Enter Medical Details</h1>
            <form className='addform'>
              <div className='form-left'>
                <label >Weight<span className="required">*</span>:</label>
                <input type="text" className="addhotelinp" value={weight} onChange={(e)=>setWeight(e.target.value)} />
                
                <label for="job">Blood Group<span className="required">*</span>:</label>
                <Dropdown value={bloodgroup} onChange={handleBloodgroup} options={bloodgroups} optionLabel="" 
                    placeholder="Select the Blood Group" className="w-full md:w-14rem" /> 
                
                <label >Diseases Description<span className="required">*</span>:</label>
                <textarea className="addhotelinp" value={disease} onChange={(e)=>setDisease(e.target.value)} required> </textarea>
                
                <label >Medical History<span className="required">*</span>:</label>
                <textarea className="addhotelinp" value={history} onChange={(e)=>setHistory(e.target.value)} required> </textarea>
              </div>
              <div className='form-right'>
              <label>Department<span className="required">*</span>:</label>
                <div className="flex justify-content-center">
                <Dropdown value={selectedDepartment} onChange={handleDepartmentChange} options={departments} optionLabel="" 
                    placeholder="Select the Department" className="w-full md:w-14rem" />    
                </div>  
                <label>Doctor<span className="required">*</span>:</label>
                {/* <select value={doctor} onChange={handleDoctorChange} required>
                    <option value="">Select the Doctor</option>
                    {doctorList.length!=0 && flag &&(
                      doctorList.map((doctor)=>(
                        <option key={doctor.doc_id} value={doctor.first_name} >{doctor.first_name}</option>
                        
                      ))
                    )}
                </select>   */}
                <div className="flex justify-content-center">
                <Dropdown value={doctor} onChange={handleDoctorChange} options={doctorList} optionLabel="first_name" 
                    placeholder="Select the Doctor" className="w-full md:w-14rem" />    
                </div> 

                <label>Patient Risk<span className="required">*</span>:</label>
                <div className="flex justify-content-center">
                <Dropdown value={selectedRisk} onChange={handleRiskChange} options={risk} optionLabel="name" 
                    placeholder="Patient Risk" className="w-full md:w-14rem" />    
                </div>

              <button className="button-1" onClick={prevStep}>Previous</button>
              {data == null && <button className="button-1" onClick={submit}>Submit</button>}
              {data != null && <button className="button-1" onClick={reapply}>Reapply</button>}
              </div>
            </form>
          </div>
        )
      }
    </div>
    </Navbar>
  )
};
