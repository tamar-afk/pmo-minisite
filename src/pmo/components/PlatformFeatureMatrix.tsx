import { Fragment, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  AlertTriangle,
  BarChart2,
  ChevronDown,
  ClipboardList,
  FileText,
  Flag,
  GitMerge,
  Inbox,
  Layers,
  LayoutGrid,
  Link2,
  MessageCircle,
  ScanLine,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { SectionChip } from './SectionChip'
import { staggerContainer, staggerItem } from '../motion'

const easeInOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

type TierId = 'portfolios' | 'project' | 'execution'

type FeatureItem = {
  title: string
  description: string
  Icon: LucideIcon
}

const TIERS: {
  id: TierId
  name: string
  subtitle: string
  TierIcon: LucideIcon
  features: FeatureItem[]
}[] = [
  {
    id: 'portfolios',
    name: 'Portfolios',
    subtitle: 'For leaders running dozens of projects across teams and regions.',
    TierIcon: Layers,
    features: [
      {
        title: 'Portfolio management',
        description: "See every project's status, health, and progress in one place.",
        Icon: Layers,
      },
      {
        title: 'Snapshot',
        description: 'At-a-glance health across your entire portfolio.',
        Icon: ScanLine,
      },
      {
        title: 'Cross-project dependencies',
        description: 'Manage task relationships across multiple projects.',
        Icon: Link2,
      },
      {
        title: 'Dashboards',
        description: 'Custom views of any data across projects and teams.',
        Icon: LayoutGrid,
      },
      {
        title: 'Risk management',
        description: 'Surface delays and blockers before they derail delivery.',
        Icon: AlertTriangle,
      },
      {
        title: 'Resource capacity',
        description: 'See resource load and capacity gaps across every project at once.',
        Icon: Users,
      },
    ],
  },
  {
    id: 'project',
    name: 'Projects',
    subtitle: 'For project managers running complex, multi-dependency delivery.',
    TierIcon: ClipboardList,
    features: [
      {
        title: 'Intake and approvals',
        description: 'Standardise how work enters your pipeline and route decisions correctly.',
        Icon: Inbox,
      },
      {
        title: 'Gantt chart',
        description: 'Visualise timelines, milestones, and dependencies at a glance.',
        Icon: BarChart2,
      },
      {
        title: 'Milestones',
        description: 'Mark key checkpoints along your timeline.',
        Icon: Flag,
      },
      {
        title: 'Baselines',
        description: 'Compare planned vs. actual to catch slippage early.',
        Icon: TrendingUp,
      },
      {
        title: 'Critical path',
        description: 'See exactly which tasks determine your finish date.',
        Icon: GitMerge,
      },
      {
        title: 'Dependencies',
        description: 'Set task relationships and keep sequencing correct from start to finish.',
        Icon: Link2,
      },
      {
        title: 'Multiple views',
        description: 'Switch between table, timeline, calendar, kanban, and more.',
        Icon: LayoutGrid,
      },
      {
        title: 'Resource planning',
        description: 'Plan headcount using planned roles with AI recommendations.',
        Icon: Users,
      },
    ],
  },
  {
    id: 'execution',
    name: 'Execution',
    subtitle: 'For teams who need to move fast without dropping the ball.',
    TierIcon: Zap,
    features: [
      {
        title: 'Collaboration',
        description: 'Comment, tag teammates, keep discussions with the work — not in email.',
        Icon: MessageCircle,
      },
      {
        title: 'Task management',
        description: 'Assign, prioritise, and move work forward with the views your team actually uses.',
        Icon: Zap,
      },
      {
        title: 'File sharing',
        description: 'Attach docs and assets directly to tasks so nothing gets lost.',
        Icon: FileText,
      },
    ],
  },
]

const zForTier: Record<TierId, number> = {
  portfolios: 30,
  project: 20,
  execution: 10,
}

const tierShadow: Record<TierId, string> = {
  portfolios: '0 4px 24px rgba(0,0,0,0.06)',
  project: '0 4px 20px rgba(0,0,0,0.05)',
  execution: '0 4px 16px rgba(0,0,0,0.045)',
}

/** Stronger taper: reads as a pyramid stack, not three equal bands. */
const pyramidTierWidth: Record<TierId, string> = {
  portfolios: 'w-[min(100%,82%)]',
  project: 'w-[min(100%,91%)]',
  execution: 'w-full',
}

/** Mosaic tiles + soft layer wash — capabilities read as a layer, not a scrolling spec list. */
function TierCapabilityMosaic({
  features,
  reducedMotion,
}: {
  features: FeatureItem[]
  reducedMotion: boolean | null
}) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-[rgba(0,0,0,0.05)] bg-gradient-to-br from-[rgba(97,97,255,0.06)] via-[#fafbfc] to-[#f4f5f7] p-3 sm:p-4"
      role="list"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 0%, rgba(97,97,255,0.12) 0%, transparent 45%), radial-gradient(circle at 100% 100%, rgba(0,0,0,0.04) 0%, transparent 40%)',
        }}
        aria-hidden
      />
      <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const { Icon, title, description } = feature
          return (
            <motion.article
              key={feature.title}
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: reducedMotion ? 0 : index * 0.04,
                ease: easeInOut,
              }}
              className="group flex flex-col rounded-lg border border-[rgba(0,0,0,0.06)] bg-white/90 p-3.5 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_8px_20px_rgba(15,15,25,0.04)] backdrop-blur-[2px] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-px hover:border-[rgba(97,97,255,0.22)] hover:shadow-[0_12px_28px_rgba(15,15,25,0.07)] sm:p-4"
              role="listitem"
            >
              <div className="flex items-start gap-3">
                <Icon
                  className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#6161ff]"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-[13px] font-semibold leading-snug tracking-[-0.01em] text-[#111118]">{title}</h4>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-[#6b7280] sm:text-[12px]">{description}</p>
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>
    </div>
  )
}

function TierLayer({
  tier,
  index,
  isOpen,
  onToggle,
  reducedMotion,
  stackIndex,
  stackSize,
}: {
  tier: (typeof TIERS)[number]
  index: number
  isOpen: boolean
  onToggle: () => void
  reducedMotion: boolean | null
  stackIndex: number
  stackSize: number
}) {
  const z = zForTier[tier.id]
  const overlap = stackIndex > 0 ? '-mt-3' : ''
  const TierIcon = tier.TierIcon

  /** Top tier: rounded top; bottom tier: rounded bottom (column order: Portfolios → Projects → Execution). */
  const rounded =
    stackIndex === 0 ? 'rounded-t-lg' : stackIndex === stackSize - 1 ? 'rounded-b-lg' : 'rounded-none'

  return (
    <motion.div
      className={`relative mx-auto ${pyramidTierWidth[tier.id]} ${overlap} ${rounded}`}
      style={{ zIndex: z, boxShadow: tierShadow[tier.id] }}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay: reducedMotion ? 0 : index * 0.08, ease: easeInOut }}
    >
      <div className={`overflow-hidden border border-[rgba(0,0,0,0.07)] bg-[#ffffff] ${rounded}`}>
        <button
          type="button"
          data-cursor-interactive
          onClick={onToggle}
          className={`group flex h-14 w-full cursor-pointer items-center gap-2.5 border-l-[3px] bg-[#ffffff] px-5 text-left transition-colors duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-6 ${
            isOpen
              ? 'border-[#6161ff]'
              : 'border-transparent hover:border-[rgba(97,97,255,0.35)]'
          }`}
          aria-expanded={isOpen}
        >
          <TierIcon
            className={`h-4 w-4 shrink-0 ${isOpen ? 'text-[#6161ff]' : 'text-[#6b7280] group-hover:text-[#111118]'}`}
            strokeWidth={1.75}
            aria-hidden
          />
          <div className="flex min-w-0 flex-1 items-center gap-1.5">
            <span
              className={`shrink-0 text-[15px] font-semibold ${isOpen ? 'text-[#111118]' : 'text-[#6b7280] group-hover:text-[#111118]'}`}
            >
              {tier.name}
            </span>
            <span className="shrink-0 text-[13px] text-[rgba(0,0,0,0.2)]" aria-hidden>
              ·
            </span>
            <span
              className={`min-w-0 truncate text-[13px] ${isOpen ? 'text-[#6b7280]' : 'text-[#9ca3af] group-hover:text-[#6b7280]'}`}
            >
              {tier.subtitle}
            </span>
          </div>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-[#9ca3af] transition-transform duration-300 group-hover:text-[#6b7280] ${isOpen ? 'rotate-180' : ''}`}
            strokeWidth={2}
            aria-hidden
          />
        </button>

        <AnimatePresence initial={false} mode="sync">
          {isOpen && (
            <motion.div
              key={`content-${tier.id}`}
              variants={{
                open: {
                  height: 'auto',
                  opacity: 1,
                  transition: {
                    height: { duration: 0.4, ease: easeInOut },
                    opacity: { duration: 0.2, delay: 0.05 },
                  },
                },
                closed: {
                  height: 0,
                  opacity: 0,
                  transition: {
                    height: { duration: 0.3, ease: easeInOut },
                    opacity: { duration: 0.15 },
                  },
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
              className="overflow-hidden border-t border-[rgba(0,0,0,0.07)] bg-[#eef0f3]/40"
            >
              <div className="p-3 sm:p-4 md:p-5">
                <TierCapabilityMosaic features={tier.features} reducedMotion={reducedMotion} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

const defaultOpen: Record<TierId, boolean> = {
  portfolios: true,
  project: false,
  execution: false,
}

export default function PlatformFeatureMatrix() {
  const reducedMotion = useReducedMotion()
  const [open, setOpen] = useState<Record<TierId, boolean>>(defaultOpen)

  const toggleTier = (id: TierId) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  /** Top to bottom: Portfolios → Projects → Execution */
  const stackOrder = [...TIERS]
  const stackSize = stackOrder.length

  return (
    <section id="pm-capabilities" className="scroll-mt-24 pmo-flow-section-top bg-[#ffffff] pmo-section-pad">
      <div className="pmo-container">
        <motion.div
          variants={staggerContainer(0.06)}
          initial={reducedMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          <motion.div variants={staggerItem}>
            <SectionChip sentenceCase>The platform</SectionChip>
          </motion.div>
          <motion.h2 variants={staggerItem} className="pmo-section-title max-w-[48rem]">
            Built for project management at every level.
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="mt-3 max-w-[480px] text-[15px] font-normal leading-[1.7] text-[#6b7280]"
          >
            Out of the box project management capabilities for humans and agents that support any complexity and any
            scale.
          </motion.p>
        </motion.div>

        <div className="relative mt-5 md:mt-6">
          <div
            className="pointer-events-none absolute left-1/2 top-6 bottom-6 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[rgba(97,97,255,0.2)] to-transparent md:block"
            aria-hidden
          />
          <div className="relative flex w-full flex-col items-center">
            {stackOrder.map((tier, stackIndex) => (
              <Fragment key={tier.id}>
                <TierLayer
                  tier={tier}
                  index={stackIndex}
                  isOpen={open[tier.id]}
                  onToggle={() => toggleTier(tier.id)}
                  reducedMotion={reducedMotion}
                  stackIndex={stackIndex}
                  stackSize={stackSize}
                />
                {stackIndex < stackSize - 1 ? (
                  <div
                    className="relative z-[5] flex w-full justify-center py-1"
                    aria-hidden
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[rgba(97,97,255,0.25)] bg-white shadow-sm">
                      <div className="h-2 w-2 rounded-full bg-[#6161ff]/70" />
                    </div>
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
