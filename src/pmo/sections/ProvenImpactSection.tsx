import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { springSoft, staggerContainer, staggerItem } from '../motion'

const STORIES_BASE = 'https://monday.com/stories'

/**
 * “Proven impact across teams and industries”: outcome cards aligned with
 * [monday.com project management](https://monday.com/ap/project-management) (customer proof band).
 */
const impactStories = [
  {
    stat: '25%',
    label: 'Reduction in project management timelines',
    industry: 'Retail & CPG',
    gradient: 'from-[#e8e4ff] via-[#f4f2ff] to-[#faf8fc]',
  },
  {
    stat: '105K',
    label: 'Hours saved annually',
    industry: 'Manufacturing',
    gradient: 'from-[#e0f2ff] via-[#eef6ff] to-[#f7fbff]',
  },
  {
    stat: '300%',
    label: 'Saved yearly to reinvest',
    industry: 'Technology',
    gradient: 'from-[#fff0e6] via-[#fff5ee] to-[#fffaf7]',
  },
  {
    stat: '$250K',
    label: 'Saved yearly to reinvest',
    industry: 'Advertising',
    gradient: 'from-[#e8f5e9] via-[#f1f8f1] to-[#f9fcf9]',
  },
  {
    stat: '517%',
    label: 'Growth in annual accounts',
    industry: 'Entertainment',
    gradient: 'from-[#fce8f3] via-[#fdf2f8] to-[#fef7fb]',
  },
] as const

export function ProvenImpactSection() {
  return (
    <section
      id="proven-impact"
      className="scroll-mt-24 border-t border-[rgba(15,15,20,0.06)] bg-[rgba(247,247,248,0.6)] px-4 py-16 backdrop-blur-[1px] md:px-8 md:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-[1120px]">
        <motion.div
          className="text-left"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={staggerItem}
            className="text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0c0c0f] md:text-[44px] lg:text-[48px]"
          >
            Proven impact across teams and industries
          </motion.h2>
        </motion.div>

        <motion.ul
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          {impactStories.map((story) => (
            <motion.li key={story.label} variants={staggerItem} className="min-w-0">
              <a
                href={STORIES_BASE}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-[12px] border border-[rgba(15,15,20,0.08)] bg-white shadow-[0_4px_24px_rgba(15,15,20,0.06)] transition-shadow duration-300 hover:border-[rgba(97,97,255,0.2)] hover:shadow-[0_12px_40px_rgba(97,97,255,0.12)]"
              >
                <div
                  className={`relative aspect-[16/10] w-full bg-gradient-to-br ${story.gradient}`}
                  aria-hidden
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_100%,rgba(15,15,20,0.06),transparent)]" />
                  <span className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[rgba(15,15,20,0.55)] shadow-sm">
                    {story.industry}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <p className="text-[56px] font-bold leading-[1.05] tracking-tight text-[#6161ff]">
                    {story.stat}
                  </p>
                  <p className="mt-3 text-[14px] font-normal leading-[1.5] text-[rgba(15,15,20,0.6)]">
                    {story.label}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-[#6161FF]">
                    See the case study
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={springSoft}
        >
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-full bg-[#6161FF] px-8 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_32px_rgba(97,97,255,0.22)] transition-colors hover:bg-[#7272FF]"
          >
            Get started
          </a>
        </motion.div>
      </div>
    </section>
  )
}
