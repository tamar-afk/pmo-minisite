import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { pageEase } from '../motion'

const INTERACTIVE_SELECTOR =
  'a[href],button:not([disabled]),[role="button"]:not([disabled]),summary,[data-cursor-interactive],input:not([disabled]),select,textarea,.cursor-interactive'

const CTA_SELECTOR = '[data-cursor-cta],.hero-cta-pulse'

/**
 * Purple dot follows the pointer with a slight lag; larger on CTAs. Disabled when reduced motion is on.
 */
export function CustomCursor() {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [cta, setCta] = useState(false)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  /** ~80ms trailing feel vs pointer (no bounce easing). */
  const springX = useSpring(mouseX, { stiffness: 220, damping: 30, mass: 0.42 })
  const springY = useSpring(mouseY, { stiffness: 220, damping: 30, mass: 0.42 })

  useEffect(() => {
    if (reduceMotion) return

    const pick = (target: Element | null) => {
      if (!target) return { hit: false, cta: false }
      const el = target.closest(INTERACTIVE_SELECTOR)
      if (!el) return { hit: false, cta: false }
      const isCta = !!(target.closest(CTA_SELECTOR) || el.closest(CTA_SELECTOR))
      return { hit: true, cta: isCta }
    }

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      const under = document.elementFromPoint(e.clientX, e.clientY)
      const { hit, cta: c } = pick(under)
      setVisible(hit)
      setCta(c)
      document.body.style.cursor = hit ? 'none' : ''
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.body.style.cursor = ''
    }
  }, [reduceMotion, mouseX, mouseY])

  if (reduceMotion) return null

  const size = cta ? 20 : 12

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[540]"
      style={{ x: springX, y: springY }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2"
        style={{ marginLeft: 0, marginTop: 0 }}
      >
        <motion.div
          className="rounded-full bg-[#6161ff]"
          animate={{
            width: visible ? size : 0,
            height: visible ? size : 0,
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.15, ease: pageEase }}
        />
      </div>
    </motion.div>
  )
}
