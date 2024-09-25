import axios, { AxiosError } from 'axios';
import { Member } from './MembersTable'; // Import the Member interface

const URL = import.meta.env.VITE_API as string;

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
    if (window.confirm('Are you sure you want to change this member?')) {
      try {
        const response = await axios.put<ServerResponse>(
          `${URL}/admin/members/update/${localMember._id}`,
          localMember,
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
        const { msg } = response.data;
        alert(msg || 'Member information updated successfully!');
        closeForm();
      } catch (err) {
        errorAlert(err as AxiosError);
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
    console.log(localMember);
    if (window.confirm('Are you sure you want to register this member?')) {
      try {
        const response = await axios.post<ServerResponse>(
          `${URL}/admin/members/register`,
          localMember,
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
        const { msg } = response.data;
        alert(msg || 'Member registered successfully!');
        closeForm();
      } catch (err) {
        errorAlert(err as AxiosError);
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
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        const response = await axios.delete<ServerResponse>(
          `${URL}/admin/members/delete/${localMember._id}`,
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
        const { msg } = response.data;
        alert(msg || 'Member information updated successfully!');
        closeForm();
      } catch (err) {
        errorAlert(err as AxiosError);
      }
    }
  }
};

const errorAlert = (err: AxiosError) => {
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError<ServerResponse>;

    if (axiosError.response) {
      // The request was made and the server responded with an error status
      const { status, data } = axiosError.response;
      alert(
        `Error: ${data?.msg || 'Something went wrong'}. Status code: ${status}`
      );
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error('No response received:', axiosError.request);
      alert('No response from the server. Please check your connection.');
    } else {
      // Something else happened in setting up the request
      console.error('Error:', axiosError.message);
      alert('An unexpected error occurred.');
    }
  } else {
    // Handle non-Axios errors
    console.error('Unexpected error:', err);
    alert('An unexpected error occurred.');
  }
};
