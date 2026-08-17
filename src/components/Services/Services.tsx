import { useRef, useState } from 'react'
import { useMotionValue, motion, useSpring, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { services, type Service } from '@/data/services'
import './Services.css'

const SERVICE_IMAGES: Record<string, string> = {
  'digital-products': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  'business-technology': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  'digital-growth': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  'brand-creative': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
}

export default function Services() {
  const [activeId, setActiveId] = useState<string>(services[0].id)
  const activeService = services.find((s) => s.id === activeId) || services[0]

  return (
    <section id="services" className="srv scene" aria-label="Our services">
      <div className="srv-container">
        {/* Header */}
        <div className="srv-header">
          <span className="svc-tag" aria-hidden="true">04 — WHAT WE DO</span>
          <h2 className="srv-heading font-display">SERVICES</h2>
        </div>

        {/* Interactive Hover Links List */}
        <div className="srv-hover-links-wrap" role="list" aria-label="Interactive services list">
          {services.map((svc) => (
            <ServiceHoverLink
              key={svc.id}
              service={svc}
              isActive={svc.id === activeId}
              onSelect={() => setActiveId(svc.id)}
            />
          ))}
        </div>

        {/* Active Service Detail capabilities bar */}
        <div className="srv-capabilities-bar" aria-live="polite">
          <div className="srv-cap-desc">
            <span className="srv-cap-num">{activeService.number}</span>
            <p>{activeService.description}</p>
          </div>
          <div className="srv-cap-tags">
            {activeService.capabilities.map((cap) => (
              <span key={cap} className="srv-cap-pill">
                <span className="srv-cap-dot" aria-hidden="true" />
                {cap}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceHoverLink({
  service,
  isActive,
  onSelect,
}: {
  service: Service
  isActive: boolean
  onSelect: () => void
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 18 })
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 18 })

  const top = useTransform(mouseYSpring, [0.5, -0.5], ['35%', '65%'])
  const left = useTransform(mouseXSpring, [0.5, -0.5], ['65%', '35%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const imgSrc = SERVICE_IMAGES[service.id] || SERVICE_IMAGES['digital-products']

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={onSelect}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      initial="initial"
      whileHover="whileHover"
      className={`srv-hover-item group relative flex items-center justify-between border-b border-white/10 py-6 md:py-8 transition-colors duration-500 ${
        isActive ? 'srv-hover-item--active' : ''
      }`}
      data-cursor="explore"
    >
      <div className="z-10">
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -12 },
          }}
          transition={{
            type: 'spring',
            staggerChildren: 0.04,
            delayChildren: 0.15,
          }}
          className="relative z-10 block text-3xl font-semibold font-display text-white/70 transition-colors duration-500 group-hover:text-white md:text-5xl lg:text-6xl"
        >
          {service.title.split('').map((char, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 12 },
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="inline-block"
              key={i}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-xs md:text-sm tracking-wider text-gray-400 transition-colors duration-500 group-hover:text-cyan-400">
          {service.capabilities.slice(0, 3).join(' · ')}
        </span>
      </div>

      {/* Floating image attached to mouse */}
      <motion.img
        style={{
          top,
          left,
          translateX: '-10%',
          translateY: '-50%',
        }}
        variants={{
          initial: { scale: 0, rotate: '-12.5deg', opacity: 0 },
          whileHover: { scale: 1, rotate: '12.5deg', opacity: 1 },
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        src={imgSrc}
        className="pointer-events-none absolute z-20 h-28 w-44 rounded-xl object-cover shadow-2xl border border-white/20 md:h-44 md:w-72"
        alt={`Visual preview of ${service.title}`}
      />

      <div className="overflow-hidden">
        <motion.div
          variants={{
            initial: {
              x: '100%',
              opacity: 0,
            },
            whileHover: {
              x: '0%',
              opacity: 1,
            },
          }}
          transition={{ type: 'spring', stiffness: 250, damping: 22 }}
          className="relative z-10 p-4"
        >
          <ArrowRight className="size-8 text-cyan-400 md:size-10" />
        </motion.div>
      </div>
    </motion.div>
  )
}
