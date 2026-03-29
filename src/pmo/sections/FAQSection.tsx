import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { springSnappy, springSoft } from '../motion'

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

  return (
    <section id="faq" className="bg-[#f4f4f5] px-4 py-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[720px]">
        <motion.h2
          className="text-center text-[28px] font-bold text-[#0f0f14] md:text-[32px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={springSoft}
        >
          Frequently asked questions
        </motion.h2>
        <div className="mt-10">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={item.q}
                className="border-b border-[rgba(15,15,20,0.1)]"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ ...springSoft, delay: i * 0.04 }}
              >
                <motion.button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-4 py-4 text-left text-[15px] font-semibold text-[#0f0f14]"
                  whileHover={{ color: '#6161FF' }}
                  transition={springSnappy}
                >
                  {item.q}
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={springSnappy}
                    className="mt-0.5 shrink-0 text-[#6161FF]"
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
                      transition={springSoft}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-[14px] leading-relaxed text-[rgba(15,15,20,0.65)]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
