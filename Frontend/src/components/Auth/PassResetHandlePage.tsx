import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { URL } from '../../utils/URL';

const PassResetHandlePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get query parameters (like userId) from the URL
  const params = new URLSearchParams(location.search);
  const userId = params.get('userId');
  const token = params.get('token');

  const [newPassword, setNewPassword] = useState<newPassword>({
    newPassword: '',
    confirmPassword: '',
    token: token,
    userId: userId
  });
  const [errors, setErrors] = useState<null | { [key: string]: string }>(null);
  const [beErr, setBeError] = useState(null);

  interface newPassword {
    newPassword: string;
    confirmPassword: string;
    token: string | null;
    userId: string | null;
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  const newPasswordSchema = Yup.object({
    newPassword: Yup.string()
      .required('Password is required')
      .min(5, 'Password is too short')
      .matches(/[a-z]/, 'Password should contains lower-case letter')
      .matches(/[A-Z]/, 'Password should contains upper-case letter')
      .matches(/[0-9]/, 'Password should contains number')
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character'
      ),

    confirmPassword: Yup.string()
      .required('Password is required')
      .min(5, 'Password is too short')
      .matches(/[a-z]/, 'Password should contains lower-case letter')
      .matches(/[A-Z]/, 'Password should contains upper-case letter')
      .matches(/[0-9]/, 'Password should contains number')
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character'
      )
  });


  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await newPasswordSchema.validate(newPassword, { abortEarly: false }); //validate user data


      setErrors(null); // clear errors
      setBeError(null); // clear errors

      // send request to backend
      const res = await axios({
        url: `${URL}/users/resetPassword`,
        method: 'POST',
        data: newPassword,
        withCredentials: true
      });

      if (res.status === 200) {
        Swal.fire({
          title: 'Reset!',
          text: 'Your password has been successfully reset to new!',
          icon: 'success',
          confirmButtonColor: '#333'
        }).then(() => navigate(`/`));
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // backend error
      if (error.response) {
        if (
          error.response.status === 403 ||
          error.response.status === 404 ||
          error.response.status === 400
        ) {
          Swal.fire({
            title: 'Error!',
            text: `${error.response.data.message} Please try again !`,
            icon: 'error',
            confirmButtonColor: '#333'
          })
        }
        setBeError(error.response.data.msg);
      }

      // validation errors
      const vErrors: { [key: string]: string } = {};
      if (error.name === 'ValidationError') {
        error.inner.forEach((err: { path: string; message: string }) => {
          vErrors[err.path] = err.message;
        });
        setErrors(vErrors);
      }
    }
  };

  return (
    <>
      <section
        id="hero-section"
        className="hero bg-cover min-h-screen bg-center flex justify-center items-center"
        style={{
          backgroundImage: "url('/src/assets/images/Hero/background_hero.png')"
        }}
      >
        <div className="z-30 w-full absolute max-w-md py-6 px-12  h-min bg-white rounded shadow-xl ">
          <h2 className="text-5xl font-semibold text-gray-800 text-center font-kanit mb-3">
            Reset Password
          </h2>
          <p className="text-gray-800 text-center mt-2 mb-6">
            Please enter your new password !!.
          </p>
          <form action="" onSubmit={submitForm}>
            <div className="mb-6">
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="New Password"
                onChange={changeHandler}
                value={newPassword.newPassword}
                className="w-full border py-2 pl-3 rounded mt-2 focus:outline-none focus:thBorderColor focus:ring-1 focus:thBorderColor bg-smokeColor2"
              />
              {errors?.newPassword && (
                <div className="text-red-500 text-sm">{errors.newPassword}</div>
              )}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                onChange={changeHandler}
                value={newPassword.confirmPassword}
                className="w-full border py-2 pl-3 rounded mt-2 focus:outline-none focus:thBorderColor focus:ring-1 focus:thBorderColor bg-smokeColor2"
              />
            </div>
            {errors?.confirmPassword && (
              <div className="text-red-500 text-sm">
                {errors.confirmPassword}
              </div>
            )}

            <button
              type="submit"
              className="cursor-pointer py-2 px-4 block mt-8 mb-6 bg-primary text-white font-bold w-full text-center rounded"
            >
              Reset
            </button>
          </form>
          {beErr ? (
            <p className="text-primary text-xl text-center mt-2 mb-6">
              {beErr}
              <br />
              Please try again !!
            </p>
          ) : (
            <p></p>
          )}
        </div>
      </section>
    </>
  );
};

export default PassResetHandlePage;
