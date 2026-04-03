import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionChip } from '../components/SectionChip'
import { springSoft } from '../motion'

const badges = [
  { id: 'gdpr', lines: ['GDPR'] },
  { id: 'soc2', lines: ['AICPA', 'SOC 2'] },
  { id: 'iso', lines: ['ISO', '27001'] },
  { id: 'hipaa', lines: ['HIPAA'] },
] as const

/**
 * Enterprise trust band aligned with monday.com Trust Center messaging (compliance marks are stylized labels).
 */
export function EnterpriseSecuritySection() {
  return (
    <section
      id="trust-security"
      className="scroll-mt-24 border-t border-[rgba(12,12,15,0.06)] bg-[#f4f4f5] px-4 py-12 md:px-8 md:py-16 lg:px-12"
    >
      <div className="mx-auto max-w-[720px]">
        <header className="mb-6 text-center md:mb-8 md:text-left">
          <div className="mb-3 flex justify-center md:justify-start">
            <SectionChip>Trust & security</SectionChip>
          </div>
          <h2 className="text-pretty text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] text-[#0c0c0f] md:text-[40px] md:leading-[1.1]">
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
            className="rounded-[20px] border border-[rgba(15,15,20,0.07)] bg-white p-7 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_16px_48px_-12px_rgba(15,15,20,0.08),0_4px_16px_rgba(15,15,20,0.04)] transition-shadow duration-300 md:p-9 md:shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_24px_56px_-16px_rgba(15,15,20,0.1),0_8px_24px_rgba(15,15,20,0.05)]"
          >
            <p className="max-w-[38rem] text-[15px] leading-[1.65] text-[rgba(15,15,20,0.58)] md:text-[16px] md:leading-[1.6]">
              Enterprise-grade AI infrastructure with built-in protection and security, data privacy, governance,
              permissions, and compliance.
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

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
              {badges.map((b, i) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ ...springSoft, delay: i * 0.04 }}
                  className="flex min-h-[4.5rem] items-center justify-center rounded-[11px] border border-[rgba(15,15,20,0.07)] bg-[linear-gradient(180deg,#fafafa_0%,#f5f5f7_100%)] px-2 py-3 text-center shadow-[0_1px_2px_rgba(15,15,20,0.04)]"
                >
                  <div className="text-[9px] font-bold uppercase leading-snug tracking-[0.07em] text-[#1a1a1f] sm:text-[10px]">
                    {b.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
