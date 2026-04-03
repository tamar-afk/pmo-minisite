/** Hero product frame: dot grid + label. */
export function HeroShowcase() {
  return (
    <div
      role="region"
      aria-label="Product overview placeholder"
      className="relative flex h-[280px] w-full flex-col items-center justify-center overflow-hidden rounded-t-[10px] border border-b-0 border-[rgba(0,0,0,0.07)] bg-[#f5f5f8] sm:h-[300px] md:h-[320px]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />
      <span className="relative z-[1] text-[11px] text-[#9ca3af]">Product overview</span>
    </div>
  )
}
