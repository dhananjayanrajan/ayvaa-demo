import { ChevronRight } from 'lucide-react'
import { AccentHero } from '@/components/admin/ui/AccentHero'
import { OfferMeter } from './OfferMeter'
import { StatusPill } from './StatusPill'
import { offerSummary, type OfferState } from '@/data/patientMatching'

interface MatchHeroProps {
  inRange: number
  total: number
  nearestLabel: string
  language: string
  offers: Record<string, OfferState>
  radiusLabel: string
  cadenceLabel: string
  visitsLabel: string
  priceLabel: string
  onOpenLanguage: () => void
}

function StatCell({ label, value, labelClass }: { label: string; value: string; labelClass: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
      <div className={`text-[9px] font-bold uppercase tracking-[0.14em] ${labelClass}`}>{label}</div>
      <div className="mt-1 truncate text-[12.5px] font-extrabold leading-none tabular-nums text-white">{value}</div>
    </div>
  )
}

export function MatchHero({
  inRange,
  total,
  nearestLabel,
  language,
  offers,
  radiusLabel,
  cadenceLabel,
  visitsLabel,
  priceLabel,
  onOpenLanguage,
}: MatchHeroProps) {
  const { sent, matched, ratio } = offerSummary(offers, total)
  const t = matched
    ? {
        overline: 'text-emerald-200/50',
        step: 'text-emerald-100/40',
        grad: 'from-emerald-300 to-teal-200',
        cellLabel: 'text-emerald-100/40',
        tapCell: 'bg-emerald-400/[0.14]',
        chevron: 'text-emerald-200/70',
        meterLabel: 'text-emerald-100/50',
        meterValue: 'text-emerald-200',
        fill: 'bg-emerald-300',
        stripLabel: 'text-emerald-100/40',
      }
    : {
        overline: 'text-sky-200/50',
        step: 'text-sky-100/40',
        grad: 'from-sky-300 to-cyan-200',
        cellLabel: 'text-sky-100/40',
        tapCell: 'bg-sky-400/[0.14]',
        chevron: 'text-sky-200/70',
        meterLabel: 'text-sky-100/50',
        meterValue: 'text-sky-200',
        fill: 'bg-sky-300',
        stripLabel: 'text-sky-100/40',
      }
  const languageLabel = language === 'Any language' ? 'Any' : language

  return (
    <AccentHero tone={matched ? 'emerald' : 'sky'}>
      <div className="flex items-center justify-between gap-3">
        <span className={`text-[9px] font-extrabold uppercase tracking-[0.22em] ${t.overline}`}>Booking request</span>
        <span className={`text-[9px] font-extrabold uppercase tracking-[0.14em] tabular-nums ${t.step}`}>Step 2 of 3</span>
      </div>

      <div className="mt-1.5 flex items-start justify-between gap-3">
        <h2 className="min-w-0 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          {inRange} {inRange === 1 ? 'caregiver' : 'caregivers'}{' '}
          <span className={`bg-gradient-to-r bg-clip-text text-transparent ${t.grad}`}>in range</span>
        </h2>
        {matched ? (
          <StatusPill tone="emerald" label="Matched" />
        ) : (
          <StatusPill tone="sky" label="Matching" live />
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <StatCell label="Radius" value={radiusLabel} labelClass={t.cellLabel} />
        <StatCell label="Nearest" value={nearestLabel} labelClass={t.cellLabel} />
      </div>

      <button
        type="button"
        onClick={onOpenLanguage}
        aria-label={`Language filter, currently ${languageLabel}`}
        className={`mt-2 flex w-full items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 text-left transition-colors duration-500 ${t.tapCell}`}
      >
        <span className="min-w-0">
          <span className={`block text-[9px] font-bold uppercase tracking-[0.14em] ${t.cellLabel}`}>Language</span>
          <span className="mt-1 block truncate text-[12.5px] font-extrabold leading-none text-white">{languageLabel}</span>
        </span>
        <ChevronRight className={`h-4 w-4 shrink-0 ${t.chevron}`} aria-hidden />
      </button>

      <div className="mt-4 flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em]">
        <span className={t.meterLabel}>Offer progress</span>
        <span className={`tabular-nums ${t.meterValue}`}>
          {sent} of {total} out
        </span>
      </div>
      <OfferMeter value={ratio} fillClass={t.fill} className="mt-2" />

      <div className="mt-4 grid grid-cols-2 gap-2">
        <StatCell label="Cadence" value={cadenceLabel} labelClass={t.cellLabel} />
        <StatCell label="Visits" value={visitsLabel} labelClass={t.cellLabel} />
      </div>
      <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-2.5">
        <span className={`shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] ${t.stripLabel}`}>Est. weekly total</span>
        <span className="truncate text-[12.5px] font-extrabold tabular-nums leading-none text-white">{priceLabel}</span>
      </div>
    </AccentHero>
  )
}
