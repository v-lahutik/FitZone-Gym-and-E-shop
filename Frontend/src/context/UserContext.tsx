import { useState, createContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { URL } from '../utils/URL';
import axios from 'axios';

interface Address {
  streetNumber: number;
  streetName: string;
  city: string;
  country: string;
  postCode: string;
}

interface User {
  _id: string | null;
  firstName: string | null;
  lastName: string | null;
  membership: string | null;
  address: Address | null;
  role: string | null;
}

interface UserContextType {
  user: User;
  isLoggedIn: boolean;
  userLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  authenticate: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    _id: null,
    firstName: null,
    lastName: null,
    membership: null,
    address: null,
    role: null
  });
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
          _id: userData._id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          membership: userData.membership,
          address: userData.address,
          role: userData.role
        });
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('error during authentication:', error);

      // if the user is not authenticated, reset the user state
      setUser({
        _id: null,
        firstName: null,
        lastName: null,
        membership: null,
        address: null,
        role: null
      });
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
        setUser({
          _id: null,
          firstName: null,
          lastName: null,
          membership: null,
          address: null,
          role: null
        });
        navigate('/'); //redirect to home page if user is not an admin
        alert('Unauthorized access. You were logged out. Please log in again.');
      }
    }
  }, [userLoading, user, location.pathname]);

  const login = (userData: User) => {
    console.log('userData:', userData);
    setUser(userData);
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
        setUser({
          _id: null,
          firstName: null,
          lastName: null,
          membership: null,
          address: null,
          role: null
        });
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
