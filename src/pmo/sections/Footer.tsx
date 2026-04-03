import { motion } from 'framer-motion'
import { MondayWMLogo } from '../components/Logo'
import { springSnappy, springSoft, staggerContainer, staggerItem } from '../motion'

const cols = [
  {
    title: 'Products',
    links: ['monday.com', 'monday CRM', 'monday dev', 'Platform'],
  },
  {
    title: 'Solutions',
    links: ['Marketing', 'Project management', 'Sales', 'HR'],
  },
  {
    title: 'Resources',
    links: ['Blog', 'Help center', 'Academy', 'Community'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Partners', 'Contact us'],
  },
]

export function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-[rgba(15,15,20,0.08)] bg-white/82 px-4 py-10 backdrop-blur-[1px] md:px-8 md:py-12 lg:px-12"
    >
      <motion.div
        className="mx-auto max-w-[1280px]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
        variants={staggerContainer(0.06)}
      >
        <div className="grid gap-8 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <motion.div variants={staggerItem}>
            <MondayWMLogo onDark={false} />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-[rgba(15,15,20,0.55)]">
              Work the way that works for you.
            </p>
          </motion.div>
          {cols.map((c) => (
            <motion.div key={c.title} variants={staggerItem}>
              <p className="text-[13px] font-semibold text-[#0f0f14]">{c.title}</p>
              <ul className="mt-4 space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <motion.a
                      href="#"
                      className="inline-block text-[13px] text-[rgba(15,15,20,0.55)]"
                      whileHover={{ x: 4, color: '#0f0f14' }}
                      transition={springSoft}
                    >
                      {l}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={staggerItem}
          className="mt-10 flex flex-col gap-3 border-t border-[rgba(15,15,20,0.08)] pt-6 md:flex-row md:items-center md:justify-between"
        >
          <p className="text-[12px] text-[rgba(15,15,20,0.45)]">
            © {new Date().getFullYear()} monday.com. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[12px]">
            <motion.a
              href="#"
              className="text-[rgba(15,15,20,0.55)]"
              whileHover={{ color: '#0f0f14' }}
              transition={springSnappy}
            >
              Privacy policy
            </motion.a>
            <motion.a
              href="#"
              className="text-[rgba(15,15,20,0.55)]"
              whileHover={{ color: '#0f0f14' }}
              transition={springSnappy}
            >
              Terms of service
            </motion.a>
            <label className="flex items-center gap-2 text-[rgba(15,15,20,0.55)]">
              <span className="sr-only">Language</span>
              <select
                className="rounded-md border border-[rgba(15,15,20,0.15)] bg-white px-2 py-1 text-[12px] text-[#0f0f14] transition-colors hover:border-[rgba(97,97,255,0.4)]"
                defaultValue="en"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </label>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
