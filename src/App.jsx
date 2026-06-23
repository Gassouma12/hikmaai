import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import calligraphy from './images/calligraphy.png'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Harms from './pages/Harms.jsx'
import Media from './pages/Media.jsx'
import Philosophy from './pages/Philosophy.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  const location = useLocation()
  return (
    <>
      <img className="app-calligraphy app-calligraphy--left" src={calligraphy} alt="" aria-hidden="true" />
      <img className="app-calligraphy app-calligraphy--right" src={calligraphy} alt="" aria-hidden="true" />
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/harms" element={<Harms />} />
          <Route path="/media" element={<Media />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}
