export interface Project {
  id: string
  title: string
  client: string
  category: string
  description: string
  impact: string
  technologies: string[]
  gradient: string
  accentColor: string
  year: string
  url: string
}

export const projects: Project[] = [
  {
    id: 'winskart',
    title: 'Winskart Global',
    client: 'Winskart E-Commerce',
    category: 'E-Commerce & Digital Platform',
    description: 'High-performance multi-vendor marketplace engine engineered with ultra-fast catalog search, real-time order routing, and localized payment gateway orchestration.',
    impact: '+240% Order Volume · 0.4s Page Load',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS Cloud'],
    gradient: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(11, 15, 25, 0.95) 100%)',
    accentColor: '#00F0FF',
    year: '2024',
    url: 'https://winskart.com',
  },
  {
    id: 'atrium',
    title: 'Atrium Design Studio',
    client: 'Atrium Architects',
    category: 'Brand & Architectural Experience',
    description: 'Immersive digital portfolio showcasing luxury residential & commercial spaces with cinematic transitions, WebGL spatial rendering, and interactive floorplans.',
    impact: 'Featured on Awwwards Nominee · +180% Inquiries',
    technologies: ['Next.js', 'Three.js', 'GSAP', 'Tailwind CSS', 'WebGL'],
    gradient: 'linear-gradient(135deg, rgba(176, 38, 255, 0.15) 0%, rgba(11, 15, 25, 0.95) 100%)',
    accentColor: '#B026FF',
    year: '2024',
    url: 'https://atriumdesign.in',
  },
  {
    id: 'homely-spices',
    title: 'Homely Spices',
    client: 'Homely Spices D2C',
    category: 'Direct-to-Consumer Foodtech',
    description: 'Export-grade spice brand digital commerce ecosystem with automated subscription billing, farm-to-table traceability, and dynamic flavor pairing quiz.',
    impact: '3.8x Conversion Rate · 50k+ Monthly Shoppers',
    technologies: ['React', 'Django REST', 'PostgreSQL', 'Stripe', 'Docker'],
    gradient: 'linear-gradient(135deg, rgba(0, 245, 160, 0.15) 0%, rgba(11, 15, 25, 0.95) 100%)',
    accentColor: '#00F5A0',
    year: '2024',
    url: 'https://homelyspices.com',
  },
  {
    id: 'vimala-hridaya',
    title: 'Vimala Hridaya',
    client: 'Vimala Hridaya Institution',
    category: 'EdTech & Campus Management',
    description: 'Comprehensive campus management ecosystem featuring intelligent attendance automation, LMS portal, fee disbursement gateway, and parent communication channels.',
    impact: '15,000+ Active Daily Users · 99.9% Uptime',
    technologies: ['Flutter', 'Python', 'FastAPI', 'MySQL', 'Firebase'],
    gradient: 'linear-gradient(135deg, rgba(0, 153, 255, 0.15) 0%, rgba(11, 15, 25, 0.95) 100%)',
    accentColor: '#0099FF',
    year: '2023',
    url: 'https://vimalahridaya.edu',
  },
  {
    id: 'nila-palace',
    title: 'Nila Palace',
    client: 'Nila Palace Luxury Hotels',
    category: 'Hospitality & Luxury Booking Engine',
    description: 'Bespoke direct booking engine for a 4-star luxury hotel with dynamic tariff algorithms, banquet reservation systems, and automated guest concierge notifications.',
    impact: '-35% OTA Commission Loss · +62% Direct Bookings',
    technologies: ['React', 'Node.js', 'MongoDB', 'Razorpay', 'PWA'],
    gradient: 'linear-gradient(135deg, rgba(255, 184, 0, 0.15) 0%, rgba(11, 15, 25, 0.95) 100%)',
    accentColor: '#FFB800',
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
    gradient: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(176, 38, 255, 0.1) 100%)',
    accentColor: '#00F0FF',
    year: '2023',
    url: 'https://frankstreet.com',
  },
]
