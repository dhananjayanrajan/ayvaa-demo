import { FileText, MapPin } from 'lucide-react'
import { Card, Tile } from '@/components/phone/kit'

interface FieldTaskRowProps {
  title: string
  time: string
  detail: string
  onReportClick: () => void
}

export function FieldTaskRow({ title, time, detail, onReportClick }: FieldTaskRowProps) {
  return (
    <Card intent="warning">
      <div className="flex items-center gap-3 px-4 py-3.5">
        <Tile icon={MapPin} tone="warning" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[13.5px] font-bold tracking-tight text-[#0B211B]">{title}</span>
            <span className="text-[11px] font-bold text-[#0B211B]/50">{time}</span>
          </div>
          <div className="mt-1 text-[11px] font-medium leading-relaxed text-[#0B211B]/55">{detail}</div>
        </div>
        <button
          type="button"
          onClick={onReportClick}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-[10px] font-bold text-amber-700 transition-colors hover:bg-amber-500/20"
        >
          <FileText className="h-3.5 w-3.5" aria-hidden />
          Report
        </button>
      </div>
    </Card>
  )
}
