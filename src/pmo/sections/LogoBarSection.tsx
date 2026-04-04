import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../motion'

const logos = ['Canva', 'Coca-Cola', 'Lionsgate', "McDonald's", 'BMW', 'Cartier', 'VML']

export function LogoBarSection() {
  const reduce = useReducedMotion()

  return (
    <section id="trusted-logos" className="relative bg-[#ffffff] py-6 md:py-8">
      <div className="pmo-container">
        <motion.div
          className="space-y-3 text-left md:space-y-3"
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
            className="flex flex-wrap justify-start gap-5 md:gap-6"
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
        </motion.div>
      </div>
    </section>
  )
}
