import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/**
 * Fixed top bar that fills with scroll progress: gives continuous motion feedback while reading.
 */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 400 : 120,
    damping: reduceMotion ? 60 : 28,
    restDelta: 0.001,
  })

  if (reduceMotion) {
    return null
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 top-0 z-[500] h-[2px] origin-left rounded-none bg-[#6161FF]"
      style={{ scaleX, transformOrigin: '0%' }}
    />
  )
}
