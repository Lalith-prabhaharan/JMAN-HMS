import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import "../style/login.css"
import logindoc from "../images/login_doctor.jpg"
import { useAuth } from '../utils/authentication'
import { useNavigate } from 'react-router-dom'
export const Login = () => {

  const navigate=useNavigate()
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const auth=useAuth();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption)
  };
  
  const submit=(e)=>{
      e.preventDefault();
      const login=async()=>{
        console.log(email,pass,selectedOption)
        const response=await axios.post("http://localhost:5000/api/v1/auth/login",{
          username:email,
          password:pass,
          type:selectedOption
        })
        if(response.data.msg==="success"){
          alert("Success")
          localStorage.setItem("mail",email)
          localStorage.setItem("password",pass)
          if(selectedOption=="admin")
          navigate("/addpatient")
          else
          navigate("/viewpatient")
        }
        else if(response.data.msg=="select"){
          alert("Enter type of user")
        }
        else {
          alert("Enter the valid credentials")
        }
      }
      login();

  }

  return (
    <div className='login-bg'>
        <div className="leftPanel">
            <div className='login-inner'>
                <h1>HEALTH CARE</h1>
                <h2>LOGIN PAGE</h2>
                <p>Login to your account</p>
                <form className='login-form' onSubmit={submit}>
                    <div className='login-input'>
                    <label> <span>Name:</span></label>
                    <input type='text'onChange={(e)=>{setEmail(e.target.value)}}  placeholder='Enter your E-Mail Address'></input>
                    </div>
                    <div  className='login-input'>
                    <label><span>Password:</span></label>
                    <input type='password' onChange={(e)=>{setPass(e.target.value)}} placeholder='Enter your Password'></input>
                    </div>
                    <label className='radio'>
                        <input
                        type="radio"
                        value="admin"
                        checked={selectedOption === 'admin'}
                        onChange={handleOptionChange}
                        />
                        Admin
                        <input
                        type="radio"
                        value="doctor"
                        checked={selectedOption === 'doctor'}
                        onChange={handleOptionChange}
                        />
                        Doctor
                    </label>
                    <button className="login-button">Login</button>
                </form>
            </div>
      </div>
      <div className="rightPanel">
        <img src={logindoc} className='login-img'></img>
      </div>
    </div>
  )
}
