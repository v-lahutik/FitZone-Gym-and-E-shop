import Logo from '../../assets/images/Logo/fitzone_logo.png';
import { IoCart } from 'react-icons/io5';
import DropdownMenu from '../../utils/DropdownMenu';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const menuItems = ['membership', 'courses', 'shop', 'contact'];
  const [loginOpen, setLoginOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
        <img
          src={Logo}
          alt="Logo"
          className="sm:mr-4 min-w-[100px] max-w-[300px] h-auto w-full"
        />
      </div>

      <div className="basis-1/2 flex justify-evenly">
        <nav>
          <ul className="hidden md:flex space-x-8 md:space-x-12 mx-4 mt-4">
            <li className="textLink">
              <a href="#membership">MEMBERSHIP</a>
            </li>
            <li className="textLink">
              <a href="#courses">COURSES</a>
            </li>
            <li className="textLink">SHOP</li>
            <li className="textLink">
              <a href="#contact">CONTACT</a>
            </li>
          </ul>
        </nav>
      </div>
      <DropdownMenu menuItems={menuItems} />
      <div className="basis-1/4 flex justify-end">
        <div>
   
            <button className="mt-3 rounded p-2 bg-primary text-white">
              LOGIN
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
