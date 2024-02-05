import React from 'react'
import { Navigate } from 'react-router-dom'
export const Requiredauth = () => {
  if(!localStorage.getItem("mail")){
    return <Navigate to="/login"></Navigate>
  }
  else{
    return props.children;
  }
}
