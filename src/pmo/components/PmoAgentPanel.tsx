const skills = [
  {
    name: 'Progress tracker',
    desc: 'Monitors project milestones and phases',
    icon: (
      <path d="M4 6h16v2H4V6zm0 5h10v2H4v-2zm0 5h14v2H4v-2z" fill="currentColor" />
    ),
  },
  {
    name: 'Nudger',
    desc: 'Identifies and addresses workflow issues',
    icon: (
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" fill="currentColor" />
    ),
  },
  {
    name: 'Reporting manager',
    desc: 'Tracks and summarizes project progress',
    icon: (
      <path d="M4 19h16v2H4v-2zm2-4h2v2H6v-2zm0-4h2v6H6V7zm4 8h2v2h-2v-2zm0-6h2v8h-2v-8zm4 4h2v4h-2v-4zm0-8h2v12h-2V3z" fill="currentColor" />
    ),
  },
  {
    name: 'Risks analyzer',
    desc: 'Identifies and assesses potential project risks',
    icon: (
      <path d="M12 2L4 7v3c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V7l-8-5z" fill="currentColor" />
    ),
  },
  {
    name: 'Dependencies resolver',
    desc: 'Manages project dependencies efficiently',
    icon: (
      <path d="M10 4H4v6h2V8h4V4zm8 0h-4v4h4v4h2V4h-2zm-8 12H4v-2h4v-4h2v6zm8 0h-4v-4h-2v6h6v-2z" fill="currentColor" />
    ),
  },
]

function ToggleOn() {
  return (
    <span
      className="relative inline-flex h-[22px] w-10 shrink-0 items-center rounded-full"
      style={{ background: '#0075FF' }}
      aria-hidden
    >
      <span className="absolute right-0.5 h-[18px] w-[18px] rounded-full bg-white shadow-sm" />
    </span>
  )
}

export function PmoAgentPanel({
  className = '',
  maxWidthClass = 'max-w-[360px]',
}: {
  className?: string
  maxWidthClass?: string
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-white text-[#1A1A1A] shadow-[0_24px_64px_rgba(0,0,0,0.35)] ${maxWidthClass} ${className}`}
    >
      <div className="border-b border-[rgba(0,0,0,0.06)] p-4">
        <div className="flex gap-3">
          <div
            className="h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-[rgba(97,97,255,0.35)]"
            style={{
              background:
                'linear-gradient(145deg, rgba(97,97,255,0.45) 0%, rgba(97,97,255,0.15) 100%)',
            }}
            aria-hidden
          />
          <div className="min-w-0">
            <p className="text-[15px] font-bold leading-tight text-[#0f0f14]">
              Hi, I&apos;m your PMO agent
            </p>
            <p className="mt-1 text-[11px] leading-snug text-[rgba(0,0,0,0.5)]">
              Your PMO Agent prioritizes your day by highlighting key meetings,
              projects, and reminders.
            </p>
          </div>
        </div>
      </div>
      <div className="max-h-[min(60vh,420px)] space-y-0 overflow-y-auto px-3 py-2">
        {skills.map((s) => (
          <div
            key={s.name}
            className="flex items-start gap-2 border-b border-[rgba(0,0,0,0.05)] py-2.5 last:border-0"
          >
            <span
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center text-[rgba(97,97,255,0.75)]"
              aria-hidden
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                {s.icon}
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-[#0f0f14]">{s.name}</p>
              <p className="text-[12px] leading-snug text-[rgba(0,0,0,0.45)]">
                {s.desc}
              </p>
            </div>
            <ToggleOn />
          </div>
        ))}
      </div>
    </div>
  )
}

export function WebsiteRedesignBoard({ className = '' }: { className?: string }) {
  const tasks = [
    { name: 'Brand research', priority: 'Critical', color: '#E879A9' },
    { name: 'Looking for color palette', priority: 'High', color: '#8B1538' },
    { name: 'Approve typography', priority: 'Low', color: '#0075FF' },
    { name: 'Creating sketches', priority: 'Extremely low', color: '#E85D04' },
  ]
  return (
    <div
      className={`rounded-xl border border-[rgba(15,15,20,0.1)] bg-white p-3 text-left shadow-sm ${className}`}
    >
      <p className="text-[13px] font-bold text-[#0f0f14]">Website redesign</p>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-[rgba(15,15,20,0.45)]">
        Design phase
      </p>
      <div className="mt-2 space-y-1.5">
        {tasks.map((t) => (
          <div
            key={t.name}
            className="flex items-center justify-between gap-2 rounded-lg bg-[#f4f4f5] px-2 py-1.5"
          >
            <span className="truncate text-[11px] text-[#0f0f14]">{t.name}</span>
            <span
              className="shrink-0 rounded px-1.5 py-0.5 text-[9px] font-semibold text-white"
              style={{ background: t.color }}
            >
              {t.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
