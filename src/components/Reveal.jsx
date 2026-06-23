import { motion } from 'framer-motion'

/**
 * Scroll-into-view reveal. Fades/slides children up the first time they
 * enter the viewport.
 *
 * Pass `immediate` for content that is above the fold on load (e.g. page
 * headers) — it animates on mount instead of waiting for an intersection,
 * which avoids a one-frame invisible flash.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  as = 'div',
  once = true,
  amount = 0.2,
  immediate = false,
  style,
}) {
  const MotionTag = motion[as] || motion.div
  const animateProps = immediate
    ? { animate: { opacity: 1, y: 0 } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: { once, amount } }

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      {...animateProps}
      transition={{ duration: 0.9, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </MotionTag>
  )
}
