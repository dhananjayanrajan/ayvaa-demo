import { Check, ChevronDown, FileText, Link2, UserRound } from 'lucide-react'
import { Card, Chip, Expand } from '@/components/base/phone/kit'
import { cn } from '@/lib/utils'
import { versionStatusTone } from '@/data/admin/a15Data'
import type { Version } from '@/data/admin/a15Data'

type Props = { versions: Version[]; activeVersion: number; openId: string; onToggle: (id: string) => void; onCompare: (id: string) => void }

export function VersionHistory({ versions, activeVersion, openId, onToggle, onCompare }: Props) {
  return (
    <Card>
      <div className="p-4">
        <div className="flex flex-col gap-2">
          {versions.map((version) => {
            const isOpen = openId === version.id
            const isCurrent = version.version === activeVersion
            const versionTone = versionStatusTone(version.status)
            return (
              <div key={version.id} className={cn('rounded-2xl border-l-4', isCurrent ? 'border-emerald-500 bg-emerald-500/[0.06]' : version.status === 'withdrawn' ? 'border-rose-500 bg-rose-500/[0.04]' : 'border-[#0B211B]/10 bg-[#0B211B]/[0.03]')}>
                <button type="button" onClick={() => onToggle(isOpen ? '' : version.id)} aria-expanded={isOpen} className="flex w-full items-center gap-3 px-3 py-3 text-left">
                  <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-xl', isCurrent ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.06] text-[#0B211B]/60')}><FileText className="h-4 w-4" strokeWidth={2.2} /></span>
                  <div className="min-w-0 flex-1"><div className="flex items-center gap-2"><span className="text-[13px] font-bold tracking-tight text-[#0B211B]">v{version.version}</span>{isCurrent && <Chip intent={versionTone} className="border-transparent">Current</Chip>}{version.status === 'withdrawn' && <Chip intent="danger" className="border-transparent">Withdrawn</Chip>}</div><div className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">{version.summary}</div><div className="mt-0.5 font-mono text-[10px] font-bold tabular-nums text-[#0B211B]/40">{version.date}</div></div>
                  <ChevronDown className={cn('h-4 w-4 shrink-0 text-[#0B211B]/30 transition-transform duration-200', isOpen && 'rotate-180')} />
                </button>
                <Expand open={isOpen}>
                  <div className="px-3 pb-3">
                    <div className="rounded-2xl bg-white/60 p-3">
                      <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">Signatories</div>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">{version.signatories.map((s) => <span key={s} className="inline-flex items-center gap-1.5 rounded-full bg-[#0B211B]/[0.05] px-2.5 py-1 text-[10px] font-bold text-[#0B211B]/70"><UserRound className="h-3 w-3" strokeWidth={2.4} />{s}</span>)}</div>
                      <div className="mt-3 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">Scopes granted</div>
                      <div className="mt-1.5 flex flex-col gap-1.5">{version.scopes.map((scope) => <div key={scope.id} className="flex items-center gap-2"><span className={cn('grid h-4 w-4 shrink-0 place-items-center rounded-full', scope.granted ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.08] text-transparent')}>{scope.granted && <Check className="h-2.5 w-2.5" strokeWidth={3.5} />}</span><span className={cn('text-[11px] font-semibold', scope.granted ? 'text-[#0B211B]/75' : 'text-[#0B211B]/35')}>{scope.name}</span></div>)}</div>
                      <div className="mt-3 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">Changes</div>
                      <div className="mt-1.5 flex flex-col gap-1">{version.changes.map((c) => <span key={c} className="text-[11px] font-medium text-[#0B211B]/65">{c}</span>)}</div>
                      <button type="button" onClick={() => onCompare(version.id)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B211B]/[0.05] py-2.5 text-[11px] font-bold text-[#0B211B]/70"><Link2 className="h-3.5 w-3.5" strokeWidth={2.4} />Compare with previous</button>
                    </div>
                  </div>
                </Expand>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
