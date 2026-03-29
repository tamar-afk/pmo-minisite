import { motion } from 'framer-motion'
import { SectionChip } from '../components/SectionChip'
import { SectionReveal } from '../components/SectionReveal'
import { McpCardStack } from '../components/McpCardStack'
import { springSnappy, springSoft } from '../motion'

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="inline-flex items-center rounded-full border border-[rgba(12,12,15,0.08)] bg-white px-5 py-2 text-[13px] font-medium text-[rgba(12,12,15,0.62)] shadow-[0_1px_2px_rgba(12,12,15,0.04)]"
      whileHover={{ y: -2, scale: 1.01, borderColor: 'rgba(12,12,15,0.12)' }}
      transition={springSnappy}
    >
      {children}
    </motion.span>
  )
}

export function McpSection() {
  return (
    <section id="mcp" className="mcp-section px-4 py-14 md:px-8 md:py-16 lg:px-12">
      <div className="relative z-[1] mx-auto max-w-[900px] text-center">
        <SectionReveal>
          <div className="mb-1 flex justify-center">
            <SectionChip>Your AI tools</SectionChip>
          </div>
          <h2 className="mt-5 text-[32px] font-semibold leading-tight tracking-[-0.02em] text-[#0c0c0f] md:text-[44px]">
            Your projects, connected to any AI tool
          </h2>
          <p className="mx-auto mt-4 max-w-[540px] text-[17px] leading-relaxed text-[rgba(12,12,15,0.58)] md:text-[18px]">
            Connect live monday data to Claude, Cursor, Copilot, and more—one source of truth, answers in
            the assistant you already use, no tab-hopping.
          </p>
        </SectionReveal>
      </div>

      <div className="relative z-[1] mt-8 w-full">
        <McpCardStack />
      </div>

      <motion.div
        className="relative z-[1] mx-auto mt-7 flex max-w-[720px] flex-wrap justify-center gap-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: springSoft } }}>
          <Chip>Works with any AI tool</Chip>
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: springSoft } }}>
          <Chip>Live project data, always in sync</Chip>
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: springSoft } }}>
          <Chip>No IT setup required</Chip>
        </motion.div>
      </motion.div>
    </section>
  )
}
