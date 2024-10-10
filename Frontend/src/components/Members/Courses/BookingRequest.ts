import axios, { AxiosError } from 'axios';
import { URL } from '../../../utils/URL';
import { Course } from './MembersCourseTable';
import { bookedPopUp, cancelPopUp } from '../../../utils/helperFunction';
import Swal from 'sweetalert2';

interface ServerResponse {
  msg: string;
  status: number;
}

// to book course !!
export const bookNewCourse = async (course: Course) => {
  const isConfirmed = await bookedPopUp()
  if (isConfirmed) {
    try {
      const response = await axios.put<ServerResponse>(
        `${URL}/users/booking/${course._id}`,
        {}, //empty object needed it
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      const { msg } = response.data;
      Swal.fire({
        title: 'Booked!',
        text: msg,
        icon: 'success'
    })
    } catch (error) {
      errorAlert(error as AxiosError);
    }
  }
};

//  deleting a course template
export const cancelBookedCourse = async (course: Course) => {
  if (course) {
    const isConfirmed = await cancelPopUp()
    if (isConfirmed) {
      try {
        const response = await axios.put<ServerResponse>(
          `${URL}/users/cancelBooking/${course._id}`,
          {}, //empty object needed it
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        const { msg } = response.data;
        Swal.fire({
          title: 'Canceled!',
          text: msg,
          icon: 'success'
      });
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
      const { data } = axiosError.response;
      Swal.fire({
        title: 'Error!',
        text: `${data?.msg || 'Something went wrong'}`,
        icon: 'error'
    })
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error('No response received:', axiosError.request);
      Swal.fire({
        title: 'Error!',
        text: 'No response from the server. Please check your connection.',
        icon: 'error'
    })
    } else {
      // Something else happened in setting up the request
      console.error('Error:', axiosError.message);
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred.',
        icon: 'error'
    })
    }
  } else {
    // Handle non-Axios errors
    console.error('Unexpected error:', err);
    Swal.fire({
      title: 'Error!',
      text: 'An unexpected error occurred.',
      icon: 'error'
  })
  }
};
