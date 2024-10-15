import { NavLink } from 'react-router-dom';
import '../components/Landingpage/Hero/Hero.css';

const Page404: React.FC = () => {
  return (
    <>
      <section
        id="hero-section"
        className="hero bg-center flex items-center h-screen"
        style={{
          backgroundImage: "url('/src/assets/images/Hero/background_hero.png')"
        }}
      >
        <div className="container max-w-[1280px] px-4 mx-auto">
          <div className="flex flex-col justify-center items-start text-white 2xl:mx-auto xl:mx-20 lg:m-40 md:mx-32 sm:mx-24 mx-20">
            <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-kanit mb-4 font-bold uppercase">
              404 <br />
              Page not found
            </h1>
            <div className="flex justify-start w-full">
              <NavLink to="/">
                <button className="bg-primary hover:bg-primary-dark rounded-md text-white font-bold uppercase py-4 px-8 md:py-5 md:px-9 lg:py-5 lg:px-10 xl:py-6 xl:px-10 2xl:py-6 2xl:px-12">
                  Back to Home
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page404;
