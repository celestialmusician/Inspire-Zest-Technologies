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
      'We design and engineer enterprise-grade web applications, interactive 3D digital experiences, mobile applications, scalable cloud backends, custom ERP/CRM software, and AI-driven automation workflows built for fast-growth companies.',
  },
  {
    id: 'timeline',
    category: 'TIMELINE & DELIVERY',
    question: 'How long does a typical project take from concept to launch?',
    answer:
      'High-impact corporate websites and MVPs typically launch within 2 to 4 weeks. Complex digital platforms, custom mobile apps, and enterprise systems generally range between 6 to 12 weeks with weekly milestone deliverables and staging deployments.',
  },
  {
    id: 'tech-stack',
    category: 'TECH STACK & ARCHITECTURE',
    question: 'What technologies and frameworks do you build with?',
    answer:
      'We architect with modern, proven technologies including React, Next.js, TypeScript, Node.js, Python, Three.js/WebGL for interactive 3D, Tailwind CSS, PostgreSQL, and cloud-native infrastructure deployed on AWS and Google Cloud.',
  },
  {
    id: 'process',
    category: 'PROCESS & COLLABORATION',
    question: 'How do you ensure transparency during development?',
    answer:
      'You get direct access to dedicated project leads, live staging environments, weekly sprint demo recordings, and real-time collaboration channels via Slack and Notion with zero communication lag.',
  },
  {
    id: 'maintenance',
    category: 'SUPPORT & SCALING',
    question: 'Do you offer ongoing support, maintenance, and cloud optimization after launch?',
    answer:
      'Yes. We provide comprehensive SLA-backed maintenance packages covering 24/7 uptime monitoring, security audits, database backups, performance tuning, and ongoing feature expansion.',
  },
  {
    id: 'pricing',
    category: 'GETTING STARTED',
    question: 'How do we get started and receive a project proposal?',
    answer:
      'Reach out via our contact form or book an exploratory call. We analyze your requirements and deliver a detailed technical roadmap, scope breakdown, and transparent timeline estimate within 48 hours.',
  },
]
