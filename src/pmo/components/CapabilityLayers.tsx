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
  capabilities: Capability[]
}[] = [
  {
    id: 'portfolio',
    label: 'Portfolios',
    framing: 'For leads running multiple projects at once, with full visibility across every one of them',
    HeaderIcon: Layers,
    capabilities: portfolioCaps,
  },
  {
    id: 'project',
    label: 'Projects',
    framing: 'For project managers running complex delivery end-to-end',
    HeaderIcon: BarChart2,
    capabilities: projectCaps,
  },
  {
    id: 'execution',
    label: 'Execution',
    framing: 'Where your people and agents do the actual work, side by side',
    HeaderIcon: Users,
    capabilities: executionCaps,
  },
]

const expandEase: [number, number, number, number] = [0.16, 1, 0.3, 1]
const layerShadow = '0 8px 32px rgba(15, 15, 20, 0.08)'
const pyramidLift = '0 16px 48px rgba(15, 15, 20, 0.1)'

function CapabilityTierCard({
  cap,
  index,
  reducedMotion,
}: {
  cap: Capability
  index: number
  reducedMotion: boolean | null
}) {
  const { Icon, name, description } = cap
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0 : 0.35,
        delay: reducedMotion ? 0 : index * 0.04,
        ease: expandEase,
      }}
      className="group relative flex min-h-[220px] flex-col rounded-[12px] border border-[rgba(15,15,20,0.08)] bg-gradient-to-b from-white to-[rgba(245,246,250,0.98)] p-[28px] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] transition-[border-color,transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[3px] hover:border-[rgba(97,97,255,0.4)] hover:shadow-[0_8px_24px_rgba(97,97,255,0.12)] md:min-h-[240px]"
    >
      <div className="relative mb-4 flex h-10 w-10 shrink-0 items-center justify-center">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[80px] w-[80px] -translate-x-1/2 -translate-y-1/2 transition-[transform,opacity] duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          style={{
            background: 'radial-gradient(circle, rgba(97, 97, 255, 0.14) 0%, rgba(97, 97, 255, 0) 40px)',
          }}
          aria-hidden
        />
        <Icon className="relative z-[1] h-6 w-6 shrink-0 text-[#6161ff]" strokeWidth={1.75} aria-hidden />
      </div>
      <p className="text-[17px] font-semibold leading-[1.3] text-[#0c0c0f]">{name}</p>
      <p className="mt-2 text-[14px] font-normal leading-[1.6] text-[rgba(15,15,20,0.58)]">{description}</p>
    </motion.div>
  )
}

function PyramidLayer({
  layer,
  index,
  expanded,
  onToggle,
  reducedMotion,
}: {
  layer: (typeof LAYERS)[number]
  index: number
  expanded: boolean
  onToggle: () => void
  reducedMotion: boolean | null
}) {
  const { label, framing, HeaderIcon, capabilities } = layer
  const caps = capabilities
  const z = 30 - index * 10

  return (
    <div
      className={`relative w-full ${index > 0 ? '-mt-5 md:-mt-6' : ''}`}
      style={{ zIndex: z }}
    >
      <div
        className="overflow-hidden rounded-[12px]"
        style={{ boxShadow: layerShadow }}
      >
        <div
          className={`relative ${
            expanded
              ? 'border-l-4 border-[#6161ff] bg-gradient-to-b from-[#fafbfc] to-[#f0f2f7]'
              : 'border-l-4 border-transparent bg-[#ececf0]'
          }`}
        >
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            className={`group relative flex w-full gap-3 px-5 py-4 text-left transition-[opacity,background-color] duration-150 md:py-5 md:pl-6 ${
              expanded ? 'opacity-100' : 'cursor-pointer opacity-60 hover:opacity-90'
            }`}
          >
            {!expanded && (
              <span
                className="pointer-events-none absolute bottom-2 left-0 top-2 w-1 origin-top scale-y-0 rounded-full bg-[rgba(97,97,255,0.35)] transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                aria-hidden
              />
            )}
            <HeaderIcon
              className={`mt-0.5 h-6 w-6 shrink-0 stroke-[1.75] ${
                expanded
                  ? 'text-[#6161ff]'
                  : 'text-[rgba(15,15,20,0.4)] group-hover:text-[rgba(15,15,20,0.65)]'
              }`}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="text-[18px] font-bold leading-[1.3] tracking-[-0.02em] text-[#0c0c0f]">{label}</p>
              <p
                className={`mt-1.5 text-[12px] leading-snug md:text-[13px] ${
                  expanded ? 'text-[rgba(15,15,20,0.55)]' : 'text-[rgba(15,15,20,0.42)]'
                }`}
              >
                {framing}
              </p>
            </div>
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="content"
                initial={reducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.3,
                  ease: expandEase,
                }}
                className="overflow-hidden"
              >
                <div className="border-t border-[rgba(15,15,20,0.08)] bg-[rgba(255,255,255,0.5)] px-4 pb-5 pt-4 sm:px-5 md:px-6 md:pb-6">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:items-stretch">
                    {caps.map((cap, i) => (
                      <CapabilityTierCard
                        key={`${layer.id}-${cap.name}`}
                        cap={cap}
                        index={i}
                        reducedMotion={reducedMotion}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default function CapabilityLayers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  const reducedMotion = useReducedMotion()
  /** Each tier expands/collapses independently; all may be closed at once. */
  const [openByLayer, setOpenByLayer] = useState<Record<LayerId, boolean>>({
    portfolio: true,
    project: false,
    execution: false,
  })

  const toggleLayer = (id: LayerId) => {
    setOpenByLayer((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section
      ref={ref}
      id="pm-capabilities"
      className="relative z-10 overflow-visible bg-transparent px-4 py-24 md:px-10 md:py-24 lg:px-12"
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
            Everything you need to manage projects at scale. Agents included.
          </p>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.45, ease: pageEase, delay: 0.05 }}
          className="mx-auto mt-12 w-full rounded-[14px] lg:mt-14"
          style={{ boxShadow: pyramidLift }}
        >
          {LAYERS.map((layer, index) => (
            <PyramidLayer
              key={layer.id}
              layer={layer}
              index={index}
              expanded={openByLayer[layer.id]}
              onToggle={() => toggleLayer(layer.id)}
              reducedMotion={reducedMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
