import { motion } from 'framer-motion'
import { Star, TextQuote } from 'lucide-react'

function G2BadgeGrid() {
  return (
    <div className="mx-auto grid w-full max-w-[300px] grid-cols-2 gap-2 sm:gap-2.5">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-lg border border-[rgba(15,15,20,0.1)] bg-white px-2 py-2.5 text-center shadow-sm"
        >
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

const DEFAULT_QUOTE = {
  quote:
    "monday.com's AI helped us cut our project planning time in half. What used to take days now takes minutes, and that speed has directly translated into faster delivery for our clients.",
  name: 'Sarah Luxemberg',
  titleLine: 'Operations Director, VML',
}

/**
 * Customer-proof band: headline, testimonial + G2 / stat column.
 */
export function CustomerProofBlock() {
  return (
    <div className="rounded-2xl border border-[rgba(15,15,20,0.06)] bg-[#faf8fc] px-5 py-6 shadow-sm md:px-8 md:py-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <h2 className="mx-auto max-w-[28rem] text-[17px] font-semibold leading-snug tracking-[-0.02em] text-[#0c0c0f] md:text-[20px]">
          Loved by users. Trusted by organizations.
        </h2>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:mt-7 lg:grid-cols-2 lg:items-center lg:gap-8">
        <motion.article
          className="relative rounded-xl border border-[rgba(15,15,20,0.08)] bg-white p-5 shadow-[0_8px_32px_rgba(15,15,20,0.06)] md:p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
        >
          <TextQuote className="mb-3 h-8 w-8 text-[#6161FF]" strokeWidth={1.75} aria-hidden />
          <blockquote className="text-[15px] font-medium italic leading-relaxed text-[#0f0f14] md:text-[16px] md:leading-snug">
            {DEFAULT_QUOTE.quote}
          </blockquote>
          <div className="mt-5 text-[13px] text-[rgba(15,15,20,0.55)]">
            <p className="font-semibold text-[#0f0f14]">{DEFAULT_QUOTE.name}</p>
            <p className="mt-0.5">{DEFAULT_QUOTE.titleLine}</p>
          </div>
        </motion.article>

        <motion.div
          className="flex flex-col justify-center lg:pl-1"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
        >
          <p className="text-[44px] font-bold leading-none tracking-tight text-[#0f0f14] md:text-[52px]">
            50<span className="text-[26px] font-semibold text-[rgba(15,15,20,0.35)]">%</span>
          </p>
          <p className="mt-1.5 text-[14px] font-semibold text-[#0f0f14] md:text-[15px]">faster project delivery</p>
          <p className="mt-5 text-[13px] font-semibold leading-snug text-[#0f0f14] md:text-[14px]">
            Most popular work management software on G2
          </p>
          <p className="mt-1 max-w-[360px] text-[12px] leading-relaxed text-[rgba(15,15,20,0.55)]">
            Backed by 14K+ customer reviews.
          </p>
          <div className="mt-5">
            <G2BadgeGrid />
          </div>
        </motion.div>
      </div>

      <p className="mt-5 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[rgba(15,15,20,0.4)]">
        Enterprise-ready AI work platform
      </p>
    </div>
  )
}
