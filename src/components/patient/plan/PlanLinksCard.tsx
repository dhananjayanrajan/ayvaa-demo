import { CalendarCheck, ChevronRight, MapPin, SlidersHorizontal } from 'lucide-react'
import { Card, Tile } from '@/components/phone/kit'
import { useRouter } from '@/lib/router'
import { planLinks } from '@/data/patientCarePlan'

const linkIcons = {
  reports: { icon: CalendarCheck, tone: 'info' as const },
  timeline: { icon: MapPin, tone: 'success' as const },
  manage: { icon: SlidersHorizontal, tone: 'warning' as const },
}

export function PlanLinksCard() {
  const { navigate } = useRouter()

  return (
    <Card>
      <div className="flex flex-col gap-2 p-3">
        {planLinks.map((link) => {
          const { icon: Icon, tone } = linkIcons[link.id as keyof typeof linkIcons]
          return (
            <button
              key={link.id}
              type="button"
              onClick={() => navigate(link.target)}
              className="flex w-full items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-3.5 py-3.5 text-left transition-colors hover:bg-[#0B211B]/[0.05]"
            >
              <Tile icon={Icon} tone={tone} />
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-bold tracking-tight text-[#0B211B]">{link.title}</span>
                <span className="mt-0.5 block text-[11px] font-medium leading-snug text-[#0B211B]/50">{link.sub}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
            </button>
          )
        })}
      </div>
    </Card>
  )
}
