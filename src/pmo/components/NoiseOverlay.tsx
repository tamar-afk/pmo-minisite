/**
 * Subtle SVG noise (feTurbulence) for dark panels. ~3-4% opacity, pointer-events none.
 */
export function NoiseOverlay({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[2] opacity-[0.04] mix-blend-soft-light ${className}`}
      aria-hidden
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' fill='%23fff'/%3E%3C/svg%3E")`,
      }}
    />
  )
}
