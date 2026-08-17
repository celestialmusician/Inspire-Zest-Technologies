import React, { useState } from 'react'
import './FloatingWhatsApp.css'

interface FloatingWhatsAppProps {
  phoneNumber?: string
  message?: string
}

export default function FloatingWhatsApp({
  phoneNumber = '919995191295',
  message = 'Hi InspireZest Technologies! I would like to discuss a project with your team.',
}: FloatingWhatsAppProps) {
  const [hovered, setHovered] = useState(false)

  const encodedMsg = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMsg}`

  return (
    <aside className="wa-float-container" aria-label="WhatsApp Contact">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float-btn"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Chat with InspireZest Technologies on WhatsApp"
        data-cursor="pointer"
      >
        {/* Pulsing Emerald Radial Aura */}
        <div className="wa-pulse-aura" aria-hidden="true" />
        <div className="wa-pulse-ring" aria-hidden="true" />

        {/* WhatsApp Official SVG Icon */}
        <div className="wa-icon-box" aria-hidden="true">
          <svg
            className="wa-icon"
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.301-.15-1.781-.878-2.056-.978-.276-.1-.476-.15-.676.15s-.776.978-.952 1.179c-.175.201-.351.226-.652.075s-1.272-.469-2.423-1.496c-.896-.799-1.501-1.787-1.677-2.088s-.019-.464.132-.614c.135-.135.301-.351.451-.527s.201-.301.301-.502.05-.376-.025-.527c-.075-.15-.676-1.631-.927-2.233-.244-.587-.492-.507-.676-.516l-.576-.01c-.201 0-.527.075-.803.376s-1.053 1.029-1.053 2.508c0 1.48 1.078 2.909 1.229 3.109.15.201 2.122 3.241 5.141 4.544.718.31 1.279.495 1.716.634.721.229 1.377.197 1.896.119.578-.087 1.781-.728 2.032-1.431s.251-1.304.175-1.431c-.075-.126-.276-.201-.577-.351z" />
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.981-1.397A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.657 0-3.2-.472-4.524-1.29l-.324-.202-3.328.933.904-3.239-.214-.336A8.125 8.125 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z" />
          </svg>
        </div>

        {/* Dynamic Tooltip on Desktop */}
        <div className={`wa-tooltip ${hovered ? 'wa-tooltip--visible' : ''}`}>
          <span className="wa-tooltip-dot" aria-hidden="true" />
          <span className="wa-tooltip-text">Chat on WhatsApp</span>
        </div>
      </a>
    </aside>
  )
}
