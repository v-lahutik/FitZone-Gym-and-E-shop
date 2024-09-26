import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

export default function Login() {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const [errors, setErrors] = useState<null | { [key: string]: string }>(null);
  const [beErr, setBeError] = useState(null);
  // const [status, setStatus] = useState(false);  // I am not sure if this need ?
  const navigate = useNavigate();

  interface User {
    email: string;
    password: string;
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginSchema = Yup.object({
    email: Yup.string()
      .required('Email address is required')
      .email('Email format is not valid'),

    password: Yup.string()
      .required('Password is required')
      .min(5, 'Password is too short')
      // .matches(/[a-z]/, 'Password should contains lower-case letter')
      // .matches(/[A-Z]/, 'Password should contains upper-case letter')
      // .matches(/[0-9]/, 'Password should contains number')
  });

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginSchema.validate(user, { abortEarly: false }); //validate user data
      console.log(user);
      
      setErrors(null) // clear errors
      setBeError(null) // clear errors

      // send request to backend
      const res = await axios({
        url: 'http://localhost:8000/users/login',
        method: 'POST',
        data: user,
        withCredentials: true
      });
      console.log(res);

      // setStatus(res.statusText === 'OK' ? true : false);    // I am not sure if this need ?

      // to navigate to different pages 
      if (res.status === 200) {
        const userRole = res.data.user.role;
        if (userRole === 'Admin') {
          navigate('/admin');
        } else if (userRole === 'Member') {
          navigate('/member');
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // backend error
      if (error.response) {
        console.log(error.response)
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
    <div className="flex items-center justify-center h-[100vh]">
      <div className="absolute inset-0">
        <img
          src="/src/assets/images/BG/testi_bg_1_1.png"
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className=" w-full relative max-w-xl py-6 px-12  h-min bg-white rounded shadow-xl ">
        <h2 className="text-5xl font-semibold text-gray-800 text-center font-kanit mb-3">
          Login
        </h2>
        <p className="text-gray-800 text-center mt-2 mb-6">
          Welcome back! Please login to your account.
        </p>
        <form action="" onSubmit={submitForm}>
          <div className="mb-6">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              onChange={changeHandler}
              value={user.email}
              className="w-full border py-2 pl-3 rounded mt-2 focus:outline-none focus:thBorderColor focus:ring-1 focus:thBorderColor bg-smokeColor2"
            />
            {errors?.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={changeHandler}
              value={user.password}
              className="w-full border py-2 pl-3 rounded mt-2 focus:outline-none focus:thBorderColor focus:ring-1 focus:thBorderColor bg-smokeColor2"
            />
          </div>
          {errors?.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}
          <div>
            <a
              href="#"
              className="text-sm font-thin text-gray-800 mt-2 inline-block hover:text-primary"
            >
              Forget Password
            </a>
          </div>
          <button className="cursor-pointer py-2 px-4 block mt-8 mb-6 bg-primary text-white font-bold w-full text-center rounded">
            Login
          </button>
        </form>
        {beErr? <p className="text-primary text-xl text-center mt-2 mb-6">{beErr}<br/>Please try again !!</p>:<p></p>}
      </div>
    </div>
  );
}
