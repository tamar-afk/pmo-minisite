import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * Wraps a page block with a subtle scroll-triggered fade/slide so motion continues down the page.
 */
export function PageScrollReveal({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -8% 0px' }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}
