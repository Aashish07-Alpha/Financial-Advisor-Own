/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthProvider";
import { useAuthState } from "../hooks/useAuthState";

const ProtectedRoute = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const { isAuthenticated } = useAuthState();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
