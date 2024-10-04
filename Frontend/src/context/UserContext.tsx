import { useState, createContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { URL } from '../utils/URL';
import axios from 'axios';

interface UserContextType {
  user: {
    _id: string | null;
    userName: string | null;
    role: string | null;
  };
  isLoggedIn: boolean;
  userLoading: boolean;
  login: (userData: { _id: string; firstName: string; role: string }) => void;
  logout: () => void;
  authenticate: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{
    _id: string | null;
    userName: string | null;
    role: string | null;
  }>({ _id: null, userName: null, role: null });
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLoading, setUserLoading] = useState(true);

  //check for cookies to authenticate user

  const authenticate = async () => {
    console.log('authenticating user');
    try {
      const response = await axios.get(`${URL}/users/authenticate`, {
        withCredentials: true
      });
      if (response.status === 200) {
        const userData = response.data;
        setUser({
          userName: userData.firstName,
          _id: userData._id,
          role: userData.role
        });
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('error during authentication:', error);

      // if the user is not authenticated, reset the user state
      setUser({ _id: null, userName: null, role: null });
      navigate('/');
      setIsLoggedIn(false);
    } finally {
      //add a loading state to prevent the page from rendering before the user is authenticated
      setUserLoading(false);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    if (!userLoading) {
      if (
        (location.pathname.startsWith('/admin') && user.role !== 'Admin') ||
        (location.pathname.startsWith('/member') && user.role !== 'Member')
      ) {
        setIsLoggedIn(false);
        setUser({ _id: null, userName: null, role: null });
        navigate('/'); //redirect to home page if user is not an admin
        alert('Unauthorized access. You were logged out. Please log in again.');
      }
    }
  }, [userLoading, user, location.pathname]);

  const login = (userData: {
    firstName: string;
    _id: string;
    role: string;
  }) => {
    console.log('userData:', userData);
    const { firstName, _id, role } = userData;
    setUser({
      userName: firstName,
      _id: _id,
      role: role
    });
    console.log(user);
    if (userData.role === 'Admin') navigate('/admin');
    else navigate('/member');
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      const response = await fetch(`${URL}/users/logout`, {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        setUser({ _id: null, userName: null, role: null });
        setIsLoggedIn(false);
        navigate('/');
      }
    } catch (error) {
      console.log('Error during Logout:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        authenticate,
        userLoading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};