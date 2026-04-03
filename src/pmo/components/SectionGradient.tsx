/** 60px or 80px vertical blend between section backgrounds */
export function SectionGradient({
  from,
  to,
  className = '',
  height = 60,
}: {
  from: string
  to: string
  className?: string
  height?: 60 | 80
}) {
  const h = height === 80 ? 'h-20' : 'h-[60px]'
  return (
    <div
      className={`w-full ${h} ${className}`}
      aria-hidden
      style={{
        background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
      }}
    />
  )
}
