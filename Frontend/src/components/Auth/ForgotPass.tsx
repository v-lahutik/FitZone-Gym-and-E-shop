import { useState, useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';
import * as Yup from 'yup';
import axios from 'axios';
import { URL } from '../../utils/URL';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import Swal from 'sweetalert2';

const ForgotPass: React.FC = () => {
  const { setResetPassOpen, setLoginOpen } = useContext(LoginContext);
  const [email, setEmail] = useState<email>({
    email: ''
  });
  const [errors, setErrors] = useState<null | { [key: string]: string }>(null);
  const [beErr, setBeError] = useState(null);

  interface email {
    email: string;
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const emailSchema = Yup.object({
    email: Yup.string()
      .required('Email address is required')
      .email('Email format is not valid')
  });

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await emailSchema.validate(email, { abortEarly: false }); //validate user data
      console.log('email for reset pass:', email);

      setErrors(null); // clear errors
      setBeError(null); // clear errors

      // send request to backend
      const res = await axios({
        url: `${URL}/users/forgotPassword`,
        method: 'POST',
        data: email,
        withCredentials: true
      }).catch((err) => {
        console.log(err);
        throw err;
      });
      // pop ups after email sent
      if (res.status === 200) {
        await Swal.fire({
          title: 'Sent!',
          text: `${res.data.message} Please go to your email to check it!`,
          icon: 'success',
          confirmButtonColor: '#333'
        });
        setResetPassOpen(false);
      }
      if (res.status !== 200) {
        await Swal.fire({
          title: 'Error!',
          text: res.data.message,
          icon: 'error',
          confirmButtonColor: '#333'
        });
        setResetPassOpen(false);
      }
      console.log(res.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // backend error
      if (error.response) {
        console.log(error.response);
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
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="z-40 w-full absolute max-w-md py-6 px-12  h-min bg-white rounded shadow-xl ">
        <div
          onClick={() => {
            setResetPassOpen(false);
            setLoginOpen(false);
          }}
          className="absolute cursor-pointer top-4 right-4 text-2xl "
        >
          <IoMdCloseCircleOutline />
        </div>
        <h2 className="text-5xl font-semibold text-gray-800 text-center font-kanit mb-3">
          Reset Password
        </h2>
        <p className="text-gray-800 text-center mt-2 mb-6">
          Please enter your email to do the reset password process and send the
          verification email.
        </p>
        <form action="" onSubmit={submitForm}>
          <div className="mb-6">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              onChange={changeHandler}
              value={email.email}
              className="w-full border py-2 pl-3 rounded mt-2 focus:outline-none focus:thBorderColor focus:ring-1 focus:thBorderColor bg-smokeColor2"
            />
            {errors?.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>

          <button className="cursor-pointer py-2 px-4 block mt-8 mb-6 bg-primary text-white font-bold w-full text-center rounded">
            Send
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
    </div>
  );
};

export default ForgotPass;
