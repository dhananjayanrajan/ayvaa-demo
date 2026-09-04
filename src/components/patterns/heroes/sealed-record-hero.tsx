import { Lock } from 'lucide-react'
import { StatusPill } from '@/components/base/phone/status-pill'

type Props = { id: string; fingerprint: string }

export function SealedRecordHero({ fingerprint }: Props) {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#062419] shadow-[0_28px_64px_-30px_rgba(5,150,105,0.6)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-500/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
      <div className="relative flex items-center justify-between gap-3 p-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-400/15 text-emerald-300"><Lock className="h-4 w-4" strokeWidth={2.4} /></span>
          <span className="min-w-0"><span className="block truncate text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/60">Sealed record</span><span className="mt-0.5 block truncate font-mono text-[11px] font-bold text-emerald-100/80">{fingerprint}</span></span>
        </div>
        <StatusPill tone="emerald" label="Sealed" />
      </div>
    </div>
  )
}
