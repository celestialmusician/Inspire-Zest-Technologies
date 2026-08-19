export interface Project {
  id: string
  title: string
  client: string
  category: string
  description: string
  impact: string
  technologies: string[]
  accentColor: string
  image: string
  year: string
  url: string
}

export const projects: Project[] = [
  {
    id: 'winskart',
    title: 'Winskart Global',
    client: 'Winskart E-Commerce',
    category: 'Next-Gen Multi-Vendor Commerce',
    description: 'High-throughput e-commerce infrastructure engineered with instant catalog search, automated inventory routing, and sub-second payment settlement across global markets.',
    impact: '+240% Order Volume · 0.4s Page Load',
    technologies: ['React 19', 'Node.js', 'PostgreSQL', 'Redis', 'AWS Cloud'],
    accentColor: '#2997FF',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200&auto=format&fit=crop', // Modern digital payment / commerce checkout
    year: '2024',
    url: 'https://winskart.com',
  },
  {
    id: 'atrium',
    title: 'Atrium Design Studio',
    client: 'Atrium Architects',
    category: 'Spatial Web & Architecture',
    description: 'Cinematic 3D architectural portfolio featuring WebGL spatial room explorations, physics-driven lighting transitions, and interactive blueprint inspectors.',
    impact: 'Awwwards Nominee · +180% High-Ticket Inquiries',
    technologies: ['Next.js 15', 'Three.js', 'GSAP', 'Tailwind CSS', 'WebGL'],
    accentColor: '#BF5AF2',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop', // Minimalist architectural spatial structure
    year: '2024',
    url: 'https://atriumdesign.in',
  },
  {
    id: 'homely-spices',
    title: 'Homely Spices',
    client: 'Homely Spices D2C',
    category: 'Direct-to-Consumer Foodtech',
    description: 'Global export-grade foodtech ecosystem with custom recurring subscription logic, farm-level QR traceability, and high-conversion personalized flavor funnels.',
    impact: '3.8x Conversion Rate · 50k+ Monthly Shoppers',
    technologies: ['React', 'Django REST', 'PostgreSQL', 'Stripe', 'Docker'],
    accentColor: '#30D158',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop', // Culinary spices studio
    year: '2024',
    url: 'https://homelyspices.com',
  },
  {
    id: 'vimala-hridaya',
    title: 'Vimala Hridaya',
    client: 'Vimala Hridaya Institution',
    category: 'EdTech & Campus Cloud',
    description: 'Unified educational ecosystem with intelligent biometric attendance, integrated LMS portal, automated tuition disbursement, and real-time parent mobile notifications.',
    impact: '15,000+ Active Users · 99.9% Uptime',
    technologies: ['Flutter 3.x', 'Python', 'FastAPI', 'MySQL', 'Firebase'],
    accentColor: '#0A84FF',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop', // Macbook dark code development
    year: '2023',
    url: 'https://vimalahridaya.edu',
  },
  {
    id: 'nila-palace',
    title: 'Nila Palace',
    client: 'Nila Palace Luxury Hotels',
    category: 'Hospitality & Direct Booking Engine',
    description: 'Bespoke direct booking engine for a 4-star luxury hotel with dynamic tariff algorithms, banquet reservation systems, and automated guest concierge notifications.',
    impact: '-35% OTA Commission Loss · +62% Direct Bookings',
    technologies: ['React', 'Node.js', 'MongoDB', 'Razorpay', 'PWA'],
    accentColor: '#FF9F0A',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop', // Luxury hotel dark night ambience
    year: '2023',
    url: 'https://nilapalace.com',
  },
  {
    id: 'frankstreet',
    title: 'Frankstreet Tech',
    client: 'Frankstreet Surveillance Systems',
    category: 'Enterprise IoT & Security Portal',
    description: 'Unified hardware management portal and partner distribution platform for enterprise CCTV, biometric devices, and AI security cameras across the Middle East & India.',
    impact: 'B2B Partner Ecosystem · 10k+ Deployed Devices',
    technologies: ['React', 'Go', 'PostgreSQL', 'WebSockets', 'AWS IoT'],
    accentColor: '#64D2FF',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop', // Cybernetic motherboard circuit hardware
    year: '2023',
    url: 'https://frankstreet.com',
  },
]
