import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  if (localStorage.getItem('accessToken')) {
    return children ;
  }else {
    return <Navigate to={'/login'}/>
  }

}
