import { useRef, useState } from 'react'
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
import { pageEase } from '../motion'

type LayerId = 'portfolio' | 'project' | 'execution'

type Capability = {
  Icon: LucideIcon
  name: string
  description: string
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
    name: 'Collaboration',
    description:
      'Comment, tag teammates, and attach files on tasks so discussions stay with the work, not in email.',
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
  capabilities: Capability[]
}[] = [
  {
    id: 'portfolio',
    label: 'Portfolios',
    framing: 'For leads running multiple projects at once, with full visibility across every one of them',
    HeaderIcon: Layers,
    bg: '#f1f2f7',
    capabilities: portfolioCaps,
  },
  {
    id: 'project',
    label: 'Project',
    framing: 'For project managers running complex delivery end-to-end',
    HeaderIcon: BarChart2,
    bg: '#eef0f6',
    capabilities: projectCaps,
  },
  {
    id: 'execution',
    label: 'Execution',
    framing: 'Where your people and agents do the actual work, side by side',
    HeaderIcon: Users,
    bg: '#eceef4',
    capabilities: executionCaps,
  },
]

function capabilitiesFor(id: LayerId): Capability[] {
  const layer = LAYERS.find((l) => l.id === id)
  return layer?.capabilities ?? []
}

function TierRailItem({
  layer,
  active,
  onSelect,
}: {
  layer: (typeof LAYERS)[number]
  active: boolean
  onSelect: () => void
}) {
  const { label, framing, HeaderIcon } = layer

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? 'true' : undefined}
      className={`group relative w-full rounded-r-xl py-4 pl-4 pr-3 text-left transition-[opacity,background-color] duration-200 md:py-5 md:pl-5 ${
        active
          ? 'border-l-[3px] border-[#6161FF] bg-[rgba(97,97,255,0.08)] opacity-100'
          : 'border-l-[3px] border-transparent opacity-[0.58] hover:opacity-90'
      }`}
    >
      {!active && (
        <span
          className="pointer-events-none absolute bottom-0 left-0 top-0 w-[3px] origin-top scale-y-0 bg-[#6161FF] transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
          aria-hidden
        />
      )}
      <div className="flex gap-3">
        <HeaderIcon
          className={`mt-0.5 h-6 w-6 shrink-0 stroke-[1.75] ${
            active ? 'text-[#6161FF]' : 'text-[rgba(15,15,20,0.45)] group-hover:text-[rgba(15,15,20,0.65)]'
          }`}
          aria-hidden
        />
        <div className="min-w-0">
          <p className="text-[18px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#0c0c0f]">
            {label}
          </p>
          <p className="mt-1.5 text-[12px] leading-snug text-[rgba(15,15,20,0.48)] md:text-[13px]">{framing}</p>
        </div>
      </div>
    </button>
  )
}

function CapabilityCard({
  cap,
  index,
}: {
  cap: Capability
  index: number
}) {
  const { Icon, name, description } = cap
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.35,
        delay: reduceMotion ? 0 : index * 0.04,
        ease: pageEase,
      }}
      className="group relative flex h-full min-h-[240px] flex-col rounded-[12px] border border-[rgba(15,15,20,0.08)] bg-gradient-to-b from-white to-[rgba(245,246,250,0.98)] p-[28px] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] transition-[border-color,transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[3px] hover:border-[rgba(97,97,255,0.45)] hover:shadow-[0_8px_24px_rgba(97,97,255,0.12)]"
    >
      <div className="relative mb-4 flex h-10 w-10 shrink-0 items-center justify-center">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[80px] w-[80px] -translate-x-1/2 -translate-y-1/2 transition-[transform,opacity] duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          style={{
            background: 'radial-gradient(circle, rgba(97, 97, 255, 0.14) 0%, rgba(97, 97, 255, 0) 40px)',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[80px] w-[80px] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100"
          style={{
            background: 'radial-gradient(circle, rgba(97, 97, 255, 0.2) 0%, rgba(97, 97, 255, 0) 40px)',
          }}
          aria-hidden
        />
        <Icon
          className="relative z-[1] h-6 w-6 shrink-0 text-[#6161ff]"
          strokeWidth={1.75}
          aria-hidden
        />
      </div>
      <p className="text-[17px] font-semibold leading-[1.3] text-[#0c0c0f]">{name}</p>
      <p className="mt-2 text-[14px] font-normal leading-[1.6] text-[rgba(15,15,20,0.58)]">{description}</p>
    </motion.div>
  )
}

export default function CapabilityLayers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  const reducedMotion = useReducedMotion()
  const [activeId, setActiveId] = useState<LayerId>('portfolio')

  const activeLayer = LAYERS.find((l) => l.id === activeId)!
  const caps = capabilitiesFor(activeId)

  return (
    <section
      ref={ref}
      id="pm-capabilities"
      className="relative z-10 overflow-hidden bg-transparent px-4 py-24 md:px-10 md:py-24 lg:px-12"
    >
      <div className="relative z-[2] mx-auto max-w-[1120px]">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: pageEase }}
          className="text-left"
        >
          <div className="mb-3 flex justify-start">
            <SectionChip>The platform</SectionChip>
          </div>
          <h2 className="mt-1 text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0c0c0f] md:text-[44px] lg:text-[48px]">
            One complete platform, built for every level of project work.
          </h2>
          <p className="mt-3 max-w-[520px] text-[16px] font-normal leading-[1.6] text-[rgba(12,12,15,0.58)] md:text-[18px]">
            Everything your projects need, in one place. Agents included.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 flex min-h-[min(520px,70vh)] w-full flex-col gap-6 lg:mt-14 lg:mb-8 lg:flex-row lg:gap-0 lg:rounded-[16px] lg:overflow-hidden lg:border lg:border-[rgba(15,15,20,0.08)] lg:bg-white/85 lg:shadow-[0_24px_64px_rgba(15,15,20,0.08)] lg:backdrop-blur-[2px]">
          <nav
            className="flex w-full flex-shrink-0 flex-col gap-1 rounded-[12px] border border-[rgba(15,15,20,0.06)] bg-[#f4f4f5] p-2 lg:w-[30%] lg:max-w-[340px] lg:rounded-none lg:border-0 lg:bg-[#ececf0] lg:p-3 lg:pr-2"
            aria-label="Platform capability tiers"
          >
            {LAYERS.map((layer) => (
              <TierRailItem
                key={layer.id}
                layer={layer}
                active={activeId === layer.id}
                onSelect={() => setActiveId(layer.id)}
              />
            ))}
          </nav>

          <div
            className="relative min-h-[360px] flex-1 overflow-hidden rounded-[16px] border border-[rgba(15,15,20,0.08)] pb-8 lg:min-h-[480px] lg:rounded-none lg:border-0"
            style={{ background: activeLayer.bg }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-8 bg-gradient-to-b from-transparent to-[rgba(255,255,255,0.92)]"
              aria-hidden
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: pageEase }}
                className="relative z-[3] h-full p-5 sm:p-6 md:p-8"
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:items-stretch">
                  {caps.map((cap, i) => (
                    <CapabilityCard key={`${activeId}-${cap.name}`} cap={cap} index={i} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
