import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { pageRevealTransition } from '../motion'

type SectionChipProps = {
  children: ReactNode
  /** When true, show sentence case instead of uppercase chip style. */
  sentenceCase?: boolean
  className?: string
}

/**
 * Linear-style pill: faint purple tint, purple border, no shadow.
 */
export function SectionChip({ children, sentenceCase = false, className = '' }: SectionChipProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={pageRevealTransition}
      className={`inline-flex cursor-default items-center rounded-full border border-[rgba(97,97,255,0.2)] bg-[rgba(97,97,255,0.08)] px-3 py-1 text-[11px] font-medium text-[#6161ff] ${
        sentenceCase ? 'normal-case tracking-[-0.01em]' : 'uppercase tracking-[0.08em]'
      } ${className}`}
    >
      {children}
    </motion.span>
  )
}
