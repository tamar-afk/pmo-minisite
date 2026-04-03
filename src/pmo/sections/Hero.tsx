import { motion } from 'framer-motion'
import { HeroShowcase } from '../components/HeroShowcase'
import { pageEase } from '../motion'

const HEADLINE_LINE1 = ['All', 'your', 'projects.']
const HEADLINE_LINE2 = ['Fully', 'staffed.']

const wordStagger = 0.025
const headlineDuration = 0.4
const subheadDelay = 0.18
const ctaDelay = subheadDelay + 0.08

export function Hero() {
  return (
    <section id="overview" className="relative scroll-mt-24 overflow-hidden bg-[#ffffff] pb-10 pt-16 md:pb-12 md:pt-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(0,0,0,0.045) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
        aria-hidden
      />
      <div className="pmo-container relative text-center">
        <div className="relative mx-auto max-w-[42rem]">
          <h1 className="mx-auto max-w-[min(100%,40rem)] px-1 text-[clamp(1.875rem,4vw+0.75rem,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#111118] md:text-[52px]">
            <span className="block">
              {HEADLINE_LINE1.map((word, wi) => (
                <motion.span
                  key={`l1-${wi}-${word}`}
                  className={`inline-block ${wi < HEADLINE_LINE1.length - 1 ? 'pr-[0.2em]' : ''}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: headlineDuration,
                    ease: pageEase,
                    delay: 0.03 + wi * wordStagger,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <br />
            <span className="mt-2 inline-block">
              {HEADLINE_LINE2.map((word, wi) => {
                const globalIndex = HEADLINE_LINE1.length + wi
                return (
                  <motion.span
                    key={`l2-${wi}-${word}`}
                    className={`inline-block ${wi < HEADLINE_LINE2.length - 1 ? 'pr-[0.2em]' : ''}`}
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
          </h1>

          <motion.p
            className="mx-auto mt-4 max-w-[480px] text-pretty text-[15px] font-normal leading-[1.7] text-[#6b7280]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: subheadDelay, duration: 0.4, ease: pageEase }}
          >
            One platform for every project. Agents that keep it all moving.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ctaDelay, duration: 0.4, ease: pageEase }}
          >
            <motion.a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-lg bg-[#6161ff] px-5 py-2 text-[13px] font-medium text-white"
              whileHover={{ backgroundColor: '#5050ee' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15, ease: pageEase }}
            >
              Get started free
            </motion.a>
            <motion.a
              href="#features"
              className="inline-flex items-center gap-1 text-[13px] font-medium text-[#111118] transition-colors duration-150 hover:text-[#6161ff]"
              whileTap={{ scale: 0.98 }}
            >
              See it in action <span aria-hidden>→</span>
            </motion.a>
          </motion.div>

          <motion.p
            className="mt-3 text-[11px] text-[#9ca3af]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: ctaDelay + 0.05, duration: 0.35, ease: pageEase }}
          >
            Free forever. No credit card needed.
          </motion.p>

          <motion.div
            className="mx-auto mt-6 w-full max-w-[min(100%,var(--section-max))] md:mt-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ctaDelay + 0.15, duration: 0.45, ease: pageEase }}
          >
            <HeroShowcase />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
