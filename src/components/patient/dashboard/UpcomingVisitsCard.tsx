import { motion } from 'motion/react'
import { CalendarCheck, ChevronRight } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'
import type { VisitRow } from '@/data/patientDashboard'

export function UpcomingVisitsCard({
  rows,
  onOpen,
}: {
  rows: VisitRow[]
  onOpen: () => void
}) {
  return (
    <Card>
      <div className="flex flex-col gap-2 p-4">
        {rows.map((row) => (
          <motion.button
            key={row.id}
            type="button"
            whileTap={{ scale: 0.99 }}
            onClick={onOpen}
            className="flex w-full items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-3.5 py-3 text-left transition-colors hover:bg-[#0B211B]/[0.05]"
          >
            <Tile icon={CalendarCheck} tone={row.waiting ? 'warning' : 'success'} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">
                {row.title}
              </span>
              <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">
                {row.detail}
              </span>
            </span>
            <Chip intent={row.waiting ? 'warning' : 'success'} dot={row.waiting}>
              {row.waiting ? 'Waiting' : 'Confirmed'}
            </Chip>
            <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
          </motion.button>
        ))}
      </div>
    </Card>
  )
}
