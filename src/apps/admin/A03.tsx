import { useState } from 'react'
import { motion } from 'motion/react'
import { AlertTriangle, Check, Clock, Gavel, Inbox, Lock, ScrollText, ShieldCheck, UserCheck, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import AILoader from '@/components/smoothui/ai-loader'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import {
  Card,
  Chip,
  Hero,
  Kicker,
  Meter,
  Panel,
  Section,
  Tile,
  rise,
  stagger,
} from '@/components/phone/kit'
import type { Intent } from '@/components/phone/kit'
import { approvals } from '@/data/seed'
import type { Approval } from '@/data/types'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

const filters = [
  { id: 'awaiting', label: 'Awaiting' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' },
]

const checkMeta: Record<string, { chip: string; intent: Intent; dot: boolean; sub: string }> = {
  ok: { chip: 'Verified', intent: 'success', dot: false, sub: 'Evidence attached to file' },
  running: { chip: 'Running', intent: 'warning', dot: true, sub: 'System checking right now' },
  pending: { chip: 'Pending', intent: 'neutral', dot: false, sub: 'Awaiting manual input' },
}

const governance: { icon: LucideIcon; text: string }[] = [
  { icon: Gavel, text: 'Who decided, when, on what evidence' },
  { icon: ScrollText, text: 'Rejections require a written reason' },
  { icon: Lock, text: 'Instantly written to the audit log' },
]

function Overline({ icon: Icon, children }: { icon?: LucideIcon; children: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">
      {Icon && <Icon className="h-3 w-3" strokeWidth={2.5} aria-hidden />}
      <span>{children}</span>
    </div>
  )
}

function FilterBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-[#0B211B]/[0.06] p-1" role="tablist">
      {filters.map((f) => {
        const active = value === f.id
        return (
          <motion.button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={active}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(f.id)}
            className="relative flex-1 rounded-full py-2.5"
          >
            {active && (
              <motion.span
                layoutId="a03-filter"
                transition={{ type: 'spring', stiffness: 480, damping: 38 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_8px_18px_-8px_rgba(16,185,129,0.7)]"
              />
            )}
            <span
              className={cn(
                'relative block truncate text-[10px] font-extrabold uppercase tracking-[0.08em]',
                active ? 'text-white' : 'text-[#0B211B]/45',
              )}
            >
              {f.label}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}

function CheckTile({ state }: { state: string }) {
  if (state === 'running') {
    return (
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/[0.14] text-amber-600 ring-4 ring-amber-500/10">
        <AILoader variant="dots" className="h-4 w-4" />
      </span>
    )
  }
  if (state === 'ok') return <Tile icon={Check} tone="success" size="sm" className="h-9 w-9 rounded-xl" />
  return <Tile icon={Clock} tone="neutral" size="sm" className="h-9 w-9 rounded-xl" />
}

function ApprovalCard({ a, onDecide }: { a: Approval; onDecide: (id: string, approve: boolean) => void }) {
  const verified = a.checks.filter((c) => c.state === 'ok').length
  const running = a.checks.some((c) => c.state === 'running')
  const progress = a.checks.length ? verified / a.checks.length : 0

  return (
    <Card>
      <div
        aria-hidden
        className={cn('h-1 w-full bg-gradient-to-r', a.urgent ? 'from-amber-400 to-orange-400' : 'from-emerald-500 to-teal-400')}
      />
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <AgentAvatar seed={a.name} size={52} />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">{a.name}</span>
              {a.urgent && <Chip intent="warning" dot>{a.waiting}</Chip>}
            </div>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              {a.role} · licence {a.licence}
            </p>
            <p className="text-[11px] font-semibold text-[#0B211B]/40">Applied {a.applied}</p>
          </div>
        </div>

        <Panel intent="neutral" className="mt-4 p-4">
          <div className="flex items-center justify-between gap-2">
            <Overline icon={ShieldCheck}>Auto verification</Overline>
            <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-[#0B211B]/50">
              {verified}/{a.checks.length}
            </span>
          </div>
          <Meter value={progress} intent={running ? 'warning' : 'success'} delay={0.2} className="mt-2.5" />

          <div className="mt-4 flex flex-col">
            {a.checks.map((c, i) => {
              const meta = checkMeta[c.state] ?? checkMeta.pending
              const last = i === a.checks.length - 1
              return (
                <div key={c.label} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <CheckTile state={c.state} />
                    {!last && <span aria-hidden className="my-1 w-px flex-1 bg-[#0B211B]/10" />}
                  </div>
                  <div className={cn('min-w-0 flex-1 pt-1', !last && 'pb-4')}>
                    <div className="text-[13px] font-bold leading-snug tracking-tight text-[#0B211B]">{c.label}</div>
                    <div className="mt-0.5 text-[11px] font-semibold text-[#0B211B]/45">{meta.sub}</div>
                  </div>
                  <span className="shrink-0 pt-1">
                    <Chip intent={meta.intent} dot={meta.dot}>
                      {meta.chip}
                    </Chip>
                  </span>
                </div>
              )
            })}
          </div>
        </Panel>

        {a.history && (
          <Panel intent="warning" className="mt-3 p-3.5">
            <Overline icon={AlertTriangle}>Prior history</Overline>
            <p className="mt-1.5 text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/75">{a.history}</p>
          </Panel>
        )}

        {a.note && (
          <Panel intent="neutral" className="mt-3 p-3.5">
            <Overline icon={ScrollText}>Reviewer note</Overline>
            <p className="mt-1.5 text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/75">{a.note}</p>
          </Panel>
        )}

        <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-[#0B211B]/40">
          <Lock className="h-3 w-3" aria-hidden />
          Evidence sealed with the decision
        </div>

        <div className="mt-3.5 flex gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => onDecide(a.id, false)}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/70"
          >
            <X className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Reject</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => onDecide(a.id, true)}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <UserCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Approve</span>
          </motion.button>
        </div>
      </div>
    </Card>
  )
}

export function A03() {
  const { notify } = useDemo()
  const [filter, setFilter] = useState('awaiting')
  const [list, setList] = useState<Approval[]>(approvals)

  const decide = (id: string, approve: boolean) => {
    setList((prev) => prev.filter((a) => a.id !== id))
    notify(
      approve
        ? { title: 'Professional approved', body: 'Decision recorded with your name and evidence', kind: 'ok' }
        : { title: 'Professional rejected', body: 'Written reason required · decision recorded', kind: 'warn' },
    )
  }

  return (
    <Screen>
      <AppBar
        title="Approve professionals"
        subtitle={`Awaiting decisions · ${list.length}`}
        trailing={<AgentAvatar seed="ayvaa-approvals" size={42} />}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <Kicker>Approvals · evidence-backed</Kicker>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  Humans decide,{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">evidence backs it</span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  Licence, identity and history are verified before you ever see the file.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Chip intent="neutral" light>{list.length} awaiting</Chip>
                  <Chip intent="success" light>Auto checks live</Chip>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <FilterBar value={filter} onChange={setFilter} />
            </motion.div>

            {filter === 'awaiting' &&
              list.map((a) => (
                <motion.div key={a.id} variants={rise}>
                  <ApprovalCard a={a} onDecide={decide} />
                </motion.div>
              ))}

            {filter !== 'awaiting' && (
              <motion.div variants={rise}>
                <Card>
                  <div className="p-4">
                    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-emerald-600/20 bg-emerald-500/[0.04] px-6 py-8 text-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/15 to-teal-500/15 text-emerald-600">
                        <Inbox className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[13.5px] font-bold tracking-tight text-[#0B211B]/70">No {filter} decisions here</p>
                        <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/45">
                          Every decision lands in the audit log
                        </p>
                      </div>
                      <Chip intent="success">Nothing pending</Chip>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            <motion.div variants={rise}>
              <Hero>
                <div className="flex items-start gap-3.5">
                  <Tile icon={Gavel} tone="white" size="lg" />
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="text-[15px] font-extrabold leading-snug tracking-tight text-white">Decisions on the record</div>
                    <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-emerald-100/55">
                      Approvals and rejections both carry full accountability.
                    </p>
                  </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-2xl bg-white/[0.06]">
                  {governance.map((r, i) => (
                    <div key={r.text}>
                      {i > 0 && <div aria-hidden className="mx-3.5 h-px bg-white/[0.07]" />}
                      <div className="flex items-center gap-3 px-3.5 py-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] bg-emerald-400/15 text-emerald-200">
                          <r.icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1 text-[12.5px] font-semibold leading-snug text-emerald-50/80">{r.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of approvals" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
