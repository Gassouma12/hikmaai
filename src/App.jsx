import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import calligraphy from './images/calligraphy.png'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Harms from './pages/Harms.jsx'
import Media from './pages/Media.jsx'
import Article from './pages/Article.jsx'
import Philosophy from './pages/Philosophy.jsx'
import Contact from './pages/Contact.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  return (
    <>
      <img className="app-calligraphy app-calligraphy--left" src={calligraphy} alt="" aria-hidden="true" />
      <img className="app-calligraphy app-calligraphy--right" src={calligraphy} alt="" aria-hidden="true" />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/harms" element={<Harms />} />
        <Route path="/media" element={<Media />} />
        <Route path="/media/articles/:id" element={<Article />} />
        <Route path="/philosophy" element={<Philosophy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}
