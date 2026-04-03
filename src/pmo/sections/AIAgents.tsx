import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { SectionChip } from '../components/SectionChip'
import { mondayAgentStripSrc } from '../constants/mondayVisuals'
import { pageEase, springSnappy } from '../motion'

type Agent = {
  id: string
  label: string
  showNew: boolean
  primary: boolean
  bullets: readonly string[]
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
      'Keeps your plan current as things change. Owners, dates, and priorities updated without anyone having to ask.',
    ],
  },
  {
    id: 'risk',
    label: 'Risk analyzer',
    showNew: true,
    primary: false,
    stripIndex: 0,
    bullets: [
      "Spots what's about to go wrong before it does, so you can act while you still have options.",
    ],
  },
  {
    id: 'reporting',
    label: 'Reporting manager',
    showNew: false,
    primary: false,
    stripIndex: 1,
    bullets: [
      'Your exec update, ready before the meeting. No prep, no manual pull, just send it.',
    ],
  },
  {
    id: 'resource',
    label: 'Resource optimizer',
    showNew: false,
    primary: false,
    stripIndex: 2,
    bullets: [
      'Shows you where your people are stretched and where you have room, across every active project.',
    ],
  },
  {
    id: 'deps',
    label: 'Dependencies resolver',
    showNew: false,
    primary: false,
    stripIndex: 3,
    bullets: [
      "Tracks what's blocking what, so one slipped task doesn't quietly derail everything downstream.",
    ],
  },
  {
    id: 'create-your-own',
    label: 'Create your own',
    showNew: false,
    primary: false,
    variant: 'create',
    bullets: ['Build an agent for how your team actually works.'],
  },
]

function AgentArtwork({
  stripIndex,
  expanded,
  floatDelayMs = 0,
}: {
  stripIndex: 0 | 1 | 2 | 3
  expanded: boolean
  floatDelayMs?: number
}) {
  const reduceMotion = useReducedMotion()
  const xPercent = (stripIndex / 3) * 100
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden rounded-t-[12px]"
      aria-hidden
      animate={
        reduceMotion
          ? { scale: expanded ? 1.03 : 1 }
          : { scale: expanded ? 1.03 : 1, y: [0, -6, 0] }
      }
      transition={{
        scale: { duration: 0.2, ease: pageEase },
        y: reduceMotion
          ? { duration: 0 }
          : { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: floatDelayMs / 1000 },
      }}
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
  floatDelayMs,
}: {
  agent: Agent
  expanded: boolean
  onExpand: (open: boolean) => void
  floatDelayMs?: number
}) {
  const reduceMotion = useReducedMotion()
  const w = agent.primary ? 'min-w-[230px] w-[230px]' : 'min-w-[210px] w-[210px]'
  const isCreate = agent.variant === 'create'

  return (
    <div
      className={`flex shrink-0 snap-start flex-col ${w}`}
      data-cursor-interactive
      style={{ scrollSnapAlign: 'start' }}
      onMouseEnter={() => onExpand(true)}
      onMouseLeave={() => onExpand(false)}
    >
      <motion.div
        className={`relative h-[290px] overflow-hidden rounded-[12px] ${agent.primary ? 'ring-2 ring-[rgba(97,97,255,0.55)]' : ''} ${isCreate ? 'ring-2 ring-[rgba(97,97,255,0.35)]' : ''} ${expanded ? 'ring-2 ring-[rgba(97,97,255,0.45)] shadow-[0_0_24px_rgba(97,97,255,0.2)]' : ''}`}
        style={{
          background: isCreate ? 'linear-gradient(160deg, #7B7BFF 0%, #6161FF 45%, #4A4AE8 100%)' : '#FFD600',
        }}
        whileHover={{
          y: -4,
          boxShadow: isCreate
            ? '0 20px 40px rgba(97,97,255,0.28)'
            : '0 20px 40px rgba(255,214,0,0.22)',
        }}
        transition={{ duration: 0.2, ease: pageEase }}
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
        <div className="relative h-[65%] w-full overflow-hidden rounded-t-[12px]">
          {agent.stripIndex !== undefined ? (
            <AgentArtwork
              stripIndex={agent.stripIndex}
              expanded={expanded}
              floatDelayMs={floatDelayMs ?? 0}
            />
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
            <motion.div
              className="h-full w-full"
              style={{
                background: 'linear-gradient(180deg, #FFE84D 0%, #FFD600 100%)',
              }}
              aria-hidden
              animate={
                reduceMotion || floatDelayMs === undefined
                  ? {}
                  : { y: [0, -6, 0] }
              }
              transition={
                reduceMotion || floatDelayMs === undefined
                  ? {}
                  : { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: (floatDelayMs ?? 0) / 1000 }
              }
            />
          )}
        </div>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center px-2">
          <span
            className="rounded-full px-4 py-1.5 text-[18px] font-semibold leading-[1.3] text-white"
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
            className="overflow-hidden rounded-b-[12px] border border-t-0 border-[rgba(15,15,20,0.1)] bg-white shadow-sm"
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
    <section
      id="agents"
      className="relative z-20 -mb-[24px] overflow-hidden rounded-b-[28px] border-b-0 bg-[#0a0a0f] py-20 shadow-[0_2px_8px_rgba(0,0,0,0.3)] md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]" aria-hidden>
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <filter id="pmo-agent-noise" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" result="n" />
              <feColorMatrix type="saturate" values="0" in="n" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#pmo-agent-noise)" fill="#fff" />
        </svg>
      </div>
      <div className="pmo-container relative text-left">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: pageEase } },
            }}
          >
            <SectionChip>Your agents</SectionChip>
          </motion.div>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: pageEase } },
            }}
            className="mt-4 text-[40px] font-bold leading-[1.15] tracking-[-0.01em] text-white md:text-[44px] lg:text-[48px]"
          >
            Meet your always-on project team
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: pageEase } },
            }}
            className="mt-5 max-w-[500px] text-[16px] font-normal leading-[1.7] text-[rgba(255,255,255,0.6)] md:text-[18px]"
          >
            Handling the around-the-clock coordination, bottlenecks, and follow-through that slow projects down.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-8 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:thin] snap-x snap-mandatory md:justify-start md:overflow-visible md:snap-none"
          style={{ WebkitOverflowScrolling: 'touch' }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {agents.map((a, idx) => {
            const floatDelays = [0, 400, 800, 1200, 1600] as const
            const floatDelayMs = a.variant === 'create' ? undefined : floatDelays[idx]
            return (
              <motion.div
                key={a.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: pageEase } },
                }}
              >
                <AgentCard
                  agent={a}
                  expanded={openId === a.id}
                  onExpand={(open) => setOpenId(open ? a.id : null)}
                  floatDelayMs={floatDelayMs}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
