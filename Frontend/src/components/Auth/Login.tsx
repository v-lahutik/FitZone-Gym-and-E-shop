import { useState, useContext, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { URL } from '../../utils/URL';
import { UserContext } from '../../context/UserContext';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


interface LoginProps {
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setResetPassOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setLoginOpen, setResetPassOpen }) => {
  const [userLogin, setUserLogin] = useState<userLogin>({
    email: '',
    loginPassword: ''
  });
  const [errors, setErrors] = useState<null | { [key: string]: string }>(null);
  const [beErr, setBeError] = useState(null);
  const userContext = useContext(UserContext);
  const authenticate =
    userContext?.authenticate ||
    (() =>
      Swal.fire({
        title: 'Error!',
        text: 'authenticate function not found',
        icon: 'error'
      }));
  const login =
    userContext?.login ||
    (() =>
      Swal.fire({
        title: 'Error!',
        text: 'login function not found',
        icon: 'error'
      }));
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Login re-render');
    console.log('isLoggedIn:', userContext?.isLoggedIn);
    if (!userContext?.isLoggedIn) {
      authenticate();
    }
    // redirect to the appropriate page based on the user's role
    if (userContext?.user.role === 'Admin') {
      navigate('/admin/dashboard');
    } else if (userContext?.user.role === 'Member') {
      navigate('/member');
    }
  }, [userContext?.isLoggedIn]);

  interface userLogin {
    email: string;
    loginPassword: string;
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const loginSchema = Yup.object({
    email: Yup.string()
      .required('Email address is required')
      .email('Email format is not valid'),

    loginPassword: Yup.string()
      .required('Password is required')
      .min(5, 'Password is too short')
    // .matches(/[a-z]/, 'Password should contains lower-case letter')
    // .matches(/[A-Z]/, 'Password should contains upper-case letter')
    // .matches(/[0-9]/, 'Password should contains number')
  });

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginSchema.validate(userLogin, { abortEarly: false }); //validate user data
      console.log('LOGIN INFORMATION:', userLogin);

      setErrors(null); // clear errors
      setBeError(null); // clear errors

      // send request to backend
      const res = await axios({
        url: `${URL}/users/login`,
        method: 'POST',
        data: userLogin,
        withCredentials: true
      }).catch((err) => {
        console.log(err);
        throw err;
      });

      // const userData = res.data.user;
      login(res.data.userData); // login user

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
    <div className="z-30 w-full absolute max-w-md py-6 px-12  h-min bg-white rounded shadow-xl ">
      <div
        onClick={() => setLoginOpen(false)}
        className="absolute cursor-pointer top-4 right-4 text-2xl "
      >
        <IoMdCloseCircleOutline />
      </div>
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
            value={userLogin.email}
            className="w-full border py-2 pl-3 rounded mt-2 focus:outline-none focus:thBorderColor focus:ring-1 focus:thBorderColor bg-smokeColor2"
          />
          {errors?.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}
        </div>

        <div>
          <input
            type="password"
            name="loginPassword"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={userLogin.loginPassword}
            className="w-full border py-2 pl-3 rounded mt-2 focus:outline-none focus:thBorderColor focus:ring-1 focus:thBorderColor bg-smokeColor2"
          />
        </div>
        {errors?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <div>
          <button
            onClick={()=> {setResetPassOpen(true);setLoginOpen(false);}}
            className="text-sm font-thin text-gray-800 mt-2 inline-block hover:text-primary"
          >
            Forgot Password?
          </button>
        </div>
        <button className="cursor-pointer py-2 px-4 block mt-8 mb-6 bg-primary text-white font-bold w-full text-center rounded">
          Login
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
  );
};

export default Login;
