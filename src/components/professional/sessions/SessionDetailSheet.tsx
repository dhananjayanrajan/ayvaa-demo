import { motion } from 'motion/react'
import { MapPin, Phone, X } from 'lucide-react'
import { Tile } from '@/components/phone/kit'
import { SheetShell } from '@/components/phone/SheetShell'
import type { Session } from '@/data/types'
import { Activity, CalendarDays, Home, Syringe } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

function sessionIcon(title: string): LucideIcon {
  if (title.includes('insulin')) return Syringe
  if (title.includes('wellness')) return Home
  if (title.includes('physio')) return Activity
  return CalendarDays
}

interface SessionDetailSheetProps {
  session: Session | null
  onClose: () => void
  onCall: (session: Session) => void
  onDirections: (session: Session) => void
}

export function SessionDetailSheet({ session, onClose, onCall, onDirections }: SessionDetailSheetProps) {
  if (!session) return null
  const Icon = sessionIcon(session.title)

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <SheetShell onClose={onClose} height="auto">
        <div>
          <div className="flex items-start gap-3">
            <Tile icon={Icon} tone="success" size="lg" />
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">{session.title}</h3>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#0B211B]/50">{session.time}</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Confirmed</span>
              </div>
              <p className="mt-2 text-[12px] font-medium leading-relaxed text-[#0B211B]/70">{session.detail}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
              aria-label="Close details"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
            <div className="flex items-center gap-2 text-[11px] font-bold text-[#0B211B]/60">
              <MapPin className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
              <span>{session.location ?? 'Location shared after acceptance'}</span>
            </div>
          </div>

          <div className="mt-4 flex gap-2.5">
            <button
              type="button"
              onClick={() => onCall(session)}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-3.5 text-[13px] font-bold text-white transition-colors hover:bg-emerald-600"
            >
              <Phone className="h-4 w-4" aria-hidden />
              Call
            </button>
            <button
              type="button"
              onClick={() => onDirections(session)}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
            >
              <MapPin className="h-4 w-4" aria-hidden />
              Directions
            </button>
          </div>
        </div>
      </SheetShell>
    </motion.div>
  )
}
