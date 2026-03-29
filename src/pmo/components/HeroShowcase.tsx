import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  heroAgentStorySteps,
  mondayAgentHeadshotUrl,
  mondayAgentStripSrc,
  type HeroStoryMedia,
} from '../constants/mondayVisuals'
import { springSoft } from '../motion'

const steps = heroAgentStorySteps

function WindowChrome() {
  return (
    <div className="border-b border-[rgba(15,15,20,0.08)] bg-[#fafafa] px-4 py-2.5">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#FF6B6B]" aria-hidden />
        <span className="h-2 w-2 rounded-full bg-[#FFCC33]" aria-hidden />
        <span className="h-2 w-2 rounded-full bg-[#3DD598]" aria-hidden />
        <span className="ml-2 text-[11px] font-medium text-[rgba(15,15,20,0.45)]">
          Agent session · monday.com
        </span>
      </div>
      <p className="mt-2 text-[10px] text-[rgba(15,15,20,0.4)]">
        Context · <span className="font-semibold text-[rgba(15,15,20,0.55)]">Docs</span>
        <span className="mx-1.5 text-[rgba(15,15,20,0.25)]">·</span>
        Slack
        <span className="mx-1.5 text-[rgba(15,15,20,0.25)]">·</span>
        Drive
      </p>
    </div>
  )
}

/**
 * Brief / docs → monday sync: doc context flowing into the work OS.
 */
function HeroBriefSlide({ replayKey }: { replayKey: string }) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<'doc' | 'sync' | 'done'>(reduce ? 'done' : 'doc')

  useEffect(() => {
    if (reduce) {
      setPhase('done')
      return
    }
    setPhase('doc')
    const t1 = window.setTimeout(() => setPhase('sync'), 700)
    const t2 = window.setTimeout(() => setPhase('done'), 1900)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [replayKey, reduce])

  const bullets = [
    'Kickoff scope & success metrics',
    'Milestones & dependency map',
    'Risks & stakeholders',
  ]

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#f1f1ef] via-white to-[rgba(97,97,255,0.06)] p-3 sm:p-5">
      <div className="flex w-full max-w-[min(100%,720px)] flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4">
        {/* Source doc */}
        <motion.div
          className="flex min-h-[200px] flex-1 flex-col rounded-xl border border-[rgba(15,15,15,0.12)] bg-white p-4 shadow-[0_8px_30px_rgba(15,15,20,0.08)]"
          initial={false}
          animate={{ scale: phase === 'done' ? 0.98 : 1 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#0f0f0f] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              Docs
            </span>
            <span className="text-[10px] font-medium text-[rgba(15,15,20,0.45)]">Workspace · PMO</span>
          </div>
          <p className="mt-3 text-[15px] font-semibold leading-tight text-[#0f0f0f]">Q3 Launch brief</p>
          <ul className="mt-3 space-y-2">
            {bullets.map((b, i) => (
              <li key={b} className="flex gap-2 text-[12px] leading-snug text-[rgba(15,15,15,0.88)]">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[rgba(15,15,15,0.35)]" aria-hidden />
                <span className="flex-1">{b}</span>
                {phase === 'done' && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className="text-[#00c875]"
                    aria-hidden
                  >
                    ✓
                  </motion.span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Connector + monday */}
        <div className="flex flex-1 flex-col justify-center gap-3 sm:max-w-[48%]">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <motion.div
              className="hidden h-px w-6 bg-[rgba(97,97,255,0.35)] sm:block"
              animate={{ opacity: phase === 'sync' || phase === 'done' ? 1 : 0.3 }}
            />
            <motion.div
              className="rounded-full border border-[rgba(97,97,255,0.35)] bg-[rgba(97,97,255,0.08)] px-3 py-1.5 text-[10px] font-semibold text-[#6161FF]"
              animate={{ scale: phase === 'sync' ? [1, 1.04, 1] : 1 }}
              transition={{ repeat: phase === 'sync' ? Infinity : 0, duration: 0.8 }}
            >
              {phase === 'sync' ? 'Syncing docs → monday…' : phase === 'done' ? 'Synced to monday' : 'Ready to sync'}
            </motion.div>
          </div>

          <motion.div
            className="rounded-xl border border-[rgba(97,97,255,0.2)] bg-white p-3 shadow-[0_8px_28px_rgba(97,97,255,0.12)]"
            initial={{ opacity: 0.85 }}
            animate={{ opacity: phase === 'done' ? 1 : 0.65 }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#6161FF]">monday · Program board</p>
            <div className="mt-2 space-y-1.5">
              {['Scope', 'Build', 'UAT', 'Launch'].map((col, i) => (
                <motion.div
                  key={col}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{
                    opacity: phase === 'done' ? 1 : 0.35,
                    x: phase === 'done' ? 0 : 4,
                  }}
                  transition={{ delay: phase === 'done' ? i * 0.06 : 0 }}
                  className="flex items-center justify-between rounded-md bg-[rgba(97,97,255,0.08)] px-2 py-1.5 text-[10px] font-medium text-[#0f0f14]"
                >
                  <span>{col}</span>
                  {phase === 'done' && (
                    <span className="text-[9px] text-[rgba(15,15,20,0.45)]">from docs</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function AgentStripFrame({ stripIndex }: { stripIndex: 0 | 1 | 2 | 3 }) {
  const xPercent = (stripIndex / 3) * 100
  return (
    <div
      className="absolute inset-0 bg-[#0a1620]"
      style={{
        backgroundImage: `url(${mondayAgentStripSrc})`,
        backgroundSize: '400% 100%',
        backgroundPosition: `${xPercent}% 42%`,
        backgroundRepeat: 'no-repeat',
      }}
      aria-hidden
    />
  )
}

function StoryMediaArea({ media, replayKey }: { media: HeroStoryMedia; replayKey: string }) {
  if (media.kind === 'brief') {
    return <HeroBriefSlide replayKey={replayKey} />
  }
  if (media.kind === 'image') {
    return (
      <img
        src={media.src}
        alt={media.alt}
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
        decoding="async"
      />
    )
  }
  return <AgentStripFrame stripIndex={media.stripIndex} />
}

function StaticOverview() {
  return (
    <div className="grid gap-2 px-4 pb-5 pt-4 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 sm:px-5">
      {steps.map((s) => (
        <div
          key={s.id}
          className="rounded-xl border border-[rgba(15,15,20,0.1)] bg-white p-3 text-left shadow-sm"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6161FF]">
            {s.stepNum}. {s.title}
          </p>
          <p className="mt-2 text-[11px] leading-relaxed text-[rgba(15,15,20,0.65)]">{s.body}</p>
        </div>
      ))}
    </div>
  )
}

function StepPills({
  step,
  onSelectStep,
}: {
  step: number
  onSelectStep: (i: number) => void
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 border-t border-[rgba(15,15,20,0.06)] px-2 py-3 sm:gap-2">
      {steps.map((s, i) => (
        <button
          key={s.id}
          type="button"
          aria-label={`Step ${s.stepNum}: ${s.title}`}
          aria-current={i === step ? 'true' : undefined}
          onClick={() => onSelectStep(i)}
          className={`rounded-full px-2.5 py-1.5 text-[10px] font-semibold transition-colors sm:px-3 sm:text-[11px] ${
            i === step
              ? 'bg-[#6161FF] text-white'
              : 'bg-[rgba(15,15,20,0.06)] text-[rgba(15,15,20,0.55)] hover:bg-[rgba(15,15,20,0.1)]'
          }`}
        >
          {s.stepNum}. {s.title}
        </button>
      ))}
    </div>
  )
}

/** Placeholder media area until a hero video is wired in ({@link heroAgentStorySteps}). */
function HeroVideoPlaceholder({
  activeStep,
  onSelectStep,
}: {
  activeStep: number
  onSelectStep: (index: number) => void
}) {
  return (
    <div className="absolute inset-0 z-[1] flex flex-col bg-[#0c0c0f]">
      <div className="pointer-events-none absolute inset-3 rounded-xl border-2 border-dashed border-white/18 sm:inset-4" aria-hidden />
      <div className="relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
          Video placeholder — planned reel
        </p>
        <ol className="mt-4 space-y-2">
          {steps.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onSelectStep(i)}
                aria-label={`Chapter ${s.stepNum}: ${s.title}`}
                aria-current={activeStep === i ? 'step' : undefined}
                className={`w-full rounded-lg border px-3 py-2 text-left transition-colors ${
                  activeStep === i
                    ? 'border-[#6161FF]/45 bg-[#6161FF]/12'
                    : 'border-white/[0.12] bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]'
                }`}
              >
                <p className="text-[11px] font-semibold text-white/95">
                  Chapter {s.stepNum}: {s.title}
                </p>
                <p className="mt-1 text-[10px] leading-snug text-white/50">{s.body}</p>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function HeroCompositeShell({
  step,
  setStep,
}: {
  step: number
  setStep: Dispatch<SetStateAction<number>>
}) {
  const active = steps[step]

  return (
    <div
      role="region"
      aria-label="PMO agent workflow: hero video placeholder"
      className="relative w-full overflow-hidden rounded-2xl border border-[rgba(15,15,20,0.1)] bg-[#0c0c0f] shadow-[0_24px_80px_rgba(15,15,20,0.15)] ring-1 ring-[rgba(15,15,20,0.08)]"
    >
      <WindowChrome />

      <div className="relative aspect-video min-h-[280px] w-full overflow-hidden bg-[#0c0c0f] sm:min-h-0">
        <HeroVideoPlaceholder activeStep={step} onSelectStep={setStep} />

        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[rgba(12,12,15,0.45)] via-[rgba(12,12,15,0.08)] to-transparent"
          aria-hidden
        />

        <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-[3] flex items-end justify-between gap-3 sm:bottom-4 sm:left-4 sm:right-4">
          <div className="pointer-events-auto flex max-w-[min(100%,240px)] items-center gap-2 rounded-xl border border-white/20 bg-[rgba(12,12,15,0.45)] p-1.5 pr-3 shadow-lg backdrop-blur-sm sm:max-w-[280px] sm:gap-3 sm:p-2">
            <img
              src={mondayAgentHeadshotUrl}
              alt="PMO agent, monday.com AI agent"
              width={128}
              height={128}
              className="h-12 w-12 shrink-0 rounded-lg object-cover object-top sm:h-14 sm:w-14"
              loading="eager"
            />
            <div className="min-w-0">
              <p className="text-[12px] font-bold leading-tight text-white sm:text-[13px]">PMO agent</p>
              <p className="text-[10px] leading-snug text-white/80 sm:text-[11px]">monday.com</p>
            </div>
          </div>
          <div className="pointer-events-none hidden max-w-[58%] text-right sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90">
              Step {active.stepNum}
            </p>
            <p className="mt-0.5 text-[12px] font-semibold leading-snug text-white drop-shadow-md sm:text-[13px]">
              {active.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Optional carousel variant (docs → monday, boards, …) — not used when the hero video shell is active. */
export function HeroStoryShell({ step, setStep }: { step: number; setStep: (i: number) => void }) {
  const active = steps[step]

  return (
    <div
      role="region"
      aria-label="monday.com AI agents: live context, boards, resources, risks, and reports"
      className="relative w-full overflow-hidden rounded-2xl border border-[rgba(15,15,20,0.1)] bg-[#0c0c0f] shadow-[0_24px_80px_rgba(15,15,20,0.15)] ring-1 ring-[rgba(15,15,20,0.08)]"
    >
      <WindowChrome />

      <div className="relative aspect-video w-full overflow-hidden bg-[#0c0c0f]">
        {/* Story slides are the hero (ministite-style); no marketing reel behind them. */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-[#0a0a0f] via-[#12121a] to-[#0c0c0f]"
          aria-hidden
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className="absolute inset-0 z-[1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <StoryMediaArea media={active.media} replayKey={active.id} />
          </motion.div>
        </AnimatePresence>

        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[rgba(12,12,15,0.45)] via-[rgba(12,12,15,0.08)] to-transparent"
          aria-hidden
        />

        <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-[3] flex items-end justify-between gap-3 sm:bottom-4 sm:left-4 sm:right-4">
          <div className="pointer-events-auto flex max-w-[min(100%,240px)] items-center gap-2 rounded-xl border border-white/20 bg-[rgba(12,12,15,0.45)] p-1.5 pr-3 shadow-lg backdrop-blur-sm sm:max-w-[280px] sm:gap-3 sm:p-2">
            <img
              src={mondayAgentHeadshotUrl}
              alt="PMO agent, monday.com AI agent"
              width={128}
              height={128}
              className="h-12 w-12 shrink-0 rounded-lg object-cover object-top sm:h-14 sm:w-14"
              loading="eager"
            />
            <div className="min-w-0">
              <p className="text-[12px] font-bold leading-tight text-white sm:text-[13px]">PMO agent</p>
              <p className="text-[10px] leading-snug text-white/80 sm:text-[11px]">monday.com</p>
            </div>
          </div>
          <div className="pointer-events-none hidden max-w-[58%] text-right sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90">
              Step {active.stepNum}
            </p>
            <p className="mt-0.5 text-[12px] font-semibold leading-snug text-white drop-shadow-md sm:text-[13px]">
              {active.title}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[rgba(15,15,20,0.08)] bg-white px-4 py-3 sm:px-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={springSoft}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6161FF]">
              Step {active.stepNum} · {active.title}
            </p>
            <p className="mt-1 text-[13px] leading-snug text-[rgba(15,15,20,0.72)] sm:text-[14px]">
              {active.body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <StepPills step={step} onSelectStep={setStep} />
    </div>
  )
}

export function HeroShowcase() {
  const prefersReducedMotion = useReducedMotion()
  const [step, setStep] = useState(0)

  if (prefersReducedMotion) {
    return (
      <div
        role="region"
        aria-label="monday.com AI agents and PMO workflows"
        className="relative w-full overflow-hidden rounded-2xl border border-[rgba(15,15,20,0.1)] bg-white shadow-[0_24px_80px_rgba(15,15,20,0.1)] ring-1 ring-[rgba(15,15,20,0.05)]"
      >
        <WindowChrome />
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:gap-6 sm:p-5">
          <img
            src="/videos/hero-project-board.png"
            alt="monday work management project board"
            className="aspect-video w-full rounded-xl object-cover sm:max-w-[52%]"
            loading="eager"
          />
          <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-stretch">
            <img
              src={mondayAgentHeadshotUrl}
              alt="PMO agent, monday.com AI agent"
              width={160}
              height={160}
              className="h-20 w-20 rounded-2xl object-cover object-top shadow-md ring-2 ring-[rgba(97,97,255,0.25)] sm:h-24 sm:w-24"
            />
            <div>
              <p className="text-[13px] font-bold text-[#0f0f14]">PMO agent</p>
              <p className="text-[11px] text-[rgba(15,15,20,0.55)]">Agents in monday.com</p>
            </div>
          </div>
        </div>
        <StaticOverview />
      </div>
    )
  }

  return <HeroCompositeShell step={step} setStep={setStep} />
}
