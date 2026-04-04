import { useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const COLLAB_IMAGE =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80'
import { ExternalLink, Plus, X } from 'lucide-react'
import { ComplianceBadgeGrid } from '../components/ComplianceBadgeGrid'
import { mondayGartnerApmrGraphic } from '../constants/mondayVisuals'
import { pageEase, staggerContainer, staggerItem } from '../motion'

/** Flip: rotateY 180deg, 400ms ease-in-out */
const flipEase: [number, number, number, number] = [0.42, 0, 0.58, 1]
const flipDuration = 0.4

const bentoFlipMinHeightClass = 'min-h-[190px] md:min-h-[210px] lg:min-h-[230px]'

type FlipItem = {
  id: string
  title: string
  body: string
  footer: ReactNode
}

const interactiveItems: FlipItem[] = [
  {
    id: 'teams-use',
    title: 'Teams actually use it',
    body: 'Intuitive enough to adopt. Flexible enough to make your own.',
    footer: (
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-md border border-[rgba(15,15,20,0.1)] bg-[#fafafa] px-2.5 py-1 text-[12px] font-semibold text-[#0f0f14]">
          G2
        </span>
        <span className="text-[13px] font-medium text-[rgba(15,15,20,0.5)]">Highest Adoption · Winter 2025</span>
      </div>
    ),
  },
  {
    id: 'one-place',
    title: 'One place, full picture',
    body:
      'Your data, your tools, your teams, all connected in one place. So your people and agents never work in the dark.',
    footer: (
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="flex flex-col items-center justify-center rounded-[12px] border border-[rgba(15,15,20,0.1)] bg-white px-2 py-4 text-center shadow-sm">
          <span className="text-[20px] font-bold leading-tight tracking-tight text-[#0f0f14] md:text-[22px]">Open API</span>
        </div>
        <div className="flex flex-col items-center justify-center rounded-[12px] border border-[rgba(15,15,20,0.1)] bg-white px-2 py-4 text-center shadow-sm">
          <span className="text-[28px] font-bold tabular-nums leading-none tracking-tight text-[#0f0f14] md:text-[32px]">
            200+
          </span>
          <span className="mt-1.5 text-[12px] font-semibold leading-snug text-[rgba(15,15,20,0.55)]">integrations</span>
        </div>
      </div>
    ),
  },
  {
    id: 'enterprise-ready',
    title: 'Enterprise-ready platform',
    body:
      'The security and governance controls your IT team will approve. Built in, not bolted on.',
    footer: <ComplianceBadgeGrid />,
  },
  {
    id: 'any-industry',
    title: 'Made for any project, any industry',
    body: 'Whatever your team delivers, monday is built for it.',
    footer: (
      <p className="text-[13px] leading-relaxed text-[rgba(15,15,20,0.62)] md:text-[14px]">
        200+ use cases. 190 industries. Thousands of teams like yours already on monday.
      </p>
    ),
  },
]

function IndependentFlipCard({ item, index }: { item: FlipItem; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const reduceMotion = useReducedMotion()
  const toggle = () => setFlipped((f) => !f)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: pageEase, delay: index * 0.06 }}
      className="w-full"
    >
      <div className="[perspective:1200px]">
        <div
          role="button"
          tabIndex={0}
          aria-pressed={flipped}
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              toggle()
            }
          }}
          className="group w-full cursor-pointer rounded-[12px] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#6161FF] focus-visible:ring-offset-2"
        >
          <motion.div
            className={`relative w-full [transform-style:preserve-3d] ${bentoFlipMinHeightClass}`}
            initial={false}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: flipDuration, ease: flipEase }
            }
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              aria-hidden={flipped}
              className={`absolute inset-0 flex flex-col rounded-[12px] border bg-white p-4 shadow-[0_4px_24px_rgba(15,15,20,0.05)] [backface-visibility:hidden] md:p-5 ${
                flipped
                  ? ''
                  : 'border-[#e8e8f0] shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-[rgba(97,97,255,0.3)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]'
              }`}
              style={{ transform: 'rotateY(0deg)', WebkitBackfaceVisibility: 'hidden' }}
            >
              <div>
                <div className="flex items-start justify-between gap-2 md:gap-3">
                  <h3 className="min-w-0 flex-1 text-left text-[15px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#1a1a2e] md:text-[16px]">
                    {item.title}
                  </h3>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(15,15,20,0.08)] bg-white text-[rgba(15,15,20,0.42)] shadow-sm transition-colors group-hover:border-[rgba(15,15,20,0.14)]"
                    aria-hidden
                  >
                    <Plus className="h-4 w-4" strokeWidth={2} />
                  </span>
                </div>
                <p className="mt-2 whitespace-pre-line text-[14px] leading-[1.55] text-[rgba(15,15,20,0.58)] md:mt-2.5">
                  {item.body}
                </p>
              </div>
            </div>

            <div
              aria-hidden={!flipped}
              className="absolute inset-0 flex flex-col rounded-[12px] border border-[rgba(0,0,0,0.07)] bg-white p-4 [backface-visibility:hidden] md:p-5"
              style={{ transform: 'rotateY(180deg)', WebkitBackfaceVisibility: 'hidden' }}
            >
              <div className="flex shrink-0 justify-end">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#6161FF]/35 bg-white text-[#6161FF] shadow-sm"
                  aria-hidden
                >
                  <X className="h-4 w-4" strokeWidth={2} />
                </span>
              </div>
              <motion.div
                initial={false}
                animate={{ opacity: flipped ? 1 : 0 }}
                transition={{ delay: flipped ? 0.5 : 0, duration: 0.2, ease: pageEase }}
                className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto pt-1 text-left"
              >
                {item.footer}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function AnalystFlipCard({
  title,
  claimBody,
  proof,
  index,
}: {
  title: string
  claimBody: ReactNode
  proof: ReactNode
  index: number
}) {
  const [flipped, setFlipped] = useState(false)
  const reduceMotion = useReducedMotion()
  const toggle = () => setFlipped((f) => !f)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: pageEase, delay: index * 0.06 }}
      className="w-full"
    >
      <div className="[perspective:1200px]">
        <div
          tabIndex={0}
          role="group"
          aria-label={
            flipped ? `${title}: showing proof. Activate to show claim.` : `${title}: showing claim. Activate to show proof.`
          }
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              toggle()
            }
          }}
          className="group cursor-pointer rounded-[12px] outline-none focus-visible:ring-2 focus-visible:ring-[#6161FF] focus-visible:ring-offset-2"
        >
          <motion.div
            className={`relative w-full [transform-style:preserve-3d] ${bentoFlipMinHeightClass}`}
            initial={false}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: flipDuration, ease: flipEase }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              aria-hidden={flipped}
              className={`absolute inset-0 flex flex-col rounded-[12px] border bg-white p-4 shadow-[0_4px_24px_rgba(15,15,20,0.05)] [backface-visibility:hidden] md:p-5 ${
                flipped
                  ? ''
                  : 'border-[#e8e8f0] shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-[rgba(97,97,255,0.3)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]'
              }`}
              style={{ transform: 'rotateY(0deg)', WebkitBackfaceVisibility: 'hidden' }}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="min-w-0 flex-1 text-[15px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#1a1a2e] md:text-[16px]">
                  {title}
                </h3>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(15,15,20,0.08)] bg-white text-[rgba(15,15,20,0.42)]"
                  aria-hidden
                >
                  <Plus className="h-4 w-4" strokeWidth={2} />
                </span>
              </div>
              <div className="mt-2 flex-1 text-[14px] leading-[1.55] text-[rgba(15,15,20,0.58)]">{claimBody}</div>
            </div>

            <div
              aria-hidden={!flipped}
              className="absolute inset-0 flex flex-col rounded-[12px] border border-[rgba(0,0,0,0.07)] bg-white p-4 [backface-visibility:hidden] md:p-5"
              style={{ transform: 'rotateY(180deg)', WebkitBackfaceVisibility: 'hidden' }}
            >
              <div className="flex shrink-0 justify-end">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#6161FF]/35 bg-white text-[#6161FF] shadow-sm"
                  aria-hidden
                >
                  <X className="h-4 w-4" strokeWidth={2} />
                </span>
              </div>
              <motion.div
                initial={false}
                animate={{ opacity: flipped ? 1 : 0 }}
                transition={{ delay: flipped ? 0.5 : 0, duration: 0.2, ease: pageEase }}
                className="mt-2 flex min-h-0 flex-1 flex-col justify-center overflow-y-auto text-left"
              >
                {proof}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export function PlatformBentoSection() {
  const reduce = useReducedMotion()

  return (
    <section id="platform-bento" className="scroll-mt-24 pmo-flow-section-top bg-[#ffffff] pmo-section-pad">
      <div className="pmo-container">
        <motion.div
          className="mb-5 md:mb-6"
          variants={staggerContainer(0.06)}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          <motion.h2
            variants={staggerItem}
            className="pmo-section-title max-w-none text-left whitespace-nowrap max-md:overflow-x-auto max-md:pb-1 max-md:[-webkit-overflow-scrolling:touch] max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden"
          >
            Why choose monday.com to run your projects?
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {interactiveItems.slice(0, 3).map((item, i) => (
            <IndependentFlipCard key={item.id} item={item} index={i} />
          ))}

          <motion.div
            className="col-span-1 my-5 overflow-hidden rounded-[10px] md:col-span-2 md:my-5 lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: pageEase }}
          >
            <div className="relative h-[220px] w-full">
              <img
                src={COLLAB_IMAGE}
                alt="Diverse team collaborating together at work"
                className="h-full w-full rounded-[10px] object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          {interactiveItems.slice(3, 4).map((item, i) => (
            <IndependentFlipCard key={item.id} item={item} index={3 + i} />
          ))}

          <AnalystFlipCard
            index={4}
            title="Four years as a Gartner® Leader"
            claimBody={
              <p>
                The 2025 Magic Quadrant™ for Adaptive Project Management and Reporting again places monday.com in the
                Leaders quadrant — the fourth year in a row.
              </p>
            }
            proof={
              <>
                <div className="overflow-hidden rounded-xl border border-[rgba(15,15,20,0.08)] bg-[#fafafa]">
                  <img
                    src={mondayGartnerApmrGraphic}
                    alt="Gartner Magic Quadrant for Adaptive Project Management and Reporting, 2025"
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <a
                  href="https://monday.com/ap/gartner-apmr-2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-[#6161FF] hover:text-[#5050e6] md:text-[14px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  Get started <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </>
            }
          />

          <AnalystFlipCard
            index={5}
            title="Recognized by industry leaders"
            claimBody={
              <p>
                Forrester&apos;s Total Economic Impact study validates significant ROI for monday.com customers.
              </p>
            }
            proof={
              <>
                <p className="text-[30px] font-bold leading-none tracking-tight text-[#6161FF] md:text-[34px]">
                  346%
                </p>
                <p className="mt-1.5 text-[12px] font-medium leading-snug text-[rgba(15,15,20,0.55)] md:text-[13px]">
                  ROI in the Total Economic Impact Study of monday.com
                </p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgba(15,15,20,0.45)] md:text-[12px]">
                  Forrester
                </p>
              </>
            }
          />
        </div>
      </div>
    </section>
  )
}
