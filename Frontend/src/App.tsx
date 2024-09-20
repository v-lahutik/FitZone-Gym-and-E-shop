import Header from "./components/Header/Header.tsx";
import Hero from "./components/Hero/Hero.tsx";
import WhyChooseUs from "./components/WhyUs/WhyUsSection.tsx";
import CourseGallery from "./components/CourseGallery/CourseGallery.tsx";
import Contact from "./components/ContactSection/Contact.tsx";
import Footer from "./components/Footer/Footer.tsx";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <WhyChooseUs />
      <CourseGallery />
      <Contact/>
      <Footer/>

    </>
  );
}

export default App;
