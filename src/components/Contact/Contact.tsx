import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGsap } from '@/hooks/useGsap'
import { api, type ContactPayload } from '@/api/client'
import './Contact.css'

const SERVICE_OPTIONS = [
  'Website Development',
  'Mobile App Development',
  'Custom Software',
  'E-Commerce',
  'ERP / Business Software',
  'Digital Marketing',
  'Branding & Creative',
  'Other',
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
  const [form, setForm]   = useState<FormData>(EMPTY)
  const [state, setState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Partial<FormData>>({})

  useGsap(() => {
    gsap.fromTo('.contact-col',
      { opacity: 0, y: 40, rotateX: -15 },
      {
        opacity: 1, y: 0, rotateX: 0,
        stagger: 0.18,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    gsap.fromTo('.contact-field',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  }, [], sectionRef)

  const set = (k: keyof FormData, v: string) =>
    setForm(f => ({ ...f, [k]: v }))

  const validate = (): boolean => {
    const e: Partial<FormData> = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.service)        e.service = 'Select a service'
    if (!form.message.trim()) e.message = 'Tell us about your project'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setState('loading')
    try {
      const payload: ContactPayload = {
        name:    form.name,
        email:   form.email,
        phone:   form.phone || undefined,
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
      className="contact scene"
      aria-label="Contact InspireZest"
    >
      <div className="contact-container">
        {/* Left col */}
        <div className="contact-col contact-col--left">
          <span className="contact-tag" aria-hidden="true">— CONTACT</span>
          <h2 className="contact-heading font-display">
            START A<br />PROJECT
          </h2>
          <div className="contact-info">
            <div className="contact-info-row">
              <span className="contact-info-label">Location</span>
              <span className="contact-info-val">Kollam, Kerala, India</span>
            </div>
            <div className="contact-info-row">
              <span className="contact-info-label">Response time</span>
              <span className="contact-info-val">Within 24 hours</span>
            </div>
          </div>
        </div>

        {/* Right col: form */}
        <div className="contact-col contact-col--right">
          {state === 'success' ? (
            <div className="contact-success" role="alert">
              <span className="contact-success-mark" aria-hidden="true">✓</span>
              <p className="contact-success-title">Message received.</p>
              <p className="contact-success-sub">We'll get back to you within 24 hours.</p>
              <button className="contact-retry" onClick={() => setState('idle')}>
                Send another →
              </button>
            </div>
          ) : (
            <form
              className="contact-form"
              onSubmit={submit}
              noValidate
              aria-label="Contact form"
            >
              <div className="contact-row">
                <Field
                  id="contact-name"
                  label="Name *"
                  value={form.name}
                  onChange={v => set('name', v)}
                  error={errors.name}
                  required
                />
                <Field
                  id="contact-email"
                  label="Email *"
                  type="email"
                  value={form.email}
                  onChange={v => set('email', v)}
                  error={errors.email}
                  required
                />
              </div>
              <div className="contact-row">
                <Field
                  id="contact-phone"
                  label="Phone"
                  type="tel"
                  value={form.phone}
                  onChange={v => set('phone', v)}
                />
                <Field
                  id="contact-company"
                  label="Company"
                  value={form.company}
                  onChange={v => set('company', v)}
                />
              </div>

              {/* Service select */}
              <div className="contact-field">
                <label className="contact-label" htmlFor="contact-service">
                  Service *
                </label>
                <select
                  id="contact-service"
                  className={`contact-select ${errors.service ? 'contact-input--error' : ''}`}
                  value={form.service}
                  onChange={e => set('service', e.target.value)}
                  required
                  aria-invalid={!!errors.service}
                  aria-describedby={errors.service ? 'contact-service-err' : undefined}
                >
                  <option value="">Select a service</option>
                  {SERVICE_OPTIONS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.service && (
                  <span id="contact-service-err" className="contact-error" role="alert">
                    {errors.service}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="contact-field">
                <label className="contact-label" htmlFor="contact-message">
                  Project Details *
                </label>
                <textarea
                  id="contact-message"
                  className={`contact-textarea ${errors.message ? 'contact-input--error' : ''}`}
                  value={form.message}
                  onChange={e => set('message', e.target.value)}
                  rows={5}
                  placeholder="Describe your project, goals, and timeline…"
                  required
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-err' : undefined}
                />
                {errors.message && (
                  <span id="contact-message-err" className="contact-error" role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Error banner */}
              {state === 'error' && (
                <div className="contact-banner-error" role="alert">
                  Something went wrong. Please try again.
                  <button
                    type="button"
                    className="contact-retry-inline"
                    onClick={() => setState('idle')}
                  >
                    Retry →
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="contact-submit"
                disabled={state === 'loading'}
                data-cursor="go"
                aria-busy={state === 'loading'}
              >
                {state === 'loading' ? 'SENDING…' : 'SEND MESSAGE →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// Field helper
interface FieldProps {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  error?: string
  required?: boolean
}
function Field({ id, label, value, onChange, type = 'text', error, required }: FieldProps) {
  return (
    <div className="contact-field">
      <label className="contact-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`contact-input ${error ? 'contact-input--error' : ''}`}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      {error && (
        <span id={`${id}-err`} className="contact-error" role="alert">{error}</span>
      )}
    </div>
  )
}
