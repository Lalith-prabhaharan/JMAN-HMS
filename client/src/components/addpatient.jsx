import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import '../style/addpatient.css'
import { Navbar } from './navbar';
export const Addpatient = () => {

  const [selectedOption, setSelectedOption] = useState('Male');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [selectedDepartment, setSelectedDepartment] = useState('');

  const departments = ['Cardiologist','Dermatology','Pediatrics','Gynecologist','Neurologist','Psychiatrist','Anesthesiology','Radiologists'
  ,'Oncologist','general',"dd"];

  const handleDepartmentChange=(event)=>{
    const dep=event.target.value;
    setSelectedDepartment(dep)
    console.log(selectedDepartment)
  }
  
  const [doctorList,setDoctorList]=useState([])
  const [flag,setFlag]=useState(false)

  useEffect(()=>{
    axios.get(`http://localhost:5000/api/v1/admin/doctor/${selectedDepartment}`)
    .then((response)=>{
      console.log(response)
      if(response.length==0)console.log("No data found")
      else{
        setDoctorList(response.data)
      }
      console.log(doctorList)
    })
    setFlag(true)
  });
  

  return (
    <div>
    <Navbar/>
    <div className='addform'>
      <form >
        
        <h1 className='addhead'>ADD PATIENT</h1>
        
        <fieldset>
          
          <legend><span class="number"></span> Enter the Patient Details</legend>
          
          <label>First Name:</label>
          <input type="text" className="addhotelinp" />
          
          <label>Last Name:</label>
          <input type="text" className="addhotelinp"  />
          
          <label>Age:</label>
          <input type="text" className="addhotelinp"  />
          
          <label>Date of Birth:</label>
          <input type="date" className="addhotelinp"  />
          
          <label>Gender:</label>
          <label>
          <input type="radio"  value="M" checked={selectedOption === 'Male'}
          onChange={handleOptionChange}  ></input>
          Male
          <input type="radio"  value="F" checked={selectedOption === 'Female'}
          onChange={handleOptionChange}></input>
          Female
          <input type="radio"  value="N"  checked={selectedOption === 'None'}
          onChange={handleOptionChange}></input>
          Prefer Not to Say
          </label>
          
          <label >Contact:</label>
          <input type="text" className="addhotelinp"  />
          
          <label >Email:</label>
          <input type="email" className="addhotelinp"  />
          
          <label >Address:</label>
          <textarea className="addhotelinp"> </textarea>
          
          <label >Weight:</label>
          <input type="text" className="addhotelinp" />
          
          <label for="job">Blood Group:</label>
          <select id="job" >
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
          <textarea className="addhotelinp"> </textarea>
          
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
          <select>
              <option value="">Select the Doctor</option>
              if (doctorList.length!=0){
                doctorList.map((doctor)=>(
                  <option value={doctor.first_name}>{doctor.first_name}</option>
                ))
              }
          </select>          
        </fieldset>
          
        {/* <button type="submit">Sign Up</button> */}
        <button class="button-1" role="button">Add Patient</button>
      </form>
    </div>
    </div>

  )
}
