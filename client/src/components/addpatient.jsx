import React, { useEffect } from 'react'
import { useState } from 'react';
import '../style/addpatient.css'
import { Navbar } from './navbar';
import { adminadd, getdeptdoctors } from '../services/services';
import { RadioButton } from 'primereact/radiobutton';
export const Addpatient = () => {
  const [ingredient, setIngredient] = useState('');

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
  

  const handleDepartmentChange=(event)=>{
    const dep=event.target.value;
    setSelectedDepartment(dep)
  }
  
  const handleDoctorChange=(event)=>{
    const doc=event.target.value;
    setDoctor(doc)

    const selectedDoctorObject = doctorList.find((doctor) => doctor.first_name === doc);
    console.log(selectedDoctorObject)

  if (selectedDoctorObject) {
    const selectedDoctorId = selectedDoctorObject.doc_id;
    setDocid(selectedDoctorId);
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
        console.log(doctorList)
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
            <input type="text" value={age} className="addhotelinp"  onChange={(e)=>setAge(e.target.value)}/>
            
            <label>Date of Birth<span className="required">*</span>:</label>
            <input type="date" value={dob} className="addhotelinp" onChange={(e)=>setDob(e.target.value)}  />
            
          </div>
          <div className='form-right'>
            <label>Gender<span className="required">*</span>:</label>
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
            <label >Contact<span className="required">*</span>:</label>
            <input type="tel" className="addhotelinp" onChange={(e)=>setContact(e.target.value)} />
            
            <label >Email<span className="required">*</span>:</label>
            <input type="email" className="addhotelinp" onChange={(e)=>setEmail(e.target.value)}  />
            
            <label >Address<span className="required">*</span>:</label>
            <textarea className="addhotelinp" onChange={(e)=>setAddress(e.target.value)}> </textarea>
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
        </div>
        <div className='form-right'>
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
