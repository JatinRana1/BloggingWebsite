import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRoutesProps {
  component: React.ElementType;
  isProtected: boolean;
}

export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ component: Component, isProtected }) => {
  const isAuthenticated = false; 

  if (isProtected && !isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return <Component />;
};
