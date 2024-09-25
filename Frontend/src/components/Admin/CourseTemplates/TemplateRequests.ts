import { CourseTemplate } from './CourseTemplateDisplay';
import axios, { AxiosError } from 'axios';
import { URL } from '../../../utils/URL';

interface ServerResponse {
  msg: string;
  status: number;
}

// saving a new course template
export const handleSaveNewTemplate = async (
  localCourse: CourseTemplate,
  closeForm: () => void
) => {
  console.log(URL);
  if (window.confirm('Are you sure you want to save this Course?')) {
    try {
      const response = await axios.post<ServerResponse>(
        `${URL}/admin/courseTemplates/create`,
        localCourse,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      const { msg } = response.data;
      alert(msg || 'Course created successfully!');
      closeForm();
    } catch (error) {
      errorAlert(error as AxiosError);
    }
  }
};

// update course template
export const handleUpdateTemplate = async (
  localCourse: CourseTemplate,
  closeForm: () => void
) => {
  if (localCourse) {
    if (
      window.confirm('Are you sure you want to change this course template?')
    ) {
      try {
        const response = await axios.put<ServerResponse>(
          `${URL}/admin/courseTemplates/update/${localCourse._id}`,
          localCourse,
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
        const { msg } = response.data;
        alert(msg || 'Course template updated successfully!');
        closeForm();
      } catch (error) {
        errorAlert(error as AxiosError);
      }
    }
  }
};

//  deleting a course template
export const handleDeleteTemplate = async (template: CourseTemplate) => {
  if (template) {
    if (
      window.confirm('Are you sure you want to delete this course template?')
    ) {
      try {
        const response = await axios.delete<ServerResponse>(
          `${URL}/admin/courseTemplates/delete/${template._id}`,
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
        const { msg } = response.data;
        alert(msg || 'Course template deleted successfully!');
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
