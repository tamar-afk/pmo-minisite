import type { ReactElement } from 'react'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionChip } from './SectionChip'
import { pageEase } from '../motion'

const ease = pageEase

type TierCard = {
  id: string
  tierLabel: string
  personaLabel: string
  scenarioHeadline: string
  scenarioBody: string
  featureItems: readonly string[]
  Visual: () => ReactElement
}

/** Product mock only — dark navy frame */
function PortfolioDashboardPlaceholder() {
  return (
    <div
      className="flex h-full min-h-[220px] w-full flex-col overflow-hidden rounded-[12px] border border-[rgba(255,255,255,0.08)] bg-[#0f1419] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
      aria-hidden
    >
      <div className="mb-3 flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[rgba(255,255,255,0.45)]">
          Portfolio health
        </span>
        <span className="text-[9px] text-[rgba(255,255,255,0.4)]">Resource load</span>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {[
          { name: 'North America rollout', dot: 'bg-emerald-400', load: '72%' },
          { name: 'API modernization', dot: 'bg-amber-400', load: '88%' },
          { name: 'CX redesign', dot: 'bg-red-400', load: '95%' },
          { name: 'Data platform', dot: 'bg-emerald-400', load: '61%' },
        ].map((row) => (
          <div
            key={row.name}
            className="flex items-center gap-2 rounded-lg bg-[rgba(255,255,255,0.04)] px-2 py-2 sm:px-3 sm:py-2.5"
          >
            <span className={`h-2 w-2 shrink-0 rounded-full ${row.dot}`} />
            <span className="min-w-0 flex-1 truncate text-[10px] font-medium text-[rgba(255,255,255,0.82)] sm:text-[11px]">
              {row.name}
            </span>
            <span className="shrink-0 rounded border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] px-1.5 py-0.5 font-mono text-[9px] tabular-nums text-[rgba(255,255,255,0.65)]">
              {row.load}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function GanttPlaceholder() {
  return (
    <div
      className="flex h-full min-h-[220px] w-full gap-2 overflow-hidden rounded-[12px] border border-[#e8e8f0] bg-[#fafbff] p-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)] sm:gap-3 sm:p-4"
      aria-hidden
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mb-2 flex gap-1 border-b border-[#e8e8f0] pb-2">
          {['W1', 'W2', 'W3', 'W4'].map((w) => (
            <span key={w} className="flex-1 text-center text-[8px] font-medium text-[#6b6b8a] sm:text-[9px]">
              {w}
            </span>
          ))}
        </div>
        <div className="relative flex flex-1 flex-col justify-center gap-3 py-1">
          <div className="relative h-7 sm:h-8">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-[#e8e8f0]" />
            <div className="absolute left-[6%] top-1/2 h-2.5 w-[30%] -translate-y-1/2 rounded bg-[#e0e4f5] sm:h-3" />
            <div className="absolute left-[38%] top-1/2 h-2.5 w-[24%] -translate-y-1/2 rounded border-2 border-[#6161ff] bg-[rgba(97,97,255,0.12)] sm:h-3" />
            <div className="absolute left-[64%] top-1/2 h-2.5 w-[26%] -translate-y-1/2 rounded bg-[#e0e4f5] sm:h-3" />
          </div>
          <div className="relative h-7 sm:h-8">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-[#e8e8f0]" />
            <div className="absolute left-[16%] top-1/2 h-2.5 w-[38%] -translate-y-1/2 rounded bg-[#e0e4f5] sm:h-3" />
            <div className="absolute left-[56%] top-[12%] h-[calc(100%+10px)] w-px bg-[#6161ff]/45" />
            <div className="absolute left-[56%] top-1/2 h-2.5 w-[32%] -translate-y-1/2 rounded bg-[#e0e4f5] opacity-80 sm:h-3" />
          </div>
        </div>
      </div>
      <div className="flex w-[72px] shrink-0 flex-col gap-1.5 rounded-lg border border-[#e8e8f0] bg-white p-2 sm:w-[88px]">
        <span className="text-[8px] font-semibold uppercase tracking-wide text-[#6b6b8a] sm:text-[9px]">Suggested</span>
        <div className="rounded border border-[rgba(97,97,255,0.2)] bg-[rgba(97,97,255,0.06)] px-1 py-1 text-[8px] font-medium leading-tight text-[#0a0a0f] sm:text-[9px]">
          A. Lee
        </div>
        <div className="rounded border border-[#e8e8f0] px-1 py-1 text-[8px] text-[#6b6b8a] sm:text-[9px]">M. Chen</div>
      </div>
    </div>
  )
}

function TaskBoardPlaceholder() {
  return (
    <div
      className="flex h-full min-h-[220px] w-full flex-col gap-3 overflow-hidden rounded-[12px] border border-[#e8e8f0] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
      aria-hidden
    >
      <div className="flex gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-lg bg-[#f8f8ff] p-2">
          <span className="text-[9px] font-semibold uppercase tracking-wide text-[#6b6b8a]">In progress</span>
          {[
            { t: 'API contract', o: 'Sam', p: 'P1' },
            { t: 'Design QA', o: 'Jordan', p: 'P2' },
          ].map(({ t, o, p }) => (
            <div key={t} className="flex items-center justify-between gap-2 rounded-md border border-[#e8e8f0] bg-white px-2 py-1.5 text-[10px] text-[#0a0a0f]">
              <span className="min-w-0 truncate font-medium">{t}</span>
              <span className="shrink-0 text-[9px] text-[#6b6b8a]">
                {o} · {p}
              </span>
            </div>
          ))}
        </div>
        <div className="flex w-[42%] max-w-[140px] shrink-0 flex-col gap-2 rounded-lg border border-[rgba(97,97,255,0.25)] bg-[rgba(97,97,255,0.06)] p-2">
          <span className="text-[9px] font-semibold uppercase tracking-wide text-[#6161ff]">Agent</span>
          <p className="text-[9px] leading-snug text-[#0a0a0f] sm:text-[10px]">
            Nudged overdue owner · rebalanced capacity
          </p>
          <div className="mt-auto h-1.5 rounded-full bg-[rgba(97,97,255,0.2)]" />
        </div>
      </div>
    </div>
  )
}

const TIERS: TierCard[] = [
  {
    id: 'portfolios',
    tierLabel: 'Portfolios',
    personaLabel: 'Portfolio leads',
    scenarioHeadline: 'See all of your projects from one place.',
    scenarioBody:
      'Status, health, risks, and resource load — across every project, rolled up into one view. Spot what needs attention before anyone has to flag it.',
    featureItems: [
      'Risk management',
      'Snapshot',
      'Cross-project dependencies',
      'Dashboards',
      'Resource capacity management',
    ],
    Visual: PortfolioDashboardPlaceholder,
  },
  {
    id: 'project',
    tierLabel: 'Project',
    personaLabel: 'Project managers',
    scenarioHeadline: 'Deliver projects on time, every time.',
    scenarioBody:
      'Plan your timeline, assign the right people with AI recommendations, and track every dependency — so nothing slips without you knowing.',
    featureItems: [
      'Gantt & dependencies',
      'Critical path & baselines',
      'Resource planning',
      'Multiple views',
    ],
    Visual: GanttPlaceholder,
  },
  {
    id: 'execution',
    tierLabel: 'Execution',
    personaLabel: 'Project teams',
    scenarioHeadline: 'Keep work moving without the back and forth.',
    scenarioBody:
      'Tasks assigned, priorities clear, capacity balanced. Agents handle the follow-up so your team spends time on the work that actually moves things forward.',
    featureItems: [
      'Task management',
      'Collaboration',
      'Intake and approvals',
      'File sharing',
    ],
    Visual: TaskBoardPlaceholder,
  },
]

function PersonaLabel({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#6161ff]">{children}</p>
  )
}

function FeatureDotGrid({
  items,
  cardId,
  isOpen,
  reducedMotion,
  expandH,
}: {
  items: readonly string[]
  cardId: string
  isOpen: boolean
  reducedMotion: boolean | null
  expandH: number
}) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-[10px]">
      {isOpen &&
        items.map((label, ti) => (
          <motion.div
            key={`${cardId}-feat-${label}`}
            initial={reducedMotion ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.22,
              delay: reducedMotion ? 0 : expandH + ti * 0.04,
              ease,
            }}
            className="flex min-w-0 items-start gap-2"
          >
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#6161ff]" aria-hidden />
            <span className="text-[13px] font-normal leading-snug text-[#0a0a0f]">{label}</span>
          </motion.div>
        ))}
    </div>
  )
}

type TierAccordionProps = {
  card: TierCard
  isOpen: boolean
  onActivate: () => void
  reducedMotion: boolean | null
  expandH: number
  collapseH: number
  borderIn: number
  borderOut: number
  scrollDelay: number
}

function TierAccordion({
  card,
  isOpen,
  onActivate,
  reducedMotion,
  expandH,
  collapseH,
  borderIn,
  borderOut,
  scrollDelay,
}: TierAccordionProps) {
  const Visual = card.Visual

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.5, delay: reducedMotion ? 0 : scrollDelay, ease }}
      className="relative"
    >
      <div
        className={`group/card relative overflow-hidden border-[#e8e8f0] ${
          isOpen ? 'bg-[#fafafe]' : 'bg-[#ffffff]'
        }`}
      >
        <motion.span
          className="pointer-events-none absolute left-0 top-0 z-[2] block h-full w-[3px] origin-top bg-[#6161ff]"
          initial={false}
          animate={{ scaleY: isOpen ? 1 : 0 }}
          transition={{ duration: isOpen ? borderIn : borderOut, ease }}
          aria-hidden
        />

        <button
          type="button"
          data-cursor-interactive
          aria-expanded={isOpen}
          aria-controls={`pm-tier-panel-${card.id}`}
          id={`pm-tier-trigger-${card.id}`}
          onClick={onActivate}
          className={`group/trigger relative z-[1] flex h-20 w-full items-center justify-between gap-4 px-6 text-left transition-colors duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            !isOpen ? 'hover:bg-[rgba(97,97,255,0.02)]' : ''
          }`}
        >
          <span
            className={`min-w-0 flex-1 text-[22px] font-bold leading-snug tracking-[-0.01em] text-[#0a0a0f] transition-colors duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              !isOpen ? 'group-hover/trigger:text-[#6161ff]' : ''
            }`}
          >
            {card.tierLabel}
          </span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-[#6b6b8a] transition duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen
                ? 'rotate-180 text-[#6161ff] opacity-100'
                : 'opacity-80 group-hover/trigger:opacity-100 group-hover/trigger:text-[#6161ff]'
            }`}
            strokeWidth={1.75}
            aria-hidden
          />
        </button>

        <motion.div
          id={`pm-tier-panel-${card.id}`}
          role="region"
          aria-labelledby={`pm-tier-trigger-${card.id}`}
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: isOpen ? expandH : collapseH, ease }}
          className="overflow-hidden"
        >
          <motion.div
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{
              duration: isOpen ? 0.2 : 0.15,
              delay: isOpen ? 0.1 : 0,
              ease,
            }}
            className={isOpen ? 'pointer-events-auto' : 'pointer-events-none'}
          >
            <div className="border-t border-[#e8e8f0] px-6 pb-8 pt-2 md:px-8">
              <div className="grid min-w-0 grid-cols-1 gap-8 md:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] md:gap-0 md:pt-4">
                <div className="min-w-0 border-[#e8e8f0] md:border-r md:pr-10">
                  <PersonaLabel>{card.personaLabel}</PersonaLabel>
                  <h3 className="mt-3 text-[24px] font-bold leading-[1.3] tracking-[-0.01em] text-[#0a0a0f]">
                    {card.scenarioHeadline}
                  </h3>
                  <p className="mt-3 text-[15px] font-normal leading-[1.7] text-[#6b6b8a]">{card.scenarioBody}</p>
                  <FeatureDotGrid
                    items={card.featureItems}
                    cardId={card.id}
                    isOpen={isOpen}
                    reducedMotion={reducedMotion}
                    expandH={expandH}
                  />
                </div>
                <div className="min-w-0 md:pl-10">
                  <Visual />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

/**
 * Collapsible platform tiers (Portfolios → Project → Execution).
 */
export default function PlatformFeatureMatrix() {
  const reducedMotion = useReducedMotion()
  const [openIndex, setOpenIndex] = useState(0)

  const expandH = reducedMotion ? 0 : 0.4
  const collapseH = reducedMotion ? 0 : 0.3
  const borderIn = reducedMotion ? 0 : 0.3
  const borderOut = reducedMotion ? 0 : 0.2

  const handleActivate = (index: number) => {
    if (index === openIndex) return
    setOpenIndex(index)
  }

  const c0 = TIERS[0]
  const c1 = TIERS[1]
  const c2 = TIERS[2]

  return (
    <section
      id="pm-capabilities"
      className="relative z-[1] scroll-mt-24 border-y border-[#e8e8f0] bg-[#ffffff] py-24"
    >
      <div className="pmo-container">
        <motion.header
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.5, ease }}
          className="text-left"
        >
          <div className="flex justify-start">
            <SectionChip sentenceCase>The platform</SectionChip>
          </div>
          <h2 className="pmo-section-title mt-4 max-w-[720px]">
            Built for every level of project management.
          </h2>
          <p className="mt-5 max-w-[560px] text-[15px] font-normal leading-[1.7] text-[#6b6b8a] md:text-[16px]">
            Whether you&apos;re running one project or a hundred, monday has the depth to match.
          </p>
        </motion.header>

        <div className="relative mt-14 space-y-0 divide-y divide-[#e8e8f0]">
          <TierAccordion
            card={c0}
            isOpen={openIndex === 0}
            onActivate={() => handleActivate(0)}
            reducedMotion={reducedMotion}
            expandH={expandH}
            collapseH={collapseH}
            borderIn={borderIn}
            borderOut={borderOut}
            scrollDelay={0}
          />
          <TierAccordion
            card={c1}
            isOpen={openIndex === 1}
            onActivate={() => handleActivate(1)}
            reducedMotion={reducedMotion}
            expandH={expandH}
            collapseH={collapseH}
            borderIn={borderIn}
            borderOut={borderOut}
            scrollDelay={0.1}
          />
          <TierAccordion
            card={c2}
            isOpen={openIndex === 2}
            onActivate={() => handleActivate(2)}
            reducedMotion={reducedMotion}
            expandH={expandH}
            collapseH={collapseH}
            borderIn={borderIn}
            borderOut={borderOut}
            scrollDelay={0.2}
          />
        </div>
      </div>
    </section>
  )
}
