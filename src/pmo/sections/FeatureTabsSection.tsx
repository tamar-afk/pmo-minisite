import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FeatureTabVisual } from '../components/FeatureTabVisual'
import { SectionChip } from '../components/SectionChip'
import { pageEase, staggerContainer, staggerItem, tabFadeInMs, tabFadeOutMs } from '../motion'

const SECTION_HEADLINE = 'From brief to done, without the manual work'
const SECTION_INTRO =
  'Every stage of the project cycle, covered. You make the calls. Agents do the follow-through.'

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
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: tabFadeInMs, ease: pageEase },
  },
  exit: {
    opacity: 0,
    transition: { duration: tabFadeOutMs, ease: pageEase },
  },
}

export function FeatureTabsSection() {
  const [active, setActive] = useState(0)
  const tab = tabs[active]
  const reduce = useReducedMotion()

  return (
    <section id="features" className="scroll-mt-24 pmo-flow-section-top bg-[#ffffff] pmo-section-pad">
      <div className="pmo-container">
        <motion.header
          className="text-left"
          variants={staggerContainer(0.06)}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div variants={staggerItem}>
            <SectionChip sentenceCase>Your projects, end to end</SectionChip>
          </motion.div>
          <motion.h2 variants={staggerItem} className="pmo-section-title">
            {SECTION_HEADLINE}
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="mt-3 max-w-[480px] text-[15px] font-normal leading-[1.7] text-[#6b7280]"
          >
            {SECTION_INTRO}
          </motion.p>
        </motion.header>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-[260px_1fr] md:gap-8">
          <motion.nav
            className="relative flex flex-row gap-2 overflow-x-auto pb-1 md:flex-col md:gap-0 md:overflow-visible"
            aria-label="Project lifecycle stages"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
            }}
            initial={reduce ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {tabs.map((t, i) => {
              const isActive = active === i
              return (
                <motion.button
                  key={t.id}
                  type="button"
                  data-cursor-interactive
                  variants={staggerItem}
                  onClick={() => setActive(i)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`border-b-2 py-3 pl-0 text-left text-[13px] transition-colors duration-150 md:border-b-0 md:border-l-2 md:py-3 md:pl-3 ${
                    isActive
                      ? 'border-[#6161ff] font-medium text-[#111118]'
                      : 'border-transparent font-normal text-[#6b7280] hover:border-[rgba(0,0,0,0.06)] hover:text-[#111118] md:hover:border-transparent'
                  }`}
                >
                  {t.label}
                </motion.button>
              )
            })}
          </motion.nav>

          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                variants={tabPanelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col gap-5"
              >
                <div>
                  <h3 id={`feature-tab-${tab.id}-title`} className="text-[19px] font-semibold text-[#111118]">
                    {tab.headline}
                  </h3>
                  <p className="mt-3 max-w-[420px] text-[14px] leading-[1.75] text-[#6b7280]">{tab.body}</p>
                </div>
                <FeatureTabVisual tabId={tab.id} aria-labelledby={`feature-tab-${tab.id}-title`} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
