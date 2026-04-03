import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { pageEase } from '../motion'

const faqs = [
  {
    q: 'How does monday.com help teams deliver more projects on time?',
    a:
      'Teams use monday.com to plan with clear ownership, timelines, and dependencies. Built-in AI keeps plans updated as work changes, monitors progress, and highlights risks as they emerge, so project and portfolio leads always know where things stand.',
  },
  {
    q: 'How do AI agents work inside monday.com?',
    a:
      'Agents like the Risk Analyzer, Reporting Manager, and Dependencies Resolver run continuously, monitoring your projects, flagging issues, nudging owners, and generating reports without anyone prompting them. They are native to monday, not add-ons.',
  },
  {
    q: 'How does monday replace manual executive reporting?',
    a:
      "monday's AI generates project-level reports from live data on demand. It summarizes RAG status, highlights risks, and formats output for leadership, without anyone compiling updates before each meeting.",
  },
  {
    q: 'Can monday support both project managers and portfolio leaders?',
    a:
      'Yes. monday works for any team that runs projects, with or without a dedicated project office. Individual project managers use it to manage tasks, timelines, and team coordination. Leads and ops managers get a rolled-up view across all projects with AI surfacing what needs attention, in the same platform.',
  },
  {
    q: 'How quickly can teams get started?',
    a:
      'Most teams are up and running in days. monday.com is self-serve, no IT setup or professional services required. Forrester reports a payback period of under 4 months.',
  },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  const reduce = useReducedMotion()

  return (
    <section id="faq" className="scroll-mt-24 pmo-flow-section-top bg-[#ffffff] pmo-section-pad">
      <div className="pmo-container">
        <div className="mx-auto w-full max-w-[720px]">
          <motion.h2
            className="text-center text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#111118] sm:text-[32px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: pageEase }}
          >
            Frequently asked questions
          </motion.h2>
          <div className="mt-6">
            {faqs.map((item, i) => {
              const isOpen = open === i
              return (
                <motion.div
                  key={item.q}
                  className="border-b border-[rgba(0,0,0,0.07)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.45,
                    ease: pageEase,
                    delay: reduce ? 0 : i * 0.05,
                  }}
                >
                  <motion.button
                    type="button"
                    data-cursor-interactive
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-3 py-3 text-left text-[14px] font-medium text-[#111118]"
                    whileHover={{ color: '#6161ff' }}
                    transition={{ duration: 0.15, ease: pageEase }}
                  >
                    {item.q}
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: pageEase }}
                      className="mt-0.5 shrink-0 text-[#6161ff]"
                      aria-hidden
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.span>
                  </motion.button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: pageEase }}
                        className="overflow-hidden"
                      >
                        <p className="pb-3 text-[13px] font-normal leading-[1.75] text-[#6b7280]">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
