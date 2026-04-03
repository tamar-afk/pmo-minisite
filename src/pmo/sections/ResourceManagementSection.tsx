import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ResourceModeVisual } from '../components/ResourceModeVisual'
import { SectionChip } from '../components/SectionChip'
import { springSnappy, springSoft } from '../motion'

const modes = [
  {
    id: 'planning' as const,
    label: 'Plan resource needs',
    headline: 'See demand before you staff',
    body:
      'Roadmaps and intake show up as role gaps and peak load, so you adjust dates and staffing while you still can.',
    visual: 'planning' as const,
  },
  {
    id: 'allocation' as const,
    label: 'Allocate the right person for every job',
    headline: 'Match people to work with confidence',
    body:
      'Assign owners by skills, availability, and fit. Everyone sees the same plan, agents included.',
    visual: 'allocation' as const,
  },
  {
    id: 'capacity' as const,
    label: 'Balance capacity',
    headline: 'Read load before it breaks delivery',
    body:
      'Spot overload and gaps across teams in one view. Tradeoffs stay visible instead of buried in spreadsheets.',
    visual: 'capacity' as const,
  },
]

export function ResourceManagementSection() {
  const [active, setActive] = useState(0)
  const foldRef = useRef(null)
  const foldInView = useInView(foldRef, { once: true, amount: 0.25 })
  const mode = modes[active]

  return (
    <section id="resources" className="scroll-mt-24 bg-[#f4f4f5] px-4 py-10 md:px-8 md:py-12 lg:px-12">
      <div className="mx-auto max-w-[1100px]">
        <div className="text-center">
          <SectionChip>Your people</SectionChip>
          <h2 className="mt-5 text-[28px] font-bold leading-tight text-[#0f0f14] md:text-[36px]">
            Make the most out of your workforce
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-[16px] leading-relaxed text-[rgba(15,15,20,0.6)] md:text-[17px]">
            With agents taking the busy work, you can make sure that the right people work on the right
            priorities, while easily balancing their capacity.
          </p>
        </div>

        <motion.div
          ref={foldRef}
          className="mt-8 overflow-hidden rounded-2xl border border-[rgba(15,15,20,0.08)] bg-white shadow-[0_24px_80px_rgba(15,15,20,0.08)]"
          initial={{ opacity: 0, y: 24 }}
          animate={foldInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="border-b border-[rgba(15,15,20,0.06)] bg-[#fafafa] px-3 py-3 sm:px-4">
            <div className="flex flex-wrap justify-center gap-2 overflow-x-auto pb-1">
              {modes.map((m, i) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`max-w-[min(100%,280px)] shrink-0 rounded-lg px-3 py-2 text-left text-[11px] font-semibold leading-snug transition-colors sm:max-w-[300px] sm:text-[12px] ${
                    active === i
                      ? 'bg-[#6161FF] text-white'
                      : 'bg-white text-[rgba(15,15,20,0.55)] ring-1 ring-[rgba(15,15,20,0.08)] hover:text-[#0f0f14]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-2">
            <div className="min-h-[220px] border-b border-[rgba(15,15,20,0.06)] lg:border-b-0 lg:border-r">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={springSoft}
                  className="h-full"
                >
                  <ResourceModeVisual mode={mode.visual} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={springSnappy}
                >
                  <h3 className="text-[22px] font-bold leading-tight text-[#0f0f14] md:text-[26px]">
                    {mode.headline}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[rgba(15,15,20,0.65)]">
                    {mode.body}
                  </p>
                  <a
                    href="#pricing"
                    className="mt-6 inline-flex items-center gap-1 text-[15px] font-semibold text-[#6161FF] hover:text-[#5050e6]"
                  >
                    Get started <span aria-hidden>→</span>
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
