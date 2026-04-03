import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { pageEase } from '../motion'

/**
 * Linear-style scroll entrance: opacity + 20px rise, 500ms, threshold 0.1, once.
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
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: pageEase }}
    >
      {children}
    </motion.div>
  )
}
