import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FeatureTabVisual } from '../components/FeatureTabVisual'
import { SectionChip } from '../components/SectionChip'
import { pageEase, staggerContainer, staggerItem } from '../motion'

const SECTION_HEADLINE_LINES = ['From brief to done,', 'without the manual work'] as const
const SECTION_INTRO =
  'Every stage of the project cycle, covered. People make the calls. Agents do the follow-through.'

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
      'Task-specific agents clear blockers and execute real work. Balance capacity to ensure both human and agent resources are focusing on the right priorities.',
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

/** Distance from viewport top (ratio of inner height) used as the “reading line” for scroll-spy. */
const SCROLL_SPY_TRIGGER_RATIO = 0.38

export function FeatureTabsSection() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const panelRefs = useRef<(HTMLElement | null)[]>([])
  const ignoreSpyRef = useRef(false)

  const updateActiveFromScroll = useCallback(() => {
    if (ignoreSpyRef.current) return
    const trigger = window.innerHeight * SCROLL_SPY_TRIGGER_RATIO
    let next = 0
    panelRefs.current.forEach((el, i) => {
      if (!el) return
      const top = el.getBoundingClientRect().top
      if (top <= trigger) next = i
    })
    setActive((prev) => (prev === next ? prev : next))
  }, [])

  useEffect(() => {
    updateActiveFromScroll()
    window.addEventListener('scroll', updateActiveFromScroll, { passive: true })
    window.addEventListener('resize', updateActiveFromScroll)
    return () => {
      window.removeEventListener('scroll', updateActiveFromScroll)
      window.removeEventListener('resize', updateActiveFromScroll)
    }
  }, [updateActiveFromScroll])

  const scrollToPanel = (index: number) => {
    const el = panelRefs.current[index]
    if (!el) return
    ignoreSpyRef.current = true
    setActive(index)
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    window.setTimeout(() => {
      ignoreSpyRef.current = false
    }, 900)
  }

  const titleLineVariants = {
    hidden: reduce
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 48, scale: 0.92 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reduce
        ? { duration: 0 }
        : {
            type: 'spring' as const,
            stiffness: 68,
            damping: 16,
            mass: 1.1,
          },
    },
  }

  const titleContainerVariants = {
    hidden: {},
    show: {
      transition: reduce
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: 0.14, delayChildren: 0.06 },
    },
  }

  return (
    <section id="features" className="scroll-mt-24 pmo-flow-section-top bg-[#ffffff] pmo-section-pad">
      <div className="pmo-container">
        <motion.header
          className="text-left"
          variants={staggerContainer(0.1)}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div variants={staggerItem}>
            <SectionChip sentenceCase>Your projects</SectionChip>
          </motion.div>
          <motion.h2
            className="mt-1 text-[clamp(1.875rem,4.5vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.028em] text-[#111118] text-pretty sm:text-[clamp(2rem,4.2vw,2.5rem)]"
            variants={titleContainerVariants}
          >
            {SECTION_HEADLINE_LINES.map((line) => (
              <motion.span key={line} className="block origin-top" variants={titleLineVariants}>
                {line}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="mt-4 max-w-[480px] text-[15px] font-normal leading-[1.7] text-[#6b7280]"
          >
            {SECTION_INTRO}
          </motion.p>
        </motion.header>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-[260px_1fr] md:gap-8">
          <motion.nav
            className="relative z-[1] flex flex-row gap-2 overflow-x-auto pb-1 md:sticky md:top-28 md:flex-col md:gap-5 md:self-start md:overflow-visible lg:gap-6"
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
                  onClick={() => scrollToPanel(i)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative border-b-2 py-3 pl-0 text-left text-[13px] transition-colors duration-150 md:border-b-0 md:py-5 md:pl-4 lg:py-6 ${
                    isActive
                      ? 'border-[#6161ff] font-medium text-[#111118] md:border-transparent md:before:absolute md:before:left-0 md:before:top-1/2 md:before:h-[4rem] md:before:w-[5px] md:before:-translate-y-1/2 md:before:rounded-full md:before:bg-[#6161ff] md:before:shadow-[0_0_22px_rgba(97,97,255,0.6),0_0_8px_rgba(97,97,255,0.45)] md:before:content-[\'\'] lg:before:h-[4.5rem]'
                      : 'border-transparent font-normal text-[#6b7280] hover:border-[rgba(0,0,0,0.06)] hover:text-[#111118] md:hover:border-transparent'
                  }`}
                >
                  {t.label}
                </motion.button>
              )
            })}
          </motion.nav>

          <div className="min-w-0">
            {tabs.map((t, i) => (
              <motion.article
                key={t.id}
                id={`feature-stage-${t.id}`}
                ref={(el) => {
                  panelRefs.current[i] = el
                }}
                className="scroll-mt-28 border-b border-[rgba(12,12,15,0.06)] py-10 first:pt-0 last:border-b-0 last:pb-0 md:py-14 md:first:pt-0"
                aria-labelledby={`feature-tab-${t.id}-title`}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: pageEase, delay: reduce ? 0 : i * 0.05 }}
              >
                <div className="flex flex-col gap-5">
                  <div>
                    <h3 id={`feature-tab-${t.id}-title`} className="text-[19px] font-semibold text-[#111118]">
                      {t.headline}
                    </h3>
                    <p className="mt-3 max-w-[420px] text-[14px] leading-[1.75] text-[#6b7280]">{t.body}</p>
                  </div>
                  <FeatureTabVisual tabId={t.id} aria-labelledby={`feature-tab-${t.id}-title`} />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
