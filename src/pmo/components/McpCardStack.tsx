import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { springSnappy, springSoft } from '../motion'

const replySpring = { type: 'spring' as const, stiffness: 380, damping: 26, mass: 0.82 }

const heroEase = [0.22, 1, 0.36, 1] as const

/** Full loop length: must cover typing, sync, reply stagger (Workato-style hero replay). */
const HERO_LOOP_MS = 9800

type CardId = 'claude' | 'chatgpt' | 'copilot'

type AssistantDemo = {
  question: string
  replyIntro: string
  replyRows: readonly string[]
}

/** Distinct prompts per assistant: updates chased, risks flagged, leadership reporting. */
const ASSISTANT_DEMOS: Record<CardId, AssistantDemo> = {
  claude: {
    question: 'What owner updates or blockers on the Q3 launch board need my attention today?',
    replyIntro: 'Catch-ups synced from monday:',
    replyRows: [
      'Design: Figma handoff done; 2 dependencies unblocked',
      'Eng: API migration on track; infra review scheduled Thu',
      'Project management: Budget line awaiting approval; owner auto-nudged',
    ],
  },
  chatgpt: {
    question: 'What projects are at risk this week?',
    replyIntro: '3 projects flagged at risk:',
    replyRows: [
      'Website redesign (delayed 4 days)',
      'Q4 campaign (resource conflict)',
      'Platform migration (dependency blocked)',
    ],
  },
  copilot: {
    question:
      'Draft a leadership-ready brief: portfolio health and top decisions needed before Q3 close.',
    replyIntro: 'Executive summary from live portfolio data:',
    replyRows: [
      'Health: 12 on track · 4 at risk · 1 blocked. RAG roll-up by program',
      'Budget vs actual: 3% under portfolio-wide; 2 line items over threshold',
      'Decisions needed: CRM migration scope tradeoff, Platform squad staffing',
    ],
  },
}

function ClaudeMark() {
  return (
    <span
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-[11px] font-bold"
      style={{ background: '#D4A574', color: '#1a1a1a' }}
      aria-hidden
    >
      A
    </span>
  )
}

function ChatGPTMark() {
  return (
    <span
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] text-[11px] font-bold text-white"
      style={{ background: '#10A37F' }}
      aria-hidden
    >
      G
    </span>
  )
}

function CopilotMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2l8 4v8l-8 4-8-4V6l8-4z" fill="#0078D4" />
      <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="1.5" />
    </svg>
  )
}

function InnerPanel({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[12px] border border-[rgba(15,15,20,0.1)] bg-white p-4 shadow-sm">{children}</div>
  )
}

function MondayBoardIcon() {
  return (
    <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[#6161FF]" aria-hidden>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
        <path d="M6 18V6h3v12H6zm4.5 0V9h3v9h-3zm4.5-6V6h3v6h-3z" fill="white" />
      </svg>
    </span>
  )
}

function RiskChatStatic({ demo }: { demo: AssistantDemo }) {
  const flat = `${demo.replyIntro} ${demo.replyRows.join(' ')}`
  return (
    <InnerPanel>
      <p className="text-[11px] text-[rgba(15,15,20,0.45)]">You</p>
      <p className="mt-1 text-[12px] text-[#0f0f14]">{demo.question}</p>
      <div className="mt-3 rounded-lg border border-[rgba(15,15,20,0.1)] bg-[#f9fafb] p-3 text-left">
        <p className="text-[11px] leading-relaxed text-[rgba(15,15,20,0.75)]">{flat}</p>
        <p className="mt-2 flex items-center gap-1.5 text-[10px] text-[rgba(15,15,20,0.45)]">
          <MondayBoardIcon /> monday
        </p>
      </div>
    </InnerPanel>
  )
}

function SyncingDots() {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span key={i} className="inline-block h-1 w-1 rounded-full bg-[#6161FF] opacity-80" />
      ))}
    </span>
  )
}

function AssistantRiskChatAnimated({ loopKey, demo }: { loopKey: number; demo: AssistantDemo }) {
  const q = demo.question
  const typeStart = 0.28
  const typeChar = 0.02
  const typeEnd = typeStart + q.length * typeChar
  const syncShow = typeEnd + 0.12
  const replyShow = syncShow + 0.42
  const rowStagger = 0.1
  const footerShow = replyShow + 0.38 + demo.replyRows.length * rowStagger + 0.15

  return (
    <motion.div
      key={loopKey}
      className="overflow-hidden rounded-[12px] border border-[rgba(15,15,20,0.1)] bg-white p-4 shadow-[0_2px_24px_rgba(15,15,20,0.08)]"
      initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.55, ease: heroEase }}
    >
      <motion.p
        className="text-[11px] text-[rgba(15,15,20,0.45)]"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay: 0.06, ease: heroEase }}
      >
        You
      </motion.p>
      <span className="sr-only">{q}</span>
      <p className="relative mt-1 min-h-[2.5rem] text-[12px] text-[#0f0f14]" aria-hidden>
        {q.split('').map((ch, i) => (
          <motion.span
            key={`${loopKey}-${i}-${ch === ' ' ? 'sp' : ch}`}
            className="inline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.028, delay: typeStart + i * typeChar, ease: 'easeOut' }}
          >
            {ch}
          </motion.span>
        ))}
        <motion.span
          className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-px bg-[#6161FF]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: typeEnd + 0.04, duration: 0.12 }}
          style={{ verticalAlign: 'text-bottom' }}
        />
      </p>

      <motion.div
        className="mt-2 flex min-h-[1.25rem] items-center gap-2 text-[10px] font-medium text-[#8585FF]"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, delay: syncShow, ease: heroEase }}
      >
        <motion.span
          className="flex items-center gap-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <SyncingDots />
          <span>Syncing with monday</span>
        </motion.span>
      </motion.div>

      <motion.div
        className="relative mt-2 overflow-hidden rounded-lg border border-[rgba(15,15,20,0.08)] bg-[#f9fafb] p-3"
        initial={{ opacity: 0, y: 22, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...replySpring, delay: replyShow }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.06] to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 0.85, delay: replyShow + 0.06, ease: heroEase }}
        />

        <motion.p
          className="relative text-[11px] font-semibold leading-relaxed text-[#0f0f14]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springSoft, delay: replyShow + 0.05 }}
        >
          {demo.replyIntro}
        </motion.p>

        <ul className="relative mt-2 space-y-1.5">
          {demo.replyRows.map((line, i) => (
            <motion.li
              key={line}
              className="flex gap-2 text-[11px] leading-snug text-[rgba(15,15,20,0.75)]"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springSnappy, delay: replyShow + 0.12 + i * rowStagger }}
            >
              <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[#6161FF]" aria-hidden />
              <span>{line}</span>
            </motion.li>
          ))}
        </ul>

        <motion.div
          className="relative mt-3 flex items-center gap-1.5 border-t border-[rgba(15,15,20,0.08)] pt-2 text-[10px] text-[rgba(15,15,20,0.45)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.28, delay: footerShow }}
        >
          <MondayBoardIcon /> <span>monday</span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function AssistantRiskChatBody({ loopKey, cardId }: { loopKey: number; cardId: CardId }) {
  const prefersReduced = useReducedMotion()
  const demo = ASSISTANT_DEMOS[cardId]
  if (prefersReduced) {
    return <RiskChatStatic demo={demo} />
  }
  return <AssistantRiskChatAnimated loopKey={loopKey} demo={demo} />
}

/**
 * Workato-style accordion ([workato.com](https://www.workato.com/)): one assistant expanded (−),
 * others collapsed (+); a single panel shows the live monday sync demo.
 */
export function McpCardStack() {
  const prefersReduced = useReducedMotion()
  const [active, setActive] = useState<CardId>('claude')
  const [loopKey, setLoopKey] = useState(0)

  useEffect(() => {
    setLoopKey((k) => k + 1)
  }, [active])

  useEffect(() => {
    if (prefersReduced) return
    const id = window.setInterval(() => setLoopKey((k) => k + 1), HERO_LOOP_MS)
    return () => window.clearInterval(id)
  }, [prefersReduced])

  const cards: { id: CardId; title: string; shortTitle: string; header: ReactNode }[] = [
    { id: 'claude', title: 'Claude', shortTitle: 'Claude', header: <ClaudeMark /> },
    { id: 'chatgpt', title: 'ChatGPT', shortTitle: 'ChatGPT', header: <ChatGPTMark /> },
    {
      id: 'copilot',
      title: 'Microsoft Copilot',
      shortTitle: 'Copilot',
      header: <CopilotMark />,
    },
  ]

  return (
    <div className="relative mx-auto w-full max-w-[min(100%,720px)] px-0 sm:px-2">
      <div className="overflow-hidden rounded-[16px] border border-[rgba(15,15,20,0.1)] bg-[#ebebef] shadow-[0_24px_60px_rgba(15,15,20,0.1)]">
        <div
          role="tablist"
          aria-label="Choose AI assistant"
          className="grid grid-cols-3 divide-x divide-[rgba(15,15,20,0.08)]"
        >
          {cards.map((c) => {
            const expanded = active === c.id
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={expanded}
                aria-controls="mcp-assistant-panel"
                id={`mcp-tab-${c.id}`}
                onClick={() => setActive(c.id)}
                className={`flex min-h-[72px] items-center justify-between gap-1 px-2 py-3 text-left transition-colors sm:min-h-0 sm:px-4 sm:py-4 ${
                  expanded
                    ? 'bg-white shadow-[inset_0_-2px_0_0_#6161FF]'
                    : 'bg-[#f0f0f3] hover:bg-[#e6e6ea]'
                }`}
              >
                <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2">
                  {c.header}
                  <span className="truncate text-[11px] font-semibold text-[#0f0f14] sm:hidden">{c.shortTitle}</span>
                  <span className="hidden truncate text-[13px] font-semibold text-[#0f0f14] sm:inline sm:text-[14px]">
                    {c.title}
                  </span>
                </div>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[15px] font-medium leading-none ${
                    expanded
                      ? 'border-[rgba(15,15,20,0.12)] bg-[rgba(15,15,20,0.06)] text-[#0f0f14]'
                      : 'border-[rgba(15,15,20,0.1)] bg-white/80 text-[rgba(15,15,20,0.45)]'
                  }`}
                  aria-hidden
                >
                  {expanded ? <Minus className="h-3.5 w-3.5" strokeWidth={2.5} /> : <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />}
                </span>
              </button>
            )
          })}
        </div>

        <div
          id="mcp-assistant-panel"
          role="tabpanel"
          aria-labelledby={`mcp-tab-${active}`}
          className="border-t border-[rgba(15,15,20,0.08)] bg-white p-4 sm:p-5"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: heroEase }}
              className="select-none"
            >
              <AssistantRiskChatBody loopKey={loopKey} cardId={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
