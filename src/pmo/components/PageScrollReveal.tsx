import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { pageEase } from '../motion'

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
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -80px 0px' }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.4, ease: pageEase }}
    >
      {children}
    </motion.div>
  )
}
