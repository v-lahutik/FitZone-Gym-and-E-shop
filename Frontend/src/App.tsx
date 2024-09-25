// import LandingPage from './pages/LandingPage/LandingPage.tsx';
import AdminPage from './pages/AdminPage/AdminPage.tsx';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login.tsx';
import LandingPage from './pages/LandingPage/LandingPage.tsx';
import MemberRoute from './components/Layouts/MemberRoute.tsx';
import MemberLayout from './components/Layouts/MemberLayout.tsx';
import AdminRoute from './components/Layouts/AdminRoute.tsx';
import AdminLayout from './components/Layouts/AdminLayout.tsx';
import CourseTable from './components/Admin/CourseTable/CourseTable.tsx';
import MembersTable from './components/Admin/MembersTable/MembersTable.tsx';

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<AdminPage/>}></Route>
    //   {/* <Route path="/courses" element={<Courses />} /> */}
    //   {/* <Route path="/profile" element={<Profile />} /> */}

    //   <Route path="/login" element={<Login />}></Route>

    //   {/*  <Route path="/register/:vtoken/:uid" element={<Verify />} />
    // <Route path="/register" element={<Register />} />  */}
    // </Routes>

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
        <Route path="" element={<AdminPage />} />
        <Route path="courses" element={<CourseTable />} />
        <Route path="members" element={<MembersTable />} />
      </Route>
    </Routes>
  );
}

export default App;
