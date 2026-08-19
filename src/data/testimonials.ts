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
    name: 'Aswin Kumar',
    role: 'Founder & CEO',
    company: 'Winskart Global',
    project: 'E-Commerce Platform',
    quote: 'Inspire Zest transformed our entire e-commerce infrastructure. The platform handled our peak festival traffic with zero downtime, and our conversion rate jumped by 240%. Exceptional engineering and design vision.',
    avatar: 'https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/avatar-images/avatar-01.jpg',
    rating: 5,
  },
  {
    id: 't-02',
    name: 'Anshad Rahman',
    role: 'Principal Architect & Director',
    company: 'Atrium Design Studio',
    project: 'Interactive 3D Web Experience',
    quote: 'The level of creative sophistication and GSAP motion design Inspire Zest delivered is unmatched. Our architectural portfolio now stands out internationally and generated high-ticket inquiries within weeks.',
    avatar: 'https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/avatar-images/avatar-02.jpg',
    rating: 5,
  },
  {
    id: 't-03',
    name: 'Priya Nair',
    role: 'Managing Director',
    company: 'Homely Spices',
    project: 'D2C Foodtech Ecosystem',
    quote: 'From custom subscription workflows to automated farm-to-table tracking, Inspire Zest delivered exactly on time. Their team understands modern digital marketing and robust software development inside out.',
    avatar: 'https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/avatar-images/avatar-03.jpg',
    rating: 5,
  },
  {
    id: 't-04',
    name: 'David Wilson',
    role: 'Chief Operating Officer',
    company: 'Frankstreet Tech',
    project: 'Enterprise Surveillance Portal',
    quote: 'Managing 10,000+ IoT and CCTV hardware endpoints became effortless with the custom cloud portal developed by Inspire Zest. They are our go-to technology partner across the Middle East & India.',
    avatar: 'https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/avatar-images/avatar-04.jpg',
    rating: 5,
  },
  {
    id: 't-05',
    name: 'Ganesh Pillai',
    role: 'General Manager',
    company: 'Nila Palace Luxury Hotels',
    project: 'Hotel Booking Engine & POS',
    quote: 'We cut our reliance on third-party OTA commissions significantly. The direct booking engine is fast, intuitive for guests, and integrates seamlessly with our front-desk ERP.',
    avatar: 'https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/avatar-images/avatar-05.jpg',
    rating: 5,
  },
]
