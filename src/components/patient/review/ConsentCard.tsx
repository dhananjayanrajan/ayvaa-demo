import { motion } from 'motion/react'
import { Check, ChevronRight, ShieldCheck } from 'lucide-react'
import { AccentHero } from '@/components/phone/AccentHero'
import { Row } from '@/components/phone/Row'
import { OfferMeter } from '@/components/patient/matching/OfferMeter'
import { CONSENT_ITEMS, REVIEW_GUARDIAN, consentProgress, type ConsentId } from '@/data/patientReview'
import { cn } from '@/lib/utils'

interface ConsentCardProps {
  approvals: Record<ConsentId, boolean>
  onToggle: (id: ConsentId) => void
  onOpenScope: () => void
}

export function ConsentCard({ approvals, onToggle, onOpenScope }: ConsentCardProps) {
  const { done, total, ready } = consentProgress(approvals)

  return (
    <AccentHero tone={ready ? 'emerald' : 'amber'}>
      <div className="flex items-center gap-1.5">
        <ShieldCheck className="h-3 w-3" aria-hidden />
        <span
          className={cn(
            'text-[9px] font-extrabold uppercase tracking-[0.22em]',
            ready ? 'text-emerald-200/50' : 'text-amber-200/50',
          )}
        >
          Consent agreement
        </span>
      </div>

      <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        {ready ? (
          <>
            Both approvals signed,{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">ready to seal</span>
          </>
        ) : (
          <>
            Two approvals{' '}
            <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">required to book</span>
          </>
        )}
      </h3>
      <p
        className={cn(
          'mt-1.5 text-pretty text-[12px] font-medium leading-relaxed',
          ready ? 'text-emerald-100/60' : 'text-amber-100/60',
        )}
      >
        Signed electronically as {REVIEW_GUARDIAN.name}, sealed permanently in your records.
      </p>

      <div className="mt-4 flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em]">
        <span className={ready ? 'text-emerald-100/50' : 'text-amber-100/50'}>Approval progress</span>
        <span className={cn('tabular-nums', ready ? 'text-emerald-200' : 'text-amber-200')}>
          {ready ? 'Complete' : `${done} of ${total}`}
        </span>
      </div>
      <OfferMeter value={total > 0 ? done / total : 0} fillClass={ready ? 'bg-emerald-300' : 'bg-amber-300'} className="mt-2" />

      <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
        {CONSENT_ITEMS.map((item) => {
          const on = approvals[item.id]
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggle(item.id)}
              aria-pressed={on}
              className="flex w-full items-center gap-3 py-3 text-left first:pt-0 last:pb-0"
            >
              <motion.span
                animate={{
                  backgroundColor: on ? 'rgb(16,185,129)' : 'rgba(255,255,255,0.12)',
                  scale: on ? 1 : 0.92,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-lg"
              >
                {on && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3.5} aria-hidden />}
              </motion.span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-bold leading-snug tracking-tight text-white">{item.label}</span>
                <span className="block text-[10.5px] font-semibold leading-snug text-white/45">{item.sub}</span>
              </span>
            </button>
          )
        })}
      </div>

      <Row
        className="mt-3 rounded-2xl bg-white/[0.06] px-3.5 py-3"
        dark="white"
        padding="none"
        leading={
          <span
            className={cn(
              'grid h-9 w-9 shrink-0 place-items-center rounded-xl',
              ready ? 'bg-emerald-400/[0.14] text-emerald-200' : 'bg-amber-400/[0.14] text-amber-200',
            )}
          >
            <ShieldCheck className="h-4 w-4" strokeWidth={2.2} aria-hidden />
          </span>
        }
        title="What each consent grants"
        titleClassName="text-[12.5px]"
        subtitle="Withdraw anytime, pauses next visit"
        subtitleClassName="text-[10.5px] font-semibold text-white/45"
        onClick={onOpenScope}
        ariaExpanded={false}
        hoverClassName="hover:bg-white/[0.1]"
        whileTapDisabled
        showChevron={false}
        trailing={<ChevronRight className="h-4 w-4 shrink-0 text-white/25" aria-hidden />}
      />
    </AccentHero>
  )
}
