import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { LoginContext } from '../../context/LoginContext';
import { IoMdCloseCircleOutline } from 'react-icons/io';


const Login: React.FC = () => {
  interface userLogin {
    email: string;
    loginPassword: string;
  }

  const [userLogin, setUserLogin] = useState<userLogin>({
    email: '',
    loginPassword: ''
  });
  const { setLoginOpen, setResetPassOpen } = useContext(LoginContext);
  const userContext = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = userContext || {};

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await login(userLogin);

    if (result.success) {
      setLoginOpen(false);
    } else {
      setErrorMessage(result.error || 'Login failed');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-30">
      <div className="z-30 w-full absolute max-w-md py-6 px-12 h-min bg-white rounded shadow-xl ">
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
          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}

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

          <div
            onClick={() => {
              setResetPassOpen(true);
              setLoginOpen(false);
            }}
            className="text-sm font-thin text-gray-800 mt-2 inline-block hover:text-primary cursor-pointer"
          >
            Forgot Password?
          </div>
          <button className="cursor-pointer py-2 px-4 block mt-8 mb-6 bg-primary text-white font-bold w-full text-center rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
