import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV } from '../data/content.js'

/** Small dot-cluster brand mark. */
function BrandMark() {
  return (
    <svg className="nav-mark" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <g fill="currentColor">
        <circle cx="12" cy="6" r="2.1" />
        <circle cx="6.2" cy="12" r="2.1" />
        <circle cx="17.8" cy="12" r="2.1" />
        <circle cx="12" cy="18" r="2.1" />
        <circle cx="12" cy="12" r="2.4" opacity="0.55" />
      </g>
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <nav className="nav-pill">
        <Link to="/" className="nav-brand" onClick={() => setOpen(false)}>
          <BrandMark />
          <span className="nav-wordmark">HIKMA <span>AI</span></span>
        </Link>

        <ul className="nav-links">
          {NAV.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <NavLink to="/contact" className="nav-cta">Get in Touch</NavLink>

        <button
          className={`nav-burger ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-drawer"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
          >
            <ul>
              <li>
                <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
              </li>
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} onClick={() => setOpen(false)}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
            <NavLink to="/contact" className="nav-drawer-cta" onClick={() => setOpen(false)}>
              Get in Touch
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
