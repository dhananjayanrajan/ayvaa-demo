import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Loader2, Send, Star } from 'lucide-react'
import { SheetShell } from '@/components/base/phone/sheet-shell'

interface OfferRow {
  label: string
  value: string
}

interface OfferSheetProps {
  firstName: string
  rows: OfferRow[]
  onSent: () => void
  onClose: () => void
}

type Phase = 'idle' | 'working' | 'done'

export function OfferSheet({ firstName, rows, onSent, onClose }: OfferSheetProps) {
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const send = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 950))
    timers.current.push(setTimeout(() => onSent(), 1650))
  }

  const header =
    phase === 'working'
      ? { icon: Send, title: 'Sending offer', subtitle: 'Logging the dispatch against your booking request' }
      : phase === 'done'
        ? { icon: Check, title: 'Offer sent', subtitle: 'Track her response live from the match list' }
        : {
            icon: Star,
            title: 'Send the offer',
            subtitle: `Notifies ${firstName} instantly. She usually responds within minutes.`,
          }

  return (
    <SheetShell
      icon={header.icon}
      tone={phase === 'done' ? 'success' : 'info'}
      title={header.title}
      subtitle={header.subtitle}
      onClose={onClose}
      footer={
        <div className="flex flex-col gap-2.5">
          <motion.button
            type="button"
            whileTap={phase === 'idle' ? { scale: 0.985 } : undefined}
            onClick={send}
            disabled={phase !== 'idle'}
            aria-disabled={phase !== 'idle'}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-colors ${
              phase === 'done'
                ? 'bg-emerald-600'
                : phase === 'working'
                  ? 'cursor-wait bg-sky-600/60'
                  : 'bg-sky-600'
            }`}
          >
            {phase === 'idle' && (
              <>
                <Send className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                Send the offer
              </>
            )}
            {phase === 'working' && (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Sending…
              </>
            )}
            {phase === 'done' && (
              <>
                <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden />
                Offer with {firstName}
              </>
            )}
          </motion.button>
          <motion.button
            type="button"
            whileTap={phase === 'idle' ? { scale: 0.985 } : undefined}
            onClick={onClose}
            disabled={phase !== 'idle'}
            aria-disabled={phase !== 'idle'}
            className={`w-full rounded-2xl py-3 text-sm font-bold transition-colors ${
              phase === 'idle'
                ? 'bg-[#0B211B]/[0.05] text-[#0B211B]/70'
                : 'cursor-not-allowed bg-[#0B211B]/[0.03] text-[#0B211B]/30'
            }`}
          >
            Not yet
          </motion.button>
        </div>
      }
    >
      <div className="overflow-hidden rounded-2xl bg-[#0B211B]/[0.03]">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex items-baseline justify-between gap-3 px-3.5 py-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
                {row.label}
              </span>
              <span className="truncate text-[12.5px] font-bold text-[#0B211B]/80">{row.value}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 pb-2 text-[11px] font-medium leading-relaxed text-[#0B211B]/50">
        Acceptance is system-gated: her current availability is re-checked the moment she responds, before anything is
        confirmed.
      </p>
    </SheetShell>
  )
}
