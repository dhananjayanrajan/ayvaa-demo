import { motion } from 'motion/react'
import { AlertTriangle, BellRing, Check, Loader2, Pill, ShieldCheck } from 'lucide-react'
import { SheetShell } from '@/components/patient/matching/SheetShell'
import { buildDoseFacts, type MedDose } from '@/data/patientMeds'
import { cn } from '@/lib/utils'

type NudgePhase = 'idle' | 'working' | 'done'

interface DoseDetailSheetProps {
  med: MedDose
  nurseFirst: string
  nudgePhase: NudgePhase
  onNudge: () => void
  onClose: () => void
}

export function DoseDetailSheet({ med, nurseFirst, nudgePhase, onNudge, onClose }: DoseDetailSheetProps) {
  return (
    <SheetShell
      icon={Pill}
      tone="info"
      title={med.name}
      subtitle={`${med.dose}, due ${med.dueAt ?? med.window}`}
      onClose={onClose}
      footer={
        <div>
          <motion.button
            type="button"
            whileTap={nudgePhase === 'idle' ? { scale: 0.97 } : undefined}
            onClick={onNudge}
            disabled={nudgePhase !== 'idle'}
            aria-disabled={nudgePhase !== 'idle'}
            className={cn(
              'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-[13px] font-bold text-white transition-colors',
              nudgePhase === 'done'
                ? 'bg-emerald-600'
                : nudgePhase === 'working'
                  ? 'cursor-wait bg-amber-500/60'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_18px_36px_-18px_rgba(245,158,11,0.75)]',
            )}
          >
            {nudgePhase === 'working' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                <span className="truncate">Notifying…</span>
              </>
            ) : nudgePhase === 'done' ? (
              <>
                <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                <span className="truncate">Nurse notified</span>
              </>
            ) : (
              <>
                <BellRing className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Nudge {nurseFirst}</span>
              </>
            )}
          </motion.button>
          <p className="mt-2 text-center text-[10px] font-bold text-[#0B211B]/45">
            Given only after verification against the prescription
          </p>
        </div>
      }
    >
      <div className="rounded-2xl bg-[#241A0B] p-4">
        <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-amber-200/50">Dose record</div>
        <div className="mt-3 flex flex-col gap-2.5">
          {buildDoseFacts(med).map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-amber-100/45">
                {row.label}
              </span>
              <span className="text-right text-[12px] font-bold text-amber-50/90">{row.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-3.5 rounded-xl bg-white/[0.05] px-3.5 py-3">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-amber-100/45">Instruction</div>
          <p className="mt-1 text-[11.5px] font-medium leading-snug text-amber-50/80">{med.instruction}</p>
        </div>
      </div>

      {med.interaction && (
        <div className="mt-3 rounded-2xl bg-rose-500/[0.08] px-4 py-3.5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-600" strokeWidth={2.4} aria-hidden />
            <span className="text-[12px] font-extrabold tracking-tight text-rose-700">{med.interaction.title}</span>
          </div>
          <p className="mt-1 text-[11px] font-medium leading-snug text-[#0B211B]/60">{med.interaction.body}</p>
        </div>
      )}

      <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#0B211B]/[0.03] px-3 py-2.5">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/40" strokeWidth={2.4} aria-hidden />
        <span className="min-w-0 text-[10.5px] font-bold text-[#0B211B]/55">
          {nurseFirst} verifies the dose against {med.rxId} before giving it
        </span>
      </div>
    </SheetShell>
  )
}
