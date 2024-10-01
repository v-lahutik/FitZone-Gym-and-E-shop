import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }: { children: JSX.Element }) {
  // const isAuthenticated = localStorage.getItem('isAuthenticated');
  // const isAdmin = localStorage.getItem('role') === 'admin'; // Check if user is admin
  const isAuthenticated = true;
  const isAdmin = true;
  return isAuthenticated && isAdmin ? children : <Navigate to="/login" />;
}
