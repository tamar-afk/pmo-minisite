import { motion, useReducedMotion } from 'framer-motion'
import { HeroShowcase } from '../components/HeroShowcase'
import { pageEase } from '../motion'

const HEADLINE_LINE1 = ['Every', 'project.']
const HEADLINE_LINE2 = ['Fully', 'Staffed.']

const wordStagger = 0.032
const headlineSpring = { type: 'spring' as const, stiffness: 420, damping: 32, mass: 0.85 }
const subheadDelay = 0.16
const ctaDelay = subheadDelay + 0.07

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="overview" className="relative scroll-mt-24 overflow-hidden bg-[#ffffff] pb-10 pt-12 md:pb-12 md:pt-16">
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
        <div className="relative mx-auto max-w-[44rem]">
          <h1 className="mx-auto max-w-[min(100%,42rem)] px-1 text-[clamp(1.9375rem,4.2vw+0.65rem,3.35rem)] font-semibold leading-[1.06] tracking-[-0.038em] text-[#111118] md:text-[54px]">
            <span className="block">
              {HEADLINE_LINE1.map((word, wi) => (
                <motion.span
                  key={`l1-${wi}-${word}`}
                  className={`inline-block ${wi < HEADLINE_LINE1.length - 1 ? 'pr-[0.18em]' : ''}`}
                  initial={{ opacity: 0, y: 18, rotate: -0.4 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    ...headlineSpring,
                    delay: 0.02 + wi * wordStagger,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <motion.span
              className="mt-1.5 block bg-gradient-to-r from-[#111118] via-[#3d3d52] to-[#6161ff] bg-clip-text text-transparent md:mt-2"
              initial={{ opacity: 0, y: 14 }}
              animate={
                reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -2, 0] }
              }
              transition={{
                opacity: { ...headlineSpring, delay: 0.02 + HEADLINE_LINE1.length * wordStagger },
                y: reduce
                  ? { duration: 0 }
                  : { duration: 4.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2, delay: 0.55 },
              }}
            >
              {HEADLINE_LINE2.map((word, wi) => {
                const globalIndex = HEADLINE_LINE1.length + wi
                return (
                  <motion.span
                    key={`l2-${wi}-${word}`}
                    className={`inline-block ${wi < HEADLINE_LINE2.length - 1 ? 'pr-[0.18em]' : ''}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      ...headlineSpring,
                      delay: 0.02 + globalIndex * wordStagger,
                    }}
                  >
                    {word}
                  </motion.span>
                )
              })}
            </motion.span>
          </h1>

          <motion.p
            className="mx-auto mt-3 max-w-[480px] text-pretty text-[15px] font-normal leading-[1.65] text-[#6b7280] md:mt-3.5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: subheadDelay, duration: 0.42, ease: pageEase }}
          >
            One platform for all of your projects. Agents that keep it all moving.
          </motion.p>

          <motion.div
            className="mt-5 flex flex-wrap items-center justify-center gap-3 md:mt-5 md:gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ctaDelay, duration: 0.4, ease: pageEase }}
          >
            <motion.a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-lg bg-[#6161ff] px-5 py-2 text-[13px] font-medium text-white shadow-[0_1px_2px_rgba(97,97,255,0.25)]"
              whileHover={{ backgroundColor: '#5050ee', y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15, ease: pageEase }}
            >
              Get started
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg border border-[rgba(0,0,0,0.15)] bg-transparent px-5 py-2 text-[13px] font-medium text-[#111118] transition-colors duration-150 hover:bg-[rgba(0,0,0,0.04)]"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact sales
            </motion.a>
          </motion.div>

          <motion.p
            className="mx-auto mt-3.5 max-w-[26rem] text-[11px] leading-relaxed text-[#6b7280] md:text-[12px]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ctaDelay + 0.04, duration: 0.4, ease: pageEase }}
          >
            Ranked a top 5 project management platform on{' '}
            <span className="font-semibold text-[#ff492c]">G2</span>, backed by 14K+ customer reviews
          </motion.p>

          <motion.p
            className="mt-2 text-[11px] text-[#9ca3af]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: ctaDelay + 0.09, duration: 0.35, ease: pageEase }}
          >
            Free forever. No credit card needed.
          </motion.p>

          <motion.div
            className="mx-auto mt-4 w-full max-w-[min(100%,var(--section-max))] md:mt-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ctaDelay + 0.12, duration: 0.45, ease: pageEase }}
          >
            <HeroShowcase />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
