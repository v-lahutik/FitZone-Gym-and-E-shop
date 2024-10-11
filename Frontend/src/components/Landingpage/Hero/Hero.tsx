import './Hero.css';
import HeroImage from '/src/assets/images/Hero/background_hero.png';

const Hero: React.FC = () => {
  return (
    <>
      <section
        id="hero-section"
        className="hero bg-cover bg-center flex items-center lg:items-end"
        style={{
          backgroundImage: `url${HeroImage}`,
        }}
      >
        <div className="container mx-auto max-w-[1280px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-end">
            <div className="flex flex-col justify-center items-start text-white">
              <h3 className="text-primary text-xl text-semibold uppercase font-kanit subtitle mb-7">
                welcome to fit zone gym
              </h3>
              <h1 className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-kanit mb-4 font-bold uppercase">
                Ready to train
                <br /> your body
              </h1>

              <p className="text-lg md:text-xl mb-6">
                Gym workouts are structured exercise sessions conducted in a{' '}
                fitness facility equipped with various training machines, free
                weights, and amenities.
              </p>
              <button className="bg-primary hover:bg-primary-dark text-white font-bold uppercase py-6 px-12 ">
                view class schedule
              </button>
            </div>
            <div className="hidden lg:flex justify-center items-center self-end">
              <img
                src="/src/assets/images/Hero/hero_1_1.jpg"
                alt="Hero Image"
                className="w-full h-auto "
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
