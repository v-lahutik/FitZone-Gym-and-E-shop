export interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  duration: string;
  features: string[];
}
// export const allFeatures: string[] = [
//   '20 Trainings',
//   'Free shower & lockers',
//   'Reliable & Experienced Team',
//   'Free parking',
//   '5 Days Per Week',
//   'Nutrition Program'
// ];

// export const PricingPlan: PricingPlan[] = [
//   {
//     name: 'Basic Plan',
//     monthlyPrice: 150,
//     yearlyPrice: 1500,
//     currency: 'USD',
//     duration: 'Month',
//     features: [
//       '20 Trainings',
//       'Free shower & lockers',
//       'Reliable & Experienced Team',
//       'Free parking'
//     ]
//   },
//   {
//     name: 'Standard Plan',
//     monthlyPrice: 200,
//     yearlyPrice: 2000,
//     currency: 'USD',
//     duration: 'Month',
//     features: [
//       '20 Trainings',
//       'Free shower & lockers',
//       'Reliable & Experienced Team',
//       'Free parking',
//       '5 Days Per Week'
//     ]
//   },
//   {
//     name: 'Premium Plan',
//     monthlyPrice: 250,
//     yearlyPrice: 2500,
//     currency: 'USD',
//     duration: 'Month',
//     features: [
//       '20 Trainings',
//       'Free shower & lockers',
//       'Reliable & Experienced Team',
//       'Free parking',
//       '5 Days Per Week',
//       'Nutrition Program'
//     ]
//   }
// ];

export const PricingPlan: PricingPlan[] = [
  {
    name: 'Basic Plan',
    monthlyPrice: 150,
    yearlyPrice: 1500,
    currency: 'USD',
    duration: 'Month',
    features: [
      '10 Trainings per month',
      'Free shower & lockers',
      'Free parking',
      'Access to basic group classes',
      'Basic mobile app access',
      'No personal training',
      'No guest passes included',
      'No nutrition program'
    ]
  },
  {
    name: 'Standard Plan',
    monthlyPrice: 200,
    yearlyPrice: 2000,
    currency: 'USD',
    duration: 'Month',
    features: [
      '15 Trainings per month',
      'Free shower & lockers',
      'Free parking',
      'Access to all group classes',
      'Full mobile app access',
      '1 personal training session',
      '1 guest pass per month',
      'No nutrition program',
    ]
  },
  {
    name: 'Premium Plan',
    monthlyPrice: 250,
    yearlyPrice: 2500,
    currency: 'USD',
    duration: 'Month',
    features: [
      'Unlimited Trainings',
      'Premium locker & shower',
      'Free towel and laundry service',
      'Unlimited access to all group',
      'Premium mobile app access',
      '3 personal training sessions',
      '2 guest passes per month',
      'Personalized nutrition program'
    ]
  }
];
