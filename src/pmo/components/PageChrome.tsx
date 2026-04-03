/**
 * Continuous canvas: dot motif + left spine (Linear-style continuity).
 * Sits under content; pointer-events none.
 */
export function PageChrome() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.45]"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(18, 18, 28, 0.035) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div
        className="pointer-events-none fixed inset-y-0 z-[2] w-px bg-[rgba(97,97,255,0.15)]"
        style={{ left: 'max(1rem, calc(50% - 40rem))' }}
        aria-hidden
      />
    </>
  )
}
