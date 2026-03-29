type ModeId = 'planning' | 'allocation' | 'capacity' | 'decision'

const MODE_LABEL: Record<ModeId, string> = {
  planning: 'Planning',
  allocation: 'Allocation',
  capacity: 'Capacity',
  decision: 'Decisions',
}

/**
 * Custom illustrations for the People management section (not the Feature tabs Plan visual).
 * The monday.com–style Resource planner lives in {@link FeatureTabVisual} `plan`.
 */
export function ResourceModeVisual({ mode }: { mode: ModeId }) {
  return (
    <div className="flex h-full min-h-[220px] w-full items-center justify-center bg-gradient-to-b from-[#f4f5f7] to-[#ececef] p-4 sm:min-h-[260px] sm:p-6">
      <div className="w-full max-w-[400px] rounded-xl border border-[rgba(15,15,20,0.08)] bg-white p-4 shadow-[0_12px_40px_rgba(15,15,20,0.06)]">
        {mode === 'planning' && <PlanningVisual />}
        {mode === 'allocation' && <AllocationVisual />}
        {mode === 'capacity' && <CapacityVisual />}
        {mode === 'decision' && <DecisionVisual />}
      </div>
    </div>
  )
}

function PlanningVisual() {
  return (
    <>
      <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[rgba(15,15,20,0.4)]">
        {MODE_LABEL.planning}
      </p>
      <div className="mt-3 space-y-2">
        {['Q1 launch', 'Integrations', 'CX beta'].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[rgba(15,15,20,0.06)]">
              <div
                className="h-full rounded-full bg-[#6161FF]/80"
                style={{ width: `${45 + i * 18}%` }}
              />
            </div>
            <span className="w-16 shrink-0 text-[10px] text-[rgba(15,15,20,0.55)]">{label}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 rounded-lg bg-[rgba(97,97,255,0.08)] px-2 py-1.5 text-[9px] text-[rgba(15,15,20,0.65)]">
        2 role gaps flagged before staffing lock
      </p>
    </>
  )
}

function AllocationVisual() {
  return (
    <>
      <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[rgba(15,15,20,0.4)]">
        {MODE_LABEL.allocation}
      </p>
      <div className="mt-3 space-y-2">
        {[
          { task: 'API schema', who: 'Sam' },
          { task: 'UAT plan', who: 'Alex' },
          { task: 'Design QA', who: 'Jordan' },
        ].map((row) => (
          <div
            key={row.task}
            className="flex items-center justify-between gap-2 rounded-lg border border-[rgba(15,15,20,0.06)] bg-[#fafafa] px-2 py-1.5"
          >
            <span className="text-[10px] text-[#0f0f14]">{row.task}</span>
            <span className="rounded-full bg-[#6161FF]/15 px-2 py-0.5 text-[9px] font-semibold text-[#6161FF]">
              {row.who}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

function CapacityVisual() {
  return (
    <>
      <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[rgba(15,15,20,0.4)]">
        {MODE_LABEL.capacity}
      </p>
      <div className="mt-3 grid grid-cols-6 gap-1">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className={`aspect-square rounded-sm ${
              i % 7 === 0
                ? 'bg-[#FF6B6B]/75'
                : i % 5 === 0
                  ? 'bg-[#FFCC33]/80'
                  : 'bg-[#3DD598]/45'
            }`}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-between text-[8px] text-[rgba(15,15,20,0.45)]">
        <span>Under</span>
        <span>At cap</span>
        <span>Over</span>
      </div>
    </>
  )
}

function DecisionVisual() {
  return (
    <>
      <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[rgba(15,15,20,0.4)]">
        {MODE_LABEL.decision}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-[rgba(15,15,20,0.08)] bg-[#fafafa] p-2">
          <p className="text-[9px] font-semibold text-[#0f0f14]">Hold scope</p>
          <p className="mt-1 text-[8px] leading-relaxed text-[rgba(15,15,20,0.55)]">Protect date</p>
        </div>
        <div className="rounded-lg border border-[rgba(97,97,255,0.25)] bg-[rgba(97,97,255,0.06)] p-2">
          <p className="text-[9px] font-semibold text-[#6161FF]">Slip date</p>
          <p className="mt-1 text-[8px] leading-relaxed text-[rgba(15,15,20,0.55)]">Keep quality bar</p>
        </div>
      </div>
      <p className="mt-3 text-center text-[8px] text-[rgba(15,15,20,0.4)]">PM picks with full portfolio context</p>
    </>
  )
}
