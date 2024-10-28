import { useEffect, useState, useRef } from 'react';
import './PricingTable.css';
import { PricingPlan } from '../../../custom.Types/PricingPlan';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function PricingTable() {
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const subtitleElement = subtitleRef.current;

    if (!subtitleElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            subtitleElement.classList.add('fly-in');
            observer.disconnect(); // Stop observing once the animation is triggered
          }
        });
      },
      { threshold: 0.1 } // Trigger when 20% of the element is visible
    );

    observer.observe(subtitleElement);

    return () => {
      if (subtitleElement) {
        observer.unobserve(subtitleElement);
      }
    };
  }, []);

  const plans: PricingPlan[] = PricingPlan;
  // const features: string[] = allFeatures;

  const [yearlyPrice, setYearlyPrice] = useState<boolean>(false);

  const handlePricingSwitch = (planType: 'monthly' | 'yearly') => {
    setYearlyPrice(planType === 'yearly');
  };

  return (
    <div className="mb-5 container h-auto pt-20 max-w-[1280px] mx-auto">
      <div className=" px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center md:justify-start auto-cols-auto">
          <div className="">
            <div className="title-area md:text-start text-center">
              <span
                ref={subtitleRef}
                className="md:justify-start  text-primary text-xl text-semibold uppercase font-kanit subtitle after-lg-none mb-4"
              >
                Pricing Plan
              </span>
              <h2 className="justify-center md:justify-start text-4xl mb-10 font-kanit font-semibold">
                Find Your Perfect Plan
              </h2>
            </div>
          </div>
          <div className="md:text-end sm:mr-1 text-center">
            <div className="pricing-tabs justify-center md:justify-end">
              <button
                className={`tab-button ${!yearlyPrice ? 'active' : ''} `}
                onClick={() => handlePricingSwitch('monthly')}
              >
                Monthly
              </button>
              <button
                className={`tab-button ${yearlyPrice ? 'active' : ''}`}
                onClick={() => handlePricingSwitch('yearly')}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3  mt-5 md:mt-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="rounded-sm p-4 border  border-thBorderColor transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)] hover:border-white"
            >
              <div className="bg-smokeColor3 p-5">
                <h3 className="text-3xl mb-5 font-semibold text-titleColor font-kanit">
                  {plan.name}
                </h3>
                <h4 className=" text-6xl  font-semibold text-primary font-kanit">
                  <span className="text-2xl top-[-23px] relative mr-2">$</span>
                  {yearlyPrice ? plan.yearlyPrice : plan.monthlyPrice}
                  <span className="duration">
                    {' '}
                    / {yearlyPrice ? 'yearly' : 'monthly'}
                  </span>
                </h4>
                <ul className="my-5">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="text-bodyColor flex gap-3 items-center leading-9"
                    >
                      <FaRegCircleCheck
                        className={
                          feature.includes('No')
                            ? 'text-bodyColor'
                            : 'text-primary'
                        }
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/contact">
                <button className="w-full bg-titleColor hover:bg-primary text-white py-3 transition-all duration-300">
                  Contact Us
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
