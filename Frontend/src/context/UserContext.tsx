import { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  login: (userData: { _id: string; firstName: string; role: string }) => void;
  logout: () => void;
  authenticate: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  authenticate: () => void;
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{
    _id: string | null;
    userName: string | null;
    role: string | null;
  }>({ _id: null, userName: null, role: null });
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          console.log('userData:', userData);
          console.log('user:', user);
          const currentPath = window.location.pathname;
          console.log('currentPath:', currentPath);
       
        }
      } catch (error) {
        console.log('error during authentication:', error);
    
        // if the user is not authenticated, reset the user state
        setUser({ _id: null, userName: null, role: null });
        navigate('/');
        setIsLoggedIn(false);
      }
    };

    useEffect(() => { authenticate(); }, []);



  
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
      value={{ user, isLoggedIn, login, logout, authenticate }}
    >
      {children}
    </UserContext.Provider>
  );
};
