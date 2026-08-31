import { Check, Clock, Lock, ShieldCheck, ShoppingCart } from 'lucide-react'
import { AccentHero } from '@/components/phone/AccentHero'
import { HeroTopRow, HeroHighlight } from '@/components/phone/HeroCells'
import { Meter, MiniBadge } from '@/components/phone/kit'
import { RX_LEDGER_STRIP, activeOf, lowOf, type Prescription } from '@/data/patientPrescriptions'
import { cn } from '@/lib/utils'

type HeroTone = 'emerald' | 'sky' | 'amber' | 'rose'

const TONE: Record<
  HeroTone,
  {
    kicker: string
    highlight: 'emerald' | 'sky' | 'gold' | 'rose'
    stockBg: string
    stockLabel: string
    stockValue: string
    meter: 'success' | 'info' | 'warning' | 'danger'
    stripBg: string
    stripIconBg: string
    badge: 'emerald' | 'sky' | 'amber' | 'rose'
    lock: string
    lockText: string
  }
> = {
  emerald: {
    kicker: 'text-emerald-200/50',
    highlight: 'emerald',
    stockBg: 'bg-emerald-400/[0.1]',
    stockLabel: 'text-emerald-100/50',
    stockValue: 'text-emerald-200',
    meter: 'success',
    stripBg: 'bg-emerald-400/[0.12]',
    stripIconBg: 'bg-emerald-400/[0.16] text-emerald-200',
    badge: 'emerald',
    lock: 'text-emerald-300/70',
    lockText: 'text-emerald-100/55',
  },
  sky: {
    kicker: 'text-sky-200/50',
    highlight: 'sky',
    stockBg: 'bg-sky-400/[0.1]',
    stockLabel: 'text-sky-100/50',
    stockValue: 'text-sky-200',
    meter: 'info',
    stripBg: 'bg-sky-400/[0.12]',
    stripIconBg: 'bg-sky-400/[0.16] text-sky-200',
    badge: 'sky',
    lock: 'text-sky-300/70',
    lockText: 'text-sky-100/55',
  },
  amber: {
    kicker: 'text-amber-200/50',
    highlight: 'gold',
    stockBg: 'bg-amber-400/[0.1]',
    stockLabel: 'text-amber-100/50',
    stockValue: 'text-amber-200',
    meter: 'warning',
    stripBg: 'bg-amber-400/[0.12]',
    stripIconBg: 'bg-amber-400/[0.16] text-amber-200',
    badge: 'amber',
    lock: 'text-amber-300/70',
    lockText: 'text-amber-100/55',
  },
  rose: {
    kicker: 'text-rose-200/50',
    highlight: 'rose',
    stockBg: 'bg-rose-400/[0.1]',
    stockLabel: 'text-rose-100/50',
    stockValue: 'text-rose-200',
    meter: 'danger',
    stripBg: 'bg-rose-400/[0.12]',
    stripIconBg: 'bg-rose-400/[0.16] text-rose-200',
    badge: 'rose',
    lock: 'text-rose-300/70',
    lockText: 'text-rose-100/55',
  },
}

export function RxHero({ prescriptions, refilled }: { prescriptions: Prescription[]; refilled: boolean }) {
  const active = activeOf(prescriptions)
  const low = lowOf(prescriptions)
  const lowCount = refilled ? 0 : low.length
  const tone: HeroTone = lowCount === 0 ? 'emerald' : lowCount === 1 ? 'sky' : lowCount === 2 ? 'amber' : 'rose'
  const t = TONE[tone]
  const stocked = lowCount === 0

  const strip = refilled
    ? { Icon: Check, title: 'Refill on the way', sub: 'Sunrise pharmacy delivers within 24 hours', badge: '24 h' }
    : !stocked
      ? { Icon: ShoppingCart, title: 'Refill prescribed', sub: 'Order now so care is not interrupted', badge: '24 h' }
      : { Icon: Check, title: 'Every prescription stocked', sub: 'Next refills tracked automatically', badge: 'Ok' }

  return (
    <AccentHero tone={tone}>
      <HeroTopRow
        icon={ShieldCheck}
        label="Rx ledger"
        labelClass={t.kicker}
        trailing={
          <MiniBadge icon={ShieldCheck} tone={t.badge} dark>
            Verified
          </MiniBadge>
        }
      />
      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        {active.length} active,{' '}
        <HeroHighlight tone={t.highlight}>
          {stocked ? 'all stocked' : lowCount === 1 ? '1 needs refill' : `${lowCount} need refill`}
        </HeroHighlight>
      </h2>

      <div className={cn('mt-4 rounded-2xl p-3.5', t.stockBg)}>
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em]">
          <span className={t.stockLabel}>Stock health</span>
          <span className={cn('tabular-nums', t.stockValue)}>
            {stocked ? 'All ok' : lowCount === 1 ? '1 low' : `${lowCount} low`}
          </span>
        </div>
        <Meter
          value={(prescriptions.length - lowCount) / prescriptions.length}
          intent={t.meter}
          delay={0.2}
          className="mt-2"
        />
      </div>

      <div className={cn('mt-2 flex items-center gap-2.5 rounded-2xl px-3.5 py-3', t.stripBg)}>
        <span className={cn('grid h-7 w-7 shrink-0 place-items-center rounded-lg', t.stripIconBg)}>
          <strip.Icon className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-extrabold uppercase tracking-[0.12em] text-white">{strip.title}</span>
          <span className="block text-[10px] font-semibold text-white/55">{strip.sub}</span>
        </span>
        <MiniBadge icon={Clock} tone={t.badge} dark>
          {strip.badge}
        </MiniBadge>
      </div>

      <div className="mt-2 flex items-center gap-2.5 rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
        <Lock className={cn('h-3.5 w-3.5 shrink-0', t.lock)} strokeWidth={2.4} aria-hidden />
        <span className={cn('min-w-0 flex-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em]', t.lockText)}>
          {RX_LEDGER_STRIP}
        </span>
      </div>
    </AccentHero>
  )
}
