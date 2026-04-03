import { mondayAiPmFeatureTabImages } from '../constants/mondayVisuals'

export type FeatureTabId = 'plan' | 'align' | 'execute' | 'track' | 'report'

const ALT: Record<FeatureTabId, string> = {
  plan: 'Plan projects with AI: timelines, owners, and dependencies',
  align: 'Keep teams aligned with automated nudges and real-time updates',
  execute: 'Execute work with monday agents across teams',
  track: 'Track risk, progress, and capacity across projects',
  report: 'Generate project reports and stakeholder insights',
}

/**
 * Official tab art from [monday AI PM](https://monday.com/ap/project-management/ai-var) (`mondayAiPmFeatureTabImages`).
 */
export function FeatureTabVisual({
  tabId,
  'aria-labelledby': ariaLabelledBy,
}: {
  tabId: FeatureTabId
  'aria-labelledby'?: string
}) {
  return (
    <div
      className="overflow-hidden rounded-[12px] border border-[rgba(15,15,20,0.1)] bg-[#f4f4f5] shadow-[0_12px_40px_rgba(15,15,20,0.08)]"
      aria-labelledby={ariaLabelledBy}
    >
      <div className="flex justify-center px-2 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4">
        <img
          src={mondayAiPmFeatureTabImages[tabId]}
          alt={ALT[tabId]}
          className="h-auto w-full max-w-[min(100%,300px)] object-cover object-left-top sm:max-w-[360px] md:max-w-[400px] lg:max-w-[440px]"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  )
}
