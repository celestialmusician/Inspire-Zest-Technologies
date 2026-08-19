export interface Service {
  id: string
  number: string
  title: string
  headline: string
  description: string
  capabilities: string[]
  accentColor: string
  glowColor: string
  iconType: string
}

export const services: Service[] = [
  {
    id: 'web-development',
    number: '01',
    title: 'Web Development',
    headline: 'High-Performance, Award-Winning Web Applications',
    description: 'We engineer lightning-fast, visually breathtaking web applications built with modern architectures, 60fps animations, and enterprise-grade scalability.',
    capabilities: [
      'Custom React & Next.js Platforms',
      'Headless CMS Architectures',
      'Interactive 3D & WebGL Experiences',
      'Full-Stack Cloud Infrastructures',
      'Core Web Vitals & Speed Optimization',
    ],
    accentColor: '#00F0FF',
    glowColor: 'rgba(0, 240, 255, 0.25)',
    iconType: 'code',
  },
  {
    id: 'mobile-app-dev',
    number: '02',
    title: 'Mobile App Dev',
    headline: 'Native & Cross-Platform iOS / Android Apps',
    description: 'Seamless, intuitive mobile experiences engineered with Flutter & React Native. From biometric security to offline-first sync and instant notifications.',
    capabilities: [
      'Cross-Platform Flutter & React Native',
      'Native iOS (Swift) & Android (Kotlin)',
      'App Store Optimization (ASO)',
      'Real-Time WebSockets & Push Alerts',
      'Secure Mobile Payment Integrations',
    ],
    accentColor: '#00F5A0',
    glowColor: 'rgba(0, 245, 160, 0.25)',
    iconType: 'smartphone',
  },
  {
    id: 'ai-software-solutions',
    number: '03',
    title: 'AI & Software Solutions',
    headline: 'Next-Gen Intelligent Automation & Custom Logic',
    description: 'Leverage generative AI, custom neural network pipelines, predictive data modeling, and bespoke algorithms tailored specifically for high-efficiency enterprise workflows.',
    capabilities: [
      'Generative AI & LLM Integrations',
      'Intelligent Workflow Automation',
      'Predictive Analytics & Data Science',
      'Computer Vision & NLP Engines',
      'Custom Microservice APIs',
    ],
    accentColor: '#B026FF',
    glowColor: 'rgba(176, 38, 255, 0.25)',
    iconType: 'cpu',
  },
  {
    id: 'erp-systems',
    number: '04',
    title: 'ERP & Business Systems',
    headline: 'End-to-End Enterprise Resource Orchestration',
    description: 'Bespoke ERP, billing, inventory, HRMS, and CRM systems that eliminate departmental silos, cut overhead, and provide executive real-time visibility.',
    capabilities: [
      'Custom ERP & CRM Architecture',
      'Multi-Branch Inventory Management',
      'Automated Billing & Invoicing',
      'HRMS & Biometric Payroll Sync',
      'Role-Based Granular Access Control',
    ],
    accentColor: '#0099FF',
    glowColor: 'rgba(0, 153, 255, 0.25)',
    iconType: 'layers',
  },
  {
    id: 'e-commerce',
    number: '05',
    title: 'E-Commerce Platforms',
    headline: 'Scalable Commerce Engines Engineered to Convert',
    description: 'High-conversion multi-currency online stores and multi-vendor marketplaces built with bespoke checkout funnels, automated fulfillment, and AI recommendations.',
    capabilities: [
      'Custom Headless E-Commerce',
      'Multi-Vendor Marketplace Systems',
      'Global Payment Gateways (Stripe, Razorpay, Tabby)',
      'Automated Warehouse & Logistics Sync',
      'Conversion Rate Optimization (CRO)',
    ],
    accentColor: '#FFB800',
    glowColor: 'rgba(255, 184, 0, 0.25)',
    iconType: 'shopping-bag',
  },
  {
    id: 'branding-digital-marketing',
    number: '06',
    title: 'Branding & Digital Marketing',
    headline: 'Data-Driven Growth & Category-Defining Brands',
    description: 'Hyper-targeted performance marketing, Google Ads, technical SEO, and distinct brand identities that establish authority and scale customer acquisition.',
    capabilities: [
      'Strategic Brand Identity & Design Systems',
      'Technical & Programmatic SEO',
      'High-ROI Paid Advertising (Meta & Google)',
      'Social Media Dominance & Content Creation',
      'Conversion Funnel & Retention Strategy',
    ],
    accentColor: '#FF0055',
    glowColor: 'rgba(255, 0, 85, 0.25)',
    iconType: 'trending-up',
  },
]
