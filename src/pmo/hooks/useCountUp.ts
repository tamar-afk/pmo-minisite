import { useEffect, useState } from 'react'

export function useCountUp(
  target: number,
  active: boolean,
  options?: { durationMs?: number; format?: 'percent' | 'k' | 'plain' },
) {
  const durationMs = options?.durationMs ?? 1500
  const format = options?.format ?? 'plain'
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!active) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1)
      const eased = 1 - (1 - t) ** 3
      const val = Math.round(eased * target)
      if (format === 'percent') setDisplay(`${val}%`)
      else if (format === 'k') setDisplay(`${val}K`)
      else setDisplay(String(val))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, durationMs, format])

  return display
}
