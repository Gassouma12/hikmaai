import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MeshGradient } from '@paper-design/shaders-react'
import calligraphy from '../images/calligraphy.png'

/**
 * Animated mesh-gradient hero — cream / parchment palette, slightly deeper
 * than the page surface so the hero reads as a distinct band. The WebGL shader
 * is scoped to the hero and unmounted while the hero is off-screen.
 */
const CREAM = ['#f3e9c8', '#fdf6dc', '#e3d2a2', '#d4af37', '#b88e1f']
const CYCLE_WORDS = ['Wisdom.', 'Peace.', 'Humanity.', 'Responsibility.', 'Hikma.']
// Dust-fade transitions used by both the title and the cycling highlight.
const DUST_IN  = { opacity: 0, y: 22, scale: 1.06, filter: 'blur(14px)' }
const DUST_AT  = { opacity: 1, y: 0,  scale: 1,    filter: 'blur(0px)'  }
const DUST_OUT = { opacity: 0, y: -10, scale: 1.08, filter: 'blur(18px)' }

/** Splits a string into words and animates each one fading + rising in.
    Spaces are placed as sibling text nodes (flatMap) so they aren't trapped
    inside inline-block spans where CSS strips trailing whitespace. */
function TypewriterFade({ text, baseDelay = 0, className = '' }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.flatMap((w, i) => [
        <motion.span
          key={i}
          initial={DUST_IN}
          animate={DUST_AT}
          transition={{ duration: 1.1, delay: baseDelay + i * 0.14, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: 'inline-block' }}
        >
          {w}
        </motion.span>,
        ...(i < words.length - 1 ? [' '] : []),
      ])}
    </span>
  )
}

/** Cycling highlight word — motion.em at root lets AnimatePresence mode="wait"
    fully exit the old word before the new one enters. */
function HighlightWord({ text, baseDelay = 0 }) {
  return (
    <motion.em
      className="hl"
      style={{ display: 'inline', fontStyle: 'italic' }}
      initial={DUST_IN}
      animate={DUST_AT}
      exit={DUST_OUT}
      transition={{ duration: 0.55, delay: baseDelay, ease: [0.23, 1, 0.32, 1] }}
    >
      {text}
    </motion.em>
  )
}

export default function MeshHero({
  title = 'Beyond Artificial Intelligence, Towards',
  highlight = 'Wisdom.',
  tagline = 'Rooted in Humanity.',
  description = 'A media, research, and public education platform democratizing AI knowledge — reconnecting technology with philosophy, ethics, and social justice, and centering the voices of Africa and the Arab world in humanity\'s most consequential conversation.',
  buttonText = 'Discover the podcast',
  buttonTo = '/media',
  colors = CREAM,
  distortion = 0.85,
  swirl = 0.55,
  speed = 0.3,
  offsetX = 0.05,
}) {
  const ref = useRef(null)
  const [dims, setDims] = useState({ width: 1920, height: 1080 })
  const [mounted, setMounted] = useState(false)
  // Unmount the WebGL shader once the hero has scrolled past, to free GPU.
  // Mount it on first paint so the gradient is visible immediately (don't gate
  // on an observer — its first reading can be unreliable in some viewports).
  const [pastHero, setPastHero] = useState(false)
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    setMounted(true)
    const update = () => {
      const r = ref.current?.getBoundingClientRect()
      const w = Math.max(window.innerWidth || 0, r?.width || 0, 320)
      const h = Math.max(window.innerHeight || 0, r?.height || 0, 480)
      setDims({ width: w, height: h })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const r = ref.current?.getBoundingClientRect()
      if (!r) return
      // Past the hero when its bottom is above the viewport top.
      setPastHero(r.bottom < 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Compute delays so the title words finish before the tagline starts, etc.
  const titleWordCount = title.split(' ').length
  const highlightDelay = 0.25 + titleWordCount * 0.11
  const taglineDelay = highlightDelay + 0.55
  const descDelay = taglineDelay + 0.45
  const btnDelay = descDelay + 0.35

  // Cycle the highlighted word every 2s. key on HighlightWord re-mounts it,
  // AnimatePresence mode="wait" ensures the old word fully exits before the new
  // one enters — no overlap. First mount uses highlightDelay; subsequent use 0.
  const [wordIdx, setWordIdx] = useState(0)
  const cycledRef = useRef(false)
  useEffect(() => {
    const id = setInterval(() => {
      cycledRef.current = true
      setWordIdx((i) => (i + 1) % CYCLE_WORDS.length)
    }, 2000)
    return () => clearInterval(id)
  }, [])
  // If a non-default `highlight` prop was passed, honour it; otherwise cycle.
  const hl = highlight && highlight !== 'Wisdom.' ? highlight : CYCLE_WORDS[wordIdx]
  const hlDelay = cycledRef.current ? 0 : highlightDelay

  return (
    <section className="mesh-hero" ref={ref}>
      <div className="mesh-hero-bg" aria-hidden="true">
        {mounted && !pastHero && (
          <MeshGradient
            style={{ width: '100%', height: '100%' }}
            width={dims.width}
            height={dims.height}
            colors={colors}
            distortion={distortion}
            swirl={swirl}
            grainMixer={0}
            grainOverlay={0}
            speed={reduce ? 0 : speed}
            offsetX={offsetX}
          />
        )}
        <div className="mesh-hero-veil" />
      </div>
      <img className="mesh-hero-calligraphy mesh-hero-calligraphy--left" src={calligraphy} alt="" aria-hidden="true" />
      <img className="mesh-hero-calligraphy mesh-hero-calligraphy--right" src={calligraphy} alt="" aria-hidden="true" />

      <div className="shell mesh-hero-inner">
        <motion.p
          className="mesh-hero-eyebrow"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
        >
          سلام · SALAM&nbsp;&nbsp;·&nbsp;&nbsp;حكمة · WISDOM&nbsp;&nbsp;·&nbsp;&nbsp;HUMANITY
        </motion.p>

        <h1 className="mesh-hero-title">
          <TypewriterFade text={title} baseDelay={0.25} />{' '}
          {/* mode="wait": old word's exit animation completes before new word enters */}
          <AnimatePresence mode="wait" initial={false}>
            <HighlightWord key={hl} text={hl} baseDelay={hlDelay} />
          </AnimatePresence>
        </h1>

        <motion.p
          className="mesh-hero-tagline"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: taglineDelay, ease: [0.23, 1, 0.32, 1] }}
        >
          {tagline}
        </motion.p>

        <motion.p
          className="mesh-hero-desc"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: descDelay, ease: [0.23, 1, 0.32, 1] }}
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: btnDelay, ease: [0.23, 1, 0.32, 1] }}
        >
          <Link to={buttonTo} className="mesh-hero-btn">{buttonText}</Link>
        </motion.div>
      </div>

      <p className="mesh-hero-foot">
        From the House of Wisdom in <strong>BAGHDAD</strong> → to the great libraries of <strong>TIMBUKTU</strong>
      </p>
    </section>
  )
}
