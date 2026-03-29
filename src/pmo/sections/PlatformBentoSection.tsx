import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, Plus, X } from 'lucide-react'
import { mondayGartnerApmrGraphic } from '../constants/mondayVisuals'
import { springSoft } from '../motion'

/** 3D flip easing — avoid spring overshoot on rotateY */
const flipEase: [number, number, number, number] = [0.22, 1, 0.36, 1]
const flipDuration = 0.65

/**
 * Platform differentiators bento (interactive cards + hero image + analyst proof row),
 * inspired by [ministite.vercel.app](https://ministite.vercel.app/) layout patterns.
 */
type BentoItem = {
  id: string
  title: string
  body: string
  imageSrc: string
  imageAlt: string
  footer: ReactNode
}

const interactiveItems: BentoItem[] = [
  {
    id: 'adoption',
    title: 'Ease of use that drives proven adoption',
    body:
      'Hyper-personalization and intuitive design drive the adoption rates that give you a complete picture of work.',
    imageSrc: '/images/why-monday-team.jpg',
    imageAlt: 'Teams collaborating with monday work management',
    footer: (
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-md border border-[rgba(15,15,20,0.1)] bg-[#fafafa] px-2.5 py-1 text-[11px] font-semibold text-[#0f0f14]">
          G2
        </span>
        <span className="text-[11px] font-medium text-[rgba(15,15,20,0.45)]">Highest Adoption · Winter 2025</span>
      </div>
    ),
  },
  {
    id: 'expertise',
    title: 'Expertise built on real-world work',
    body:
      'AI capabilities informed by 250K+ customers across industries and the patterns of the world’s most productive teams.',
    imageSrc: '/images/why-monday-team.jpg',
    imageAlt: 'Teams collaborating with monday work management',
    footer: (
      <div className="mt-4 space-y-2">
        <div className="flex flex-wrap gap-3 text-[12px]">
          <span>
            <span className="font-bold text-[#0c0c0f]">250K+</span>{' '}
            <span className="text-[rgba(15,15,20,0.5)]">customers</span>
          </span>
          <span>
            <span className="font-bold text-[#0c0c0f]">190+</span>{' '}
            <span className="text-[rgba(15,15,20,0.5)]">industries</span>
          </span>
        </div>
        <p className="text-[11px] leading-snug text-[rgba(15,15,20,0.45)]">
          From startups to enterprises, worldwide
        </p>
      </div>
    ),
  },
  {
    id: 'context',
    title: 'Deep understanding of your business',
    body:
      'Unifies your data, work context, and institutional knowledge into a single intelligence layer for people and agents.',
    imageSrc: '/images/why-monday-team.jpg',
    imageAlt: 'People and teams using monday work management across the business',
    footer: (
      <ul className="mt-4 space-y-2.5">
        <li className="border-b border-[rgba(15,15,20,0.06)] pb-2">
          <p className="text-[12px] font-semibold text-[#0c0c0f]">200+ integrations</p>
          <p className="text-[11px] text-[rgba(15,15,20,0.45)]">Connect your entire stack</p>
        </li>
        <li className="border-b border-[rgba(15,15,20,0.06)] pb-2">
          <p className="text-[12px] font-semibold text-[#0c0c0f]">REST API</p>
          <p className="text-[11px] text-[rgba(15,15,20,0.45)]">Build on top of monday</p>
        </li>
        <li>
          <p className="text-[12px] font-semibold text-[#0c0c0f]">MCP support</p>
          <p className="text-[11px] text-[rgba(15,15,20,0.45)]">Native AI agent protocol</p>
        </li>
      </ul>
    ),
  },
  {
    id: 'enterprise',
    title: 'Enterprise control without compromise',
    body:
      'Trusted by the world’s most complex organizations, with the permissions, approval gates, and governance to prove it.',
    imageSrc: '/images/why-monday-team.jpg',
    imageAlt: 'Enterprise teams using monday work management',
    footer: (
      <div className="mt-4">
        <p className="text-[28px] font-bold leading-none tracking-tight text-[#0c0c0f] md:text-[32px]">
          70<span className="text-[rgba(15,15,20,0.35)]">%</span>
        </p>
        <p className="mt-1 text-[12px] leading-snug text-[rgba(15,15,20,0.5)]">
          of the Fortune 500 <span className="text-[rgba(15,15,20,0.65)]">run on monday</span>
        </p>
      </div>
    ),
  },
]

/**
 * Flip card: front = title + expand; back = full copy + footer. Selected card is flipped (rotateY)
 * and drives the hero image.
 */
function BentoCard({
  item,
  active,
  onSelect,
}: {
  item: BentoItem
  active: boolean
  onSelect: () => void
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div layout transition={springSoft} className="w-full">
      <div className="[perspective:1200px]">
        <div
          role="button"
          tabIndex={0}
          aria-pressed={active}
          onClick={onSelect}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onSelect()
            }
          }}
          className="group w-full cursor-pointer rounded-[24px] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#6161FF] focus-visible:ring-offset-2"
        >
          <motion.div
            className="relative min-h-[300px] w-full [transform-style:preserve-3d] md:min-h-[340px] lg:min-h-[360px]"
            initial={false}
            animate={{ rotateY: active ? 180 : 0 }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: flipDuration, ease: flipEase }
            }
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front — teaser only */}
            <div
              aria-hidden={active}
              className={`absolute inset-0 flex flex-col justify-center rounded-[24px] border bg-white p-5 shadow-[0_4px_24px_rgba(15,15,20,0.05)] [backface-visibility:hidden] md:p-6 ${
                active
                  ? ''
                  : 'border-[rgba(15,15,20,0.08)] transition-[border-color,box-shadow] duration-300 hover:border-[rgba(15,15,20,0.12)]'
              }`}
              style={{ transform: 'rotateY(0deg)', WebkitBackfaceVisibility: 'hidden' }}
            >
              <div className="flex items-center justify-between gap-3 rounded-full border border-[rgba(15,15,20,0.09)] bg-[#fafafa] px-4 py-3 shadow-sm transition-colors duration-300 group-hover:border-[rgba(15,15,20,0.14)] md:gap-4 md:px-5 md:py-3.5">
                <h3 className="min-w-0 flex-1 text-left text-[15px] font-semibold leading-snug tracking-[-0.02em] text-[#0c0c0f] md:text-[16px]">
                  {item.title}
                </h3>
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(15,15,20,0.08)] bg-white text-[rgba(15,15,20,0.42)] shadow-sm transition-colors group-hover:border-[rgba(15,15,20,0.14)]"
                  aria-hidden
                >
                  <Plus className="h-[18px] w-[18px]" strokeWidth={2} />
                </span>
              </div>
            </div>

            {/* Back — full differentiator */}
            <div
              aria-hidden={!active}
              className="absolute inset-0 flex flex-col rounded-[24px] border border-[rgba(97,97,255,0.35)] bg-white p-5 shadow-[0_8px_40px_rgba(97,97,255,0.14)] [backface-visibility:hidden] md:p-6"
              style={{ transform: 'rotateY(180deg)', WebkitBackfaceVisibility: 'hidden' }}
            >
              <div className="flex items-center justify-between gap-3 rounded-full border border-[#6161FF]/28 bg-[#f3f1ff] px-4 py-3 shadow-sm md:gap-4 md:px-5 md:py-3.5">
                <h3 className="min-w-0 flex-1 text-left text-[15px] font-semibold leading-snug tracking-[-0.02em] text-[#0c0c0f] md:text-[16px]">
                  {item.title}
                </h3>
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#6161FF]/35 bg-white text-[#6161FF] shadow-sm"
                  aria-hidden
                >
                  <X className="h-[18px] w-[18px]" strokeWidth={2} />
                </span>
              </div>
              <div className="mt-5 min-h-0 flex-1 overflow-y-auto px-0.5 md:px-0">
                <p className="text-[14px] leading-relaxed text-[rgba(15,15,20,0.58)] md:text-[15px]">{item.body}</p>
                <div className="text-left">{item.footer}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function ProofCard({
  title,
  children,
  className = '',
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`flex flex-col rounded-[24px] border border-[rgba(15,15,20,0.08)] bg-white p-6 shadow-[0_4px_24px_rgba(15,15,20,0.05)] md:p-7 ${className}`}
    >
      <h3 className="text-[16px] font-semibold leading-snug tracking-[-0.02em] text-[#0c0c0f] md:text-[17px]">{title}</h3>
      <div className="mt-4 flex-1">{children}</div>
    </div>
  )
}

export function PlatformBentoSection() {
  const [active, setActive] = useState(0)
  const current = interactiveItems[active]
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="platform-bento"
      className="scroll-mt-24 bg-[#f4f4f5] px-4 py-16 md:px-8 md:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-10 md:mb-12">
          <h2 className="max-w-[min(100%,40rem)] text-pretty text-[28px] font-semibold leading-tight tracking-[-0.02em] text-[#0c0c0f] md:text-[34px] md:leading-[1.12] lg:text-[36px]">
            Why choose monday.com to run your strategic projects
          </h2>
        </div>

        {/* Interactive bento — selection updates the large product visual */}
        <div className="flex flex-col gap-4 md:gap-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            <BentoCard
              item={interactiveItems[0]}
              active={active === 0}
              onSelect={() => setActive(0)}
            />
            <BentoCard
              item={interactiveItems[1]}
              active={active === 1}
              onSelect={() => setActive(1)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            <div className="relative min-h-[240px] overflow-hidden rounded-[24px] border border-[rgba(15,15,20,0.08)] bg-white shadow-[0_8px_40px_rgba(15,15,20,0.06)] md:col-span-2 md:min-h-[380px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.imageSrc}
                  alt={current.imageAlt}
                  className="h-full min-h-[240px] w-full object-cover object-center md:min-h-[380px]"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99, y: -8 }}
                  transition={springSoft}
                />
              </AnimatePresence>
            </div>
            <BentoCard
              item={interactiveItems[2]}
              active={active === 2}
              onSelect={() => setActive(2)}
            />
          </div>

          <div className="grid grid-cols-1">
            <BentoCard
              item={interactiveItems[3]}
              active={active === 3}
              onSelect={() => setActive(3)}
            />
          </div>
        </div>

        {/* Analyst & research proof row (ministite full section) */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-3 md:gap-5">
          <ProofCard title="Most popular work management software on G2">
            <p className="text-[13px] leading-relaxed text-[rgba(15,15,20,0.55)]">
              Backed by 14K+ customer reviews. Rated by real users as the leader in work management.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[#0f0f14] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                Leader
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[rgba(15,15,20,0.45)]">
                Winter 2026
              </span>
            </div>
            <p className="mt-5 text-[40px] font-bold leading-none tracking-tight text-[#0c0c0f] md:text-[44px]">
              4.7<span className="text-[22px] font-semibold text-[rgba(15,15,20,0.35)]">/5</span>
            </p>
            <p className="mt-2 text-[12px] text-[rgba(15,15,20,0.45)]">Based on 14K+ customer reviews</p>
          </ProofCard>

          <ProofCard title="Leader in Gartner Magic Quadrant for APMR">
            <p className="text-[13px] leading-relaxed text-[rgba(15,15,20,0.55)]">
              Named a Leader in the 2025 Gartner® Magic Quadrant™ for{' '}
              <span className="font-semibold text-[#0c0c0f]">
                Adaptive Project Management and Reporting
              </span>{' '}
              (APMR)—furthest on Completeness of Vision and highest on Ability to Execute, two years running.
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-[rgba(15,15,20,0.08)] bg-[#fafafa]">
              <img
                src={mondayGartnerApmrGraphic}
                alt="Gartner Magic Quadrant for Adaptive Project Management and Reporting, 2025"
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
            <a
              href="https://monday.com/ap/gartner-apmr-2025"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[#6161FF] hover:text-[#5050e6]"
            >
              Get the report <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </ProofCard>

          <ProofCard title="Recognized by industry leaders">
            <p className="text-[13px] leading-relaxed text-[rgba(15,15,20,0.55)]">
              Independent research validates significant ROI for monday.com customers, including Forrester&apos;s Total
              Economic Impact™ study.
            </p>
            <p className="mt-6 text-[36px] font-bold leading-none tracking-tight text-[#6161FF] md:text-[42px]">
              346%
            </p>
            <p className="mt-2 text-[12px] font-medium leading-snug text-[rgba(15,15,20,0.55)]">
              ROI in the Total Economic Impact Study of monday.com
            </p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgba(15,15,20,0.4)]">
              Forrester
            </p>
          </ProofCard>
        </div>
      </div>
    </section>
  )
}
