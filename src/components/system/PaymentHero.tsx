import { AnimatePresence, motion } from 'motion/react'
import { Landmark } from 'lucide-react'
import { Chip } from '@/components/phone/kit'
import type { Intent } from '@/components/phone/kit'
import { paymentMeta } from '@/data/systemPayments'
import type { PaymentPhase } from '@/data/systemPayments'
import { cn } from '@/lib/utils'

type HeroTheme = {
  card: string
  border: string
  orbA: string
  orbB: string
  hairline: string
  kicker: string
  sub: string
  chipIntent: Intent
  chipLabel: string
  chipDot: boolean
  netStrip: string
  netLabel: string
  netIcon: string
  amountFull: boolean
  shadowColor: string
}

const THEMES: Record<PaymentPhase, HeroTheme> = {
  awaiting: {
    card: 'bg-[#0B1B2A]',
    border: 'border-blue-200/10',
    orbA: 'bg-blue-400/25',
    orbB: 'bg-sky-300/15',
    hairline: 'via-blue-200/40',
    kicker: 'text-blue-200/50',
    sub: 'text-blue-100/55',
    chipIntent: 'info',
    chipLabel: 'Awaiting sign-off',
    chipDot: false,
    netStrip: 'bg-white/[0.06]',
    netLabel: 'text-blue-100/60',
    netIcon: 'text-white/40',
    amountFull: false,
    shadowColor: 'rgba(10,30,50,0.7)',
  },
  capturing: {
    card: 'bg-[#241B0C]',
    border: 'border-amber-200/15',
    orbA: 'bg-amber-400/25',
    orbB: 'bg-orange-400/12',
    hairline: 'via-amber-200/40',
    kicker: 'text-amber-200/60',
    sub: 'text-amber-100/60',
    chipIntent: 'warning',
    chipLabel: 'Capturing',
    chipDot: true,
    netStrip: 'bg-white/[0.06]',
    netLabel: 'text-amber-100/60',
    netIcon: 'text-white/50',
    amountFull: false,
    shadowColor: 'rgba(60,40,10,0.7)',
  },
  captured: {
    card: 'bg-[#062419]',
    border: 'border-emerald-300/20',
    orbA: 'bg-emerald-400/30',
    orbB: 'bg-teal-300/20',
    hairline: 'via-emerald-300/50',
    kicker: 'text-emerald-300/70',
    sub: 'text-emerald-100/65',
    chipIntent: 'success',
    chipLabel: 'Captured',
    chipDot: false,
    netStrip: 'bg-emerald-400/[0.12]',
    netLabel: 'text-emerald-100',
    netIcon: 'text-emerald-300',
    amountFull: true,
    shadowColor: 'rgba(6,40,30,0.7)',
  },
  retrying: {
    card: 'bg-[#241B0C]',
    border: 'border-amber-200/15',
    orbA: 'bg-amber-400/30',
    orbB: 'bg-orange-400/15',
    hairline: 'via-amber-300/50',
    kicker: 'text-amber-200/60',
    sub: 'text-amber-100/60',
    chipIntent: 'warning',
    chipLabel: 'Retrying',
    chipDot: true,
    netStrip: 'bg-white/[0.06]',
    netLabel: 'text-amber-100/60',
    netIcon: 'text-white/50',
    amountFull: false,
    shadowColor: 'rgba(60,40,10,0.7)',
  },
}

const STATUS: Record<PaymentPhase, string> = {
  awaiting: 'Nothing has been charged. It waits for the sign-off.',
  capturing: 'The charge is being placed against this session.',
  captured: 'One charge. Receipt delivered. Record sealed.',
  retrying: 'The bank did not answer. Nothing has been taken.',
}

function HeroRow({ label, value, dim }: { label: string; value: string; dim: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span
        className={cn(
          'shrink-0 text-[9px] font-bold uppercase tracking-[0.16em]',
          dim ? 'text-white/35' : 'text-emerald-100/45',
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'min-w-0 break-words text-right text-[12px] font-bold leading-snug',
          dim ? 'text-white/45' : 'text-emerald-50/90',
        )}
      >
        {value}
      </span>
    </div>
  )
}

interface PaymentHeroProps {
  phase: PaymentPhase
}

export function PaymentHero({ phase }: PaymentHeroProps) {
  const t = THEMES[phase]
  const dim = !t.amountFull

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[26px] border transition-colors duration-500',
        t.card,
        t.border,
      )}
      style={{ boxShadow: `0 28px 64px -30px ${t.shadowColor}` }}
    >
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full blur-3xl transition-colors duration-500',
          t.orbA,
        )}
      />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full blur-3xl transition-colors duration-500',
          t.orbB,
        )}
      />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent transition-colors duration-500',
          t.hairline,
        )}
      />

      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              'text-[9px] font-extrabold uppercase tracking-[0.22em] transition-colors duration-500',
              t.kicker,
            )}
          >
            Payment {paymentMeta.id}
          </span>
          <Chip intent={t.chipIntent} light dot={t.chipDot} className="shrink-0 border-transparent">
            {t.chipLabel}
          </Chip>
        </div>

        <div className="mt-3 flex items-baseline gap-1.5">
          <span
            className={cn(
              'text-[18px] font-extrabold tabular-nums transition-colors duration-500',
              dim ? 'text-white/30' : 'text-emerald-200/80',
            )}
          >
            ₹
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={t.amountFull ? 'full' : 'zero'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={cn(
                'text-[18px] font-extrabold tabular-nums leading-none transition-colors duration-500',
                dim ? 'text-white/30' : 'text-white',
              )}
            >
              {t.amountFull ? paymentMeta.amountNum : '0'}
            </motion.span>
          </AnimatePresence>
          <span
            className={cn(
              'ml-1 text-[9px] font-bold uppercase tracking-[0.16em] transition-colors duration-500',
              t.netLabel,
            )}
          >
            charged
          </span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={phase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={cn(
              'mt-2 text-[12px] font-medium leading-relaxed transition-colors duration-500',
              t.sub,
            )}
          >
            {STATUS[phase]}
          </motion.p>
        </AnimatePresence>

        <div className="mt-3.5 rounded-2xl bg-white/[0.04] p-3.5">
          <HeroRow label="Visit" value={paymentMeta.visitShort} dim={dim} />
          <div className="mt-2">
            <HeroRow label="Care" value={paymentMeta.careShort} dim={dim} />
          </div>
          <div className="mt-2">
            <HeroRow label="Card" value={`${paymentMeta.card} ··${paymentMeta.cardLast4}`} dim={dim} />
          </div>
        </div>

        <div
          className={cn(
            'mt-3 flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors duration-500',
            t.netStrip,
          )}
        >
          <span className="flex min-w-0 items-center gap-1.5">
            <Landmark
              className={cn('h-3.5 w-3.5 shrink-0 transition-colors duration-500', t.netIcon)}
              strokeWidth={2.4}
              aria-hidden
            />
            <span
              className={cn(
                'text-[9px] font-bold uppercase tracking-[0.16em] transition-colors duration-500',
                t.netLabel,
              )}
            >
              Charged to date
            </span>
          </span>
          <span
            className={cn(
              'shrink-0 text-[15px] font-extrabold tabular-nums leading-none transition-colors duration-500',
              dim ? 'text-white/35' : 'text-white',
            )}
          >
            {t.amountFull ? paymentMeta.amount : '₹0'}
          </span>
        </div>
      </div>
    </div>
  )
}
