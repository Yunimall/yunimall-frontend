import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid, hasRequiredRole } from "./auth";

const BuyerProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");

  if (!isTokenValid(token) || !hasRequiredRole(token, ["user"])) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default BuyerProtectedRoute;
