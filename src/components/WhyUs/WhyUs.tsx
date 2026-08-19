import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsap } from '@/hooks/useGsap'
import { Shield, Lightbulb, Heart, MessageCircle, CheckCircle, Clock } from 'lucide-react'
import './WhyUs.css'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  {
    num: '01',
    title: 'Expertise',
    desc: 'Our team comprises skilled professionals with expertise in diverse technologies, ensuring we deliver top-notch solutions across various domains.',
    icon: Shield,
    color: '#00F5D4',
  },
  {
    num: '02',
    title: 'Innovation',
    desc: 'We embrace innovation, staying abreast of the latest trends and technologies to provide forward-thinking solutions that give your business a competitive edge.',
    icon: Lightbulb,
    color: '#BF5AF2',
  },
  {
    num: '03',
    title: 'Customer-Centric',
    desc: 'Customer satisfaction is at the core of our values. We work closely with clients, understanding their unique requirements to deliver tailored solutions that meet and exceed expectations.',
    icon: Heart,
    color: '#2997FF',
  },
  {
    num: '04',
    title: 'Transparent Communication',
    desc: 'Open and transparent communication is the foundation of successful collaborations. We keep our clients informed at every stage of the development process.',
    icon: MessageCircle,
    color: '#FF9F0A',
  },
  {
    num: '05',
    title: 'Quality Assurance',
    desc: 'Our commitment to quality is unwavering. Rigorous testing and quality assurance processes are embedded in our development lifecycle to ensure reliable, bug-free solutions.',
    icon: CheckCircle,
    color: '#30D158',
  },
  {
    num: '06',
    title: 'Timely Delivery',
    desc: 'We understand the importance of deadlines. Our agile development methodology allows us to deliver projects on time without compromising on quality.',
    icon: Clock,
    color: '#FF375F',
  },
]

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useGsap(
    () => {
      gsap.fromTo(
        '.why-heading-line',
        { yPercent: 120, rotateX: -35, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.why-heading',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.why-card',
        { opacity: 0, y: 40, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.why-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.why-body-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.why-body-card',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    },
    [],
    sectionRef
  )

  return (
    <section ref={sectionRef} id="why-us" className="why scene" aria-label="Why InspireZest">
      <div className="why-container">
        <div className="why-heading" aria-label="Why Choose InspireZest Technologies?">
          <div className="why-wrap">
            <span className="why-heading-line font-display">WHY CHOOSE</span>
          </div>
          <div className="why-wrap why-wrap--dim">
            <span className="why-heading-line font-display">INSPIREZEST</span>
          </div>
          <div className="why-wrap why-wrap--dim">
            <span className="why-heading-line font-display">TECHNOLOGIES?</span>
          </div>
        </div>

        {/* 6 Pillars Glass Card Grid */}
        <div className="why-grid why-grid--six" role="list" aria-label="Why choose us">
          {PILLARS.map((p) => {
            const Icon = p.icon
            return (
              <div key={p.title} className="why-card" role="listitem">
                <div className="why-card-top">
                  <div
                    className="why-card-icon-wrap"
                    style={{ background: `${p.color}15`, borderColor: `${p.color}35` }}
                  >
                    <Icon size={22} style={{ color: p.color }} />
                  </div>
                  <span className="why-card-num font-display">{p.num}</span>
                </div>
                <h3 className="why-card-title font-display">{p.title}</h3>
                <p className="why-card-desc">{p.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Summary Statement Card */}
        <div className="why-body-card">
          <p className="why-body font-display">
            Welcome to <strong>InspireZest Technologies Pvt. Ltd.</strong>, your gateway to
            innovative and cutting-edge software solutions. As a premier software development company
            based in Kollam, we take pride in offering a comprehensive suite of services tailored to
            meet the evolving needs of businesses in the digital era. Experience the difference with
            InspireZest and elevate your business to new heights.
          </p>
        </div>
      </div>
    </section>
  )
}
