export default function Header() {
  return (
    <header className="grid grid-cols-12 min-h-[100px]">
      <div>Logo</div>
      <div>
        <nav className="flex items-center">
          <ul>
            <li>MEMBERSHIP</li>
            <li>COURSES</li>
            <li>SHOP</li>
            <li>CONTACT US</li>
          </ul>
        </nav>
      </div>
      <div>
        <button>LOGIN</button>
        <div>Cart</div>
      </div>
    </header>
  );
}
