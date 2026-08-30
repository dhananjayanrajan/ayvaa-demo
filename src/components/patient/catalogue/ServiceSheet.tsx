import { ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'
import { LifecycleButton, CtaNote } from '@/components/phone/LifecycleButton'
import { factNearby, nearbyByService, sheetFacts } from '@/data/patientCatalogue'
import type { Service } from '@/data/services'

export type BookingState = 'idle' | 'working' | 'done'

export function ServiceSheet({
  service,
  icon: Icon,
  bookingState,
  onStart,
  onClose,
}: {
  service: Service
  icon: LucideIcon
  bookingState: BookingState
  onStart: () => void
  onClose: () => void
}) {
  const facts = [factNearby(nearbyByService), ...sheetFacts]
  return (
    <SheetShell
      icon={Icon}
      tone="success"
      title={service.name}
      subtitle={service.category}
      onClose={onClose}
      footer={
        <div className="flex flex-col gap-2.5">
          <LifecycleButton
            phase={bookingState}
            idleIcon={ChevronRight}
            idleLabel="Start booking"
            workingLabel="Opening your request"
            doneLabel="Booking started"
            onPress={onStart}
          />
          <CtaNote>The estimate you confirm in booking never changes</CtaNote>
        </div>
      }
    >
      <p className="text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/65">
        {service.detail}
      </p>

      <div className="mt-3.5 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <div className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">
          Starting price
        </div>
        <div className="mt-1 text-[20px] font-extrabold tabular-nums leading-none tracking-tight text-[#0B211B]">
          {service.from}
          <span className="ml-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#0B211B]/40">
            per visit
          </span>
        </div>
        <div className="mt-3.5 flex flex-col gap-2.5">
          {facts.map((fact) => (
            <div key={fact.label} className="flex items-baseline justify-between gap-3">
              <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-[#0B211B]/40">
                {fact.label}
              </span>
              <span className="min-w-0 truncate text-right text-[12px] font-bold text-[#0B211B]/80">
                {fact.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SheetShell>
  )
}
