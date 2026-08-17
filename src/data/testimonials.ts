// NOTE: Testimonials are placeholder structures.
// Replace with real client testimonials when available.

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  quote: string
  placeholder: true
}

export const testimonials: Testimonial[] = [
  {
    id: 't-01',
    name: 'Client Name',
    role: 'Founder',
    company: 'Company Name',
    quote: 'This section will display real client testimonials. InspireZest delivered exactly what our business needed — on time and beyond expectations.',
    placeholder: true,
  },
  {
    id: 't-02',
    name: 'Client Name',
    role: 'Director',
    company: 'Company Name',
    quote: 'Our digital presence transformed completely. The team understood our vision and executed with precision.',
    placeholder: true,
  },
  {
    id: 't-03',
    name: 'Client Name',
    role: 'CEO',
    company: 'Company Name',
    quote: 'Working with InspireZest was seamless. From strategy to launch, the process was transparent and the result exceptional.',
    placeholder: true,
  },
]
