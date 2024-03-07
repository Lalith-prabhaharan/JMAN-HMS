import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import "../style/login.css";
import logindoc from "../images/login_doctor.jpg";
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { resetPassword, sendMail, sendOtp } from '../services/services';


export const Login = () => {

  const navigate=useNavigate()
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [confirPass, setConfirmPass] = useState("");
  const [otp,setOtp]=useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedLogin, setSelectedLogin] = useState(true);
  const [selectedForget, setSelectedForget] = useState(false);
  const [selectedOtp, setSelectedOtp] = useState(false);
  const [selectedReset, setSelectedReset] = useState(false);

  // const auth=useAuth();

  const [loading, setLoading] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption)
  };

  const handleForgetPassword = () => {
    setSelectedForget(true);
    setSelectedLogin(false);
  }

  const handleGetMail = (e) => {
    e.preventDefault();
    if(selectedOption === "") {
      toast.warn("Select Type of user");
    }
    else {
      setLoading(true);
      sendMail(email).then((response) => {
        setLoading(false);
        setSelectedOtp(true);
        setSelectedForget(false);
      }).catch((error) => {
        toast.error("Invalid Email");
        setLoading(false);     
      })
    }
  }

  const handleOtp = (e) => {
    e.preventDefault()
    sendOtp(email, otp).then(() => {
      setSelectedOtp(false);
      setSelectedReset(true);
    }).catch(() => {
      toast.error("Invalid or Expired Otp");
      setSelectedOtp(false);
      setSelectedReset(false);
      setSelectedForget(false);
      setSelectedLogin(true);
    })
  }

  const handleResetPass = (e) => {
    e.preventDefault();
    if(pass !== confirPass) {
      toast.warn("Mismatch");
    }
    else {
      resetPassword(email, pass).then(() => {
        toast.success("Password Changed successfully");
        setSelectedReset(false);
        setSelectedLogin(true);
        setOtp("");
        setEmail("");
        setPass("");  
      }).catch((error) => {
        console.log(error)  ;
      })
    }
  }

  const handleCancel = () => {
    setSelectedLogin(true);
    setSelectedForget(false);
    setSelectedOtp(false);
    setSelectedReset(false);
    setEmail("");
    setPass("");
    setSelectedOption("");
  }
  
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
          toastSuccess()
          if(selectedOption==="admin")
          {
            localStorage.setItem('activetab','addpatient')
            navigate("/addpatient")
          }
          else{
            localStorage.setItem('activetab','mypatients')
            navigate("/mypatients")
          }
        }
        else if(response.data.msg==="select"){
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
            {selectedLogin && (
              <div className='login-inner'>
                  <h1>HEALTH CARE</h1>
                  <p>Login to your account</p>
                  <form className='login-form' onSubmit={submit}>
                  <div className='login-input-row'> 
                    <label> <span>Email:</span></label>
                    <InputText type='text' onChange={(e) => setEmail(e.target.value)} placeholder='Enter your E-Mail Address' style={{marginLeft: "35px"}}/>
                  </div>
                  <div className='login-input-row'>
                    <label><span>Password:</span></label>
                    <InputText type='password' onChange={(e) => setPass(e.target.value)} placeholder='Enter your Password'/>
                  </div>
                    <span onClick={() => handleForgetPassword()} className='forget-pass'>Forget Password</span>
                      <label className='radio'>
                            <RadioButton
                              inputId="ingredient1" 
                              value="admin"
                              checked={selectedOption === 'admin'} 
                              onChange={handleOptionChange}
                            />
                            <label>Admin</label>  
                            <RadioButton
                              inputId="ingredient2" 
                              value="doctor"
                              checked={selectedOption === 'doctor'}
                              onChange={handleOptionChange}
                            />
                            <label>Doctor</label>
                      </label>
                      <Button className="login-button">Login</Button>
                  </form>
              </div>
            )}

            {selectedForget && (
              <div className='login-inner'>
                  <h1>HEALTH CARE</h1>
                  <p>Forget Password</p>
                  <form className='login-form' onSubmit={handleGetMail}>
                  <div className='login-input-row'> 
                    <label> <span>Email:</span></label>
                    <InputText type='text' onChange={(e) => setEmail(e.target.value)} placeholder='Enter your E-Mail Address' style={{marginLeft: "35px"}}/>
                  </div>
                  <label className='radio'>
                    <RadioButton
                      inputId="ingredient1" 
                      value="admin"
                      checked={selectedOption === 'admin'} 
                      onChange={handleOptionChange}
                    />
                    <label>Admin</label>  
                    <RadioButton
                      inputId="ingredient2" 
                      value="doctor"
                      checked={selectedOption === 'doctor'}
                      onChange={handleOptionChange}
                    />
                    <label>Doctor</label>
                  </label>
                  <Button className="login-button" loading={loading}>Next</Button><br></br>
                  <Button className="cancel-button" onClick={() => handleCancel()}>Cancel</Button>
                </form>
              </div>
            )}

            {selectedOtp && (
              <div className='login-inner'>
                  <h1>HEALTH CARE</h1>
                  <p>OTP Verification</p>
                  <form style={{marginTop: "50px"}} className='login-form' onSubmit={handleOtp}>
                  <div className='login-input-row' style={{marginBottom:"30px"}}> 
                    <label> <span>OTP:</span></label>
                    <InputText type='text' onChange={(e) => setOtp(e.target.value)} placeholder='Enter your OTP' style={{marginLeft: "35px"}}/>
                  </div>
                  <Button className="login-button">Verify</Button><br></br>
                  <Button className="cancel-button" onClick={() => handleCancel()}>Cancel</Button>

                </form>
              </div>
            )}

            {selectedReset && (
              <div className='login-inner'>
                  <h1>HEALTH CARE</h1>
                  <p>OTP Verification</p>
                  <form style={{marginTop: "50px"}} className='login-form' onSubmit={handleResetPass}>
                  <div className='login-input-row'>
                    <label><span>Password:</span></label>
                    <InputText type='password' onChange={(e) => setPass(e.target.value)} placeholder='Type your Password'/>
                  </div>
                  <div className='login-input-row'>
                    <label><span>Confirm:</span></label>
                    <InputText type='password' onChange={(e) => setConfirmPass(e.target.value)} placeholder='Retype your Password'/>
                  </div>
                  <Button className="login-button">Verify</Button><br></br>
                  <Button className="cancel-button" onClick={() => handleCancel()}>Cancel</Button>

                </form>
              </div>
            )}
      </div>
      <div className="rightPanel">
        <img src={logindoc} className='login-img' alt='login-img'></img>
      </div>
    </div>
    </div>
  )
}
