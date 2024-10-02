import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext.tsx';

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const userContext = useContext(UserContext);
  if (!userContext) {
    // If the context is null, handle it (e.g., redirect to login)
    return <Navigate to="/login" />;
  }

  const { user, isLoggedIn } = userContext;
  const isAdmin = user.role === 'Admin';

  return isLoggedIn && isAdmin ? children : <Navigate to="/login" />;
}
