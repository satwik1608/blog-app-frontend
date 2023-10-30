import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./../userContext";

function RequireAuth({ children }) {
  const { id: user } = useUser();

  return user ? children : <Navigate to={`/login`} replace />;
}

export default RequireAuth;
