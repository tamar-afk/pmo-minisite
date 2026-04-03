import { motion } from 'framer-motion'
import { SectionChip } from '../components/SectionChip'
import { pageEase } from '../motion'
import { CaseStudiesProofCarousel } from './CustomerOutcomesSection'

const G2_LABELS = ['Leader', 'Easiest to use', 'Best results', 'Highest adoption'] as const

function G2BadgeRow() {
  return (
    <div
      className="flex flex-wrap items-stretch justify-center gap-6 md:gap-6"
      style={{ gap: '24px' }}
      aria-label="G2 recognition"
    >
      {G2_LABELS.map((label) => (
        <div
          key={label}
          className="flex min-w-[120px] flex-1 flex-col items-center justify-center rounded-[12px] border border-[#e8e8f0] bg-white px-4 py-3 text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)] sm:min-w-[140px]"
        >
          <span className="text-[15px] font-black tracking-tight text-[#ff492c]">G2</span>
          <span className="mt-1.5 text-[11px] font-semibold leading-snug text-[#6b6b8a] md:text-[12px]">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

function VmlQuoteCard() {
  return (
    <motion.figure
      className="relative overflow-hidden rounded-[12px] border border-[#e8e8f0] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] md:p-10 lg:p-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: pageEase }}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-10">
        <div className="flex shrink-0 flex-col justify-center border-[#e8e8f0] lg:border-r lg:pr-10">
          <p className="text-[56px] font-bold leading-none tracking-[-0.02em] text-[#6161ff] md:text-[64px]">50%</p>
          <p className="mt-2 text-[14px] font-normal leading-[1.5] text-[rgba(107,107,138,0.6)]">faster project planning</p>
        </div>
        <div className="min-w-0 flex-1">
          <blockquote className="border-l-4 border-[#6161ff] pl-5 text-[16px] font-normal leading-[1.7] text-[#0a0a0f] md:text-[17px]">
            <p className="m-0">
              monday&apos;s AI helped us cut our project planning time in half. What used to take days now takes minutes,
              and that speed has directly translated into faster delivery for our clients.
            </p>
          </blockquote>
          <figcaption className="mt-5 text-[14px] leading-snug text-[#6b6b8a] md:text-[15px]">
            <span className="font-semibold text-[#0a0a0f]">Sarah Luxemberg</span>, Operations Director, VML
          </figcaption>
        </div>
      </div>
    </motion.figure>
  )
}

/**
 * Case studies band: VML quote, G2 badges, metrics carousel (before Why monday).
 */
export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="scroll-mt-24 bg-transparent py-24">
      <div className="pmo-container">
        <motion.div
          className="mb-12 text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: pageEase }}
        >
          <SectionChip>Real customers</SectionChip>
          <h2 className="pmo-section-title mt-4">Real customers. Real outcomes.</h2>
        </motion.div>

        <VmlQuoteCard />

        <motion.div
          className="mt-10 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: pageEase, delay: 0.05 }}
        >
          <G2BadgeRow />
        </motion.div>

        <CaseStudiesProofCarousel className="mt-12 md:mt-12" />
      </div>
    </section>
  )
}
