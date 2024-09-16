export default function Header() {
  return (
    <header className="bg-gray-800 flex items-center p-4 sm:p-8 justify-between min-h-[50px] my-auto">
      <div className="basis-1/4">Logo</div>

      <div className="sm:hidden">BurgerIcon</div>
      <div className="basis-1/2 flex justify-evenly">
        <nav>
          <ul className="hidden sm:flex space-x-8">
            <li className="text-gray-500 hover:text-gray-400">MEMBERSHIP</li>
            <li className="text-gray-500 hover:text-gray-400">COURSES</li>
            <li className="text-gray-500 hover:text-gray-400">SHOP</li>
            <li className="text-gray-500 hover:text-gray-400">CONTACT</li>
          </ul>
        </nav>
      </div>
      <div className="basis-1/4 flex justify-end">
        <div>
          <button>LOGIN</button>
        </div>
        <div className="ml-4">Cart</div>
      </div>
    </header>
  );
}
