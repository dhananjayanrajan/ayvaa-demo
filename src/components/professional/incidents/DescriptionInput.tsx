import { Pencil, ShieldCheck } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import type { SeverityConfig } from './incidentData'
import { cn } from '@/lib/utils'

type Props = {
  draft: string
  config: SeverityConfig
  onChange: (value: string) => void
}

export function DescriptionInput({ draft, config, onChange }: Props) {
  const filled = draft.trim().length > 0
  return (
    <div
      className={cn(
        'rounded-2xl p-4 transition-colors',
        filled ? config.attach.activeBg : 'bg-[#0B211B]/[0.035]',
      )}
    >
      <div
        className={cn(
          'flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em]',
          filled ? config.attach.overline : 'text-[#0B211B]/40',
        )}
      >
        <Pencil className="h-3 w-3" aria-hidden />
        Description
      </div>

      <Textarea
        value={draft}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe what happened…"
        className="mt-2.5 min-h-24 w-full resize-none rounded-2xl border-0 bg-white p-3.5 text-[13px] font-medium leading-relaxed text-[#0B211B] shadow-inner placeholder:text-[#0B211B]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B211B]/15"
      />

      <div className="mt-2.5 flex items-center justify-between gap-2">
        <span className="flex min-w-0 items-center gap-1.5 truncate text-[10px] font-bold text-[#0B211B]/40">
          <ShieldCheck className="h-3 w-3 shrink-0" aria-hidden />
          Sealed on submit · logged with your name
        </span>
        <span
          className={cn(
            'inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.12em] transition-colors',
            filled ? config.attach.overline : 'bg-[#0B211B]/[0.05] text-[#0B211B]/40',
          )}
        >
          {filled ? 'Attached' : 'Required'}
        </span>
      </div>
    </div>
  )
}
