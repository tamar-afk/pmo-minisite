import { motion, useReducedMotion } from 'framer-motion'
import { SectionChip } from '../components/SectionChip'
import { McpCardStack } from '../components/McpCardStack'
import { pageEase, staggerContainer, staggerItem } from '../motion'

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[rgba(0,0,0,0.07)] bg-white px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-[#6b7280] transition-[border-color,box-shadow] duration-150 hover:border-[rgba(97,97,255,0.25)] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] md:text-[11px]">
      {children}
    </span>
  )
}

export function McpSection() {
  const reduce = useReducedMotion()

  return (
    <section id="mcp" className="relative scroll-mt-24 pmo-flow-section-top bg-[#ffffff] pmo-section-pad">
      <div className="pmo-container max-w-[52rem]">
        <motion.div
          variants={staggerContainer(0.06)}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
        >
          <motion.div variants={staggerItem} className="flex justify-start">
            <SectionChip>Your AI tools</SectionChip>
          </motion.div>
          <motion.h2 variants={staggerItem} className="pmo-section-title">
            Your favourite AI tools, now connected to your projects.
          </motion.h2>
          <motion.p variants={staggerItem} className="pmo-body mt-3 max-w-[460px] text-[15px] leading-[1.7]">
            Connect monday to Claude, ChatGPT, Copilot, and more. Your live project data, always in the AI you&apos;re
            already using.
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="relative z-[1] mt-6 w-full md:mt-8"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.45, ease: pageEase }}
      >
        <McpCardStack />
      </motion.div>

      <motion.div
        className="pmo-container relative z-[1] mx-auto mt-5 flex max-w-[36rem] flex-wrap justify-start gap-2"
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06 } },
        }}
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: pageEase } } }}
        >
          <Chip>Works with any AI tool</Chip>
        </motion.div>
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: pageEase } } }}
        >
          <Chip>Live project data, always in sync</Chip>
        </motion.div>
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: pageEase } } }}
        >
          <Chip>No IT setup required</Chip>
        </motion.div>
      </motion.div>
    </section>
  )
}
