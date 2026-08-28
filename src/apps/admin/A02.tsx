import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  HeartHandshake,
  Lock,
  ShieldAlert,
  Siren,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import {
  Card,
  Chip,
  Kicker,
  Panel,
  Section,
  Tile,
  TimeChip,
  rise,
  stagger,
} from '@/components/phone/kit'
import { incidents } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

type Sheet = 'none' | 'photo' | 'escalate' | 'close'

const escalateActions: {
  icon: LucideIcon
  tone: 'info' | 'neutral' | 'warning'
  label: string
  sub: string
  body: string
  kind: 'info' | 'warn'
}[] = [
  { icon: Siren, tone: 'info', label: 'Page supervisor on call', sub: 'On-call supervisor, immediately', body: 'On-call supervisor notified immediately', kind: 'info' },
  { icon: HeartHandshake, tone: 'neutral', label: 'Notify family', sub: 'Guardian updated with context', body: 'Guardian updated on the incident', kind: 'info' },
  { icon: ShieldAlert, tone: 'warning', label: 'Escalate to senior ops', sub: 'Senior operations takes ownership', body: 'Senior operations team now owns this incident', kind: 'warn' },
]

function Overline({ icon: Icon, children }: { icon?: LucideIcon; children: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">
      {Icon && <Icon className="h-3 w-3" strokeWidth={2.5} aria-hidden />}
      <span>{children}</span>
    </div>
  )
}

function IncidentHero({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-rose-200/10 bg-[#230D14] shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-rose-500/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
      <div className="relative p-5">{children}</div>
    </div>
  )
}

function SheetButton({
  tone,
  icon: Icon,
  onClick,
  children,
}: {
  tone: 'danger' | 'success'
  icon: LucideIcon
  onClick: () => void
  children: ReactNode
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        'flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white',
        tone === 'danger'
          ? 'bg-gradient-to-r from-rose-600 to-red-500 shadow-[0_18px_36px_-18px_rgba(225,29,72,0.6)]'
          : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
      )}
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      <span className="whitespace-nowrap">{children}</span>
    </motion.button>
  )
}

function SheetHeader({
  icon,
  tone,
  title,
  sub,
  onClose,
}: {
  icon: LucideIcon
  tone: 'success' | 'warning'
  title: string
  sub: string
  onClose: () => void
}) {
  return (
    <div className="flex items-start gap-3">
      <Tile icon={icon} tone={tone} size="lg" />
      <div className="min-w-0 flex-1">
        <h3 className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">{title}</h3>
        <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">{sub}</p>
      </div>
      <motion.button
        type="button"
        whileTap={{ scale: 0.92 }}
        onClick={onClose}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
        aria-label="Close sheet"
      >
        <X className="h-4 w-4" aria-hidden />
      </motion.button>
    </div>
  )
}

export function A02() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [sheet, setSheet] = useState<Sheet>('none')
  const inc = incidents[0]

  return (
    <Screen>
      <AppBar
        title={`Near fall · ${inc.patient}`}
        subtitle={`Raised ${inc.raised} by ${inc.by}`}
        trailing={
          <Chip intent="danger" dot>
            Critical
          </Chip>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-rose-400/[0.14] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <IncidentHero>
                <Kicker>Critical incident · auto-contained</Kicker>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  Care plan{' '}
                  <span className="bg-gradient-to-r from-rose-300 to-orange-200 bg-clip-text text-transparent">paused automatically</span>
                </h2>
                <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-rose-100/55">
                  Post-operative care plan · week 4 of 6 · paused until a supervisor closes this incident.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Chip intent="neutral" light>Raised {inc.raised}</Chip>
                  <Chip intent="neutral" light>By {inc.by}</Chip>
                  <Chip intent="danger" light icon={ShieldAlert}>Containment active</Chip>
                </div>
              </IncidentHero>
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <div className="p-4">
                  <Overline>What happened</Overline>
                  <p className="mt-1.5 text-pretty text-[13px] font-medium leading-relaxed text-[#0B211B]/75">{inc.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {inc.tags.map((t) => (
                      <Chip key={t} intent="neutral">
                        {t}
                      </Chip>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => setSheet('photo')}
                className="group block w-full text-left"
              >
                <Card intent="danger">
                  <div className="flex items-center gap-3 p-4">
                    <Tile icon={Lock} tone="danger" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{inc.photo}</span>
                      <span className="mt-0.5 block text-xs font-medium leading-relaxed text-[#0B211B]/55">
                        View is logged with your name
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-rose-500/60 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </div>
                </Card>
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Linked records" trailing={<Chip intent="neutral">Sealed</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <div className="flex items-start gap-3 p-4">
                  <Tile icon={CheckCircle2} tone="success" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{inc.linkedVisit}</div>
                    <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                      Visit record · sealed and timestamped
                    </div>
                  </div>
                  <Chip intent="success">Sealed</Chip>
                </div>
                <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
                <div className="flex items-start gap-3 p-4">
                  <Tile icon={ShieldAlert} tone="warning" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{inc.linkedPlan}</div>
                    <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                      Care plan · resumes when incident closes
                    </div>
                  </div>
                  <Chip intent="warning">Paused</Chip>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Supervisor decision" trailing={<Chip intent="info">Required</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <div className="p-4">
                  <Overline icon={Lock}>Decision note</Overline>
                  <Textarea
                    defaultValue={inc.decision}
                    className="mt-2 min-h-24 w-full resize-none rounded-2xl border border-[#0B211B]/[0.08] bg-[#0B211B]/[0.03] p-3.5 text-[13px] font-medium leading-relaxed text-[#0B211B] placeholder:text-[#0B211B]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30"
                  />
                  <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold text-[#0B211B]/40">
                    <Lock className="h-3 w-3" aria-hidden />
                    Written to the audit record with your name
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of incident" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <FootBar>
        <div className="flex gap-2.5">
          <SheetButton tone="danger" icon={ArrowUpRight} onClick={() => setSheet('escalate')}>
            Escalate higher
          </SheetButton>
          <SheetButton tone="success" icon={CheckCircle2} onClick={() => setSheet('close')}>
            Close incident
          </SheetButton>
        </div>
      </FootBar>

      <AnimatePresence>
        {sheet !== 'none' && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSheet('none')}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet === 'photo' && (
          <motion.div
            key="photo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col bg-[rgba(10,18,15,0.94)] p-5 pb-7 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/60">
                <Lock className="h-3 w-3" aria-hidden />
                Incident photo · restricted
              </span>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setSheet('none')}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white"
                aria-label="Close photo"
              >
                <X className="h-5 w-5" aria-hidden />
              </motion.button>
            </div>

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.25 }}
              className="mt-4 grid flex-1 place-items-center rounded-[26px] border border-white/10 bg-white/[0.04]"
            >
              <div className="flex flex-col items-center gap-3">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-white/[0.06]">
                  <Lock className="h-7 w-7 text-white/30" aria-hidden />
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/30">Encrypted preview</span>
              </div>
            </motion.div>

            <div className="mt-4 flex flex-col gap-2.5 rounded-[20px] bg-white/[0.05] p-4">
              <div className="flex items-baseline justify-between gap-3">
                <span className="shrink-0 text-[11.5px] font-medium text-white/50">Captured</span>
                <span className="text-right text-[12.5px] font-bold leading-snug text-white">9:38 AM · hallway camera</span>
              </div>
              <div aria-hidden className="h-px bg-white/[0.07]" />
              <div className="flex items-baseline justify-between gap-3">
                <span className="shrink-0 text-[11.5px] font-medium text-white/50">Viewed by</span>
                <span className="text-right text-[12.5px] font-bold leading-snug text-white">You · logged in audit</span>
              </div>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSheet('none')
                notify({ title: 'Access logged', body: 'Your view of this photo is written to the audit record', kind: 'info' })
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              Close and log my access
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(sheet === 'escalate' || sheet === 'close') && (
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] border-t border-white/40 bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />

            {sheet === 'escalate' ? (
              <>
                <SheetHeader
                  icon={ShieldAlert}
                  tone="warning"
                  title="Escalate this incident"
                  sub="Choose who takes it next"
                  onClose={() => setSheet('none')}
                />

                <div className="flex flex-col gap-2">
                  {escalateActions.map((a) => (
                    <motion.button
                      key={a.label}
                      type="button"
                      whileTap={{ scale: 0.985 }}
                      onClick={() => {
                        setSheet('none')
                        notify({ title: a.label, body: a.body, kind: a.kind })
                      }}
                      className="group flex w-full items-center gap-3 rounded-2xl bg-[#0B211B]/[0.035] p-3.5 text-left transition-colors hover:bg-[#0B211B]/[0.06]"
                    >
                      <Tile icon={a.icon} tone={a.tone} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{a.label}</span>
                        <span className="mt-0.5 block text-[11.5px] font-medium leading-relaxed text-[#0B211B]/55">{a.sub}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </motion.button>
                  ))}
                </div>

                <p className="text-center text-[11px] font-medium leading-relaxed text-[#0B211B]/45">
                  Every escalation is timestamped in the audit record.
                </p>
              </>
            ) : (
              <>
                <SheetHeader
                  icon={CheckCircle2}
                  tone="success"
                  title="Close this incident?"
                  sub="Closing resumes the care plan and notifies the family and caregiver."
                  onClose={() => setSheet('none')}
                />

                <Panel intent="success" className="p-3.5">
                  <div className="flex items-center gap-1.5">
                    <TimeChip>Note</TimeChip>
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-700/70">Your decision</span>
                  </div>
                  <p className="mt-1.5 text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/75">{inc.decision}</p>
                </Panel>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSheet('none')
                    notify({ title: 'Incident closed', body: 'Care plan resumed · family and caregiver notified', kind: 'ok' })
                    navigate('/admin/a01')
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  Confirm close
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSheet('none')}
                  className="w-full rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/70"
                >
                  Keep it open
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
