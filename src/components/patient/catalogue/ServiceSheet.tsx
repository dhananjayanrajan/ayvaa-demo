import { motion } from 'motion/react'
import { Check, ChevronRight, Loader2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SheetShell } from '@/components/patient/onboarding/SheetShell'
import { factNearby, nearbyByService, sheetFacts } from '@/data/patientCatalogue'
import type { Service } from '@/data/services'
import { cn } from '@/lib/utils'

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
  const working = bookingState === 'working'
  const done = bookingState === 'done'
  const facts = [factNearby(nearbyByService), ...sheetFacts]
  return (
    <SheetShell
      icon={Icon}
      tileTone="success"
      title={service.name}
      subtitle={service.category}
      onClose={onClose}
      footer={
        <div className="flex flex-col gap-2.5">
          <motion.button
            type="button"
            whileTap={bookingState === 'idle' ? { scale: 0.97 } : undefined}
            onClick={bookingState === 'idle' ? onStart : undefined}
            disabled={bookingState !== 'idle'}
            aria-disabled={bookingState !== 'idle'}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-extrabold tracking-tight text-white transition-colors duration-300',
              done
                ? 'bg-emerald-500 shadow-[0_18px_36px_-18px_rgba(16,185,129,0.8)]'
                : working
                  ? 'cursor-wait bg-emerald-600/60 text-white/80'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
            )}
          >
            {working && <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />}
            {done ? (
              <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
            ) : (
              !working && <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
            )}
            {bookingState === 'idle'
              ? 'Start booking'
              : working
                ? 'Opening your request'
                : 'Booking started'}
          </motion.button>
          <p className="text-center text-[10px] font-bold text-[#0B211B]/45">
            The estimate you confirm in booking never changes
          </p>
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
