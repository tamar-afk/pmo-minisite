import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { springSoft } from '../motion'

export function SectionReveal({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14, margin: '0px 0px -10% 0px' }}
      transition={springSoft}
    >
      {children}
    </motion.div>
  )
}
