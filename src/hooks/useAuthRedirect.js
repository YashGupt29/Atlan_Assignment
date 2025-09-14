import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';

const RedirectWrapper = ({ children }) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (isSignedIn && location.pathname !== '/organization') {
      navigate('/organization', { replace: true });
    }
  }, [isSignedIn, navigate, location.pathname]);

  return children;
};

export default RedirectWrapper;
