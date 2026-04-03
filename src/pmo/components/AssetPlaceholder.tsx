/**
 * Placeholder for missing or broken imagery — dot grid + label (PMO spec).
 */
export function AssetPlaceholder({
  label,
  className = '',
  tone = 'default',
}: {
  label: string
  className?: string
  tone?: 'default' | 'muted' | 'tinted'
}) {
  const bg =
    tone === 'muted' ? 'bg-[#fafafa]' : tone === 'tinted' ? 'bg-[#f5f5f8]' : 'bg-[#f5f5f8]'

  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex flex-col items-center justify-center overflow-hidden border border-[rgba(0,0,0,0.07)] ${bg} ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />
      <span className="relative z-[1] max-w-[220px] px-3 text-center text-[11px] leading-snug text-[#9ca3af]">{label}</span>
    </div>
  )
}
