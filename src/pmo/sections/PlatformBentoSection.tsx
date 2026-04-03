import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, Plus, X } from 'lucide-react'
import { ComplianceBadgeGrid } from '../components/ComplianceBadgeGrid'
import { SectionChip } from '../components/SectionChip'
import { mondayGartnerApmrGraphic } from '../constants/mondayVisuals'
import { springSoft } from '../motion'

/** 3D flip easing: avoid spring overshoot on rotateY */
const flipEase: [number, number, number, number] = [0.22, 1, 0.36, 1]
const flipDuration = 0.4

/** Shared with the hero image so it matches flip-card height */
const bentoFlipMinHeightClass =
  'min-h-[200px] md:min-h-[220px] lg:min-h-[240px]'

/**
 * Platform differentiators bento (interactive cards + hero image + analyst proof row),
 * inspired by [ministite.vercel.app](https://ministite.vercel.app/) layout patterns.
 */
type BentoItem = {
  id: string
  title: string
  body: string
  footer: ReactNode
}

const interactiveItems: BentoItem[] = [
  {
    id: 'teams-use',
    title: 'Teams actually use it',
    body: 'Intuitive enough to adopt. Flexible enough to make your own.',
    footer: (
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-md border border-[rgba(15,15,20,0.1)] bg-[#fafafa] px-2.5 py-1 text-[12px] font-semibold text-[#0f0f14]">
          G2
        </span>
        <span className="text-[13px] font-medium text-[rgba(15,15,20,0.5)]">Highest Adoption · Winter 2025</span>
      </div>
    ),
  },
  {
    id: 'one-place',
    title: 'One place, full picture',
    body:
      'Your data, your tools, your teams, all connected in one place. So your people and agents never work in the dark.',
    footer: (
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="flex flex-col items-center justify-center rounded-[12px] border border-[rgba(15,15,20,0.1)] bg-white px-2 py-4 text-center shadow-sm">
          <span className="text-[20px] font-bold leading-tight tracking-tight text-[#0f0f14] md:text-[22px]">Open API</span>
        </div>
        <div className="flex flex-col items-center justify-center rounded-[12px] border border-[rgba(15,15,20,0.1)] bg-white px-2 py-4 text-center shadow-sm">
          <span className="text-[28px] font-bold tabular-nums leading-none tracking-tight text-[#0f0f14] md:text-[32px]">
            200+
          </span>
          <span className="mt-1.5 text-[12px] font-semibold leading-snug text-[rgba(15,15,20,0.55)]">integrations</span>
        </div>
      </div>
    ),
  },
  {
    id: 'enterprise-ready',
    title: 'Enterprise-ready out of the box',
    body:
      'The security and governance controls your IT team will approve. Built in, not bolted on.',
    footer: <ComplianceBadgeGrid />,
  },
  {
    id: 'any-industry',
    title: 'Made for any project, any industry',
    body: 'Whatever your team delivers, monday is built for it.',
    footer: (
      <p className="text-[13px] leading-relaxed text-[rgba(15,15,20,0.62)] md:text-[14px]">
        200+ use cases. 190 industries. Thousands of teams like yours already on monday.
      </p>
    ),
  },
]

/**
 * Flip card: front = claim (title + body); back = proof (badges, stats, lists). Selected card is
 * flipped (rotateY) and drives the hero image.
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
          className="group w-full cursor-pointer rounded-[12px] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#6161FF] focus-visible:ring-offset-2"
        >
          <motion.div
            className={`relative w-full [transform-style:preserve-3d] ${bentoFlipMinHeightClass}`}
            initial={false}
            animate={{ rotateY: active ? 180 : 0 }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: flipDuration, ease: flipEase }
            }
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front: claim (headline + supporting copy) */}
            <div
              aria-hidden={active}
              className={`absolute inset-0 flex flex-col rounded-[12px] border bg-white p-4 shadow-[0_4px_24px_rgba(15,15,20,0.05)] [backface-visibility:hidden] md:p-5 ${
                active
                  ? ''
                  : 'border-[rgba(15,15,20,0.08)] transition-[border-color,box-shadow] duration-300 hover:border-[rgba(97,97,255,0.35)] hover:shadow-[0_6px_32px_rgba(97,97,255,0.14)]'
              }`}
              style={{ transform: 'rotateY(0deg)', WebkitBackfaceVisibility: 'hidden' }}
            >
              <div>
                <div className="flex items-start justify-between gap-2 md:gap-3">
                  <h3 className="min-w-0 flex-1 text-left text-[14px] font-semibold leading-snug tracking-[-0.02em] text-[#0c0c0f] md:text-[15px]">
                    {item.title}
                  </h3>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(15,15,20,0.08)] bg-white text-[rgba(15,15,20,0.42)] shadow-sm transition-colors group-hover:border-[rgba(15,15,20,0.14)]"
                    aria-hidden
                  >
                    <Plus className="h-4 w-4" strokeWidth={2} />
                  </span>
                </div>
                <p className="mt-2.5 whitespace-pre-line text-[13px] leading-relaxed text-[rgba(15,15,20,0.58)] md:mt-3 md:text-[14px]">
                  {item.body}
                </p>
              </div>
            </div>

            {/* Back: proof (badges, stats, evidence only) */}
            <div
              aria-hidden={!active}
              className="absolute inset-0 flex flex-col rounded-[12px] border border-[rgba(97,97,255,0.35)] bg-[#f9f8ff] p-4 shadow-[0_8px_40px_rgba(97,97,255,0.14)] [backface-visibility:hidden] md:p-5"
              style={{ transform: 'rotateY(180deg)', WebkitBackfaceVisibility: 'hidden' }}
            >
              <div className="flex shrink-0 justify-end">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#6161FF]/35 bg-white text-[#6161FF] shadow-sm"
                  aria-hidden
                >
                  <X className="h-4 w-4" strokeWidth={2} />
                </span>
              </div>
              <div className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto pt-1 text-left">
                {item.footer}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function ProofFlipCard({
  title,
  claimBody,
  proof,
}: {
  title: string
  claimBody: ReactNode
  proof: ReactNode
}) {
  const [flipped, setFlipped] = useState(false)
  const reduceMotion = useReducedMotion()

  const toggle = () => setFlipped((f) => !f)

  return (
    <div className="[perspective:1200px]">
      <div
        tabIndex={0}
        role="group"
        aria-label={flipped ? `${title}: showing proof. Activate to show claim.` : `${title}: showing claim. Activate to show proof.`}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggle()
          }
        }}
        className="cursor-pointer rounded-[12px] outline-none focus-visible:ring-2 focus-visible:ring-[#6161FF] focus-visible:ring-offset-2"
      >
        <motion.div
          className="relative min-h-[280px] w-full [transform-style:preserve-3d] md:min-h-[300px] lg:min-h-[320px]"
          initial={false}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: flipDuration, ease: flipEase }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front: claim */}
          <div
            aria-hidden={flipped}
            className="absolute inset-0 flex flex-col rounded-[12px] border border-[rgba(15,15,20,0.08)] bg-white p-4 shadow-[0_4px_24px_rgba(15,15,20,0.05)] [backface-visibility:hidden] md:p-5"
            style={{ transform: 'rotateY(0deg)', WebkitBackfaceVisibility: 'hidden' }}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="min-w-0 flex-1 text-[15px] font-semibold leading-snug tracking-[-0.02em] text-[#0c0c0f] md:text-[16px]">
                {title}
              </h3>
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(15,15,20,0.08)] bg-white text-[rgba(15,15,20,0.42)]"
                aria-hidden
              >
                <Plus className="h-4 w-4" strokeWidth={2} />
              </span>
            </div>
            <div className="mt-2.5 flex-1 text-[12px] leading-relaxed text-[rgba(15,15,20,0.55)] md:text-[13px]">{claimBody}</div>
          </div>

          {/* Back: proof */}
          <div
            aria-hidden={!flipped}
            className="absolute inset-0 flex flex-col rounded-[12px] border border-[rgba(97,97,255,0.28)] bg-[#f9f8ff] p-4 shadow-[0_8px_40px_rgba(97,97,255,0.1)] [backface-visibility:hidden] md:p-5"
            style={{ transform: 'rotateY(180deg)', WebkitBackfaceVisibility: 'hidden' }}
          >
            <div className="flex shrink-0 justify-end">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#6161FF]/35 bg-white text-[#6161FF] shadow-sm"
                aria-hidden
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </span>
            </div>
            <div className="mt-2 flex min-h-0 flex-1 flex-col justify-center overflow-y-auto text-left">{proof}</div>
          </div>
        </motion.div>
      </div>
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
      className="scroll-mt-24 bg-[rgba(244,244,245,0.65)] px-4 py-8 backdrop-blur-[1px] md:px-8 md:py-10 lg:px-12"
    >
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-5 md:mb-6">
          <div className="mb-2 flex justify-start">
            <SectionChip>Why monday.com</SectionChip>
          </div>
          <h2 className="max-w-[min(100%,40rem)] text-pretty text-left text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0c0c0f] md:text-[44px] lg:text-[48px]">
            Why choose monday.com to run your projects?
          </h2>
        </div>

        {/* Interactive bento: selection updates the large product visual */}
        <div className="flex flex-col gap-2 md:gap-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-3">
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
            <BentoCard
              item={interactiveItems[2]}
              active={active === 2}
              onSelect={() => setActive(2)}
            />
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-3">
            <div
              className={`relative overflow-hidden rounded-[12px] border border-[rgba(15,15,20,0.08)] bg-white shadow-[0_8px_40px_rgba(15,15,20,0.06)] md:col-span-2 ${bentoFlipMinHeightClass}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  aria-hidden
                  className={`h-full w-full bg-gradient-to-br from-[#f4f4f8] via-white to-[rgba(97,97,255,0.1)] ${bentoFlipMinHeightClass}`}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99, y: -8 }}
                  transition={springSoft}
                />
              </AnimatePresence>
            </div>
            <BentoCard
              item={interactiveItems[3]}
              active={active === 3}
              onSelect={() => setActive(3)}
            />
          </div>
        </div>

        {/* Analyst & research proof row: flip cards claim (front) / proof (back) */}
        <div className="mt-3 grid grid-cols-1 gap-2 md:mt-4 md:grid-cols-2 md:gap-3">
          <ProofFlipCard
            title="Leader in the Gartner Magic Quadrant for Adaptive Project Management and Reporting"
            claimBody={
              <p>
                A Leader in the 2025 Gartner Magic Quadrant for Adaptive Project Management and Reporting, four years
                running.
              </p>
            }
            proof={
              <>
                <div className="overflow-hidden rounded-xl border border-[rgba(15,15,20,0.08)] bg-[#fafafa]">
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
                  className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-[#6161FF] hover:text-[#5050e6] md:text-[14px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  Get the report <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </>
            }
          />

          <ProofFlipCard
            title="Recognized by industry leaders"
            claimBody={
              <p>
                Forrester&apos;s Total Economic Impact study validates significant ROI for monday.com customers.
              </p>
            }
            proof={
              <>
                <p className="text-[30px] font-bold leading-none tracking-tight text-[#6161FF] md:text-[34px]">
                  346%
                </p>
                <p className="mt-1.5 text-[12px] font-medium leading-snug text-[rgba(15,15,20,0.55)] md:text-[13px]">
                  ROI in the Total Economic Impact Study of monday.com
                </p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgba(15,15,20,0.45)] md:text-[12px]">
                  Forrester
                </p>
              </>
            }
          />
        </div>
      </div>
    </section>
  )
}
