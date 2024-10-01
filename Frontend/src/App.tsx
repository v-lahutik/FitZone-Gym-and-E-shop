// import AdminPage from './pages/AdminPage/AdminPage.tsx';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login.tsx';
import LandingPage from './pages/LandingPage/LandingPage.tsx';
import MemberRoute from './Layouts/MemberRoute.tsx';
import MemberLayout from './Layouts/MemberLayout.tsx';
import AdminRoute from './Layouts/AdminRoute.tsx';
import AdminLayout from './Layouts/AdminLayout.tsx';
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
          <Route index element={<CourseTable />} />
          <Route path="courses">
            <Route path="week" element={<CourseTable />} />
            <Route
              path="templates"
              element={<CourseTemplateDisplay />}
            />
          </Route>
          <Route path="members" element={<MembersTable />} />
          {/* <Route path="/shop" element={<AdminShop />} /> */}
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
