import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { SectionChip } from '../components/SectionChip'
import { pageEase, staggerContainer, staggerItem } from '../motion'

/** Each example: prompt copy + label for the app card that appears when it finishes. */
const EXAMPLE_PROMPTS: { text: string; tile: string }[] = [
  {
    text: 'Build me a project scenario planner so I can compare timelines, budget, and resource options side by side before we commit',
    tile: 'Project scenario planner',
  },
  {
    text: 'Create a portfolio risk register that scores impact and likelihood and surfaces what needs a mitigation plan',
    tile: 'Portfolio risk register',
  },
  {
    text: 'Give me an OKR tracker with objectives, key results, and progress bars rolled up across teams',
    tile: 'OKR tracker',
  },
]

const TYPE_MS = 38
const PAUSE_AFTER_COMPLETE_MS = 2200
const MAX_APP_STACK = 3

type AppStackItem = { id: number; tile: string }

function usePromptCycle(started: boolean) {
  const prefersReducedMotion = useReducedMotion()
  const [promptIndex, setPromptIndex] = useState(0)
  const [display, setDisplay] = useState('')
  const [appStack, setAppStack] = useState<AppStackItem[]>([])
  const stackIdRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const prompts = EXAMPLE_PROMPTS.map((p) => p.text)
  const activePrompt = prompts[promptIndex]

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(activePrompt)
      setAppStack([])
      return
    }
    if (!started) return

    let cancelled = false
    let charIndex = 0

    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }

    const onPromptComplete = () => {
      stackIdRef.current += 1
      const id = stackIdRef.current
      const builtTile = EXAMPLE_PROMPTS[promptIndex].tile
      setAppStack((prev) => {
        const next = [...prev, { id, tile: builtTile }]
        return next.length > MAX_APP_STACK ? next.slice(-MAX_APP_STACK) : next
      })
      setPromptIndex((i) => (i + 1) % prompts.length)
      setDisplay('')
    }

    const tick = () => {
      if (cancelled) return
      if (charIndex < activePrompt.length) {
        charIndex += 1
        setDisplay(activePrompt.slice(0, charIndex))
        timerRef.current = setTimeout(tick, TYPE_MS)
      } else {
        timerRef.current = setTimeout(() => {
          if (cancelled) return
          onPromptComplete()
        }, PAUSE_AFTER_COMPLETE_MS)
      }
    }

    clearTimer()
    charIndex = 0
    setDisplay('')
    timerRef.current = setTimeout(tick, 380)

    return () => {
      cancelled = true
      clearTimer()
    }
  }, [prefersReducedMotion, started, activePrompt, promptIndex, prompts.length])

  return { display, prefersReducedMotion, appStack }
}

function PromptChrome({ children, compact }: { children: React.ReactNode; compact?: boolean }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-[rgba(15,15,20,0.09)] bg-white shadow-[0_24px_64px_-12px_rgba(15,15,20,0.12),0_0_0_1px_rgba(255,255,255,0.8)_inset]">
      <div
        className={`flex items-center gap-2.5 border-b border-[rgba(15,15,20,0.06)] bg-[linear-gradient(180deg,#fcfcfd_0%,#f4f5f7_100%)] px-3.5 ${compact ? 'py-2' : 'py-2.5'}`}
      >
        <span className="flex gap-2" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" />
        </span>
        <span className={`font-medium tracking-wide text-[rgba(15,15,20,0.42)] ${compact ? 'text-[9px]' : 'text-[10px]'}`}>
          monday vibe · prompt
        </span>
      </div>
      <div
        className={`relative flex flex-1 flex-col bg-[linear-gradient(165deg,#fafbff_0%,#ffffff_45%,#fafbfc_100%)] ${compact ? 'p-3' : 'p-3.5 md:p-[1.125rem]'}`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(97,97,255,0.07) 1px, transparent 0)',
            backgroundSize: '14px 14px',
          }}
          aria-hidden
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  )
}

/** Mini fake UI inside each stacked “app” — distinct silhouette per tile. */
function AppPreviewBody({ tile, compact }: { tile: string; compact?: boolean }) {
  if (tile === 'Project scenario planner') {
    return (
      <div className={compact ? 'space-y-2' : 'space-y-3.5'}>
        <div className="flex gap-1.5 sm:gap-2">
          {['A', 'B', 'C'].map((s, i) => (
            <div
              key={s}
              className={`flex-1 rounded-lg px-2 py-1.5 text-center font-semibold shadow-sm transition-colors sm:rounded-xl sm:px-3 sm:py-2.5 ${
                compact ? 'text-[8px] sm:text-[9px]' : 'text-[10px] md:text-[11px]'
              } ${
                i === 1
                  ? 'border border-[rgba(97,97,255,0.35)] bg-white text-[#6161ff] shadow-[0_2px_8px_rgba(97,97,255,0.15)]'
                  : 'border border-[rgba(15,15,20,0.06)] bg-[rgba(255,255,255,0.7)] text-[rgba(15,15,20,0.4)]'
              }`}
            >
              Scenario {s}
            </div>
          ))}
        </div>
        <div
          className={`relative overflow-hidden rounded-lg border border-[rgba(15,15,20,0.06)] bg-[linear-gradient(180deg,#f8f9fb_0%,#ffffff_100%)] sm:rounded-xl ${
            compact ? 'h-[4.75rem] p-2 sm:h-[5.25rem]' : 'h-[6.75rem] p-3 md:h-[7.75rem]'
          }`}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                'linear-gradient(rgba(15,15,20,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,15,20,0.04) 1px, transparent 1px)',
              backgroundSize: '12px 12px',
            }}
            aria-hidden
          />
          <span
            className={`relative font-semibold uppercase tracking-[0.06em] text-[rgba(15,15,20,0.38)] ${
              compact ? 'text-[7px] sm:text-[8px]' : 'text-[9px] md:text-[10px]'
            }`}
          >
            Timeline · weeks
          </span>
          <div
            className={`absolute bottom-2 left-2 right-2 flex items-end justify-between gap-1.5 sm:bottom-3 sm:left-3 sm:right-3 sm:gap-2 ${
              compact ? 'h-8 sm:h-9' : 'h-12 md:h-14'
            }`}
          >
            {[40, 65, 50, 80, 55].map((h, j) => (
              <div
                key={j}
                className="flex-1 rounded-t-md bg-[linear-gradient(180deg,#8b8cff_0%,#6161ff_100%)] shadow-[0_-1px_2px_rgba(97,97,255,0.2)]"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
  if (tile === 'Portfolio risk register') {
    return (
      <div className={compact ? 'space-y-1.5' : 'space-y-3'}>
        <div
          className={`flex items-center justify-between border-b border-[rgba(15,15,20,0.07)] font-bold uppercase tracking-[0.06em] text-[rgba(15,15,20,0.4)] ${
            compact ? 'pb-1.5 text-[7px] sm:text-[8px]' : 'pb-2.5 text-[9px] md:text-[10px]'
          }`}
        >
          <span>Risk</span>
          <span className={compact ? 'flex gap-4' : 'flex gap-8'}>
            <span>Impact</span>
            <span>Likelihood</span>
          </span>
        </div>
        {[
          { n: 'Vendor delay', im: 'H', li: 'M' },
          { n: 'Scope creep', im: 'M', li: 'H' },
          { n: 'Key hire gap', im: 'L', li: 'L' },
        ].map((row, idx) => (
          <div
            key={row.n}
            className={`flex items-center justify-between gap-2 rounded-lg sm:rounded-xl ${
              compact ? 'px-2 py-1.5' : 'px-3 py-2.5'
            } ${idx % 2 === 0 ? 'bg-[rgba(97,97,255,0.04)]' : 'bg-white'}`}
          >
            <span
              className={`truncate font-medium text-[#0f0f14] ${compact ? 'text-[9px] sm:text-[10px]' : 'text-[11px] md:text-[12px]'}`}
            >
              {row.n}
            </span>
            <div className="flex shrink-0 gap-1.5 sm:gap-2">
              <span
                className={`min-w-[1.5rem] rounded-md bg-[#fef2f2] px-1 py-0.5 text-center font-bold tabular-nums text-[#b91c1c] sm:min-w-[1.75rem] sm:rounded-lg sm:px-2 sm:py-0.5 ${
                  compact ? 'text-[7px] sm:text-[8px]' : 'text-[9px]'
                }`}
              >
                {row.im}
              </span>
              <span
                className={`min-w-[1.5rem] rounded-md bg-[#fff7ed] px-1 py-0.5 text-center font-bold tabular-nums text-[#c2410c] sm:min-w-[1.75rem] sm:rounded-lg sm:px-2 sm:py-0.5 ${
                  compact ? 'text-[7px] sm:text-[8px]' : 'text-[9px]'
                }`}
              >
                {row.li}
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  }
  if (tile === 'OKR tracker') {
    return (
      <div className={compact ? 'space-y-2' : 'space-y-3.5'}>
        <div
          className={`relative overflow-hidden rounded-lg border border-[rgba(97,97,255,0.22)] bg-[linear-gradient(135deg,rgba(97,97,255,0.1)_0%,rgba(97,97,255,0.02)_100%)] sm:rounded-xl ${
            compact ? 'px-2.5 py-2 sm:px-3' : 'px-3.5 py-3 md:px-4 md:py-3.5'
          }`}
        >
          <div className="absolute bottom-0 left-0 top-0 w-0.5 rounded-full bg-[#6161ff] sm:w-1" aria-hidden />
          <p
            className={`font-semibold leading-snug text-[#0f0f14] ${compact ? 'text-[10px] sm:text-[11px]' : 'text-[12px] md:text-[13px]'}`}
          >
            Ship the platform relaunch
          </p>
          <p
            className={`mt-1 font-semibold uppercase tracking-wide text-[rgba(15,15,20,0.42)] ${compact ? 'text-[7px] sm:text-[8px]' : 'text-[9px] md:text-[10px]'}`}
          >
            Objective
          </p>
        </div>
        {[
          { kr: 'NPS > 45', p: 72 },
          { kr: 'On-time ≥ 90%', p: 58 },
          { kr: 'Cost within 5%', p: 81 },
        ].map((row) => (
          <div key={row.kr} className={compact ? 'space-y-1' : 'space-y-2'}>
            <div
              className={`flex justify-between gap-2 ${compact ? 'text-[8px] sm:text-[9px]' : 'text-[10px] md:text-[11px]'}`}
            >
              <span className="text-[rgba(15,15,20,0.72)]">{row.kr}</span>
              <span className="font-semibold tabular-nums text-[#6161ff]">{row.p}%</span>
            </div>
            <div
              className={`overflow-hidden rounded-full bg-[rgba(15,15,20,0.06)] p-px ${compact ? 'h-2 sm:h-2.5' : 'h-3 md:h-3.5'}`}
            >
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#8b8cff_0%,#6161ff_100%)] shadow-[0_0_8px_rgba(97,97,255,0.25)]"
                style={{ width: `${row.p}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }
  return <div className={`rounded-xl bg-[rgba(0,0,0,0.04)] ${compact ? 'h-20' : 'h-28'}`} />
}

function useMediaMinLg() {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return matches
}

function AppStackCard({ tile, compact }: { tile: string; compact?: boolean }) {
  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(15,15,20,0.11)] bg-white shadow-[0_36px_90px_-22px_rgba(15,15,20,0.28),0_0_0_1px_rgba(97,97,255,0.1)] ${
        compact ? 'md:rounded-2xl' : 'md:rounded-3xl'
      }`}
    >
      <div
        className={`flex items-center border-b border-[rgba(15,15,20,0.07)] bg-[linear-gradient(180deg,#ffffff_0%,#f6f7f9_100%)] ${
          compact
            ? 'gap-2 px-3 py-2 sm:gap-2.5 sm:px-3.5 sm:py-2.5'
            : 'gap-3 px-4 py-3 md:gap-3.5 md:px-5 md:py-3.5'
        }`}
      >
        <span
          className={`flex shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(145deg,rgba(97,97,255,0.22)_0%,rgba(97,97,255,0.1)_100%)] text-[#6161ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:rounded-2xl ${
            compact ? 'h-8 w-8 sm:h-9 sm:w-9' : 'h-11 w-11 md:h-12 md:w-12'
          }`}
        >
          <svg
            className={compact ? 'h-4 w-4 sm:h-[18px] sm:w-[18px]' : 'h-[22px] w-[22px] md:h-6 md:w-6'}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
          </svg>
        </span>
        <span
          className={`min-w-0 flex-1 truncate text-left font-semibold leading-tight tracking-[-0.015em] text-[#0f0f14] ${
            compact ? 'text-[12px] sm:text-[13px]' : 'text-[15px] md:text-[16px]'
          }`}
        >
          {tile}
        </span>
        <span
          className={`shrink-0 rounded-full border border-[rgba(22,163,74,0.3)] bg-[#ecfdf3] font-bold uppercase tracking-wide text-[#15803d] shadow-[0_1px_3px_rgba(22,163,74,0.18)] ${
            compact ? 'px-2 py-0.5 text-[8px] sm:px-2.5 sm:py-1 sm:text-[9px]' : 'px-3 py-1 text-[10px]'
          }`}
        >
          Live
        </span>
      </div>
      <div
        className={`relative flex-1 overflow-hidden bg-[linear-gradient(165deg,#fafbff_0%,#ffffff_55%)] ${
          compact ? 'min-h-[120px] p-3 sm:min-h-[140px] sm:p-4' : 'min-h-[180px] p-5 md:min-h-[210px] md:p-6'
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(97,97,255,0.12) 1px, transparent 0)',
            backgroundSize: compact ? '14px 14px' : '18px 18px',
          }}
          aria-hidden
        />
        <div className="relative">
          <AppPreviewBody tile={tile} compact={compact} />
        </div>
      </div>
    </div>
  )
}

export function BuildProjectAppSection() {
  const promptRef = useRef(null)
  const promptInView = useInView(promptRef, { once: true, amount: 0.35 })
  const { display, prefersReducedMotion, appStack } = usePromptCycle(promptInView)
  const reduce = useReducedMotion()
  const compactDemo = useMediaMinLg()

  return (
    <section id="for-teams" className="relative scroll-mt-24 overflow-hidden pmo-flow-section-top bg-[#ffffff] pmo-section-pad">
      <div className="pmo-container relative">
        <motion.div
          className="text-left"
          variants={staggerContainer(0.1)}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
        >
          <motion.div variants={staggerItem} className="flex justify-start">
            <SectionChip>Your apps</SectionChip>
          </motion.div>
          <motion.h2
            variants={staggerItem}
            className="pmo-section-title max-w-[22ch] sm:max-w-none"
          >
            <span className="block sm:inline">Need something specific? </span>
            <span className="block sm:inline">Build it in minutes.</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="pmo-body mt-3 max-w-[480px] text-[15px] leading-[1.7]">
            Describe what you need. monday builds the app on top of your live project data. No developers, no
            waiting.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-5 grid w-full grid-cols-1 gap-8 lg:mt-7 lg:grid-cols-2 lg:items-start lg:gap-6"
          variants={staggerContainer(0.14)}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          <motion.div ref={promptRef} variants={staggerItem} className="min-w-0">
            <div className="relative z-10 w-full max-w-[480px] lg:max-w-none">
              <div
                className="pointer-events-none absolute -inset-3 rounded-[20px] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(97,97,255,0.14),transparent_55%)] blur-xl sm:-inset-4"
                aria-hidden
              />
              <div className="relative rounded-2xl border border-[rgba(15,15,20,0.06)] bg-[linear-gradient(180deg,#f4f6f9_0%,#eef0f4_100%)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                <PromptChrome compact={compactDemo}>
                  <p
                    className={`flex-1 tracking-[-0.01em] text-[#0f0f14] antialiased ${
                      compactDemo
                        ? 'min-h-[4.25rem] text-[12px] leading-[1.6] sm:min-h-[4.5rem] sm:text-[13px]'
                        : 'min-h-[5.25rem] text-[13px] leading-[1.65] md:min-h-[5.5rem] md:text-[14px] md:leading-[1.7]'
                    }`}
                    aria-live={prefersReducedMotion ? 'off' : 'polite'}
                  >
                    {display}
                    <motion.span
                      className="ml-0.5 inline-block w-[2px] rounded-[1px] bg-[#6161ff] align-middle shadow-[0_0_6px_rgba(97,97,255,0.5)]"
                      style={{ height: '1.05em' }}
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.85,
                        repeat: prefersReducedMotion ? 0 : Infinity,
                        ease: 'easeInOut',
                      }}
                      aria-hidden
                    />
                  </p>
                </PromptChrome>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className={`relative mx-auto w-full min-w-0 max-w-[min(100%,720px)] lg:mx-0 lg:max-w-none ${
              compactDemo ? 'min-h-[200px] sm:min-h-[220px]' : 'min-h-[260px] sm:min-h-[300px] md:min-h-[340px]'
            } mt-10 lg:mt-0`}
            aria-label="Apps generated from prompts"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0" aria-hidden>
              <AnimatePresence initial={false}>
                {appStack.map((item, i) => {
                  const depth = appStack.length - 1 - i
                  const lift = depth * (compactDemo ? 14 : 22)
                  const scale = (compactDemo ? 0.92 : 0.94) + depth * (compactDemo ? 0.026 : 0.028)
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 36, scale: 0.88 }}
                      animate={{
                        opacity: 1,
                        y: lift,
                        scale,
                        rotateZ: depth === 0 ? -1.2 : depth === 1 ? 0.7 : depth === 2 ? -0.5 : 0,
                      }}
                      exit={{ opacity: 0, scale: 0.86, y: lift + 16 }}
                      transition={{ duration: 0.48, ease: pageEase }}
                      className="isolate absolute left-0 right-0 origin-top"
                      style={{ zIndex: i + 1 }}
                    >
                      <AppStackCard tile={item.tile} compact={compactDemo} />
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            <div
              className="invisible"
              style={{
                height: appStack.length
                  ? Math.min(
                      appStack.length * (compactDemo ? 16 : 24) + (compactDemo ? 190 : 260),
                      compactDemo ? 340 : 420,
                    )
                  : 0,
              }}
              aria-hidden
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
