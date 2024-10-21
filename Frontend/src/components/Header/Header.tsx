import Logo from '../../assets/images/Logo/fitzone_logo.png';
import { IoCart } from 'react-icons/io5';
import DropdownMenu, { MenuItem } from '../../utils/DropdownMenu';
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Cart from '../Shop/Cart';
import UserLoggedIn from '../UserLoggedIn';
import { useCart } from '../../context/CartContext';

interface HeaderProps {
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setLoginOpen }) => {
  const userContext = useContext(UserContext);


  const { user, logout, isLoggedIn} = userContext || {};
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // State to manage the cart open/close
  const { getTotalQuantity } = useCart();

  const ifHomePage = window.location.pathname === '/';

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
              <a href="/contact">CONTACT</a>
            </li>
          </ul>
        </nav>
      </div>
      <DropdownMenu menuItems={renderMenuItems()} />

      <div className="basis-1/4 flex justify-end">
        {isLoggedIn && user && logout ? (
          <UserLoggedIn user={user} logout={logout} />
        ) : (
          <div>
            <button
              onClick={() => setLoginOpen(true)}
              className="mt-3 rounded p-2 bg-primary text-white"
            >
              LOGIN
            </button>
          </div>
        )}

        {/* Cart Icon */}
        <div
          className="relative ml-4 mt-5 textLink text-2xl sm:text-3xl cursor-pointer"
          onClick={() => setCartOpen(true)}
        >
          <IoCart />

          {/* Show total quantity if there are items in the cart */}
          {getTotalQuantity() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm">
              {getTotalQuantity()}
            </span>
          )}
        </div>
      </div>

      {/* Render the Cart component when cartOpen is true */}
      {cartOpen && <Cart open={cartOpen} setOpen={setCartOpen} products={[]} />}
    </header>
  );
};

export default Header;
