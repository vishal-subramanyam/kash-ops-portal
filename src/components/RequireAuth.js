import React from "react";
import { useAuth } from "../hooks/Authentication";
import { useLocation, Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const { authed, user } = useAuth();
  const location = useLocation();
  console.log(user);
  return user !== null ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default RequireAuth;
