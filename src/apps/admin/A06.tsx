import { motion } from 'motion/react'
import { Ban, CalendarClock, Check, CheckCircle2, FileText, Phone, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
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
  Stat,
  Tile,
  rise,
  stagger,
} from '@/components/phone/kit'
import { consentReview, consentTracking, consentWithdrawal } from '@/data/seed'
import { useDemo } from '@/lib/store'

const lifecycle: { icon: LucideIcon; text: string }[] = [
  { icon: CalendarClock, text: 'Re-confirmed every 90 days' },
  { icon: Ban, text: 'Withdrawals stop care immediately' },
  { icon: ShieldCheck, text: 'Sealed record, immutable' },
]

function Overline({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">
      <span>{children}</span>
    </div>
  )
}

function TonButton({
  icon: Icon,
  onClick,
  children,
}: {
  icon: LucideIcon
  onClick: () => void
  children: ReactNode
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      <span className="truncate">{children}</span>
    </motion.button>
  )
}

function GradButton({
  icon: Icon,
  onClick,
  children,
}: {
  icon: LucideIcon
  onClick: () => void
  children: ReactNode
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      <span className="truncate">{children}</span>
    </motion.button>
  )
}

function CycleStep({ label, sub, done }: { label: string; sub: string; done: boolean }) {
  return (
    <div className="flex min-w-[84px] flex-col items-center">
      {done ? (
        <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-white">
          <Check className="h-2.5 w-2.5" strokeWidth={4} aria-hidden />
        </span>
      ) : (
        <span className="relative grid h-4 w-4 place-items-center">
          <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-amber-400/50" />
          <span className="relative h-2.5 w-2.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
        </span>
      )}
      <span className="mt-1.5 text-center text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#0B211B]/60">{label}</span>
      <span className="text-center text-[9px] font-bold text-[#0B211B]/35">{sub}</span>
    </div>
  )
}

export function A06() {
  const { notify } = useDemo()

  const facts: [string, string][] = [
    ['Signed', consentReview.signed],
    ['Pauses', consentReview.pauses],
    ['Reminded', consentReview.reminded],
  ]

  const dueSteps: { label: string; sub: string; done: boolean }[] = [
    { label: 'Signed', sub: String(consentReview.signed), done: true },
    { label: 'Reminded', sub: `${consentReview.reminded}x`, done: true },
    { label: 'Due now', sub: consentReview.due, done: false },
  ]

  const closure: { label: string; state: string; done: boolean }[] = [
    { label: 'Care stopped', state: consentWithdrawal.time, done: true },
    { label: 'Family informed', state: 'Immediate', done: true },
    { label: 'Seal the record', state: 'Pending your confirm', done: false },
  ]

  return (
    <Screen>
      <AppBar
        title="Consent tracking"
        subtitle="Signed · due · withdrawn"
        trailing={<AgentAvatar seed="ayvaa-consent" size={42} />}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <Kicker>Consent ledger · 90-day cycle</Kicker>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  Consent,{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">never stale</span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  Every consent renews on a clock the system enforces.
                </p>

                <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
                  <Stat label="Active" value={consentTracking.active} dot="bg-emerald-300" />
                  <Stat label="Due" value={consentTracking.due} dot="bg-amber-300" />
                  <Stat label="Withdrawn" value={consentTracking.withdrawn} dot="bg-rose-300/80" />
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Chip intent="neutral" light>Auto reminders on</Chip>
                  <Chip intent="success" light>Ledger sealed</Chip>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Due for review" trailing={<Chip intent="warning" dot>1 needs action</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="warning">
                <div aria-hidden className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-400" />
                <div className="p-5">
                  <div className="flex items-start gap-3.5">
                    <Tile icon={CalendarClock} tone="warning" size="lg" />
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">{consentReview.name}</span>
                        <Chip intent="warning" dot>{consentReview.due}</Chip>
                      </div>
                      <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">{consentReview.category}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between gap-2">
                      <Overline>90-day cycle</Overline>
                      <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-amber-700">Day 78 of 90</span>
                    </div>
                    <Meter value={78 / 90} intent="warning" delay={0.2} className="mt-2" />

                    <div className="mt-4 flex items-start justify-between">
                      {dueSteps.map((s) => (
                        <CycleStep key={s.label} label={s.label} sub={s.sub} done={s.done} />
                      ))}
                    </div>
                  </div>

                  <Panel intent="neutral" className="mt-4">
                    <div className="grid grid-cols-3 divide-x divide-[#0B211B]/[0.06]">
                      {facts.map(([k, v]) => (
                        <div key={k} className="flex min-w-0 flex-col items-center gap-1 px-2 py-3">
                          <span className="max-w-full truncate text-[14px] font-extrabold tabular-nums leading-none text-[#0B211B]">{v}</span>
                          <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/45">{k}</span>
                        </div>
                      ))}
                    </div>
                  </Panel>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {consentReview.pills.map((p) => (
                      <Chip key={p} intent="neutral">
                        {p}
                      </Chip>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-2.5">
                    <TonButton
                      icon={FileText}
                      onClick={() =>
                        notify({ title: 'Record opened', body: `${consentReview.name} · consent history attached`, kind: 'info' })
                      }
                    >
                      View record
                    </TonButton>
                    <GradButton
                      icon={Phone}
                      onClick={() => notify({ title: 'Guardian called', body: 'Priya Sharma reached · review scheduled', kind: 'ok' })}
                    >
                      Call guardian
                    </GradButton>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Withdrawn" trailing={<Chip intent="danger">{consentTracking.withdrawn}</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-rose-200/10 bg-[#230D14] shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-rose-500/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
                <div className="relative p-5">
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/50">
                    <Ban className="h-3 w-3" aria-hidden />
                    Withdrawal · consent revoked
                  </div>
                  <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                    {consentWithdrawal.name}{' '}
                    <span className="bg-gradient-to-r from-rose-300 to-orange-200 bg-clip-text text-transparent">withdrew consent</span>
                  </h3>
                  <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-rose-100/60">
                    {consentWithdrawal.body}
                  </p>

                  <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-rose-400/[0.12] px-3.5 py-3">
                    <span aria-hidden className="relative flex h-2 w-2 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-300 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-300" />
                    </span>
                    <span className="min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-rose-100">
                      Care paused instantly
                    </span>
                    <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-rose-200/70">
                      {consentWithdrawal.time}
                    </span>
                  </div>

                  <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-200/60">What happens now</div>
                    <p className="mt-1.5 text-pretty text-[12.5px] font-medium leading-relaxed text-white/80">
                      {consentWithdrawal.option}
                    </p>
                  </div>

                  <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-200/60">Closure checklist</div>
                    <div className="mt-3 flex flex-col">
                      {closure.map((c, i) => {
                        const last = i === closure.length - 1
                        return (
                          <div key={c.label} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              {c.done ? (
                                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/90 text-white">
                                  <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                                </span>
                              ) : (
                                <span className="relative grid h-5 w-5 shrink-0 place-items-center">
                                  <span aria-hidden className="absolute h-5 w-5 animate-ping rounded-full bg-rose-400/40" />
                                  <span className="relative h-2.5 w-2.5 rounded-full bg-rose-400" />
                                </span>
                              )}
                              {!last && <span aria-hidden className="my-1 w-px flex-1 bg-white/15" />}
                            </div>
                            <div className={last ? 'min-w-0 flex-1 pb-0.5' : 'min-w-0 flex-1 pb-4'}>
                              <div className="text-[13px] font-bold leading-snug tracking-tight text-white">{c.label}</div>
                              <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-rose-100/45">
                                {c.state}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>
                      notify({ title: 'Checklist confirmed', body: 'Closure checklist completed · record sealed', kind: 'ok' })
                    }
                    className="mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                    <span className="truncate">{consentWithdrawal.action}</span>
                  </motion.button>
                  <p className="mt-2.5 text-center text-[10.5px] font-semibold leading-relaxed text-rose-100/40">
                    Sealing writes the final entry to the audit record — family and caregiver are notified.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Hero>
                <div className="flex items-start gap-3.5">
                  <Tile icon={ShieldCheck} tone="white" size="lg" />
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="text-[15px] font-extrabold leading-snug tracking-tight text-white">Consent is a living record</div>
                    <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-emerald-100/55">
                      The ledger enforces itself — no chasing, no expiry surprises.
                    </p>
                  </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-2xl bg-white/[0.06]">
                  {lifecycle.map((r) => (
                    <div key={r.text} className="flex items-center gap-3 border-t border-white/[0.07] px-3.5 py-3 first:border-t-0">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] bg-emerald-400/15 text-emerald-200">
                        <r.icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1 text-[12.5px] font-semibold leading-snug text-emerald-50/80">{r.text}</span>
                    </div>
                  ))}
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of consent tracking" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
