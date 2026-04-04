import { motion, useReducedMotion } from 'framer-motion'
import { pageEase, staggerContainer, staggerItem } from '../motion'
import { CaseStudiesProofCarousel } from './CustomerOutcomesSection'

const G2_LABELS = ['Leader', 'Easiest to use', 'Best results', 'Highest adoption'] as const

function G2BadgeRow() {
  const reduce = useReducedMotion()

  return (
    <div className="flex flex-wrap items-center justify-center gap-0" aria-label="G2 recognition">
      {G2_LABELS.map((label, i) => (
        <motion.div
          key={label}
          className="flex items-center"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: pageEase, delay: reduce ? 0 : i * 0.06 }}
        >
          {i > 0 ? <span className="mx-4 h-3 w-px bg-[rgba(0,0,0,0.07)]" aria-hidden /> : null}
          <span className="inline-flex items-center gap-2">
            <span className="text-[14px] font-black tracking-tight text-[#ff492c]">G2</span>
            <span className="text-[11px] text-[#6b7280]">{label}</span>
          </span>
        </motion.div>
      ))}
    </div>
  )
}

function VmlQuoteCard() {
  return (
    <motion.figure
      className="relative overflow-hidden rounded-2xl border border-[rgba(15,15,20,0.08)] bg-gradient-to-br from-[rgba(97,97,255,0.07)] via-[#ffffff] to-[#f8f9fb] p-7 shadow-[0_24px_70px_-28px_rgba(15,15,20,0.14),0_0_0_1px_rgba(255,255,255,0.8)_inset] md:p-9"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, ease: pageEase }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: 'radial-gradient(circle at 0% 0%, rgba(97,97,255,0.12) 0%, transparent 45%)',
        }}
        aria-hidden
      />
      <div className="relative flex min-w-0 gap-5 md:gap-6">
        <div
          className="w-1 shrink-0 self-stretch rounded-full bg-[linear-gradient(180deg,#a5a7ff_0%,#6161ff_55%,#4f4fd4_100%)] shadow-[0_0_20px_rgba(97,97,255,0.25)]"
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <blockquote className="m-0 text-pretty text-[17px] font-medium leading-[1.65] tracking-[-0.015em] text-[#111118] md:text-[18px] md:leading-[1.7]">
            <p className="m-0">
              monday&apos;s AI helped us cut our project planning time in half. What used to take days now takes minutes,
              and that speed has directly translated into faster delivery for our clients.
            </p>
          </blockquote>
          <figcaption className="mt-8 flex flex-col gap-1 border-t border-[rgba(15,15,20,0.08)] pt-7">
            <span className="text-[16px] font-semibold tracking-[-0.02em] text-[#111118] md:text-[17px]">
              Sarah Luxemberg
            </span>
            <span className="text-[13px] leading-snug text-[#6b7280] md:text-[14px]">Operations Director</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9ca3af]">VML</span>
          </figcaption>
        </div>
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
