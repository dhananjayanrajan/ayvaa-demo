import { Bell, CheckCircle2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { TileTone } from '@/components/phone/kit'
import { SheetShell } from '@/components/phone/SheetShell'
import { Row } from '@/components/phone/Row'

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
    <SheetShell
      icon={Bell}
      tone="warning"
      title="Partner alerts"
      subtitle="Everything that moved while you were away"
      onClose={onClose}
      height="auto"
    >
      {alerts.length > 0 ? (
        <div className="flex flex-col">
          {alerts.map((a) => (
            <div key={a.title}>
              <Row
                icon={a.icon}
                tone={a.tone}
                title={a.title}
                subtitle={a.body}
                subtitleClassName="truncate text-xs"
                time={a.time}
                surface="none"
                padding="none"
                className="px-1"
              />
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
    </SheetShell>
  )
}
