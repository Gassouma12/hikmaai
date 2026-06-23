import { Link } from 'react-router-dom'
import StarMotif from './StarMotif.jsx'
import { NAV } from '../data/content.js'

const BRAND = 'HIKMA AI'
const DESCRIPTION =
  'HIKMA AI exists to reconnect technology with wisdom. Our story does not begin in Silicon Valley — it begins centuries earlier, in the libraries and academies that first taught the world how to think.'

// Lucide v1 dropped brand logos, so the brand marks are inline SVGs.
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="17.6" cy="6.4" r="1.3" fill="currentColor" stroke="none" />
  </svg>
)
const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)
const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const SOCIALS = [
  { icon: <FacebookIcon className="ic" />, href: '#', label: 'Facebook' },
  { icon: <InstagramIcon className="ic" />, href: '#', label: 'Instagram' },
  { icon: <YoutubeIcon className="ic" />, href: '#', label: 'YouTube' },
  { icon: <LinkedinIcon className="ic" />, href: '#', label: 'LinkedIn' },
]

// Real routes for the nav links, plus a contact link.
const NAV_LINKS = [...NAV, { to: '/contact', label: 'Get in Touch' }]

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="ftr-inner">
        <div className="ftr-top">
          <span className="ftr-brand">HIKMA <span>AI</span></span>
          <p className="ftr-desc">{DESCRIPTION}</p>

          <div className="ftr-socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} className="ftr-social" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>

          <nav className="ftr-nav">
            {NAV_LINKS.map((l) =>
              l.to.startsWith('/') ? (
                <Link key={l.label} to={l.to}>{l.label}</Link>
              ) : (
                <a key={l.label} href={l.to}>{l.label}</a>
              ),
            )}
          </nav>
        </div>

        <div className="ftr-legal">
          <p>© {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
          <a className="ftr-creator" href="#">Founded by Maha Jouini</a>
        </div>
      </div>

      {/* Large faded brand wordmark (Arabic: Hikma) */}
      <div className="ftr-bigtext" aria-hidden="true">حكمة</div>

      {/* Centre badge sitting on the gradient line */}
      <div className="ftr-badge">
        <span className="ftr-badge-inner">
          <StarMotif className="ftr-star" stroke="var(--black)" strokeWidth={1.6} />
        </span>
      </div>

      {/* Gradient line + soft shadow into the page */}
      <div className="ftr-line" aria-hidden="true" />
      <div className="ftr-fade" aria-hidden="true" />
    </footer>
  )
}
