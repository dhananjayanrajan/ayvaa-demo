import { Fragment, useState } from 'react'
import { motion } from 'motion/react'
import { CalendarClock, ChevronDown, Download, FileText, KeyRound, Lock, Trash2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import {
  Card,
  Chip,
  Expand,
  Panel,
  Section,
  Tile,
  TimeChip,
  rise,
  stagger,
} from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { deletionQueue, retentionPolicies } from '@/data/seed'
import { useDemo } from '@/lib/store'

const periodTones: TileTone[] = ['success', 'info', 'warning', 'ink']

const vaultSteps: { icon: LucideIcon; label: string; danger?: boolean }[] = [
  { icon: FileText, label: 'Written' },
  { icon: Lock, label: 'Sealed' },
  { icon: CalendarClock, label: 'Retained' },
  { icon: Trash2, label: 'Shredded', danger: true },
]

const cryptoRules: { icon: LucideIcon; text: string }[] = [
  { icon: Trash2, text: 'Files shredded beyond recovery' },
  { icon: KeyRound, text: 'Keys rotated after every purge' },
  { icon: Lock, text: 'Unrecoverable — by design' },
]

function VaultHero({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0E1621] shadow-[0_28px_64px_-30px_rgba(2,12,24,0.8)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-sky-500/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-indigo-400/[0.12] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/40 to-transparent" />
      <div className="relative p-5">{children}</div>
    </div>
  )
}

function Overline({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">
      <span>{children}</span>
    </div>
  )
}

export function A07() {
  const { notify } = useDemo()
  const [openId, setOpenId] = useState<string | null>(null)
  const running = deletionQueue.filter((d) => d.state === 'Running').length

  return (
    <Screen>
      <AppBar
        title="Retention policies"
        subtitle="How long Ayvaa keeps data"
        trailing={<AgentAvatar seed="ayvaa-retention" size={42} />}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-sky-400/[0.12] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <VaultHero>
                <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-sky-200/50">
                  <Lock className="h-3 w-3" aria-hidden />
                  Data vault · lifecycle engine
                </div>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  Deleted{' '}
                  <span className="bg-gradient-to-r from-sky-200 to-teal-100 bg-clip-text text-transparent">means deleted</span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-sky-100/55">
                  When a period ends, data purges itself. No manual deletion exists.
                </p>

                <div className="mt-5 flex items-center">
                  {vaultSteps.map((s, i) => (
                    <Fragment key={s.label}>
                      {i > 0 && <span aria-hidden className="mx-1 h-px w-4 shrink-0 bg-sky-300/30" />}
                      <div className="flex min-w-0 flex-col items-center gap-1.5">
                        <span
                          className={
                            s.danger
                              ? 'grid h-8 w-8 place-items-center rounded-xl bg-rose-400/15 text-rose-200 ring-1 ring-inset ring-rose-300/20'
                              : 'grid h-8 w-8 place-items-center rounded-xl bg-white/[0.07] text-sky-200 ring-1 ring-inset ring-white/10'
                          }
                        >
                          <s.icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                        </span>
                        <span
                          className={
                            s.danger
                              ? 'text-[8px] font-extrabold uppercase tracking-[0.14em] text-rose-200/70'
                              : 'text-[8px] font-extrabold uppercase tracking-[0.14em] text-sky-100/50'
                          }
                        >
                          {s.label}
                        </span>
                      </div>
                    </Fragment>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
                  {[
                    { v: retentionPolicies.length, l: 'Policies', d: 'bg-sky-300' },
                    { v: deletionQueue.length, l: 'In queue', d: 'bg-amber-300' },
                    { v: running, l: 'Shredding', d: 'bg-rose-300' },
                  ].map((s) => (
                    <div key={s.l} className="flex flex-col gap-1.5 px-3 first:pl-0">
                      <span className="flex items-center gap-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">
                        <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${s.d}`} />
                        {s.v}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-sky-100/45">{s.l}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-sky-300/25 bg-sky-400/15 px-2.5 py-[3px] text-[10px] font-bold tracking-wide text-sky-100">
                    <KeyRound className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                    Crypto-shredded
                  </span>
                  <span className="inline-flex shrink-0 items-center rounded-full bg-white/[0.07] px-2.5 py-[3px] text-[10px] font-bold tracking-wide text-sky-100/70">
                    Zero manual deletion
                  </span>
                </div>
              </VaultHero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Retention periods" trailing={<Chip intent="neutral">{retentionPolicies.length} rules</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {retentionPolicies.map((p, i) => {
                  const open = openId === p.type
                  return (
                    <div key={p.type}>
                      {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                      <button
                        type="button"
                        onClick={() => setOpenId(open ? null : p.type)}
                        className="group flex w-full items-center gap-3 px-4 py-3.5 text-left"
                      >
                        <Tile icon={FileText} tone={periodTones[i % periodTones.length]} />
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{p.type}</span>
                          <span className="mt-0.5 block text-[11px] font-medium text-[#0B211B]/45">Auto-purge · audit logged</span>
                        </span>
                        <TimeChip>{p.period}</TimeChip>
                        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                          <ChevronDown className="h-4 w-4 text-[#0B211B]/25" aria-hidden />
                        </motion.span>
                      </button>
                      <Expand open={open}>
                        <div className="px-4 pb-4">
                          <Panel intent="neutral" className="p-3.5">
                            <p className="text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/70">
                              Retained for {p.period}. Deletion runs automatically and is logged in the audit trail.
                            </p>
                          </Panel>
                        </div>
                      </Expand>
                    </div>
                  )
                })}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Deletion queue" trailing={<Chip intent="warning" dot={running > 0}>{deletionQueue.length} items</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {deletionQueue.map((d, i) => {
                  const isRunning = d.state === 'Running'
                  return (
                    <div key={d.label}>
                      {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.985 }}
                        onClick={() =>
                          notify(
                            isRunning
                              ? { title: d.label, body: `${d.detail} · shredding in progress`, kind: 'info' }
                              : { title: d.label, body: `${d.detail} · scheduled for deletion`, kind: 'warn' },
                          )
                        }
                        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                      >
                        <Tile icon={Trash2} tone={isRunning ? 'warning' : 'neutral'} />
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{d.label}</span>
                          <span className="mt-0.5 block truncate text-xs font-medium leading-relaxed text-[#0B211B]/55">{d.detail}</span>
                        </span>
                        {isRunning ? (
                          <Chip intent="warning" dot>Running</Chip>
                        ) : (
                          <Chip intent="neutral">Scheduled</Chip>
                        )}
                      </motion.button>
                    </div>
                  )
                })}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <VaultHero>
                <div className="flex items-start gap-3.5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-sky-700 shadow-[0_10px_20px_-12px_rgba(2,12,24,0.8)]">
                    <KeyRound className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="text-[15px] font-extrabold leading-snug tracking-tight text-white">Cryptographic deletion</div>
                    <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-sky-100/55">
                      Nothing is recoverable — not by us, not by anyone.
                    </p>
                  </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-2xl bg-white/[0.06]">
                  {cryptoRules.map((r, i) => (
                    <div key={r.text}>
                      {i > 0 && <div aria-hidden className="mx-3.5 h-px bg-white/[0.07]" />}
                      <div className="flex items-center gap-3 px-3.5 py-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] bg-sky-400/15 text-sky-200">
                          <r.icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1 text-[12.5px] font-semibold leading-snug text-sky-50/80">{r.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </VaultHero>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of retention" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => notify({ title: 'Policy export queued', body: 'Full retention policy will be emailed to you', kind: 'info' })}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(2,132,199,0.7)]"
        >
          <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Export policy
        </motion.button>
      </FootBar>
    </Screen>
  )
}
