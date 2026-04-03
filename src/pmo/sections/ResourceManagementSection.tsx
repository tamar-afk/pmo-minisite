import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ResourceFlipCard } from '../components/ResourceModeVisual'
import { mondayResourceFlipProductImages } from '../constants/mondayVisuals'
import { SectionChip } from '../components/SectionChip'

const modes = [
  {
    id: 'planning' as const,
    label: 'Plan',
    headline: 'No more staffing surprises',
    body: "Plan headcount at the project level using planned roles, before you're ready to assign.",
    imageSrc: mondayResourceFlipProductImages.planNeeds,
    imageAlt: 'monday.com product: plan workspace for projects',
  },
  {
    id: 'allocation' as const,
    label: 'Assign',
    headline: 'Right person, every time',
    body: 'Assign at the project or task level. AI recommends based on skills, availability, and workload.',
    imageSrc: mondayResourceFlipProductImages.allocate,
    imageAlt: 'monday.com product: align teams and ownership in one place',
  },
  {
    id: 'capacity' as const,
    label: 'Balance',
    headline: 'Always know where your team stands',
    body: 'See planned vs. actual in the capacity manager, spot conflicts, and make changes instantly.',
    imageSrc: mondayResourceFlipProductImages.capacity,
    imageAlt: 'monday.com product: track health and workload across projects',
  },
]

export function ResourceManagementSection() {
  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, amount: 0.15 })

  return (
    <section
      id="resources"
      className="scroll-mt-24 bg-[rgba(244,244,245,0.65)] px-4 py-10 backdrop-blur-[1px] md:px-8 md:py-12 lg:px-12"
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="text-left">
          <SectionChip>Your people</SectionChip>
          <h2 className="mt-5 text-[40px] font-bold leading-[1.2] text-[#0f0f14] md:text-[44px] lg:text-[48px]">
            Your best people on your most important work
          </h2>
          <p className="mt-4 max-w-[640px] text-[16px] font-normal leading-[1.6] text-[rgba(15,15,20,0.6)] md:text-[17px]">
            Now that agents handle the busywork, you can make sure your team&apos;s time and talent go to the work
            that requires them most.
          </p>
        </div>

        <motion.div
          ref={gridRef}
          className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {modes.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 16 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
            >
              <ResourceFlipCard
                label={m.label}
                headline={m.headline}
                body={m.body}
                imageSrc={m.imageSrc}
                imageAlt={m.imageAlt}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          animate={gridInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <a
            href="#pricing"
            className="inline-flex items-center gap-1 text-[15px] font-semibold text-[#6161FF] hover:text-[#5050e6]"
          >
            Get started <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
