import { motion, useReducedMotion } from 'framer-motion'
import { pageEase, staggerContainer, staggerItem } from '../motion'

export function FinalCta() {
  const reduce = useReducedMotion()

  return (
    <section id="pricing" className="relative pmo-flow-section-top bg-[#ffffff] pmo-section-pad">
      <motion.div
        className="pmo-container relative max-w-[36rem] text-center"
        variants={staggerContainer(0.05)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2
          variants={staggerItem}
          className="text-balance text-[36px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#111118] sm:text-[40px]"
        >
          Deliver more. Without doing more.
        </motion.h2>
        <motion.p variants={staggerItem} className="mt-3 text-[13px] text-[#6b7280]">
          Free forever. No credit card needed.
        </motion.p>
        <motion.div
          variants={staggerItem}
          className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <motion.a
            href="#pricing"
            data-cursor-cta
            className="inline-flex min-w-[160px] items-center justify-center rounded-lg bg-[#6161ff] px-5 py-2 text-[13px] font-medium text-white"
            whileHover={{ backgroundColor: '#5050ee' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15, ease: pageEase }}
          >
            Get started free
          </motion.a>
          <motion.a
            href="#contact"
            className="inline-flex min-w-[160px] items-center justify-center rounded-lg border border-[rgba(0,0,0,0.15)] bg-transparent px-5 py-2 text-[13px] font-medium text-[#111118] transition-colors duration-150 hover:bg-[rgba(0,0,0,0.04)]"
            whileTap={{ scale: 0.98 }}
          >
            Talk to sales
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
