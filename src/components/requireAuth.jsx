import React from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../userContext";

function RequireAuth({ children }) {
  const { id: user } = React.useContext(UserContext);

  return user ? children : <Navigate to={`/login`} replace />;
}

export default RequireAuth;
