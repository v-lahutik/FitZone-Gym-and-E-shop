import React from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import WhyChooseUs from '../../components/WhyUs/WhyUsSection';
import Membership from '../../components/Membership/Membership';
import CourseGallery from '../../components/CourseGallery/CourseGallery';
import Contact from '../../components/ContactSection/Contact';
import Footer from '../../components/Footer/Footer';

export default function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <WhyChooseUs />
      <Membership />
      <CourseGallery />
      <Contact />
      <Footer />
    </>
  );
}
