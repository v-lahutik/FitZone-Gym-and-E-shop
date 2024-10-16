import { Link } from 'react-router-dom';
import Logo from '/src/assets/images/Logo/fitzone_logo.png';
import { RxHamburgerMenu } from 'react-icons/rx';
//import { CiSearch } from 'react-icons/ci';
import { FaRegBell } from 'react-icons/fa6';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import DropdownUser from '../DropdownUser';
import { User } from '../../custom.Types/userTypes';

const MemberHeader = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const userContext = useContext(UserContext);
  const { user, logout } = userContext || {};

  return (
    <header className="sticky top-0 z-999 flex w-full bg-blackColor2 drop-shadow-sm ">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-sm md:px-6 2xl:px-11 container mx-auto ">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm text-white  bg-blackColor2 p-1.5 shadow-sm lg:hidden"
          >
            <RxHamburgerMenu style={{ width: '27px', height: '27px' }} />
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img
              src={Logo}
              alt="Logo"
              className="max-w-[150px] h-auto w-full"
            />
          </Link>
        </div>

        <nav className="flex-1">
          <ul className="flex justify-center space-x-8 ">
            <li className="text-white hover:bg-graydark px-4 py-2 duration-300 rounded-sm cursor-pointer">
              <Link to="/">Home</Link>
            </li>

            <li className="text-white hover:bg-graydark px-4 py-2 duration-300 rounded-sm cursor-pointer">
              <Link to="/shop">Shop</Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3 2xsm:gap-7 justify-end">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <div className="relative">
              <li>
                <a
                  className="relative flex h-[2.125rem] w-[2.125rem] text-white items-center justify-center rounded-full border-[0.5px] border-strokedark bg-meta-4 hover:text-primary "
                  href="/"
                >
                  {/* <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 inline">
                    <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
                  </span> */}

                  <FaRegBell />
                </a>
              </li>
            </div>
          </ul>
          <DropdownUser
            user={user ?? ({} as User)}
            logout={logout || (() => {})}
          />
        </div>
      </div>
    </header>
  );
};

export default MemberHeader;
