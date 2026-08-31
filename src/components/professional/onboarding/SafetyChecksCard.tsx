import { Check, ShieldCheck } from 'lucide-react'
import { Card, Chip } from '@/components/phone/kit'
import { Row } from '@/components/phone/Row'

interface SafetyCheck {
  title: string
  body: string
  when: string
}

interface SafetyChecksCardProps {
  checks: SafetyCheck[]
  onCheckClick: (check: SafetyCheck) => void
}

export function SafetyChecksCard({ checks, onCheckClick }: SafetyChecksCardProps) {
  return (
    <Card>
      {checks.map((c, i) => (
        <div key={c.title}>
          {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
          <Row
            icon={ShieldCheck}
            tone="success"
            align="start"
            title={c.title}
            titleClassName="text-[13.5px] font-bold leading-snug tracking-tight"
            subtitle={c.body}
            subtitleClassName="text-[11px] font-semibold leading-snug text-[#0B211B]/45"
            trailing={
              <span className="flex shrink-0 flex-col items-end gap-1.5">
                <Chip intent="success" icon={Check} className="border-transparent">Done</Chip>
                <span className="font-mono text-[9px] font-bold uppercase tracking-wide text-[#0B211B]/35">{c.when}</span>
              </span>
            }
            showChevron={false}
            surface="none"
            padding="none"
            hoverClassName=""
            onClick={() => onCheckClick(c)}
          />
        </div>
      ))}
    </Card>
  )
}
