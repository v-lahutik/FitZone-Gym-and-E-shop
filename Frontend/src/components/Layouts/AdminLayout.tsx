import { Outlet, Link } from 'react-router-dom';
import './layout.css';
import Dashboard from '../Dashboard/Dashboard';

export default function AdminLayout() {
  return (
    <div className="bg-white">
      <h1>Admin Dashboard</h1>
      <Dashboard />
      {/* Navigation for admin sub-pages */}
      <nav>
        <ul>
          <li>
            <Link to="/admin/">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/members">Menage Users</Link>
          </li>
          <li>
            <Link to="/admin/courses">Menage Courses</Link>
          </li>
        </ul>
      </nav>

      {/* Renders the nested routes */}
      <Outlet />
    </div>
  );
}
