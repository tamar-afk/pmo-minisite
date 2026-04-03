import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { pageEase } from '../motion'

type BrandId = 'mcd' | 'holt' | 'canva' | 'vistra' | 'umg'

export type Outcome = {
  id: string
  brand: BrandId
  imageSrc: string
  imageAlt: string
  target: number
  format: 'percent' | 'k' | 'plain'
  headline: string
  /** Project / program context (pill) */
  tag: string
  href: string
}

/** Project-delivery focused metrics (case studies band). */
export const outcomes: Outcome[] = [
  {
    id: '1',
    brand: 'mcd',
    imageSrc:
      'https://images.unsplash.com/photo-1561758033-d89a0ac29bca?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Store rollout program',
    target: 615,
    format: 'percent',
    headline: 'Return on investment',
    tag: 'Retail & CPG',
    href: 'https://monday.com/customer-stories',
  },
  {
    id: '2',
    brand: 'holt',
    imageSrc:
      'https://images.unsplash.com/photo-1581092160562-40aa08e66837?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Equipment and field projects',
    target: 105,
    format: 'k',
    headline: 'Hours saved annually',
    tag: 'Manufacturing',
    href: 'https://monday.com/customer-stories',
  },
  {
    id: '3',
    brand: 'canva',
    imageSrc:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Cross-functional project team',
    target: 300,
    format: 'percent',
    headline: 'Saved yearly to reinvest',
    tag: 'Advertising',
    href: 'https://monday.com/customer-stories',
  },
  {
    id: '4',
    brand: 'vistra',
    imageSrc:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Enterprise program office',
    target: 28,
    format: 'percent',
    headline: 'Faster time to market',
    tag: 'Technology',
    href: 'https://monday.com/customer-stories',
  },
  {
    id: '5',
    brand: 'umg',
    imageSrc:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Music and entertainment projects',
    target: 517,
    format: 'percent',
    headline: 'Growth in annual accounts',
    tag: 'Entertainment',
    href: 'https://monday.com/customer-stories',
  },
]

function formatMetricValue(value: number, o: Outcome): string {
  if (o.format === 'percent') return `${Math.round(value)}%`
  if (o.format === 'k') return `${Math.round(value)}K`
  return String(Math.round(value))
}

function BrandLogo({ brand }: { brand: BrandId }) {
  switch (brand) {
    case 'mcd':
      return (
        <span className="inline-flex items-center gap-1 text-[18px] font-black leading-none tracking-tight text-[#222]">
          <span className="flex h-8 w-8 items-center justify-center rounded bg-[#FFC72C] text-[20px] text-[#222]">
            M
          </span>
          <span className="hidden min-[340px]:inline sm:inline">cDonald&apos;s</span>
        </span>
      )
    case 'holt':
      return (
        <span className="text-[13px] font-black uppercase leading-none tracking-wide">
          <span className="text-[#222]">Holt </span>
          <span className="text-[#f5a623]">Cat</span>
        </span>
      )
    case 'canva':
      return (
        <span
          className="bg-gradient-to-r from-[#00C4CC] to-[#7B61FF] bg-clip-text text-[20px] font-bold leading-none text-transparent"
          style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
        >
          Canva
        </span>
      )
    case 'vistra':
      return <span className="text-[15px] font-bold uppercase tracking-[0.06em] text-[#005eb8]">Vistra</span>
    case 'umg':
      return (
        <span className="max-w-[140px] text-[11px] font-bold uppercase leading-tight tracking-[0.06em] text-[#0f0f14]">
          Universal Music Group
        </span>
      )
  }
}

function useCountUp(target: number, active: boolean, durationMs = 800) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - (1 - t) ** 3
      setValue(target * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
      else setValue(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, durationMs])
  return value
}

export function OutcomeCard({
  outcome,
  className = '',
}: {
  outcome: Outcome
  className?: string
}) {
  const ref = useRef<HTMLElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const animated = useCountUp(outcome.target, inView)
  const metric = formatMetricValue(animated, outcome)

  return (
    <article
      ref={ref}
      data-cursor-interactive
      className={`flex w-full max-w-[320px] shrink-0 flex-col overflow-hidden rounded-[12px] border border-[#e8e8f0] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[rgba(97,97,255,0.3)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] ${className}`}
    >
      <div className="flex items-center justify-between gap-3 px-4 pt-4">
        <div className="min-w-0">
          <BrandLogo brand={outcome.brand} />
        </div>
        <a
          href={outcome.href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[12px] font-semibold text-[#0f0f14] underline decoration-[rgba(15,15,20,0.35)] underline-offset-2 transition-colors hover:text-[#6161FF] hover:decoration-[#6161FF]"
        >
          See the case study
        </a>
      </div>

      <div className="mt-3 px-4">
        <div className="overflow-hidden rounded-[12px] bg-[#f0f0f2]">
          <img
            src={outcome.imageSrc}
            alt={outcome.imageAlt}
            className="aspect-[4/3] h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="flex flex-col gap-0 px-4 pt-4">
        <span className="min-h-[1.1em] text-[56px] font-bold leading-[1] tracking-tight text-[#6161ff] tabular-nums md:text-[60px]">
          {inView ? metric : outcome.format === 'percent' ? '0%' : outcome.format === 'k' ? '0K' : '0'}
        </span>
        <p className="mt-3 text-[14px] font-normal leading-[1.5] text-[rgba(107,107,138,0.6)]">
          {outcome.headline}
        </p>
      </div>

      <div className="mx-4 my-4 h-px bg-[rgba(15,15,20,0.08)]" />

      <div className="px-4 pb-4">
        <span className="inline-block rounded-md bg-[#e8ebf2] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-[rgba(15,15,20,0.65)]">
          {outcome.tag}
        </span>
      </div>
    </article>
  )
}

/**
 * Manual carousel (no infinite loop): slides 300ms with global easing.
 */
export function CaseStudiesProofCarousel({ className = '' }: { className?: string }) {
  const n = outcomes.length
  const [idx, setIdx] = useState(0)

  const go = (dir: -1 | 1) => {
    setIdx((i) => {
      const next = i + dir
      if (next < 0) return n - 1
      if (next >= n) return 0
      return next
    })
  }

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden rounded-[12px] py-1">
        <motion.div
          className="flex"
          style={{ width: `${n * 100}%` }}
          animate={{ x: `${-(idx * 100) / n}%` }}
          transition={{ duration: 0.3, ease: pageEase }}
        >
          {outcomes.map((o) => (
            <div
              key={o.id}
              className="box-border flex shrink-0 justify-center px-3"
              style={{ width: `${100 / n}%` }}
            >
              <OutcomeCard outcome={o} className="max-w-[min(320px,100%)]" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          data-cursor-interactive
          aria-label="Previous case study"
          onClick={() => go(-1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(12,12,15,0.12)] bg-white text-[#0c0c0f] shadow-sm transition-[border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[rgba(97,97,255,0.35)] hover:shadow-[0_4px_16px_rgba(97,97,255,0.12)]"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>
        <div className="flex gap-1.5" aria-hidden>
          {outcomes.map((o, i) => (
            <button
              key={o.id}
              type="button"
              data-cursor-interactive
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === idx}
              onClick={() => setIdx(i)}
              className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                i === idx ? 'bg-[#6161ff]' : 'bg-[rgba(12,12,15,0.2)] hover:bg-[rgba(12,12,15,0.35)]'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          data-cursor-interactive
          aria-label="Next case study"
          onClick={() => go(1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(12,12,15,0.12)] bg-white text-[#0c0c0f] shadow-sm transition-[border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[rgba(97,97,255,0.35)] hover:shadow-[0_4px_16px_rgba(97,97,255,0.12)]"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>
      </div>
    </div>
  )
}

/** Optional standalone section. */
export function CustomerOutcomesSection() {
  return (
    <section
      id="customer-outcomes"
      className="scroll-mt-24 border-t border-[rgba(12,12,15,0.06)] bg-white/75 px-0 py-6 backdrop-blur-[1px] md:py-8"
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-[1100px] text-left">
          <h2 className="text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0c0c0f] md:text-[44px] lg:text-[48px]">
            Real customers. Real outcomes.
          </h2>
        </div>
      </div>

      <CaseStudiesProofCarousel className="mt-6 md:mt-7" />
    </section>
  )
}
