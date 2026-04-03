import { motion } from 'framer-motion'
import { CustomerProofBlock } from '../components/CustomerProofBlock'
import { SectionChip } from '../components/SectionChip'
import { pageEase } from '../motion'
import { CustomerOutcomesCarousel } from './CustomerOutcomesSection'

export function SocialProofSection() {
  return (
    <section
      id="social-proof"
      className="relative scroll-mt-24 overflow-hidden bg-white/78 px-4 py-10 backdrop-blur-[1px] md:px-8 md:py-12 lg:px-12 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-20 after:bg-gradient-to-b after:from-transparent after:to-[rgba(244,244,245,0.5)]"
    >
      <div className="mx-auto max-w-[1100px]">
        <motion.div
          className="mb-6 text-left md:mb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: pageEase }}
        >
          <div className="flex justify-start">
            <SectionChip>Real customers</SectionChip>
          </div>
          <h2 className="mt-4 text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0c0c0f] md:text-[44px] lg:text-[48px]">
            Real customers. Real outcomes.
          </h2>
        </motion.div>

        <CustomerProofBlock />

        <CustomerOutcomesCarousel className="mt-10 md:mt-12" />
      </div>
    </section>
  )
}
