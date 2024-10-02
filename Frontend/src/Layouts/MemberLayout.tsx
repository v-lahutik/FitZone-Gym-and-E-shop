
import { Link, Outlet } from 'react-router-dom';

export default function MemberLayout() {
  return (
    <div className="bg-white">
      {/* Navigation for admin sub-pages */}
      <div className="header">MEMBER HEADER</div>
      <div className="sidebar">
        SIDEBAR
        <nav>
          <ul>
            <li>
              <Link to="/member/profile">Profile Page</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Renders the nested routes */}
      <Outlet />
    </div>
  )
}
