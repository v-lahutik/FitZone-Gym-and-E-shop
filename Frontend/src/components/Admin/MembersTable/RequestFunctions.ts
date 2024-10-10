import axios, { AxiosError } from 'axios';
import { Member } from '../../../custom.Types/userTypes'; // Import the Member interface
import { URL } from '../../../utils/URL';
import {
  deleteUserPopUp,
  registerUserPopUp,
  updateUserPopUp
} from '../../../utils/helperFunction';
import Swal from 'sweetalert2';

interface ServerResponse {
  msg: string;
  status: number;
}

// Handle member update
export const handleUpdateUser = async (
  localMember: Member,
  closeForm: () => void
) => {
  if (localMember) {
    const isConfirmed = await updateUserPopUp();
    if (isConfirmed) {
      try {
        const response = await axios.put<ServerResponse>(
          `${URL}/admin/members/update/${localMember._id}`,
          localMember,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        const { msg } = response.data;
        Swal.fire({
          title: 'Updated!',
          text: msg,
          icon: 'success'
        });
        closeForm();
      } catch (error) {
        errorAlert(error as AxiosError);
      }
    }
  }
};

// Handle registering a new member
export const handleRegisterUser = async (
  localMember: Member,
  closeForm: () => void
) => {
  if (localMember) {
    const isConfirmed = await registerUserPopUp();
    if (isConfirmed) {
      try {
        const response = await axios.post<ServerResponse>(
          `${URL}/admin/members/register`,
          localMember,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        const { msg } = response.data;
        Swal.fire({
          title: 'Registered!',
          text: msg,
          icon: 'success'
        });
        closeForm();
      } catch (error) {
        errorAlert(error as AxiosError);
      }
    }
  }
};

// Handle deleting a member
export const handleDeleteUser = async (
  localMember: Member,
  closeForm: () => void
) => {
  if (localMember) {
    const isConfirmed = await deleteUserPopUp();
    if (isConfirmed) {
      try {
        const response = await axios.delete<ServerResponse>(
          `${URL}/admin/members/delete/${localMember._id}`,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        const { msg } = response.data;
        Swal.fire({
          title: 'Deleted!',
          text: msg,
          icon: 'success'
        });
        closeForm();
      } catch (error) {
        errorAlert(error as AxiosError);
      }
    }
  }
};

const errorAlert = (err: AxiosError) => {
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError<ServerResponse>;

    if (axiosError.response) {
      // The request was made and the server responded with an error status
      const { data } = axiosError.response;
      Swal.fire({
        title: 'Error!',
        text: `${data?.msg || 'Something went wrong'}`,
        icon: 'error'
      });
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error('No response received:', axiosError.request);
      Swal.fire({
        title: 'Error!',
        text: 'No response from the server. Please check your connection.',
        icon: 'error'
      });
    } else {
      // Something else happened in setting up the request
      console.error('Error:', axiosError.message);
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred.',
        icon: 'error'
      });
    }
  } else {
    // Handle non-Axios errors
    console.error('Unexpected error:', err);
    Swal.fire({
      title: 'Error!',
      text: 'An unexpected error occurred.',
      icon: 'error'
    });
  }
};
