import { motion } from 'framer-motion'
import { pageEase } from '../motion'

const badges = [
  { id: 'gdpr', lines: ['GDPR'] },
  { id: 'soc2', lines: ['AICPA', 'SOC 2'] },
  { id: 'iso', lines: ['ISO', '27001'] },
  { id: 'hipaa', lines: ['HIPAA'] },
] as const

type ComplianceBadgeGridProps = {
  /** Tighter padding for flip-card backs */
  compact?: boolean
}

/**
 * Same certification marks as the security section, reusable on flip cards.
 */
export function ComplianceBadgeGrid({ compact }: ComplianceBadgeGridProps) {
  return (
    <div
      className={`grid grid-cols-2 gap-2 sm:grid-cols-4 ${compact ? 'sm:gap-2' : 'gap-2.5 sm:gap-3'}`}
    >
      {badges.map((b, i) => (
        <motion.div
          key={b.id}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.4, ease: pageEase, delay: i * 0.08 }}
          whileHover={{ scale: 1.05 }}
          className={`flex min-h-[4.5rem] items-center justify-center rounded-[11px] border border-[rgba(15,15,20,0.07)] bg-[linear-gradient(180deg,#fafafa_0%,#f5f5f7_100%)] px-2 py-3 text-center shadow-[0_1px_2px_rgba(15,15,20,0.04)] transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${compact ? 'min-h-[3.75rem] py-2' : ''}`}
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
  )
}
