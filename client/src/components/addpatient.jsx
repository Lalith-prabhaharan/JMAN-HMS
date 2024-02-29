import React, { useEffect } from 'react'
import { useState } from 'react';
import '../style/addpatient.css'
import { Navbar } from './navbar';
import { adminadd, getdeptdoctors } from '../services/services';
import { Dropdown } from 'primereact/dropdown';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Calendar } from 'primereact/calendar';
import { useLocation } from 'react-router-dom';

export const Addpatient = () => {

  const location = useLocation();
  const data = location.state ? location.state.data : null;

  const navigate=useNavigate()

  const [firstname,setFirstname]=useState(data!= null ? data.first_name : "")
  const [lastname,setLastname]=useState(data!= null ? data.last_name : "")
  const [age,setAge]=useState(data!= null ? data.age: "")
  const [dob,setDob]=useState(data!= null ? new Date(data.dob) : "")
  const [contact,setContact]=useState(data!= null ? data.phone : "")
  const [email,setEmail]=useState(data != null ? data.email: "")
  const [address,setAddress]=useState(data != null ? data.address: "")
  const [weight,setWeight]=useState(data != null ? data.weight:"")
  const [disease,setDisease]=useState(data != null ? data.diseases_description:"")
  const [history,setHistory]=useState(data != null ? data.history:"")
  const [bloodgroup,setBloodgroup]=useState(data != null ? data.blood_group:"")
  const [doctor,setDoctor]=useState("")
  const[selectedRisk,setRisk]=useState("")
  const[riskCode,setRiskCode]=useState("")
  const [docid,setDocid]=useState(data != null ? data.doc_id : "")

  const [selectedOption, setSelectedOption] = useState(data != null ? data.gender :'');
  const [selectedDepartment, setSelectedDepartment] = useState(data != null ? data.department.toLowerCase(): '');

  const departments = ['cardiology','dermatology','pediatrics','gynecology','neurology','urology','orthopedics','radiology'
  ,'oncology','general'];

  const bloodgroups=['A+','A-','O+','O-','AB+','AB-','B+','B-']

  const risk=[{name:"Low",code:"0"},{name:"Moderate",code:"1"},{name:"High", code:"2"}]
  
  const handleDepartmentChange=(event)=>{
    const dep=event.target.value; 
    if(data != null) {
      data.department = dep; 
    }
    getdeptdoctors(dep)
    .then((response)=>{
      if(response.length==0)console.log("No data found")
      else setDoctorList(response.data)
    })
    .catch(error => {
      console.error('Error fetching doctor data:', error);
    });
    setSelectedDepartment(dep)
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleBloodgroup=(event)=>{
    setBloodgroup(event.target.value)
  }
  
  const handleRiskChange=(event)=>{
    setRisk(event.target.value)
    setRiskCode(event.target.value.code)
  }
  
  const handleDoctorChange=(event)=>{
    // if(selectedDepartment===''){
    //   toast.warn("Select the Department");
    // }
    // else{
      const doc=event.target.value;
      setDoctor(doc)
      
      const selectedDoctorObject = doctorList.find((doctor) => doctor.first_name === doc);
      // console.log(selectedDoctorObject)
      
      if (selectedDoctorObject) {
        const selectedDoctorId = selectedDoctorObject.doc_id;
        setDocid(selectedDoctorId);
      // }
    } 
  }
  const [doctorList,setDoctorList]=useState([" "])
  const [flag,setFlag]=useState(true)

  useEffect(()=>{

  });

  const reapply = (e) => {
    e.preventDefault();
    console.log(firstname,lastname,dob,selectedDepartment,doctor.doc_id,bloodgroup,selectedOption,riskCode)
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
    navigate('/addpatient', {state : null})
    
  }

  const[currentStep,setCurrentStep]=useState(1)

  const nextStep = () => {
    if(data != null) {
      getdeptdoctors(data.department)
      .then((response)=>{
        if(response.length==0)console.log("No data found")
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
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <Navbar>
    <div>
      {currentStep===1 &&
        (
          <div className='addpatient'>
          <h1 className='heading'>Enter Personal Details</h1>
        <form className='addform'>
          <div className='form-left'>
            <label>First Name<span className="required">*</span>:</label>
            <input type="text" value={firstname} className="addhotelinp" onChange={(e)=>setFirstname(e.target.value)} required />
            
            <label>Last Name:</label>
            <input type="text" value={lastname} className="addhotelinp" onChange={(e)=>setLastname(e.target.value)} />
            
            <label>Age<span className="required">*</span>:</label>
            <input type="text" value={age} className="addhotelinp"  onChange={(e)=>setAge(e.target.value)} required/>
            
            <label>Date of Birth<span className="required">*</span>:</label>
            {/* <input type="date" value={dob} className="addhotelinp" onChange={(e)=>setDob(e.target.value)} required /> */}
            <div className="flex justify-content-center">
                <Calendar className="addhotelinp" value={dob} onChange={(e) => setDob(e.value)}/>
            </div>
          </div>
          <div className='form-right'>
            <label>Gender<span className="required">*</span>:</label>
            <span>
            <input type="radio"  value="M" checked={selectedOption === 'M'}
            onChange={handleOptionChange}  ></input>
            Male
            <input type="radio"  value="F" checked={selectedOption === 'F'}
            onChange={handleOptionChange}></input>
            Female
            <input type="radio"  value="N"  checked={selectedOption === 'N'}
            onChange={handleOptionChange}></input>
            Prefer Not to Say
            </span>       
            <label >Contact<span className="required">*</span>:</label>
            <input type="tel" value={contact} className="addhotelinp" onChange={(e)=>setContact(e.target.value)} required/>
            
            <label >Email<span className="required">*</span>:</label>
            <input type="email" value={email} className="addhotelinp" onChange={(e)=>setEmail(e.target.value)} required />
            
            <label >Address<span className="required">*</span>:</label>
            <textarea className="addhotelinp" value={address} onChange={(e)=>setAddress(e.target.value)} required> </textarea>
          <button className="button-1" onClick={nextStep}>Next</button>
          </div>
        </form>
      </div>
        )
      }
      {currentStep===2 && (
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
