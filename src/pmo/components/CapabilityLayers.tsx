import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import {
  AlertTriangle,
  BarChart2,
  Boxes,
  ChartGantt,
  Flag,
  Inbox,
  Layers,
  LineChart,
  LayoutDashboard,
  Link2,
  MessageCircle,
  Scan,
  Route,
  SquareKanban,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { SectionChip } from './SectionChip'

const springLayer = { type: 'spring' as const, stiffness: 280, damping: 28 }

type LayerId = 'portfolio' | 'project' | 'execution'

type Capability = {
  Icon: LucideIcon
  name: string
  description: string
}

/** Stagger: Execution first, then Project, then Portfolios (visual drop-in order) */
const DROP_DELAY_SEC: Record<LayerId, number> = {
  execution: 0.1,
  project: 0.2,
  portfolio: 0.3,
}

const portfolioCaps: Capability[] = [
  {
    Icon: Layers,
    name: 'Portfolio management',
    description: 'See every project in one place, status, health, and progress rolled up',
  },
  {
    Icon: Scan,
    name: 'Snapshot',
    description: "Get an at-a-glance view of every project's health across your entire portfolio",
  },
  {
    Icon: Link2,
    name: 'Cross-project dependencies',
    description: 'Manage task relationships across multiple projects in one view',
  },
  {
    Icon: LayoutDashboard,
    name: 'Dashboards',
    description: 'Build custom views of any data across projects and teams',
  },
  {
    Icon: AlertTriangle,
    name: 'Risk management',
    description: 'Surface delays, conflicts, and blockers across your portfolio before they derail delivery',
  },
  {
    Icon: Boxes,
    name: 'Standardization',
    description: 'Apply consistent structure and workflows across every project instantly',
  },
]

const projectCaps: Capability[] = [
  {
    Icon: ChartGantt,
    name: 'Gantt chart',
    description: 'Visualize timelines, milestones, and dependencies at a glance',
  },
  {
    Icon: Flag,
    name: 'Milestones',
    description: 'Mark key checkpoints along your timeline',
  },
  {
    Icon: LineChart,
    name: 'Baselines',
    description: 'Compare planned vs. actual to catch slippage early',
  },
  {
    Icon: Route,
    name: 'Critical path',
    description: 'See the tasks that determine your finish date',
  },
  {
    Icon: Link2,
    name: 'Dependencies',
    description:
      'Set task relationships, lag times, and blockers to keep your project sequenced correctly from start to finish',
  },
  {
    Icon: SquareKanban,
    name: 'Multiple views',
    description:
      'Switch between table, timeline, calendar, kanban, and more. Same work, the view your team needs',
  },
]

const executionCaps: Capability[] = [
  {
    Icon: Inbox,
    name: 'Intake and approvals',
    description: 'Standardize how work enters your pipeline and route decisions to the right people',
  },
  {
    Icon: MessageCircle,
    name: 'Collaboration and file sharing',
    description:
      'Comment, tag teammates, and keep conversations in context alongside the work. Attach docs, assets, and references directly to tasks so nothing gets lost in email',
  },
  {
    Icon: Zap,
    name: 'Execution',
    description: 'Assign, prioritize, and move work forward with the views and workflows your team actually uses',
  },
]

const LAYERS: {
  id: LayerId
  label: string
  framing: string
  HeaderIcon: LucideIcon
  bg: string
  radius: string
  indent: string
  capabilities: Capability[]
}[] = [
  {
    id: 'portfolio',
    label: 'Portfolios',
    framing: 'For leads running hundreds of projects at once, with agents surfacing risks and reports',
    HeaderIcon: Layers,
    bg: '#1A1A28',
    radius: 'rounded-t-lg rounded-b-[12px]',
    indent: 'md:mx-20',
    capabilities: portfolioCaps,
  },
  {
    id: 'project',
    label: 'Project',
    framing: 'For project managers running projects end-to-end, with agents keeping plans on track',
    HeaderIcon: BarChart2,
    bg: '#20203A',
    radius: 'rounded-t-lg rounded-b-[12px]',
    indent: 'md:mx-10',
    capabilities: projectCaps,
  },
  {
    id: 'execution',
    label: 'Execution',
    framing: 'Where people and agents work side by side to move work forward',
    HeaderIcon: Users,
    bg: '#26263A',
    radius: 'rounded-t-lg rounded-b-[20px]',
    indent: '',
    capabilities: executionCaps,
  },
]

function CapabilityCard({
  cap,
  index,
  visible,
}: {
  cap: Capability
  index: number
  visible: boolean
}) {
  const { Icon, name, description } = cap
  return (
    <motion.div
      layout
      initial={visible ? { opacity: 0, y: 8 } : false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{
        duration: 0.35,
        delay: visible ? index * 0.04 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-xl border border-white/[0.07] bg-white/[0.04] p-5 transition-colors hover:border-[rgba(97,97,255,0.3)] hover:bg-[rgba(97,97,255,0.07)]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(97,97,255,0.12)]">
        <Icon className="h-[18px] w-[18px] text-[#8585FF]" strokeWidth={1.75} aria-hidden />
      </div>
      <p className="mt-3.5 text-[14px] font-semibold text-white">{name}</p>
      <p className="mt-1.5 text-[12px] leading-[1.5] text-white/50">{description}</p>
    </motion.div>
  )
}

function LayerPanel({
  layer,
  active,
  onToggle,
  index,
  reducedMotion,
  cardsRevealed,
}: {
  layer: (typeof LAYERS)[number]
  active: boolean
  onToggle: () => void
  index: number
  reducedMotion: boolean | null
  cardsRevealed: boolean
}) {
  const { id, label, framing, HeaderIcon, radius, indent, capabilities } = layer
  const showCards = active && cardsRevealed

  const dropDelay = reducedMotion ? 0 : DROP_DELAY_SEC[id]
  const dropDuration = reducedMotion ? 0 : 0.5

  const headerLeft = (
    <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2 gap-y-1">
      <HeaderIcon className="hidden h-5 w-5 shrink-0 text-white/90 sm:block" strokeWidth={1.75} aria-hidden />
      <span className="text-[18px] font-semibold text-white">{label}</span>
      <span className="text-[13px] text-white/45">
        <span aria-hidden> / </span>
        {framing}
      </span>
    </div>
  )

  const headerToggle = (
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[15px] font-medium text-white/80 transition-colors ${
        active
          ? 'bg-white/[0.1]'
          : 'bg-white/[0.1] hover:bg-[rgba(97,97,255,0.2)] hover:text-[#8585FF]'
      }`}
      aria-hidden
    >
      {active ? '−' : '+'}
    </span>
  )

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: dropDuration, ease: 'easeOut', delay: dropDelay }}
      className={`relative ${indent} -mt-3 first:mt-0`}
      style={{ zIndex: 3 - index }}
    >
      <motion.div
        layout
        transition={springLayer}
        className={`overflow-hidden ${radius} border transition-colors ${
          active
            ? 'border-[rgba(97,97,255,0.35)]'
            : 'border-white/[0.07] hover:border-[rgba(97,97,255,0.2)] hover:bg-white/[0.04]'
        }`}
        style={{ background: layer.bg }}
      >
        <button
          type="button"
          className="flex h-[72px] w-full cursor-pointer items-center justify-between px-8 text-left transition-colors hover:bg-white/[0.04]"
          id={`layer-trigger-${id}`}
          aria-expanded={active}
          aria-controls={`layer-panel-${id}`}
          onClick={onToggle}
        >
          {headerLeft}
          {headerToggle}
        </button>

        <AnimatePresence initial={false}>
          {active && (
            <motion.div
              key="body"
              id={`layer-panel-${id}`}
              role="region"
              aria-labelledby={`layer-trigger-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-8 pb-8 pt-0"
            >
              <motion.div layout className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {capabilities.map((cap, i) => (
                  <CapabilityCard key={cap.name} cap={cap} index={i} visible={showCards} />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default function CapabilityLayers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const reducedMotion = useReducedMotion()
  const [activeId, setActiveId] = useState<LayerId | null>('portfolio')
  const [cardsRevealed, setCardsRevealed] = useState(false)

  useEffect(() => {
    if (!inView) return
    if (reducedMotion) {
      setCardsRevealed(true)
      return
    }
    const portfolioEntranceEnd = DROP_DELAY_SEC.portfolio + 0.5
    const t = window.setTimeout(() => setCardsRevealed(true), (portfolioEntranceEnd + 0.4) * 1000)
    return () => window.clearTimeout(t)
  }, [inView, reducedMotion])

  return (
    <section
      ref={ref}
      id="pm-capabilities"
      className="relative overflow-hidden bg-[#ececf0] px-6 py-10 md:px-12 md:py-14 lg:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#f7f7f9_0%,#ececf0_50%,#e8e8ed_100%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1100px]">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="mb-3 flex justify-center">
            <SectionChip>Built for every level of project management</SectionChip>
          </div>
          <h2 className="mt-1 text-[28px] font-semibold leading-tight tracking-[-0.02em] text-[#0c0c0f] md:text-[38px] lg:text-[42px]">
            Everything you need to deliver complex projects{' '}
            <span className="bg-gradient-to-r from-[#6161FF] to-[#8b8bff] bg-clip-text text-transparent">
              at scale.
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] text-[16px] leading-relaxed text-[rgba(12,12,15,0.58)] md:text-[17px]">
            monday.com covers the full depth of project and portfolio management, out of the box, no setup
            required.
          </p>
        </motion.div>

        <div className="mx-auto mt-8 max-w-[1000px] md:mt-10">
          {LAYERS.map((layer, i) => (
            <LayerPanel
              key={layer.id}
              layer={layer}
              active={activeId === layer.id}
              onToggle={() => setActiveId((prev) => (prev === layer.id ? null : layer.id))}
              index={i}
              reducedMotion={reducedMotion}
              cardsRevealed={cardsRevealed}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
