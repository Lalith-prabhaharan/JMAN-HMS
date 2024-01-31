import React from 'react'
import { useState } from 'react'
import "../style/login.css"
import logindoc from "../images/login_doctor.jpg"
export const Login = () => {

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='login-bg'>
        <div className="leftPanel">
            <div className='login-inner'>
                <h1>HEALTH CARE</h1>
                <h2>LOGIN PAGE</h2>
                <p>Login to your account</p>
                <form className='login-form'>
                    <div className='login-input'>
                    <label> <span>Name:</span></label>
                    <input type='text'  placeholder='Enter your E-Mail Address'></input>
                    </div>
                    <div  className='login-input'>
                    <label><span>Password:</span></label>
                    <input type='password' placeholder='Enter your Password'></input>
                    </div>
                    <label className='radio'>
                        <input
                        type="radio"
                        value="option1"
                        checked={selectedOption === 'option1'}
                        onChange={handleOptionChange}
                        />
                        Admin
                        <input
                        type="radio"
                        value="option2"
                        checked={selectedOption === 'option2'}
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
