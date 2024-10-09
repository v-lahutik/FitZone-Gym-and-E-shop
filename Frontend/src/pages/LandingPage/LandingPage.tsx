import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import WhyChooseUs from '../../components/WhyUs/WhyUsSection';
import Membership from '../../components/Membership/Membership';
import CourseGallery from '../../components/CourseGallery/CourseGallery';
import Contact from '../../components/ContactSection/Contact';
import Footer from '../../components/Footer/Footer';
import Login from '../../components/Auth/Login';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  //useEffect to handle scroll lock when login form is open

  useEffect(() => {
    if (loginOpen) {
      //disable scroll
      document.body.style.overflow = 'hidden';
    } else {
      //enable scroll
      document.body.style.overflow = 'unset';
    }
    // cleanup function for when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [loginOpen]);

  return (
    <>
      <Header setLoginOpen={setLoginOpen} />
      <Hero />
      <WhyChooseUs />
      <Membership />
      <CourseGallery />
      <Contact />
      <Footer />
      {loginOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <Login setLoginOpen={setLoginOpen} />
        </div>
      )}
    </>
  );
}
