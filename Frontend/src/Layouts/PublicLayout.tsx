import { useEffect, useContext } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import Login from '../components/Auth/Login';
import { LoginContext } from '../context/LoginContext';
import ForgotPass from '../components/Auth/ForgotPass';

export default function PublicLayout() {
  const { loginOpen, setLoginOpen, resetPassOpen } = useContext(LoginContext);
   // for forget password

  const location = useLocation();

  useEffect(() => {
    if (loginOpen) {
      //disable scroll
      document.body.style.overflow = 'hidden';
    } else {
      //enable scroll
      document.body.style.overflow = 'unset';
    }
    // cleanup function for when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [loginOpen]);

  // Scroll to top on location change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Header setLoginOpen={setLoginOpen} />
      <Outlet />
      <Footer />
      {loginOpen && <Login />}
      {resetPassOpen && <ForgotPass />}
    </>
  );
}
