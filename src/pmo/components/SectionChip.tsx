import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { pageEase } from '../motion'

export function SectionChip({ children }: { children: ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.4, ease: pageEase }}
      whileHover={{ scale: 1.02, boxShadow: '0 1px 0 rgba(0,0,0,0.04)' }}
      className="inline-flex cursor-default items-center rounded-full border border-[rgba(12,12,15,0.08)] bg-white px-[14px] py-1.5 text-[12px] font-medium uppercase tracking-[0.05em] text-[rgba(12,12,15,0.48)] shadow-[0_1px_2px_rgba(12,12,15,0.04)] md:text-[13px]"
    >
      {children}
    </motion.span>
  )
}
