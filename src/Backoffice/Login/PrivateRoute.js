import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

const PrivateRoute = ({userToken, setUserToken, allowedRoles }) => {
 const tokenTest = localStorage.getItem("token");
 let userTokenPrivate;
 
 if (tokenTest) {
   // setToken(tokenTest);

    const DecodeToken = jwtDecode(tokenTest);

    userTokenPrivate = {
        name: DecodeToken.user_name,
        role: DecodeToken.user_role,
        email: DecodeToken.user_email,
        phone: DecodeToken.user_phone,
      };

    console.log("userTokenPrivate : ", {
      name: DecodeToken.user_name,
      role: DecodeToken.user_role,
      email: DecodeToken.user_email,
      phone: DecodeToken.user_phone,
    });
  }

  const isAuthenticated = tokenTest != null;
  // Check if the user has one of the allowed roles
  console.log("userTokenPrivate :", userTokenPrivate);
 

  const hasRequiredRole = userTokenPrivate ? allowedRoles.includes(userTokenPrivate.role) : false;


  console.log("userToken Private Route: ", userToken.role);
  console.log("isAuthenticated: ", isAuthenticated);
  console.log("hasRequiredRole: ", hasRequiredRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else if (isAuthenticated && hasRequiredRole) {
    return <Outlet />;
  } else {
    return <Navigate to="/unauthorized" />; // You can create an unauthorized page if needed
  }




};

export default PrivateRoute;
