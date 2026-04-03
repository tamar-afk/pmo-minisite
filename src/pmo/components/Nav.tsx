import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MondayWMLogo } from './Logo'
import { pageEase } from '../motion'

const links = [
  { label: 'Overview', href: '#overview' },
  { label: 'For teams', href: '#for-teams' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
]

function NavLink({
  href,
  children,
  onDark,
}: {
  href: string
  children: string
  onDark: boolean
}) {
  return (
    <motion.a
      href={href}
      className={`group relative shrink-0 text-[14px] font-normal leading-none tracking-[0.01em] transition-colors duration-300 md:text-[15px] ${
        onDark
          ? 'text-[rgba(255,255,255,0.68)] hover:text-white'
          : 'text-[#6b6b8a] hover:text-[#0a0a0f]'
      }`}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.15, ease: pageEase }}
    >
      {children}
      <span className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left scale-x-0 rounded-full bg-[#6161FF] opacity-90 transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </motion.a>
  )
}

function PrimaryButton({
  href,
  children,
  variant,
  onDark,
}: {
  href: string
  children: string
  variant: 'ghost' | 'solid'
  onDark: boolean
}) {
  const base =
    'rounded-full px-5 py-2.5 text-[14px] font-semibold leading-none tracking-[0.01em] antialiased sm:px-6 inline-flex items-center justify-center transition-colors duration-200'
  if (variant === 'ghost') {
    return (
      <motion.a
        href={href}
        className={`${base} border ${
          onDark
            ? 'border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.08)]'
            : 'border-[rgba(15,15,20,0.12)] text-[#0f0f14] hover:bg-[rgba(15,15,20,0.05)]'
        }`}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15, ease: pageEase }}
      >
        {children}
      </motion.a>
    )
  }
  return (
    <motion.a
      href={href}
      className={`${base} bg-[#6161ff] text-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]`}
      whileHover={{ scale: 1.02, backgroundColor: '#7272ff', boxShadow: '0 8px 24px rgba(97,97,255,0.35)' }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: pageEase }}
    >
      {children}
    </motion.a>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const onDark = false

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-[#e8e8f0]/90 transition-colors"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: pageEase }}
      style={{
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(12px) saturate(180%)',
        backgroundColor: scrolled ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.72)',
        borderBottomColor: 'rgba(232,232,240,0.9)',
      }}
    >
      <div className="pmo-container flex flex-col gap-3 py-3.5 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="flex items-center justify-between gap-4">
          <MondayWMLogo onDark={onDark} />
          <div className="flex items-center gap-2 sm:gap-3 md:hidden">
            <PrimaryButton href="#contact" variant="ghost" onDark={onDark}>
              Contact sales
            </PrimaryButton>
            <PrimaryButton href="#pricing" variant="solid" onDark={onDark}>
              Get started
            </PrimaryButton>
          </div>
        </div>

        <nav
          className="flex w-full items-center gap-4 overflow-x-auto pb-0.5 [scrollbar-width:none] md:flex-1 md:justify-center md:gap-8 [&::-webkit-scrollbar]:hidden"
          aria-label="Primary"
        >
          {links.map((l) => (
            <NavLink key={l.href + l.label} href={l.href} onDark={onDark}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:gap-3 md:flex">
          <PrimaryButton href="#contact" variant="ghost" onDark={onDark}>
            Contact sales
          </PrimaryButton>
          <PrimaryButton href="#pricing" variant="solid" onDark={onDark}>
            Get started
          </PrimaryButton>
        </div>
      </div>
    </motion.header>
  )
}
