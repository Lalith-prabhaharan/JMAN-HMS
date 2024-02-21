import React, { useEffect } from 'react'
import { useState } from 'react';
import '../style/addpatient.css'
import { Navbar } from './navbar';
import { adminadd, getdeptdoctors } from '../services/services';
<<<<<<< HEAD
=======
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Calendar } from 'primereact/calendar';
>>>>>>> d21fb4d164239096f9469c3859f5ae809b9ae0f3
export const Addpatient = () => {

  const navigate=useNavigate()
  const [selectedOption, setSelectedOption] = useState('Male');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleBloodgroup=(event)=>{
    setBloodgroup(event.target.value)
  }
  

  const [selectedDepartment, setSelectedDepartment] = useState('');

  const departments = ['cardiology','dermatology','pediatrics','gynecology','neurology','urology','orthopedics','radiology'
  ,'oncology','general'];

  const bloodgroups=['A+','A-','O+','O-','AB+','AB-','B+','B-']
  

  const handleDepartmentChange=(event)=>{
    const dep=event.target.value;
    setSelectedDepartment(dep)
  }
  
  const handleDoctorChange=(event)=>{
    if(selectedDepartment===''){
      toast.warn("Select the Department");
    }
    else{
      const doc=event.target.value;
      setDoctor(doc)
      
      const selectedDoctorObject = doctorList.find((doctor) => doctor.first_name === doc);
      console.log(selectedDoctorObject)
      
      if (selectedDoctorObject) {
        const selectedDoctorId = selectedDoctorObject.doc_id;
        setDocid(selectedDoctorId);
      }
    } 
  }
  const [doctorList,setDoctorList]=useState([" "])
  const [flag,setFlag]=useState(true)

  useEffect(()=>{
    if(selectedDepartment){
    getdeptdoctors(selectedDepartment)
    .then((response)=>{

      if(response.length==0)console.log("No data found")
      else{
        setDoctorList(response.data)
      }

    })
    .catch(error => {
      console.error('Error fetching doctor data:', error);
    });
  }

  });

  const [firstname,setFirstname]=useState("")
  const [lastname,setLastname]=useState("")
  const [age,setAge]=useState("")
  const [dob,setDob]=useState("")
  const [contact,setContact]=useState("")
  const [email,setEmail]=useState("")
  const [address,setAddress]=useState("")
  const [weight,setWeight]=useState("")
  const [disease,setDisease]=useState("")
  const [history,setHistory]=useState("")
  const [bloodgroup,setBloodgroup]=useState("")
  const [doctor,setDoctor]=useState("")
  const [docid,setDocid]=useState("")

  const submit=(e)=>{
    e.preventDefault();

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
        doctor_name:doctor,
        doctor_id:docid
      })

    }
    console.log(firstname,lastname,dob,doctor,docid,selectedDepartment,bloodgroup,selectedOption)
    addPatient();
    navigate('/addpatient')
    
  }

  
  const[currentStep,setCurrentStep]=useState(1)

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <Navbar>
    {/* <div className='addform'>
      <form onSubmit={submit}>
        <h1 className='addhead'>ADD PATIENT</h1>
        
        <fieldset>
          
          <legend><span class="number"></span> Enter the Patient Details</legend>
          
          <label>First Name:</label>
          <input type="text" className="addhotelinp" onChange={(e)=>setFirstname(e.target.value)} required />
          
          <label>Last Name:</label>
          <input type="text" className="addhotelinp" onChange={(e)=>setLastname(e.target.value)} />
          
          <label>Age:</label>
          <input type="text" className="addhotelinp"  onChange={(e)=>setAge(e.target.value)}/>
          
          <label>Date of Birth:</label>
          <input type="date" className="addhotelinp" onChange={(e)=>setDob(e.target.value)}  />
          
            <label>Gender:</label>
            <label>
            <input type="radio"  value="M" checked={selectedOption === 'M'}
            onChange={handleOptionChange}  ></input>
            Male
            <input type="radio"  value="F" checked={selectedOption === 'F'}
            onChange={handleOptionChange}></input>
            Female
            <input type="radio"  value="N"  checked={selectedOption === 'N'}
            onChange={handleOptionChange}></input>
            Prefer Not to Say
            </label>
            
            <label >Contact:</label>
            <input type="tel" className="addhotelinp" onChange={(e)=>setContact(e.target.value)} />
            
            <label >Email:</label>
            <input type="email" className="addhotelinp" onChange={(e)=>setEmail(e.target.value)}  />
            
            <label >Address:</label>
            <textarea className="addhotelinp" onChange={(e)=>setAddress(e.target.value)}> </textarea>
          
          <label >Weight:</label>
          <input type="text" className="addhotelinp" onChange={(e)=>setWeight(e.target.value)} />
          
          <label for="job">Blood Group:</label>
          <select value={bloodgroup} onChange={handleBloodgroup} >
              <option value=""></option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
          </select>
          
          <label >Diseases Description:</label>
          <textarea className="addhotelinp" onChange={(e)=>setDisease(e.target.value)}> </textarea>
          
          <label >Medical History:</label>
          <textarea className="addhotelinp" onChange={(e)=>setHistory(e.target.value)}> </textarea>
          
          <label>Department:</label>
          <select value={selectedDepartment} onChange={handleDepartmentChange}>
              
              <option value="">Select the Department</option>
              {
                departments.map((department)=>(
                  <option value={department}>{department}</option>
                ))
              }
          </select>          
          
          <label>Doctor:</label>
          <select value={doctor} onChange={handleDoctorChange}>
              <option value="">Select the Doctor</option>
              {doctorList.length!=0 && flag &&(
                doctorList.map((doctor)=>(
                  <option key={doctor.doc_id} value={doctor.first_name} >{doctor.first_name}</option>
                  
                ))
              )}
          </select>          
        </fieldset>
          
        <button class="button-1" role="button">Add Patient</button>
      </form>
    </div> */}
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
            <div className="card flex justify-content-center">
                <Calendar  className="addhotelinp" value={dob} onChange={(e) => setDob(e.value)} />
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
          {/* <select value={bloodgroup} onChange={handleBloodgroup} required >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
          </select> */}
          <Dropdown value={bloodgroup} onChange={handleBloodgroup} options={bloodgroups} optionLabel="" 
              placeholder="Select the Blood Group" className="w-full md:w-14rem" /> 
          
          <label >Diseases Description<span className="required">*</span>:</label>
          <textarea className="addhotelinp" value={disease} onChange={(e)=>setDisease(e.target.value)} required> </textarea>
          
          <label >Medical History<span className="required">*</span>:</label>
          <textarea className="addhotelinp" value={history} onChange={(e)=>setHistory(e.target.value)} required> </textarea>
        </div>
        <div className='form-right'>
        <label>Department<span className="required">*</span>:</label>
          {/* <select value={selectedDepartment}  onChange={handleDepartmentChange} required>
              
              <option value="">Select the Department</option>
              {
                departments.map((department)=>(
                  <option value={department}>{department}</option>
                ))
              }
          </select>              */}

          <div className="card flex justify-content-center">
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
          <div className="card flex justify-content-center">
          <Dropdown value={doctor} onChange={handleDoctorChange} options={doctorList} optionLabel="first_name" 
              placeholder="Select the Doctor" className="w-full md:w-14rem" />    
          </div> 

        <button className="button-1" onClick={prevStep}>Previous</button>
        <button className="button-1" onClick={submit}>Submit</button>
        </div>
      </form>
    </div>
      )
      }
    </div>
    </Navbar>
  )
};
