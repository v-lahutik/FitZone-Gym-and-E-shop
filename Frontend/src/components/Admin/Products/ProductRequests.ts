
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { Product } from '../../Shop/Products';
import { deleteProductPopUp,  saveProductPopUp,  updateProductPopUp} from '../../../utils/helperFunction';
import { URL } from '../../../utils/URL';

interface ServerResponse {
  msg: string;
  status: number;
}

// saving a new course template
export const handleSaveNewProduct = async (
  localProduct: Product,
  closeForm: () => void
) => {
  const isConfirmed = await saveProductPopUp();
  if (isConfirmed) {
    try {
      const response = await axios.post<ServerResponse>(
        `${URL}/admin/products/add`,
        localProduct,
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
export const handleUpdateProduct = async (
  localProduct: Product,
  closeForm: () => void
) => {
  if (localProduct) {
    const isConfirmed = await updateProductPopUp();
    if (isConfirmed) {
      try {
        const response = await axios.patch<ServerResponse>(
          `${URL}/admin/products/edit/${localProduct._id}`,
          localProduct,
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
export const handleDeleteProduct = async (
  template: Product,
  setProductChanged: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (template) {
    const isConfirmed = await deleteProductPopUp();
    if (isConfirmed) {
      try {
        const response = await axios.delete<ServerResponse>(
          `${URL}/admin/products/delete/${template._id}`,
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
        setProductChanged(true);
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
