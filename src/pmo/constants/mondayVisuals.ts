/**
 * Official monday.com marketing assets (Cloudinary CDN).
 * Used for resource rows and analyst proof blocks.
 */
const CLOUDINARY = 'https://dapulse-res.cloudinary.com/image/upload'
const CLOUDINARY_VIDEO = 'https://dapulse-res.cloudinary.com/video/upload'

/** Responsive image transforms: keeps payloads reasonable on retina. */
export function mondayTransform(w: number) {
  return `f_auto,q_auto,w_${w}`
}

/** Project management agent / monday.com AI agent: homepage hero headshot (Cloudinary). */
export const mondayAgentHeadshotUrl = `${CLOUDINARY}/f_auto,q_auto,w_400/v1768899453/Generator_featured%20images/hp-jan-26/Hero/agents/agent-headshot-1.png`

/**
 * Official monday.com Agents marketing reel (optional reference asset).
 */
/**
 * Official monday.com Agents hero reel (Cloudinary).
 * Same marketing asset used on ministite-style demos. See [ministite.vercel.app](https://ministite.vercel.app/).
 */
export const mondayHeroAgentVideo = {
  mp4: `${CLOUDINARY_VIDEO}/v1769001499/Generator_featured%20images/hp-jan-26/Hero/videos-v2/_Agents_HERO-v2.mp4`,
  webm: `${CLOUDINARY_VIDEO}/v1769001499/Generator_featured%20images/hp-jan-26/Hero/videos-v2/_Agents_HERO-v2.webm`,
  poster: `${CLOUDINARY}/f_auto,q_auto,w_1600/v1768980387/Generator_featured%20images/hp-jan-26/Hero/agents-HERO-1.jpg`,
} as const

/**
 * Gartner® Magic Quadrant™ for Adaptive Project Management and Reporting (APMR), 2025 graphic
 * (same asset family as [monday.com/ap/gartner-apmr-2025](https://monday.com/ap/gartner-apmr-2025)).
 */
export const mondayGartnerApmrGraphic =
  'https://cdn.prod.website-files.com/63bd15a406b2101a5dbb3e8f/68cfbb512c7fac714e0c62d5_gartner-2025-main-v2.png'

/**
 * AI PM feature tab art (Plan → Align → Execute → Track → Report).
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

/** Composite strip of monday agent illustrations (local). */
export const mondayAgentStripSrc = '/images/agents/ai-agents-strip.png'

/**
 * Optional single hero MP4: the five beats in order (same sequence as {@link heroAgentStorySteps}):
 * brief/docs sync → board → resources → risks → reports. Split into five equal-time chapters at runtime.
 * Place the file at this path; if missing, the hero uses the interactive step carousel instead.
 */
export const heroPmoCompositeVideoPath = '/videos/pmo-hero-activities.mp4'

/**
 * Hero story beats: local product captures + official agent art.
 * `strip` frames a column from `mondayAgentStripSrc` (same layout as AIAgents section).
 */
export type HeroStoryMedia =
  | { kind: 'brief' }
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'strip'; stripIndex: 0 | 1 | 2 | 3 }

export type HeroAgentStoryStep = {
  id: string
  stepNum: number
  title: string
  body: string
  media: HeroStoryMedia
}

export const heroAgentStorySteps: readonly HeroAgentStoryStep[] = [
  {
    id: 'brief',
    stepNum: 1,
    title: 'Context, live in monday',
    body: 'Your brief stays where your team writes: agents read blocks and docs, then sync structure, owners, and dates into monday.',
    media: { kind: 'brief' },
  },
  {
    id: 'board',
    stepNum: 2,
    title: 'Agent builds your project board',
    body: 'The project management agent creates the workspace structure (groups, items, and timelines) ready for your team.',
    media: {
      kind: 'image',
      src: '/videos/hero-project-board.png',
      alt: 'monday work management project board created by an AI agent',
    },
  },
  {
    id: 'resources',
    stepNum: 3,
    title: 'Allocate resources',
    body: 'See capacity and ownership across workstreams so the right people are on the right work.',
    media: {
      kind: 'image',
      src: '/videos/hero-portfolio-pmo.png',
      alt: 'Portfolio and resource view in monday.com',
    },
  },
  {
    id: 'risk',
    stepNum: 4,
    title: 'Flag risks early',
    body: 'Agents surface delays, conflicts, and dependencies before they derail delivery.',
    media: { kind: 'strip', stripIndex: 0 },
  },
  {
    id: 'report',
    stepNum: 5,
    title: 'Generate executive reports',
    body: 'Leadership-ready rollups from live data: no deck assembly or manual exports.',
    media: {
      kind: 'image',
      src: '/images/monday-projects-portfolios.png',
      alt: 'Projects and portfolios reporting in monday.com',
    },
  },
] as const
