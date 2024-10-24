import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ProtectedRoutesProps {
  component: React.ElementType;
  isProtected: boolean;
}

export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ component: Component, isProtected }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const access_token = Cookies.get('access_token');
  const authenticated = Boolean(access_token);

  useEffect(() => {
    if (isProtected && !authenticated) {
      navigate('/login', { replace: true });
    }

    if (authenticated && location.pathname === '/login') {
      navigate('/', { replace: true });
    }
  }, [authenticated, isProtected, location.pathname, navigate]);

  return <Component />;
};
