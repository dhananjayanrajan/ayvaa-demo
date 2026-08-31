import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { BadgeCheck, Bell, CalendarDays, Check, ChevronRight, Clock, Eye, HeartPulse, Loader2, MessageSquare, Package, Pill, RefreshCw, ShoppingCart } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'
import { FactRows } from '@/components/phone/FactRows'
import { Row } from '@/components/phone/Row'
import { Card, Meter, MiniBadge } from '@/components/phone/kit'
import type { Prescription } from '@/data/patientPrescriptions'
import { weekTakenOf } from '@/data/patientPrescriptions'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

type Phase = 'idle' | 'working' | 'done'

const DAY_LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export function PrescriptionSheet({
  rx,
  onClose,
  onRefilled,
  onMessage,
  onReminded,
}: {
  rx: Prescription
  onClose: () => void
  onRefilled: () => void
  onMessage: () => void
  onReminded: () => void
}) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const done = phase === 'done'

  const orderRefill = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(
      setTimeout(() => {
        setPhase('done')
        onRefilled()
      }, 700),
    )
    timers.current.push(
      setTimeout(() => notify({ title: 'Refill ordered', body: 'Sunrise pharmacy delivers within 24 hours', kind: 'ok' }), 1200),
    )
  }

  const setReminder = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(
      setTimeout(() => {
        setPhase('done')
        onReminded()
      }, 700),
    )
    timers.current.push(
      setTimeout(() => {
        notify({ title: 'Reminder set', body: `${rx.name}, ${rx.schedule}`, kind: 'ok' })
        onClose()
      }, 1200),
    )
  }

  return (
    <SheetShell
      icon={rx.icon}
      title={`${rx.name} ${rx.dose}`}
      subtitle={rx.purpose}
      tone={rx.low ? (done ? 'success' : 'danger') : 'info'}
      onClose={onClose}
      footer={
        rx.low ? (
          <motion.button
            type="button"
            whileTap={phase === 'idle' ? { scale: 0.985 } : undefined}
            onClick={orderRefill}
            disabled={phase !== 'idle'}
            aria-disabled={phase !== 'idle'}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-colors',
              phase === 'done'
                ? 'bg-emerald-600'
                : phase === 'working'
                  ? 'cursor-wait bg-rose-500/60'
                  : 'bg-gradient-to-r from-rose-600 to-red-600 shadow-[0_18px_36px_-18px_rgba(225,29,72,0.75)]',
            )}
          >
            {phase === 'idle' && (
              <>
                <ShoppingCart className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Order refill</span>
              </>
            )}
            {phase === 'working' && (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Ordering…
              </>
            )}
            {phase === 'done' && (
              <>
                <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                <span className="truncate">Ordered</span>
              </>
            )}
          </motion.button>
        ) : (
          <motion.button
            type="button"
            whileTap={phase === 'idle' ? { scale: 0.985 } : undefined}
            onClick={setReminder}
            disabled={phase !== 'idle'}
            aria-disabled={phase !== 'idle'}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-colors',
              phase === 'done'
                ? 'bg-emerald-600'
                : phase === 'working'
                  ? 'cursor-wait bg-emerald-600/60'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
            )}
          >
            {phase === 'idle' && (
              <>
                <Bell className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Set reminder</span>
              </>
            )}
            {phase === 'working' && (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Setting…
              </>
            )}
            {phase === 'done' && (
              <>
                <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                <span className="truncate">Reminder set</span>
              </>
            )}
          </motion.button>
        )
      }
    >
      <div className="flex flex-col gap-3 pb-2">
        <div className={cn('relative overflow-hidden rounded-2xl p-4', rx.low ? 'bg-[#230D14]' : 'bg-[#0B231C]')}>
          <div
            aria-hidden
            className={cn(
              'pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full blur-3xl',
              rx.low ? 'bg-rose-400/20' : 'bg-emerald-400/20',
            )}
          />
          <div className="relative">
            <div
              className={cn(
                'text-[9px] font-extrabold uppercase tracking-[0.22em]',
                rx.low ? 'text-rose-200/50' : 'text-emerald-200/50',
              )}
            >
              Prescription record
            </div>
            <div className="mt-3.5">
              <FactRows
                rows={[
                  { label: 'Prescriber', value: rx.prescriber },
                  { label: 'Schedule', value: rx.schedule },
                  { label: 'Next dose', value: rx.nextDose },
                  { label: 'Stock', value: rx.stock },
                  { label: 'Verified', value: rx.verifiedBy },
                ]}
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <MiniBadge icon={Clock} tone={rx.low ? 'rose' : 'emerald'} dark>
                Uploaded {rx.uploadedAt}
              </MiniBadge>
              <MiniBadge icon={Eye} tone={rx.low ? 'rose' : 'emerald'} dark>
                {rx.viewsLogged} views logged
              </MiniBadge>
              <MiniBadge icon={RefreshCw} tone={rx.low ? 'rose' : 'emerald'} dark>
                Refilled {rx.lastRefill}
              </MiniBadge>
            </div>
          </div>
        </div>

        <Card className="p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-[#0B211B]/40" strokeWidth={2.4} aria-hidden />
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Last 7 days</span>
            </span>
            <span className="text-[12px] font-extrabold tabular-nums tracking-tight text-[#0B211B]">
              {weekTakenOf(rx.week)} of 7 taken
            </span>
          </div>

          <div className="mt-3 overflow-hidden rounded-xl bg-[#0B211B]/[0.05]">
            <div className="flex">
              {rx.week.map((taken, i) => (
                <motion.span
                  key={i}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: 'easeOut' }}
                  style={{ transformOrigin: 'left' }}
                  className={cn('h-2.5 min-w-0 flex-1', i > 0 && 'ml-px', taken ? 'bg-emerald-500' : 'bg-transparent')}
                />
              ))}
            </div>
          </div>
          <div className="mt-1.5 grid grid-cols-7">
            {DAY_LETTERS.map((d, i) => (
              <span key={i} className="text-center text-[8px] font-extrabold uppercase tracking-[0.1em] text-[#0B211B]/35">
                {d}
              </span>
            ))}
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5">
                <Package className="h-3.5 w-3.5 text-[#0B211B]/40" strokeWidth={2.4} aria-hidden />
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Stock level</span>
              </span>
              <span className="text-[12px] font-extrabold tabular-nums tracking-tight text-[#0B211B]">
                {rx.low ? rx.stock : `${Math.round(rx.stockPct * 100)}%`}
              </span>
            </div>
            <Meter value={rx.stockPct} intent={rx.low ? 'danger' : 'success'} delay={0.15} className="mt-2.5" />
            <div className="mt-2 text-[10px] font-semibold text-[#0B211B]/45">
              {rx.low ? 'Refill on the way' : 'Stocked past next month'}
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <span className="flex items-center gap-1.5">
            <Pill className="h-3.5 w-3.5 text-[#0B211B]/40" strokeWidth={2.4} aria-hidden />
            <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">How it is given</span>
          </span>
          <p className="mt-1.5 text-[12px] font-semibold leading-snug text-[#0B211B]/70">{rx.detail}</p>

          <div className="mt-3.5">
            <span className="flex items-center gap-1.5">
              <HeartPulse className="h-3.5 w-3.5 text-[#0B211B]/40" strokeWidth={2.4} aria-hidden />
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Why it matters</span>
            </span>
            <p className="mt-1.5 text-[12px] font-semibold leading-snug text-[#0B211B]/70">{rx.meaning}</p>
          </div>
        </Card>

        <Card className="p-0">
          <Row
            leading={
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500/[0.12] text-emerald-700">
                <MessageSquare className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              </span>
            }
            title="Questions about this prescription?"
            titleClassName="text-[12px]"
            subtitle={`${rx.prescriber} replies within a few hours`}
            subtitleClassName="text-[10.5px]"
            surface="none"
            padding="none"
            className="p-4"
            hoverClassName="hover:bg-[#0B211B]/[0.02]"
            showChevron={false}
            trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />}
            onClick={onMessage}
          />
        </Card>

        <div className="flex items-center gap-2 rounded-xl bg-emerald-500/[0.1] px-3 py-2.5">
          <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-700" strokeWidth={2.4} aria-hidden />
          <span className="min-w-0">
            <span className="block text-[10.5px] font-bold text-emerald-800">Verified by {rx.verifiedBy}</span>
            <span className="block text-[10px] font-semibold text-emerald-700/70">Sealed to the Rx ledger</span>
          </span>
        </div>
      </div>
    </SheetShell>
  )
}
