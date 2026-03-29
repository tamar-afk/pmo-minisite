import { motion } from 'framer-motion'
import { springGentle } from '../motion'

export function SectionDivider() {
  return (
    <div className="w-full px-4 md:px-8 lg:px-12">
      <motion.div
        className="h-px w-full origin-left bg-[var(--hairline)]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 'all', margin: '0px 0px -20% 0px' }}
        transition={springGentle}
      />
    </div>
  )
}
