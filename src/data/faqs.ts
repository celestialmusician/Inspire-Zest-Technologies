export interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

export const FAQS: FAQItem[] = [
  {
    id: 'services',
    category: 'SERVICES & CAPABILITIES',
    question: 'What digital solutions and services does InspireZest provide?',
    answer:
      'InspireZest Technologies offers a comprehensive suite of services including Web Development, Mobile App Development, Software Development, ERP Development, E-Commerce Development, Digital Marketing, Branding, SEO, Google Ads, Logo Designing, and AI Integrations — all tailored to meet the evolving needs of businesses in the digital era.',
  },
  {
    id: 'location',
    category: 'ABOUT US',
    question: 'Where is InspireZest Technologies located?',
    answer:
      'We operate from two offices: our India office at 2nd Floor, Velayudha Mansion, SN College Junction, Kollam, Kerala, India – 691001, and our UAE office at M26, Mussafah, Abu Dhabi, United Arab Emirates. You can reach us at +91 9037374266 or info@inspirezesttechnologies.com.',
  },
  {
    id: 'timeline',
    category: 'TIMELINE & DELIVERY',
    question: 'How long does a typical project take from concept to launch?',
    answer:
      'High-impact corporate websites and MVPs typically launch within 2 to 4 weeks. Complex digital platforms, custom mobile apps, and enterprise ERP systems generally range between 6 to 12 weeks. We use agile methodology with weekly milestones to ensure on-time delivery without compromising quality.',
  },
  {
    id: 'tech-stack',
    category: 'TECH STACK & ARCHITECTURE',
    question: 'What technologies and frameworks do you build with?',
    answer:
      'Our web development team is proficient in front-end technologies like HTML, CSS, and JavaScript, and robust back-end solutions using Django and Flask. For mobile, we develop native iOS, Android, and cross-platform Flutter apps. We also leverage modern AI/ML frameworks for our AI integration services.',
  },
  {
    id: 'process',
    category: 'PROCESS & COLLABORATION',
    question: 'How do you ensure transparency during development?',
    answer:
      'Open and transparent communication is the foundation of our collaborations. We keep our clients informed at every stage of the development process through dedicated project leads, live staging environments, and regular updates, ensuring a smooth and collaborative experience.',
  },
  {
    id: 'pricing',
    category: 'GETTING STARTED',
    question: 'How do we get started with InspireZest Technologies?',
    answer:
      'Simply reach out via our contact form, email us at info@inspirezesttechnologies.com, or call us at +91 9037374266. Our team will review your requirements and deliver a detailed technical roadmap, scope breakdown, and transparent timeline estimate within 48 hours.',
  },
]
