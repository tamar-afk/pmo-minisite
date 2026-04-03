import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ComplianceBadgeGrid } from '../components/ComplianceBadgeGrid'
import { SectionChip } from '../components/SectionChip'
import { springSoft } from '../motion'

/**
 * Enterprise trust band aligned with monday.com Trust Center messaging (compliance marks are stylized labels).
 */
export function EnterpriseSecuritySection() {
  return (
    <section
      id="trust-security"
      className="scroll-mt-24 border-t border-[rgba(12,12,15,0.06)] bg-[rgba(244,244,245,0.65)] px-4 py-12 backdrop-blur-[1px] md:px-8 md:py-16 lg:px-12"
    >
      <div className="mx-auto max-w-[720px]">
        <header className="mb-6 text-left md:mb-8">
          <div className="mb-3 flex justify-start">
            <SectionChip>Trust & security</SectionChip>
          </div>
          <h2 className="text-pretty text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0c0c0f] md:text-[44px] lg:text-[48px]">
            Enterprise-grade security
          </h2>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={springSoft}
        >
          <div
            className="rounded-[12px] border border-[rgba(15,15,20,0.07)] bg-white p-7 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_16px_48px_-12px_rgba(15,15,20,0.08),0_4px_16px_rgba(15,15,20,0.04)] transition-shadow duration-300 md:p-9 md:shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_24px_56px_-16px_rgba(15,15,20,0.1),0_8px_24px_rgba(15,15,20,0.05)]"
          >
            <p className="max-w-[38rem] text-[15px] leading-[1.65] text-[rgba(15,15,20,0.58)] md:text-[16px] md:leading-[1.6]">
              Your project data stays protected with built-in governance, permissions, data privacy, and
              compliance, across every plan.
            </p>
            <a
              href="https://monday.com/trust"
              target="_blank"
              rel="noopener noreferrer"
              className="group/link mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0c0c0f] underline decoration-[rgba(15,15,20,0.28)] underline-offset-[5px] transition-colors hover:text-[#6161FF] hover:decoration-[#6161FF]"
            >
              Explore our Trust Center
              <ArrowRight
                className="h-[1.1em] w-[1.1em] shrink-0 transition-transform duration-200 group-hover/link:translate-x-0.5"
                aria-hidden
                strokeWidth={2.25}
              />
            </a>

            <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-[rgba(15,15,20,0.1)] to-transparent" />

            <ComplianceBadgeGrid />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
