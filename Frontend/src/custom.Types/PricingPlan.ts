export interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  duration: string;
  features: string[];
}
export const allFeatures: string[] = [
  '20 Trainings',
  'Free shower & lockers',
  'Reliable & Experienced Team',
  'Free parking',
  '5 Days Per Week',
  'Nutrition Program'
];

export const PricingPlan: PricingPlan[] = [
  {
    name: 'Basic Plan',
    monthlyPrice: 150,
    yearlyPrice: 1500,
    currency: 'USD',
    duration: 'Month',
    features: [
      '20 Trainings',
      'Free shower & lockers',
      'Reliable & Experienced Team',
      'Free parking'
    ]
  },
  {
    name: 'Standard Plan',
    monthlyPrice: 200,
    yearlyPrice: 2000,
    currency: 'USD',
    duration: 'Month',
    features: [
      '20 Trainings',
      'Free shower & lockers',
      'Reliable & Experienced Team',
      'Free parking',
      '5 Days Per Week'
    ]
  },
  {
    name: 'Premium Plan',
    monthlyPrice: 250,
    yearlyPrice: 2500,
    currency: 'USD',
    duration: 'Month',
    features: [
      '20 Trainings',
      'Free shower & lockers',
      'Reliable & Experienced Team',
      'Free parking',
      '5 Days Per Week',
      'Nutrition Program'
    ]
  }
];
