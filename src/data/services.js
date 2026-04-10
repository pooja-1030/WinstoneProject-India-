// Services Offered

export const services = [
  {
    id: 'service-1',
    title: 'Real Estate Development (UAE)',
    description: 'Comprehensive property development services across Dubai and Abu Dhabi. From concept to completion, we deliver luxury residential and commercial projects that set new standards in the UAE real estate market.',
    icon: 'Building2',
    features: [
      'Luxury residential developments',
      'Commercial property projects',
      'Mixed-use developments',
      'Project management excellence'
    ]
  },
  {
    id: 'service-2',
    title: 'Property Investment Consultation',
    description: 'Expert guidance for international and local investors seeking high-ROI opportunities in Dubai\'s luxury real estate market. Strategic insights backed by deep market knowledge and proven track record.',
    icon: 'TrendingUp',
    features: [
      'Market analysis and insights',
      'Investment portfolio strategy',
      'ROI optimization',
      'Risk assessment and mitigation'
    ]
  },
  {
    id: 'service-3',
    title: 'Luxury Property Sales',
    description: 'Exclusive access to Dubai\'s most prestigious properties. Our curated portfolio features premium villas, waterfront residences, and high-rise apartments in the UAE\'s most sought-after locations.',
    icon: 'Home',
    features: [
      'Premium property portfolio',
      'Personalized property matching',
      'Negotiation expertise',
      'End-to-end transaction support'
    ]
  },
  {
    id: 'service-4',
    title: 'Construction & Project Management',
    description: 'World-class construction services with meticulous attention to detail. We ensure every project meets the highest standards of quality, delivered on time and within budget.',
    icon: 'HardHat',
    features: [
      'Quality construction management',
      'Timeline and budget control',
      'Premium materials and finishes',
      'Regulatory compliance'
    ]
  }
];

// Get service by ID
export const getServiceById = (id) => {
  return services.find(service => service.id === id);
};

// Get all services
export const getAllServices = () => {
  return services;
};
