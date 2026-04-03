import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FeatureTabVisual } from '../components/FeatureTabVisual'
import { SectionChip } from '../components/SectionChip'
import { pageEase, springSnappy } from '../motion'

const SECTION_HEADLINE = 'From planning to delivery, without the manual work'
const SECTION_INTRO =
  'Every stage of the project cycle, covered. Your team makes the calls. Agents do the follow-through.'

/**
 * Tab order (Plan → Align → Run → Track → Report) and visuals:
 * [monday.com/ap/project-management/ai-var](https://monday.com/ap/project-management/ai-var) via `mondayAiPmFeatureTabImages`.
 * Tab id `execute` maps to the Run step and uses the Run visual asset.
 */
const tabs = [
  {
    id: 'plan' as const,
    label: 'Plan',
    headline: 'From brief to project plan in minutes',
    body:
      'Your brief becomes a full project plan in minutes. Owners assigned, timelines set, capacity checked, and updated automatically as plans change. One project or a full portfolio.',
  },
  {
    id: 'align' as const,
    label: 'Align',
    headline: 'Everyone on the same page, without the meeting',
    body:
      'The right people get the right updates automatically. No chasing, no check-in meetings, no one asking "where are we on this?"',
  },
  {
    id: 'execute' as const,
    label: 'Run',
    headline: 'Work moves forward, with or without you in the room',
    body:
      'Task-specific agents clear blockers, chase owners, and keep the pipeline moving. Your team focuses on the work only they can do.',
  },
  {
    id: 'track' as const,
    label: 'Track',
    headline: "See what's slipping before it's too late",
    body:
      "Live project health across every project you're running. Risks surfaced, dependencies flagged, timelines updated in real time, so you're never caught off guard.",
  },
  {
    id: 'report' as const,
    label: 'Report',
    headline: 'Executive reports that write themselves',
    body:
      'Pull a complete status report from live project data in one click. Ready for leadership, no manual prep required.',
  },
] as const

export function FeatureTabsSection() {
  const [active, setActive] = useState(0)
  const tab = tabs[active]

  return (
    <section
      id="features"
      className="scroll-mt-24 bg-[rgba(244,244,245,0.65)] px-4 py-14 backdrop-blur-[1px] md:px-8 md:py-16 lg:px-12"
    >
      <div className="mx-auto max-w-[1280px]">
        <header className="mb-8 max-w-[720px] md:mb-10">
          <div className="mb-3">
            <SectionChip>How it works</SectionChip>
          </div>
          <h2 className="text-pretty text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0c0c0f] md:text-[44px] lg:text-[48px]">
            {SECTION_HEADLINE}
          </h2>
          <p className="mt-4 text-[16px] font-normal leading-[1.6] text-[rgba(12,12,15,0.58)] md:text-[18px]">
            {SECTION_INTRO}
          </p>
          <motion.a
            href="#pricing"
            className="mt-6 inline-flex items-center gap-1 text-[15px] font-semibold text-[#6161FF]"
            whileHover={{ x: 4, color: '#5050e6' }}
            transition={springSnappy}
          >
            Get started <span aria-hidden>→</span>
          </motion.a>
        </header>

        <div className="mt-0 flex flex-col gap-6 lg:flex-row lg:gap-9">
          <nav
            className="relative w-full max-w-[min(100%,320px)] lg:w-[260px] lg:max-w-none lg:flex-shrink-0"
            aria-label="Project lifecycle stages"
          >
            <div
              className="pointer-events-none absolute left-[7px] top-4 bottom-4 w-px bg-[rgba(15,15,20,0.12)] sm:left-[9px]"
              aria-hidden
            />

            <ol className="relative flex flex-col gap-0">
              {tabs.map((t, i) => {
                const isActive = active === i
                const isPast = i < active
                return (
                  <li key={t.id} className="relative flex gap-3 sm:gap-4">
                    <div className="relative z-[1] flex w-4 shrink-0 flex-col items-center sm:w-5">
                      <motion.span
                        className={`mt-3.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-2 transition-colors sm:h-4 sm:w-4 ${
                          isActive
                            ? 'border-[#6161FF] bg-[#6161FF] shadow-[0_0_0_4px_rgba(97,97,255,0.2)]'
                            : isPast
                              ? 'border-[#6161FF] bg-[#6161FF]'
                              : 'border-[rgba(15,15,20,0.22)] bg-[#f4f4f5]'
                        }`}
                        transition={springSnappy}
                        aria-hidden
                      />
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => setActive(i)}
                      className={`mb-1 min-h-[48px] flex-1 rounded-r-xl rounded-bl-xl border py-3 pl-1 pr-4 text-left text-[14px] font-semibold transition-colors sm:py-3.5 sm:pl-2 ${
                        isActive
                          ? 'border-[rgba(97,97,255,0.35)] bg-white text-[#0f0f14] shadow-[0_4px_24px_rgba(15,15,20,0.06)]'
                          : 'border-transparent text-[rgba(15,15,20,0.45)] hover:border-[rgba(15,15,20,0.06)] hover:bg-white/50 hover:text-[#0f0f14]'
                      }`}
                      whileHover={{ x: isActive ? 0 : 3 }}
                      whileTap={{ scale: 0.99 }}
                      transition={springSnappy}
                      aria-current={isActive ? 'step' : undefined}
                    >
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[rgba(15,15,20,0.35)]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="mt-0.5 block">{t.label}</span>
                    </motion.button>
                  </li>
                )
              })}
            </ol>
          </nav>

          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, ease: pageEase }}
                className="flex flex-col gap-4 md:gap-5"
              >
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: pageEase, delay: 0.1 }}
                >
                  <div>
                    <h3
                      id={`feature-tab-${tab.id}-title`}
                      className="text-[18px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#0c0c0f] md:text-[20px]"
                    >
                      {tab.headline}
                    </h3>
                    <p className="mt-3 max-w-[560px] text-[16px] font-normal leading-[1.6] text-[rgba(12,12,15,0.62)] md:text-[17px]">
                      {tab.body}
                    </p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: pageEase, delay: 0.12 }}
                    className="mt-4"
                  >
                    <FeatureTabVisual tabId={tab.id} aria-labelledby={`feature-tab-${tab.id}-title`} />
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
