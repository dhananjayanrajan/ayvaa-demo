import { motion } from 'motion/react'
import { Card, Ring } from '@/components/phone/kit'
import { CARE_HISTORY, sessionsShare, totalSessions } from '@/data/patientCaregiverProfile'
import { useEffect, useRef, useState } from 'react'
import { BadgeCheck, Check, FileCheck2, HeartPulse, Loader2, Quote, Send, ShieldCheck, Star, Stethoscope, type LucideIcon } from 'lucide-react'
import { Row } from '@/components/phone/Row'
import type { Credential, Review } from '@/data/patientCaregiverProfile'
import { SheetShell } from '@/components/phone/SheetShell'
import { AccentHero } from '@/components/phone/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { HeroTopRow } from '@/components/phone/HeroCells'
import { initialsOf, type OfferState } from '@/data/patientMatching'

// ── CareHistoryCard.tsx ──
export function CareHistoryCard() {
  const total = totalSessions()

  return (
    <Card>
      <div className="flex flex-col gap-5 p-5">
        {CARE_HISTORY.map((entry) => {
          const Icon = entry.icon
          const share = sessionsShare(entry.sessions, total)
          return (
            <div key={entry.id}>
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.05] text-[#0B211B]/55">
                  <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-extrabold tracking-tight text-[#0B211B]">
                    {entry.category}
                  </span>
                  <span className="block truncate text-[10.5px] font-semibold text-[#0B211B]/45">{entry.cadence}</span>
                </span>
                <span className="shrink-0 text-[13px] font-extrabold tabular-nums tracking-tight text-[#0B211B]">
                  {entry.sessions}
                </span>
              </div>
              <div aria-hidden className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#0B211B]/[0.06]">
                <motion.div
                  className="h-full origin-left rounded-full bg-emerald-500/50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: share }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

// ── CredentialCard.tsx ──
const rowIcons: Record<string, LucideIcon> = {
  'rn-licence': ShieldCheck,
  background: FileCheck2,
  'first-aid': HeartPulse,
}

interface CredentialRowProps {
  credential: Credential
  open: boolean
  onToggle: () => void
}

function CredentialRow({ credential, open, onToggle }: CredentialRowProps) {
  const Icon = rowIcons[credential.id] ?? ShieldCheck

  return (
    <Row
      leading={
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500/[0.1] text-emerald-600">
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
        </span>
      }
      title={credential.title}
      titleClassName="text-[13.5px] font-bold leading-snug"
      subtitle={credential.summary}
      subtitleClassName="text-[11px] font-semibold leading-snug text-[#0B211B]/45"
      chip={{ label: credential.status, intent: 'success', className: '' }}
      expandable
      chevronInTrailing
      open={open}
      onToggle={onToggle}
      className="items-start"
      showChevron={false}
      expansion={
        <div className="mx-3 mb-3.5 rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
          {credential.details.map((detail) => (
            <div key={detail.label} className="mt-2.5 first:mt-0">
              <div className="flex items-baseline justify-between gap-3">
                <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
                  {detail.label}
                </span>
                <span className="truncate text-[12px] font-bold text-[#0B211B]/80">{detail.value}</span>
              </div>
            </div>
          ))}
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-500/[0.08] px-3 py-2">
            <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" strokeWidth={2.4} aria-hidden />
            <span className="text-[10.5px] font-bold text-emerald-800">
              Verified against the issuing registry before listing
            </span>
          </div>
        </div>
      }
      expansionClassName="px-0 pb-0"
    />
  )
}

export function CredentialCard({ credentials }: { credentials: Credential[] }) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <Card>
      <div className="flex flex-col py-1">
        {credentials.map((credential) => (
          <CredentialRow
            key={credential.id}
            credential={credential}
            open={openId === credential.id}
            onToggle={() => setOpenId((prev) => (prev === credential.id ? null : credential.id))}
          />
        ))}
      </div>
    </Card>
  )
}

// ── OfferSheet.tsx ──
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

// ── ProfileHero.tsx ──
interface ProfileHeroProps {
  name: string
  role: string
  years: number
  rating: number
  visits: number
  onTime: string
  offer: OfferState
}

export function ProfileHero({ name, role, years, rating, visits, onTime, offer }: ProfileHeroProps) {
  const tone = offer === 'accepted' ? 'emerald' : offer === 'pending' ? 'amber' : 'sky'

  return (
    <AccentHero tone={tone}>
      <HeroTopRow
        label="Ayvaa verified caregiver"
        labelClass="text-white/50"
        trailing={
          offer === 'accepted' ? (
            <StatusPill tone="emerald" label="Accepted" />
          ) : offer === 'pending' ? (
            <StatusPill tone="amber" label="Offer out" live />
          ) : (
            <StatusPill tone="sky" label="Available" />
          )
        }
      />

      <div className="mt-4 flex items-start gap-4">
        <div className="relative shrink-0">
          <span className="grid h-16 w-16 place-items-center rounded-[22px] bg-white/[0.1] text-[18px] font-black tracking-tight text-white">
            {initialsOf(name)}
          </span>
          <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-white">
            <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} aria-hidden />
          </span>
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <h2 className="text-[19px] font-extrabold leading-tight tracking-tight text-white">{name}</h2>
          <p className="mt-1 flex items-start gap-1.5 text-[11.5px] font-semibold leading-snug text-white/55">
            <Stethoscope className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
            {role}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <Ring value={rating / 5} size={68} stroke={6} id="p11-rating">
          <span className="text-[14px] font-extrabold tabular-nums leading-none text-white">{rating}</span>
          <span className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.14em] text-white/50">rating</span>
        </Ring>
        <div className="min-w-0 flex-1">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">Sessions delivered</div>
            <div className="mt-0.5 text-[15px] font-extrabold tabular-nums leading-none text-white">{visits}</div>
          </div>
          <div className="mt-3">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">Experience</div>
            <div className="mt-0.5 text-[15px] font-extrabold tabular-nums leading-none text-white">{years} yrs</div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-2.5">
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">On-time arrivals</span>
        <span className="truncate text-[12.5px] font-extrabold tabular-nums leading-none text-white">{onTime}</span>
      </div>
    </AccentHero>
  )
}

// ── ReviewShell.tsx ──
export function ReviewShell({ review }: { review: Review }) {
  return (
    <AccentHero tone="emerald">
      <div className="flex items-center justify-between gap-3">
        <Quote className="h-5 w-5 fill-emerald-300/40 text-emerald-300/40" aria-hidden />
        <span className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 fill-emerald-300 text-emerald-300" aria-hidden />
          <span className="text-[12px] font-extrabold tabular-nums text-white">{review.rating.toFixed(1)}</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">
            {review.month} {review.year}
          </span>
        </span>
      </div>

      <p className="mt-2.5 font-serif text-pretty text-[14px] font-medium leading-relaxed text-white/90">
        {review.quote}
      </p>

      <div className="mt-4 flex items-center gap-2.5 border-t border-white/[0.08] pt-3.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-[11px] font-extrabold text-emerald-200">
          {initialsOf(review.family)}
        </span>
        <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-emerald-50/80">{review.family}</span>
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">{review.context}</span>
      </div>
    </AccentHero>
  )
}
