import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext.tsx';

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const userContext = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    console.log('useEffect for MemberRoute');
    // wait for user to load in userContext
    if (!userContext?.userLoading) {
      if (userContext?.user.role === 'Member') {
        setIsMember(true);
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
  console.log('userContext.user.role:', userContext?.user.role);
  console.log('isMember:', isMember);
  console.log('userContext logged in:', userContext?.isLoggedIn);
  return userContext?.isLoggedIn && isMember ? children : <Navigate to="/" />;
}
