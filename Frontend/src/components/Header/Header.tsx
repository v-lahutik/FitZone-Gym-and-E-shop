import Logo from '../../assets/images/Logo/fitzone_logo.png';
import { IoCart } from 'react-icons/io5';
import DropdownMenu, { MenuItem } from '../../utils/DropdownMenu';
import { IoIosArrowDown } from 'react-icons/io';
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import {User} from '../../custom.Types/userTypes';

interface HeaderProps {
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setLoginOpen }) => {
  const userContext = useContext(UserContext);
  const { user, logout, isLoggedIn, authenticate} = userContext || {};
 
  const ifHomePage = window.location.pathname === '/';


  useEffect(() => {
    if (!isLoggedIn) {
            authenticate?.();
          }
  }, [userContext?.isLoggedIn]);

  const [isScrolled, setIsScrolled] = useState(false);

  const homeMenuItems = [
    { label: 'membership', link: '#membership' },
    { label: 'courses', link: '#courses' },
    { label: 'shop', link: '/shop' },
    { label: 'contact', link: '#contact' }
  ];
  const generalMenuItems = [
    { label: 'Home', link: '/' },
    { label: 'courses', link: '/courses' },
    { label: 'shop', link: '/shop' }
    // { label: 'Contact', link: '/contact' }
  ];

  const renderMenuItems = (): MenuItem[] => {
    if (location.pathname === '/') {
      return homeMenuItems;
    } else {
      return generalMenuItems;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const homePage = window.location.origin;
  const contactUrl = `${homePage}#contact`;

  return (
    <header
      className={`bg-blackColor2 flex items-center p-4 md:p-8 justify-between min-h-[50px] w-full transition-all duration-500 ${
        isScrolled &&
        'fixed top-0 left-0 bg-opacity-70 backdrop-blur-md h-20 md:h-24 z-20'
      }`}
    >
      <div className="basis-1/4 ">
        <Link to="/">
          <img
            src={Logo}
            alt="Logo"
            className="sm:mr-4 min-w-[100px] max-w-[300px] h-auto w-full"
          />
        </Link>
      </div>

      <div className="basis-1/2 flex justify-evenly">
        <nav>
          <ul className="hidden md:flex space-x-8 md:space-x-12 mx-4 mt-4">
            {ifHomePage ? (
              <>
                <li className="textLink">
                  <a href="#membership">MEMBERSHIP</a>
                </li>
                <li className="textLink">
                  <a href="#courses">COURSES</a>
                </li>
              </>
            ) : (
              <>
                <li className="textLink">
                  <Link to="/">HOME</Link>
                </li>
                <li className="textLink">
                  <a href="/courses">COURSES</a>
                </li>
              </>
            )}

            <NavLink className="textLink" to="/shop">
              SHOP
            </NavLink>

            <li className="textLink">
              {ifHomePage ? (
                <a href="#contact">CONTACT</a>
              ) : (
                <a href={contactUrl}>CONTACT</a>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <DropdownMenu menuItems={renderMenuItems()} />
      
      <div className="basis-1/4 flex justify-end">
      {isLoggedIn && user && logout ? ( <UserLoggedIn user={user} logout={logout} />) : (
        <div>
          <button
            onClick={() => setLoginOpen(true)}
            className="mt-3 rounded p-2 bg-primary text-white"
          >
            LOGIN
          </button>
        </div>)}
        <div className="ml-4 mt-5 textLink text-2xl sm:text-3xl">
          <IoCart />
        </div>
      </div>
    </header>
  );
};

export default Header;


interface LoggedInProps {
  user: User
  logout: () => void;
}

const UserLoggedIn: React.FC<LoggedInProps> = ({user, logout}) => {

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [isOpen, setIsOpen] = useState(false);

  return           <div>
  <button
    className="flex items-center gap-4"
    onClick={toggleDropdown}
  >
    <span className="hidden text-right lg:block">
      <span className="block text-sm font-medium text-gray-400">
        {user.firstName} {user.lastName}
      </span>
      <span className="block text-xs text-gray-400"> {user.membership}</span>
    </span>
    <span className="h-12 w-12 rounded-full mb-2">
      <img
        src={
          user.profilePic ||
          'https://i.pinimg.com/736x/c5/ab/41/c5ab41e3f9766798af79b40d535f45e0.jpg'
        }
        alt="Profile picture"
        className="rounded-full"
        // Fallback image if the profile picture is not available or invalid
        onError={(e) => {
          e.currentTarget.src =
            'https://i.pinimg.com/736x/c5/ab/41/c5ab41e3f9766798af79b40d535f45e0.jpg';
        }}
      />
    </span>
    <IoIosArrowDown
      aria-hidden="true"
      className="-mr-1 h-5 w-5 text-gray-400 hidden lg:block"
    />
  </button>

  <div
    className={`absolute right-0 z-999  w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition transform duration-300 ease-in-out ${
      isOpen
        ? 'opacity-100 scale-100 '
        : 'opacity-0 scale-95 pointer-events-none'
    } `}
  >
    <div className="py-1">
      
      <NavLink className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 "
      to={`/${user.role?.toLowerCase()}/profile`}>Your Profile</NavLink>
     
      <li
         onClick={() => logout()}
        className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 "
      >
        Sign out
      </li>
    </div>
  </div>
</div>}