import { Navigate } from 'react-router-dom';

export default function MemberRoute({ children }: { children: JSX.Element }) {
  //const isAuthenticated = localStorage.getItem('isAuthenticated'); // Check if user is authenticated
  const isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to="/login" />;
}
