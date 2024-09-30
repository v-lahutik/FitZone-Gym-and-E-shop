// import AdminPage from './pages/AdminPage/AdminPage.tsx';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login.tsx';
import LandingPage from './pages/LandingPage/LandingPage.tsx';
import MemberRoute from './components/Layouts/MemberRoute.tsx';
import MemberLayout from './components/Layouts/MemberLayout.tsx';
import AdminRoute from './components/Layouts/AdminRoute.tsx';
import AdminLayout from './components/Layouts/AdminLayout.tsx';
import CourseTable from './components/Admin/CourseTable/CourseTable.tsx';
import MembersTable from './components/Admin/MembersTable/MembersTable.tsx';
import { UserProvider } from './context/UserContext.tsx';
import CourseTemplateDisplay from './components/Admin/CourseTemplates/CourseTemplateDisplay.tsx';

function App() {
  return (
    <UserProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Private Routes for Members */}
        <Route
          path="/member"
          element={
            <MemberRoute>
              <MemberLayout />
            </MemberRoute>
          }
        ></Route>

        {/* Admin Routes */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<MembersTable />} />
          <Route path="admin/courses">
            <Route path="admin/courses/week" element={<CourseTable />} />
            <Route
              path="admin/courses/templates"
              element={<CourseTemplateDisplay />}
            />
          </Route>
          <Route path="admin/members" element={<MembersTable />} />
          {/* <Route path="/shop" element={<AdminShop />} /> */}
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
