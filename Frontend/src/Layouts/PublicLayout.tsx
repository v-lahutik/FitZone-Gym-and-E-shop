import { useEffect, useContext , useState} from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import Login from '../components/Auth/Login';
import { LoginContext } from '../context/LoginContext';
import ForgotPass from '../components/Auth/ForgotPass';

export default function PublicLayout() {
  const { loginOpen, setLoginOpen } = useContext(LoginContext);
  const [resetPassOpen, setResetPassOpen] = useState<boolean>(false); // for forget password

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
      <Outlet/>
      <Footer />
      {loginOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <Login setLoginOpen={setLoginOpen} setResetPassOpen={setResetPassOpen} />
        </div>
      )}
      {resetPassOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <ForgotPass setLoginOpen={setLoginOpen} setResetPassOpen={setResetPassOpen} />
        </div>
      )}
    </>
  );
}
