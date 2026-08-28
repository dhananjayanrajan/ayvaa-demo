import { Fragment, useState } from 'react'
import { motion } from 'motion/react'
import {
  Activity,
  Baby,
  Cake,
  CalendarCheck,
  Check,
  HeartPulse,
  HeartHandshake,
  Phone,
  Send,
  ShieldCheck,
  User,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import AnimatedFileUpload from '@/components/smoothui/animated-file-upload'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Section, rise, stagger } from '@/components/phone/kit'
import { partner, referrals } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

const categories: { label: string; icon: LucideIcon }[] = [
  { label: 'Elderly care', icon: Users },
  { label: 'Post-operative', icon: HeartPulse },
  { label: 'Chronic care', icon: CalendarCheck },
  { label: 'Pediatric', icon: Baby },
  { label: 'Palliative', icon: HeartHandshake },
  { label: 'Disability', icon: Activity },
]

const barcode = [3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2, 2, 1, 1, 3, 1, 2, 1, 3, 2, 1, 1]

type StepState = 'done' | 'current' | 'todo'

function HeroStep({ label, state }: { label: string; state: StepState }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-1.5">
      {state === 'done' ? (
        <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400 text-[#0B231C]">
          <Check className="h-3 w-3" strokeWidth={4} aria-hidden />
        </span>
      ) : state === 'current' ? (
        <span className="relative grid h-5 w-5 place-items-center">
          <span aria-hidden className="absolute h-5 w-5 animate-ping rounded-full bg-emerald-300/50" />
          <span className="relative h-3.5 w-3.5 rounded-full bg-emerald-300 ring-4 ring-emerald-300/20" />
        </span>
      ) : (
        <span className="h-3.5 w-3.5 rounded-full bg-white/15" />
      )}
      <span
        className={cn(
          'text-[8px] font-extrabold uppercase tracking-[0.12em]',
          state === 'todo' ? 'text-emerald-100/30' : 'text-emerald-100/70',
        )}
      >
        {label}
      </span>
    </div>
  )
}

function RxRow({ label, value, onClick }: { label: string; value: string; onClick: () => void }) {
  return (
    <motion.button type="button" whileTap={{ scale: 0.985 }} onClick={onClick} className="flex w-full items-baseline text-left">
      <span className="shrink-0 text-[12.5px] font-bold text-emerald-100/50">{label}</span>
      <span aria-hidden className="mx-2.5 min-w-0 flex-1 -translate-y-1 border-b border-dotted border-white/20" />
      <span className="shrink-0 text-[13px] font-extrabold tracking-tight text-white">{value}</span>
    </motion.button>
  )
}

export function PT03() {
  const { notify } = useDemo()
  const r = referrals[0]
  const [category, setCategory] = useState(r.condition === 'Hip recovery' ? 'Post-operative' : 'Elderly care')
  const [files, setFiles] = useState(0)

  const steps: { label: string; state: StepState }[] = [
    { label: 'Patient', state: 'done' },
    { label: 'Category', state: 'done' },
    { label: 'Records', state: files > 0 ? 'done' : 'current' },
    { label: 'Send', state: files > 0 ? 'current' : 'todo' },
  ]
  const ready = steps.filter((s) => s.state === 'done').length

  return (
    <Screen>
      <AppBar title="Refer a patient" subtitle={partner.name} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
                        <Send className="h-3 w-3" aria-hidden />
                        Referral wizard
                      </div>
                      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                        Four steps to{' '}
                        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">continuity of care</span>
                      </h2>
                    </div>
                    <Chip intent="live" light dot className="mt-1 shrink-0">
                      {ready}/4
                    </Chip>
                  </div>

                  <div className="mt-5 flex items-start">
                    {steps.map((s, i) => (
                      <Fragment key={s.label}>
                        {i > 0 && (
                          <span
                            aria-hidden
                            className={cn('mt-2.5 h-px flex-1', s.state === 'todo' ? 'bg-white/15' : 'bg-emerald-300/50')}
                          />
                        )}
                        <HeroStep label={s.label} state={s.state} />
                      </Fragment>
                    ))}
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"
                      initial={{ width: 0 }}
                      animate={{ width: `${(ready / 4) * 100}%` }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[24px] bg-[#0B231C] shadow-[0_24px_56px_-26px_rgba(6,40,30,0.75)]">
                <div aria-hidden className="pointer-events-none absolute -left-10 -top-12 h-36 w-36 rounded-full bg-teal-400/15 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -right-10 -bottom-12 h-36 w-36 rounded-full bg-emerald-400/10 blur-3xl" />
                <div className="relative p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Admission tag · draft</div>
                      <div className="mt-1.5 truncate text-[18px] font-extrabold tracking-tight text-white">{r.name}</div>
                    </div>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.08] text-[16px] font-extrabold text-emerald-200 ring-1 ring-inset ring-white/10">
                      {r.age}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
                    <div className="min-w-0">
                      <div className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/35">Condition</div>
                      <div className="truncate text-[12px] font-bold text-emerald-50/85">{r.condition}</div>
                    </div>
                    <div className="min-w-0">
                      <div className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/35">Referred by</div>
                      <div className="truncate text-[12px] font-bold text-emerald-50/85">{r.by}</div>
                    </div>
                    <div className="min-w-0">
                      <div className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/35">Care area</div>
                      <div className="truncate text-[12px] font-bold text-emerald-50/85">{partner.location}</div>
                    </div>
                    <div className="min-w-0">
                      <div className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/35">Guardian</div>
                      <div className="truncate text-[12px] font-bold text-emerald-50/85">Priya Sharma</div>
                    </div>
                  </div>
                  <div aria-hidden className="my-4 border-t border-dashed border-white/15" />
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex h-6 items-end gap-[2.5px]" aria-hidden>
                      {barcode.map((w, i) => (
                        <span key={i} className="h-6 bg-emerald-200/50" style={{ width: w }} />
                      ))}
                    </div>
                    <span className="shrink-0 font-mono text-[10px] font-bold tracking-[0.14em] text-emerald-100/40">
                      REF-2026-0417
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Care category" trailing={<Chip intent="success">{category}</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="grid grid-cols-2 gap-2.5">
                {categories.map((c) => {
                  const active = category === c.label
                  return (
                    <motion.button
                      key={c.label}
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setCategory(c.label)
                        notify({ title: 'Category set', body: `${c.label} · matching will key off this`, kind: 'info' })
                      }}
                      className={cn(
                        'relative flex items-center gap-2.5 rounded-2xl p-3.5 text-left transition-all',
                        active
                          ? 'bg-emerald-500/[0.12] ring-2 ring-emerald-500/60 shadow-[0_10px_24px_-14px_rgba(16,185,129,0.8)]'
                          : 'bg-white ring-1 ring-inset ring-[#0B211B]/[0.08] hover:ring-[#0B211B]/[0.18]',
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl',
                          active
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_6px_14px_-6px_rgba(16,185,129,0.8)]'
                            : 'bg-[#0B211B]/[0.05] text-[#0B211B]/55',
                        )}
                      >
                        <c.icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                      </span>
                      <span
                        className={cn(
                          'min-w-0 flex-1 text-[12px] font-bold leading-tight tracking-tight',
                          active ? 'text-emerald-800' : 'text-[#0B211B]/70',
                        )}
                      >
                        {c.label}
                      </span>
                      {active && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_4px_10px_-4px_rgba(16,185,129,0.8)]"
                        >
                          <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                        </motion.span>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section
                label="Discharge records"
                trailing={<Chip intent={files > 0 ? 'success' : 'warning'} dot={files === 0}>{files > 0 ? `${files} attached` : 'Pending'}</Chip>}
              />
            </motion.div>

            <motion.div variants={rise}>
              <AnimatedFileUpload
                accept=".pdf"
                onFilesSelected={(f) => {
                  setFiles(f.length)
                  notify({ title: 'File attached', body: `${f.length} file(s) ready to send`, kind: 'ok' })
                }}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Clinical recommendation" trailing={<Chip intent="info">Rx</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[24px] bg-[#0B231C] p-5 shadow-[0_24px_56px_-26px_rgba(6,40,30,0.75)]">
                <div aria-hidden className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
                <span aria-hidden className="pointer-events-none absolute right-4 top-1 select-none font-serif text-[56px] leading-none text-emerald-300/20">
                  Rx
                </span>
                <div className="relative">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Signed by {r.by}</div>
                  <div className="mt-3 flex flex-col gap-3.5">
                    <RxRow
                      label="Plan"
                      value="Post-operative care"
                      onClick={() => notify({ title: 'Plan', body: 'Post-operative care · clinical recommendation', kind: 'info' })}
                    />
                    <RxRow
                      label="Duration"
                      value="6 wks · 3 visits/wk"
                      onClick={() => notify({ title: 'Duration', body: '6 weeks · 3 visits a week', kind: 'info' })}
                    />
                    <RxRow
                      label="Caregiver"
                      value="Recovery assistant"
                      onClick={() => notify({ title: 'Caregiver', body: 'Recovery assistant preferred by the family', kind: 'info' })}
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-white/[0.07] px-3.5 py-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200">
                      <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1 text-[10.5px] font-bold leading-snug text-emerald-50/75">
                      Guardian signs consent before any matching begins.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="info">
                <div className="flex items-start gap-3 p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500/15">
                    <User className="h-3.5 w-3.5 text-sky-600" strokeWidth={2.4} aria-hidden />
                  </span>
                  <p className="min-w-0 flex-1 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                    Referrals are shared only with Ayvaa's care team. Nothing reaches caregivers until the guardian consents.
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of referral" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => notify({ title: 'Referral sent', body: 'Ayvaa care team will reach the guardian within 2 hours', kind: 'ok' })}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
        >
          <Send className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Send referral to Ayvaa
        </motion.button>
      </FootBar>
    </Screen>
  )
}
