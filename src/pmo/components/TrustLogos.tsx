function LogoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-8 min-w-[72px] items-center justify-center px-3 text-[11px] font-semibold uppercase tracking-wide text-[rgba(15,15,20,0.45)]">
      {children}
    </div>
  )
}

export function TrustLogosStrip() {
  const names = [
    'Coca-Cola',
    "McDonald's",
    'Lionsgate',
    'Canva',
    'BMW',
    'Dell',
  ]
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:justify-start">
      {names.map((n) => (
        <LogoBox key={n}>{n}</LogoBox>
      ))}
    </div>
  )
}

export function ScrollingLogoStrip() {
  const names = [
    'Coca-Cola',
    "McDonald's",
    'Lionsgate',
    'Canva',
    'BMW',
    'Dell',
    'WH Smith',
    'Five9',
    'VML',
  ]
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:thin]">
      <div className="flex w-max min-w-full justify-center gap-10 md:gap-14 lg:gap-16">
        {names.map((n) => (
          <div
            key={n}
            className="shrink-0 whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.12em] text-[rgba(15,15,20,0.4)] transition-opacity hover:opacity-100"
          >
            {n}
          </div>
        ))}
      </div>
    </div>
  )
}
