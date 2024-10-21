import {User} from '../custom.Types/userTypes';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

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
          className="cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 "
        >
          Sign out
        </li>
      </div>
    </div>
  </div>}

  export default UserLoggedIn;