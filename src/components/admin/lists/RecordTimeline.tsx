import { Check, FileClock, Link2, Lock, ShieldCheck, UserRound } from 'lucide-react'
import { Card, Tile } from '@/components/phone/kit'
import { cn } from '@/lib/utils'
import type { RecordEntry } from '@/data/admin/a14Data'

type Props = { entries: RecordEntry[]; verified: boolean }

export function RecordTimeline({ entries, verified }: Props) {
  return (
    <Card>
      <div className="px-4 pb-4">
        <div className="flex flex-col">
          {entries.map((entry, i) => {
            const isLast = i === entries.length - 1
            const isAccess = entry.kind === 'access'
            return (
              <div key={entry.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className={cn('relative mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full', entry.isCurrent ? 'bg-emerald-500 text-white' : 'bg-emerald-500/[0.15] text-emerald-600')}>
                    {verified ? <Check className="h-3.5 w-3.5" strokeWidth={2.6} /> : entry.isCurrent ? <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.4} /> : <Lock className="h-3.5 w-3.5" strokeWidth={2.4} />}
                  </span>
                  {!isLast && <span className={cn('my-1 w-px flex-1', verified ? 'bg-gradient-to-b from-emerald-500/50 via-emerald-400/25 to-emerald-300/15' : 'bg-gradient-to-b from-emerald-500/30 via-emerald-400/15 to-transparent')} />}
                </div>
                <div className={cn('min-w-0 flex-1 rounded-2xl p-3', entry.isCurrent ? 'bg-emerald-500/[0.08]' : 'bg-[#0B211B]/[0.03]', !isLast && 'mb-3')}>
                  <div className="flex items-center justify-between gap-2"><span className="text-[13px] font-bold tracking-tight text-[#0B211B]">Step {entry.step}</span><span className="shrink-0 font-mono text-[10px] font-bold tabular-nums text-[#0B211B]/40">{entry.timestamp}</span></div>
                  <div className="mt-1.5 flex items-start gap-2"><Tile icon={isAccess ? FileClock : UserRound} tone={entry.isCurrent ? 'success' : 'neutral'} className="size-7 shrink-0" /><div className="min-w-0 flex-1"><div className="break-words text-[12px] font-bold leading-snug text-[#0B211B]/80">{entry.action}</div><div className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">{entry.actor} · {entry.role}</div></div></div>
                  <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-white/60 px-2.5 py-1.5"><Link2 className="h-3 w-3 shrink-0 text-[#0B211B]/40" strokeWidth={2} /><span className="font-mono text-[10px] font-bold text-[#0B211B]/70">{entry.reference}</span></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
