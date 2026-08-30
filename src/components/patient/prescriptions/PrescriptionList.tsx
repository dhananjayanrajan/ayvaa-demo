import { motion } from 'motion/react'
import { Bell, ChevronRight } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'
import { takenIntent, type Prescription } from '@/data/patientPrescriptions'
import { cn } from '@/lib/utils'

export function PrescriptionList({
  prescriptions,
  reminded,
  onSelect,
}: {
  prescriptions: Prescription[]
  reminded: string[]
  onSelect: (rx: Prescription) => void
}) {
  return (
    <Card>
      <div className="flex flex-col gap-1 p-2">
        {prescriptions.map((rx) => {
          const hasReminder = reminded.includes(rx.id)
          return (
            <motion.button
              key={rx.id}
              type="button"
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelect(rx)}
              className={cn(
                'flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors',
                hasReminder ? 'bg-emerald-500/[0.09]' : 'hover:bg-[#0B211B]/[0.03]',
              )}
            >
              <Tile icon={rx.icon} tone={hasReminder ? 'success' : takenIntent(rx.takenToday)} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">
                  {rx.name} {rx.dose}
                </span>
                <span className="mt-0.5 block text-[11px] font-medium leading-snug text-[#0B211B]/50">{rx.schedule}</span>
                <span className="block text-[11px] font-medium leading-snug text-[#0B211B]/50">{rx.stock}</span>
              </span>
              <span className="flex shrink-0 flex-col items-end gap-1">
                {hasReminder ? (
                  <Chip intent="success" icon={Bell}>
                    Reminder set
                  </Chip>
                ) : (
                  <Chip intent={takenIntent(rx.takenToday)}>{rx.takenToday ? 'Taken' : 'Due'}</Chip>
                )}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/20" aria-hidden />
            </motion.button>
          )
        })}
      </div>
    </Card>
  )
}
