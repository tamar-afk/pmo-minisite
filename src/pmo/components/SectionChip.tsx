import { type ReactNode } from 'react'

type SectionChipProps = {
  children: ReactNode
  /** Sentence case for multi-word eyebrows */
  sentenceCase?: boolean
  className?: string
}

/** Eyebrow: text only — no background or border (Linear). */
export function SectionChip({ children, sentenceCase = false, className = '' }: SectionChipProps) {
  return (
    <span
      className={`mb-1.5 block text-[10px] font-medium uppercase tracking-[0.1em] text-[#6161ff] ${
        sentenceCase ? 'normal-case tracking-[0.05em]' : ''
      } ${className}`}
    >
      {children}
    </span>
  )
}
