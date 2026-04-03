/**
 * Official monday.com marketing assets (Cloudinary CDN).
 * Used for resource rows and analyst proof blocks.
 */
const CLOUDINARY = 'https://dapulse-res.cloudinary.com/image/upload'

/** Responsive image transforms: keeps payloads reasonable on retina. */
export function mondayTransform(w: number) {
  return `f_auto,q_auto,w_${w}`
}

/** Project management agent / monday.com AI agent: homepage hero headshot (Cloudinary). */
export const mondayAgentHeadshotUrl = `${CLOUDINARY}/f_auto,q_auto,w_400/v1768899453/Generator_featured%20images/hp-jan-26/Hero/agents/agent-headshot-1.png`

/**
 * Gartner® Magic Quadrant™ for Adaptive Project Management and Reporting (APMR), 2025 graphic
 * (same asset family as [monday.com/ap/gartner-apmr-2025](https://monday.com/ap/gartner-apmr-2025)).
 */
export const mondayGartnerApmrGraphic =
  'https://cdn.prod.website-files.com/63bd15a406b2101a5dbb3e8f/68cfbb512c7fac714e0c62d5_gartner-2025-main-v2.png'

/**
 * AI PM feature tab art (Plan → Align → Run → Track → Report; asset key `execute`).
 * Same Cloudinary assets as [monday.com/ap/project-management/ai-var](https://monday.com/ap/project-management/ai-var).
 */
/** Tab art max ~440px CSS: fetch at 640w to match display size */
export const mondayAiPmFeatureTabImages = {
  plan: `${CLOUDINARY}/${mondayTransform(640)}/v1771152734/Generator_featured%20images/pm-feb-26/features/pm-feature-plan.avif`,
  align: `${CLOUDINARY}/${mondayTransform(640)}/v1771156858/Generator_featured%20images/pm-feb-26/features/pm-feature-align.avif`,
  execute: `${CLOUDINARY}/${mondayTransform(640)}/v1771152735/Generator_featured%20images/pm-feb-26/features/pm-feature-execute.avif`,
  track: `${CLOUDINARY}/${mondayTransform(640)}/Generator_featured%20images/pm-feb-26/pm-feb-26-Track.avif`,
  report: `${CLOUDINARY}/${mondayTransform(640)}/v1771152734/Generator_featured%20images/pm-feb-26/features/pm-feature-report.avif`,
} as const

/**
 * Your people flip cards: same official PM product screens as the lifecycle tabs, at 900px wide for sharp card backs.
 */
export const mondayResourceFlipProductImages = {
  planNeeds: `${CLOUDINARY}/${mondayTransform(900)}/v1771152734/Generator_featured%20images/pm-feb-26/features/pm-feature-plan.avif`,
  allocate: `${CLOUDINARY}/${mondayTransform(900)}/v1771156858/Generator_featured%20images/pm-feb-26/features/pm-feature-align.avif`,
  capacity: `${CLOUDINARY}/${mondayTransform(900)}/Generator_featured%20images/pm-feb-26/pm-feb-26-Track.avif`,
} as const

/** Composite strip of monday agent illustrations (local). */
export const mondayAgentStripSrc = '/images/agents/ai-agents-strip.png'
