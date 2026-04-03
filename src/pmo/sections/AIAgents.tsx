import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { SectionChip } from '../components/SectionChip'
import { mondayAgentStripSrc } from '../constants/mondayVisuals'
import { springSnappy } from '../motion'

type Agent = {
  id: string
  label: string
  showNew: boolean
  primary: boolean
  bullets: [string, string]
  stripIndex?: 0 | 1 | 2 | 3
  /** Distinct styling for the custom-agent CTA */
  variant?: 'create'
}

const agents: Agent[] = [
  {
    id: 'project-management-agent',
    label: 'Project management agent',
    showNew: false,
    primary: true,
    bullets: [
      'Prioritizes your day by surfacing key projects, risks, and meetings',
      'Your always-on project co-pilot, native to monday',
    ],
  },
  {
    id: 'risk',
    label: 'Risk analyzer',
    showNew: true,
    primary: false,
    stripIndex: 0,
    bullets: [
      'Detects schedule, dependency, and workload risks across projects in real time',
      'Reassigns owners, updates timelines, and alerts stakeholders before delays happen',
    ],
  },
  {
    id: 'reporting',
    label: 'Reporting manager',
    showNew: false,
    primary: false,
    stripIndex: 1,
    bullets: [
      'Generates AI-curated executive reports on demand from live project data',
      'No manual prep, just share the report',
    ],
  },
  {
    id: 'resource',
    label: 'Resource optimizer',
    showNew: false,
    primary: false,
    stripIndex: 2,
    bullets: [
      'Monitors capacity and recommends reallocation when demand shifts',
      'Flags conflicts before they create delivery bottlenecks',
    ],
  },
  {
    id: 'deps',
    label: 'Dependencies resolver',
    showNew: false,
    primary: false,
    stripIndex: 3,
    bullets: [
      'Proactively surfaces cross-project blockers before they cascade',
      'Notifies teams the moment a dependency is at risk',
    ],
  },
  {
    id: 'create-your-own',
    label: 'Create your own',
    showNew: false,
    primary: false,
    variant: 'create',
    bullets: [
      'Define custom instructions and workflows so agents match exactly how your team works',
      'Build and iterate in monday without writing code',
    ],
  },
]

function AgentArtwork({
  stripIndex,
  expanded,
}: {
  stripIndex: 0 | 1 | 2 | 3
  expanded: boolean
}) {
  const xPercent = (stripIndex / 3) * 100
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden rounded-t-[20px]"
      aria-hidden
      animate={{ scale: expanded ? 1.04 : 1 }}
      transition={springSnappy}
    >
      <div
        className="h-full w-full bg-[#0a1620] bg-no-repeat"
        style={{
          backgroundImage: `url(${mondayAgentStripSrc})`,
          backgroundSize: '400% 100%',
          backgroundPosition: `${xPercent}% 42%`,
          clipPath: 'inset(0 0 14% 0)',
        }}
      />
    </motion.div>
  )
}

function AgentCard({
  agent,
  expanded,
  onExpand,
}: {
  agent: Agent
  expanded: boolean
  onExpand: (open: boolean) => void
}) {
  const w = agent.primary ? 'min-w-[230px] w-[230px]' : 'min-w-[210px] w-[210px]'
  const isCreate = agent.variant === 'create'

  return (
    <div
      className={`flex shrink-0 snap-start flex-col ${w}`}
      style={{ scrollSnapAlign: 'start' }}
      onMouseEnter={() => onExpand(true)}
      onMouseLeave={() => onExpand(false)}
    >
      <motion.div
        className={`relative h-[290px] overflow-hidden rounded-[20px] ${agent.primary ? 'ring-2 ring-[rgba(97,97,255,0.55)]' : ''} ${isCreate ? 'ring-2 ring-[rgba(97,97,255,0.35)]' : ''}`}
        style={{
          background: isCreate ? 'linear-gradient(160deg, #7B7BFF 0%, #6161FF 45%, #4A4AE8 100%)' : '#FFD600',
        }}
        whileHover={{
          y: -8,
          boxShadow: isCreate
            ? '0 20px 40px rgba(97,97,255,0.28)'
            : '0 20px 40px rgba(255,214,0,0.22)',
        }}
        transition={{ duration: 0.25 }}
      >
        {agent.showNew && (
          <span
            className="absolute left-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[13px] font-bold text-[#0075FF] shadow-md"
            style={{ width: 28, height: 28, fontSize: 13 }}
            aria-label="New"
          >
            N
          </span>
        )}
        <div className="relative h-[65%] w-full overflow-hidden rounded-t-[20px]">
          {agent.stripIndex !== undefined ? (
            <AgentArtwork stripIndex={agent.stripIndex} expanded={expanded} />
          ) : isCreate ? (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)',
              }}
              aria-hidden
            >
              <motion.div
                className="flex h-[88px] w-[88px] items-center justify-center rounded-full border-2 border-dashed border-white/50 bg-white/10 text-white"
                animate={{ scale: expanded ? 1.06 : 1 }}
                transition={springSnappy}
              >
                <Plus className="h-10 w-10 stroke-[2.5]" aria-hidden />
              </motion.div>
            </div>
          ) : (
            <div
              className="h-full w-full"
              style={{
                background: 'linear-gradient(180deg, #FFE84D 0%, #FFD600 100%)',
              }}
              aria-hidden
            />
          )}
        </div>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center px-2">
          <span
            className="rounded-full px-4 py-1.5 text-[13px] font-semibold text-white"
            style={{
              background: isCreate ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.82)',
              padding: '6px 16px',
            }}
          >
            {agent.label}
          </span>
        </div>
      </motion.div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springSnappy}
            className="overflow-hidden rounded-b-[14px] border border-t-0 border-[rgba(15,15,20,0.1)] bg-white shadow-sm"
          >
            <div className="px-4 py-3.5" style={{ padding: '14px 16px' }}>
              <ul className="space-y-2 text-[13px] leading-relaxed text-[rgba(15,15,20,0.65)]">
                {agent.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#6161FF]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function AIAgents() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="agents" className="border-b border-[rgba(12,12,15,0.05)] bg-white px-6 py-14 md:px-12 md:py-20">
      <div className="mx-auto max-w-[1280px] text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: springSnappy } }}
          >
            <SectionChip>Your agents</SectionChip>
          </motion.div>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: springSnappy } }}
            className="mt-4 text-[32px] font-semibold leading-tight tracking-[-0.02em] text-[#0c0c0f] md:text-[40px]"
          >
            Meet your new project management teammates
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: springSnappy } }}
            className="mx-auto mt-4 max-w-[500px] text-[17px] leading-relaxed text-[rgba(12,12,15,0.58)] md:text-[18px]"
          >
            Purpose-built agents that live inside monday, keeping your projects moving without manual
            coordination.
          </motion.p>
        </motion.div>

        <div
          className="mt-8 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:thin] snap-x snap-mandatory md:justify-center md:overflow-visible md:snap-none"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {agents.map((a) => (
            <AgentCard
              key={a.id}
              agent={a}
              expanded={openId === a.id}
              onExpand={(open) => setOpenId(open ? a.id : null)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
