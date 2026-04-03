import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Plus, X } from 'lucide-react'

/** Aligned with PlatformBentoSection */
const flipEase: [number, number, number, number] = [0.22, 1, 0.36, 1]
const flipDuration = 0.65

const cardMinHeight = 'min-h-[300px] sm:min-h-[340px]'

export type ResourceFlipCardProps = {
  label: string
  headline: string
  body: string
  imageSrc: string
  imageAlt: string
}

/**
 * Single flip card: front = copy, back = photo. Click or Enter/Space to flip.
 */
export function ResourceFlipCard({ label, headline, body, imageSrc, imageAlt }: ResourceFlipCardProps) {
  const [flipped, setFlipped] = useState(false)
  const reduceMotion = useReducedMotion()
  const toggle = () => setFlipped((f) => !f)

  const ariaLabel = flipped
    ? `Show text: ${headline}. Press to flip.`
    : `Show image: ${headline}. Press to flip.`

  return (
    <div className="[perspective:1200px]">
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={ariaLabel}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggle()
          }
        }}
        className="w-full cursor-pointer rounded-[12px] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#6161FF] focus-visible:ring-offset-2"
      >
        <motion.div
          className={`relative w-full [transform-style:preserve-3d] ${cardMinHeight}`}
          initial={false}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: flipDuration, ease: flipEase }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front: text */}
          <div
            aria-hidden={flipped}
            className="absolute inset-0 flex flex-col rounded-[12px] border border-[rgba(15,15,20,0.08)] bg-white p-5 shadow-[0_4px_24px_rgba(15,15,20,0.06)] [backface-visibility:hidden] sm:p-6"
            style={{ transform: 'rotateY(0deg)', WebkitBackfaceVisibility: 'hidden' }}
          >
            <div className="flex shrink-0 justify-end">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(15,15,20,0.08)] bg-white text-[rgba(15,15,20,0.42)] shadow-sm"
                aria-hidden
              >
                <Plus className="h-4 w-4" strokeWidth={2} />
              </span>
            </div>
            <div className="flex min-h-0 flex-1 flex-col pt-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6161FF]">{label}</p>
              <h3 className="mt-3 text-[18px] font-bold leading-snug tracking-[-0.02em] text-[#0f0f14] sm:text-[20px]">
                {headline}
              </h3>
              <p className="mt-3 flex-1 whitespace-pre-line text-[14px] leading-relaxed text-[rgba(15,15,20,0.65)] sm:text-[15px]">
                {body}
              </p>
            </div>
          </div>

          {/* Back: image */}
          <div
            aria-hidden={!flipped}
            className="absolute inset-0 overflow-hidden rounded-[12px] border border-[rgba(15,15,20,0.08)] shadow-[0_8px_40px_rgba(15,15,20,0.12)] [backface-visibility:hidden]"
            style={{ transform: 'rotateY(180deg)', WebkitBackfaceVisibility: 'hidden' }}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-cover object-top"
              loading="lazy"
              decoding="async"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(12,12,15,0.35)] via-transparent to-transparent"
              aria-hidden
            />
            <div className="absolute right-3 top-3">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/90 text-[#0f0f14] shadow-md backdrop-blur-sm"
                aria-hidden
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </span>
            </div>
            <p className="absolute bottom-3 left-3 right-12 text-[12px] font-semibold text-white drop-shadow-sm sm:bottom-4 sm:left-4">
              {label}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
