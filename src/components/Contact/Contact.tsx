import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsap } from '@/hooks/useGsap'
import { api, type ContactPayload } from '@/api/client'
import { MapPin, Clock, Mail, Phone, CheckCircle2, Sparkles, Send } from 'lucide-react'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

const SERVICE_OPTIONS = [
  'Web Development',
  'Mobile App Development',
  'AI Integrations',
  'ERP Development',
  'E-Commerce Development',
  'Digital Marketing',
  'Branding & Logo Design',
  'SEO & Google Ads',
  'Software Development',
  'Other / Custom Project',
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

const EMPTY: FormData = { name: '', email: '', phone: '', company: '', service: '', message: '' }

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [form, setForm] = useState<FormData>(EMPTY)
  const [state, setState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Partial<FormData>>({})

  useGsap(
    () => {
      gsap.fromTo(
        '.contact-col',
        { opacity: 0, y: 40, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.18,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.contact-field',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    },
    [],
    sectionRef
  )

  const set = (k: keyof FormData, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const validate = (): boolean => {
    const e: Partial<FormData> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid business email'
    if (!form.service) e.service = 'Please select a service'
    if (!form.message.trim()) e.message = 'Please tell us about your project requirements'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setState('loading')
    try {
      const payload: ContactPayload = {
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        company: form.company || undefined,
        service: form.service,
        message: form.message,
      }
      await api.contact(payload)
      setState('success')
      setForm(EMPTY)
    } catch {
      setState('error')
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="contact-award-section"
      aria-label="Contact Inspire Zest Technologies"
    >
      <div className="contact-container">
        {/* Left Column: Global Offices & Contact Info */}
        <div className="contact-col contact-col--left">
          <h2 className="contact-heading font-display">
            START A <br />
            <span className="contact-title-gradient">PROJECT</span>
          </h2>

          <p className="contact-intro">
            Have a project in mind or need an enterprise audit? Let’s schedule a call with our
            principal architects.
          </p>

          {/* Global Offices Highlight */}
          <div className="contact-offices-card">
            <span className="contact-card-subhead">GLOBAL OFFICES</span>

            <div className="office-item">
              <div className="office-dot" aria-hidden="true" />
              <div>
                <strong className="office-title">India Office</strong>
                <p className="office-addr">2nd Floor, Velayudha Mansion,<br />SN College Junction, Kollam,<br />Kerala, India – 691001</p>
              </div>
            </div>

            <div className="office-item">
              <div className="office-dot office-dot--uae" aria-hidden="true" />
              <div>
                <strong className="office-title">UAE Office</strong>
                <p className="office-addr">M26, Mussafah,<br />Abu Dhabi, United Arab Emirates</p>
              </div>
            </div>
          </div>

          {/* Direct channels */}
          <div className="contact-channels">
            <div className="channel-item">
              <Clock size={16} className="text-cyan-400" aria-hidden="true" />
              <span>Response time: Under 24 hours</span>
            </div>
            <div className="channel-item">
              <Phone size={16} className="text-cyan-400" aria-hidden="true" />
              <a href="tel:+919037374266">+91 9037374266</a>
            </div>
            <div className="channel-item">
              <Mail size={16} className="text-cyan-400" aria-hidden="true" />
              <a href="mailto:info@inspirezesttechnologies.com">info@inspirezesttechnologies.com</a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Proposal Form */}
        <div className="contact-col contact-col--right">
          {state === 'success' ? (
            <div className="contact-success-box" role="alert">
              <CheckCircle2 size={48} className="text-emerald-400 mb-3" aria-hidden="true" />
              <h3 className="contact-success-title font-display">Project Inquiry Received</h3>
              <p className="contact-success-desc">
                Thank you for reaching out. Our engineering and strategy team will review your
                requirements and reply within 24 hours.
              </p>
              <button
                className="contact-reset-btn"
                onClick={() => setState('idle')}
                data-cursor="explore"
              >
                Send another message →
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={submit} noValidate aria-label="Contact form">
              <div className="contact-grid-row">
                <Field
                  id="contact-name"
                  label="Your Name *"
                  placeholder="e.g. Sarah Connor"
                  value={form.name}
                  onChange={(v) => set('name', v)}
                  error={errors.name}
                  required
                />
                <Field
                  id="contact-email"
                  label="Work Email *"
                  type="email"
                  placeholder="e.g. sarah@company.com"
                  value={form.email}
                  onChange={(v) => set('email', v)}
                  error={errors.email}
                  required
                />
              </div>

              <div className="contact-grid-row">
                <Field
                  id="contact-phone"
                  label="Phone / WhatsApp"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(v) => set('phone', v)}
                />
                <Field
                  id="contact-company"
                  label="Company / Brand"
                  placeholder="e.g. Acme Corp"
                  value={form.company}
                  onChange={(v) => set('company', v)}
                />
              </div>

              {/* Service Select */}
              <div className="contact-field">
                <label className="contact-label" htmlFor="contact-service">
                  Select Required Service *
                </label>
                <select
                  id="contact-service"
                  className={`contact-select ${errors.service ? 'contact-input--error' : ''}`}
                  value={form.service}
                  onChange={(e) => set('service', e.target.value)}
                  required
                  aria-invalid={!!errors.service}
                >
                  <option value="">Select a service category…</option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <span className="contact-error" role="alert">
                    {errors.service}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="contact-field">
                <label className="contact-label" htmlFor="contact-message">
                  Project Scope & Goals *
                </label>
                <textarea
                  id="contact-message"
                  className={`contact-textarea ${errors.message ? 'contact-input--error' : ''}`}
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  rows={4}
                  placeholder="Tell us about what you want to build, target timeline, and goals…"
                  required
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <span className="contact-error" role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Error Banner */}
              {state === 'error' && (
                <div className="contact-banner-error" role="alert">
                  Something went wrong while submitting. Please try again or email us directly at
                  info@inspirezesttechnologies.com
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="contact-submit-btn"
                disabled={state === 'loading'}
                data-cursor="go"
                aria-busy={state === 'loading'}
              >
                <span>{state === 'loading' ? 'TRANSMITTING INQUIRY…' : 'SUBMIT PROPOSAL INQUIRY'}</span>
                <Send size={18} aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

interface FieldProps {
  id: string
  label: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  type?: string
  error?: string
  required?: boolean
}

function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  required,
}: FieldProps) {
  return (
    <div className="contact-field">
      <label className="contact-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`contact-input ${error ? 'contact-input--error' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-invalid={!!error}
      />
      {error && (
        <span className="contact-error" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
