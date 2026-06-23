import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * Smoothly counts a number up from 0 to its target when it scrolls into view.
 * Accepts decorated values like "2B+", "700K+", "1,200", "34.7%" or "∞" —
 * it animates the numeric part and preserves any prefix/suffix and the
 * original thousands/decimal formatting. Non-numeric values (e.g. "∞")
 * render unchanged. Honours prefers-reduced-motion.
 */
function parse(value) {
  const str = String(value)
  const m = str.match(/\d[\d.,]*/)
  if (!m) return null
  const raw = m[0]
  const clean = raw.replace(/,/g, '')
  return {
    prefix: str.slice(0, m.index),
    suffix: str.slice(m.index + raw.length),
    hasComma: raw.includes(','),
    decimals: clean.includes('.') ? clean.split('.')[1].length : 0,
    target: parseFloat(clean),
  }
}

const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))

function format(n, p) {
  let core
  if (p.hasComma) {
    core = n.toLocaleString('en-US', {
      minimumFractionDigits: p.decimals,
      maximumFractionDigits: p.decimals,
    })
  } else {
    core = p.decimals ? n.toFixed(p.decimals) : Math.round(n).toString()
  }
  return p.prefix + core + p.suffix
}

export default function CountUp({ value, duration = 1800, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const parsed = parse(value)
  const [text, setText] = useState(() => (parsed ? format(0, parsed) : String(value)))

  useEffect(() => {
    if (!parsed || !inView) return
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setText(format(parsed.target, parsed))
      return
    }
    let raf
    let start
    const step = (ts) => {
      if (start == null) start = ts
      const t = Math.min((ts - start) / duration, 1)
      setText(format(parsed.target * easeOutExpo(t), parsed))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <span ref={ref} className={className}>
      {parsed ? text : String(value)}
    </span>
  )
}
