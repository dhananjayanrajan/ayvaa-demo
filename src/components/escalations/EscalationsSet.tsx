import { motion } from 'motion/react'
import { Card, Chip, Expand, Hero, Panel, Tile, TimeChip, rise } from '@/components/phone/kit'
import { escalatedTickets, incidentLinking, incidents } from '@/data/seed'
import { useEffect, useRef, useState } from 'react'
import { BellRing, Check, CheckCircle2, ChevronDown, Link2, Loader2, MessageSquare, PauseCircle, PhoneCall, ShieldAlert, ShieldCheck, Siren, UserCheck, UserRound } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Overline } from '@/components/phone/Overline'
import { QuotePanel } from '@/components/phone/QuotePanel'
import { PHASE_THEME, PhaseHero } from '@/components/phone/PhaseHero'
import { StepList } from '@/components/phone/StepList'
import type { Incident } from '@/data/types'
import { cn } from '@/lib/utils'
import { ListRow } from '@/components/admin/ui/ListRow'

export function EscalationHeroCard() {
  const [e1] = escalatedTickets

  return (
    <motion.div variants={rise}>
      <Hero tone="amber">
        <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-200/50">
          Escalation · judgment call
        </div>
        <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          This one needs{' '}
          <span className="bg-gradient-to-r from-amber-200 to-orange-100 bg-clip-text text-transparent">your judgment</span>
        </h2>
        <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-amber-100/55">
          The system did its part — a human now closes the loop.
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          <motion.div
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Chip intent="warning" light dot>
              Waiting {e1.waiting}
            </Chip>
          </motion.div>
          <Chip intent="neutral" light>
            Human decision required
          </Chip>
        </div>
      </Hero>
    </motion.div>
  )
}

type NotifyFn = (payload: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => void

interface EscalationTicketCardProps {
  notify: NotifyFn
}

export function EscalationTicketCard({ notify }: EscalationTicketCardProps) {
  const [e1] = escalatedTickets
  const [note, setNote] = useState('')
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle')
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [])

  const handleNoteChange = (value: string) => {
    setNote(value)
    setSaveState('saving')
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      setSaveState('saved')
    }, 800)
  }

  const handleReply = () => {
    notify({
      title: 'Reply sent',
      body: note ? `Priya Sharma notified · ${note}` : 'Priya Sharma notified · decision shared',
      kind: 'ok',
    })
  }

  return (
    <motion.div variants={rise}>
      <Card>
        <div aria-hidden className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-400" />
        <div className="p-5">
          <div className="flex items-start gap-3">
            <Tile icon={MessageSquare} tone="warning" size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">{e1.title}</span>
                <Chip intent="warning" dot>{e1.waiting}</Chip>
              </div>
              <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/55">{e1.meta}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {e1.chips.map((chip) => (
              <Chip key={chip} intent="neutral">
                {chip}
              </Chip>
            ))}
          </div>

          <PhaseHero theme={PHASE_THEME.emerald} className="mt-4">
            <QuotePanel
              bare
              kicker="In her words"
              glyph
              quote={e1.quote ?? ''}
              footer={
                <>
                  <div aria-hidden className="my-3.5 h-px bg-white/[0.08]" />
                  <div className="flex items-center justify-between gap-2">
                    <span className="min-w-0 truncate text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-100/50">
                      {e1.quoteBy}
                    </span>
                    <Chip intent="success" icon={CheckCircle2}>
                      Verbatim
                    </Chip>
                  </div>
                </>
              }
            />
          </PhaseHero>

          <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.035] p-4">
            <Overline icon={ShieldCheck}>Your decision</Overline>
            <Textarea
              value={note}
              onChange={(e) => handleNoteChange(e.target.value)}
              placeholder="Write a note for the care team…"
              className="mt-2.5 min-h-24 w-full resize-none rounded-2xl border-0 bg-white p-3.5 text-[13px] font-medium leading-relaxed text-[#0B211B] shadow-inner placeholder:text-[#0B211B]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30"
            />
            <div className="mt-2.5 flex items-center justify-between gap-2">
              <span className="min-w-0 truncate text-[10px] font-bold text-[#0B211B]/40">
                Written to the audit record with your name
              </span>
              <span
                className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.12em] transition-colors ${
                  saveState === 'saved'
                    ? 'bg-emerald-500/[0.12] text-emerald-700'
                    : saveState === 'saving'
                      ? 'bg-amber-500/[0.12] text-amber-700'
                      : 'bg-[#0B211B]/[0.05] text-[#0B211B]/40'
                }`}
              >
                {saveState === 'saved' && <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />}
                {saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Auto-saved' : 'Auto-saved'}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={handleReply}
              className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-all duration-200 hover:shadow-[0_22px_40px_-18px_rgba(5,150,105,0.85)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
            >
              <MessageSquare className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              Reply to family
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                notify({ title: 'Re-match queued', body: 'A calmer nurse will be offered Friday slot · family not told yet', kind: 'ok' })
              }
              className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75 transition-all duration-200 hover:bg-[#0B211B]/[0.09] hover:text-[#0B211B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
            >
              <UserCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              Re-match quietly instead
            </motion.button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

interface IncidentLinkingCardProps {
  delivered?: boolean
}

const baseIncidents = [
  { title: 'Near fall', detail: 'Mrs. Iyer · Ward B', time: '9:40 AM', tag: 'Fall risk' },
  { title: 'Late dose', detail: 'Mr. Rao · Wing 2', time: '8:12 AM', tag: 'Medication' },
  { title: 'Equipment fault', detail: 'Lift · Block A', time: 'Monday', tag: 'Equipment' },
]

const liveIncident = {
  title: 'Pager escalation',
  detail: 'All supervisors notified',
  time: '9:41 AM',
  tag: 'Live',
}

function ChainNode({ label, state }: { label: string; state: 'linked' | 'paused' }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.07] py-1 pl-1.5 pr-2.5">
      <span
        className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${
          state === 'linked' ? 'bg-emerald-400' : 'bg-rose-400'
        }`}
      >
        {state === 'linked' ? (
          <Check className="h-2 w-2 text-emerald-950" strokeWidth={4} aria-hidden />
        ) : (
          <PauseCircle className="h-2 w-2 text-rose-950" strokeWidth={3.5} aria-hidden />
        )}
      </span>
      <span className="text-[10px] font-bold text-white/80">{label}</span>
    </span>
  )
}

export function IncidentLinkingCard({ delivered = false }: IncidentLinkingCardProps) {
  const incidents = delivered ? [liveIncident, ...baseIncidents] : baseIncidents
  const count = delivered ? incidents.length : incidentLinking.count

  return (
    <motion.div variants={rise}>
      <PhaseHero theme={{ ...PHASE_THEME.rose, shadow: 'shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]' }}>
          <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/50">
            <Link2 className="h-3 w-3" aria-hidden />
            Incident linking · auto-attached
          </div>
          <h3 className="mt-2 text-balance break-words text-[19px] font-extrabold leading-snug tracking-tight text-white">
            {count} incidents{' '}
            <span className="bg-gradient-to-r from-rose-300 to-orange-200 bg-clip-text text-transparent">
              linked automatically
            </span>
          </h3>
          <p className="mt-1.5 text-pretty break-words text-[12px] font-medium leading-relaxed text-rose-100/60">
            {incidentLinking.body}
          </p>

          <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-rose-400/[0.12] px-3.5 py-3">
            <span aria-hidden className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-300 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-300" />
            </span>
            <span className="min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-rose-100">
              Escalates to supervisors in 60 seconds
            </span>
          </div>

          <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-200/60">
              Incident timeline
            </div>
            <div className="mt-3 flex flex-col">
              <StepList
                nodeStyle="circle"
                nodeSize="md"
                theme="dark"
                steps={incidents.map((inc) => {
                  const live = inc.tag === 'Live'
                  return {
                    key: inc.title,
                    state: 'done',
                    node: (
                      <span className="relative grid h-5 w-5 shrink-0 place-items-center">
                        {live ? (
                          <span aria-hidden className="absolute h-5 w-5 animate-ping rounded-full bg-rose-400/40" />
                        ) : null}
                        <span className={`h-2.5 w-2.5 rounded-full ${live ? 'bg-rose-300' : 'bg-rose-400/80'}`} />
                      </span>
                    ),
                    title: inc.title,
                    titleClassName: 'truncate text-[13px]',
                    time: inc.time,
                    timeTrailing: true,
                    timeTrailingClassName: 'font-extrabold tabular-nums text-rose-100/45',
                    body: inc.detail,
                    bodyClassName: 'truncate text-[11px] font-medium text-rose-100/55',
                    trailing: (
                      <span className="shrink-0 rounded-full bg-white/[0.07] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.1em] text-rose-100/60">
                        {inc.tag}
                      </span>
                    ),
                    contentClassName: inc.title === incidents[incidents.length - 1].title ? 'pb-0.5' : undefined,
                  }
                })}
              />
            </div>
          </div>

          <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-200/60">
              {incidentLinking.paged}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <ChainNode label="Session record" state="linked" />
              <ChainNode label="Care plan" state="paused" />
              <ChainNode label="Audit trail" state="linked" />
            </div>
            <div className="mt-3 flex items-center gap-1.5 border-t border-white/[0.08] pt-2.5">
              <Check className="h-3 w-3 shrink-0 text-emerald-400" strokeWidth={3.5} aria-hidden />
              <span className="text-[10.5px] font-semibold text-rose-100/50">
                Closed loop · every incident lands in all three records
              </span>
            </div>
          </div>

          <div className="mt-3 rounded-2xl bg-rose-400/[0.1] p-4">
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-400/[0.16]">
                <Siren className="h-3.5 w-3.5 text-rose-200" strokeWidth={2.2} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-200/60">
                  Care plan impact
                </div>
                <p className="mt-1 break-words text-[12.5px] font-medium leading-relaxed text-white/85">
                  {incidentLinking.paused}
                </p>
              </div>
            </div>
          </div>
      </PhaseHero>
    </motion.div>
  )
}


const severityMeta: Record<
  Incident['severity'],
  { node: string; rail: string; chip: 'danger' | 'warning'; label: string }
> = {
  critical: {
    node: 'bg-gradient-to-br from-rose-500 to-red-500 shadow-[0_6px_14px_-6px_rgba(244,63,94,0.7)]',
    rail: 'bg-rose-500/25',
    chip: 'danger',
    label: 'Critical',
  },
  minor: {
    node: 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_6px_14px_-6px_rgba(245,158,11,0.7)]',
    rail: 'bg-amber-500/25',
    chip: 'warning',
    label: 'Minor',
  },
}

interface IncidentTimelineCardProps {
  notify: NotifyFn
  delivered: boolean
}

export function IncidentTimelineCard({ notify, delivered }: IncidentTimelineCardProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <motion.div variants={rise}>
      <Card>
        <div className="p-5 pb-2">
          <div className="flex items-center gap-3">
            <Tile icon={Siren} tone="danger" />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-extrabold tracking-tight text-[#0B211B]">
                Incident timeline
              </div>
              <div className="mt-0.5 text-[11px] font-medium text-[#0B211B]/50">
                {incidents.length} incidents · each linked to its session & plan
              </div>
            </div>
            {delivered ? (
              <Chip intent="danger" dot className="border-transparent">Live</Chip>
            ) : (
              <Chip intent="neutral" className="border-transparent">Idle</Chip>
            )}
          </div>
        </div>

        <div className="px-5 pb-5">
          <div className="relative">
            <div
              aria-hidden
              className="absolute bottom-3 left-[15px] top-3 w-px bg-gradient-to-b from-rose-500/30 via-amber-500/25 to-transparent"
            />
            <div className="flex flex-col">
              {delivered && (
                <div className="relative flex gap-3">
                  <div className="relative z-10 flex w-[30px] shrink-0 justify-center pt-4">
                    <span
                      aria-hidden
                      className="flex h-[15px] w-[15px] items-center justify-center rounded-full bg-emerald-500"
                    >
                      <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pb-4">
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/60 p-3">
                      <div className="flex items-center gap-2">
                        <TimeChip>Now</TimeChip>
                        <span className="min-w-0 flex-1 break-words text-[13px] font-bold tracking-tight text-[#0B211B]">
                          Alert delivered
                        </span>
                        <Chip intent="success" icon={BellRing} className="shrink-0">Paged</Chip>
                      </div>
                      <p className="mt-1.5 text-xs font-medium leading-relaxed text-[#0B211B]/60">
                        Near fall · Mrs. Iyer · fanned out to all 5 destinations in 0.4s
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {incidents.map((inc) => {
                const meta = severityMeta[inc.severity]
                const open = expandedId === inc.id
                return (
                  <div key={inc.id} className="relative flex gap-3">
                    <div className="relative z-10 flex w-[30px] shrink-0 justify-center pt-4">
                      <span
                        aria-hidden
                        className={cn('h-[15px] w-[15px] rounded-full ring-4 ring-white', meta.node)}
                      />
                    </div>
                    <div className="min-w-0 flex-1 pb-4">
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.99 }}
                        onClick={() => {
                          setExpandedId(open ? null : inc.id)
                          if (!open)
                            notify({
                              title: `Supervisor notified · ${inc.patient}`,
                              body: `${inc.raised} · ${inc.tags[0]} · paged to the on-call supervisor`,
                              kind: inc.severity === 'critical' ? 'warn' : 'info',
                            })
                        }}
                        className="group w-full rounded-2xl border border-[#0B211B]/[0.05] bg-white p-3 text-left transition-colors hover:border-[#0B211B]/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                      >
                        <div className="flex items-start gap-2">
                          <TimeChip>{inc.raised}</TimeChip>
                          <span className="min-w-0 flex-1 break-words text-[13px] font-bold tracking-tight text-[#0B211B]">
                            {inc.patient}
                          </span>
                          <span className="flex shrink-0 items-center gap-1">
                            <Chip intent={meta.chip}>{meta.label}</Chip>
                            <motion.span
                              animate={{ rotate: open ? 180 : 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/25" aria-hidden />
                            </motion.span>
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                          {inc.summary}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                          {inc.tags.map((t) => (
                            <span
                              key={t}
                              className="flex items-center gap-1 text-[10px] font-semibold text-[#0B211B]/45"
                            >
                              <span
                                aria-hidden
                                className={cn(
                                  'h-1 w-1 rounded-full',
                                  inc.severity === 'critical' ? 'bg-rose-500' : 'bg-amber-500',
                                )}
                              />
                              {t}
                            </span>
                          ))}
                          <span className="ml-auto flex items-center gap-1 text-[10px] font-semibold text-[#0B211B]/40">
                            <UserRound className="h-3 w-3" aria-hidden />
                            {inc.by}
                          </span>
                        </div>
                      </motion.button>

                      <Expand open={open}>
                        <div className="pt-2.5">
                          <Panel
                            intent={inc.severity === 'critical' ? 'danger' : 'warning'}
                            className="p-4"
                          >
                            <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-600/70">
                              <BellRing className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                              Supervisor received
                            </div>
                            <p className="mt-2 text-[12.5px] font-medium leading-relaxed text-[#0B211B]/80">
                              {inc.decision}
                            </p>
                            <div className="mt-3 space-y-1.5 border-t border-[#0B211B]/[0.06] pt-3">
                              {inc.linkedVisit && (
                                <div className="text-[11px] font-semibold leading-snug text-[#0B211B]/55">
                                  {inc.linkedVisit}
                                </div>
                              )}
                              {inc.linkedPlan && (
                                <div className="text-[11px] font-semibold leading-snug text-[#0B211B]/55">
                                  {inc.linkedPlan}
                                </div>
                              )}
                              {inc.planPaused && (
                                <div className="text-[11px] font-bold text-rose-600/80">
                                  Care plan paused until supervisor closes it
                                </div>
                              )}
                            </div>
                          </Panel>
                        </div>
                      </Expand>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}


interface RelatedTicketsListProps {
  notify: NotifyFn
}

export function RelatedTicketsList({ notify }: RelatedTicketsListProps) {
  const [, e2, e3] = escalatedTickets

  return (
    <motion.div variants={rise}>
      <Card>
        {[e2, e3].map((e, i) => (
          <div key={e.title}>
            <ListRow
              icon={Link2}
              title={e.title}
              subtitle={e.meta}
              onClick={() =>
                notify({
                  title: 'Ticket opened',
                  body: `${e.title} · ${i === 0 ? 'linked receipts attached' : 'usage report attached'}`,
                  kind: 'info',
                })
              }
            />
          </div>
        ))}
      </Card>
    </motion.div>
  )
}


const onCall = {
  name: 'Dr. Ananya Rao',
  role: 'On-call supervisor',
  window: '8:00 AM – 8:00 PM',
}

type EscState = 'idle' | 'paging' | 'paged' | 'done'

const escalation: { label: string; value: string }[] = [
  { label: 'Primary pager', value: 'Dr. Ananya Rao' },
  { label: 'Backup pager', value: 'Meera Nair' },
  { label: 'Care team lead', value: 'Kavya' },
]

interface SupervisorEscalationCardProps {
  notify: NotifyFn
  live: boolean
  delivered: boolean
}

export function SupervisorEscalationCard({ notify, live, delivered }: SupervisorEscalationCardProps) {
  const states: EscState[] = delivered
    ? ['done', 'paged', 'paged']
    : live
      ? ['paging', 'idle', 'idle']
      : ['idle', 'idle', 'idle']

  const ackText = delivered ? 'Acknowledged in 42s' : live ? 'Paging…' : 'Awaiting alert'

  return (
    <motion.div variants={rise}>
      <Card>
        <div className="p-5">
          <div className="flex items-start gap-3.5">
            <Tile icon={ShieldAlert} tone="warning" size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">
                Supervisor escalation
              </div>
              <p className="mt-1 text-xs font-medium leading-relaxed text-[#0B211B]/60">
                Every critical incident pages a human. No alert is left to a machine alone.
              </p>
            </div>
          </div>

          <Panel intent="warning" className="mt-4 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-[0_8px_16px_-8px_rgba(245,158,11,0.6)]">
                <UserRound className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="break-words text-[13px] font-bold leading-snug text-[#0B211B]">{onCall.name}</div>
                <div className="break-words text-[11px] font-medium leading-snug text-[#0B211B]/50">
                  {onCall.role} · {onCall.window}
                </div>
              </div>
              {delivered ? (
                <Chip intent="success" icon={Check} className="shrink-0">{ackText}</Chip>
              ) : live ? (
                <Chip intent="warning" dot className="shrink-0">{ackText}</Chip>
              ) : (
                <Chip intent="neutral" className="shrink-0">{ackText}</Chip>
              )}
            </div>
          </Panel>

          <div className="mt-4 space-y-2">
            {escalation.map((e, i) => {
              const s = states[i]
              return (
                <motion.button
                  key={e.label}
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() =>
                    notify({
                      title: `${e.label} · ${e.value}`,
                      body:
                        s === 'done'
                          ? 'Already acknowledged this incident'
                          : s === 'paged'
                            ? 'Paged · awaiting acknowledgement'
                            : s === 'paging'
                              ? 'Paging now · ringing the on-call line'
                              : 'Standing by · will page on the next critical alert',
                      kind: s === 'done' ? 'ok' : s === 'paging' ? 'warn' : 'info',
                    })
                  }
                  className="flex w-full items-center gap-2.5 rounded-xl border border-[#0B211B]/[0.05] bg-white p-2.5 text-left transition-colors hover:border-[#0B211B]/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                >
                  <span
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                      s === 'done'
                        ? 'bg-emerald-500/15'
                        : s === 'paging'
                          ? 'bg-amber-400/20'
                          : 'bg-[#0B211B]/[0.05]',
                    )}
                  >
                    {s === 'done' ? (
                      <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} aria-hidden />
                    ) : s === 'paging' ? (
                      <Loader2 className="h-3 w-3 animate-spin text-amber-600" strokeWidth={2.4} aria-hidden />
                    ) : (
                      <PhoneCall className="h-3 w-3 text-[#0B211B]/45" strokeWidth={2.2} aria-hidden />
                    )}
                  </span>
                  <span className="min-w-0 flex-1 break-words text-[11px] font-semibold leading-snug text-[#0B211B]/60">
                    {e.label}
                  </span>
                  <span className="shrink-0 text-[11px] font-bold text-[#0B211B]/80">{e.value}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
