import Header from "./components/Header/Header.tsx";
import WhyChooseUs from "./components/WhyUs/WhyUsSection.tsx";
import CourseGallery from "./components/CourseGallery/CourseGallery.tsx";
import Hero from "./components/Hero/Hero.tsx";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <WhyChooseUs />
      <CourseGallery />
    </>
  );
}

export default App;
