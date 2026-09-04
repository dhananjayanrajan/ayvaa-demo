import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import { SheetShell } from '@/components/base/phone/sheet-shell'
import { DarkPanel } from '@/components/base/phone/dark-panel'
import { CallButton } from '../actions/call-button'
import { liveSteps } from '@/data/patientDashboard'
import { useRouter } from '@/lib/router'

export function LiveVisitSheet({
  lovedFirstName,
  caregiverFullName,
  onClose,
}: {
  lovedFirstName: string
  caregiverFullName: string
  onClose: () => void
}) {
  const { navigate } = useRouter()
  return (
    <SheetShell
      icon={MapPin}
      tone="success"
      title={`Live with ${lovedFirstName}`}
      subtitle={`${caregiverFullName}, arrived 2:04 PM and leaves around 4:00 PM`}
      onClose={onClose}
      footer={
        <div className="flex gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/patient/p16')}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <MapPin className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Live map</span>
          </motion.button>
          <CallButton
            name={caregiverFullName.split(' ')[0]}
            light
            label="Call nurse"
          />
        </div>
      }
    >
      <DarkPanel kicker="Care steps">
        <div className="flex flex-col gap-3">
          {liveSteps.map((step) => (
            <div key={step.key} className="flex items-center justify-between gap-3">
              <span className="min-w-0 text-[12.5px] font-bold tracking-tight text-emerald-50/90">
                {step.label}
              </span>
              <span
                className={
                  step.state === 'done'
                    ? 'shrink-0 text-[11.5px] font-bold text-emerald-300'
                    : step.state === 'active'
                      ? 'shrink-0 rounded-full bg-emerald-400/[0.16] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-emerald-200'
                      : 'shrink-0 text-[11.5px] font-bold text-emerald-100/40'
                }
              >
                {step.state === 'done'
                  ? 'Done'
                  : step.state === 'active'
                    ? 'In progress'
                    : 'Pending'}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-pretty text-[11px] font-medium leading-relaxed text-emerald-100/60">
          Each step is written to the visit record as the nurse completes it, with vitals and
          medication entries sealed on sign-off.
        </p>
      </DarkPanel>
    </SheetShell>
  )
}
