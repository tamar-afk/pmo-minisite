import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { springSnappy } from '../motion'

export function SectionChip({ children }: { children: ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.9 }}
      transition={springSnappy}
      whileHover={{ scale: 1.02, boxShadow: '0 1px 0 rgba(0,0,0,0.04)' }}
      className="inline-flex cursor-default items-center rounded-full border border-[rgba(12,12,15,0.08)] bg-white px-[14px] py-1.5 text-[12px] font-medium tracking-[0.04em] text-[rgba(12,12,15,0.48)] shadow-[0_1px_2px_rgba(12,12,15,0.04)]"
    >
      {children}
    </motion.span>
  )
}
