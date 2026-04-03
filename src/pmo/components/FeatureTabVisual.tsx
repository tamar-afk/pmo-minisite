import { motion, useReducedMotion } from 'framer-motion'
import { pageEase } from '../motion'
import { AssetPlaceholder } from './AssetPlaceholder'

export type FeatureTabId = 'plan' | 'align' | 'execute' | 'track' | 'report'

const PLACEHOLDER_LABEL: Record<FeatureTabId, string> = {
  plan: 'Project planning view',
  align: 'Status update view',
  execute: 'Task board view',
  track: 'Project health dashboard',
  report: 'Executive report view',
}

export function FeatureTabVisual({
  tabId,
  'aria-labelledby': ariaLabelledBy,
}: {
  tabId: FeatureTabId
  'aria-labelledby'?: string
}) {
  const reduce = useReducedMotion()

  return (
    <div className="w-full min-w-0" aria-labelledby={ariaLabelledBy}>
      <motion.div
        key={tabId}
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: pageEase, delay: reduce ? 0 : 0.06 }}
      >
        <AssetPlaceholder label={PLACEHOLDER_LABEL[tabId]} className="h-[220px] w-full rounded-[10px] sm:h-[240px] md:h-[260px]" />
      </motion.div>
    </div>
  )
}
