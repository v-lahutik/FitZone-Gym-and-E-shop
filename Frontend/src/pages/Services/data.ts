export interface Service {
  id: number;
  name: string;
  description: string;
  slug?: string;
  servicePic?: string;
}

export const servicesData: Service[] = [
  {
    id: 1,
    name: 'Training programs',
    description:
      '<p>Our training programs are designed to cater to all fitness levels, from beginners to advanced athletes. We focus on building strength, endurance, and flexibility through a variety of workouts that include cardio, strength training, and functional exercises. Each program is tailored to individual goals and preferences to ensure maximum progress within your abilities and schedule.</p><p>In addition, each training program is led by a professional trainer who assists you in performing exercises correctly, avoiding injuries, and achieving your desired results. Our approach is personalized, meaning you’ll have the support of a trainer throughout your journey, with progress tracking and program adjustments as needed.</p>',
    slug: 'training-programs',
    servicePic: '/src/assets/images/Services/service1.webp'
  },
  {
    id: 2,
    name: 'Courses',
    description:
      '<p>Our courses cover a wide range of activities that help you enhance both your physical and mental health. Whether you’re interested in yoga, pilates, aerobics, or other group exercises, we offer various courses suited for all ages and skill levels. The courses are designed to motivate you, help you reach your fitness goals, and make the process enjoyable.</p><p>Our course instructors are highly trained and experienced, providing the guidance and support you need for safe and effective workouts. Each session is structured to be inspiring, challenging, and tailored to help you grow in your fitness journey.</p>',
    slug: 'courses',
    servicePic: '/src/assets/images/Services/service2.jpg'
  },
  {
    id: 3,
    name: 'Personal Trainers',
    description:
      '<p>Our certified personal trainers are here to help you reach your fitness goals with customized training plans that align with your individual needs. Whether you want to build muscle, lose weight, or improve endurance, our trainers will guide you every step of the way, offering expert advice and motivation.</p><p>With a focus on personalized attention, our trainers work closely with you to track progress and make necessary adjustments to your program. Their professional guidance ensures that you perform each exercise with proper form, maximizing results and minimizing the risk of injury.</p>',
    slug: 'personal-trainers',
    servicePic: '/src/assets/images/Services/service3.webp'
  },
  {
    id: 4,
    name: 'Sauna',
    description:
      '<p>Relax and recharge in our state-of-the-art sauna, a perfect way to unwind after a workout or a long day. Our sauna facilities are designed to offer a calming atmosphere, helping to relieve stress, improve circulation, and promote overall wellness.</p><p>In addition to its relaxation benefits, regular sauna sessions can support muscle recovery, improve skin health, and detoxify the body. Our facilities are clean, comfortable, and designed with your health and well-being in mind, making it an ideal addition to your wellness routine.</p>',
    slug: 'sauna',
    servicePic: '/src/assets/images/Services/service4.png'
  }
];
