import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthContext from '../Authorisation/AuthProvider';

const SuccessLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('access_token');

      if (!token) {
        return navigate('/login');
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/user`,
          { withCredentials: true }
        );
        
        if (response.data.success) {
          login(response.data.user, token);
          navigate('/financialAdvisior');
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg font-semibold text-gray-700">Logging you in...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait while we set up your account</p>
      </div>
    </div>
  );
};

export default SuccessLogin;
