import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import "../style/login.css"
import logindoc from "../images/login_doctor.jpg"
import { useAuth } from '../utils/authentication'
import { useNavigate } from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import { RadioButton } from 'primereact/radiobutton';
        

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
          console.log(response.data.token)
          const toastSuccess = () => 
          {
            toast.success('Logged in Successfully');
            console.log("Toast performed")
          }
          localStorage.setItem("mail",email)
          localStorage.setItem("password",pass)
          localStorage.setItem("token",response.data.token)
          localStorage.setItem('activetab','addpatient')
          toastSuccess()
          if(selectedOption=="admin")
          navigate("/addpatient")
          else
          navigate("/mypatients")
        }
        else if(response.data.msg=="select"){
          const toastWarning=()=>{
            toast.warn('Enter the type of user');
          }
          toastWarning()
        }
        else {
          toast.error("Enter the valid credentials")
        }
      }
      login();

  }

  return (
    <div>
    <div className='login-bg'>
        <div className="leftPanel">
            <div className='login-inner'>
                <h1>HEALTH CARE</h1>
                <p>Login to your account</p>
                <form className='login-form' onSubmit={submit}>
                <div className='login-input-row'>
                  <label> <span>EMail:</span></label>
                  <input type='text' onChange={(e) => setEmail(e.target.value)} placeholder='Enter your E-Mail Address'></input>
                </div>
                <div className='login-input-row'>
                  <label><span>Password:</span></label>
                  <input type='password' onChange={(e) => setPass(e.target.value)} placeholder='Enter your Password'></input>
                </div>
                    <label className='radio'>
                        <input
                        type="radio"
                        value="admin"
                        checked={selectedOption === 'admin'}
                        onChange={handleOptionChange}
                        />
                        <label>Admin</label>  
                        <input
                        type="radio"
                        value="doctor"
                        checked={selectedOption === 'doctor'}
                        onChange={handleOptionChange}
                        />
                        <label>Doctor</label>
                    </label>
                    <button className="login-button">Login</button>
                </form>
            </div>
      </div>
      <div className="rightPanel">
        <img src={logindoc} className='login-img'></img>
      </div>
    </div>
    </div>
  )
}
