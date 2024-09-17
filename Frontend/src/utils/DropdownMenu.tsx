import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

interface DropdownMenuProps {
  menuItems: string[]; // Array of menu items
  position?: string; // Optional positioning class for dropdown (e.g., 'top-[100px] right-0')
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ menuItems, position = 'top-[86px] right-0' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sm:hidden mx-4 mt-4 text-gray-400 text-xl" onClick={toggleDropdown}>
      <GiHamburgerMenu />
      {isOpen && (
        <div className={`absolute ${position} bg-primary p-4 rounded-lg`}>
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="text-gray-400 hover:text-gray-300 cursor-pointer"
              >
                {item.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
