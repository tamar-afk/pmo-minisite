import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MondayWMLogo } from './Logo'
import { pageEase } from '../motion'

const links = [
  { label: 'Overview', href: '#overview' },
  { label: 'For teams', href: '#for-teams' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
]

function NavLink({ href, children }: { href: string; children: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.a
      href={href}
      className="shrink-0 text-[13px] font-normal text-[#6b7280] transition-colors duration-150 hover:text-[#111118]"
      whileHover={{ y: -1 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.18, ease: pageEase }}
    >
      {children}
    </motion.a>
  )
}

function PrimaryButton({ href, children, variant }: { href: string; children: string; variant: 'ghost' | 'solid' }) {
  const reduce = useReducedMotion()
  if (variant === 'ghost') {
    return (
      <motion.a
        href={href}
        className="inline-flex items-center justify-center rounded-lg border border-[rgba(0,0,0,0.15)] bg-transparent px-5 py-2 text-[13px] font-medium text-[#111118] transition-colors duration-150 hover:bg-[rgba(0,0,0,0.04)]"
        whileHover={{ y: -1, backgroundColor: 'rgba(0,0,0,0.04)' }}
        whileTap={reduce ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.18, ease: pageEase }}
      >
        {children}
      </motion.a>
    )
  }
  return (
    <motion.a
      href={href}
      className="inline-flex items-center justify-center rounded-lg bg-[#6161ff] px-5 py-2 text-[13px] font-medium text-white transition-colors duration-150 hover:bg-[#5050ee]"
      whileHover={{ y: -1, backgroundColor: '#5050ee' }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.18, ease: pageEase }}
    >
      {children}
    </motion.a>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-[rgba(0,0,0,0.07)] transition-[background,backdrop-filter] duration-150"
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.45, ease: pageEase }}
      style={{
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        backgroundColor: scrolled ? 'rgba(255,255,255,0.9)' : '#ffffff',
      }}
    >
      <div className="pmo-container flex flex-col gap-2 py-2 md:flex-row md:items-center md:justify-between md:gap-4">
        <div className="flex items-center justify-between gap-4">
          <MondayWMLogo onDark={false} />
          <div className="flex items-center gap-2 sm:gap-3 md:hidden">
            <PrimaryButton href="#contact" variant="ghost">
              Contact sales
            </PrimaryButton>
            <PrimaryButton href="#pricing" variant="solid">
              Get started
            </PrimaryButton>
          </div>
        </div>

        <nav
          className="flex w-full items-center gap-5 overflow-x-auto pb-0.5 [scrollbar-width:none] md:flex-1 md:justify-center md:gap-6 [&::-webkit-scrollbar]:hidden"
          aria-label="Primary"
        >
          {links.map((l) => (
            <NavLink key={l.href + l.label} href={l.href}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:gap-3 md:flex">
          <PrimaryButton href="#contact" variant="ghost">
            Contact sales
          </PrimaryButton>
          <PrimaryButton href="#pricing" variant="solid">
            Get started
          </PrimaryButton>
        </div>
      </div>
    </motion.header>
  )
}
