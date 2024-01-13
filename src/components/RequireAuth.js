import React from "react";
import useAuth from "../components/Authentication";
import { useLocation, Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const authed = useAuth();
  const location = useLocation();
  console.log(authed);
  return authed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default RequireAuth;
