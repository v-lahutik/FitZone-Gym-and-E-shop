import { useState, createContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { useCart } from '../context/CartContext.tsx';
import * as Yup from 'yup';
import { URL } from '../utils/URL';
import axios from 'axios';
import { User } from '../custom.Types/userTypes';
import Swal from 'sweetalert2';

const userNull: User = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  membership: '',
  address: null,
  role: '',
  profilePic: '',
  is_activated: false
};

interface Logintype {
  email: string;
  loginPassword: string;
}

interface UserContextType {
  user: User;
  isLoggedIn: boolean;
  userLoading: boolean;
  login: (
    userLogin: Logintype
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  authenticate: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: userNull,
  isLoggedIn: false,
  userLoading: true,
  login: () => Promise.resolve({ success: false, error: undefined }),
  logout: () => {},
  authenticate: () => {}
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { clearCart } = useCart();
  const [user, setUser] = useState<User>(userNull);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLoading, setUserLoading] = useState(true);

  //check for cookies to authenticate user

  const authenticate = async () => {

    try {
      const response = await axios.get(`${URL}/users/authenticate`, {
        withCredentials: true
      });
      if (response.status === 200) {
        const userData = response.data;
        setUser(userData);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('error during authentication:', error);

      // if the user is not authenticated, reset the user state
      setUser(userNull);
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
      // Redirect user if they try to access a page they are not authorized to

      if (
        (location.pathname.startsWith('/admin') && user.role !== 'Admin') ||
        (location.pathname.startsWith('/member') && user.role !== 'Member')
      ) {
        logout();
        Swal.fire({
          title: 'Error!',
          text: 'Unauthorized access. You were logged out. Please log in again.',
          icon: 'error',
          confirmButtonColor: '#333'
        });
      }
    }
  }, [userLoading, user, location.pathname]);

  const loginSchema = Yup.object({
    email: Yup.string()
      .required('Email address is required')
      .email('Email format is not valid'),

    loginPassword: Yup.string()
      .required('Password is required')
      .min(5, 'Password is too short')
  });

  const login = async (
    userLogin: Logintype
  ): Promise<{ success: boolean; error?: string }> => {
    try {

      await loginSchema.validate(userLogin, { abortEarly: false }); //validate user data

      // send request to backend
      const response = await axios({
        url: `${URL}/users/login`,
        method: 'POST',
        data: userLogin,
        withCredentials: true
      });
      if (response.status === 200) {
        const userData = response.data.userData;
        setUser(userData); // login user
        setIsLoggedIn(true);
        Swal.fire({
          title: 'Welcome!',
          text: 'You have successfully logged in.',
          icon: 'success',
          confirmButtonColor: '#333'
        });
        return { success: true };
      }
      return { success: false, error: 'An unexpected error occurred early' };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server returned an error, extract message from error.response.data
          return { success: false, error: error.response.data.msg };
        } else if (error.request) {
          // Request was made but no response (possibly a network error)
          return { success: false, error: 'possible network error!' };
        } else {
          // Some other error occurred during setup of the request
          return { success: false, error: error.message };
        }
      } else if (error instanceof Yup.ValidationError) {
        // Handle Yup validation errors
        return { success: false, error: error.errors.join(', ') }; // Combine multiple validation errors
      }
      return { success: false, error: 'An unexpected error occurred late' };
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${URL}/users/logout`, {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        setUser(userNull);
        setIsLoggedIn(false);
        navigate('/');
        clearCart();
        Swal.fire({
          title: 'See you soon!',
          text: 'You have successfully logged out.',
          icon: 'info',
          confirmButtonColor: '#333'
        });
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
