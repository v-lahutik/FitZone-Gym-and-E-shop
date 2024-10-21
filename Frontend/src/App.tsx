// import AdminPage from './pages/AdminPage/AdminPage.tsx';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage.tsx';
import MemberLayout from './Layouts/MemberLayout.tsx';
import AdminLayout from './Layouts/AdminLayout.tsx';
import CourseTable from './components/Admin/Courses/CourseTable/CourseTable.tsx';
import MembersTable from './components/Admin/MembersTable/MembersTable.tsx';
import { UserProvider } from './context/UserContext.tsx';
import { DateProvider } from './context/DateContext.tsx';
import CourseTemplateDisplay from './components/Admin/Courses/CourseTemplates/CourseTemplateDisplay.tsx';
import Dashboard from './components/Admin/Dashboard/Dashboard.tsx';
import UserProfile from './components/Members/Profile/UserProfile.tsx';
import Orders from './components/Members/MemberOrders/MemberOrders.tsx';
import AdminProductsDisplay from './components/Admin/Products/AdminProductsDisplay.tsx';
import AdminProfile from './components/Admin/Profile/AdminProfile.tsx';
import AdminOrders from './components/Admin/AdminOrders/AdminOrders.tsx';
import MembersCourseTable from './components/Members/Courses/MembersCourseTable.tsx';
import BookedCourses from './components/Members/Courses/BookedCourses.tsx';
import CoursesPage from './pages/CoursesPage/CoursesPage.tsx';
import SingleCoursePage from './pages/CoursesPage/SingleCoursePage.tsx';
import Products from './components/Shop/Products.tsx';
import VerifyHandlePage from './components/Auth/VerifyHandlePage.tsx';
import UserNotFound from './components/Auth/UserNotFound.tsx';
import Page404 from './components/Page404.tsx';
import { CartProvider } from './context/CartContext.tsx';
import PublicLayout from './Layouts/PublicLayout.tsx';
import SingleProductPage from './components/Shop/SingleProductPage.tsx';

import ContactPage from './pages/ContactPage/ContactPage.tsx';
import Messages from './components/Admin/Messages/Messages.tsx';

import Checkout from './components/Shop/Checkout.tsx';
import PassResetHandlePage from './components/Auth/PassResetHandlePage.tsx';
import { LoginProvider } from './context/LoginContext.tsx';

function App() {

  return (
    <DateProvider>
      <CartProvider>
        <LoginProvider>
          <UserProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/*" element={<Page404 />} />
              <Route path="/verify/:uid" element={<VerifyHandlePage />} />
              <Route path="/user-not-found" element={<UserNotFound />} />
              <Route path="/reset-password" element={<PassResetHandlePage />} />

              {/* Public Routes */}

              <Route path="/" element={<PublicLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/courses/:id" element={<SingleCoursePage />} />
                <Route path="/shop" element={<Products />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/shop/:pid" element={<SingleProductPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Route>

              {/* Private Routes for Members */}
              <Route path="/member" element={<MemberLayout />}>
                <Route path="profile" element={<UserProfile />} />
                <Route path="courses">
                  <Route path="week" element={<MembersCourseTable />} />
                  <Route path="booked" element={<BookedCourses />} />
                </Route>
                <Route path="orders" element={<Orders />} />
              </Route>
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="courses">
                  <Route path="week" element={<CourseTable />} />
                  <Route path="templates" element={<CourseTemplateDisplay />} />
                </Route>
                <Route path="members" element={<MembersTable />} />
                <Route path="shop" element={<AdminProductsDisplay />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="emails" element={<Messages />} />
              </Route>
            </Routes>
          </UserProvider>
        </LoginProvider>
      </CartProvider>
    </DateProvider>
  );
}

export default App;
