import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { BadgeCheck, Briefcase, Hourglass, Loader2, MapPin, Send, Star } from 'lucide-react'
import { AccentHero } from '@/components/phone/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { initialsOf, type MatchCaregiver, type OfferState } from '@/data/patientMatching'

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
