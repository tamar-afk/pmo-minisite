import { motion, useReducedMotion } from 'framer-motion'
import { SectionChip } from '../components/SectionChip'
import { pageEase, staggerContainer, staggerItem } from '../motion'
import { CaseStudiesProofCarousel } from './CustomerOutcomesSection'

const G2_LABELS = ['Leader', 'Easiest to use', 'Best results', 'Highest adoption'] as const

function G2BadgeRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-0" aria-label="G2 recognition">
      {G2_LABELS.map((label, i) => (
        <div key={label} className="flex items-center">
          {i > 0 ? <span className="mx-4 h-3 w-px bg-[rgba(0,0,0,0.07)]" aria-hidden /> : null}
          <span className="inline-flex items-center gap-2">
            <span className="text-[14px] font-black tracking-tight text-[#ff492c]">G2</span>
            <span className="text-[11px] text-[#6b7280]">{label}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

function VmlQuoteCard() {
  return (
    <motion.figure
      className="overflow-hidden rounded-[14px] border border-[rgba(0,0,0,0.07)] bg-white p-6 md:p-7"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, ease: pageEase }}
    >
      <div className="min-w-0">
        <blockquote className="m-0 text-[15px] font-normal italic leading-[1.65] text-[#111118]">
          <p className="m-0">
            monday&apos;s AI helped us cut our project planning time in half. What used to take days now takes minutes,
            and that speed has directly translated into faster delivery for our clients.
          </p>
        </blockquote>
        <figcaption className="mt-3 text-[12px] text-[#6b7280]">
          Sarah Luxemberg, Operations Director, VML
        </figcaption>
      </div>
    </motion.figure>
  )
}

export function CaseStudiesSection() {
  const reduce = useReducedMotion()

  return (
    <section id="case-studies" className="scroll-mt-24 pmo-flow-section-top bg-[#ffffff] pmo-section-pad">
      <div className="pmo-container">
        <motion.div
          className="mb-5 text-left md:mb-6"
          variants={staggerContainer(0.06)}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={staggerItem}>
            <SectionChip>Real customers</SectionChip>
          </motion.div>
          <motion.h2 variants={staggerItem} className="pmo-section-title">
            Real customers. Real outcomes.
          </motion.h2>
        </motion.div>

        <VmlQuoteCard />

        <CaseStudiesProofCarousel className="mt-5" />

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, ease: pageEase, delay: 0.05 }}
        >
          <G2BadgeRow />
        </motion.div>
      </div>
    </section>
  )
}
