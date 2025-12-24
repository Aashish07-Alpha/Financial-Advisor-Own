import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from '../Authorisation/AuthProvider';

const ProtectedRoute = ({children}) => {
    const { isAuthenticated, loading } = useContext(AuthContext);
    const { pathname } = useLocation();

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
}

export default ProtectedRoute;