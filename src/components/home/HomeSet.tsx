import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { Activity, AlertTriangle, BarChart3, CalendarCheck, Check, ChevronRight, Hourglass, Loader2, MapPin, Phone, Pill, ReceiptText, ScrollText, Send, ShieldCheck, Stethoscope, UserCheck, UserPlus, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDemo } from '@/lib/store'
import type { TileTone } from '@/components/phone/kit'
import { Card, Chip, Hero, LiveDot, Meter, Tile, TimeChip, rise } from '@/components/phone/kit'
import type { DashboardFacts, VisitRow } from '@/data/patientDashboard'
import { doseRounds, liveSteps, quickActions } from '@/data/patientDashboard'
import { SheetShell } from '@/components/phone/SheetShell'
import { DarkPanel } from '@/components/phone/DarkPanel'
import { useRouter } from '@/lib/router'
import { HeroHighlight, HeroTopRow } from '@/components/phone/HeroCells'
import { adminAttention, adminMetrics, carePlan } from '@/data/seed'
import { Row } from '@/components/phone/Row'
import { ListRow } from '@/components/admin/ui/ListRow'
import AgentAvatar from '@/components/smoothui/agent-avatar'

export type CallPhase = 'idle' | 'connecting' | 'connected'

const styles: Record<CallPhase, { dark?: boolean; className: string }> = {
  idle: {
    className:
      'bg-white/[0.1] text-white hover:bg-white/[0.16]',
  },
  connecting: {
    className: 'cursor-wait bg-white/[0.16] text-white/80',
  },
  connected: {
    className: 'bg-emerald-500/[0.2] text-emerald-100',
  },
}

export function CallButton({
  name,
  light = false,
  label = 'Call',
}: {
  name: string
  light?: boolean
  label?: string
}) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<CallPhase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  function call() {
    if (phase !== 'idle') return
    setPhase('connecting')
    timers.current.push(
      setTimeout(() => {
        setPhase('connected')
        notify({
          title: `Calling ${name}`,
          body: 'Connected over the secure Ayvaa line, number never shared',
          kind: 'info',
        })
      }, 900),
    )
  }

  return (
    <motion.button
      type="button"
      whileTap={phase === 'idle' ? { scale: 0.97 } : undefined}
      onClick={phase === 'idle' ? call : undefined}
      disabled={phase !== 'idle'}
      aria-disabled={phase !== 'idle'}
      className={cn(
        'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3 text-[12.5px] font-bold transition-colors duration-300',
        light && phase === 'idle' && 'bg-[#0B211B]/[0.05] text-[#0B211B]/75 hover:bg-[#0B211B]/[0.08]',
        !light && styles[phase].className,
      )}
    >
      {phase === 'connecting' ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
      ) : phase === 'connected' ? (
        <Check className="h-4 w-4 shrink-0" strokeWidth={2.8} aria-hidden />
      ) : (
        <Phone className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      )}
      <span className="truncate">
        {phase === 'idle' ? label : phase === 'connecting' ? 'Connecting' : 'On the call'}
      </span>
    </motion.button>
  )
}

export function LiveHero({
  facts,
  onOpenSheet,
  onTrack,
}: {
  facts: DashboardFacts
  onOpenSheet: () => void
  onTrack: () => void
}) {
  return (
    <Hero>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/60">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
          </span>
          Care happening now
        </div>
        <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          {facts.caregiverFirstName} is with {facts.lovedFirstName},{' '}
          <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
            right now
          </span>
        </h2>
        <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/70">
          RN on the {facts.planCategory} plan, GPS-checked arrival
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
          <div className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/50">
            Arrived
          </div>
          <div className="mt-1 text-[15px] font-extrabold tabular-nums leading-none text-white">
            2:04 PM
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
          <div className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/50">
            Duration
          </div>
          <div className="mt-1 text-[15px] font-extrabold tabular-nums leading-none text-white">
            2 hours
          </div>
        </div>
      </div>

      <div className="mt-4">
        <LiveStepper onPress={onOpenSheet} />
      </div>

      <div className="mt-3 flex gap-2.5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onTrack}
          className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-[12.5px] font-bold text-white shadow-[0_12px_28px_-12px_rgba(16,185,129,0.8)]"
        >
          <MapPin className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate">Track visit</span>
        </motion.button>
        <CallButton name={facts.caregiverFirstName} />
      </div>
    </Hero>
  )
}

export function LiveStepper({ onPress }: { onPress: () => void }) {
  const doneCount = liveSteps.filter((s) => s.state === 'done').length
  const progressPct = ((doneCount + 1 - 1) / (liveSteps.length - 1)) * 100
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.99 }}
      onClick={onPress}
      className="block w-full rounded-2xl bg-white/[0.06] px-3 pb-3 pt-3.5 text-left transition-colors hover:bg-white/[0.09]"
      aria-label="Open live visit step details"
    >
      <div className="flex items-center gap-2">
        <span className="min-w-0 flex-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-100/50">
          Visit progress, tap for details
        </span>
        <span className="flex shrink-0 items-center gap-0.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-emerald-200/80">
          Details
          <ChevronRight className="h-3 w-3" strokeWidth={2.6} aria-hidden />
        </span>
      </div>
      <span className="relative mt-2.5 block h-4">
        <span aria-hidden className="absolute inset-x-[10%] top-1/2 h-px bg-white/15" />
        <span
          aria-hidden
          className="absolute left-[10%] top-1/2 h-px bg-emerald-300/60 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
        <span className="absolute inset-0 grid grid-cols-5">
          {liveSteps.map((step) => (
            <span key={step.key} className="flex items-center justify-center">
              {step.state === 'done' ? (
                <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-400 text-[#0B231C] shadow-[0_0_0_3px_rgba(52,211,153,0.15)]">
                  <Check className="h-2.5 w-2.5" strokeWidth={4} aria-hidden />
                </span>
              ) : step.state === 'active' ? (
                <span className="relative grid h-4 w-4 place-items-center">
                  <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-emerald-300/50" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_0_3px_rgba(52,211,153,0.2)]" />
                </span>
              ) : (
                <span className="h-2.5 w-2.5 rounded-full bg-white/20 shadow-[0_0_0_3px_rgba(255,255,255,0.04)]" />
              )}
            </span>
          ))}
        </span>
      </span>
      <span className="mt-1.5 grid grid-cols-5">
        {liveSteps.map((step) => (
          <span
            key={step.key}
            className={cn(
              'text-center text-[8px] font-extrabold uppercase tracking-[0.08em]',
              step.state === 'done' && 'text-emerald-100/70',
              step.state === 'active' && 'text-emerald-100/90',
              step.state === 'todo' && 'text-emerald-100/35',
            )}
          >
            {step.label}
          </span>
        ))}
      </span>
    </motion.button>
  )
}

export function LiveVisitSheet({
  lovedFirstName,
  caregiverFullName,
  onClose,
}: {
  lovedFirstName: string
  caregiverFullName: string
  onClose: () => void
}) {
  const { navigate } = useRouter()
  return (
    <SheetShell
      icon={MapPin}
      tone="success"
      title={`Live with ${lovedFirstName}`}
      subtitle={`${caregiverFullName}, arrived 2:04 PM and leaves around 4:00 PM`}
      onClose={onClose}
      footer={
        <div className="flex gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/patient/p16')}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <MapPin className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Live map</span>
          </motion.button>
          <CallButton
            name={caregiverFullName.split(' ')[0]}
            light
            label="Call nurse"
          />
        </div>
      }
    >
      <DarkPanel kicker="Care steps">
        <div className="flex flex-col gap-3">
          {liveSteps.map((step) => (
            <div key={step.key} className="flex items-center justify-between gap-3">
              <span className="min-w-0 text-[12.5px] font-bold tracking-tight text-emerald-50/90">
                {step.label}
              </span>
              <span
                className={
                  step.state === 'done'
                    ? 'shrink-0 text-[11.5px] font-bold text-emerald-300'
                    : step.state === 'active'
                      ? 'shrink-0 rounded-full bg-emerald-400/[0.16] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-emerald-200'
                      : 'shrink-0 text-[11.5px] font-bold text-emerald-100/40'
                }
              >
                {step.state === 'done'
                  ? 'Done'
                  : step.state === 'active'
                    ? 'In progress'
                    : 'Pending'}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-pretty text-[11px] font-medium leading-relaxed text-emerald-100/60">
          Each step is written to the visit record as the nurse completes it, with vitals and
          medication entries sealed on sign-off.
        </p>
      </DarkPanel>
    </SheetShell>
  )
}

export function MedicationCard({
  caregiverFirstName,
  onSchedule,
  onPrescriptions,
}: {
  caregiverFirstName: string
  onSchedule: () => void
  onPrescriptions: () => void
}) {
  const given = doseRounds.filter((r) => r.given).length
  return (
    <Hero tone="amber">
      <HeroTopRow
        icon={Pill}
        label="Medication, evening round"
        labelClass="text-amber-200/50"
      />
      <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Next dose 6:00 PM, <HeroHighlight tone="amber">due in 2 hours</HeroHighlight>
      </h3>
      <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-amber-100/70">
        Two medicines, given by {caregiverFirstName} during the live visit
      </p>

      <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-amber-400/[0.12] px-3.5 py-3">
        <span aria-hidden className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-300" />
        </span>
        <span className="min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-amber-100">
          Dose window 6 to 7 PM
        </span>
        <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-amber-200/80">
          {given} of {doseRounds.length} given
        </span>
      </div>

      <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
        <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-amber-200/60">
          Today's rounds
        </div>
        <div className="mt-2.5 flex flex-col gap-2.5">
          {doseRounds.map((round) => (
            <div key={round.key} className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[12px] font-bold text-amber-50/90">{round.slot}</div>
                <div className="mt-0.5 text-[10px] font-semibold tabular-nums text-amber-100/60">
                  {round.time}
                </div>
              </div>
              {round.given ? (
                <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-extrabold text-emerald-300">
                  <Check className="h-3 w-3" strokeWidth={3.2} aria-hidden />
                  Given
                </span>
              ) : (
                <span className="shrink-0 rounded-full bg-amber-400/[0.16] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-amber-200">
                  Pending
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          onClick={onSchedule}
          className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
        >
          <Pill className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate">Dose schedule</span>
        </button>
        <button
          type="button"
          onClick={onPrescriptions}
          className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white/[0.1] py-3.5 text-[13px] font-bold text-white transition-colors hover:bg-white/[0.16]"
        >
          <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate">Prescriptions</span>
        </button>
      </div>
    </Hero>
  )
}

export function NotificationBell({ onPress }: { onPress: () => void }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      onClick={onPress}
      aria-label="Notifications"
      className="relative grid size-10 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
    >
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" strokeLinecap="round" />
      </svg>
      <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-rose-500" aria-hidden />
    </motion.button>
  )
}

export function QuickActions({ onPress }: { onPress: (to: string) => void }) {
  return (
    <div className="rounded-3xl border border-[#0B211B]/[0.06] bg-white p-2 shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
      <div className="grid grid-cols-2 gap-2">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <motion.button
              key={action.key}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onPress(action.to)}
              className={cn(
                'flex items-center gap-3 rounded-2xl p-3 text-left transition-colors',
                action.tileBg,
              )}
            >
              <span
                className={cn(
                  'grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white',
                  action.tileClass,
                  action.glow,
                )}
              >
                <Icon className="h-4.5 w-4.5" strokeWidth={2.4} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    'block truncate text-[12.5px] font-extrabold tracking-tight',
                    action.labelClass,
                  )}
                >
                  {action.label}
                </span>
                <span
                  className={cn(
                    'mt-0.5 block truncate text-[9px] font-extrabold uppercase tracking-[0.1em]',
                    action.subClass,
                  )}
                >
                  {action.sub}
                </span>
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export function RecoveryCard({
  onPlan,
  onReports,
}: {
  onPlan: () => void
  onReports: () => void
}) {
  return (
    <Hero>
      <HeroTopRow
        icon={Activity}
        label="Recovery plan, elderly care"
      />
      <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Week {carePlan.week} of {carePlan.weeks}, <HeroHighlight>on track</HeroHighlight>
      </h3>
      <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/70">
        {carePlan.visitsDone} visits completed, goals logged at each one
      </p>

      <div className="mt-4 rounded-2xl bg-white/[0.06] p-4">
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/50">
          <span>Plan progress</span>
          <span className="tabular-nums text-emerald-200">{carePlan.progress}%</span>
        </div>
        <Meter value={carePlan.progress / 100} intent="success" delay={0.2} className="mt-2" />
        <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-300/70">
          <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
          On schedule, zero reschedules
        </div>
      </div>

      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          onClick={onPlan}
          className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-[13px] font-bold text-white shadow-[0_12px_28px_-12px_rgba(16,185,129,0.8)]"
        >
          <Activity className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate">Open plan</span>
        </button>
        <button
          type="button"
          onClick={onReports}
          className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white/[0.1] py-3.5 text-[13px] font-bold text-white transition-colors hover:bg-white/[0.16]"
        >
          <CalendarCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate">Weekly reports</span>
        </button>
      </div>
    </Hero>
  )
}

export function UpcomingVisitsCard({
  rows,
  onOpen,
}: {
  rows: VisitRow[]
  onOpen: () => void
}) {
  return (
    <Card>
      <div className="flex flex-col gap-2 p-4">
        {rows.map((row) => (
          <Row
            key={row.id}
            icon={CalendarCheck}
            tone={row.waiting ? 'warning' : 'success'}
            title={row.title}
            titleClassName="text-[13px]"
            subtitle={row.detail}
            subtitleClassName="text-[11px] text-[#0B211B]/50"
            chip={{
              label: row.waiting ? 'Waiting' : 'Confirmed',
              intent: row.waiting ? 'warning' : 'success',
              dot: row.waiting,
            }}
            surface="inset"
            padding="comfortable"
            hoverClassName="hover:bg-[#0B211B]/[0.05]"
            showChevron={false}
            trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />}
            onClick={onOpen}
          />
        ))}
      </div>
    </Card>
  )
}

export function AttentionList() {
  const { notify, dispatch } = useDemo()
  const { navigate } = useRouter()

  const attention: { icon: LucideIcon; tone: TileTone; onClick: () => void }[] = [
    {
      icon: Hourglass,
      tone: 'warning',
      onClick: () =>
        notify({
          title: 'Dispatch round in progress',
          body: `Round ${dispatch.round} · ${dispatch.waiting} offers waiting · expires ${dispatch.expiresAt}`,
          kind: 'info',
        }),
    },
    { icon: UserCheck, tone: 'success', onClick: () => navigate('/admin/a03') },
    { icon: ShieldCheck, tone: 'ink', onClick: () => navigate('/admin/a06') },
  ]

  return (
    <motion.div variants={rise}>
      <Card>
        {attention.map((a, i) => (
          <div key={adminAttention[i].title}>
            <ListRow
              icon={a.icon}
              tone={a.tone}
              title={adminAttention[i].title}
              subtitle={adminAttention[i].body}
              onClick={a.onClick}
            />
          </div>
        ))}
      </Card>
    </motion.div>
  )
}

export function IncidentOverviewCard() {
  const { navigate } = useRouter()
  return (
    <motion.div variants={rise}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.985 }}
        onClick={() => navigate('/admin/a02')}
        className="group block w-full text-left"
      >
        <Card intent="danger">
          <div className="flex items-center gap-3 p-4">
            <Tile icon={AlertTriangle} tone="danger" size="lg" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">
                {adminMetrics.openIncidents} open incidents
              </span>
              <span className="mt-0.5 block text-xs font-medium text-[#0B211B]/55">
                One is critical · tap to open the incident room
              </span>
            </span>
            <ChevronRight
              className="h-4 w-4 shrink-0 text-rose-500/60 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </div>
        </Card>
      </motion.button>
    </motion.div>
  )
}

export function LiveSessionsCard() {
  return (
    <motion.div variants={rise}>
      <Card intent="success">
        <div className="flex items-center gap-3 p-5">
          <Tile icon={Activity} tone="live" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">
              {adminMetrics.liveSessions} sessions live right now
            </div>
            <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              GPS-verified check-ins across Hyderabad
            </div>
          </div>
          <Chip intent="live" dot>Live</Chip>
        </div>
      </Card>
    </motion.div>
  )
}

interface PartnerBillingCardProps {
  invoiceAmount: string
  invoiceSessions: string
  onViewBilling: () => void
}

export function PartnerBillingCard({ invoiceAmount, invoiceSessions, onViewBilling }: PartnerBillingCardProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onViewBilling}
      className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2"
    >
      <Card>
        <Row
          icon={ReceiptText}
          tone={'emerald' as TileTone}
          tileSize="lg"
          title="February invoice"
          titleClassName="text-sm font-extrabold leading-snug"
          subtitle={invoiceSessions}
          subtitleClassName="text-xs"
          trailing={
            <span className="flex shrink-0 flex-col items-end gap-1.5">
              <span className="font-mono text-[14px] font-black tabular-nums tracking-tight text-[#0B211B]">{invoiceAmount}</span>
              <Chip intent="success" className="border-transparent">Paid</Chip>
            </span>
          }
          className="p-4"
          showChevron={false}
          hoverClassName="hover:bg-transparent"
          whileTapDisabled
        />
      </Card>
    </motion.button>
  )
}

function QuickTile({
  icon,
  tone,
  label,
  value,
  onClick,
}: {
  icon: LucideIcon
  tone: TileTone
  label: string
  value: string
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onClick={onClick}
      className="flex min-w-0 flex-1 flex-col items-start gap-2.5 rounded-2xl bg-[#0B211B]/[0.04] p-3.5 transition-colors hover:bg-[#0B211B]/[0.07]"
    >
      <Tile icon={icon} tone={tone} size="sm" />
      <span className="min-w-0">
        <span className="block truncate text-[12px] font-extrabold tracking-tight text-[#0B211B]">{label}</span>
        <span className="mt-0.5 block truncate text-[9.5px] font-bold text-[#0B211B]/45">{value}</span>
      </span>
    </motion.button>
  )
}

interface PartnerQuickActionsProps {
  staffCount: number
  sessionsCount: number
  onStaffClick: () => void
  onBillingClick: () => void
  onSessionsClick: () => void
}

export function PartnerQuickActions({
  staffCount,
  sessionsCount,
  onStaffClick,
  onBillingClick,
  onSessionsClick,
}: PartnerQuickActionsProps) {
  return (
    <div className="flex gap-2.5">
      <QuickTile
        icon={Users}
        tone="info"
        label="Staff"
        value={`${staffCount} on Ayvaa`}
        onClick={onStaffClick}
      />
      <QuickTile
        icon={ReceiptText}
        tone="warning"
        label="Billing"
        value="Up to date"
        onClick={onBillingClick}
      />
      <QuickTile
        icon={Stethoscope}
        tone="ink"
        label="Sessions"
        value={`${sessionsCount} done`}
        onClick={onSessionsClick}
      />
    </div>
  )
}

interface PartnerReferralCardProps {
  onOpenOptions: () => void
}

export function PartnerReferralCard({ onOpenOptions }: PartnerReferralCardProps) {
  return (
    <Card intent="success">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Tile icon={UserPlus} tone="live" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">
              Refer a patient for home care
            </div>
            <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              4-step wizard · guardian consents before matching
            </div>
          </div>
          <Chip intent="success" className="border-transparent">2 min</Chip>
        </div>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          onClick={onOpenOptions}
          className="mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
        >
          <Send className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Start referral
        </motion.button>
        <button
          type="button"
          onClick={onOpenOptions}
          className="mt-2 flex w-full items-center justify-center gap-1 text-xs font-bold text-emerald-700"
        >
          More options
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </Card>
  )
}

interface PartnerStatsHeroProps {
  partner: {
    name: string
    location: string
    referred: number
    activeCare: number
    staffOnAyvaa: number
    sessionsThisMonth: number
  }
  referrals: { status: 'active' | 'matching' }[]
  onOpenActivity: () => void
}

export function PartnerStatsHero({ partner, referrals, onOpenActivity }: PartnerStatsHeroProps) {
  const activeCount = referrals.filter((r) => r.status === 'active').length
  const matchingCount = referrals.length - activeCount

  const rail = [
    { label: 'Referred', value: partner.referred, width: 1, tone: 'success' as const },
    { label: 'Matching', value: matchingCount, width: Math.max(0.15, matchingCount / Math.max(1, partner.referred)), tone: 'warning' as const },
    { label: 'Staff', value: partner.staffOnAyvaa, width: Math.min(1, partner.staffOnAyvaa / 20), tone: 'info' as const },
  ]

  return (
    <Hero>
      <div className="flex items-center gap-3">
        <span className="relative shrink-0">
          <span aria-hidden className="absolute -inset-1 rounded-full bg-emerald-400/15 blur-md" />
          <span className="relative block">
            <AgentAvatar seed="sunrise" size={38} />
          </span>
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13px] font-extrabold tracking-tight text-white">Sunrise Multispeciality</div>
          <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-emerald-100/45">
            <LiveDot className="text-emerald-300" />
            Care partner since 2024
          </div>
        </div>
        <Chip intent="live" light dot className="border-transparent">
          Live
        </Chip>
      </div>

      <div className="mt-5 flex items-start justify-between gap-5">
        <div className="min-w-0 shrink">
          <span className="block bg-gradient-to-br from-emerald-200 via-teal-200 to-emerald-300 bg-clip-text text-[54px] font-black leading-none tracking-tighter text-transparent">
            {partner.activeCare}
          </span>
          <span className="mt-1.5 block text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-100/45">
            patients in care
          </span>
          <Chip intent="success" light icon={UserPlus} className="mt-2.5 border-transparent">
            +2 this week
          </Chip>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3 pt-1">
          {rail.map((m) => (
            <div key={m.label}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-emerald-100/50">{m.label}</span>
                <span className="text-[11px] font-extrabold tabular-nums text-emerald-50/85">{m.value}</span>
              </div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.08]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${m.width * 100}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className={cn(
                    'h-full rounded-full bg-gradient-to-r',
                    m.tone === 'success' && 'from-emerald-400 to-teal-300',
                    m.tone === 'warning' && 'from-amber-400 to-orange-300',
                    m.tone === 'info' && 'from-sky-400 to-blue-300',
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenActivity}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/[0.06] px-3.5 py-3 text-[11px] font-extrabold uppercase tracking-[0.1em] text-emerald-100/70 transition-colors hover:bg-white/[0.1]"
      >
        <BarChart3 className="h-4 w-4" strokeWidth={2.2} />
        View weekly activity
      </button>

      <div className="mt-3 flex items-center rounded-2xl bg-white/[0.06] px-3.5 py-3">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
          <span className="truncate text-[10px] font-extrabold uppercase tracking-[0.1em] text-emerald-100/60">
            {partner.referred} referred
          </span>
        </div>
        <span aria-hidden className="relative mx-2.5 h-px w-6 shrink-0 bg-emerald-300/40">
          <motion.span
            className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-teal-300"
            animate={{ x: [-4, 26], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
          <span className="truncate text-[10px] font-extrabold uppercase tracking-[0.1em] text-emerald-100/60">
            {partner.activeCare} in care
          </span>
        </div>
        <span aria-hidden className="relative mx-2.5 h-px w-6 shrink-0 bg-emerald-300/40">
          <motion.span
            className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-sky-300"
            animate={{ x: [-4, 26], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
          />
        </span>
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" />
          <span className="truncate text-[10px] font-extrabold uppercase tracking-[0.1em] text-emerald-100/60">
            {partner.sessionsThisMonth} sessions
          </span>
        </div>
      </div>
    </Hero>
  )
}

interface Referral {
  id: string
  name: string
  age: number
  condition: string
  caregiver?: string
  status: 'active' | 'matching'
  progress: string
  visits: string
}

interface ReferredPatientListProps {
  referrals: Referral[]
  onSelectReferral: (id: string) => void
}

export function ReferredPatientList({ referrals, onSelectReferral }: ReferredPatientListProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'matching'>('all')

  const filtered = referrals.filter((r) => {
    if (filter === 'all') return true
    return r.status === filter
  })

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'matching', label: 'Matching' },
  ] as const

  return (
    <div>
      <div className="mb-3 flex rounded-xl bg-[#0B211B]/[0.05] p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={cn(
              'relative flex-1 rounded-lg py-1.5 text-[11px] font-extrabold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40',
              filter === tab.key ? 'text-white' : 'text-[#0B211B]/50 hover:text-[#0B211B]',
            )}
          >
            {filter === tab.key && (
              <motion.span
                layoutId="referralFilter"
                className="absolute inset-0 rounded-lg bg-emerald-500 shadow-sm"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <Card>
        <AnimatePresence mode="popLayout">
          {filtered.map((r) => {
            const active = r.status === 'active'
            return (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
              >
                <Row
                  leading={<AgentAvatar seed={r.name} size={44} />}
                  title={`${r.name} · ${r.age}`}
                  titleClassName="leading-snug"
                  subtitle={`${r.condition} · ${r.caregiver ?? 'Awaiting match'}`}
                  subtitleClassName="text-[11px] font-semibold"
                  body={
                    <div className="mt-2 flex items-center gap-2">
                      <Meter
                        value={active ? 0.33 : 0.12}
                        intent={active ? 'success' : 'warning'}
                        delay={0.1}
                        className="w-20"
                      />
                      <span className="text-[9px] font-extrabold uppercase tracking-wide text-[#0B211B]/40">{r.progress}</span>
                    </div>
                  }
                  trailing={
                    <span className="flex shrink-0 flex-col items-end gap-1.5">
                      <Chip intent={active ? 'success' : 'warning'} dot={!active} className="border-transparent">
                        {active ? 'Active' : 'Matching'}
                      </Chip>
                      <TimeChip>{r.visits}</TimeChip>
                    </span>
                  }
                  onClick={() => onSelectReferral(r.id)}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </Card>
    </div>
  )
}
