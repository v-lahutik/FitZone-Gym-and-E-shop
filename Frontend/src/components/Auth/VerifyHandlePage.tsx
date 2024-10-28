import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const VerifyHandlePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get query parameters (like userId) from the URL
  const params = new URLSearchParams(location.search);
  const userId = params.get('userId');
  const status = params.get('status');


  useEffect(() => {
    if (status === 'already-activated') {
      Swal.fire({
        title: 'Activated!',
        text: 'Your account is already activated.',
        icon: 'success',
        confirmButtonColor: '#333'
      }).then(() => navigate(`/`)); // Redirect to home page
    } else if (status === 'verified-success') {
      Swal.fire({
        title: 'Activated!',
        text: 'Your account has been successfully verified!',
        icon: 'success',
        confirmButtonColor: '#333'
      }).then(() => navigate(`/`));
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Error in verification! something went wrong!',
        icon: 'error',
        confirmButtonColor: '#333'
      }).then(() => navigate(`/`));
    }
  }, [status, userId, navigate]);

  return (
    <>
      <section
        id="hero-section"
        className="hero bg-cover min-h-screen bg-center flex justify-center items-center"
        style={{
          backgroundImage: "url('/src/assets/images/Hero/background_hero.png')"
        }}
      ></section>
    </>
  );
};

export default VerifyHandlePage;
