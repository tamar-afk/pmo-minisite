import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../motion'

const logos = ['Canva', 'Coca-Cola', 'Lionsgate', "McDonald's", 'BMW', 'Cartier', 'VML']

export function LogoBarSection() {
  const reduce = useReducedMotion()

  return (
    <section id="trusted-logos" className="relative border-t border-[rgba(0,0,0,0.07)] bg-[#ffffff] py-5 md:py-6">
      <div className="pmo-container">
        <motion.div
          className="space-y-3 text-center md:space-y-4"
          variants={staggerContainer(0.05)}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.p variants={staggerItem} className="text-[11px] text-[#9ca3af]">
            Trusted by 250,000+ customers worldwide
          </motion.p>
          <motion.div
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.035, delayChildren: 0.02 } },
            }}
            className="flex flex-wrap justify-center gap-5 md:gap-6"
          >
            {logos.map((name) => (
              <motion.span
                key={name}
                variants={staggerItem}
                className="cursor-default text-[11px] font-semibold uppercase tracking-[0.08em] text-[#111118] grayscale opacity-[0.45] transition-[opacity,transform] duration-150 hover:opacity-70 hover:[transform:translateY(-2px)]"
              >
                {name}
              </motion.span>
            ))}
          </motion.div>
          <motion.p
            variants={staggerItem}
            className="mx-auto max-w-[36rem] text-[11px] leading-relaxed text-[#9ca3af]"
          >
            Ranked a top 5 project management platform on G2, backed by 14K+ customer reviews
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
