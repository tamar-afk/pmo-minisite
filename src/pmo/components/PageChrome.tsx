/**
 * Fine dot grid — same surface everywhere (4px dots, 32px spacing).
 */
export function PageChrome() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden
      style={{
        opacity: 0.04,
        backgroundImage:
          'radial-gradient(circle, rgba(10, 10, 15, 0.45) 2px, transparent 2px)',
        backgroundSize: '32px 32px',
      }}
    />
  )
}
