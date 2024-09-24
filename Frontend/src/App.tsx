import Header from './components/Header/Header.tsx';
import Hero from './components/Hero/Hero.tsx';
import WhyChooseUs from './components/WhyUs/WhyUsSection.tsx';
import CourseGallery from './components/CourseGallery/CourseGallery.tsx';
import Contact from './components/ContactSection/Contact.tsx';
import Footer from './components/Footer/Footer.tsx';
import Membership from './components/Membership/Membership.tsx';
import LandingPage from './pages/LandingPage/LandingPage.tsx';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      {/* <Route path="/courses" element={<Courses />} /> */}
      {/* <Route path="/profile" element={<Profile />} /> */}
      {/* <Route path="/login" element={<Login />} />
    <Route path="/register/:vtoken/:uid" element={<Verify />} />
    <Route path="/register" element={<Register />} /> */}
    </Routes>
  );
}

export default App;
