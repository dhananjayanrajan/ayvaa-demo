import { FileText, MapPin } from 'lucide-react'
import { Card } from '@/components/phone/kit'
import { Row } from '@/components/phone/Row'

interface FieldTaskRowProps {
  title: string
  time: string
  detail: string
  onReportClick: () => void
}

export function FieldTaskRow({ title, time, detail, onReportClick }: FieldTaskRowProps) {
  return (
    <Card intent="warning">
      <Row
        icon={MapPin}
        tone="warning"
        title={title}
        titleMeta={<span className="text-[11px] font-bold text-[#0B211B]/50">{time}</span>}
        subtitle={detail}
        subtitleClassName="text-[11px] leading-relaxed text-[#0B211B]/55"
        trailing={
          <button
            type="button"
            onClick={onReportClick}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-[10px] font-bold text-amber-700 transition-colors hover:bg-amber-500/20"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden />
            Report
          </button>
        }
      />
    </Card>
  )
}
