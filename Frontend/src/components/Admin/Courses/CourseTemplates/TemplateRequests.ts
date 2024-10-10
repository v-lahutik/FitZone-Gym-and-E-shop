import { CourseTemplate } from './CourseTemplateDisplay';
import axios, { AxiosError } from 'axios';
import { URL } from '../../../../utils/URL';
import {
  deleteTemplatePopUp,
  saveTemplatePopUp,
  updateTemplatePopUp
} from '../../../../utils/helperFunction';
import Swal from 'sweetalert2';

interface ServerResponse {
  msg: string;
  status: number;
}

// saving a new course template
export const handleSaveNewTemplate = async (
  localCourse: CourseTemplate,
  closeForm: () => void
) => {
  const isConfirmed = await saveTemplatePopUp();
  if (isConfirmed) {
    try {
      const response = await axios.post<ServerResponse>(
        `${URL}/admin/courseTemplates/create`,
        localCourse,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      const { msg } = response.data;
      Swal.fire({
        title: 'Saved!',
        text: msg,
        icon: 'success'
      });
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
    const isConfirmed = await updateTemplatePopUp();
    if (isConfirmed) {
      try {
        const response = await axios.put<ServerResponse>(
          `${URL}/admin/courseTemplates/update/${localCourse._id}`,
          localCourse,
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

//  deleting a course template
export const handleDeleteTemplate = async (template: CourseTemplate) => {
  if (template) {
    const isConfirmed = await deleteTemplatePopUp();
    if (isConfirmed) {
      try {
        const response = await axios.delete<ServerResponse>(
          `${URL}/admin/courseTemplates/delete/${template._id}`,
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
