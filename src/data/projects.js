export const projects = [
  {
    id: 'whitefield-villa-1',
    title: 'Winstone Arcadia Villas',
    category: 'Luxury Villas',
    location: 'Whitefield, Bangalore',
    description:
      'Architecturally stunning independent villas nestled in the heart of Whitefield. Featuring contemporary Indian design elements, private pools, and landscaped gardens crafted for premium family living.',
    image: '/hero_villa.png',
    price: '₹ 4.2 Cr onwards',
    features: ['4 & 5 BHK', 'Private Pool', 'Smart Home', 'Vastu-Compliant'],
    status: 'Available',
    bedrooms: 5,
    bathrooms: 6,
    area: '5,200 sq ft',
  },
  {
    id: 'koramangala-residence-1',
    title: 'The Residences at Koramangala',
    category: 'Residential Projects',
    location: 'Koramangala, Bangalore',
    description:
      'Premium high-rise residences in the vibrant Koramangala neighbourhood. Thoughtfully designed apartments with panoramic city views, curated amenities, and walkable access to Bangalore\'s best.',
    image: '/project_apartments.png',
    price: '₹ 1.8 Cr onwards',
    features: ['3 & 4 BHK', 'Sky Lounge', 'Gym & Spa', 'Concierge'],
    status: 'Available',
    bedrooms: 4,
    bathrooms: 4,
    area: '2,800 sq ft',
  },
  {
    id: 'sarjapur-township',
    title: 'Winstone Greens Township',
    category: 'Township Development',
    location: 'Sarjapur Road, Bangalore',
    description:
      'An integrated township spanning 120 acres along the Sarjapur corridor. Villas, plots, clubhouse, and commercial spaces woven into a self-sustaining green community.',
    image: '/project_farms.png',
    price: '₹ 2.6 Cr onwards',
    features: ['120 Acres', 'Clubhouse', 'Schools Nearby', 'RERA Approved'],
    status: 'Ongoing',
    bedrooms: 4,
    bathrooms: 5,
    area: '3,600 sq ft',
  },
  {
    id: 'indiranagar-commercial',
    title: 'Winston Square – Commercial Hub',
    category: 'Commercial Spaces',
    location: 'Indiranagar, Bangalore',
    description:
      'Grade-A commercial spaces in one of Bangalore\'s most coveted commercial corridors. Designed for modern enterprises with flexible floor plates, LEED-certified construction, and premium amenities.',
    image: '/project_villa_interior.png',
    price: '₹ 95 Lakh per unit',
    features: ['LEED Certified', 'Flexible Floor Plates', 'Basement Parking', 'Rooftop Terrace'],
    status: 'Available',
    bedrooms: 0,
    bathrooms: 2,
    area: '800 – 5,000 sq ft',
  },
  {
    id: 'mysore-villa-estate',
    title: 'Heritage Palms – Mysore',
    category: 'Luxury Villas',
    location: 'Chamundi Hills, Mysore',
    description:
      'A collection of 24 exclusive villas inspired by Mysore\'s royal architectural heritage. Spacious layouts, private terraces, and curated landscape set against the Chamundi Hills backdrop.',
    image: '/winstone-projects-B0mWZxEY.jpg',
    price: '₹ 3.5 Cr onwards',
    features: ['Heritage Design', 'Private Garden', 'Club Access', 'Gated Community'],
    status: 'Coming Soon',
    bedrooms: 5,
    bathrooms: 6,
    area: '4,800 sq ft',
  },
  {
    id: 'land-north-bangalore',
    title: 'Aero Valley – Plotted Development',
    category: 'Land Development',
    location: 'Devanahalli, North Bangalore',
    description:
      'Premium residential plots near Kempegowda International Airport. Strategically located in Bangalore\'s fastest-growing corridor with clear titles and BMRDA-approved layouts.',
    image: '/winstone-foundation-CnK31L2s.jpg',
    price: '₹ 55 Lakh per plot',
    features: ['BMRDA Approved', 'Clear Title', 'Airport Proximity', '30×40 to 60×80'],
    status: 'Available',
    bedrooms: 0,
    bathrooms: 0,
    area: '1,200 – 4,800 sq ft',
  },
];

export const getProjectsByCategory = (category) => {
  if (category === 'All') return projects;
  return projects.filter((p) => p.category === category);
};

export const getFeaturedProjects = () => projects.slice(0, 6);

export const getProjectById = (id) => projects.find((p) => p.id === id);

export const projectCategories = [
  'All',
  'Luxury Villas',
  'Residential Projects',
  'Township Development',
  'Commercial Spaces',
  'Land Development',
];
