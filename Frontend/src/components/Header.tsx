import Logo from '../assets//images/Blog/Logo/logo.svg';

export default function Header() {
  return (
    <header className="bg-primary flex items-center p-4 sm:p-8 justify-between min-h-[50px] my-auto">
      <div className="basis-1/4 ">
      <img src={Logo} alt="Logo" className='sm:mr-4 min-w-24' />
      </div>

      <div className="sm:hidden ml-4 mt-4 text-white">BurgerIcon</div>
      <div className="basis-1/2 flex justify-evenly">
        <nav>
          <ul className="hidden sm:flex space-x-8 md:space-x-12 mx-4 mt-4">
            <li className="text-gray-400 hover:text-gray-300 cursor-pointer">MEMBERSHIP</li>
            <li className="text-gray-400 hover:text-gray-300 cursor-pointer">COURSES</li>
            <li className="text-gray-400 hover:text-gray-300 cursor-pointer">SHOP</li>
            <li className="text-gray-400 hover:text-gray-300 cursor-pointer">CONTACT</li>
          </ul>
        </nav>
      </div>
      <div className="basis-1/4 flex justify-end">
        <div>
          <button className="mt-3 rounded p-2 bg-secondary text-white">LOGIN</button>
        </div>
        <div className="ml-4 mt-1 text-gray-400 rounded-full p-3 border">Cart</div>
      </div>
    </header>
  );
}
