import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 24 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}

/** Wraps each routed page so transitions animate in/out via AnimatePresence. */
export default function PageTransition({ children }) {
  return (
    <motion.main
      className="page"
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.main>
  )
}
