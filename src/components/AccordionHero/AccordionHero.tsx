import { useState } from 'react'
import { ArrowDown, Mail, Phone, ArrowUpRight, X, Plus } from 'lucide-react'
import './AccordionHero.css'

interface PanelData {
  id: string
  number: string
  railTitle: string
  subtitle: string
  title: string
  description: string
  meta: string[]
  ctaText: string
  bgImage: string
  drawer: {
    category: string
    title: string
    intro: string
    body: string
    details: { label: string; value: string }[]
    image: string
    gallery: string[]
  }
}

const PANELS: PanelData[] = [
  {
    id: 'digital-products',
    number: '01',
    railTitle: 'Digital Products',
    subtitle: 'Web, Mobile & UI/UX',
    title: 'Crafting Modern Digital Products',
    description: 'We design and build fast, responsive websites, complex web applications, and native mobile experiences engineered for precision performance and scale.',
    meta: ['100+ Projects Built', '7+ Years Experience', 'Elementor & React UI/UX'],
    ctaText: 'Explore Products',
    bgImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=80',
    drawer: {
      category: 'DIGITAL PRODUCTS SHOWCASE',
      title: 'Web & Mobile Engineering',
      intro: 'InspireZest delivers end-to-end digital product design and custom development. We combine high-converting UI/UX architectures with ultra-clean code.',
      body: 'From single-page web applications to complex enterprise mobile apps, every digital product is built with responsive fluid typography, GSAP motion, and 60fps WebGL visual graphics. Our work focuses on measurable business outcomes and speed.',
      details: [
        { label: 'Services', value: 'Web Apps, Mobile Apps, UI/UX Design' },
        { label: 'Location', value: 'Kollam, Kerala, India' },
        { label: 'Technologies', value: 'React, TypeScript, Tailwind, Three.js, Node' },
        { label: 'Status', value: 'Available for New Projects' },
      ],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
      ],
    },
  },
  {
    id: 'enterprise-software',
    number: '02',
    railTitle: 'Enterprise Technology',
    subtitle: 'ERP, Billing & Automation',
    title: 'Business Technology & Systems',
    description: 'Custom software solutions, automated workflows, ERP systems, and billing software designed to streamline operations and maximize profitability.',
    meta: ['Custom Software', 'Business Automation', 'ERP & Billing Systems'],
    ctaText: 'View Systems',
    bgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80',
    drawer: {
      category: 'BUSINESS TECHNOLOGY SYSTEMS',
      title: 'Enterprise Software & ERP Solutions',
      intro: 'Streamline your core business operations with tailored ERP software, point-of-sale billing systems, and automated operational workflows.',
      body: 'We engineer custom business software solutions that replace legacy manual processes. Our software platforms integrate inventory tracking, financial billing, CRM, and cloud analytics into a single unified control hub.',
      details: [
        { label: 'Solutions', value: 'ERP, Billing Software, Workflow Automation' },
        { label: 'Security', value: 'Enterprise Grade Encryption & Backups' },
        { label: 'Deployment', value: 'Cloud & On-Premises Architecture' },
        { label: 'Support', value: '24/7 Dedicated Technical Support' },
      ],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
      ],
    },
  },
  {
    id: 'digital-growth',
    number: '03',
    railTitle: 'Growth & Branding',
    subtitle: 'SEO, Ads & Creative',
    title: 'Brand Identity & Performance',
    description: 'Data-driven marketing, search engine optimization, Google Ads, and brand identity systems built to position your company with distinction.',
    meta: ['SEO & Google Ads', 'Brand Identity Systems', 'Performance Marketing'],
    ctaText: 'Start a Project',
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
    drawer: {
      category: 'DIGITAL GROWTH & BRANDING',
      title: 'Performance Marketing & Brand Systems',
      intro: 'Attract qualified leads, increase search visibility, and establish an authoritative brand presence with InspireZest growth strategies.',
      body: 'Our growth campaigns combine targeted Google Ads, search engine optimization (SEO), social media marketing, and strategic graphic design to deliver consistent ROI and elevate market positioning.',
      details: [
        { label: 'Services', value: 'SEO, Google Ads, Branding, Video Ads' },
        { label: 'Focus', value: 'Lead Generation & Brand Equity' },
        { label: 'Location', value: 'Global Client Reach' },
        { label: 'Consulting', value: '1-on-1 Strategic Growth Audits' },
      ],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1542744094-3a3172720177?w=800&q=80',
        'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      ],
    },
  },
]

export default function AccordionHero() {
  const [activePanel, setActivePanel] = useState<number | null>(null)
  const [openDrawer, setOpenDrawer]   = useState<number | null>(null)

  const handlePanelClick = (index: number) => {
    if (activePanel === index) {
      setActivePanel(null)
    } else {
      setActivePanel(index)
    }
  }

  const handleOpenDrawer = (e: React.MouseEvent, index: number) => {
    e.stopPropagation()
    setOpenDrawer(index)
  }

  const handleCloseDrawer = () => {
    setOpenDrawer(null)
  }

  const scrollToContact = (e: React.MouseEvent) => {
    e.stopPropagation()
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section
        id="hero"
        className={`hax-hero ${activePanel !== null ? 'hax-hero--open' : ''}`}
        aria-label="InspireZest Horizontal Accordion Hero"
      >
        {/* Floating Gen Z Headline Overlay across the 3 blocks */}
        <div className={`hax-center-caption ${activePanel !== null ? 'hax-center-caption--hidden' : ''}`}>
          <div className="hax-caption-tag">
            <span className="hax-caption-spark">✦</span>
            <span>INSPIREZEST DIGITAL STUDIO</span>
            <span className="hax-caption-badge">NEXT-GEN</span>
          </div>
          <h1 className="hax-caption-title">
            BUILD <span className="hax-caption-outline">BOLD.</span>
            <br />
            GROW <span className="hax-caption-gradient">FAST.</span>
          </h1>
          <p className="hax-caption-sub">
            TAP ANY PANEL TO UNLOCK SOLUTIONS ↴
          </p>
        </div>

        {/* 3 Accordion Panels */}
        {PANELS.map((panel, idx) => {
          const isActive = activePanel === idx

          return (
            <div
              key={panel.id}
              className={`hax-panel ${isActive ? 'hax-panel--active' : ''}`}
              style={{ backgroundImage: `url(${panel.bgImage})` }}
              onClick={() => handlePanelClick(idx)}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
            >
              {/* Panel Number on bottom-left */}
              <span className="hax-panel__num">{panel.number}</span>

              {/* Rail indicator on right side */}
              <div className="hax-panel__rail">
                <div className="hax-panel__line" />
                <div className="hax-panel__label-wrap">
                  <span className="hax-panel__title">{panel.railTitle}</span>
                </div>
                <div className="hax-panel__plus">
                  <Plus size={18} />
                </div>
              </div>

              {/* Expanded Content */}
              <div className="hax-panel__content">
                <span className="hax-panel__csub">{panel.subtitle}</span>
                <h2 className="hax-panel__ctitle">{panel.title}</h2>
                <p className="hax-panel__text">{panel.description}</p>

                <div className="hax-panel__meta">
                  {panel.meta.map((m) => (
                    <span key={m} className="hax-panel__meta-item">
                      <span className="hax-panel__meta-dot" />
                      {m}
                    </span>
                  ))}
                </div>

                <button
                  className="hax-panel__cta"
                  onClick={(e) => handleOpenDrawer(e, idx)}
                >
                  {panel.ctaText}
                  <ArrowDown size={16} />
                </button>
              </div>

              {/* Close Button */}
              <button
                className="hax-panel__close"
                onClick={(e) => {
                  e.stopPropagation()
                  setActivePanel(null)
                }}
                title="Close panel"
              >
                <X size={18} />
              </button>
            </div>
          )
        })}
      </section>

      {/* Slide-Up Detail Drawer Modal */}
      {openDrawer !== null && (
        <div className={`hax-project-drawer ${openDrawer !== null ? 'hax-project-drawer--open' : ''}`}>
          <button className="hax-drawer-close" onClick={handleCloseDrawer}>
            <span>Close</span>
            <X size={16} />
          </button>

          <div className="hax-drawer-container">
            <div className="mb-8">
              <span className="text-xs font-semibold text-cyan-400 tracking-widest uppercase">
                {PANELS[openDrawer].drawer.category}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold font-display text-white mt-2">
                {PANELS[openDrawer].drawer.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mt-4 leading-relaxed">
                {PANELS[openDrawer].drawer.intro}
              </p>
            </div>

            <div className="my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={PANELS[openDrawer].drawer.image}
                alt={PANELS[openDrawer].drawer.title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 my-12">
              <div className="lg:col-span-2 text-gray-300 leading-relaxed text-base md:text-lg">
                <p>{PANELS[openDrawer].drawer.body}</p>
                <div className="mt-8 flex gap-4">
                  <button
                    onClick={scrollToContact}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-500 text-black font-semibold flex items-center gap-2 hover:opacity-90 transition"
                  >
                    Start A Project
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>

              <div className="p-6 bg-white/[0.03] rounded-xl border border-white/10 h-fit">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                  System Metadata
                </h3>
                <div className="space-y-4">
                  {PANELS[openDrawer].drawer.details.map((d) => (
                    <div key={d.label}>
                      <span className="block text-xs text-gray-400 uppercase tracking-widest">{d.label}</span>
                      <span className="block text-sm text-white font-medium mt-0.5">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="mt-16">
              <h3 className="text-xl font-bold font-display text-white mb-6">Visual Showcase</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PANELS[openDrawer].drawer.gallery.map((gUrl, gIdx) => (
                  <div key={gIdx} className="rounded-xl overflow-hidden border border-white/10">
                    <img src={gUrl} alt={`Showcase ${gIdx + 1}`} className="w-full h-48 object-cover hover:scale-105 transition duration-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
