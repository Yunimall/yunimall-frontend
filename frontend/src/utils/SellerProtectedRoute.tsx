import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid, hasRequiredRole } from "./auth";

const SellerProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");

  if (!isTokenValid(token) || !hasRequiredRole(token, ["seller"])) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default SellerProtectedRoute;
