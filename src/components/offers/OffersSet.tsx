import { Check, CheckCircle2, ChevronDown, Clock, Loader2, Lock, MapPin, RotateCcw, Send, Wallet, X } from 'lucide-react'
import { Card, Chip, Hero, Tile } from '@/components/phone/kit'
import type { Offer } from '@/data/seed'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SheetShell } from '@/components/phone/SheetShell'
import { cn } from '@/lib/utils'

interface AcceptedOffersCardProps {
  accepted: Offer[]
}

export function AcceptedOffersCard({ accepted }: AcceptedOffersCardProps) {
  return (
    <Card>
      {accepted.map((o) => (
        <div key={o.id} className="flex items-center gap-3 px-4 py-3.5">
          <Tile icon={CheckCircle2} tone="success" />
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-bold leading-snug tracking-tight text-[#0B211B]">{o.title}</div>
            <div className="mt-0.5 text-[11px] font-semibold text-[#0B211B]/45">
              Accepted · availability confirmed
            </div>
          </div>
          <Chip intent="success" className="border-transparent">
            Accepted
          </Chip>
        </div>
      ))}
    </Card>
  )
}

interface DeclineOfferSheetProps {
  offer: Offer | null
  onClose: () => void
  onAccept: (offer: Offer) => void
  onDecline: (offer: Offer) => void
}

export function DeclineOfferSheet({ offer, onClose, onAccept, onDecline }: DeclineOfferSheetProps) {
  const [declineLoading, setDeclineLoading] = useState(false)
  const [acceptLoading, setAcceptLoading] = useState(false)

  const handleDecline = () => {
    if (!offer || declineLoading || acceptLoading) return
    setDeclineLoading(true)
    setTimeout(() => {
      setDeclineLoading(false)
      onDecline(offer)
    }, 700)
  }

  const handleAccept = () => {
    if (!offer || declineLoading || acceptLoading) return
    setAcceptLoading(true)
    setTimeout(() => {
      setAcceptLoading(false)
      onAccept(offer)
    }, 700)
  }

  return (
    <AnimatePresence>
      {offer && (
        <motion.div
          className="absolute inset-0 z-50 flex flex-col justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <SheetShell onClose={onClose} height="scroll">
            <div className="flex items-start gap-3">
              <Tile icon={Check} tone="warning" size="lg" />
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Decline this offer?</div>
                <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                  {offer.title} · the slot is re-offered to other professionals immediately. No penalty on your priority.
                </div>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={onClose}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                aria-label="Keep offer"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>

            <motion.button
              type="button"
              whileTap={acceptLoading ? undefined : { scale: 0.97 }}
              onClick={handleAccept}
              disabled={acceptLoading || declineLoading}
              className={cn(
                'mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
                acceptLoading && 'opacity-80',
              )}
            >
              {acceptLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Send className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              )}
              {acceptLoading ? 'Accepting…' : 'Actually, accept it'}
            </motion.button>
            <motion.button
              type="button"
              whileTap={declineLoading ? undefined : { scale: 0.97 }}
              onClick={handleDecline}
              disabled={declineLoading || acceptLoading}
              className={cn(
                'mt-2 w-full rounded-2xl bg-rose-500/10 py-3.5 text-sm font-bold text-rose-600',
                declineLoading && 'opacity-70',
              )}
            >
              {declineLoading ? 'Declining…' : 'Yes, decline'}
            </motion.button>
          </SheetShell>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface DeclinedOffersCardProps {
  declined: Offer[]
  onUndoDecline: (offer: Offer) => void
}

export function DeclinedOffersCard({ declined, onUndoDecline }: DeclinedOffersCardProps) {
  return (
    <Card>
      {declined.map((o) => (
        <div key={o.id} className="flex items-center gap-3 px-4 py-3.5">
          <Tile icon={X} tone="neutral" />
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-bold leading-snug tracking-tight text-[#0B211B]">{o.title}</div>
            <div className="mt-0.5 text-[11px] font-semibold text-[#0B211B]/45">
              Declined politely · family matched elsewhere
            </div>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => onUndoDecline(o)}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50 transition-colors hover:bg-[#0B211B]/[0.1] focus-visible:ring-2 focus-visible:ring-emerald-500/40"
            aria-label={`Undo decline for ${o.title}`}
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
          </motion.button>
        </div>
      ))}
    </Card>
  )
}

const typeLabel: Record<string, string> = {
  recurring: 'Recurring care',
  'one-time': 'One-time visit',
  ongoing: 'Ongoing care',
}

const urgencyTheme = {
  high: {
    cardBg: 'bg-rose-50',
    border: 'border-rose-200',
    title: 'text-[#3A0A0A]',
    body: 'text-[#3A0A0A]/60',
    statBg: 'bg-white/80',
    statValue: 'text-[#3A0A0A]',
    statLabel: 'text-[#3A0A0A]/50',
    detailBg: 'bg-white/80',
    detailText: 'text-[#3A0A0A]/70',
    noticeText: 'text-[#3A0A0A]/50',
    chip: 'bg-rose-100 text-rose-700',
  },
  medium: {
    cardBg: 'bg-amber-50',
    border: 'border-amber-200',
    title: 'text-[#3A2A0A]',
    body: 'text-[#3A2A0A]/60',
    statBg: 'bg-white/80',
    statValue: 'text-[#3A2A0A]',
    statLabel: 'text-[#3A2A0A]/50',
    detailBg: 'bg-white/80',
    detailText: 'text-[#3A2A0A]/70',
    noticeText: 'text-[#3A2A0A]/50',
    chip: 'bg-amber-100 text-amber-700',
  },
  low: {
    cardBg: 'bg-emerald-50',
    border: 'border-emerald-200',
    title: 'text-[#0B211B]',
    body: 'text-[#0B211B]/55',
    statBg: 'bg-white/80',
    statValue: 'text-[#0B211B]',
    statLabel: 'text-[#0B211B]/50',
    detailBg: 'bg-white/80',
    detailText: 'text-[#0B211B]/70',
    noticeText: 'text-[#0B211B]/50',
    chip: 'bg-emerald-100 text-emerald-700',
  },
} as const

function getUrgency(expiresIn: string): keyof typeof urgencyTheme {
  const hours = parseInt(expiresIn.replace(/[^0-9]/g, ''), 10) || 0
  if (hours <= 2) return 'high'
  if (hours <= 6) return 'medium'
  return 'low'
}

interface OfferCardProps {
  offer: Offer
  onAccept: (offer: Offer) => void
  onDecline: (offer: Offer) => void
}

export function OfferCard({ offer, onAccept, onDecline }: OfferCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [acceptLoading, setAcceptLoading] = useState(false)
  const [declineLoading, setDeclineLoading] = useState(false)
  const urgency = getUrgency(offer.expiresIn)
  const theme = urgencyTheme[urgency]

  const handleAccept = () => {
    if (acceptLoading || declineLoading) return
    setAcceptLoading(true)
    setTimeout(() => {
      setAcceptLoading(false)
      onAccept(offer)
    }, 800)
  }

  const handleDecline = () => {
    if (acceptLoading || declineLoading) return
    setDeclineLoading(true)
    setTimeout(() => {
      setDeclineLoading(false)
      onDecline(offer)
    }, 600)
  }

  return (
    <Card className={cn('overflow-hidden border-2', theme.border, theme.cardBg)}>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className={cn('text-sm font-extrabold leading-snug tracking-tight', theme.title)}>
              {offer.title}
            </div>
            <div className={cn('mt-0.5 text-xs font-semibold', theme.body)}>
              {typeLabel[offer.type] ?? 'Care visit'}
            </div>
          </div>
          <Chip intent="warning" dot icon={Clock} className={cn('shrink-0 border-transparent', theme.chip)}>
            {offer.expiresIn}
          </Chip>
        </div>

        <div className="mt-3.5 grid grid-cols-3 gap-2">
          {[
            { icon: MapPin, v: offer.distance, l: 'away' },
            { icon: Wallet, v: offer.rate, l: 'per visit' },
            { icon: CheckCircle2, v: offer.consentSigned ? 'Signed' : 'Pending', l: 'consent' },
          ].map((f) => (
            <div key={f.l} className={cn('rounded-2xl px-3 py-2.5', theme.statBg)}>
              <f.icon className="h-3.5 w-3.5 text-emerald-600/70" strokeWidth={2.4} aria-hidden />
              <div className={cn('mt-1.5 text-[12px] font-extrabold tabular-nums leading-none', theme.statValue)}>{f.v}</div>
              <div className={cn('mt-1 text-[8.5px] font-bold uppercase tracking-[0.12em]', theme.statLabel)}>{f.l}</div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className={cn(
            'mt-4 flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left outline-none transition-colors',
            'focus-visible:ring-2 focus-visible:ring-emerald-500/40',
            theme.detailBg,
          )}
        >
          <span className={cn('text-[11px] font-extrabold uppercase tracking-[0.14em]', theme.detailText)}>
            Offer details
          </span>
          <ChevronDown
            className={cn('h-4 w-4 text-[#0B211B]/40 transition-transform', expanded && 'rotate-180')}
            aria-hidden
          />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="overflow-hidden"
            >
              <div className={cn('mt-3 rounded-xl p-3.5 text-[11px] font-medium leading-relaxed', theme.detailBg, theme.detailText)}>
                This offer matches your listed availability and service area. Accepting will reserve the slot and notify the family.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={cn('mt-3.5 flex items-center gap-1.5 text-[10.5px] font-semibold', theme.noticeText)}>
          <Lock className="h-3 w-3 shrink-0" aria-hidden />
          Acceptance is re-checked against your live availability.
        </div>

        <div className="mt-3.5 flex gap-2.5">
          <motion.button
            type="button"
            whileTap={declineLoading ? undefined : { scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={handleDecline}
            disabled={declineLoading || acceptLoading}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-rose-500/10 py-3.5 text-[13px] font-bold text-rose-600',
              declineLoading && 'opacity-70',
            )}
          >
            {declineLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <X className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            )}
            <span>{declineLoading ? 'Declining…' : 'Decline'}</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={acceptLoading ? undefined : { scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={handleAccept}
            disabled={acceptLoading || declineLoading}
            className={cn(
              'flex flex-[1.3] items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
              acceptLoading && 'opacity-80',
            )}
          >
            {acceptLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <Send className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            )}
            <span>{acceptLoading ? 'Accepting…' : 'Accept'}</span>
          </motion.button>
        </div>
      </div>
    </Card>
  )
}

interface OffersHeroProps {
  activeCount: number
  accepting: boolean
  round: number
  expiresAt: string
  onToggleAccepting: () => void
}

export function OffersHero({ activeCount, accepting, round, expiresAt, onToggleAccepting }: OffersHeroProps) {
  const theme = accepting
    ? {
        bg: 'bg-[#0B231C]',
        border: 'border-emerald-200/10',
        glow: 'bg-emerald-400/25',
        kicker: 'text-emerald-200/50',
        title: 'text-white',
        titleGradient: 'from-emerald-300 to-teal-200',
        subtitle: 'text-emerald-100/55',
        chipIntent: 'live' as const,
        chipLabel: 'Accepting',
        chipDot: true,
        statusDot: 'bg-emerald-300',
        statusText: 'Accepting offers',
        toggleBg: 'bg-emerald-400',
        toggleBall: 'left-6',
      }
    : {
        bg: 'bg-[#3A2A0B]',
        border: 'border-amber-200/10',
        glow: 'bg-amber-400/25',
        kicker: 'text-amber-200/50',
        title: 'text-white',
        titleGradient: 'from-amber-300 to-orange-200',
        subtitle: 'text-amber-100/55',
        chipIntent: 'warning' as const,
        chipLabel: 'Paused',
        chipDot: false,
        statusDot: 'bg-amber-300',
        statusText: 'Paused — you receive nothing until you resume',
        toggleBg: 'bg-white/20',
        toggleBall: 'left-1',
      }

  return (
    <Hero className={cn(theme.bg, theme.border)}>
      <div aria-hidden className={cn('pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full blur-3xl', theme.glow)} />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className={cn('text-[9px] font-extrabold uppercase tracking-[0.22em]', theme.kicker)}>
            Dispatch · realtime
          </div>
          <Chip intent={theme.chipIntent} light dot={theme.chipDot} className="shrink-0 border-transparent">
            {theme.chipLabel}
          </Chip>
        </div>
        <h2 className={cn('mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight', theme.title)}>
          {activeCount} offer{activeCount === 1 ? '' : 's'}{' '}
          <span className={cn('bg-gradient-to-r bg-clip-text text-transparent', theme.titleGradient)}>
            waiting on you
          </span>
        </h2>
        <p className={cn('mt-1 text-[12px] font-medium leading-relaxed', theme.subtitle)}>
          Round {round} · offers expire at {expiresAt}. First to accept wins the slot.
        </p>

        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3.5">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            {accepting && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
            )}
            <span className={cn('relative inline-flex h-2.5 w-2.5 rounded-full', theme.statusDot)} />
          </span>
          <span className={cn('min-w-0 flex-1 text-[13px] font-bold', theme.subtitle)}>
            {theme.statusText}
          </span>
          <button
            type="button"
            onClick={onToggleAccepting}
            aria-label="Toggle accepting offers"
            className={cn(
              'relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-emerald-300/50',
              theme.toggleBg,
            )}
          >
            <motion.span
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={cn(
                'absolute top-1 h-5 w-5 rounded-full bg-white shadow',
                theme.toggleBall,
              )}
            />
          </button>
        </div>
      </div>
    </Hero>
  )
}