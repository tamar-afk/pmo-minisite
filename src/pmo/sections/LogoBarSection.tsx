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
      className="relative border-b border-transparent bg-white/85 px-4 pb-10 pt-8 backdrop-blur-[1px] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-16 after:bg-gradient-to-b after:from-transparent after:to-[rgba(247,247,248,0.6)] md:px-12 md:pb-12 md:pt-10"
    >
      <div className="mx-auto max-w-[900px]">
        <motion.div
          className="space-y-4 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, ease: pageEase }}
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
                transition={{ duration: 0.4, ease: pageEase, delay: i * 0.05 }}
                whileHover={{ opacity: 1, y: -2 }}
              >
                {name}
              </motion.span>
            ))}
          </div>
          <p className="mx-auto max-w-[36rem] text-[12px] leading-relaxed text-[rgba(15,15,20,0.42)] md:text-[13px]">
            Ranked a top 5 project management platform on G2, backed by 14K+ customer reviews
          </p>
        </motion.div>
      </div>
    </section>
  )
}
