import { motion } from 'motion/react'
import { CalendarDays, ChevronRight } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'
import { useRouter } from '@/lib/router'
import { applyVisitFilters, upcomingSubtitle, upcomingVisits, type VisitFilters } from '@/data/patientVisits'
import { EmptyTabState } from './EmptyTabState'

export function UpcomingCard({ filters, onClearFilters }: { filters: VisitFilters; onClearFilters: () => void }) {
  const { navigate } = useRouter()
  const list = applyVisitFilters(upcomingVisits(), filters)

  if (list.length === 0) {
    return <EmptyTabState cause="filters" label="upcoming visits" onClearFilters={onClearFilters} />
  }

  return (
    <Card>
      <div className="flex flex-col gap-2 p-3">
        {list.map((v) => {
          const pending = v.status === 'pending'
          return (
            <motion.button
              key={v.id}
              type="button"
              whileTap={{ scale: 0.985 }}
              onClick={() => navigate(v.status === 'live' ? '/patient/p16' : '/patient/p17')}
              className="flex w-full items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] p-3.5 text-left transition-colors hover:bg-[#0B211B]/[0.05]"
            >
              <Tile icon={CalendarDays} tone={pending ? 'warning' : 'success'} />
              <span className="min-w-0 flex-1">
                <span className="block text-[13.5px] font-bold tracking-tight text-[#0B211B]">
                  {v.day}, {v.date}
                </span>
                <span className="mt-0.5 block text-[11px] font-semibold leading-snug text-[#0B211B]/45">
                  {upcomingSubtitle(v)}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1.5">
                <Chip intent={pending ? 'warning' : 'success'} dot={pending}>
                  {pending ? 'Pending' : 'Confirmed'}
                </Chip>
                <ChevronRight className="h-3.5 w-3.5 text-[#0B211B]/20" aria-hidden />
              </span>
            </motion.button>
          )
        })}
      </div>
    </Card>
  )
}
