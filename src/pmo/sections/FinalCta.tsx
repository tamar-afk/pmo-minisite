import { motion } from 'framer-motion'
import { pageEase, staggerContainer, staggerItem } from '../motion'

export function FinalCta() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-t border-[#e8e8f0]/90 bg-transparent py-24 backdrop-blur-[2px]"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: pageEase }}
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 50% 38%, rgba(97,97,255,0.06) 0%, transparent 68%)',
        }}
      />
      <motion.div
        className="pmo-container relative max-w-[720px] text-center"
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2
          variants={staggerItem}
          className="text-balance text-[40px] font-bold leading-[1.15] tracking-[-0.01em] text-[#0a0a0f] md:text-[46px] lg:text-[48px]"
        >
          Deliver more. Without doing more.
        </motion.h2>
        <motion.div
          variants={staggerItem}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
        >
          <motion.a
            href="#pricing"
            data-cursor-cta
            className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#6161ff] px-8 py-4 text-[16px] font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            whileHover={{
              scale: 1.03,
              boxShadow: '0 8px 24px rgba(97,97,255,0.35)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15, ease: pageEase }}
          >
            Get started free
          </motion.a>
          <motion.a
            href="#contact"
            className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-[#e8e8f0] bg-white px-8 py-4 text-[16px] font-semibold text-[#0a0a0f] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            whileHover={{ scale: 1.02, y: -2, borderColor: 'rgba(97,97,255,0.3)', boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15, ease: pageEase }}
          >
            Talk to sales
          </motion.a>
        </motion.div>
        <motion.p variants={staggerItem} className="mt-6 text-[13px] text-[#6b6b8a]">
          Free forever. No credit card needed.
        </motion.p>
      </motion.div>
    </section>
  )
}
