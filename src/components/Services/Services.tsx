import * as React from 'react'
import { type HTMLMotionProps, MotionConfig, motion, AnimatePresence } from 'motion/react'
import { services, type Service } from '@/data/services'
import { cn } from '@/lib/utils'
import {
  Code,
  Smartphone,
  Cpu,
  Layers,
  ShoppingBag,
  TrendingUp,
  Search,
  Target,
  Palette,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import './Services.css'

const ICON_MAP: Record<string, typeof Code> = {
  code: Code,
  smartphone: Smartphone,
  cpu: Cpu,
  layers: Layers,
  'shopping-bag': ShoppingBag,
  'trending-up': TrendingUp,
  search: Search,
  target: Target,
  palette: Palette,
  sparkles: Sparkles,
}

// ─────────────────────────────────────────────────────────────────
// HOVER SLIDER CORE ANIMATION PRIMITIVES
// ─────────────────────────────────────────────────────────────────

interface TextStaggerHoverProps {
  text: string
  index: number
  accentColor?: string
}
interface HoverSliderImageProps {
  index: number
  imageUrl: string
  alt?: string
}
interface HoverSliderProps {
  children: React.ReactNode
  className?: string
}
interface HoverSliderContextValue {
  activeSlide: number
  changeSlide: (index: number) => void
  prevSlide: () => void
  nextSlide: () => void
}

function splitText(text: string) {
  const words = text.split(' ').map((word) => word.concat(' '))
  const characters = words.map((word) => word.split('')).flat(1)

  return {
    words,
    characters,
  }
}

const HoverSliderContext = React.createContext<HoverSliderContextValue | undefined>(undefined)

export function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext)
  if (context === undefined) {
    throw new Error('useHoverSliderContext must be used within a HoverSliderProvider')
  }
  return context
}

export const HoverSlider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & HoverSliderProps
>(({ children, className, ...props }, ref) => {
  const [activeSlide, setActiveSlide] = React.useState<number>(0)

  const changeSlide = React.useCallback(
    (index: number) => {
      const bounded = (index + services.length) % services.length
      setActiveSlide(bounded)
    },
    []
  )

  const prevSlide = React.useCallback(() => {
    setActiveSlide((curr) => (curr - 1 + services.length) % services.length)
  }, [])

  const nextSlide = React.useCallback(() => {
    setActiveSlide((curr) => (curr + 1) % services.length)
  }, [])

  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide, prevSlide, nextSlide }}>
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    </HoverSliderContext.Provider>
  )
})
HoverSlider.displayName = 'HoverSlider'

export const TextStaggerHover = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & TextStaggerHoverProps
>(({ text, index, accentColor, className, ...props }, ref) => {
  const { activeSlide, changeSlide } = useHoverSliderContext()
  const { characters } = splitText(text)
  const isActive = activeSlide === index
  const handleMouse = () => changeSlide(index)

  return (
    <span
      className={cn('relative inline-block origin-bottom overflow-hidden cursor-pointer select-none', className)}
      {...props}
      ref={ref}
      onMouseEnter={handleMouse}
      onClick={handleMouse}
    >
      {characters.map((char, charIndex) => (
        <span key={`${char}-${charIndex}`} className="relative inline-block overflow-hidden">
          <MotionConfig
            transition={{
              delay: charIndex * 0.014,
              duration: 0.38,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.span
              className="inline-block opacity-40 transition-opacity duration-300"
              initial={{ y: '0%' }}
              animate={isActive ? { y: '-110%', opacity: 0 } : { y: '0%', opacity: 0.45 }}
            >
              {char}
              {char === ' ' && charIndex < characters.length - 1 && <>&nbsp;</>}
            </motion.span>

            <motion.span
              className="absolute left-0 top-0 inline-block font-bold"
              style={{
                color: isActive ? accentColor || 'var(--primary)' : 'inherit',
              }}
              initial={{ y: '110%' }}
              animate={isActive ? { y: '0%' } : { y: '110%' }}
            >
              {char}
              {char === ' ' && charIndex < characters.length - 1 && <>&nbsp;</>}
            </motion.span>
          </MotionConfig>
        </span>
      ))}
    </span>
  )
})
TextStaggerHover.displayName = 'TextStaggerHover'

export const clipPathVariants = {
  visible: {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    scale: 1,
    opacity: 1,
    transition: {
      clipPath: { ease: [0.22, 1, 0.36, 1] as const, duration: 0.75 },
      scale: { ease: [0.16, 1, 0.3, 1] as const, duration: 1.1 },
      opacity: { duration: 0.4 },
    },
  },
  hidden: {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 0px)',
    scale: 1.08,
    opacity: 0,
    transition: {
      clipPath: { ease: [0.22, 1, 0.36, 1] as const, duration: 0.6 },
      scale: { duration: 0.6 },
      opacity: { duration: 0.3 },
    },
  },
}

export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full',
        className
      )}
      {...props}
    />
  )
})
HoverSliderImageWrap.displayName = 'HoverSliderImageWrap'

export const HoverSliderImage = React.forwardRef<
  HTMLImageElement,
  HTMLMotionProps<'img'> & HoverSliderImageProps
>(({ index, imageUrl, alt = '', className, ...props }, ref) => {
  const { activeSlide } = useHoverSliderContext()
  return (
    <motion.img
      src={imageUrl}
      alt={alt}
      className={cn('inline-block align-middle object-cover size-full will-change-transform', className)}
      variants={clipPathVariants}
      animate={activeSlide === index ? 'visible' : 'hidden'}
      ref={ref}
      {...props}
    />
  )
})
HoverSliderImage.displayName = 'HoverSliderImage'

// ─────────────────────────────────────────────────────────────────
// MAIN SERVICES COMPONENT
// ─────────────────────────────────────────────────────────────────

export default function Services() {
  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" className="services-hs-section" aria-label="Inspire Zest Core Services">
      <div className="services-hs-container">
        {/* Section Header */}
        <div className="services-hs-header">
          <span className="services-hs-badge font-display">OUR SERVICES & CAPABILITIES</span>
          <h2 className="services-hs-title font-display">
            ENGINEERING WITHOUT <span className="services-hs-title-gradient">COMPROMISE</span>
          </h2>
          <p className="services-hs-desc">
            Explore our comprehensive suite of bespoke digital solutions tailored for modern businesses.
            Hover over any service to preview capabilities and technical infrastructure.
          </p>
        </div>

        {/* Hover Slider Interactive Showcase */}
        <HoverSlider className="services-hs-layout">
          {/* Left Column: Interactive Service Text Navigation */}
          <ServiceList onContact={scrollToContact} />

          {/* Right Column: Dynamic Visual Reveal Bezel */}
          <ServiceVisualShowcase onContact={scrollToContact} />
        </HoverSlider>
      </div>
    </section>
  )
}

function ServiceList({ onContact }: { onContact: () => void }) {
  const { activeSlide, changeSlide } = useHoverSliderContext()

  return (
    <div className="services-hs-list" role="list">
      {services.map((svc: Service, idx: number) => {
        const Icon = ICON_MAP[svc.iconType] || Code
        const isActive = activeSlide === idx

        return (
          <div
            key={svc.id}
            className={cn('services-hs-item', isActive && 'services-hs-item--active')}
            onMouseEnter={() => changeSlide(idx)}
            onClick={() => changeSlide(idx)}
            role="listitem"
            style={{ '--svc-accent': svc.accentColor } as React.CSSProperties}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                changeSlide(idx)
              }
            }}
          >
            {/* Sliding Shared Spring Highlight Pill */}
            {isActive && (
              <motion.div
                layoutId="servicesActiveHighlight"
                className="services-hs-item-active-bg"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                aria-hidden="true"
              />
            )}

            {/* Top Row: Number, Icon, Stagger Text */}
            <div className="services-hs-item-header">
              <span className="services-hs-number font-display">{svc.number}</span>
              <motion.div
                className="services-hs-icon-wrap"
                style={{ color: svc.accentColor }}
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ duration: 0.25 }}
              >
                <Icon size={18} />
              </motion.div>
              <div className="services-hs-text-wrap">
                <TextStaggerHover
                  text={svc.title}
                  index={idx}
                  accentColor={svc.accentColor}
                  className="services-hs-stagger-text font-display"
                />
              </div>
              <motion.div
                className="services-hs-arrow"
                animate={{
                  opacity: isActive ? 1 : 0.35,
                  x: isActive ? 3 : 0,
                  y: isActive ? -3 : 0,
                  color: isActive ? svc.accentColor : 'var(--secondary)',
                }}
                transition={{ duration: 0.25 }}
                aria-hidden="true"
              >
                <ArrowUpRight size={17} />
              </motion.div>
            </div>

            {/* Expanded Active Preview Drawer on Mobile */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="services-hs-item-drawer"
                >
                  <p className="services-hs-item-desc">{svc.headline}</p>
                  <div className="services-hs-item-caps">
                    {svc.capabilities.slice(0, 3).map((cap) => (
                      <span key={cap} className="services-hs-cap-pill">
                        <CheckCircle2 size={13} style={{ color: svc.accentColor }} />
                        {cap}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

function ServiceVisualShowcase({ onContact }: { onContact: () => void }) {
  const { activeSlide, prevSlide, nextSlide } = useHoverSliderContext()
  const activeService = services[activeSlide] || services[0]
  const ActiveIcon = ICON_MAP[activeService.iconType] || Code

  const bezelRef = React.useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024 || !bezelRef.current) return
    const rect = bezelRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setTilt({
      x: -(y / rect.height) * 8,
      y: (x / rect.width) * 8,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div className="services-hs-showcase">
      {/* Ambient Color Glow Backdrop */}
      <motion.div
        className="services-hs-ambient-glow"
        animate={{
          background: `radial-gradient(circle at 60% 40%, ${activeService.accentColor}30 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.6 }}
        aria-hidden="true"
      />

      {/* Interactive 3D Bezel */}
      <motion.div
        ref={bezelRef}
        className="services-hs-bezel"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
        style={{ transformPerspective: 1200 }}
      >
        <HoverSliderImageWrap className="services-hs-img-wrap">
          {services.map((svc: Service, idx: number) => (
            <HoverSliderImage
              key={svc.id}
              index={idx}
              imageUrl={svc.image}
              alt={svc.title}
              className="services-hs-img"
            />
          ))}
        </HoverSliderImageWrap>

        {/* Ambient Dark Gradient Vignette */}
        <div className="services-hs-vignette" aria-hidden="true" />

        {/* Top Floating Controls Bar */}
        <div className="services-hs-top-bar">
          <div className="services-hs-top-pill">
            <div className="services-hs-dot-wrapper">
              <motion.span
                className="services-hs-dot-ping"
                animate={{ background: activeService.accentColor }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="services-hs-dot-core"
                animate={{ background: activeService.accentColor }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeService.id}
                initial={{ opacity: 0, y: 5, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -5, filter: 'blur(3px)' }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="services-hs-pill-text font-display"
              >
                {activeService.number} / {services.length < 10 ? `0${services.length}` : services.length} · {activeService.title.toUpperCase()}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Quick Interactive Slide Controls */}
          <div className="services-hs-nav-btns">

            <button
              onClick={prevSlide}
              className="services-hs-nav-btn"
              aria-label="Previous Service"
              data-cursor="explore"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextSlide}
              className="services-hs-nav-btn"
              aria-label="Next Service"
              data-cursor="explore"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Floating Glass Card with Animated Content Dissolve */}
        <div className="services-hs-glass-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 14, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="services-hs-card-meta">
                <motion.div
                  className="services-hs-card-icon"
                  style={{
                    background: `${activeService.accentColor}25`,
                    borderColor: `${activeService.accentColor}50`,
                    color: activeService.accentColor,
                  }}
                  animate={{ rotate: [0, -5, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <ActiveIcon size={22} />
                </motion.div>
                <div>
                  <h3 className="services-hs-card-title font-display">{activeService.title}</h3>
                  <p className="services-hs-card-headline">{activeService.headline}</p>
                </div>
              </div>

              <p className="services-hs-card-desc">{activeService.description}</p>

              {/* Capabilities Grid */}
              <div className="services-hs-caps-grid">
                {activeService.capabilities.map((cap, capIdx) => (
                  <motion.div
                    key={cap}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: capIdx * 0.035, duration: 0.28 }}
                    className="services-hs-cap-item"
                  >
                    <CheckCircle2
                      size={14}
                      style={{ color: activeService.accentColor, flexShrink: 0 }}
                    />
                    <span>{cap}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <button
            className="services-hs-cta-btn"
            onClick={onContact}
            data-cursor="go"
            aria-label={`Inquire about ${activeService.title}`}
          >
            <span>Request Technical Proposal</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
