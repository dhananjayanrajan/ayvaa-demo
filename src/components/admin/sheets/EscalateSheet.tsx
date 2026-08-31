import { ChevronRight, HeartHandshake, ShieldAlert, Siren } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Row } from '@/components/phone/Row'

type EscalateAction = {
  icon: LucideIcon
  tone: 'info' | 'neutral' | 'warning'
  label: string
  sub: string
  body: string
  kind: 'info' | 'warn'
}

const escalateActions: EscalateAction[] = [
  { icon: Siren, tone: 'info', label: 'Page supervisor on call', sub: 'On-call supervisor, immediately', body: 'On-call supervisor notified immediately', kind: 'info' },
  { icon: HeartHandshake, tone: 'neutral', label: 'Notify family', sub: 'Guardian updated with context', body: 'Guardian updated on the incident', kind: 'info' },
  { icon: ShieldAlert, tone: 'warning', label: 'Escalate to senior ops', sub: 'Senior operations takes ownership', body: 'Senior operations team now owns this incident', kind: 'warn' },
]

interface EscalateSheetProps {
  onClose: () => void
  notify: (payload: { title: string; body: string; kind: 'info' | 'warn' }) => void
}

export function EscalateSheet({ onClose, notify }: EscalateSheetProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        {escalateActions.map((a) => (
          <Row
            key={a.label}
            icon={a.icon}
            tone={a.tone}
            tileSize="sm"
            title={a.label}
            subtitle={a.sub}
            surface="inset"
            padding="even"
            hoverClassName="hover:bg-[#0B211B]/[0.06]"
            showChevron={false}
            trailing={
              <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25 transition-transform group-hover:translate-x-0.5" aria-hidden />
            }
            onClick={() => {
              onClose()
              notify({ title: a.label, body: a.body, kind: a.kind })
            }}
          />
        ))}
      </div>
      <p className="text-center text-[11px] font-medium leading-relaxed text-[#0B211B]/45">
        Every escalation is timestamped in the audit record.
      </p>
    </>
  )
}
