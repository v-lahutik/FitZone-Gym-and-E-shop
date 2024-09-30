import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { URL } from '../utils/URL';

interface UserContextType {
  user: {
    _id: string | null;
    userName: string | null;
    role: string | null;
  };
  isLoggedIn: boolean;
  login: (userData: { _id: string; firstName: string; role: string }) => void;
  logout: () => void;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await fetch(`${URL}/users/authenticate`, {
          method: 'GET',
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          setUser({
            userName: userData.firstName,
            _id: userData._id,
            role: userData.role
          });
          setIsLoggedIn(true);
          console.log('userData:', userData);
          console.log(user);
          if (userData.role === 'Admin') navigate('/admin');
          else navigate('/member');
        } else {
          setUser({ _id: null, userName: null, role: null });
          navigate('/login');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log('error during authentication:', error);
      }
    };
    authenticate();
  }, [navigate]);

  const login = (userData: {
    firstName: string;
    _id: string;
    role: string;
  }) => {
    const { firstName, _id, role } = userData;
    setUser({
      userName: firstName,
      _id: _id,
      role: role
    });
    if (userData.role === 'Admin') navigate('/admin');
    else navigate('/member');
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      const response = await fetch(`${URL}/logout`, {
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
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
