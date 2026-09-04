import { Activity, CalendarDays, Home, MapPin, Syringe } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, Chip } from '@/components/base/phone/kit'
import type { TileTone } from '@/components/base/phone/kit'
import { Row } from '@/components/base/phone/row'
import type { Session } from '@/data/types'

function sessionIcon(title: string): LucideIcon {
  if (title.includes('insulin')) return Syringe
  if (title.includes('wellness')) return Home
  if (title.includes('physio')) return Activity
  return CalendarDays
}

function sessionTone(title: string): TileTone {
  if (title.includes('insulin')) return 'info'
  if (title.includes('wellness')) return 'success'
  if (title.includes('physio')) return 'success'
  return 'neutral'
}

interface SessionListCardProps {
  sessions: Session[]
  onSessionClick: (session: Session) => void
}

export function SessionListCard({ sessions, onSessionClick }: SessionListCardProps) {
  return (
    <Card>
      {sessions.length === 0 ? (
        <div className="px-4 py-6 text-center text-[12px] font-medium text-[#0B211B]/45">
          No sessions for this day.
        </div>
      ) : (
        sessions.map((s) => {
          const Icon = sessionIcon(s.title)
          const tone = sessionTone(s.title)
          return (
            <div key={s.id}>
              <Row
                icon={Icon}
                tone={tone}
                title={s.title}
                titleMeta={
                  <Chip intent="success" className="border-transparent">Confirmed</Chip>
                }
                subtitle={s.detail}
                subtitleClassName="text-[11px] leading-relaxed"
                body={
                  <div className="mt-0.5 flex items-center gap-1.5 text-[10px] font-semibold text-[#0B211B]/45">
                    <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                    <span>{s.location ?? 'Location shared after acceptance'}</span>
                    {s.distance && <span className="shrink-0">· {s.distance}</span>}
                  </div>
                }
                trailing={<span className="text-[11px] font-bold text-[#0B211B]/50">{s.time}</span>}
                showChevron={false}
                surface="none"
                padding="none"
                hoverClassName="hover:bg-[#0B211B]/[0.02]"
                onClick={() => onSessionClick(s)}
              />
            </div>
          )
        })
      )}
    </Card>
  )
}
