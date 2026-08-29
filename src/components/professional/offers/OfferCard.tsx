import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle2, ChevronDown, Clock, Loader2, Lock, MapPin, Send, Wallet, X } from 'lucide-react'
import { Card, Chip } from '@/components/phone/kit'
import { cn } from '@/lib/utils'
import type { Offer } from '@/data/seed'

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
            <div className={cn('text-[15px] font-extrabold leading-snug tracking-tight', theme.title)}>
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
            whileHover={declineLoading ? undefined : { scale: 1.01 }}
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
            whileHover={acceptLoading ? undefined : { scale: 1.01 }}
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
