import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

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
      className="pointer-events-none fixed left-0 right-0 top-0 z-[500] h-[1.5px] origin-left bg-[#6161ff]"
      style={{ scaleX, transformOrigin: '0%' }}
    />
  )
}
