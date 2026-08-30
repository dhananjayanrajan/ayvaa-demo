import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { AlertTriangle, BellRing, Check, Loader2, ScrollText } from 'lucide-react'
import { Card, Chip } from '@/components/phone/kit'
import { formatWindow, type MedDose } from '@/data/patientMeds'
import { cn } from '@/lib/utils'

type NudgePhase = 'idle' | 'working' | 'done'

interface DueDoseCardProps {
  med: MedDose
  stepIndex: number
  stepsTotal: number
  nurseFirst: string
  nudgePhase: NudgePhase
  onNudge: () => void
  onDetail: () => void
}

export function DueDoseCard({ med, stepIndex, stepsTotal, nurseFirst, nudgePhase, onNudge, onDetail }: DueDoseCardProps) {
  const [left, setLeft] = useState(18 * 60 + 24)

  useEffect(() => {
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [])

  const Icon = med.icon

  return (
    <Card>
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Afternoon dose</span>
          <Chip intent="live" dot>
            Dose {stepIndex} of {stepsTotal}
          </Chip>
        </div>
        <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
          {nurseFirst} administers and verifies it during the live visit.
        </p>

        <div className="mt-4 overflow-hidden rounded-2xl bg-[#241A0B]">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-400/[0.2] text-amber-100">
                <span aria-hidden className="absolute inset-0 animate-ping rounded-xl bg-amber-400/20" />
                <Icon className="relative h-4 w-4" strokeWidth={2.4} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[14px] font-extrabold tracking-tight text-white">
                  {med.name} {med.dose}
                </div>
                <div className="mt-0.5 text-[11px] font-medium leading-snug text-amber-100/60">{med.purpose}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 bg-white/[0.04] px-4 py-2.5">
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-amber-100/45">
              Window closes in
            </span>
            <span
              className={cn(
                'text-[15px] font-extrabold leading-none tabular-nums',
                left > 0 ? 'text-amber-200' : 'text-rose-300',
              )}
            >
              {left > 0 ? formatWindow(left) : 'Closing now'}
            </span>
          </div>
        </div>

        {med.interaction && (
          <div className="mt-3 rounded-2xl bg-rose-500/[0.08] px-4 py-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-600" strokeWidth={2.4} aria-hidden />
              <span className="text-[12px] font-extrabold tracking-tight text-rose-700">{med.interaction.title}</span>
            </div>
            <p className="mt-1 text-[11px] font-medium leading-snug text-[#0B211B]/60">{med.interaction.body}</p>
          </div>
        )}

        <div className="mt-4 flex gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={onDetail}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75 transition-colors hover:bg-[#0B211B]/[0.08]"
          >
            <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Detail</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={nudgePhase === 'idle' ? { scale: 0.97 } : undefined}
            onClick={onNudge}
            disabled={nudgePhase !== 'idle'}
            aria-disabled={nudgePhase !== 'idle'}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-[13px] font-bold text-white transition-colors',
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
        </div>
      </div>
    </Card>
  )
}
