import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../context/UserContext";

export default function ProtectedRoute({ children }) {
  let { userTokenAccess } = useContext(userContext);

  if (!localStorage.getItem('accessToken')) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
