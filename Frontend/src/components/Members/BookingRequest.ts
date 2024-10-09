
import axios, { AxiosError } from 'axios';
import { URL } from '../../utils/URL';
import { Course } from './MembersCourseTable';


interface ServerResponse {
  msg: string;
  status: number;
}

// to book course !!
export const bookNewCourse = async (
  course: Course
) => {
  console.log(URL);
  if (window.confirm('Are you sure you want to book this course?')) {
    try {
      const response = await axios.put<ServerResponse>(
        `${URL}/users/booking/${course._id}`,
        {}, //empty object needed it 
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        },
      );
      const { msg } = response.data;
      alert(msg || 'You booked the course successfully!');
    } catch (error) {
      errorAlert(error as AxiosError);
    }
  }
};

//  deleting a course template
export const cancelBookedCourse = async (course: Course) => {
  if (course) {
    if (
      window.confirm('Are you sure you want to cancel this course?')
    ) {
      try {
        const response = await axios.put<ServerResponse>(
          `${URL}/users/cancelBooking/${course._id}`,
          {}, //empty object needed it 
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        const { msg } = response.data;
        alert(msg || 'You canceled the course successfully!');
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
