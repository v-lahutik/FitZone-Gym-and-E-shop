import { Outlet, Link } from 'react-router-dom';
import './layout.css';

export default function AdminLayout() {
  return (
    <div className="bg-white">
      {/* Navigation for admin sub-pages */}
      <div className="header">ADMINHEADER</div>
      <div className="sidebar">
        {' '}
        SIDEBAR
        <nav>
          <ul>
            <li>
              <Link to="/admin">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/members">Manage Users</Link>
            </li>
            <li>
              {/* Only sub-navigation links */}
              <span>Courses</span>
              <ul>
                <li>
                  <Link to="/admin/courses/week">Course Week</Link>
                </li>
                <li>
                  <Link to="/admin/courses/templates">Course Templates</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      {/* Renders the nested routes */}
      <Outlet />
    </div>
  );
}
