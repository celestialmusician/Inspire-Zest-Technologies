import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollProgress.css'

gsap.registerPlugin(ScrollTrigger)

const SCENES = [
  { id: 'hero',        label: '01' },
  { id: 'intro',       label: '02' },
  { id: 'services',    label: '03' },
  { id: 'technology',  label: '04' },
  { id: 'projects',    label: '05' },
  { id: 'about',       label: '06' },
  { id: 'process',     label: '07' },
  { id: 'growth',      label: '08' },
  { id: 'why-us',      label: '09' },
  { id: 'final-cta',   label: '10' },
]

export default function ScrollProgress() {
  const barRef    = useRef<HTMLDivElement>(null)
  const labelRef  = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Overall scroll bar
      gsap.to(barRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0,
          onUpdate: (self) => {
            if (barRef.current) {
              barRef.current.style.transform = `scaleY(${self.progress})`
            }
          }
        }
      })

      // Scene detection
      SCENES.forEach((scene) => {
        const el = document.getElementById(scene.id)
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            if (labelRef.current) labelRef.current.textContent = scene.label
          },
          onEnterBack: () => {
            if (labelRef.current) labelRef.current.textContent = scene.label
          },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="sp-root" aria-hidden="true">
      <div className="sp-track">
        <div ref={barRef} className="sp-bar" />
      </div>
      <span ref={labelRef} className="sp-label">01</span>
    </div>
  )
}
