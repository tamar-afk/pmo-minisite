type BrandId = 'mcd' | 'holt' | 'canva' | 'vistra' | 'lionsgate' | 'forrester'

type Outcome = {
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

/** Project-delivery focused metrics; carousel duplicates the row for a seamless loop. */
const outcomes: Outcome[] = [
  {
    id: '1',
    brand: 'mcd',
    imageSrc:
      'https://images.unsplash.com/photo-1561758033-d89a0ac29bca?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Store rollout program',
    target: 615,
    format: 'percent',
    headline: 'ROI on portfolio programs',
    tag: 'Program delivery',
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
    headline: 'Project coordination hours saved',
    tag: 'Capital projects',
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
    headline: 'More initiatives delivered per year',
    tag: 'Product & marketing project management',
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
    headline: 'Faster project time-to-market',
    tag: 'Technology programs',
    href: 'https://monday.com/customer-stories',
  },
  {
    id: '5',
    brand: 'lionsgate',
    imageSrc:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Production and release projects',
    target: 517,
    format: 'percent',
    headline: 'Growth in active greenlit projects',
    tag: 'Creative operations',
    href: 'https://monday.com/customer-stories',
  },
  {
    id: '6',
    brand: 'forrester',
    imageSrc:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Project governance workshop',
    target: 346,
    format: 'percent',
    headline: 'ROI on PM & project operations',
    tag: 'Total Economic Impact',
    href: 'https://monday.com/customer-stories',
  },
]

function formatMetric(o: Outcome): string {
  if (o.format === 'percent') return `${o.target}%`
  if (o.format === 'k') return `${o.target}K`
  return String(o.target)
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
    case 'lionsgate':
      return (
        <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#0f0f14]">Lionsgate</span>
      )
    case 'forrester':
      return (
        <span className="text-[14px] font-semibold italic text-[#0f0f14]">
          Forrester<span className="text-[#e85d04]">®</span>
        </span>
      )
  }
}

function OutcomeCard({ outcome }: { outcome: Outcome }) {
  const metric = formatMetric(outcome)

  return (
    <article className="flex w-[min(280px,calc(100vw-3rem))] shrink-0 flex-col overflow-hidden rounded-2xl border border-[rgba(15,15,20,0.08)] bg-white shadow-[0_4px_24px_rgba(15,15,20,0.06)]">
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
        <div className="overflow-hidden rounded-xl bg-[#f0f0f2]">
          <img
            src={outcome.imageSrc}
            alt={outcome.imageAlt}
            className="aspect-[4/3] h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="flex items-start gap-3 px-4 pt-4">
        <span className="shrink-0 text-[32px] font-bold leading-none tracking-tight text-[#0f0f14] tabular-nums md:text-[36px]">
          {metric}
        </span>
        <p className="min-w-0 flex-1 pt-0.5 text-[14px] font-semibold leading-snug text-[#0f0f14] md:text-[15px]">
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

export function CustomerOutcomesSection() {
  return (
    <section
      id="customer-outcomes"
      className="scroll-mt-24 border-t border-[rgba(12,12,15,0.06)] bg-white px-0 py-6 md:py-8"
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-[1100px] text-center">
          <h2 className="text-[15px] font-semibold leading-snug tracking-[-0.02em] text-[#0c0c0f] sm:text-[16px] md:text-[17px] lg:text-[18px]">
            Real customers, real business outcomes
          </h2>
        </div>
      </div>

      <div className="group relative mt-6 w-full md:mt-7">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent md:w-20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent md:w-20"
          aria-hidden
        />
        <div className="overflow-hidden py-1 [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="animate-outcomes-carousel flex w-max gap-4 will-change-transform">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex gap-4">
                {outcomes.map((o) => (
                  <OutcomeCard key={`${dup}-${o.id}`} outcome={o} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
