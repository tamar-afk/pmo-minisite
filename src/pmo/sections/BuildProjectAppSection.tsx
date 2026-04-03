import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { SectionChip } from '../components/SectionChip'
import { springSoft, staggerContainer, staggerItem } from '../motion'

const tiles = [
  'OKR tracker',
  'Portfolio risk register',
  'Executive overview',
  'Resource insights',
  'Project scenario planner',
  'Budget tracker',
  'Milestone dashboard',
  'Dependency map',
]

const PROMPT =
  'Build me an executive overview dashboard showing RAG status, upcoming milestones, and budget vs. actuals across all active projects'

function usePromptTypewriter(started: boolean) {
  const prefersReducedMotion = useReducedMotion()
  const [display, setDisplay] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(PROMPT)
      return
    }
    if (!started) return

    let cancelled = false
    let i = 0
    const TYPE_MS = 40
    const PAUSE_MS = 2500
    const tick = () => {
      if (cancelled) return
      if (i < PROMPT.length) {
        i += 1
        setDisplay(PROMPT.slice(0, i))
        timerRef.current = setTimeout(tick, TYPE_MS)
      } else {
        timerRef.current = setTimeout(() => {
          if (cancelled) return
          i = 0
          setDisplay('')
          tick()
        }, PAUSE_MS)
      }
    }
    timerRef.current = setTimeout(tick, 400)
    return () => {
      cancelled = true
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [prefersReducedMotion, started])

  return { display, prefersReducedMotion }
}

export function BuildProjectAppSection() {
  const promptRef = useRef(null)
  const promptInView = useInView(promptRef, { once: true, amount: 0.35 })
  const { display, prefersReducedMotion } = usePromptTypewriter(promptInView)
  const activeTile = display.toLowerCase().includes('executive') ? 'Executive overview' : null
  const reduce = useReducedMotion()

  return (
    <section
      id="for-teams"
      className="relative scroll-mt-24 overflow-hidden bg-[rgba(247,247,248,0.55)] px-4 py-14 backdrop-blur-[1px] md:px-8 md:py-20 lg:px-12 lg:py-22"
    >
      <div className="relative mx-auto max-w-[1100px]">
        <motion.div
          className="text-left"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
        >
          <motion.div variants={staggerItem} className="mb-3 flex justify-start">
            <SectionChip>Your apps</SectionChip>
          </motion.div>
          <motion.h2
            variants={staggerItem}
            className="max-w-[22ch] text-[40px] font-bold leading-[1.2] tracking-[-0.035em] text-[#0f0f14] sm:max-w-none md:text-[44px] lg:text-[48px]"
          >
            <span className="block sm:inline">Need something specific? </span>
            <span className="block sm:inline">Build it in minutes.</span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="mt-5 max-w-[560px] text-[16px] font-normal leading-[1.6] text-[rgba(15,15,20,0.55)] md:mt-6 md:text-[18px]"
          >
            Describe what you need. monday builds the app on top of your live project data. No developers, no
            waiting.
          </motion.p>
        </motion.div>

        <motion.div
          className="mx-auto mt-8 max-w-[560px] lg:mt-10"
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          <motion.div ref={promptRef} variants={staggerItem} className="min-h-0">
            <div className="flex h-full flex-col overflow-hidden rounded-[12px] border border-[rgba(15,15,20,0.08)] bg-white shadow-[0_24px_70px_rgba(15,15,20,0.09)] ring-1 ring-[rgba(15,15,20,0.04)]">
              <div className="flex items-center gap-2 border-b border-[rgba(15,15,20,0.06)] bg-[#fafafa] px-4 py-2.5">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="h-2 w-2 rounded-full bg-[#FF6B6B]" />
                  <span className="h-2 w-2 rounded-full bg-[#FFCC33]" />
                  <span className="h-2 w-2 rounded-full bg-[#3DD598]" />
                </span>
                <span className="text-[11px] font-medium text-[rgba(15,15,20,0.45)]">monday vibe · prompt</span>
              </div>
              <div className="flex flex-1 flex-col bg-gradient-to-b from-[#fafbff] to-white p-4 md:p-5">
                <p
                  className="min-h-[6rem] flex-1 text-[15px] leading-relaxed text-[#0f0f14] md:text-[16px]"
                  aria-live={prefersReducedMotion ? 'off' : 'polite'}
                >
                  {display}
                  <motion.span
                    className="ml-0.5 inline-block w-[2px] translate-y-px bg-[#6161FF]"
                    style={{ height: '1.05em' }}
                    animate={{ opacity: [1, 0.15, 1] }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.85,
                      repeat: prefersReducedMotion ? 0 : Infinity,
                      ease: 'easeInOut',
                    }}
                    aria-hidden
                  />
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="group relative mt-10 md:mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={reduce ? { duration: 0.2 } : springSoft}
        >
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f7f7f8] to-transparent md:w-24"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f7f7f8] to-transparent md:w-24"
            aria-hidden
          />
          <div className="overflow-hidden py-2 [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-build-strip flex w-max gap-4">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex gap-4">
                  {tiles.map((t) => {
                    const isActive = activeTile === t
                    return (
                      <motion.div
                        key={`${dup}-${t}`}
                        className={`flex min-h-[120px] w-[180px] shrink-0 flex-col items-center justify-center rounded-[12px] border px-3 pb-3 pt-3 shadow-sm transition-colors duration-300 ${
                          isActive
                            ? 'border-[rgba(97,97,255,0.45)] bg-white shadow-[0_20px_48px_rgba(97,97,255,0.18)] ring-1 ring-[rgba(97,97,255,0.12)]'
                            : 'border-[rgba(15,15,20,0.07)] bg-white/90'
                        }`}
                        whileHover={
                          reduce
                            ? {}
                            : {
                                y: -2,
                                borderColor: 'rgba(97,97,255,0.35)',
                                backgroundColor: 'rgba(255,255,255,1)',
                              }
                        }
                        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(97,97,255,0.12)] text-[#6161FF]">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
                          </svg>
                        </span>
                        <span
                          className={`mt-2 text-center text-[12px] font-medium leading-snug ${
                            isActive ? 'text-[#0f0f14]' : 'text-[rgba(15,15,20,0.65)]'
                          }`}
                        >
                          {t}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
