/** Page-wide easing (Linear-style): smooth, no bounce */
export const pageEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const pageRevealTransition = {
  duration: 0.4,
  ease: pageEase,
} as const

/** Shared Framer Motion presets for consistent, snappy UI feel */
export const springSnappy = { type: 'spring' as const, stiffness: 380, damping: 28 }
export const springSoft = { type: 'spring' as const, stiffness: 120, damping: 22 }
export const springGentle = { type: 'spring' as const, stiffness: 80, damping: 18 }

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

export const staggerContainer = (stagger = 0.08) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: 0.04 },
  },
})

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: pageRevealTransition,
  },
}
