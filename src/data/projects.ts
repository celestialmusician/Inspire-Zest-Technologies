// NOTE: All projects below are placeholder data for demonstration purposes.
// Replace with real InspireZest project data when available.

export interface Project {
  id: string
  title: string
  category: string
  description: string
  technologies: string[]
  image: string       // path or URL — replace with actual project image
  year: string
  url: string
  placeholder: true   // always true — remove when using real data
}

export const projects: Project[] = [
  {
    id: 'project-01',
    title: 'E-Commerce Platform',
    category: 'Digital Product',
    description: 'A full-featured e-commerce solution with custom inventory management, payment gateway integration, and mobile-first design.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    image: '/placeholder-project-01.jpg',
    year: '2024',
    url: '#',
    placeholder: true,
  },
  {
    id: 'project-02',
    title: 'ERP System',
    category: 'Business Technology',
    description: 'End-to-end enterprise resource planning system streamlining procurement, HR, and financial operations for a manufacturing firm.',
    technologies: ['Python', 'Django', 'React', 'MySQL'],
    image: '/placeholder-project-02.jpg',
    year: '2024',
    url: '#',
    placeholder: true,
  },
  {
    id: 'project-03',
    title: 'Mobile Banking App',
    category: 'Mobile Application',
    description: 'A secure, intuitive mobile banking application with real-time transaction tracking and biometric authentication.',
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'REST API'],
    image: '/placeholder-project-03.jpg',
    year: '2023',
    url: '#',
    placeholder: true,
  },
  {
    id: 'project-04',
    title: 'Brand Identity System',
    category: 'Brand & Creative',
    description: 'Complete brand identity development for a technology startup — from strategy and naming through to logo, typography, and digital assets.',
    technologies: ['Figma', 'Illustrator', 'Motion Design'],
    image: '/placeholder-project-04.jpg',
    year: '2023',
    url: '#',
    placeholder: true,
  },
]
