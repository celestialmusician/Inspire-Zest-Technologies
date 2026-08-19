export interface Service {
  id: string
  number: string
  title: string
  headline: string
  description: string
  capabilities: string[]
  accentColor: string
  image: string
  iconType: string
}

export const services: Service[] = [
  {
    id: 'web-development',
    number: '01',
    title: 'Web & Spatial Engineering',
    headline: 'Uncompromising speed. 60fps cinematic fluidity.',
    description: 'We engineer ultra-responsive web applications with Next.js, WebGL, and custom GSAP pipelines. Designed for sub-second load times, fluid micro-interactions, and flawless cross-device fidelity.',
    capabilities: [
      'Next.js 15 & React 19 Architecture',
      'WebGL & Three.js 3D Environments',
      'Headless CMS & Cloud Integrations',
      'Sub-second Core Web Vitals Optimization',
      'Custom Micro-interaction Design Systems',
    ],
    accentColor: '#2997FF', // Apple Pro Blue
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop', // Cybernetic server / glowing circuitry
    iconType: 'code',
  },
  {
    id: 'mobile-app-dev',
    number: '02',
    title: 'Mobile App Engineering',
    headline: 'Native precision. Designed for every palm.',
    description: 'Native iOS & Android apps engineered with Flutter and Swift. From biometric security protocols to instant real-time synchronization, we build apps that top charts.',
    capabilities: [
      'Native iOS (Swift) & Android (Kotlin)',
      'Cross-Platform Flutter 3.x Architecture',
      'Real-Time WebSockets & Background Sync',
      'Biometric Key Management & Apple Pay',
      'App Store Optimization & Release Pipeline',
    ],
    accentColor: '#30D158', // Apple Emerald Green
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop', // Dark minimalist glass smartphone in studio
    iconType: 'smartphone',
  },
  {
    id: 'ai-software-solutions',
    number: '03',
    title: 'AI & Neural Systems',
    headline: 'Intelligence engineered into every layer.',
    description: 'Custom generative AI pipelines, automated LLM orchestration, and computer vision models that streamline complex enterprise operations and unlock predictive insights.',
    capabilities: [
      'Custom LLM Agents & Retrieval Systems',
      'Automated Enterprise Decision Engines',
      'Predictive Analytics & Neural Models',
      'Computer Vision & NLP Pipelines',
      'Private Cloud AI Infrastructure',
    ],
    accentColor: '#BF5AF2', // Apple Purple
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop', // Quantum AI processor glow
    iconType: 'cpu',
  },
  {
    id: 'erp-systems',
    number: '04',
    title: 'Enterprise ERP & Cloud',
    headline: 'Mission-critical orchestration at enterprise scale.',
    description: 'Bespoke enterprise ERP, automated supply chain routing, real-time inventory synchronization, and unified financial analytics built for zero downtime.',
    capabilities: [
      'Custom Modular ERP & CRM Architecture',
      'Multi-Branch Supply Chain Intelligence',
      'Automated Invoicing & Global Taxation',
      'Role-Based Zero-Trust Access Control',
      'High-Throughput Microservice APIs',
    ],
    accentColor: '#0A84FF', // Apple Electric Blue
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop', // Modern dark data center / cloud servers
    iconType: 'layers',
  },
  {
    id: 'e-commerce',
    number: '05',
    title: 'Global Commerce Engines',
    headline: 'Engineered for conversion. Built to scale.',
    description: 'High-volume e-commerce platforms engineered with frictionless checkout funnels, multi-currency settlement, and AI-driven personalized product discovery.',
    capabilities: [
      'Custom Headless Commerce Architecture',
      'Multi-Vendor Marketplace Infrastructure',
      'Instant Global Payment Integrations',
      'Automated Fulfillment & Inventory Sync',
      'Sub-0.5s Product Filtering & Search',
    ],
    accentColor: '#FF9F0A', // Apple Amber
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop', // High-end luxury product minimal studio
    iconType: 'shopping-bag',
  },
  {
    id: 'branding-digital-marketing',
    number: '06',
    title: 'Brand & Growth Strategy',
    headline: 'Defining categories. Dominating markets.',
    description: 'Hyper-targeted performance marketing, programmatic SEO, and distinctive digital brand systems that capture market share and maximize customer lifetime value.',
    capabilities: [
      'Strategic Design Systems & Identity',
      'High-Impact Performance Marketing',
      'Technical & Programmatic SEO',
      'Cinematic Motion Graphics & Video',
      'Data-Driven Conversion Optimization',
    ],
    accentColor: '#FF375F', // Apple Rose Pink
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop', // Refined abstract iridescent spatial wave
    iconType: 'trending-up',
  },
]
