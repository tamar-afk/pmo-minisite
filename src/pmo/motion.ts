/** Page-wide easing (Linear-style): smooth, no bounce */
export const pageEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

/** Global scroll entrance: 500ms, 20px rise */
export const pageRevealTransition = {
  duration: 0.5,
  ease: pageEase,
} as const

/** Tab / panel cross-fade */
export const tabFadeOutMs = 0.25
export const tabFadeInMs = 0.35

/** Shared Framer Motion presets — prefer pageEase over springs for hovers */
export const springSnappy = { type: 'spring' as const, stiffness: 380, damping: 28 }
export const springSoft = { type: 'spring' as const, stiffness: 120, damping: 22 }
export const springGentle = { type: 'spring' as const, stiffness: 80, damping: 18 }

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export const staggerContainer = (stagger = 0.06) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: 0.04 },
  },
})

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: pageRevealTransition,
  },
}
