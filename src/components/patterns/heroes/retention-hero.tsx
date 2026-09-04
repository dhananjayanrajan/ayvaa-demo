import { motion } from 'motion/react'
import { Clock, History, Scale } from 'lucide-react'
import { Chip } from '@/components/base/phone/kit'
import type { RecordType } from '@/data/admin/a16Data'

export function RetentionHero({ policy, holdsCount, onEdit }: { policy: RecordType; holdsCount: number; onEdit: () => void }) {
  const Icon = policy.icon
  return (
    <div className="shrink-0 relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <div className="h-3 w-1 rounded-full bg-emerald-400" />
              <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/60">Active retention policy</span>
            </div>
            <h2 className="mt-1.5 text-[20px] font-extrabold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-emerald-100 via-emerald-200 to-teal-100 bg-clip-text text-transparent">{policy.label}</span>
            </h2>
          </div>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-400/10 text-emerald-200">
            <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
          </span>
        </div>
        <div className="mt-3.5 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-white/[0.04] px-3 py-2.5">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/50">Retention</div>
            <div className="mt-0.5 flex items-baseline gap-1">
              <span className="text-[20px] font-extrabold tabular-nums leading-none tracking-tight text-white">{policy.years}</span>
              <span className="text-[10px] font-bold text-emerald-100/60">years</span>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] px-3 py-2.5">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/50">Records</div>
            <div className="mt-0.5 flex items-baseline gap-1">
              <span className="text-[20px] font-extrabold tabular-nums leading-none tracking-tight text-white">{(policy.records / 1000).toFixed(1)}k</span>
            </div>
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-2.5 rounded-2xl bg-amber-400/[0.06] px-3 py-2.5">
          <Clock className="h-3.5 w-3.5 shrink-0 text-amber-300" strokeWidth={2.2} aria-hidden />
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold text-amber-100">Next purge in <span className="tabular-nums">{policy.nextPurge}</span></div>
            <div className="text-[9.5px] font-semibold text-amber-100/60"><span className="tabular-nums">{policy.purgeCount}</span> records scheduled</div>
          </div>
          <Chip intent="warning" className="shrink-0 border-transparent bg-amber-400/15 text-amber-200">Soon</Chip>
        </div>
        <div className="mt-2.5 grid grid-cols-1 gap-2">
          <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={onEdit} className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-2.5 shadow-[0_14px_28px_-14px_rgba(16,185,129,0.7)]">
            <Scale className="h-3.5 w-3.5 text-white" strokeWidth={2.4} aria-hidden />
            <span className="text-[11.5px] font-bold text-white">Edit policy</span>
          </motion.button>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-xl bg-white/[0.03] px-3 py-2">
          <History className="h-3 w-3 text-emerald-300/60" strokeWidth={2.4} aria-hidden />
          <span className="text-[10px] font-semibold text-emerald-100/50">Audit trail sealed</span>
          <span className="h-0.5 w-0.5 rounded-full bg-emerald-100/20" aria-hidden />
          <span className="text-[10px] font-semibold tabular-nums text-emerald-100/50">{holdsCount} holds override</span>
        </div>
      </div>
    </div>
  )
}
