import { Card, Chip } from '@/components/base/phone/kit'
import { cn } from '@/lib/utils'
import { AUDIT_EVENTS } from '@/data/admin/a16Data'

function SectionMarker({ label, trail, tone = 'emerald' }: { label: string; trail?: React.ReactNode; tone?: 'emerald' | 'rose' | 'blue' }) {
  const toneClass = tone === 'rose' ? 'bg-rose-500' : tone === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'
  return (
    <div className="flex items-center gap-2.5 px-1">
      <div className={cn('h-3 w-1 rounded-full', toneClass)} />
      <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/55">{label}</span>
      <div className="h-px flex-1 bg-[#0B211B]/[0.08]" />
      {trail}
    </div>
  )
}

export function RetentionAuditTimeline() {
  return (
    <div className="shrink-0 flex flex-col gap-3">
      <SectionMarker label="Recent activity" trail={<Chip intent="neutral" className="border-transparent bg-[#0B211B]/[0.05] text-[#0B211B]/55">This policy</Chip>} />
      <Card>
        <div className="p-5">
          <div className="flex flex-col">
            {AUDIT_EVENTS.map((e, idx) => {
              const Icon = e.icon
              return (
                <div key={e.id} className="relative flex gap-3 py-3">
                  {idx < AUDIT_EVENTS.length - 1 && <div aria-hidden className="absolute left-[17px] top-[44px] h-[calc(100%-12px)] w-px bg-[#0B211B]/[0.08]" />}
                  <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500/[0.08]">
                    <Icon className="h-4 w-4 text-emerald-600" strokeWidth={2.2} aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="text-[12px] font-bold tracking-tight text-[#0B211B]">{e.action}</div>
                    <div className="mt-1 text-[10px] font-semibold text-[#0B211B]/50">{e.actor}</div>
                    <div className="text-[10px] font-bold tabular-nums text-[#0B211B]/35">{e.when}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Card>
    </div>
  )
}
