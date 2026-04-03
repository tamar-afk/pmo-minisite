import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FeatureTabVisual } from '../components/FeatureTabVisual'
import { SectionChip } from '../components/SectionChip'
import { pageEase } from '../motion'

const SECTION_HEADLINE = 'From brief to done, without the manual work'
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
      'Timelines set, roles planned, and AI recommends the right people for every role based on skills and availability.',
  },
  {
    id: 'align' as const,
    label: 'Align',
    headline: 'Everyone on the same page, without the meeting',
    body:
      'The right people get the right updates automatically. No chasing, no check-ins, no one asking "where are we on this?"',
  },
  {
    id: 'execute' as const,
    label: 'Run',
    headline: 'Work moves forward, with or without you in the room',
    body:
      'Task-specific agents clear blockers and keep the pipeline moving. Capacity issues surface before they become problems.',
  },
  {
    id: 'track' as const,
    label: 'Track',
    headline: "See what's slipping before it's too late",
    body:
      'Live project health, risks surfaced, dependencies flagged. See planned vs. actual and make instant adjustments.',
  },
  {
    id: 'report' as const,
    label: 'Report',
    headline: 'Executive reports that write themselves',
    body:
      'Pull a full status report from live project data in one click. Ready for leadership, no prep required.',
  },
] as const

const tabPanelVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, ease: pageEase } },
  exit: { opacity: 0, transition: { duration: 0.1, ease: pageEase } },
}

export function FeatureTabsSection() {
  const [active, setActive] = useState(0)
  const tab = tabs[active]

  return (
    <section id="features" className="relative z-10 scroll-mt-24 bg-transparent py-24">
      <div className="pmo-container">
        <header>
          <SectionChip sentenceCase>Your projects, end to end</SectionChip>
          <h2 className="pmo-section-title mt-4">{SECTION_HEADLINE}</h2>
          <p className="pmo-body mt-5 max-w-[560px]">{SECTION_INTRO}</p>
          <motion.a
            href="#pricing"
            className="mt-6 inline-flex items-center gap-1 text-[15px] font-semibold text-[#6161ff]"
            whileHover={{ x: 4, color: '#6161ff' }}
            transition={{ duration: 0.1, ease: pageEase }}
          >
            Get started <span aria-hidden>→</span>
          </motion.a>
        </header>

        <div className="mt-12 flex flex-col gap-8">
          <nav
            className="relative border-b border-[#e8e8f0]"
            aria-label="Project lifecycle stages"
          >
            <div className="-mb-px flex flex-wrap gap-x-1 gap-y-0">
              {tabs.map((t, i) => {
                const isActive = active === i
                return (
                  <button
                    key={t.id}
                    type="button"
                    data-cursor-interactive
                    onClick={() => setActive(i)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative px-4 py-3 text-[14px] font-semibold transition-colors duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? 'text-[#0a0a0f]' : 'text-[#6b6b8a] hover:text-[#0a0a0f]'
                    }`}
                  >
                    {t.label}
                    {isActive && (
                      <motion.span
                        layoutId="lifecycle-tab-underline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#6161ff]"
                        transition={{ duration: 0.2, ease: pageEase }}
                        aria-hidden
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </nav>

          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                variants={tabPanelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col gap-4 md:gap-5"
              >
                <div>
                  <h3
                    id={`feature-tab-${tab.id}-title`}
                    className="text-[17px] font-semibold leading-[1.4] tracking-0 text-[#0a0a0f] md:text-[17px]"
                  >
                    {tab.headline}
                  </h3>
                  <p className="pmo-body mt-2 max-w-[560px]">{tab.body}</p>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: pageEase, delay: 0.1 }}
                  className="mt-4"
                >
                  <FeatureTabVisual tabId={tab.id} aria-labelledby={`feature-tab-${tab.id}-title`} />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
