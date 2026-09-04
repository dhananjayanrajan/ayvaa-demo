import { useState } from 'react'
import { motion } from 'motion/react'
import { AlertTriangle, Check, ChevronDown, Clock, Inbox, Lock, ScrollText, ShieldCheck, UserCheck, X } from 'lucide-react'
import AgentAvatar from '@/components/base/smoothui/agent-avatar'
import type { Intent } from '@/components/base/phone/kit'
import { Card, Chip, Expand, Meter, Tile, rise } from '@/components/base/phone/kit'
import { StepList } from '@/components/base/phone/step-list'
import type { PhaseHeroKey, PhaseHeroTheme } from '@/components/base/phone/phase-hero'
import { PHASE_THEME, PhaseHero } from '@/components/base/phone/phase-hero'
import type { Approval } from '@/data/types'
import { cn } from '@/lib/utils'
import AILoader from '@/components/base/smoothui/ai-loader'
import { EmptyState } from '@/components/base/phone/empty-state'

const checkMeta: Record<string, { chip: string; intent: Intent; dot: boolean; sub: string }> = {
  ok: { chip: 'Verified', intent: 'success', dot: false, sub: 'Evidence attached to file' },
  running: { chip: 'Running', intent: 'warning', dot: true, sub: 'System checking right now' },
  pending: { chip: 'Pending', intent: 'neutral', dot: false, sub: 'Awaiting manual input' },
}

interface ApprovalCardProps {
  a: Approval
  onDecide: (id: string, approve: boolean) => void
  decision?: 'approved' | 'rejected'
}

export function ApprovalCard({ a, onDecide, decision }: ApprovalCardProps) {
  const [open, setOpen] = useState(true)

  const isApproved = decision === 'approved'
  const isRejected = decision === 'rejected'
  const isUrgent = a.urgent && !decision

  const displayChecks = a.checks.map((c) => {
    if (isRejected) return { ...c, state: 'pending' as const }
    if (isUrgent && c.state === 'ok' && a.checks.every((x) => x.state === 'ok'))
      return { ...c, state: 'running' as const }
    return c
  })

  const verified = displayChecks.filter((c) => c.state === 'ok').length
  const running = displayChecks.some((c) => c.state === 'running')
  const progress = displayChecks.length ? verified / displayChecks.length : 0

  const theme = isApproved
    ? {
        kicker: 'text-emerald-300',
        sub: 'text-emerald-100/90',
        panel: 'bg-emerald-400/[0.08]',
        label: 'text-emerald-100',
        value: 'text-white',
        meterIntent: 'success' as Intent,
        accentBg: 'bg-emerald-400',
        accentText: 'text-emerald-300',
        accentSoft: 'bg-emerald-400/20',
        footerBg: 'bg-emerald-500/[0.12]',
        footerIconClass: 'text-emerald-300',
        footerIcon: Check,
      }
    : isRejected
      ? {
          kicker: 'text-rose-200',
          sub: 'text-rose-100/90',
          panel: 'bg-rose-400/[0.1]',
          label: 'text-rose-100',
          value: 'text-white',
          meterIntent: 'danger' as Intent,
          accentBg: 'bg-rose-400',
          accentText: 'text-rose-300',
          accentSoft: 'bg-rose-400/20',
          footerBg: 'bg-rose-500/[0.12]',
          footerIconClass: 'text-rose-300',
          footerIcon: X,
        }
      : isUrgent
        ? {
            kicker: 'text-amber-200',
            sub: 'text-amber-100/90',
            panel: 'bg-amber-400/[0.08]',
            label: 'text-amber-100',
            value: 'text-white',
            meterIntent: 'warning' as Intent,
            accentBg: 'bg-amber-400',
            accentText: 'text-amber-300',
            accentSoft: 'bg-amber-400/20',
            footerBg: '',
            footerIconClass: '',
            footerIcon: null,
          }
        : {
            kicker: 'text-slate-200',
            sub: 'text-slate-100/90',
            panel: 'bg-white/[0.06]',
            label: 'text-slate-100',
            value: 'text-white',
            meterIntent: 'success' as Intent,
            accentBg: 'bg-slate-400',
            accentText: 'text-slate-300',
            accentSoft: 'bg-slate-400/20',
            footerBg: '',
            footerIconClass: '',
            footerIcon: null,
          }

  const phaseKey: PhaseHeroKey = isApproved ? 'emeraldBright' : isRejected ? 'rose' : isUrgent ? 'amber' : 'slate'
  const shellTheme: PhaseHeroTheme = {
    ...PHASE_THEME[phaseKey],
    ...(isApproved ? { orbA: 'bg-emerald-500/30', orbB: 'bg-teal-400/20' } : {}),
    shadow: isApproved
      ? 'shadow-[0_28px_64px_-30px_rgba(5,150,105,0.6)]'
      : isRejected
        ? 'shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]'
        : isUrgent
          ? 'shadow-[0_28px_64px_-30px_rgba(60,40,10,0.7)]'
          : 'shadow-[0_28px_64px_-30px_rgba(15,23,42,0.7)]',
  }

  const FooterIcon = theme.footerIcon

  return (
    <motion.div variants={rise}>
      <PhaseHero theme={shellTheme} className="transition-all duration-500">
        <div className="relative p-5">
          <div className="flex items-start gap-3">
            <AgentAvatar seed={a.name} size={52} />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sm font-extrabold leading-snug tracking-tight text-white">{a.name}</span>
                {a.urgent && !decision && (
                  <Chip intent="warning" light dot>
                    {a.waiting}
                  </Chip>
                )}
                {decision && (
                  <Chip intent={decision === 'approved' ? 'success' : 'danger'} light icon={decision === 'approved' ? Check : X}>
                    {decision === 'approved' ? 'Approved' : 'Rejected'}
                  </Chip>
                )}
              </div>
              <p className={cn('mt-0.5 text-xs font-medium leading-relaxed', theme.sub)}>
                {a.role} · licence {a.licence}
              </p>
              <p className={cn('text-[11px] font-semibold opacity-70', theme.sub)}>Applied {a.applied}</p>
            </div>
          </div>

          <div className={cn('mt-3 rounded-2xl p-4 transition-colors duration-500', theme.panel)}>
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-2 text-left"
            >
              <span className={cn('flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em]', theme.label)}>
                <ShieldCheck className="h-3 w-3" aria-hidden />
                Auto verification
              </span>
              <div className="flex items-center gap-2">
                <span className={cn('shrink-0 text-[10px] font-extrabold tabular-nums', theme.label)}>
                  {verified}/{displayChecks.length}
                </span>
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex">
                  <ChevronDown className={cn('h-3.5 w-3.5', theme.sub)} aria-hidden />
                </motion.span>
              </div>
            </button>

            <Expand open={open}>
              <motion.div initial={false} animate={{ opacity: open ? 1 : 0 }} className="pt-3">
                <Meter value={progress} intent={running ? 'warning' : theme.meterIntent} delay={0.2} className="mt-2.5" />

                <div className="mt-4 flex flex-col">
                  <StepList
                    nodeStyle="circle"
                    nodeSize="md"
                    theme="dark"
                    railClassName={theme.accentSoft}
                    steps={displayChecks.map((c, i) => {
                      const meta = checkMeta[c.state] ?? checkMeta.pending
                      const last = i === displayChecks.length - 1

                      const circleClass =
                        c.state === 'ok'
                          ? `${theme.accentBg} text-emerald-950`
                          : c.state === 'running'
                            ? theme.accentBg
                            : 'bg-white/20 text-white/60'

                      return {
                        key: c.label,
                        state: c.state === 'ok' ? 'done' : c.state === 'running' ? 'active' : 'pending',
                        node: (
                          <span className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-full', circleClass)}>
                            {c.state === 'ok' ? (
                              <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                            ) : c.state === 'running' ? (
                              <span className="relative flex h-2 w-2">
                                <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-60', theme.accentBg)} />
                                <span className={cn('relative inline-flex h-2 w-2 rounded-full', theme.accentBg)} />
                              </span>
                            ) : (
                              <span className="h-2 w-2 rounded-full bg-current" />
                            )}
                          </span>
                        ),
                        title: c.label,
                        titleClassName: 'text-[13px] leading-snug tracking-tight',
                        body: meta.sub,
                        bodyClassName: cn('text-[11px] font-semibold', theme.sub),
                        trailingTitle: (
                          <span className="pt-1">
                            <Chip intent={meta.intent} light dot={meta.dot}>
                              {meta.chip}
                            </Chip>
                          </span>
                        ),
                        contentClassName: last ? 'pt-1' : 'pt-1 pb-4',
                      }
                    })}
                  />
                </div>
              </motion.div>
            </Expand>
          </div>

          {a.history && (
            <div className={cn('mt-3 rounded-2xl p-3.5 transition-colors duration-500', theme.panel)}>
              <span className={cn('flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em]', theme.label)}>
                <AlertTriangle className="h-3 w-3" aria-hidden />
                Prior history
              </span>
              <p className={cn('mt-1.5 text-pretty text-[12.5px] font-medium leading-relaxed', theme.sub)}>
                {a.history}
              </p>
            </div>
          )}

          {a.note && (
            <div className={cn('mt-3 rounded-2xl p-3.5 transition-colors duration-500', theme.panel)}>
              <span className={cn('flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em]', theme.label)}>
                <ScrollText className="h-3 w-3" aria-hidden />
                Reviewer note
              </span>
              <p className={cn('mt-1.5 text-pretty text-[12.5px] font-medium leading-relaxed', theme.value)}>
                {a.note}
              </p>
            </div>
          )}

          {isRejected && (
            <div className={cn('mt-3 rounded-2xl p-3.5 transition-colors duration-500', theme.panel)}>
              <span className={cn('flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em]', theme.label)}>
                <X className="h-3 w-3" aria-hidden />
                Rejection reason
              </span>
              <p className={cn('mt-1.5 text-pretty text-[12.5px] font-medium leading-relaxed', theme.sub)}>
                Written reason required · decision recorded
              </p>
            </div>
          )}

          <div className={cn('mt-4 flex items-center gap-1.5 text-[10px] font-bold', theme.sub)}>
            <Lock className="h-3 w-3" aria-hidden />
            Evidence sealed with the decision
          </div>

          {decision ? (
            <div className={cn('mt-4 flex items-center justify-center gap-2 rounded-xl px-4 py-3', theme.footerBg)}>
              {FooterIcon && <FooterIcon className={cn('h-3.5 w-3.5', theme.footerIconClass)} strokeWidth={3} aria-hidden />}
              <span className={cn('text-[11px] font-bold', theme.value)}>
                Decision recorded · audit log updated
              </span>
            </div>
          ) : (
            <div className="mt-4 flex gap-2.5">
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => onDecide(a.id, false)}
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(225,29,72,0.6)] transition-all duration-200 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60"
                aria-label={`Reject ${a.name}`}
              >
                <X className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Reject</span>
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => onDecide(a.id, true)}
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-all duration-200 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                aria-label={`Approve ${a.name}`}
              >
                <UserCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Approve</span>
              </motion.button>
            </div>
          )}
        </div>
      </PhaseHero>
    </motion.div>
  )
}

interface CheckTileProps {
  state: string
  className?: string
}

export function CheckTile({ state, className }: CheckTileProps) {
  if (state === 'running') {
    return (
      <span className={cn(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/[0.14] text-amber-600 ring-4 ring-amber-500/10',
        className,
      )}>
        <AILoader variant="dots" className="h-4 w-4" />
      </span>
    )
  }
  if (state === 'ok') {
    return <Tile icon={Check} tone="success" size="sm" className={cn('h-9 w-9 rounded-xl', className)} />
  }
  return <Tile icon={Clock} tone="neutral" size="sm" className={cn('h-9 w-9 rounded-xl', className)} />
}

interface EmptyFilterStateProps {
  filter: string
}

export function EmptyFilterState({ filter }: EmptyFilterStateProps) {
  const label =
    filter === 'approved' ? 'No approved decisions' :
    filter === 'rejected' ? 'No rejected decisions' :
    'Nothing pending'

  return (
    <motion.div variants={rise}>
      <Card className="p-4">
        <EmptyState
          container="dashed"
          icon={Inbox}
          tone="emerald"
          badge="round"
          size="md"
          title={label}
          titleClassName="text-[13.5px] font-bold tracking-tight text-[#0B211B]/70"
          body="Every decision lands in the audit log"
          bodyClassName="text-xs leading-relaxed text-[#0B211B]/45"
          chip="Nothing pending"
          chipIntent="success"
        />
      </Card>
    </motion.div>
  )
}
