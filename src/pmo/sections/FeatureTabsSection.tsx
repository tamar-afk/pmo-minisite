import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FeatureTabVisual } from '../components/FeatureTabVisual'
import { SectionChip } from '../components/SectionChip'
import { springSnappy } from '../motion'

const SECTION_HEADLINE = 'Every project, end-to-end.'
const SECTION_INTRO =
  'Every stage of the project cycle is automatically pushed forward. Your agents continuously handle monitoring, reporting, and the follow-through that slows projects down.'

/**
 * Tab order (Plan → Align → Execute → Track → Report) and visuals:
 * [monday.com/ap/project-management/ai-var](https://monday.com/ap/project-management/ai-var) via `mondayAiPmFeatureTabImages`.
 */
const tabs = [
  {
    id: 'plan' as const,
    label: 'Plan',
    headline: 'From brief to project plan in minutes',
    body:
      "Structure, owners, timelines, and allocation for people and agents—built from your brief and updated as strategy shifts. One project or a hundred, every plan stays solid.",
  },
  {
    id: 'align' as const,
    label: 'Align',
    headline: 'Everyone on the same page, automatically',
    body:
      "Owners get nudged, plans stay current, and nothing falls through the cracks between check-ins, so your team always knows what's next without a meeting to make it happen.",
  },
  {
    id: 'execute' as const,
    label: 'Execute',
    headline: "Projects keep moving, even when no one's pushing",
    body:
      'Follow-ups happen, blockers get flagged, and cross-project dependencies are managed, so work keeps progressing between check-ins, 24/7, without anyone chasing.',
  },
  {
    id: 'track' as const,
    label: 'Track',
    headline: 'Catch risks before they become problems',
    body:
      "Progress, dependencies, and capacity are monitored across your entire portfolio, surfacing issues while there's still time to act, ranked by urgency so you know exactly where to focus across every project you run.",
  },
  {
    id: 'report' as const,
    label: 'Report',
    headline: 'Leadership reports, without the prep work',
    body:
      'Live data from across your entire portfolio rolls up into leadership-ready reports on demand. No compiling updates, no exporting to PowerPoint, just the insight executives need, ready when they need it.',
  },
] as const

export function FeatureTabsSection() {
  const [active, setActive] = useState(0)
  const tab = tabs[active]

  return (
    <section id="features" className="scroll-mt-24 bg-[#f4f4f5] px-4 py-14 md:px-8 md:py-16 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <header className="mb-8 max-w-[720px] md:mb-10">
          <div className="mb-3">
            <SectionChip>Your projects</SectionChip>
          </div>
          <h2 className="text-pretty text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[#0c0c0f] md:text-[40px] md:leading-[1.1]">
            {SECTION_HEADLINE.replace(' end-to-end.', '')}{' '}
            <span className="whitespace-nowrap">end-to-end.</span>
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-[rgba(12,12,15,0.58)] md:text-[18px]">
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
            {/* Continuous spine — line sits behind dots */}
            <div
              className="pointer-events-none absolute left-[7px] top-4 bottom-4 w-px bg-[rgba(15,15,20,0.12)] sm:left-[9px]"
              aria-hidden
            />
            {/* Progress accent: filled portion up to active step */}
            <motion.div
              className="pointer-events-none absolute left-[7px] top-4 w-px origin-top bg-[#6161FF] sm:left-[9px]"
              aria-hidden
              initial={false}
              animate={{
                scaleY: tabs.length <= 1 ? 0 : active / (tabs.length - 1),
              }}
              style={{
                height: `calc(100% - 2rem)`,
              }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
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
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4 md:gap-5"
              >
                <div>
                  <h3
                    id={`feature-tab-${tab.id}-title`}
                    className="text-[20px] font-semibold leading-snug tracking-[-0.02em] text-[#0c0c0f] md:text-[22px]"
                  >
                    {tab.headline}
                  </h3>
                  <p className="mt-3 max-w-[560px] text-[15px] leading-relaxed text-[rgba(12,12,15,0.62)] md:text-[16px]">
                    {tab.body}
                  </p>
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
