import Logo from '../../assets/images/Logo/fitzone_logo.png';
import { IoCart } from 'react-icons/io5';
import DropdownMenu from '../../utils/DropdownMenu';


interface HeaderProps {
  menuItems: string[];
}

const Header: React.FC<HeaderProps> = ({ menuItems }) => {
  return (
    <header className="bg-[#141414] flex items-center p-4 sm:p-8 justify-between min-h-[50px] my-auto">
      <div className="basis-1/4 ">
        <img
          src={Logo}
          alt="Logo"
          className="sm:mr-4 min-w-[100px] max-w-[300px] h-auto w-full"
        />
      </div>

      <div className="basis-1/2 flex justify-evenly">
        <nav>
          <ul className="hidden sm:flex space-x-8 md:space-x-12 mx-4 mt-4">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="text-gray-400 hover:text-gray-300 cursor-pointer"
              >
                {' '}
                {item.toUpperCase()}{' '}
              </li>
            ))}
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
        <div className="ml-4 mt-5 text-gray-400 text-2xl sm:text-3xl cursor-pointer">
          <IoCart />
        </div>
      </div>
    </header>
  );
}


export default Header;