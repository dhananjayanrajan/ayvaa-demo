import { motion } from 'motion/react'
import { Card } from '@/components/phone/kit'
import { CARE_HISTORY, sessionsShare, totalSessions } from '@/data/patientCaregiverProfile'

export function CareHistoryCard() {
  const total = totalSessions()

  return (
    <Card>
      <div className="flex flex-col gap-5 p-5">
        {CARE_HISTORY.map((entry) => {
          const Icon = entry.icon
          const share = sessionsShare(entry.sessions, total)
          return (
            <div key={entry.id}>
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.05] text-[#0B211B]/55">
                  <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-extrabold tracking-tight text-[#0B211B]">
                    {entry.category}
                  </span>
                  <span className="block truncate text-[10.5px] font-semibold text-[#0B211B]/45">{entry.cadence}</span>
                </span>
                <span className="shrink-0 text-[13px] font-extrabold tabular-nums tracking-tight text-[#0B211B]">
                  {entry.sessions}
                </span>
              </div>
              <div aria-hidden className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#0B211B]/[0.06]">
                <motion.div
                  className="h-full origin-left rounded-full bg-emerald-500/50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: share }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
