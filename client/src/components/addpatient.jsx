import React from 'react'
import { useState } from 'react';
import '../style/addpatient.css'
import { Navbar } from './navbar';
export const Addpatient = () => {

  const [selectedOption, setSelectedOption] = useState('Male');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
          <input type="radio"  value="Male" checked={selectedOption === 'Male'}
          onChange={handleOptionChange}  ></input>
          Male
          <input type="radio"  value="Female" checked={selectedOption === 'Female'}
          onChange={handleOptionChange}></input>
          Female
          <input type="radio"  value="None"  checked={selectedOption === 'None'}
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
          <select>
              <option value="cardiologist">Cardiologist</option>
              <option value="dermatology">Dermatology</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="gynecologist">Gynecologist</option>
              <option value="neurologist">Neurologist</option>
              <option value="psychiatrist">Psychiatrist</option>
              <option value="anesthesiology">Anesthesiology</option>
              <option value="radiologists">Radiologists</option>
              <option value="oncologist">Oncologist</option>
          </select>          
          
          <label>Doctor:</label>
          <select>
              
          </select>          
        </fieldset>
          
        {/* <button type="submit">Sign Up</button> */}
        <button class="button-1" role="button">Add Patient</button>
      </form>
    </div>
    </div>

  )
}
