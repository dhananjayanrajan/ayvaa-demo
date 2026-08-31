import { CalendarCheck, ChevronRight, MapPin, SlidersHorizontal } from 'lucide-react'
import { Card } from '@/components/phone/kit'
import { Row } from '@/components/phone/Row'
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
            <Row
              key={link.id}
              icon={Icon}
              tone={tone}
              title={link.title}
              subtitle={link.sub}
              surface="inset"
              padding="comfortable"
              className="py-3.5"
              hoverClassName="hover:bg-[#0B211B]/[0.05]"
              showChevron={false}
              trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />}
              onClick={() => navigate(link.target)}
            />
          )
        })}
      </div>
    </Card>
  )
}
