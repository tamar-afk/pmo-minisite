import { motion } from 'framer-motion'
import { springSnappy } from '../motion'

export function MondayWMLogo({
  className = '',
  onDark = false,
}: {
  className?: string
  /** Light wordmark when the header sits over the dark hero */
  onDark?: boolean
}) {
  return (
    <motion.a
      href="#overview"
      className={`flex items-center gap-2 ${className}`}
      aria-label="monday.com home"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={springSnappy}
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
        style={{ background: '#6161FF' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 18V6h3v12H6zm4.5 0V9h3v9h-3zm4.5-6V6h3v6h-3z"
            fill="white"
          />
        </svg>
      </span>
      <span
        className={`text-[15px] font-semibold leading-none tracking-[-0.03em] antialiased ${onDark ? 'text-white' : 'text-[#0f0f14]'}`}
      >
        monday.com
      </span>
    </motion.a>
  )
}

export function MondayDotLogo({ size = 36 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full text-white shadow-[0_0_0_1px_rgba(97,97,255,0.35)]"
      style={{
        width: size,
        height: size,
        background: '#6161FF',
      }}
    >
      <svg width={size * 0.42} height={size * 0.42} viewBox="0 0 24 24" fill="none">
        <path
          d="M6 18V6h3v12H6zm4.5 0V9h3v9h-3zm4.5-6V6h3v6h-3z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}
