import React from 'react'
import { useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AuthContext=React.createContext()
export const Authentication = (props) => {
    const navigate=useNavigate();
    const[mail,setMail]=useState("");
    const login=(mail,pass)=>{
        setMail(mail)
    }
    const logout=()=>{
        setMail("")
        localStorage.removeItem("mail")
        localStorage.removeItem("password")
        localStorage.removeItem("activetab")

        navigate("/")
    }

  return (
    <AuthContext.Provider value={{mail,login,logout}}>
        {props.children}
    </AuthContext.Provider>
  )
}

export const useAuth=()=>{
    return useContext(AuthContext)
}
