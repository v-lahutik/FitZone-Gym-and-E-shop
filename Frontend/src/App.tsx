import Header from "./components/Header/Header.tsx";
import WhyChooseUs from "./components/WhyUs/WhyUsSection.tsx";
import CourseGallery from "./components/CourseGallery/CourseGallery.tsx";
import Hero from "./components/Hero/Hero.tsx";
import Membership from "./components/Membership/Membership.tsx";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <WhyChooseUs />
      <Membership />
      <CourseGallery />
    </>
  );
}

export default App;
