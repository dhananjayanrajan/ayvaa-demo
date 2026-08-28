import { BellRing } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PushPreviewProps {
  title: string
  body: string
  time: string
  onDark: boolean
}

export function PushPreview({ title, body, time, onDark }: PushPreviewProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-3',
        onDark
          ? 'bg-white/[0.07] backdrop-blur-sm'
          : 'bg-[#0B231C] shadow-[0_18px_40px_-20px_rgba(6,40,30,0.6)]',
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-emerald-500 to-teal-500 shadow-[0_6px_14px_-6px_rgba(16,185,129,0.6)]">
          <BellRing className="h-4 w-4 text-white" strokeWidth={2.2} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="truncate text-[11px] font-bold text-white">Ayvaa Care</span>
            <span className="ml-auto shrink-0 text-[9px] font-bold uppercase tracking-wide text-emerald-100/40">{time}</span>
          </div>
          <div className="truncate text-[11px] font-semibold text-emerald-100/85">{title}</div>
        </div>
      </div>
      <p className="mt-2 line-clamp-2 text-[11px] font-medium leading-relaxed text-emerald-100/60">{body}</p>
    </div>
  )
}
