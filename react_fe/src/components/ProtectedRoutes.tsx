import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';

interface ProtectedRoutesProps {
  Component: React.ElementType;
  isProtected: boolean;
}

export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ Component, isProtected }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tokens = useAppSelector((state)=>state.token);
  let authenticated : boolean = false;

  if(tokens) {
    authenticated = true;
  }

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
