import { motion } from 'motion/react'
import { Check, CheckCircle2, Gavel, XCircle } from 'lucide-react'
import { Card, Meter } from '@/components/phone/kit'
import { cn } from '@/lib/utils'

interface TermsAcceptanceCardProps {
  terms: string[]
  agreed: string[]
  onToggle: (term: string) => void
  allAgreed: boolean
  progress: number
}

export function TermsAcceptanceCard({ terms, agreed, onToggle, allAgreed, progress }: TermsAcceptanceCardProps) {
  const isZero = progress === 0
  const cardIntent = allAgreed ? 'success' : isZero ? 'danger' : 'warning'
  const meterIntent = allAgreed ? 'success' : isZero ? 'danger' : 'warning'

  return (
    <Card intent={cardIntent}>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Acceptance progress</span>
          <span className={cn('text-[10px] font-extrabold tabular-nums', isZero ? 'text-rose-700' : 'text-emerald-700')}>
            {Math.round(progress * 100)}%
          </span>
        </div>
        <Meter value={progress} intent={meterIntent} delay={0.2} className="mt-2.5" />
      </div>

      <div className="flex flex-col gap-2 px-4 pb-4">
        {terms.map((t) => {
          const on = agreed.includes(t)
          return (
            <motion.button
              key={t}
              type="button"
              whileTap={{ scale: 0.985 }}
              whileHover={{ scale: 1.005 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={() => onToggle(t)}
              className={cn(
                'flex items-start gap-3 rounded-2xl px-3.5 py-3 text-left outline-none transition-colors',
                'focus-visible:ring-2 focus-visible:ring-emerald-500/40',
                on ? 'bg-emerald-500/[0.1]' : 'bg-[#0B211B]/[0.035] hover:bg-[#0B211B]/[0.06]',
              )}
            >
              <span
                className={cn(
                  'grid h-[22px] w-[22px] shrink-0 place-items-center rounded-lg transition-colors',
                  on ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.1] text-transparent',
                )}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3.5} aria-hidden />
              </span>
              <span
                className={cn(
                  'min-w-0 flex-1 text-[12.5px] font-semibold leading-snug',
                  on ? 'text-emerald-800' : 'text-[#0B211B]/70',
                )}
              >
                {t}
              </span>
            </motion.button>
          )
        })}
      </div>

      <div
        className={cn(
          'flex items-start gap-2 px-4 py-3.5',
          allAgreed ? 'bg-emerald-500/[0.08]' : isZero ? 'bg-rose-500/[0.08]' : 'bg-amber-500/[0.1]',
        )}
      >
        {allAgreed ? (
          <>
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.6} aria-hidden />
            <span className="min-w-0 flex-1 text-[11.5px] font-extrabold leading-snug text-emerald-700">
              All terms accepted · ready to start
            </span>
          </>
        ) : isZero ? (
          <>
            <XCircle className="h-4 w-4 shrink-0 text-rose-600" strokeWidth={2.6} aria-hidden />
            <span className="min-w-0 flex-1 text-[11.5px] font-extrabold leading-snug text-rose-700">
              No terms accepted yet — please review below
            </span>
          </>
        ) : (
          <>
            <Gavel className="h-4 w-4 shrink-0 text-amber-600" strokeWidth={2.6} aria-hidden />
            <span className="min-w-0 flex-1 text-[11.5px] font-extrabold leading-snug text-amber-700">
              {terms.length - agreed.length} term{terms.length - agreed.length > 1 ? 's' : ''} still need your agreement
            </span>
          </>
        )}
      </div>
    </Card>
  )
}
