import { motion } from 'motion/react'
import { Activity, CalendarDays, Home, MapPin, Syringe } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
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
        sessions.map((s, i) => {
          const Icon = sessionIcon(s.title)
          const tone = sessionTone(s.title)
          return (
            <div key={s.id}>
              {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
              <motion.button
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => onSessionClick(s)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left outline-none transition-colors hover:bg-[#0B211B]/[0.02] focus-visible:ring-2 focus-visible:ring-emerald-500/40"
              >
                <Tile icon={Icon} tone={tone} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[13.5px] font-bold tracking-tight text-[#0B211B]">{s.title}</span>
                    <Chip intent="success" className="border-transparent">Confirmed</Chip>
                  </div>
                  <div className="mt-1 text-[11px] font-medium leading-relaxed text-[#0B211B]/55">{s.detail}</div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[10px] font-semibold text-[#0B211B]/45">
                    <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                    <span>{s.location ?? 'Location shared after acceptance'}</span>
                    {s.distance && <span className="shrink-0">· {s.distance}</span>}
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span className="text-[11px] font-bold text-[#0B211B]/50">{s.time}</span>
                </div>
              </motion.button>
            </div>
          )
        })
      )}
    </Card>
  )
}
