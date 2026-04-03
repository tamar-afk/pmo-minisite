import { motion } from 'framer-motion'

export type CustomerQuoteSectionProps = {
  eyebrow?: string
  quote?: string
  name?: string
  titleLine?: string
  storyHref?: string
  storyLabel?: string
  /** e.g. “50% faster project delivery”: ministite-style highlight under attribution */
  highlightStat?: string
  /** Use `left` when placed beside G2 / in a split layout */
  textAlign?: 'center' | 'left'
  className?: string
}

const defaultQuote: Required<
  Pick<
    CustomerQuoteSectionProps,
    'eyebrow' | 'quote' | 'name' | 'titleLine' | 'storyHref' | 'storyLabel' | 'highlightStat'
  >
> = {
  eyebrow: 'Customer story · VML',
  quote:
    "monday.com's AI helped us cut our project planning time in half. What used to take days now takes minutes, and that speed has directly translated into faster delivery for our clients.",
  name: 'Sarah Luxemberg',
  titleLine: 'Operations Director, VML',
  storyHref: 'https://monday.com/customers/vml',
  storyLabel: 'Read the full VML story',
  highlightStat: '50% faster project delivery',
}

/**
 * Featured customer quote (aligned with ministite.vercel.app social proof).
 */
export function CustomerQuoteSection(props: CustomerQuoteSectionProps = {}) {
  const {
    eyebrow = defaultQuote.eyebrow,
    quote = defaultQuote.quote,
    name = defaultQuote.name,
    titleLine = defaultQuote.titleLine,
    storyHref = defaultQuote.storyHref,
    storyLabel = defaultQuote.storyLabel,
    highlightStat = defaultQuote.highlightStat,
    textAlign = 'center',
    className = '',
  } = props

  const align = textAlign === 'left' ? 'text-left' : 'text-center'

  return (
    <motion.figure
      className={`mx-auto max-w-[720px] rounded-2xl border border-[rgba(15,15,20,0.1)] bg-[#f9fafb] px-6 py-8 shadow-[0_12px_40px_rgba(15,15,20,0.06)] md:px-10 md:py-10 ${align} ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6161FF]">{eyebrow}</p>
      ) : null}
      <blockquote className="mt-4 text-[18px] font-medium leading-relaxed text-[#0f0f14] md:text-[22px] md:leading-snug">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 text-[14px] text-[rgba(15,15,20,0.55)]">
        <span className="font-semibold text-[#0f0f14]">{name}</span>
        <span className="mx-2 text-[rgba(15,15,20,0.35)]">·</span>
        <span>{titleLine}</span>
      </figcaption>
      {highlightStat ? (
        <p className="mt-4 text-[28px] font-bold tabular-nums leading-none text-[#0f0f14] md:text-[32px]">
          {highlightStat}
        </p>
      ) : null}
      {storyHref && storyLabel ? (
        <a
          href={storyHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex text-[13px] font-semibold text-[#6161FF] underline-offset-4 hover:underline"
        >
          {storyLabel}
        </a>
      ) : null}
    </motion.figure>
  )
}
