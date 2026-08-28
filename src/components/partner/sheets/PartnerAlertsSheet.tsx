import { motion } from 'motion/react'
import { Bell, CheckCircle2, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Tile, TimeChip } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'

export interface AlertItem {
  icon: LucideIcon
  tone: TileTone
  title: string
  body: string
  time: string
}

interface PartnerAlertsSheetProps {
  alerts: AlertItem[]
  onClose: () => void
  onMarkAllRead: () => void
}

export function PartnerAlertsSheet({ alerts, onClose, onMarkAllRead }: PartnerAlertsSheetProps) {
  return (
    <motion.div
      key="alerts-sheet"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
      className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
    >
      <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />
      <div className="flex items-start gap-3">
        <Tile icon={Bell} tone="warning" size="lg" />
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Partner alerts</div>
          <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Everything that moved while you were away</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
          aria-label="Close alerts"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      {alerts.length > 0 ? (
        <div className="flex flex-col">
          {alerts.map((a, i) => (
            <div key={a.title}>
              {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
              <div className="flex items-center gap-3 px-1 py-3.5">
                <Tile icon={a.icon} tone={a.tone} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{a.title}</div>
                  <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">{a.body}</div>
                </div>
                <TimeChip>{a.time}</TimeChip>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" strokeWidth={2} />
          <p className="mt-2 text-sm font-bold text-[#0B211B]">You're all caught up</p>
          <p className="mt-0.5 text-xs font-medium text-[#0B211B]/55">No new alerts to show.</p>
        </div>
      )}

      <button
        type="button"
        onClick={onMarkAllRead}
        disabled={alerts.length === 0}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] disabled:opacity-50"
      >
        <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        Mark all as read
      </button>
      <p className="text-center text-[10.5px] font-semibold text-[#0B211B]/45">
        Alerts are quiet between 9 PM and 8 AM unless urgent.
      </p>
    </motion.div>
  )
}
