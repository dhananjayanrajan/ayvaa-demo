import { AnimatePresence, motion } from 'motion/react'
import { BadgeCheck, ChevronDown } from 'lucide-react'
import { Chip, Tile, TimeChip } from '@/components/phone/kit'
import type { VisitStep } from '@/data/patientLiveVisit'
import { cn } from '@/lib/utils'

interface StepRowProps {
  step: VisitStep
  open?: boolean
  onToggle?: () => void
}

export function StepRow({ step, open = false, onToggle }: StepRowProps) {
  const Icon = step.icon

  if (step.state === 'todo') {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.07] text-[#0B211B]/50">
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-bold tracking-tight text-[#0B211B]/70">{step.title}</span>
          <span className="mt-0.5 block text-[11px] font-medium leading-snug text-[#0B211B]/45">{step.summary}</span>
        </span>
        <Chip intent="neutral" className="shrink-0">
          Upcoming
        </Chip>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-[#0B211B]/[0.03]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-[#0B211B]/[0.02]"
      >
        <Tile icon={Icon} tone="success" />
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-bold tracking-tight text-[#0B211B]">{step.title}</span>
          <span className="mt-0.5 block text-[11px] font-medium leading-snug text-[#0B211B]/50">{step.summary}</span>
        </span>
        <span className="flex shrink-0 flex-col items-end gap-1.5">
          <Chip intent="success" icon={BadgeCheck}>
            Sealed
          </Chip>
          <TimeChip>{step.time}</TimeChip>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
          <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/30" aria-hidden />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-3.5 pb-3.5">
              <div className="rounded-2xl bg-white/[0.6] px-4 py-3.5">
                <div className="flex flex-col gap-2.5">
                  {step.readings?.map((reading) => (
                    <div key={reading.label} className="flex items-baseline justify-between gap-4">
                      <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/45">
                        {reading.label}
                      </span>
                      <span className="text-right text-[12.5px] font-bold tabular-nums text-[#0B211B]/80">
                        {reading.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-emerald-500/[0.1] px-3 py-2.5">
                <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-700" strokeWidth={2.4} aria-hidden />
                <span className="min-w-0 text-[10.5px] font-bold text-emerald-800">
                  Sealed {step.time}, written to the immutable visit record
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
