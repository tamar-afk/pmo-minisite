import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CustomerProofBlock } from '../components/CustomerProofBlock'
import { useCountUp } from '../hooks/useCountUp'

function StatCell({
  target,
  format,
  label,
  source,
  active,
}: {
  target: number
  format: 'percent' | 'k' | 'plain'
  label: string
  source: string
  active: boolean
}) {
  const display = useCountUp(target, active, { format })
  return (
    <div className="flex flex-col items-center px-3 py-3 text-center md:px-4">
      <p className="text-[32px] font-bold leading-none text-[#0f0f14] md:text-[36px]">{display}</p>
      <p className="mt-2 text-[14px] text-[rgba(15,15,20,0.55)]">{label}</p>
      <p className="mt-1 text-[11px] italic text-[rgba(15,15,20,0.4)]">{source}</p>
    </div>
  )
}

const stats = [
  { target: 132, format: 'percent' as const, label: 'more projects delivered', source: 'WH Smith' },
  { target: 25, format: 'percent' as const, label: 'reduction in project timelines', source: "McDonald's ANZ" },
]

/**
 * Customer proof: quote + G2 band + outcome metrics.
 * @see {@link CustomerProofBlock}
 */
export function SocialProofSection() {
  const statsRef = useRef(null)
  const statsActive = useInView(statsRef, { once: true, amount: 0.15 })

  return (
    <section id="social-proof" className="scroll-mt-24 bg-white px-4 py-10 md:px-8 md:py-12 lg:px-12">
      <div className="mx-auto max-w-[960px]">
        <CustomerProofBlock />

        <motion.div
          ref={statsRef}
          className="mt-8 border-t border-[rgba(15,15,20,0.08)] pt-8 md:mt-10 md:pt-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <p className="mb-4 text-center text-[13px] font-semibold uppercase tracking-[0.08em] text-[rgba(15,15,20,0.45)]">
            Customer outcomes
          </p>
          <div className="grid grid-cols-1 divide-y divide-[rgba(15,15,20,0.08)] bg-white md:grid-cols-2 md:divide-x md:divide-y-0 md:rounded-xl md:border md:border-[rgba(15,15,20,0.08)]">
            {stats.map((s) => (
              <div key={s.label} className="bg-white">
                <StatCell
                  target={s.target}
                  format={s.format}
                  label={s.label}
                  source={s.source}
                  active={statsActive}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
