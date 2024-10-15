import Logo from '../../assets/images/Logo/fitzone_logo.png';
import { IoCart } from 'react-icons/io5';
import DropdownMenu, { MenuItem } from '../../utils/DropdownMenu';
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

interface HeaderProps {
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setLoginOpen }) => {
  const ifHomePage = window.location.pathname === '/';
  const userContext = useContext(UserContext);

  const authenticate = userContext?.authenticate;

  useEffect(() => {
    if (!userContext?.isLoggedIn) {
      if (authenticate) {
        authenticate();
      }
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
        <div>
          <button
            onClick={() => setLoginOpen(true)}
            className="mt-3 rounded p-2 bg-primary text-white"
          >
            {userContext?.isLoggedIn ? 'PROFILE' : 'LOGIN'}
          </button>
        </div>
        <div className="ml-4 mt-5 textLink text-2xl sm:text-3xl">
          <IoCart />
        </div>
      </div>
    </header>
  );
};

export default Header;
