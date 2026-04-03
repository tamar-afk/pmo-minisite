import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Plus } from 'lucide-react'
import { useState } from 'react'
import { SectionChip } from '../components/SectionChip'
import { pageEase, staggerContainer, staggerItem } from '../motion'

type Agent = {
  id: string
  label: string
  description: string
  /** Initial letter for gradient cards; build uses special layout */
  initial: string
  placeholder: { type: 'gradient'; css: string } | { type: 'build' }
}

const agents: Agent[] = [
  {
    id: 'project',
    label: 'Project agent',
    description: 'Keeps your plan current. Owners, dates, and priorities updated as things change.',
    initial: 'P',
    placeholder: {
      type: 'gradient',
      css: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    },
  },
  {
    id: 'risk',
    label: 'Risk agent',
    description: "Spots what's about to go wrong before it does, so you can act while you still have options.",
    initial: 'R',
    placeholder: {
      type: 'gradient',
      css: 'linear-gradient(135deg, #1a1420, #2d1b3d)',
    },
  },
  {
    id: 'reporting',
    label: 'Reporting agent',
    description: 'Your exec update, ready before the meeting. No prep, no manual pull, just send it.',
    initial: 'R',
    placeholder: {
      type: 'gradient',
      css: 'linear-gradient(135deg, #0d1f2d, #1a3a4a)',
    },
  },
  {
    id: 'resource',
    label: 'Resource agent',
    description:
      'Shows you where your people are stretched and where you have room, across every active project.',
    initial: 'R',
    placeholder: {
      type: 'gradient',
      css: 'linear-gradient(135deg, #1a2a1a, #2d4a2d)',
    },
  },
  {
    id: 'deps',
    label: 'Dependencies agent',
    description:
      "Tracks what's blocking what, so one slipped task doesn't quietly derail everything downstream.",
    initial: 'D',
    placeholder: {
      type: 'gradient',
      css: 'linear-gradient(135deg, #2a1a0d, #4a2d1a)',
    },
  },
  {
    id: 'build-your-own',
    label: 'Build your own',
    description: 'Build an agent for how your team actually works.',
    initial: 'B',
    placeholder: { type: 'build' },
  },
]

function AgentCard({
  agent,
  isOpen,
  onToggle,
}: {
  agent: Agent
  isOpen: boolean
  onToggle: () => void
}) {
  const { label, description, initial, placeholder } = agent

  return (
    <motion.div
      variants={staggerItem}
      className="min-w-[68px] flex-1 basis-0 sm:min-w-[76px]"
      data-cursor-interactive
    >
      <div className="overflow-hidden rounded-[10px] border border-[rgba(0,0,0,0.07)] bg-[#ffffff] transition-[box-shadow,transform] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="group flex w-full flex-col items-center px-1 pb-1.5 pt-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#6161ff] focus-visible:ring-offset-2 sm:px-2 sm:pb-2 sm:pt-4"
        >
          {placeholder.type === 'gradient' ? (
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14 md:h-16 md:w-16"
              style={{ backgroundImage: placeholder.css }}
            >
              <span className="text-[15px] font-semibold leading-none text-[rgba(255,255,255,0.45)] sm:text-lg md:text-xl">
                {initial}
              </span>
            </div>
          ) : (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-[rgba(0,0,0,0.12)] bg-[#fafafa] sm:h-14 sm:w-14 md:h-16 md:w-16">
              <Plus className="h-5 w-5 text-[#6161ff] opacity-50 sm:h-6 sm:w-6" strokeWidth={2} aria-hidden />
            </div>
          )}
          <span className="mt-1.5 line-clamp-2 w-full text-center text-[10px] font-medium leading-tight text-[#111118] sm:mt-2.5 sm:text-[11px] md:text-[12px]">
            {label}
          </span>
          <ChevronDown
            className={`mt-1.5 h-3.5 w-3.5 shrink-0 text-[#9ca3af] transition-transform duration-200 group-hover:text-[#6b7280] ${isOpen ? 'rotate-180' : ''}`}
            strokeWidth={2}
            aria-hidden
          />
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="desc"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: pageEase }}
              className="overflow-hidden border-t border-[rgba(0,0,0,0.06)]"
            >
              <p className="px-2.5 pb-3 pt-2 text-left text-[11px] leading-relaxed text-[#6b7280] sm:px-3 sm:text-[12px]">
                {description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function AIAgents() {
  const reduce = useReducedMotion()
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="agents" className="scroll-mt-24 pmo-flow-section-top bg-[#ffffff] pmo-section-pad">
      <div className="pmo-container text-left">
        <motion.div
          variants={staggerContainer(0.055)}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          <motion.div variants={staggerItem}>
            <SectionChip>Your agents</SectionChip>
          </motion.div>
          <motion.h2 variants={staggerItem} className="pmo-section-title max-w-[640px]">
            Meet your always-on project team
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="mt-3 max-w-[520px] text-[15px] font-normal leading-[1.7] text-[#6b7280]"
          >
            Handling the around-the-clock coordination, bottlenecks, and follow-through that slow projects down.
          </motion.p>

          <motion.div
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
            }}
            className="mt-5 w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="mx-auto flex min-w-0 max-w-[920px] flex-nowrap justify-center gap-1 sm:gap-1.5 md:gap-2">
              {agents.map((a) => (
                <AgentCard
                  key={a.id}
                  agent={a}
                  isOpen={openId === a.id}
                  onToggle={() => toggle(a.id)}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
