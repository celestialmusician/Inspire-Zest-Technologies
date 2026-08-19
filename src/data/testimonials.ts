export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  project: string
  quote: string
  avatar: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: 't-01',
    name: 'Aswin',
    role: 'Business Owner',
    company: 'Winskart Global',
    project: 'E-Commerce Platform',
    quote: 'InspireZest has been instrumental in propelling our business to new heights. Their AI integrations and digital solutions have not only optimized our processes but have also enhanced our customer experience. We\'re incredibly impressed with their expertise!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop&facepad=2',
    rating: 5,
  },
  {
    id: 't-02',
    name: 'Anshad',
    role: 'Director',
    company: 'Atrium Design Studio',
    project: 'Web Development',
    quote: 'Choosing InspireZest was a game-changer for our business. Their seamless integration of AI technologies and web development expertise catapulted our online presence to new heights, resulting in increased engagement and revenue.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop&facepad=2',
    rating: 5,
  },
  {
    id: 't-03',
    name: 'Priya',
    role: 'Managing Director',
    company: 'Homely Spices',
    project: 'D2C E-Commerce',
    quote: 'InspireZest\'s team demonstrated unparalleled expertise and professionalism throughout our project. Their ability to understand our unique needs and deliver tailored solutions made them an invaluable partner in our journey towards digital success. Hats off!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop&facepad=2',
    rating: 5,
  },
  {
    id: 't-04',
    name: 'David',
    role: 'Chief Operating Officer',
    company: 'Frankstreet Tech',
    project: 'Enterprise Portal',
    quote: 'InspireZest truly understands the pulse of modern business. Their innovative AI integrations and seamless digital solutions have not only streamlined our operations but also enhanced our competitive edge. We\'re grateful for their expertise and partnership.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop&facepad=2',
    rating: 5,
  },
  {
    id: 't-05',
    name: 'Ganesh',
    role: 'General Manager',
    company: 'Nila Palace Luxury Hotels',
    project: 'Hotel Booking Engine',
    quote: 'InspireZest exceeded all our expectations! Their team\'s dedication, creativity, and technical prowess brought our vision to life, delivering results that truly set us apart in the market. We\'re thrilled to have found a partner as committed to our success as we are.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop&facepad=2',
    rating: 5,
  },
]
