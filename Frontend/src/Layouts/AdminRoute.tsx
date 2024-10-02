import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext.tsx';

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const userContext = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log('useEffect for AdminRoute');

    console.log('user:', user);
    console.log('userContext:', userContext);
    if (userContext?.user.role === 'Admin') {
      setIsAdmin(true);
      setIsLoading(false);
    }
  }, [userContext]);

  if (!userContext) {
    // If the context is null, handle it (e.g., redirect to login)
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log('isAdmin:', isAdmin);
  console.log('userContext logged in:', userContext?.isLoggedIn);
  return userContext?.isLoggedIn && isAdmin ? children : <Navigate to="/" />;
}
