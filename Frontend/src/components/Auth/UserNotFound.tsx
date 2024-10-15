import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const UserNotFound:React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    // Get query parameters (like userId) from the URL
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    console.log(status)
  
    useEffect(() => {
      if (status === 'user-not-found') {
        Swal.fire({
            title: 'User not Found',
            text: 'There is no such user, you need to register first !',
            icon: 'error'
        }).then(()=>navigate(`/`)); // Redirect to home page
      } else if (status === 'verify-error') {
        Swal.fire({
            title: 'No Verification!',
            text: 'There is no verification code',
            icon: 'error'
        }).then(()=>navigate(`/`));
      } else {
        Swal.fire({
            title: 'Error!',
            text: 'Error in verification! something went wrong!',
            icon: 'error'
        }).then(()=>navigate(`/`));
      }
    }, [status, navigate]);
  
    return (
      <div>
      </div>
    );
};

export default UserNotFound;

