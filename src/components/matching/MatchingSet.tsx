import { BadgeCheck, Briefcase, Hourglass, Languages, Loader2, MapPin, SearchX, Send, Star, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { AccentHero } from '@/components/phone/AccentHero'
import { EmptyState } from '@/components/phone/EmptyState'
import { HeroHighlight, HeroTopRow, StatCell, TapCell } from '@/components/phone/HeroCells'
import { LifecycleButton } from '@/components/phone/LifecycleButton'
import { OptionCheck, OptionRow } from '@/components/phone/OptionRow'
import { SheetShell } from '@/components/phone/SheetShell'
import { StatusPill } from '@/components/phone/StatusPill'
import { LANGUAGE_OPTIONS, MATCH_REQUEST, initialsOf, offerSummary, speakersIn, type MatchCaregiver, type OfferState } from '@/data/patientMatching'

interface ActiveFilterStripProps {
  label: string
  onClear: () => void
}

export function ActiveFilterStrip({ label, onClear }: ActiveFilterStripProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-sky-500/[0.1] px-4 py-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-sky-500/[0.14]">
        <Languages className="h-4 w-4 text-sky-600" strokeWidth={2.4} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-sky-700/50">Language filter</span>
        <span className="mt-0.5 block truncate text-[12.5px] font-bold tracking-tight text-sky-800">{label} speakers only</span>
      </span>
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={onClear}
        aria-label="Clear language filter"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky-500/[0.12] text-sky-700"
      >
        <X className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden />
      </motion.button>
    </div>
  )
}

interface EmptyMatchesProps {
  language: string
  onClear: () => void
}

export function EmptyMatches({ language, onClear }: EmptyMatchesProps) {
  return (
    <EmptyState
      container="card"
      spacing="margin"
      padding="md"
      icon={SearchX}
      tone="amber"
      badge="square"
      size="sm"
      title={`No one in range speaks ${language}`}
      titleClassName="text-[14px] font-extrabold tracking-tight text-[#0B211B]"
      body={`Your language filter is hiding every caregiver within ${MATCH_REQUEST.radius}. Widen it to see the full match list.`}
      bodyClassName="text-[12px] leading-snug text-[#0B211B]/55 mx-auto max-w-[28ch] text-pretty"
      action={{ label: 'Show any language', onClick: onClear }}
      actionStyle="full"
    />
  )
}

interface LanguageSheetProps {
  current: string
  list: MatchCaregiver[]
  onApply: (language: string) => void
  onClose: () => void
}

export function LanguageSheet({ current, list, onApply, onClose }: LanguageSheetProps) {
  const [selected, setSelected] = useState(current)
  const [phase, setPhase] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => { timers.current.forEach(clearTimeout) }, [])

  const unchanged = selected === current
  const apply = () => {
    if (unchanged || phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 650))
    timers.current.push(setTimeout(() => onApply(selected), 1350))
  }

  return (
    <SheetShell
      icon={Languages}
      title="Preferred language"
      subtitle="Only caregivers speaking your choice stay in the match list"
      tone={phase === 'done' ? 'success' : 'info'}
      onClose={onClose}
      footer={
        <LifecycleButton
          phase={phase}
          tone="info"
          gated={unchanged}
          idleLabel={unchanged ? 'Current selection' : 'Apply language'}
          workingLabel="Applying…"
          doneLabel="Filter applied"
          onPress={apply}
        />
      }
    >
      <div role="radiogroup" aria-label="Preferred language" className="flex flex-col gap-2 pb-2">
        {LANGUAGE_OPTIONS.map((lang) => {
          const isSel = selected === lang
          const count = speakersIn(list, lang)
          return (
            <OptionRow
              key={lang}
              role="radio"
              selected={isSel}
              onSelect={() => { if (phase === 'idle') setSelected(lang) }}
              disabled={phase !== 'idle'}
              title={lang}
              sub={`${count} in range`}
              tone="sky"
              trailing={<OptionCheck on={isSel} accent="sky" />}
            />
          )
        })}
      </div>
    </SheetShell>
  )
}

interface MatchCardProps {
  caregiver: MatchCaregiver
  state: OfferState
  leading: boolean
  highlightLanguage: string | null
  onSend: (id: string) => void
}

const cardTone = {
  sky: {
    sub: 'text-sky-100/55',
    tile: 'bg-sky-400/15 text-sky-200',
    badge: 'text-sky-600',
    tagHot: 'bg-sky-400/[0.2] text-white',
    button: 'bg-sky-400/[0.18] text-sky-50',
    buttonBusy: 'bg-sky-400/[0.1] text-sky-100/60',
  },
  amber: {
    sub: 'text-amber-100/55',
    tile: 'bg-amber-400/15 text-amber-200',
    badge: 'text-amber-600',
    tagHot: 'bg-amber-400/[0.2] text-white',
    button: '',
    buttonBusy: '',
  },
  emerald: {
    sub: 'text-emerald-100/55',
    tile: 'bg-emerald-400/15 text-emerald-200',
    badge: 'text-emerald-600',
    tagHot: 'bg-emerald-400/[0.2] text-white',
    button: '',
    buttonBusy: '',
  },
}

export function MatchCard({ caregiver, state, leading, highlightLanguage, onSend }: MatchCardProps) {
  const [phase, setPhase] = useState<'idle' | 'sending'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const toneKey = state === 'accepted' ? 'emerald' : state === 'pending' ? 'amber' : 'sky'
  const t = cardTone[toneKey]

  const send = () => {
    if (phase !== 'idle' || state !== 'none') return
    setPhase('sending')
    timer.current = setTimeout(() => onSend(caregiver.id), 900)
  }

  return (
    <AccentHero tone={toneKey}>
      <div className="flex items-start gap-3.5">
        <div className="relative shrink-0">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.1] text-[13px] font-black tracking-tight text-white">
            {initialsOf(caregiver.name)}
          </span>
          {caregiver.licensed && (
            <span className={`absolute -bottom-1 -right-1 grid h-[18px] w-[18px] place-items-center rounded-full bg-white ${t.badge}`}>
              <BadgeCheck className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[14px] font-extrabold tracking-tight text-white">{caregiver.name}</div>
          <div className={`truncate text-[11px] font-semibold ${t.sub}`}>{caregiver.role}</div>
        </div>
        {leading && (
          <span className="shrink-0 rounded-full bg-white/[0.12] px-3 py-1.5 text-[10px] font-extrabold text-white/85">
            Best match
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        <span className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 fill-white/70 text-white/70" aria-hidden />
          <span className="text-[11.5px] font-extrabold tabular-nums text-white/85">{caregiver.rating.toFixed(1)}</span>
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-bold tabular-nums text-white/55">
          <MapPin className="h-3 w-3 text-white/35" aria-hidden />
          {caregiver.distanceKm.toFixed(1)} km
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-bold tabular-nums text-white/55">
          <Briefcase className="h-3 w-3 text-white/35" aria-hidden />
          {caregiver.years} yrs
        </span>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {caregiver.languages.map((lang) => {
          const hot = highlightLanguage === lang
          return (
            <span
              key={lang}
              className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition-colors duration-300 ${
                hot ? t.tagHot : 'bg-white/[0.08] text-white/60'
              }`}
            >
              {lang}
            </span>
          )
        })}
      </div>

      <div className="mt-4">
        {state === 'none' && (
          <motion.button
            type="button"
            whileTap={phase === 'idle' ? { scale: 0.985 } : undefined}
            onClick={send}
            disabled={phase !== 'idle'}
            aria-disabled={phase !== 'idle'}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-[12.5px] font-extrabold transition-colors duration-300 ${
              phase === 'idle' ? t.button : `cursor-wait ${t.buttonBusy}`
            }`}
          >
            {phase === 'idle' ? (
              <>
                <Send className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden />
                Send offer
              </>
            ) : (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                Sending offer…
              </>
            )}
          </motion.button>
        )}
        {state === 'pending' && (
          <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-3">
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${t.tile}`}>
              <Hourglass className="h-4 w-4" strokeWidth={2.4} aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[12.5px] font-bold tracking-tight text-white">Offer sent</span>
              <span className={`mt-0.5 block truncate text-[10px] font-semibold ${t.sub}`}>
                Usually responds within minutes
              </span>
            </span>
            <StatusPill tone="amber" label="Waiting" live />
          </div>
        )}
        {state === 'accepted' && (
          <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-3">
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${t.tile}`}>
              <BadgeCheck className="h-4 w-4" strokeWidth={2.4} aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[12.5px] font-bold tracking-tight text-white">Offer accepted</span>
              <span className={`mt-0.5 block truncate text-[10px] font-semibold ${t.sub}`}>
                Availability re-check passed
              </span>
            </span>
          </div>
        )}
      </div>
    </AccentHero>
  )
}

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
        accent: 'emerald' as const,
        cellLabel: 'text-emerald-100/40',
        meterLabel: 'text-emerald-100/50',
        meterValue: 'text-emerald-200',
        fill: 'bg-emerald-300',
        stripLabel: 'text-emerald-100/40',
      }
    : {
        overline: 'text-sky-200/50',
        step: 'text-sky-100/40',
        accent: 'sky' as const,
        cellLabel: 'text-sky-100/40',
        meterLabel: 'text-sky-100/50',
        meterValue: 'text-sky-200',
        fill: 'bg-sky-300',
        stripLabel: 'text-sky-100/40',
      }
  const languageLabel = language === 'Any language' ? 'Any' : language

  return (
    <AccentHero tone={matched ? 'emerald' : 'sky'}>
      <HeroTopRow
        label="Booking request"
        labelClass={t.overline}
        trailing={
          <span className={`text-[9px] font-extrabold uppercase tracking-[0.14em] tabular-nums ${t.step}`}>
            Step 2 of 3
          </span>
        }
      />

      <div className="mt-1.5 flex items-start justify-between gap-3">
        <h2 className="min-w-0 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          {inRange} {inRange === 1 ? 'caregiver' : 'caregivers'}{' '}
          <HeroHighlight tone={t.accent}>in range</HeroHighlight>
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

      <TapCell
        label="Language"
        value={languageLabel}
        onClick={onOpenLanguage}
        tone={t.accent}
        className="mt-2"
      />

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

interface OfferMeterProps {
  value: number
  fillClass: string
  className?: string
}

export function OfferMeter({ value, fillClass, className = '' }: OfferMeterProps) {
  const clamped = Math.min(1, Math.max(0, value))
  return (
    <div aria-hidden className={`h-1.5 overflow-hidden rounded-full bg-white/[0.08] ${className}`}>
      <motion.div
        className={`h-full origin-left rounded-full transition-colors duration-500 ${fillClass}`}
        initial={false}
        animate={{ scaleX: clamped }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />
    </div>
  )
}