import { motion } from 'framer-motion'
import { Star, TextQuote } from 'lucide-react'

const G2_BADGE_CATEGORIES = ['Leader', 'Easiest to use', 'Best results', 'Highest adoption'] as const

function G2BadgeGrid() {
  return (
    <div className="mx-auto grid w-full max-w-[300px] grid-cols-2 gap-2 sm:gap-2.5">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex min-h-[72px] flex-col items-center justify-center gap-1 rounded-lg border border-[rgba(15,15,20,0.1)] bg-white px-2 py-2.5 text-center shadow-sm"
        >
          <span className="text-[9px] font-semibold leading-tight text-[rgba(15,15,20,0.55)]">
            {G2_BADGE_CATEGORIES[i]}
          </span>
          <span className="text-[11px] font-semibold text-[#0f0f14]">G2</span>
          <span className="flex items-center justify-center gap-0.5 text-[#6161FF]" aria-hidden>
            {[0, 1, 2, 3].map((s) => (
              <Star key={s} className="h-3 w-3 fill-current" strokeWidth={0} />
            ))}
          </span>
        </div>
      ))}
    </div>
  )
}

const VML_QUOTE = {
  lines: [
    "monday's AI helped us cut our project planning time in half.",
    'What used to take days now takes minutes, and that speed has directly translated into faster delivery for our clients.',
  ] as const,
  attribution: 'Sarah Luxemberg, VML',
}

/**
 * Testimonial column + G2 column.
 */
export function CustomerProofBlock() {
  return (
    <div className="rounded-[12px] border border-[rgba(15,15,20,0.06)] bg-[#faf8fc] px-5 py-6 shadow-sm md:px-8 md:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
        <motion.article
          className="relative rounded-[12px] border border-[rgba(15,15,20,0.08)] bg-white p-5 shadow-[0_8px_32px_rgba(15,15,20,0.06)] md:p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
        >
          <TextQuote className="mb-3 h-8 w-8 text-[#6161FF]" strokeWidth={1.75} aria-hidden />
          <blockquote className="text-[15px] font-medium italic leading-relaxed text-[#0f0f14] md:text-[16px] md:leading-snug">
            {VML_QUOTE.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </blockquote>

          <p className="mt-5 text-[13px] font-medium text-[rgba(15,15,20,0.55)]">{VML_QUOTE.attribution}</p>
        </motion.article>

        <motion.div
          className="flex flex-col justify-center lg:pl-1"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
        >
          <p className="text-[15px] font-semibold text-[#0f0f14] md:text-[16px]">By the numbers</p>
          <p className="mt-2 max-w-[360px] text-[12px] leading-relaxed text-[rgba(15,15,20,0.55)] md:text-[13px]">
            Ranked a top 5 project management platform on G2, backed by 14K+ customer reviews.
          </p>
          <div className="mt-5">
            <G2BadgeGrid />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
