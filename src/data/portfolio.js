// Static portfolio data — shown as fallback when Supabase has no records

export const portfolioCategories = ['All', 'Villa', 'Residential', 'Commercial', 'Layout'];

export const portfolio = [
  {
    id: 'pf-1',
    title: 'Arcadia Villa — Whitefield',
    category: 'Villa',
    description:
      'A signature 5-BHK smart villa with private pool, home theatre, and lush 1-acre landscaped grounds. Completed and fully occupied.',
    image: '/hero_villa.png',
    status: 'Completed',
    year: '2023',
  },
  {
    id: 'pf-2',
    title: 'The Residences — Koramangala',
    category: 'Residential',
    description:
      '42 premium 3 & 4 BHK apartments with sky lounge, infinity pool, and gym. Delivered on schedule with IGBC Green certification.',
    image: '/project_apartments.png',
    status: 'Completed',
    year: '2023',
  },
  {
    id: 'pf-3',
    title: 'Winstone Greens Phase 1 — Sarjapur',
    category: 'Layout',
    description:
      '240 BMRDA-approved plots across 48 acres. Phase 1 fully sold out. Gated community with underground utilities and wide roads.',
    image: '/project_farms.png',
    status: 'Completed',
    year: '2022',
  },
  {
    id: 'pf-4',
    title: 'Winston Square — Indiranagar',
    category: 'Commercial',
    description:
      'Grade-A 6-floor commercial complex, LEED-certified. Home to 15 corporates, with flexible floor plates and basement parking.',
    image: '/project_villa_interior.png',
    status: 'Completed',
    year: '2022',
  },
  {
    id: 'pf-5',
    title: 'Heritage Palms — Chamundi Hills',
    category: 'Villa',
    description:
      'Collection of 12 heritage-inspired villas with private gardens and club access, overlooking the Chamundi Hills landscape.',
    image: '/winstone-projects-B0mWZxEY.jpg',
    status: 'Ongoing',
    year: '2024',
  },
  {
    id: 'pf-6',
    title: 'Aero Valley Phase 1 — Devanahalli',
    category: 'Layout',
    description:
      'Premium plotted development near Kempegowda International Airport. 180 plots, BMRDA approved. Rapid appreciation corridor.',
    image: '/winstone-foundation-CnK31L2s.jpg',
    status: 'Ongoing',
    year: '2024',
  },
];

export const getFeaturedPortfolio = (n = 4) => portfolio.slice(0, n);
