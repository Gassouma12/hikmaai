/**
 * Plain page wrapper. The previous framer-motion `motion.main` version with
 * `<AnimatePresence mode="wait">` in App.jsx caused navigation to break when
 * the outgoing page had any dynamic subtree (e.g. an expanded card on the
 * Philosophy page): framer-motion never called `present(false)` so the
 * outgoing page stayed mounted at opacity 0 forever, and the incoming page
 * never mounted at all. A CSS animation on `.page` handles the fade-in.
 */
export default function PageTransition({ children }) {
  return <main className="page">{children}</main>
}
