import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  const token = sessionStorage.getItem("token");

  // Allow access if user in context OR token exists in sessionStorage
  return user || token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
