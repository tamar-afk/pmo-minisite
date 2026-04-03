import { motion } from 'framer-motion'
import { SectionChip } from '../components/SectionChip'
import { SectionReveal } from '../components/SectionReveal'
import { McpCardStack } from '../components/McpCardStack'
import { pageEase } from '../motion'

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="inline-flex items-center rounded-full border border-[#e8e8f0] bg-white px-5 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#6b6b8a] shadow-[0_2px_8px_rgba(0,0,0,0.06)] md:text-[12px]"
      whileHover={{
        y: -2,
        borderColor: 'rgba(97,97,255,0.3)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
      }}
      transition={{ duration: 0.15, ease: pageEase }}
    >
      {children}
    </motion.span>
  )
}

export function McpSection() {
  return (
    <section id="mcp" className="relative bg-transparent py-24 backdrop-blur-[1px]">
      <div className="pmo-container max-w-[900px]">
        <SectionReveal>
          <div className="flex justify-start">
            <SectionChip>Your AI tools</SectionChip>
          </div>
          <h2 className="pmo-section-title mt-4">
            Your favourite AI tools, now connected to your projects.
          </h2>
          <p className="pmo-body mt-5 max-w-[540px]">
            Connect monday to Claude, ChatGPT, Copilot, and more. Your live project data, always in the AI you&apos;re
            already using.
          </p>
        </SectionReveal>
      </div>

      <div className="relative z-[1] mt-12 w-full">
        <McpCardStack />
      </div>

      <motion.div
        className="pmo-container relative z-[1] mx-auto mt-10 flex max-w-[720px] flex-wrap justify-start gap-3"
        initial="hidden"
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
