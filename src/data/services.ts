export interface Service {
  id: string
  category: string
  categoryLabel: string
  number: string
  title: string
  description: string
  capabilities: string[]
  visual: string // identifier for the visual component to render
}

export const services: Service[] = [
  {
    id: 'digital-products',
    category: 'digital-products',
    categoryLabel: '01',
    number: '01',
    title: 'Digital Products',
    description: 'We craft digital products that work — from fast, modern websites to complex web applications and native mobile experiences.',
    capabilities: [
      'Website Development',
      'Web Applications',
      'Mobile Applications',
      'E-Commerce Development',
      'UI/UX Design',
    ],
    visual: 'product',
  },
  {
    id: 'business-technology',
    category: 'business-technology',
    categoryLabel: '02',
    number: '02',
    title: 'Business Technology',
    description: 'Enterprise-grade technology solutions that streamline operations, automate workflows, and drive business efficiency.',
    capabilities: [
      'Custom Software Development',
      'ERP Solutions',
      'Billing Software',
      'Business Automation',
      'IT Consulting',
    ],
    visual: 'business',
  },
  {
    id: 'digital-growth',
    category: 'digital-growth',
    categoryLabel: '03',
    number: '03',
    title: 'Digital Growth',
    description: 'Data-driven marketing strategies to increase visibility, attract qualified leads, and grow your business online.',
    capabilities: [
      'SEO',
      'Google Ads',
      'Social Media Marketing',
      'Content Strategy',
      'Performance Marketing',
    ],
    visual: 'growth',
  },
  {
    id: 'brand-creative',
    category: 'brand-creative',
    categoryLabel: '04',
    number: '04',
    title: 'Brand & Creative',
    description: 'Strategic brand identity and creative output that communicates clearly and positions your business with distinction.',
    capabilities: [
      'Branding',
      'Logo Design',
      'Graphic Design',
      'Video Advertising',
      'Digital Marketing',
    ],
    visual: 'brand',
  },
]
