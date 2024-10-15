import Hero from '../../components/Landingpage/Hero/Hero';
import WhyChooseUs from '../../components/Landingpage/WhyUs/WhyUsSection';
import Membership from '../../components/Landingpage/Membership/Membership';
import CourseGallery from '../../components/Landingpage/CourseGallery/CourseGallery';
import Contact from '../../components/Landingpage/ContactSection/Contact';

export default function LandingPage() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <Membership />
      <CourseGallery />
      <Contact />
    </>
  );
}
