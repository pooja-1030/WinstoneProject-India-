export const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Rajesh Nair',
    location: 'Bangalore',
    message:
      'Winstone Projects delivered beyond our expectations. The Arcadia villa we purchased in Whitefield is an absolute masterpiece — the attention to detail, Vastu compliance, and the smart home features are truly world-class. Best decision we ever made.',
    rating: 5,
    date: '2024',
  },
  {
    id: 'testimonial-2',
    name: 'Priya Venkatesh',
    location: 'Hyderabad',
    message:
      "Exceptional professionalism from start to finish. The team's deep knowledge of Bangalore's real estate market and their transparent approach made our investment in Koramangala seamless. Highly recommend to anyone seeking premium properties.",
    rating: 5,
    date: '2024',
  },
  {
    id: 'testimonial-3',
    name: 'Anand Krishnaswamy',
    location: 'Chennai',
    message:
      'The Sarjapur township exceeded all our expectations. The green spaces, clubhouse, and overall community feel make it a perfect home for our family. Nayaz and his team truly understand modern Indian living.',
    rating: 5,
    date: '2023',
  },
  {
    id: 'testimonial-4',
    name: 'Meera Subramaniam',
    location: 'Bangalore',
    message:
      'RERA compliance and legal clarity were our top priorities — Winstone Projects excelled on both fronts. The handover of our Indiranagar commercial unit was smooth and on schedule. A partner you can truly trust.',
    rating: 5,
    date: '2023',
  },
  {
    id: 'testimonial-5',
    name: 'Vikram Rao',
    location: 'Mumbai',
    message:
      'We purchased a plot in Devanahalli as an investment. The location near the airport and the BMRDA approval gave us confidence. In just two years the value has appreciated significantly. Winstone Projects truly delivers on its promises.',
    rating: 5,
    date: '2024',
  },
];

export const getRandomTestimonials = (count = 3) => {
  const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getAllTestimonials = () => testimonials;
