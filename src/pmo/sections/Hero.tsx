import { motion } from 'framer-motion'
import { HeroShowcase } from '../components/HeroShowcase'
import { springSnappy, springSoft } from '../motion'

const heroEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const logos = [
  'Canva',
  'Coca-Cola',
  'Lionsgate',
  "McDonald's",
  'BMW',
  'Cartier',
  'VML',
]

const heroStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: heroEase },
  },
}

export function Hero() {
  return (
    <section
      id="overview"
      className="relative scroll-mt-24 overflow-hidden border-b border-[rgba(12,12,15,0.05)] bg-white px-4 pb-12 pt-8 md:px-12 md:pb-14 md:pt-12"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-8%,rgba(97,97,255,0.11),transparent_52%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[18%] h-[min(420px,55vw)] w-[min(900px,110vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(97,97,255,0.06),transparent_68%)] blur-3xl"
        aria-hidden
      />

      <motion.div
        className="relative mx-auto max-w-[900px] text-center"
        initial="hidden"
        animate="show"
        variants={heroStagger}
      >
        <motion.h1
          variants={heroItem}
          className="mx-auto max-w-[min(100%,42rem)] px-1 text-[clamp(20px,min(4.25vw+0.65rem),40px)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#0c0c0f] antialiased md:text-[56px] md:leading-[1.08] md:tracking-[-0.04em] lg:text-[60px]"
        >
          <span className="block sm:whitespace-nowrap">Drive your projects forward, with</span>
          <span className="mt-1 block md:mt-1.5">
            a{' '}
            <span className="relative inline-block font-semibold text-[#6161FF]">
              <span className="relative z-10">full team</span>
              <span
                className="absolute -inset-x-1 -bottom-0.5 -z-0 h-[0.55em] rounded-sm bg-[rgba(97,97,255,0.14)]"
                aria-hidden
              />
            </span>{' '}
            behind you
          </span>
        </motion.h1>

        <motion.div
          variants={heroItem}
          className="mx-auto mt-5 flex justify-center md:mt-6"
          aria-hidden
        >
          <span className="h-1 w-14 rounded-full bg-gradient-to-r from-[#6161FF] via-[#7c7cff] to-[#6161FF] opacity-90 shadow-[0_0_24px_rgba(97,97,255,0.35)]" />
        </motion.div>

        <motion.p
          variants={heroItem}
          className="mx-auto mt-5 max-w-[520px] text-pretty text-[18px] font-normal leading-[1.65] tracking-[-0.01em] text-[rgba(12,12,15,0.62)] antialiased md:mt-6"
        >
          Always-on agents work alongside your team, chasing updates, flagging risks, and reporting to
          leadership so your people don&apos;t have to.
        </motion.p>

        <motion.div variants={heroItem} className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <motion.a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-full bg-[#6161FF] px-8 py-3.5 text-[15px] font-semibold text-white shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_8px_32px_rgba(97,97,255,0.22)]"
            style={{ padding: '14px 28px' }}
            whileHover={{ backgroundColor: '#7272FF' }}
            whileTap={{ scale: 0.98 }}
            transition={springSnappy}
          >
            Get started free
          </motion.a>
          <motion.a
            href="#features"
            className="inline-flex items-center justify-center gap-1 rounded-full border border-[rgba(12,12,15,0.12)] bg-white px-8 py-3.5 text-[15px] font-semibold text-[#0c0c0f] shadow-[0_1px_2px_rgba(12,12,15,0.04)]"
            whileHover={{ borderColor: 'rgba(12,12,15,0.2)', backgroundColor: 'rgba(12,12,15,0.03)' }}
            whileTap={{ scale: 0.98 }}
            transition={springSnappy}
          >
            See it in action <span aria-hidden>→</span>
          </motion.a>
        </motion.div>

        <motion.p variants={heroItem} className="mt-3 text-[12px] text-[rgba(12,12,15,0.42)]">
          Free forever. No credit card needed.
        </motion.p>
      </motion.div>

      <div className="mx-auto mt-8 max-w-[900px] px-0">
        <HeroShowcase />
      </div>

      <div className="mx-auto max-w-[900px]">
        <motion.div
          className="mt-8 space-y-3 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <p className="text-[13px] text-[rgba(15,15,20,0.45)]">
            Trusted by 250,000+ customers worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {logos.map((name, i) => (
              <motion.span
                key={name}
                className="cursor-default text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0f0f14] opacity-40 transition-opacity hover:opacity-100"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.4, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...springSoft, delay: i * 0.05 }}
                whileHover={{ opacity: 1 }}
              >
                {name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
