/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '/src/assets/images/Logo/fitzone_logo.png';
import { IoIosArrowDown } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa6';
import { RxAvatar } from 'react-icons/rx';
import { IoSchoolOutline } from 'react-icons/io5';
import { IoCartOutline } from 'react-icons/io5';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { FaHome } from 'react-icons/fa';

interface SidebarProps {
  // interface for SidebarProps
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen
}: SidebarProps) {

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);
  // const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isCourseSubmenuOpen, setIsCourseSubmenuOpen] = useState(false);

  const toggleCourseSubmenu = () => {
    setIsCourseSubmenuOpen(!isCourseSubmenuOpen);
  };


  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    if (storedSidebarExpanded === 'true') {
      setSidebarExpanded(JSON.parse(storedSidebarExpanded));
    }
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      className={`absolute left-0 top-0 z-[9999] flex h-screen w-72 flex-col overflow-y-hidden bg-blackColor2 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-around gap-2 px-5 py-6 lg:py-7">
        <NavLink to="/">
          <img src={Logo} alt="Logo" className="max-w-[150px] h-auto w-full" />
        </NavLink>
        <NavLink to="/" className="text-white ">
          <FaHome
            style={{
              width: '30px',
              height: '30px',
              position: 'relative',
              top: '6px'
            }}
          />
        </NavLink>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden text-white"
        >
          <FaArrowLeft className="mt-3 ml-4" />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-white">MENU</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}

              <li onClick={() => setIsCourseSubmenuOpen(false)}>
                <NavLink
                  to="/member/profile"
                  className={({
                    isActive
                  }) => `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-textSidebar duration-300 ease-in-out hover:bg-graydark ${
                    isActive ? 'bg-graydark text-white' : ''
                  }
                  `}
                >
                  <RxAvatar />
                  Profile
                </NavLink>
              </li>

              {/* <!-- Menu Item Courses --> */}
              <li>
                <div
                  onClick={toggleCourseSubmenu}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-textSidebar duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
                >
                  <IoSchoolOutline />
                  Courses
                  <IoIosArrowDown
                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                      isCourseSubmenuOpen && 'rotate-180'
                    }`}
                  />
                </div>

                {isCourseSubmenuOpen && (
                  <div
                    className={`translate transform overflow-hidden ${
                      !isCourseSubmenuOpen && 'hidden'
                    }`}
                  >
                    <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                      <li>
                        <NavLink
                          to="/member/courses/week"
                          className={({
                            isActive
                          }) => `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-textSidebar duration-300 ease-in-out hover:bg-graydark ${
                            isActive ? 'bg-graydark text-white' : ''
                          }
                          `}
                        >
                          Course Calendar
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/member/courses/booked"
                          className={({
                            isActive
                          }) => `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-textSidebar duration-300 ease-in-out hover:bg-graydark ${
                            isActive ? 'bg-graydark text-white' : ''
                          }
                          `}
                        >
                          My Booked Courses
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              {/* <!-- Menu Item Courses --> */}
              <li onClick={() => setIsCourseSubmenuOpen(false)}>
                <NavLink
                  to="/shop"
                  className={({
                    isActive
                  }) => `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-textSidebar duration-300 ease-in-out hover:bg-graydark ${
                    isActive ? 'bg-graydark text-white' : ''
                  }
                  `}
                >
                  <IoCartOutline />
                  Shop
                </NavLink>
              </li>
              {/* <!-- Menu Item Shop --> */}
              <li onClick={() => setIsCourseSubmenuOpen(false)}>
                <NavLink
                  to="/member/orders"
                  className={({
                    isActive
                  }) => `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-textSidebar duration-300 ease-in-out hover:bg-graydark ${
                    isActive ? 'bg-graydark text-white' : ''
                  }
                  `}
                >
                  <HiOutlineShoppingBag />
                  Orders
                </NavLink>
              </li>
              {/* <!-- Menu Item Products --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
}
