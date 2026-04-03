import { motion } from 'framer-motion'
import { pageEase } from '../motion'

const logos = [
  'Canva',
  'Coca-Cola',
  'Lionsgate',
  "McDonald's",
  'BMW',
  'Cartier',
  'VML',
]

export function LogoBarSection() {
  return (
    <section
      id="trusted-logos"
      className="relative border-b border-[#e8e8f0]/80 bg-transparent py-24"
    >
      <div className="pmo-container">
        <motion.div
          className="space-y-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: pageEase }}
        >
          <p className="text-[13px] text-[#6b6b8a]">
            Trusted by 250,000+ customers worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {logos.map((name, i) => (
              <motion.span
                key={name}
                className="cursor-default text-[12px] font-semibold uppercase tracking-[0.08em] text-[#0a0a0f] opacity-40"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.4, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: pageEase, delay: i * 0.05 }}
                whileHover={{
                  opacity: 1,
                  y: -2,
                  transition: { duration: 0.15, ease: pageEase },
                }}
              >
                {name}
              </motion.span>
            ))}
          </div>
          <p className="mx-auto max-w-[36rem] text-[12px] leading-relaxed text-[#6b6b8a] md:text-[13px]">
            Ranked a top 5 project management platform on G2, backed by 14K+ customer reviews
          </p>
        </motion.div>
      </div>
    </section>
  )
}
