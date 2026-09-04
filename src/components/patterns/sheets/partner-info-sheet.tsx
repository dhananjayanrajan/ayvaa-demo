import { X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SheetShell } from '@/components/base/phone/sheet-shell'

export interface PartnerInfoSheetData {
  type: 'step' | 'category' | 'rx' | 'file' | 'patient'
  title: string
  body: string
  icon: LucideIcon
  actionLabel?: string
  onAction?: () => void
}

interface PartnerInfoSheetProps {
  data: PartnerInfoSheetData | null
  onClose: () => void
}

export function PartnerInfoSheet({ data, onClose }: PartnerInfoSheetProps) {
  return (
    <SheetShell open={!!data} onClose={onClose} height="auto">
      {data && (
        <>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <data.icon className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">{data.title}</div>
              <p className="mt-1 text-xs font-medium leading-relaxed text-[#0B211B]/60">{data.body}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
              aria-label="Close information"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          {data.actionLabel && data.onAction && (
            <button
              type="button"
              onClick={data.onAction}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 text-sm font-bold text-white"
            >
              {data.actionLabel}
            </button>
          )}
        </>
      )}
    </SheetShell>
  )
}
