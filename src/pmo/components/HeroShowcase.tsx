import { motion, useReducedMotion } from 'framer-motion'
import { pageEase } from '../motion'

/** Hero product frame: dot grid + label with light ambient motion. */
export function HeroShowcase() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      role="region"
      aria-label="Gantt, Portfolio, and resource surface, with agents that flag risks and generate reports"
      className="relative flex h-[280px] w-full flex-col items-center justify-center overflow-hidden rounded-t-[10px] border border-b-0 border-[rgba(0,0,0,0.07)] bg-[#f5f5f8] sm:h-[300px] md:h-[320px]"
      initial={reduce ? false : { opacity: 0.96, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: pageEase }}
    >
      {reduce ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden
        />
      ) : (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden
          animate={{ opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <motion.span
        className="relative z-[1] max-w-[min(100%,36rem)] px-4 text-center text-pretty text-[10px] leading-snug text-[#9ca3af] sm:text-[11px] sm:leading-relaxed"
        initial={reduce ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduce ? 0 : 0.12, duration: 0.4, ease: pageEase }}
      >
        Gantt, Portfolio, and resource surface, with agents that flag risks and generate reports
      </motion.span>
    </motion.div>
  )
}
