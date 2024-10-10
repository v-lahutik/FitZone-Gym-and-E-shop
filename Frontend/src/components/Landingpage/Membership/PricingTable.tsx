import { useEffect, useState } from 'react';
import './PricingTable.css';
import { allFeatures, PricingPlan } from '../../../custom.Types/PricingPlan';
import { FaRegCircleCheck } from 'react-icons/fa6';
import Swal from 'sweetalert2';

export default function PricingTable() {
  const plans: PricingPlan[] = PricingPlan;
  const features: string[] = allFeatures;

  const [yearlyPrice, setYearlyPrice] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState({} as PricingPlan);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (Object.keys(selectedPlan).length > 0) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedPlan]);

  const handlePricingSwitch = (planType: 'monthly' | 'yearly') => {
    setYearlyPrice(planType === 'yearly');
  };

  const getPrice = (plan: PricingPlan) =>
    yearlyPrice ? plan.yearlyPrice : plan.monthlyPrice;

  const handleBuyNow = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    Swal.fire({
      title: 'Select!',
      text: `You selected the ${plan.name}`,
      icon: 'info'
    })
  };

  return (
    <div className="mb-5 container h-auto pt-20 max-w-[1280px] mx-auto">
      <div className=" px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center md:justify-start auto-cols-auto">
          <div className="">
            <div className="title-area md:text-start text-center">
              <span className="md:justify-start  text-primary text-xl text-semibold uppercase font-kanit subtitle after-lg-none mb-4">
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
        <div className="grid  md:grid-cols-3 gap-3  mt-5 md:mt-16">
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
                  {features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="text-bodyColor flex gap-3 items-center leading-9"
                    >
                      {plan.features.includes(feature) ? (
                        <FaRegCircleCheck className="text-primary" />
                      ) : (
                        <FaRegCircleCheck className="text-bodyColor" />
                      )}
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleBuyNow(plan)}
                type="button"
                className="w-full bg-titleColor hover:bg-primary text-white py-3 transition-all duration-300"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
        {isSelected === false ? null : (
          <div style={{ marginTop: '20px' }}>
            <h2>You have selected the {selectedPlan.name} plan.</h2>
            <p>
              Price: {getPrice(selectedPlan)} USD /{' '}
              {yearlyPrice ? 'Year' : 'Month'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
