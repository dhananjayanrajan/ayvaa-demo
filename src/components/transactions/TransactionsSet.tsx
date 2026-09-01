import { AnimatePresence, motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { AlertTriangle, ArrowRight, Ban, CalendarCheck, CalendarPlus, Check, CheckCircle2, ChevronDown, ChevronRight, FilePenLine, HeartHandshake, Hourglass, Landmark, Loader2, PhoneCall, Play, Repeat, RotateCcw, Route, Scale, ScrollText, Send, ShieldCheck, Ticket, Undo2, UserCheck, UserRound, Users } from 'lucide-react'
import type { Intent, TileTone } from '@/components/phone/kit'
import { Card, Chip, LiveDot, Meter, Panel, StatStrip, Tile, rise } from '@/components/phone/kit'
import { StepList } from '@/components/phone/StepList'
import type { LadderPhase } from '@/data/system/recheck'
import { ladderSteps, reversalEvents } from '@/data/system/recheck'
import { cn } from '@/lib/utils'
import { Row } from '@/components/phone/Row'
import { dispatchOffers } from '@/data/seed'
import { PHASE_THEME, PhaseHero } from '@/components/phone/PhaseHero'
import type { PaymentPhase } from '@/data/system/payments'
import { paymentMeta, refund, refundEvents } from '@/data/system/payments'
import type { PostCommitState, StepVisual, TransactionPhase, TransactionStep } from '@/data/system/transactions'
import { postCommitStep, transactionMeta, transactionSteps } from '@/data/system/transactions'
import { useState } from 'react'
import { Overline } from '@/components/phone/Overline'
import { scheduleDiff } from '@/data/system/auditLog'
import { useRouter } from '@/lib/router'

const STEP_ICONS: LucideIcon[] = [Hourglass, Send, Route, Users]

type TransactionStepVisual_NoAvailabilityLadder = 'pending' | 'now' | 'done'

interface NoAvailabilityLadderProps {
  phase: LadderPhase
  completed: number
  onPlay: () => void
  onStepTap: (title: string, body: string) => void
}

export function NoAvailabilityLadder({ phase, completed, onPlay, onStepTap }: NoAvailabilityLadderProps) {
  const stateFor = (i: number): TransactionStepVisual_NoAvailabilityLadder => {
    if (phase === 'secured') return 'done'
    if (phase === 'playing') {
      if (i < completed) return 'done'
      if (i === completed) return 'now'
      return 'pending'
    }
    return 'pending'
  }

  return (
    <Card>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Tile icon={HeartHandshake} tone={phase === 'secured' ? 'success' : 'warning'} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-bold tracking-tight text-[#0B211B]">When nobody accepts</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={phase}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="shrink-0"
                >
                  {phase === 'idle' && (
                    <Chip intent="info" className="border-transparent">
                      Replay ready
                    </Chip>
                  )}
                  {phase === 'playing' && (
                    <Chip intent="warning" dot className="border-transparent">
                      Replaying
                    </Chip>
                  )}
                  {phase === 'secured' && (
                    <Chip intent="success" icon={Check} className="border-transparent">
                      Family kept whole
                    </Chip>
                  )}
                </motion.span>
              </AnimatePresence>
            </div>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              This morning's widening ladder · replayed step by step
            </p>
          </div>
        </div>

        <div className="mt-3.5">
          <StepList
            nodeStyle="circle"
            nodeSize="lg"
            theme="light"
            activeStyle="spinner"
            steps={ladderSteps.map((step, i) => {
              const state = stateFor(i)
              return {
                key: step.title,
                icon: STEP_ICONS[i],
                state: state === 'now' ? 'active' : state,
                title: step.title,
                titleClassName: 'text-[13px]',
                body: step.body,
                bodyClassName: 'text-[11px]',
                time: step.time,
                contentClassName: i === ladderSteps.length - 1 ? 'pb-0.5' : 'pb-3.5',
                onClick: () => onStepTap(step.title, `${step.time} · ${step.body}`),
              }
            })}
          />
        </div>

        <AnimatePresence>
          {phase === 'secured' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mt-3 flex items-start gap-2.5 rounded-2xl bg-emerald-500/[0.08] px-3.5 py-3"
            >
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.4} aria-hidden />
              <p className="min-w-0 flex-1 text-[11.5px] font-semibold leading-relaxed text-emerald-700">
                Visit rebooked by 9:02 AM · refund guarantee intact · the family watched every step live.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          whileTap={phase === 'playing' ? undefined : { scale: 0.97 }}
          onClick={onPlay}
          disabled={phase === 'playing'}
          className={cn(
            'mt-3.5 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50',
            phase === 'playing'
              ? 'cursor-wait bg-[#0B211B]/[0.35]'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
          )}
        >
          {phase === 'playing' ? (
            <>
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
              Replaying ladder
            </>
          ) : phase === 'secured' ? (
            <>
              <RotateCcw className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              Replay the ladder
            </>
          ) : (
            <>
              <Play className="h-4 w-4 shrink-0 fill-current" aria-hidden />
              Replay this morning's ladder
            </>
          )}
        </motion.button>
      </div>
    </Card>
  )
}

type OfferState = 'waiting' | 'declined' | 'recheck'

type NotifyFn = (payload: {
  title: string
  body: string
  kind: 'ok' | 'warn' | 'info'
}) => void

const stateStyle: Record<OfferState, { icon: LucideIcon; tile: TileTone; intent: Intent; chip: string; live: boolean }> = {
  waiting: { icon: Hourglass, tile: 'warning', intent: 'warning', chip: 'Deciding', live: true },
  declined: { icon: Ban, tile: 'neutral', intent: 'neutral', chip: 'Re-offered', live: false },
  recheck: { icon: CheckCircle2, tile: 'info', intent: 'info', chip: 'Checking', live: true },
}

interface OfferStatusListProps {
  waiting: number
  declined: number
  recheck: number
  mmss: string
  expiresAt: string
  notify: NotifyFn
}

export function OfferStatusList({ waiting, declined, recheck, mmss, expiresAt, notify }: OfferStatusListProps) {
  const totalOffers = waiting + declined + recheck

  const countOf = (s: OfferState) =>
    s === 'waiting' ? waiting : s === 'declined' ? declined : recheck

  return (
    <motion.div variants={rise}>
      <Card>
        {dispatchOffers.map((o, i) => {
          const s = stateStyle[o.state as OfferState] ?? stateStyle.waiting
          const count = countOf(o.state as OfferState)
          return (
            <div key={o.id}>
              <Row
                icon={s.icon}
                tone={s.tile}
                title={`${count} ${o.label.replace(/^\d+ /, '')}`}
                titleClassName="text-sm"
                subtitle={o.state === 'waiting' ? `Expires ${expiresAt} · ${mmss} left` : o.detail}
                subtitleClassName="text-xs"
                body={
                  <Meter value={count / totalOffers} intent={s.intent} delay={0.2 + i * 0.1} className="mt-2 max-w-[160px]" />
                }
                chip={{ label: s.chip, intent: s.intent, dot: s.live }}
                showChevron={false}
                onClick={() =>
                  notify(
                    o.state === 'waiting'
                      ? { title: 'Offer still open', body: `${count} nurses deciding · expires ${expiresAt}`, kind: 'info' }
                      : o.state === 'declined'
                        ? { title: 'Offer declined', body: 'Nurse declined · slot re-offered in round two', kind: 'warn' }
                        : { title: 'Re-checking availability', body: 'Conflict found · availability re-verified now', kind: 'info' },
                  )
                }
              />
            </div>
          )
        })}
      </Card>
    </motion.div>
  )
}

type HeroTheme = {
  theme: (typeof PHASE_THEME)[keyof typeof PHASE_THEME]
  kicker: string
  sub: string
  chipIntent: Intent
  chipLabel: string
  chipDot: boolean
  netStrip: string
  netLabel: string
  netIcon: string
  amountFull: boolean
}

const THEMES: Record<PaymentPhase, HeroTheme> = {
  awaiting: {
    theme: PHASE_THEME.blue,
    kicker: 'text-blue-200/50',
    sub: 'text-blue-100/55',
    chipIntent: 'info',
    chipLabel: 'Awaiting sign-off',
    chipDot: false,
    netStrip: 'bg-white/[0.06]',
    netLabel: 'text-blue-100/60',
    netIcon: 'text-white/40',
    amountFull: false,
  },
  capturing: {
    theme: PHASE_THEME.amber,
    kicker: 'text-amber-200/60',
    sub: 'text-amber-100/60',
    chipIntent: 'warning',
    chipLabel: 'Capturing',
    chipDot: true,
    netStrip: 'bg-white/[0.06]',
    netLabel: 'text-amber-100/60',
    netIcon: 'text-white/50',
    amountFull: false,
  },
  captured: {
    theme: PHASE_THEME.emeraldBright,
    kicker: 'text-emerald-300/70',
    sub: 'text-emerald-100/65',
    chipIntent: 'success',
    chipLabel: 'Captured',
    chipDot: false,
    netStrip: 'bg-emerald-400/[0.12]',
    netLabel: 'text-emerald-100',
    netIcon: 'text-emerald-300',
    amountFull: true,
  },
  retrying: {
    theme: PHASE_THEME.amber,
    kicker: 'text-amber-200/60',
    sub: 'text-amber-100/60',
    chipIntent: 'warning',
    chipLabel: 'Retrying',
    chipDot: true,
    netStrip: 'bg-white/[0.06]',
    netLabel: 'text-amber-100/60',
    netIcon: 'text-white/50',
    amountFull: false,
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
    <PhaseHero theme={t.theme}>
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
    </PhaseHero>
  )
}

function RefundRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
        {label}
      </span>
      <span className="min-w-0 truncate text-right font-mono text-[12.5px] font-bold text-[#0B211B]">
        {value}
      </span>
    </div>
  )
}

interface RefundCardProps {
  onTap: (time: string, title: string, detail: string) => void
}

export function RefundCard({ onTap }: RefundCardProps) {
  return (
    <motion.div variants={rise}>
      <Card>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">
                Refund issued
              </div>
              <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                {refund.visit}
              </div>
              <div className="text-xs font-medium leading-relaxed text-[#0B211B]/55">
                {refund.visitCause}
              </div>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-sky-500/[0.1] text-sky-600">
              <Undo2 className="h-5 w-5" strokeWidth={2.2} aria-hidden />
            </span>
          </div>

          <div className="mt-3.5 flex items-baseline justify-between gap-3 rounded-2xl bg-sky-500/[0.07] px-4 py-3">
            <span className="flex min-w-0 items-baseline gap-1">
              <span className="text-[14px] font-extrabold text-sky-600/70">₹</span>
              <span className="font-mono text-[26px] font-extrabold leading-none tracking-tight text-sky-700">
                {refund.amountNum}
              </span>
            </span>
            <span className="shrink-0 text-[9px] font-extrabold uppercase tracking-[0.14em] text-sky-700/60">
              returned in full
            </span>
          </div>

          <div className="mt-3 rounded-2xl bg-[#0B211B]/[0.03] p-4">
            <RefundRow label="Reference" value={refund.id} />
            <div className="mt-2">
              <RefundRow label="Returned to" value={refund.card} />
            </div>
            <div className="mt-2">
              <RefundRow label="Reason" value={refund.reason} />
            </div>
            <div className="mt-2">
              <RefundRow label="Settled" value={refund.settled} />
            </div>
          </div>

          <div className="mt-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
              How it happened
            </div>
            <div className="mt-3">
              <StepList
                nodeStyle="circle"
                nodeSize="sm"
                theme="light"
                activeStyle="ping"
                steps={refundEvents.map((e, i) => {
                  const last = i === refundEvents.length - 1
                  return {
                    key: e.title,
                    state: 'done',
                    node: (
                      <span
                        className={cn(
                          'relative mt-1 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full',
                          last ? 'bg-sky-500' : 'bg-emerald-500',
                        )}
                      >
                        {last && <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-sky-400/50" />}
                        <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} aria-hidden />
                      </span>
                    ),
                    railClassName:
                      'bg-gradient-to-b from-emerald-500/50 via-emerald-400/25 to-emerald-300/15',
                    title: e.title,
                    time: e.time,
                    timeTrailing: true,
                    body: e.detail,
                    contentClassName: last ? '' : 'pb-5',
                    onClick: () => onTap(e.time, e.title, e.detail),
                  }
                })}
              />
            </div>
          </div>

          <Panel intent="info" className="mt-3.5 flex items-start gap-2.5 p-3.5">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" strokeWidth={2.4} aria-hidden />
            <p className="min-w-0 flex-1 text-pretty text-[11.5px] font-medium leading-relaxed text-[#0B211B]/65">
              Care that never happened never charges. The guarantee is a system rule.
            </p>
          </Panel>
        </div>
      </Card>
    </motion.div>
  )
}

interface ReversedOfferTraceCardProps {
  onEventTap: (title: string, body: string) => void
}

export function ReversedOfferTraceCard({ onEventTap }: ReversedOfferTraceCardProps) {
  return (
    <motion.div variants={rise}>
      <PhaseHero theme={{ ...PHASE_THEME.sky, shadow: 'shadow-[0_28px_64px_-30px_rgba(8,32,48,0.7)]' }}>
        <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-sky-200/50">
            <ScrollText className="h-3 w-3" aria-hidden />
            Reversal trace · 9:42 AM
          </div>
          <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
            Reversed,{' '}
            <span className="bg-gradient-to-r from-sky-300 to-blue-200 bg-clip-text text-transparent">
              nothing broken
            </span>
          </h3>
          <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-sky-100/60">
            The conflict was caught before it could touch the family or the professional's record.
          </p>

          <div className="mt-4 rounded-2xl bg-white/[0.06] p-4">
            <StepList
              nodeStyle="circle"
              nodeSize="md"
              theme="dark"
              steps={reversalEvents.map((e, i) => {
                const last = i === reversalEvents.length - 1
                return {
                  key: e.title,
                  state: 'done',
                  node: (
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sky-400/90 text-white">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                    </span>
                  ),
                  title: e.title,
                  titleWrap: true,
                  titleClassName: 'text-[13px]',
                  time: e.time,
                  timeTrailing: true,
                  timeTrailingClassName: 'text-[9px] text-sky-200/50',
                  body: e.body,
                  bodyClassName: 'text-[11px] leading-relaxed text-sky-100/60',
                  contentClassName: last ? 'pb-0.5' : undefined,
                  onClick: () => onEventTap(e.title, `${e.time} · ${e.body}`),
                }
              })}
            />
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            <div className="flex items-start gap-2.5 rounded-2xl bg-white/[0.05] px-3.5 py-3">
              <UserCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-200" aria-hidden />
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-sky-200/70">
                  What Suresh sees
                </div>
                <p className="mt-1 break-words text-[11.5px] font-medium leading-relaxed text-sky-100/70">
                  Offer reversed · no penalty · his Friday window stays intact for shorter visits.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-2xl bg-white/[0.05] px-3.5 py-3">
              <Users className="mt-0.5 h-4 w-4 shrink-0 text-sky-200" aria-hidden />
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-sky-200/70">
                  What the family sees
                </div>
                <p className="mt-1 break-words text-[11.5px] font-medium leading-relaxed text-sky-100/70">
                  New offers going out · nothing else changed · the visit time never moved.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <Chip intent="success" light className="border-transparent">No penalty applied</Chip>
            <Chip intent="info" light className="border-transparent">Re-offered round 3</Chip>
            <Chip intent="success" light className="border-transparent">Audit sealed</Chip>
          </div>
      </PhaseHero>
    </motion.div>
  )
}

interface RollbackTraceCardProps {
  failedAt: number
}

export function RollbackTraceCard({ failedAt }: RollbackTraceCardProps) {
  const undone = transactionSteps.filter((s) => s.id < failedAt).slice().reverse()

  return (
    <motion.div variants={rise}>
      <PhaseHero theme={{ ...PHASE_THEME.rose, shadow: 'shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]' }}>
        <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/50">
            <Undo2 className="h-3 w-3" aria-hidden />
            Rollback trace · complete
          </div>
          <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
            Nothing was{' '}
            <span className="bg-gradient-to-r from-rose-300 to-orange-200 bg-clip-text text-transparent">
              written
            </span>
          </h3>
          <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-rose-100/60">
            The failed write triggered an automatic unwind. Records returned to their previous state in reverse order.
          </p>

          <div className="mt-4 rounded-2xl bg-white/[0.06] p-4">
            <StepList
              nodeStyle="circle"
              nodeSize="md"
              theme="dark"
              steps={[
                ...undone.map((s, i) => ({
                  key: `${s.id}`,
                  state: 'done' as const,
                  node: (
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-400/90 text-white">
                      <Undo2 className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                    </span>
                  ),
                  title: s.undoTitle,
                  titleWrap: true,
                  titleClassName: 'text-[13px]',
                  time: `${40 + i * 80} ms`,
                  timeTrailing: true,
                  timeTrailingClassName: 'text-[9px] text-rose-200/50',
                  body: s.undoBody,
                  bodyClassName: 'text-[11px] leading-relaxed text-rose-100/60',
                })),
                {
                  key: 'attempt-logged',
                  state: 'done',
                  node: (
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400 text-white shadow-[0_0_12px_rgba(52,211,153,0.5)]">
                      <ShieldCheck className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                    </span>
                  ),
                  title: 'Attempt logged',
                  titleWrap: true,
                  titleClassName: 'text-[13px]',
                  time: 'Sealed',
                  timeTrailing: true,
                  timeTrailingClassName: 'text-[9px] text-emerald-200/60',
                  body: 'Even a rolled-back transaction leaves an immutable trace in the audit log.',
                  bodyClassName: 'text-[11px] leading-relaxed text-emerald-100/60',
                  contentClassName: 'pb-0.5',
                },
              ]}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <Chip intent="danger" light className="border-transparent">0 partial records</Chip>
            <Chip intent="success" light className="border-transparent">Audit intact</Chip>
            <Chip intent="neutral" light className="border-transparent">{transactionMeta.rollbackMs}</Chip>
          </div>
          <p className="mt-2.5 text-[10.5px] font-semibold leading-relaxed text-rose-100/40">
            The family never saw a broken booking. Screens stayed calm while the database healed itself.
          </p>
      </PhaseHero>
    </motion.div>
  )
}

const approvalTrail: { icon: LucideIcon; tone: string; title: string; body: string; detail: string; meta: string }[] = [
  {
    icon: UserRound,
    tone: 'bg-amber-400',
    title: 'Requested by the guardian',
    body: scheduleDiff.requestedVia,
    detail: 'Asked for mornings because Friday afternoons felt anxious for her father. The original request is kept word for word.',
    meta: 'Ticket t1 · 11:40 AM',
  },
  {
    icon: PhoneCall,
    tone: 'bg-sky-500',
    title: 'Verified with a call-back',
    body: `${scheduleDiff.requestedBy} confirmed the request on the registered number`,
    detail: 'Kavya called back and Priya confirmed the change in her own words before anything moved.',
    meta: 'Call · 11:52 AM',
  },
  {
    icon: Check,
    tone: 'bg-emerald-500',
    title: 'Approved and applied',
    body: `${scheduleDiff.approvedBy} · applied ${scheduleDiff.changed}`,
    detail: "The series was updated, both versions sealed, and Lakshmi's schedule refreshed instantly.",
    meta: `Effective ${scheduleDiff.effective}`,
  },
]

type DiffTheme = {
  intent: Intent
  strip: string
  tile: TileTone
  chipIntent: Intent
  chipLabel: string
  chipDot: boolean
}

const THEMES_StateDiffCard: Record<string, DiffTheme> = {
  sealed: {
    intent: 'warning',
    strip: 'from-amber-400 to-orange-400',
    tile: 'warning',
    chipIntent: 'warning',
    chipLabel: 'Changed',
    chipDot: true,
  },
  verifying: {
    intent: 'warning',
    strip: 'from-amber-400 to-orange-400',
    tile: 'warning',
    chipIntent: 'warning',
    chipLabel: 'Re-hashing',
    chipDot: true,
  },
  verified: {
    intent: 'success',
    strip: 'from-emerald-500 to-teal-400',
    tile: 'success',
    chipIntent: 'success',
    chipLabel: 'Seal verified',
    chipDot: false,
  },
}

interface StateDiffCardProps {
  verifyPhase: 'sealed' | 'verifying' | 'verified'
}

export function StateDiffCard({ verifyPhase }: StateDiffCardProps) {
  const { navigate } = useRouter()
  const [expanded, setExpanded] = useState<number | null>(null)
  const t = THEMES_StateDiffCard[verifyPhase]
  const changed = scheduleDiff.fields.filter((f) => !f.unchanged)
  const unchanged = scheduleDiff.fields.filter((f) => f.unchanged)

  return (
    <motion.div variants={rise}>
      <Card intent={t.intent}>
        <div aria-hidden className={cn('h-1 w-full bg-gradient-to-r transition-colors duration-500', t.strip)} />
        <div className="p-5">
          <div className="flex items-start gap-3.5">
            <Tile icon={FilePenLine} tone={t.tile} size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">
                  {scheduleDiff.title}
                </span>
                <Chip intent={t.chipIntent} dot={t.chipDot} className="border-transparent">
                  {t.chipLabel}
                </Chip>
              </div>
              <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                Applied {scheduleDiff.changed}
              </p>
              <p className="text-[11px] font-semibold text-[#0B211B]/40">
                Effective {scheduleDiff.effective}
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {verifyPhase === 'verified' && (
              <motion.div
                key="verified"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="mt-4 flex items-start gap-2.5 rounded-2xl bg-emerald-500/[0.08] px-3.5 py-3"
              >
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.4} aria-hidden />
                <p className="min-w-0 flex-1 text-[11.5px] font-semibold leading-relaxed text-emerald-700">
                  This change's seal was re-verified against the chain. Both versions are intact.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <Panel intent={t.intent} className="mt-4 p-4">
            <div className="flex items-center justify-between gap-2">
              <Overline>What changed</Overline>
              <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-[#0B211B]/50">
                {changed.length} field{changed.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-2.5">
              {changed.map((f) => (
                <div key={f.label} className="rounded-2xl bg-white p-3.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
                    <FilePenLine className="h-3 w-3" aria-hidden />
                    {f.label}
                  </div>
                  <div className="mt-2.5 grid grid-cols-[1fr_auto_1fr] items-stretch gap-2">
                    <div className="rounded-xl bg-rose-500/[0.06] px-3 py-2.5">
                      <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-rose-500/80">
                        Before
                      </div>
                      <div className="mt-1 break-words text-[14px] font-extrabold tabular-nums leading-none text-rose-600 line-through decoration-rose-300">
                        {f.from}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <ArrowRight className="h-4 w-4 text-emerald-600" strokeWidth={2.6} aria-hidden />
                    </div>
                    <div className="rounded-xl bg-emerald-500/[0.08] px-3 py-2.5">
                      <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-600">
                        Now
                      </div>
                      <div className="mt-1 break-words text-[14px] font-extrabold tabular-nums leading-none text-emerald-700">
                        {f.to}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel intent="neutral" className="mt-3 p-4">
            <Overline icon={ShieldCheck}>Deliberately untouched</Overline>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {unchanged.map((f) => (
                <div key={f.label} className="rounded-2xl bg-white p-3">
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
                    <CalendarCheck className="h-3 w-3 shrink-0" aria-hidden />
                    <span className="truncate">{f.label}</span>
                  </div>
                  <div className="mt-1 truncate text-[13px] font-extrabold tabular-nums text-[#0B211B]" title={f.from}>
                    {f.from}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] font-medium leading-relaxed text-[#0B211B]/50">
              The diff records what stayed the same with the same care as what moved.
            </p>
          </Panel>

          <Panel intent="neutral" className="mt-3 p-4">
            <Overline>Approval trail</Overline>
            <StepList
              className="mt-4"
              nodeStyle="circle"
              nodeSize="md"
              theme="light"
              railClassName="bg-[#0B211B]/10"
              steps={approvalTrail.map((step, i) => {
                const last = i === approvalTrail.length - 1
                const Icon = step.icon
                const open = expanded === i
                return {
                  key: step.title,
                  state: 'done',
                  node: (
                    <span className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-full text-white', step.tone)}>
                      <Icon className="h-3 w-3" strokeWidth={3} aria-hidden />
                    </span>
                  ),
                  title: step.title,
                  titleWrap: true,
                  titleClassName: 'text-[13px]',
                  trailingTitle: (
                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0 self-center"
                    >
                      <ChevronDown className="h-4 w-4 text-[#0B211B]/30" aria-hidden />
                    </motion.span>
                  ),
                  body: step.body,
                  bodyClassName: 'text-[11px] leading-relaxed',
                  contentClassName: last ? 'pb-0.5' : undefined,
                  expandable: true,
                  open,
                  onToggle: () => setExpanded(open ? null : i),
                  expansion: (
                    <div className="mt-2.5 rounded-xl bg-amber-500/[0.08] p-3">
                      <p className="break-words text-[11.5px] font-medium leading-relaxed text-[#0B211B]/80">
                        {step.detail}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-[#0B211B]/40">
                        <Check className="h-3 w-3 shrink-0 text-emerald-600" strokeWidth={3} aria-hidden />
                        {step.meta}
                      </div>
                    </div>
                  ),
                }
              })}
            />
          </Panel>

          <Row
            icon={Ticket}
            tone="warning"
            tileSize="sm"
            title="Open ticket t1 in support"
            subtitle="The conversation that started this change"
            trailing={
              <ChevronRight
                className="h-4 w-4 shrink-0 text-[#0B211B]/25 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600"
                aria-hidden
              />
            }
            showChevron={false}
            surface="none"
            padding="none"
            className="rounded-2xl bg-[#0B211B]/[0.04]"
            hoverClassName="hover:bg-[#0B211B]/[0.07]"
            onClick={() => navigate('/patient/p25')}
          />

          <div
            className={cn(
              'mt-3.5 flex items-start gap-2.5 rounded-2xl px-3.5 py-3 transition-colors duration-500',
              verifyPhase === 'verified' ? 'bg-emerald-500/[0.08]' : 'bg-amber-500/[0.1]',
            )}
          >
            <Scale className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" strokeWidth={2.4} aria-hidden />
            <p
              className={cn(
                'min-w-0 flex-1 text-[11.5px] font-semibold leading-relaxed transition-colors duration-500',
                verifyPhase === 'verified' ? 'text-emerald-700' : 'text-amber-700',
              )}
            >
              {scheduleDiff.outcome}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

const TOTAL_WRITES = 4

type HeroTheme_TransactionHero = {
  theme: (typeof PHASE_THEME)[keyof typeof PHASE_THEME]
  kicker: string
  gradient: string
  sub: string
  meta: string
  label: string
  count: string
  chipIntent: Intent
  chipLabel: string
  chipDot: boolean
  meterIntent: Intent
  statDot: string
  statLabel: string
  chips: { intent: Intent; label: string }[]
}

const THEMES_TransactionHero: Record<TransactionPhase, HeroTheme_TransactionHero> = {
  idle: {
    theme: PHASE_THEME.emerald,
    kicker: 'text-emerald-200/50',
    gradient: 'from-emerald-300 to-teal-200',
    sub: 'text-emerald-100/55',
    meta: 'text-emerald-100/55',
    label: 'text-emerald-100/45',
    count: 'text-emerald-100/70',
    chipIntent: 'info',
    chipLabel: 'Ready',
    chipDot: false,
    meterIntent: 'info',
    statDot: 'bg-teal-300',
    statLabel: 'text-emerald-100/45',
    chips: [
      { intent: 'info', label: 'Atomic write' },
      { intent: 'success', label: 'Sealed on commit' },
    ],
  },
  running: {
    theme: PHASE_THEME.amber,
    kicker: 'text-amber-200/60',
    gradient: 'from-amber-200 to-orange-200',
    sub: 'text-amber-100/60',
    meta: 'text-amber-100/60',
    label: 'text-amber-100/50',
    count: 'text-amber-100/80',
    chipIntent: 'warning',
    chipLabel: 'Writing',
    chipDot: true,
    meterIntent: 'warning',
    statDot: 'bg-amber-300',
    statLabel: 'text-amber-100/50',
    chips: [
      { intent: 'warning', label: 'Atomic' },
      { intent: 'warning', label: 'Isolated' },
    ],
  },
  committed: {
    theme: PHASE_THEME.emeraldBright,
    kicker: 'text-emerald-300/70',
    gradient: 'from-emerald-300 to-teal-200',
    sub: 'text-emerald-100/65',
    meta: 'text-emerald-100/60',
    label: 'text-emerald-100/50',
    count: 'text-emerald-200/80',
    chipIntent: 'success',
    chipLabel: 'Committed',
    chipDot: false,
    meterIntent: 'success',
    statDot: 'bg-emerald-300',
    statLabel: 'text-emerald-100/50',
    chips: [
      { intent: 'success', label: 'Series live' },
      { intent: 'success', label: 'Offers emitted' },
    ],
  },
  failing: {
    theme: PHASE_THEME.rose,
    kicker: 'text-rose-200/60',
    gradient: 'from-rose-300 to-orange-200',
    sub: 'text-rose-100/60',
    meta: 'text-rose-100/55',
    label: 'text-rose-100/50',
    count: 'text-rose-100/70',
    chipIntent: 'danger',
    chipLabel: 'Failed',
    chipDot: false,
    meterIntent: 'danger',
    statDot: 'bg-rose-300/80',
    statLabel: 'text-rose-100/50',
    chips: [
      { intent: 'danger', label: 'Rollback armed' },
      { intent: 'warning', label: 'Nothing partial' },
    ],
  },
  'rolling-back': {
    theme: PHASE_THEME.rose,
    kicker: 'text-rose-200/60',
    gradient: 'from-rose-300 to-orange-200',
    sub: 'text-rose-100/60',
    meta: 'text-rose-100/55',
    label: 'text-rose-100/50',
    count: 'text-rose-100/70',
    chipIntent: 'danger',
    chipLabel: 'Rolling back',
    chipDot: true,
    meterIntent: 'danger',
    statDot: 'bg-rose-300/80',
    statLabel: 'text-rose-100/50',
    chips: [
      { intent: 'danger', label: 'Reversing in order' },
      { intent: 'warning', label: '0 partial records' },
    ],
  },
  'rolled-back': {
    theme: PHASE_THEME.rose,
    kicker: 'text-rose-200/50',
    gradient: 'from-rose-300 to-orange-200',
    sub: 'text-rose-100/60',
    meta: 'text-rose-100/55',
    label: 'text-rose-100/45',
    count: 'text-rose-100/60',
    chipIntent: 'danger',
    chipLabel: 'Rolled back',
    chipDot: false,
    meterIntent: 'danger',
    statDot: 'bg-rose-300/80',
    statLabel: 'text-rose-100/45',
    chips: [
      { intent: 'danger', label: '0 partial records' },
      { intent: 'success', label: 'Attempt logged' },
    ],
  },
}

const HEADLINES: Record<TransactionPhase, { pre: string; accent: string }> = {
  idle: { pre: 'One booking,', accent: 'one safe write' },
  running: { pre: 'Writing', accent: 'the whole booking' },
  committed: { pre: 'Committed —', accent: 'nothing half-written' },
  failing: { pre: 'A write', accent: 'failed' },
  'rolling-back': { pre: 'Rolling it', accent: 'all the way back' },
  'rolled-back': { pre: 'Nothing was', accent: 'written' },
}

const SUBS: Record<TransactionPhase, string> = {
  idle: 'Watch a recurring booking commit as one atomic write — or break it on purpose.',
  running: 'Records are landing in order. The family sees nothing yet.',
  committed: 'Booking, series, sessions and audit sealed together. Offers are on their way.',
  failing: '',
  'rolling-back': 'Completed writes are reversing in order. Partial states are impossible.',
  'rolled-back': 'Every write reversed cleanly. The attempt itself is logged forever.',
}

interface TransactionHeroProps {
  phase: TransactionPhase
  doneWrites: number
  failedStep: number
}

export function TransactionHero({ phase, doneWrites, failedStep }: TransactionHeroProps) {
  const t = THEMES_TransactionHero[phase]
  const headline = HEADLINES[phase]
  const outcome =
    phase === 'committed'
      ? transactionMeta.commitMs
      : phase === 'rolled-back'
        ? transactionMeta.rollbackMs
        : '—'

  return (
    <PhaseHero theme={t.theme}>
      <div className="flex items-center justify-between gap-3">
        <div className={cn('flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] transition-colors duration-500', t.kicker)}>
          Transaction {transactionMeta.id} · {transactionMeta.startedAt}
        </div>
        <Chip intent={t.chipIntent} light dot={t.chipDot} className="border-transparent">
          {t.chipLabel}
        </Chip>
      </div>

      <h2 className="mt-2 text-[19px] font-extrabold leading-snug tracking-tight text-white">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={phase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="inline"
          >
            {headline.pre}{' '}
            <span
              className={cn(
                'bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500',
                t.gradient,
              )}
            >
              {headline.accent}
            </span>
          </motion.span>
        </AnimatePresence>
      </h2>

      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={phase}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className={cn('mt-1 text-[12px] font-medium leading-relaxed transition-colors duration-500', t.sub)}
        >
          {phase === 'failing'
            ? `Step ${failedStep} was rejected mid-transaction. Watch the unwind.`
            : SUBS[phase]}
        </motion.p>
      </AnimatePresence>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[13px] font-bold tracking-tight text-white">{transactionMeta.patient}</div>
          <div className={cn('mt-0.5 text-[11px] font-medium transition-colors duration-500', t.meta)}>
            {transactionMeta.careType}
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
          <Chip intent="neutral" light className="border-transparent">{transactionMeta.visitCount}</Chip>
          <Chip intent="neutral" light className="border-transparent">{transactionMeta.amount}</Chip>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-2">
          <span className={cn('text-[9px] font-extrabold uppercase tracking-[0.18em] transition-colors duration-500', t.label)}>
            Sealed writes
          </span>
          <span className={cn('text-[10px] font-extrabold tabular-nums transition-colors duration-500', t.count)}>
            {doneWrites}/{TOTAL_WRITES}
          </span>
        </div>
        <Meter value={doneWrites / TOTAL_WRITES} intent={t.meterIntent} className="mt-2 bg-white/10" />
      </div>

      <StatStrip
        className="mt-5"
        cells={[
          { key: 'writes', value: doneWrites, label: 'Writes', dot: cn('transition-colors duration-500', t.statDot), labelClassName: cn('transition-colors duration-500', t.statLabel) },
          { key: 'partial', value: 0, label: 'Partial', dot: 'bg-emerald-300', labelClassName: cn('transition-colors duration-500', t.statLabel) },
          { key: 'took', value: outcome, label: 'Took', dot: cn('transition-colors duration-500', phase === 'rolled-back' ? 'bg-rose-300/80' : t.statDot), labelClassName: cn('transition-colors duration-500', t.statLabel) },
        ]}
      />

      <div className="mt-4 flex flex-wrap gap-1.5">
        {t.chips.map((c) => (
          <Chip key={c.label} intent={c.intent} light className="border-transparent">
            {c.label}
          </Chip>
        ))}
      </div>
    </PhaseHero>
  )
}

const ICONS: Record<string, LucideIcon> = {
  booking: CalendarPlus,
  series: Repeat,
  sessions: CalendarCheck,
  audit: ScrollText,
  dispatch: Send,
}

const STATE_TILE: Record<StepVisual, TileTone> = {
  pending: 'neutral',
  writing: 'info',
  done: 'success',
  failed: 'danger',
  undone: 'neutral',
}

const BODY_BY_STATE: Record<StepVisual, (step: TransactionStep) => string> = {
  pending: (s) => s.body,
  writing: (s) => `Writing to ${s.table}`,
  done: (s) => s.body,
  failed: (s) => `Write to ${s.table} was rejected`,
  undone: (s) => s.undoBody,
}

const POST_BODY: Record<PostCommitState, string> = {
  pending: 'Waits for the commit before sending',
  emitting: 'Emitting offers to five licensed nurses',
  done: postCommitStep.body,
  failed: 'Delivery failed · retry ladder active',
}

function StateChip({ state }: { state: StepVisual }) {
  if (state === 'done')
    return (
      <Chip intent="success" icon={Check} className="border-transparent">
        Sealed
      </Chip>
    )
  if (state === 'writing')
    return (
      <Chip intent="live" dot className="border-transparent">
        Writing
      </Chip>
    )
  if (state === 'failed')
    return (
      <Chip intent="danger" icon={AlertTriangle} className="border-transparent">
        Failed
      </Chip>
    )
  if (state === 'undone')
    return (
      <Chip intent="neutral" icon={Undo2} className="border-transparent">
        Undone
      </Chip>
    )
  return (
    <Chip intent="info" className="border-transparent">
      Queued
    </Chip>
  )
}

function PostCommitChip({ state }: { state: PostCommitState }) {
  if (state === 'done')
    return (
      <Chip intent="success" icon={Check} className="border-transparent">
        Emitted
      </Chip>
    )
  if (state === 'emitting')
    return (
      <Chip intent="live" dot className="border-transparent">
        Emitting
      </Chip>
    )
  if (state === 'failed')
    return (
      <Chip intent="warning" icon={AlertTriangle} className="border-transparent">
        Retrying
      </Chip>
    )
  return (
    <Chip intent="info" className="border-transparent">
      Waiting
    </Chip>
  )
}

interface TransactionStepListProps {
  stepStates: StepVisual[]
  postCommitState: PostCommitState
  onStepTap: (step: TransactionStep, state: StepVisual) => void
  onPostCommitTap: () => void
}

function MonoTable({ children }: { children: string }) {
  return (
    <span className="font-mono text-[9px] font-bold uppercase tracking-wide text-[#0B211B]/35">
      {children}
    </span>
  )
}

export function TransactionStepList({
  stepStates,
  postCommitState,
  onStepTap,
  onPostCommitTap,
}: TransactionStepListProps) {
  return (
    <Card>
      {transactionSteps.map((step, i) => {
        const state = stepStates[i]
        const Icon = ICONS[step.icon]
        return (
          <div key={step.id}>
            <Row
              align="start"
              padding="px-4 py-3.5"
              leading={
                <span className="relative shrink-0">
                  <Tile icon={Icon} tone={STATE_TILE[state]} />
                  {state === 'writing' && <LiveDot className="absolute -right-1 -top-1 text-sky-500" />}
                </span>
              }
              title={step.title}
              titleClassName={cn(
                'text-[13.5px]',
                state === 'undone' && 'text-[#0B211B]/35 line-through decoration-[#0B211B]/25',
              )}
              onClick={() => onStepTap(step, state)}
              hoverClassName=""
              showChevron={false}
              body={
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={state}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="mt-0.5 block text-[11px] font-medium leading-snug text-[#0B211B]/55"
                  >
                    {BODY_BY_STATE[state](step)}
                  </motion.span>
                </AnimatePresence>
              }
              trailing={
                <span className="flex shrink-0 flex-col items-end gap-1.5">
                  <StateChip state={state} />
                  <MonoTable>{step.table}</MonoTable>
                </span>
              }
            />
          </div>
        )
      })}

      <div className="flex items-center gap-2.5 px-4 pt-3.5">
        <span aria-hidden className="h-px flex-1 bg-[#0B211B]/[0.05]" />
        <Chip intent="info" icon={Send} className="border-transparent">
          After commit
        </Chip>
        <span aria-hidden className="h-px flex-1 bg-[#0B211B]/[0.05]" />
      </div>

      <Row
        align="start"
        padding="px-4 py-3.5"
        icon={Send}
        tone={
          postCommitState === 'done'
            ? 'success'
            : postCommitState === 'failed'
              ? 'warning'
              : postCommitState === 'emitting'
                ? 'info'
                : 'neutral'
        }
        title={postCommitStep.title}
        titleClassName="text-[13.5px]"
        onClick={onPostCommitTap}
        hoverClassName=""
        showChevron={false}
        body={
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={postCommitState}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="mt-0.5 block text-[11px] font-medium leading-snug text-[#0B211B]/55"
            >
              {POST_BODY[postCommitState]}
            </motion.span>
          </AnimatePresence>
        }
        trailing={
          <span className="flex shrink-0 flex-col items-end gap-1.5">
            <PostCommitChip state={postCommitState} />
            <MonoTable>{postCommitStep.table}</MonoTable>
          </span>
        }
      />
    </Card>
  )
}

