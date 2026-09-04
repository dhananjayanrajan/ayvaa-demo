import { AlertTriangle, BellRing, Pill, ShieldCheck } from 'lucide-react'
import { SheetShell } from '@/components/base/phone/sheet-shell'
import { LifecycleButton } from '@/components/base/phone/lifecycle-button'
import { DarkPanel } from '@/components/base/phone/dark-panel'
import { buildDoseFacts, type MedDose } from '@/data/patientMeds'

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
          <LifecycleButton
            phase={nudgePhase}
            tone="warning"
            idleIcon={BellRing}
            idleLabel={`Nudge ${nurseFirst}`}
            workingLabel="Notifying…"
            doneLabel="Nurse notified"
            onPress={onNudge}
          />
          <p className="mt-2 text-center text-[10px] font-bold text-[#0B211B]/45">
            Given only after verification against the prescription
          </p>
        </div>
      }
    >
      <DarkPanel tone="amber" kicker="Dose record">
        <div className="flex flex-col gap-2.5">
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
      </DarkPanel>

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
