import { Navigate } from "react-router-dom";

import React from 'react'

const ProtectedRoute = ({children, allowedRole}) => {
  const role = localStorage.getItem("role");

  if(allowedRole !== role){
    return <Navigate to={'/loginPage'}/>
  }

  return children;
}

export default ProtectedRoute
