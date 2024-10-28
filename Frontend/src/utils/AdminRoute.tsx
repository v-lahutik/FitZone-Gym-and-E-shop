import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext.tsx';

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const userContext = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {

    // wait for user to load in userContext
    if (!userContext?.userLoading) {
      if (userContext?.user.role === 'Admin') {
        setIsAdmin(true);
        setIsLoading(false);
      }
    }
  }, [userContext]);

  if (!userContext) {
    // If the context is null, redirect to landing page
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return userContext?.isLoggedIn && isAdmin ? children : <Navigate to="/" />;
}
