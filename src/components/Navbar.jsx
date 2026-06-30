import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV } from '../data/content.js'
import logoImg from '../images/logo.png'

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
        <Link to="/" className="nav-brand" onClick={() => setOpen(false)} aria-label="HIKMA AI">
          <img className="nav-logo" src={logoImg} alt="HIKMA AI" draggable="false" />
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
