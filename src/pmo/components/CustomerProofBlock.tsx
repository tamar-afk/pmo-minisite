import { motion } from 'framer-motion'
import { Star, TextQuote } from 'lucide-react'

/** Same brand rows as [ministite.vercel.app](https://ministite.vercel.app/) “Join 250,000+ teams” strip */
const LOGO_ROW_TOP = [
  'NBCUniversal',
  'Unilever',
  'Adobe',
  'Netflix',
  'Uber',
  'Coca-Cola',
  'Canva',
  'Hulu',
  'Lionsgate',
] as const

const LOGO_ROW_BOTTOM = [
  'Lyft',
  'Tesla',
  'Nike',
  'IKEA',
  'Spotify',
  'PayPal',
  'Dropbox',
  'Salesforce',
  'HubSpot',
  'Airbnb',
] as const

function LogoMarqueeRow({ names }: { names: readonly string[] }) {
  const doubled = [...names, ...names]
  return (
    <div className="overflow-hidden py-2">
      <div className="animate-social-marquee flex gap-12 whitespace-nowrap md:gap-16">
        {doubled.map((n, i) => (
          <span
            key={`${n}-${i}`}
            className="inline-block text-[13px] font-semibold uppercase tracking-[0.1em] text-[rgba(15,15,20,0.38)]"
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  )
}

function G2BadgeGrid() {
  return (
    <div className="mx-auto grid w-full max-w-[340px] grid-cols-2 gap-2.5 sm:gap-3">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex min-h-[72px] flex-col items-center justify-center gap-1 rounded-xl border border-[rgba(15,15,20,0.1)] bg-white px-3 py-3 text-center shadow-sm"
        >
          <span className="text-[12px] font-semibold text-[#0f0f14]">G2</span>
          <span className="flex items-center justify-center gap-0.5 text-[#6161FF]" aria-hidden>
            {[0, 1, 2, 3].map((s) => (
              <Star key={s} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
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
 * Single merged customer-proof band: headline, logo marquees, testimonial + G2 / stat column
 * (aligned with [ministite.vercel.app](https://ministite.vercel.app/) social proof layout).
 */
export function CustomerProofBlock() {
  return (
    <div className="rounded-[28px] border border-[rgba(15,15,20,0.06)] bg-[#faf8fc] px-4 py-12 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] md:px-10 md:py-14">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <h2 className="text-[22px] font-semibold leading-snug tracking-[-0.02em] text-[#0c0c0f] md:text-[28px]">
          Join 250,000+ teams who rely on monday to reach their goals
        </h2>
      </motion.div>

      <div className="group mt-8 border-y border-[rgba(15,15,20,0.06)] bg-white/50">
        <LogoMarqueeRow names={LOGO_ROW_TOP} />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 lg:items-center">
        <motion.article
          className="relative rounded-2xl border border-[rgba(15,15,20,0.08)] bg-white p-6 shadow-[0_16px_48px_rgba(15,15,20,0.07)] md:p-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
        >
          <TextQuote className="mb-4 h-9 w-9 text-[#6161FF]" strokeWidth={1.75} aria-hidden />
          <blockquote className="text-[17px] font-medium italic leading-relaxed text-[#0f0f14] md:text-[19px] md:leading-snug">
            {DEFAULT_QUOTE.quote}
          </blockquote>
          <div className="mt-6 text-[14px] text-[rgba(15,15,20,0.55)]">
            <p className="font-semibold text-[#0f0f14]">{DEFAULT_QUOTE.name}</p>
            <p className="mt-0.5">{DEFAULT_QUOTE.titleLine}</p>
          </div>
        </motion.article>

        <motion.div
          className="flex flex-col justify-center lg:pl-2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
        >
          <p className="text-[56px] font-bold leading-none tracking-tight text-[#0f0f14] md:text-[64px]">
            50<span className="text-[32px] font-semibold text-[rgba(15,15,20,0.35)]">%</span>
          </p>
          <p className="mt-2 text-[15px] font-semibold text-[#0f0f14] md:text-[16px]">faster project delivery</p>
          <p className="mt-6 text-[14px] font-semibold leading-snug text-[#0f0f14] md:text-[15px]">
            Most popular work management software on G2
          </p>
          <p className="mt-1 max-w-[360px] text-[13px] leading-relaxed text-[rgba(15,15,20,0.55)]">
            Backed by 14K+ customer reviews.
          </p>
          <div className="mt-6">
            <G2BadgeGrid />
          </div>
        </motion.div>
      </div>

      <div className="group mt-10 border-y border-[rgba(15,15,20,0.06)] bg-white/50">
        <LogoMarqueeRow names={LOGO_ROW_BOTTOM} />
      </div>

      <p className="mt-8 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-[rgba(15,15,20,0.4)]">
        Enterprise-ready AI work platform
      </p>
    </div>
  )
}
