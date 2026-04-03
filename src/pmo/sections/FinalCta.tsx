import { motion } from 'framer-motion'
import { pageEase, springSnappy, staggerContainer, staggerItem } from '../motion'

export function FinalCta() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-t border-[rgba(12,12,15,0.06)] bg-white/88 px-4 py-16 backdrop-blur-[2px] md:px-8 lg:px-12"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 50% 38%, rgba(97,97,255,0.07) 0%, transparent 68%)',
        }}
      />
      <motion.div
        className="relative mx-auto max-w-[720px] text-center"
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.h2
          variants={staggerItem}
          className="text-balance text-[40px] font-bold leading-[1.2] tracking-[-0.03em] text-[#0c0c0f] md:text-[46px] lg:text-[48px]"
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
            className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#6161FF] px-8 py-4 text-[16px] font-semibold text-white shadow-[0_8px_36px_rgba(97,97,255,0.2)]"
            whileHover={{
              scale: 1.03,
              boxShadow: '0 14px 48px rgba(97,97,255,0.35)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15, ease: pageEase }}
          >
            Get started free
          </motion.a>
          <motion.a
            href="#contact"
            className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-[rgba(12,12,15,0.12)] bg-white px-8 py-4 text-[16px] font-semibold text-[#0c0c0f] shadow-[0_1px_2px_rgba(12,12,15,0.04)]"
            whileHover={{ scale: 1.02, y: -1, backgroundColor: '#f7f7f8' }}
            whileTap={{ scale: 0.97 }}
            transition={springSnappy}
          >
            Talk to sales
          </motion.a>
        </motion.div>
        <motion.p
          variants={staggerItem}
          className="mt-6 text-[13px] text-[rgba(12,12,15,0.42)]"
        >
          Free forever. No credit card needed.
        </motion.p>
      </motion.div>
    </section>
  )
}
