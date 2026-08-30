import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Clock,
  Loader2,
  Check,
  X,
  UserPlus,
  ShieldAlert,
  Zap,
  Users,
  MessageSquare,
  Bell,
  AlertTriangle,
  Phone,
  Mail,
  Video,
  FileText,
  CheckCircle2,
  ArrowUpRight,
  User,
  Home,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { Screen } from '@/components/phone/Screen'
import { Card, Chip, Tile } from '@/components/phone/kit'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

type Agent = {
  id: string
  name: string
  role: string
  initials: string
  load: number
  phone: string
  email: string
}

type EscalationEvent = {
  id: string
  time: string
  event: string
  actor: string
  icon: LucideIcon
  tone: 'neutral' | 'warning' | 'danger'
}

type Ticket = {
  id: string
  subject: string
  patient: string
  patientPhone: string
  familyNotified: boolean
  carePlanStatus: 'active' | 'paused' | 'ended'
  slaSeconds: number
  totalSlaSeconds: number
  missedVisits: number
  familyWaitMins: number
  context: EscalationEvent[]
}

const INITIAL_TICKET: Ticket = {
  id: 'T-8842',
  subject: 'Missed visit follow-up · No show',
  patient: 'Ramesh Rao',
  patientPhone: '+91 98480 12345',
  familyNotified: true,
  carePlanStatus: 'paused',
  slaSeconds: 285,
  totalSlaSeconds: 1800,
  missedVisits: 3,
  familyWaitMins: 42,
  context: [
    { id: 'e1', time: '10:02 AM', event: 'Ticket created by system', actor: 'Auto-dispatch', icon: Zap, tone: 'neutral' },
    { id: 'e2', time: '10:05 AM', event: 'Auto-escalated (no response)', actor: 'System', icon: ShieldAlert, tone: 'warning' },
    { id: 'e3', time: '10:06 AM', event: 'Supervisor paged', actor: 'Meera Nair', icon: Bell, tone: 'danger' },
    { id: 'e4', time: '10:08 AM', event: 'Family notified via SMS', actor: 'System', icon: MessageSquare, tone: 'neutral' },
  ],
}

const AGENTS: Agent[] = [
  { id: 'a1', name: 'Priya Menon', role: 'Senior Care Coordinator', initials: 'PM', load: 2, phone: '+91 98480 11111', email: 'priya@ayvaa.in' },
  { id: 'a2', name: 'Ravi Shankar', role: 'Support Lead', initials: 'RS', load: 5, phone: '+91 98480 22222', email: 'ravi@ayvaa.in' },
  { id: 'a3', name: 'Ananya Rao', role: 'Ops Manager', initials: 'AR', load: 1, phone: '+91 98480 33333', email: 'ananya@ayvaa.in' },
]

function formatTime(seconds: number): string {
  if (seconds <= 0) return '00:00'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

function getTheme(seconds: number, total: number) {
  const pct = seconds / total
  if (pct <= 0.15) {
    return {
      bg: 'bg-rose-500',
      text: 'text-rose-300',
      shell: 'border-rose-200/10 bg-[#230D14]',
      orb: 'bg-rose-500/20',
      hairline: 'via-rose-300/40',
      label: 'Critical',
      intent: 'danger' as const,
      bar: 'from-rose-500 to-red-400',
      strip: 'bg-rose-500/[0.08] text-rose-200',
    }
  }
  return {
    bg: 'bg-amber-500',
    text: 'text-amber-300',
    shell: 'border-amber-200/10 bg-[#241A0B]',
    orb: 'bg-amber-500/20',
    hairline: 'via-amber-300/40',
    label: 'At Risk',
    intent: 'warning' as const,
    bar: 'from-amber-500 to-orange-400',
    strip: 'bg-amber-500/[0.08] text-amber-200',
  }
}

function SlaHero({ ticket, secondsLeft }: { ticket: Ticket; secondsLeft: number }) {
  const theme = getTheme(secondsLeft, ticket.totalSlaSeconds)
  const pct = Math.max(0, Math.min(100, (secondsLeft / ticket.totalSlaSeconds) * 100))

  return (
    <div className={cn('shrink-0 relative overflow-hidden rounded-[26px] border p-5 shadow-[0_28px_64px_-30px_rgba(0,0,0,0.5)] transition-colors duration-500', theme.shell)}>
      <div aria-hidden className={cn('pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full blur-3xl transition-colors duration-500', theme.orb)} />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
      <div aria-hidden className={cn('pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent transition-colors duration-500', theme.hairline)} />

      <div className="relative flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <div className={cn('h-3 w-1 rounded-full transition-colors duration-500', theme.bg)} />
              <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-white/50">Escalation Desk</span>
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <h2 className="text-[19px] font-extrabold leading-tight tracking-tight text-white">Ticket {ticket.id}</h2>
              <Chip intent={theme.intent} dot className="shrink-0 border-transparent bg-white/10 text-white">
                {theme.label}
              </Chip>
            </div>
            <p className="mt-1 text-[12px] font-semibold text-white/60">{ticket.subject}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl bg-white/[0.06] p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/50">SLA Countdown</span>
            <span className={cn('text-[10px] font-bold tabular-nums', theme.text)}>{formatTime(secondsLeft)} remaining</span>
          </div>
          <motion.div
            key={secondsLeft}
            initial={{ opacity: 0.8, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn('text-[42px] font-black tabular-nums leading-none tracking-tight transition-colors duration-500', theme.text)}
          >
            {formatTime(secondsLeft)}
          </motion.div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={cn('h-full rounded-full transition-colors duration-500', theme.bar)}
            />
          </div>
        </div>

        <div className={cn('flex items-center gap-3 rounded-2xl px-3.5 py-2.5 transition-colors duration-500', theme.strip)}>
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-white/80">
            <Users className="h-4 w-4" strokeWidth={2.2} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold text-white/90">{ticket.patient}</div>
            <div className="text-[10px] font-semibold text-white/50">Patient involved</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ImpactCard({ ticket }: { ticket: Ticket }) {
  return (
    <div className="shrink-0">
      <Card>
        <div className="p-5">
          <div className="flex items-center gap-2">
            <div className="h-3 w-1 rounded-full bg-rose-500" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/55">Impact Context</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
              <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">Missed visits</div>
              <div className="mt-1 text-[20px] font-extrabold tabular-nums leading-none text-[#0B211B]">{ticket.missedVisits}</div>
              <div className="mt-1 text-[10px] font-semibold text-rose-600">This month</div>
            </div>
            <div className="rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
              <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">Family waiting</div>
              <div className="mt-1 text-[20px] font-extrabold tabular-nums leading-none text-[#0B211B]">{ticket.familyWaitMins}m</div>
              <div className="mt-1 text-[10px] font-semibold text-amber-600">Since last contact</div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.06] text-[#0B211B]/60">
              <Phone className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">Patient contact</div>
              <div className="mt-0.5 text-[12px] font-bold tabular-nums text-[#0B211B]">{ticket.patientPhone}</div>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
            <div className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-xl', ticket.familyNotified ? 'bg-emerald-500/[0.12] text-emerald-600' : 'bg-amber-500/[0.12] text-amber-600')}>
              {ticket.familyNotified ? <CheckCircle2 className="h-4 w-4" strokeWidth={2.2} aria-hidden /> : <Bell className="h-4 w-4" strokeWidth={2.2} aria-hidden />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">Family notification</div>
              <div className="mt-0.5 text-[12px] font-bold text-[#0B211B]">{ticket.familyNotified ? 'Notified via SMS' : 'Pending notification'}</div>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
            <div className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-xl', ticket.carePlanStatus === 'paused' ? 'bg-amber-500/[0.12] text-amber-600' : 'bg-emerald-500/[0.12] text-emerald-600')}>
              <FileText className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">Care plan status</div>
              <div className="mt-0.5 text-[12px] font-bold capitalize text-[#0B211B]">{ticket.carePlanStatus}</div>
            </div>
          </div>

          <div className="mt-3 flex items-start gap-2.5 rounded-2xl bg-rose-500/[0.06] p-3.5">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" strokeWidth={2.2} aria-hidden />
            <p className="min-w-0 flex-1 text-[11.5px] font-semibold leading-relaxed text-rose-700">
              Care plan is paused. Family has requested immediate callback.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

function AssignmentCard({
  agent,
  onAssign,
  onReassign,
  onContact,
}: {
  agent: Agent | null
  onAssign: () => void
  onReassign: () => void
  onContact: () => void
}) {
  if (!agent) {
    return (
      <div className="shrink-0">
        <Card>
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-[0_8px_16px_-8px_rgba(245,158,11,0.6)]">
                <UserPlus className="h-5 w-5" strokeWidth={2.2} aria-hidden />
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="text-[14px] font-extrabold tracking-tight text-[#0B211B]">Needs Assignment</div>
                <p className="mt-1 text-[11.5px] font-medium leading-relaxed text-[#0B211B]/55">
                  Select a specialist to handle this escalation immediately.
                </p>
              </div>
            </div>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={onAssign}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 py-3.5 text-[13px] font-bold text-white shadow-[0_14px_28px_-14px_rgba(245,158,11,0.6)]"
            >
              <UserPlus className="h-4 w-4" strokeWidth={2.4} aria-hidden />
              Assign Specialist
            </motion.button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="shrink-0">
      <Card>
        <div className="p-5">
          <div className="flex items-center gap-2">
            <div className="h-3 w-1 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/55">Assigned To</span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-[14px] font-extrabold text-white shadow-[0_8px_16px_-8px_rgba(16,185,129,0.5)]">
              {agent.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-extrabold tracking-tight text-[#0B211B]">{agent.name}</div>
              <div className="mt-0.5 text-[11px] font-semibold text-[#0B211B]/50">{agent.role}</div>
            </div>
            <Chip intent="success" className="shrink-0 border-transparent">
              Active
            </Chip>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-[#0B211B]/[0.03] p-3">
              <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">Active tickets</div>
              <div className="mt-1 text-[18px] font-extrabold tabular-nums leading-none text-[#0B211B]">{agent.load}</div>
            </div>
            <div className="rounded-2xl bg-[#0B211B]/[0.03] p-3">
              <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">Response time</div>
              <div className="mt-1 text-[18px] font-extrabold tabular-nums leading-none text-[#0B211B]">4.2m</div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={onReassign}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#0B211B]/[0.05] py-2.5 text-[12px] font-bold text-[#0B211B]/70 transition-colors hover:bg-[#0B211B]/[0.08]"
            >
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
              Reassign
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={onContact}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/[0.08] py-2.5 text-[12px] font-bold text-emerald-700 transition-colors hover:bg-emerald-500/[0.14]"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
              Contact
            </motion.button>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#0B211B]/[0.03] px-3 py-2.5">
            <MessageSquare className="h-3.5 w-3.5 text-[#0B211B]/40" strokeWidth={2.2} aria-hidden />
            <span className="text-[11px] font-semibold text-[#0B211B]/60">Notification sent via push & SMS</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

function EscalationRail({ events }: { events: EscalationEvent[] }) {
  return (
    <div className="shrink-0">
      <Card>
        <div className="p-5">
          <div className="flex items-center gap-2">
            <div className="h-3 w-1 rounded-full bg-[#0B211B]/20" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/55">Escalation Path</span>
          </div>
          <div className="mt-4 flex flex-col">
            {events.map((step, idx) => {
              const isLast = idx === events.length - 1
              const Icon = step.icon
              const toneClass = step.tone === 'danger' ? 'bg-rose-500 text-white' : step.tone === 'warning' ? 'bg-amber-400 text-white' : 'bg-[#0B211B]/[0.04] text-[#0B211B]/60'
              return (
                <div key={step.id} className="relative flex gap-3 pb-4 last:pb-0">
                  {!isLast && (
                    <div aria-hidden className="absolute left-[15px] top-[24px] h-[calc(100%-12px)] w-px bg-[#0B211B]/[0.08]" />
                  )}
                  <div className="relative h-fit">
                    <div className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors duration-300', toneClass)}>
                      <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                    </div>
                    {isLast && (
                      <span aria-hidden className="absolute inset-0 rounded-lg bg-rose-500/30 animate-ping" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="text-[12px] font-bold tracking-tight text-[#0B211B]">{step.event}</div>
                    <div className="mt-0.5 text-[10px] font-semibold text-[#0B211B]/50">{step.actor}</div>
                    <div className="mt-0.5 text-[10px] font-bold tabular-nums text-[#0B211B]/40">{step.time}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Card>
    </div>
  )
}

function ResolutionCard({
  onResolve,
  onEscalate,
  onTransfer,
}: {
  onResolve: () => void
  onEscalate: () => void
  onTransfer: () => void
}) {
  return (
    <div className="shrink-0">
      <Card>
        <div className="p-5">
          <div className="flex items-center gap-2">
            <div className="h-3 w-1 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/55">Resolution Actions</span>
          </div>
          <p className="mt-2 text-[11.5px] font-medium leading-relaxed text-[#0B211B]/55">
            Choose the outcome for this escalation ticket.
          </p>

          <div className="mt-4 flex flex-col gap-2.5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={onResolve}
              className="flex items-center gap-3 rounded-2xl bg-emerald-500/[0.08] p-3.5 text-left transition-colors hover:bg-emerald-500/[0.14]"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500 text-white">
                <Check className="h-4 w-4" strokeWidth={2.4} aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-bold text-[#0B211B]">Resolve ticket</div>
                <div className="mt-0.5 text-[10.5px] font-semibold text-[#0B211B]/50">Mark as handled and close</div>
              </div>
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={onEscalate}
              className="flex items-center gap-3 rounded-2xl bg-rose-500/[0.08] p-3.5 text-left transition-colors hover:bg-rose-500/[0.14]"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-rose-500 text-white">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-bold text-[#0B211B]">Escalate further</div>
                <div className="mt-0.5 text-[10.5px] font-semibold text-[#0B211B]/50">Push to senior ops team</div>
              </div>
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={onTransfer}
              className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.05] p-3.5 text-left transition-colors hover:bg-[#0B211B]/[0.08]"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.10] text-[#0B211B]/70">
                <Users className="h-4 w-4" strokeWidth={2.4} aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-bold text-[#0B211B]">Transfer to team</div>
                <div className="mt-0.5 text-[10.5px] font-semibold text-[#0B211B]/50">Assign to another department</div>
              </div>
            </motion.button>
          </div>
        </div>
      </Card>
    </div>
  )
}

function ContactSheet({
  agent,
  onClose,
}: {
  agent: Agent
  onClose: () => void
}) {
  const [status, setStatus] = useState<'idle' | 'calling' | 'connected'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const handleCall = () => {
    setStatus('calling')
    timers.current.push(
      setTimeout(() => setStatus('connected'), 1500),
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 40 }}
        className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
      >
        <div className="shrink-0 px-5 pb-3.5 pt-4">
          <div aria-hidden className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
          <div className="flex items-start gap-3">
            <Tile icon={Phone} tone="info" size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Contact {agent.name}</div>
              <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                Choose how to reach them
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50 transition-colors hover:bg-[#0B211B]/[0.09]"
              aria-label="Close sheet"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 pt-3.5">
          <div className="flex flex-col gap-2">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={handleCall}
              disabled={status !== 'idle'}
              className={cn(
                'flex items-center gap-3 rounded-2xl p-4 text-left transition-all duration-200',
                status === 'connected' ? 'bg-emerald-500/[0.08] ring-1 ring-emerald-500/30' : 'bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.06]',
                status !== 'idle' && 'cursor-not-allowed opacity-60',
              )}
            >
              <div className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white transition-all', status === 'connected' ? 'bg-gradient-to-br from-emerald-500 to-teal-500' : 'bg-gradient-to-br from-[#0B211B]/20 to-[#0B211B]/10 text-[#0B211B]/50')}>
                <Phone className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-bold text-[#0B211B]">Voice call</div>
                <div className="mt-0.5 text-[10px] font-semibold text-[#0B211B]/50">{agent.phone}</div>
              </div>
              {status === 'calling' && <Loader2 className="h-4 w-4 animate-spin text-[#0B211B]/40" aria-hidden />}
              {status === 'connected' && <Check className="h-4 w-4 text-emerald-600" strokeWidth={2.8} aria-hidden />}
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] p-4 text-left transition-colors hover:bg-[#0B211B]/[0.06]"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0B211B]/20 to-[#0B211B]/10 text-[#0B211B]/50">
                <MessageSquare className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-bold text-[#0B211B]">Send message</div>
                <div className="mt-0.5 text-[10px] font-semibold text-[#0B211B]/50">SMS or in-app chat</div>
              </div>
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] p-4 text-left transition-colors hover:bg-[#0B211B]/[0.06]"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0B211B]/20 to-[#0B211B]/10 text-[#0B211B]/50">
                <Video className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-bold text-[#0B211B]">Video call</div>
                <div className="mt-0.5 text-[10px] font-semibold text-[#0B211B]/50">Start video conference</div>
              </div>
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] p-4 text-left transition-colors hover:bg-[#0B211B]/[0.06]"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0B211B]/20 to-[#0B211B]/10 text-[#0B211B]/50">
                <Mail className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-bold text-[#0B211B]">Send email</div>
                <div className="mt-0.5 text-[10px] font-semibold text-[#0B211B]/50">{agent.email}</div>
              </div>
            </motion.button>
          </div>

          {status === 'connected' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-start gap-2.5 rounded-2xl bg-emerald-500/[0.10] px-3.5 py-3 ring-1 ring-emerald-500/20"
            >
              <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-extrabold text-emerald-700">Connected</div>
                <p className="mt-0.5 text-[10.5px] font-semibold leading-relaxed text-emerald-700/80">Call established with {agent.name}</p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="shrink-0 border-t border-[#0B211B]/[0.06] bg-white px-5 pb-6 pt-4">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.08] py-3.5 text-[13px] font-bold text-[#0B211B]/70 transition-colors hover:bg-[#0B211B]/[0.12]"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}

function AssignSheet({
  agents,
  onClose,
  onConfirm,
}: {
  agents: Agent[]
  onClose: () => void
  onConfirm: (agent: Agent) => void
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const handleConfirm = () => {
    if (!selectedId) return
    setStatus('working')
    timers.current.push(
      setTimeout(() => {
        setStatus('done')
        const agent = agents.find((a) => a.id === selectedId)
        if (agent) {
          timers.current.push(setTimeout(() => onConfirm(agent), 800))
        }
      }, 1200),
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={status === 'idle' ? onClose : undefined}
        className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 40 }}
        className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
      >
        <div className="shrink-0 px-5 pb-3.5 pt-4">
          <div aria-hidden className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
          <div className="flex items-start gap-3">
            <Tile icon={Users} tone="info" size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">
                {status === 'done' ? 'Assignment confirmed' : 'Select Specialist'}
              </div>
              <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                {status === 'done' ? 'They have been notified immediately' : 'Choose who handles this escalation'}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={status !== 'idle'}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50 transition-colors hover:bg-[#0B211B]/[0.09] disabled:opacity-40"
              aria-label="Close sheet"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 pt-3.5">
          <div className="flex flex-col gap-2">
            {agents.map((a) => {
              const isSelected = selectedId === a.id
              return (
                <motion.button
                  key={a.id}
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedId(a.id)}
                  disabled={status !== 'idle'}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl p-3 text-left transition-all duration-200',
                    isSelected
                      ? 'bg-emerald-500/[0.08] ring-1 ring-emerald-500/30'
                      : 'bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.06]',
                    status !== 'idle' && 'cursor-not-allowed opacity-60',
                  )}
                >
                  <div
                    className={cn(
                      'grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[11px] font-extrabold text-white transition-all',
                      isSelected ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-[0_6px_12px_-6px_rgba(16,185,129,0.5)]' : 'bg-gradient-to-br from-[#0B211B]/20 to-[#0B211B]/10 text-[#0B211B]/50',
                    )}
                  >
                    {a.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-bold text-[#0B211B]">{a.name}</div>
                    <div className="mt-0.5 text-[10px] font-semibold text-[#0B211B]/50">
                      {a.role} · {a.load} active
                    </div>
                  </div>
                  <div className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-full transition-all', isSelected ? 'bg-emerald-500' : 'border border-[#0B211B]/20')}>
                    {isSelected && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 25 }}>
                        <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>

          {status === 'done' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-start gap-2.5 rounded-2xl bg-emerald-500/[0.10] px-3.5 py-3 ring-1 ring-emerald-500/20"
            >
              <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-extrabold text-emerald-700">Assignment sealed</div>
                <p className="mt-0.5 text-[10.5px] font-semibold leading-relaxed text-emerald-700/80">Closing automatically...</p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="shrink-0 border-t border-[#0B211B]/[0.06] bg-white px-5 pb-6 pt-4">
          <motion.button
            type="button"
            whileTap={status === 'idle' && selectedId ? { scale: 0.97 } : {}}
            onClick={handleConfirm}
            disabled={!selectedId || status !== 'idle'}
            className={cn(
              'relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl py-3.5 text-[13px] font-bold transition-all duration-300',
              status === 'done'
                ? 'bg-emerald-500 text-white shadow-[0_18px_36px_-18px_rgba(16,185,129,0.85)]'
                : status === 'working'
                ? 'cursor-wait bg-[#0B211B]/[0.30] text-white/80'
                : selectedId
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
                : 'bg-[#0B211B]/[0.08] text-[#0B211B]/30 cursor-not-allowed',
            )}
          >
            {status === 'working' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Assigning & notifying...
              </>
            ) : status === 'done' ? (
              <>
                <Check className="h-4 w-4" strokeWidth={2.8} aria-hidden />
                Confirmed
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                Assign & Notify
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}

export function A17() {
  const { navigate } = useRouter()
  const { notify } = useDemo()

  const [ticket] = useState<Ticket>(INITIAL_TICKET)
  const [secondsLeft, setSecondsLeft] = useState(ticket.slaSeconds)
  const [assignedAgent, setAssignedAgent] = useState<Agent | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [secondsLeft])

  useEffect(() => {
    if (secondsLeft === 0) {
      notify({ title: 'SLA Breached', body: 'Ticket T-8842 has exceeded response time', kind: 'warn' })
    }
  }, [secondsLeft, notify])

  const handleAssign = (agent: Agent) => {
    setAssignedAgent(agent)
    notify({ title: 'Agent Assigned', body: `${agent.name} is handling the ticket`, kind: 'ok' })
  }

  const handleResolve = () => {
    notify({ title: 'Ticket Resolved', body: 'Escalation marked as handled', kind: 'ok' })
  }

  const handleEscalate = () => {
    notify({ title: 'Escalated Further', body: 'Pushed to senior ops team', kind: 'warn' })
  }

  const handleTransfer = () => {
    notify({ title: 'Transfer Initiated', body: 'Select target department', kind: 'info' })
  }

  return (
    <Screen>
      <AppBar
        title="Escalation desk"
        onBack={() => navigate('/admin/a08')}
      />

      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-4 pb-8 pt-3">
        <SlaHero ticket={ticket} secondsLeft={secondsLeft} />
        <ImpactCard ticket={ticket} />
        <AssignmentCard
          agent={assignedAgent}
          onAssign={() => setSheetOpen(true)}
          onReassign={() => setSheetOpen(true)}
          onContact={() => assignedAgent && setContactOpen(true)}
        />
        <EscalationRail events={ticket.context} />
        <ResolutionCard
          onResolve={handleResolve}
          onEscalate={handleEscalate}
          onTransfer={handleTransfer}
        />
      </div>

      <AnimatePresence>
        {sheetOpen && (
          <AssignSheet
            agents={AGENTS}
            onClose={() => setSheetOpen(false)}
            onConfirm={(agent) => {
              handleAssign(agent)
              setSheetOpen(false)
            }}
          />
        )}
        {contactOpen && assignedAgent && (
          <ContactSheet
            agent={assignedAgent}
            onClose={() => setContactOpen(false)}
          />
        )}
      </AnimatePresence>
    </Screen>
  )
}
