import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const VerifyHandlePage:React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    // Get query parameters (like userId) from the URL
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');
    const status = params.get('status');
    console.log(status)
  
    useEffect(() => {
      if (status === 'already-activated') {
        Swal.fire({
          title: 'Activated!',
          text: 'Your account is already activated.',
          icon: 'success'
        }).then(()=>navigate(`/`));  // Redirect to home page
      } else if (status === 'verified-success') {
        Swal.fire({
          title: 'Activated!',
          text: 'Your account has been successfully verified!',
          icon: 'success'
        }).then(()=>navigate(`/`));
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Error in verification! something went wrong!',
          icon: 'error'
        }).then(()=>navigate(`/`));
      }
    }, [status, userId, navigate]);
  
    return (
      <div>
      </div>
    );
};

export default VerifyHandlePage;

