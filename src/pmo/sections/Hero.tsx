import { motion } from 'framer-motion'
import { HeroShowcase } from '../components/HeroShowcase'
import { pageEase } from '../motion'

/** Two fixed lines: never reflow to a single line at any viewport width. */
const HEADLINE_LINES = ['All your projects.', 'Fully staffed.'] as const

const wordStagger = 0.03
const headlineDuration = 0.4
const headlineWordCount = HEADLINE_LINES.reduce((n, line) => n + line.split(' ').length, 0)
const subheadDelay = headlineWordCount * wordStagger + 0.15
const ctaDelay = subheadDelay + 0.25
const showcaseDelay = ctaDelay + 0.2

export function Hero() {
  return (
    <section
      id="overview"
      className="relative scroll-mt-24 overflow-hidden border-b border-[rgba(12,12,15,0.05)] bg-white/90 px-4 pb-12 pt-8 backdrop-blur-[2px] md:px-12 md:pb-14 md:pt-12"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-8%,rgba(97,97,255,0.11),transparent_52%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[18%] h-[min(420px,55vw)] w-[min(900px,110vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(97,97,255,0.06),transparent_68%)] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[900px] text-center">
        <h1 className="mx-auto max-w-[min(100%,42rem)] px-1 text-[clamp(2.5rem,6vw+1rem,4rem)] font-bold leading-[1.1] tracking-[-0.035em] text-[#0c0c0f] antialiased md:text-[64px] lg:text-[72px]">
          {HEADLINE_LINES.map((line, lineIndex) => {
            const words = line.split(' ')
            const priorWords = HEADLINE_LINES.slice(0, lineIndex).reduce((acc, l) => acc + l.split(' ').length, 0)
            return (
              <span key={line} className="block">
                {words.map((word, wi) => {
                  const globalIndex = priorWords + wi
                  return (
                    <motion.span
                      key={`${lineIndex}-${wi}-${word}`}
                      className={`inline-block ${wi < words.length - 1 ? 'pr-[0.2em]' : ''}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: headlineDuration,
                        ease: pageEase,
                        delay: 0.03 + globalIndex * wordStagger,
                      }}
                    >
                      {word}
                    </motion.span>
                  )
                })}
              </span>
            )
          })}
        </h1>

        <motion.div
          className="mx-auto mt-5 flex justify-center md:mt-6"
          aria-hidden
          initial={{ opacity: 0, scaleX: 0.3 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: subheadDelay * 0.4, duration: 0.35, ease: pageEase }}
        >
          <span className="h-1 w-14 rounded-full bg-gradient-to-r from-[#6161FF] via-[#7c7cff] to-[#6161FF] opacity-90 shadow-[0_0_24px_rgba(97,97,255,0.35)]" />
        </motion.div>

        <motion.p
          className="mx-auto mt-5 max-w-[520px] text-pretty text-[16px] font-normal leading-[1.6] tracking-[-0.01em] text-[rgba(12,12,15,0.62)] antialiased md:mt-6 md:text-[18px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: subheadDelay, duration: 0.4, ease: pageEase }}
        >
          One platform for every project. Agents that keep it all moving.
        </motion.p>

        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: ctaDelay, duration: 0.4, ease: pageEase }}
        >
          <motion.a
            href="#pricing"
            className="hero-cta-pulse inline-flex items-center justify-center rounded-full bg-[#6161FF] px-8 py-3.5 text-[15px] font-semibold text-white"
            style={{ padding: '14px 28px' }}
            whileHover={{ backgroundColor: '#7272FF', scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15, ease: pageEase }}
          >
            Get started free
          </motion.a>
          <motion.a
            href="#features"
            className="inline-flex items-center justify-center gap-1 rounded-full border border-[rgba(12,12,15,0.12)] bg-white px-8 py-3.5 text-[15px] font-semibold text-[#0c0c0f] shadow-[0_1px_2px_rgba(12,12,15,0.04)]"
            whileHover={{ borderColor: 'rgba(12,12,15,0.2)', backgroundColor: 'rgba(12,12,15,0.03)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15, ease: pageEase }}
          >
            See it in action <span aria-hidden>→</span>
          </motion.a>
        </motion.div>

        <motion.p
          className="mt-3 text-[12px] text-[rgba(12,12,15,0.42)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: ctaDelay + 0.1, duration: 0.35, ease: pageEase }}
        >
          Free forever. No credit card needed.
        </motion.p>
      </div>

      <motion.div
        className="mx-auto mt-8 max-w-[900px] px-0"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: showcaseDelay, duration: 0.45, ease: pageEase }}
      >
        <HeroShowcase />
      </motion.div>
    </section>
  )
}
