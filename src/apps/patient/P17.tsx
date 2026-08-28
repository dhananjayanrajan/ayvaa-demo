import { motion } from 'motion/react'
import {
  Activity,
  Check,
  ChevronRight,
  Clock,
  HeartPulse,
  Lock,
  MapPin,
  Quote,
  ReceiptText,
  Share2,
  ShieldCheck,
  Star,
  TrendingUp,
  Wind,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { caregivers, pricing } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const readings: { icon: LucideIcon; value: string; label: string; sub: string; prev: string }[] = [
  { icon: HeartPulse, value: '128/76', label: 'Pressure', sub: 'Down 6 pts', prev: 'was 134/80' },
  { icon: Activity, value: '72 bpm', label: 'Pulse', sub: 'Steady', prev: 'was 71 bpm' },
  { icon: Wind, value: '97%', label: 'Oxygen', sub: 'Normal', prev: 'was 96%' },
]

const care = [
  'Recorded vital signs and compared with last visit',
  'Gave morning medication, two doses verified',
  'Completed fifteen minute guided walk',
  'Prepared low salt lunch from nutrition plan',
]

function DarkRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-100/45">{k}</span>
      <span className="truncate font-mono text-[12px] font-bold text-emerald-50/90">{v}</span>
    </div>
  )
}

export function P17() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const nurse = caregivers[0]
  const nurseFirst = nurse.name.split(' ')[0]

  return (
    <Screen>
      <AppBar
        title="Visit summary"
        subtitle="Wednesday, March 13 · 2:02 PM to 4:30 PM"
        onBack={() => navigate('/patient/p15')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => notify({ title: 'Summary shared', body: 'Visit summary copied for your family or doctor', kind: 'info' })}
            aria-label="Share summary"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
          >
            <Share2 className="size-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <div className="flex flex-col items-center text-center">
                  <span className="relative grid h-16 w-16 place-items-center">
                    <span aria-hidden className="absolute inset-0 rounded-full bg-emerald-400/20 blur-lg" />
                    <span className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_14px_28px_-12px_rgba(16,185,129,0.8)]">
                      <Lock className="h-6 w-6 text-white" strokeWidth={2.6} aria-hidden />
                    </span>
                  </span>
                  <Kicker>Sealed summary · immutable</Kicker>
                  <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                    All five steps{' '}
                    <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">completed</span>
                  </h2>
                </div>

                <div className="mt-5 rounded-2xl bg-white/[0.06] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-[11px] font-extrabold text-emerald-200">
                        {nurseFirst[0]}
                      </span>
                      <div className="min-w-0">
                        <div className="truncate text-[11px] font-bold leading-tight text-white">{nurse.name}</div>
                        <div className="truncate font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-100/45">
                          Signed 4:30 PM
                        </div>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-200">
                      Verified
                    </span>
                  </div>
                  <div aria-hidden className="my-3 h-px bg-white/[0.08]" />
                  <div className="grid grid-cols-3 divide-x divide-white/[0.08]">
                    {[
                      ['5 / 5', 'steps'],
                      ['3 / 3', 'goals'],
                      ['2h 28m', 'duration'],
                    ].map(([v, k]) => (
                      <div key={k} className="flex min-w-0 flex-col items-center gap-1 px-1">
                        <span className="max-w-full truncate text-[14px] font-extrabold tabular-nums leading-none text-white">{v}</span>
                        <span className="text-[8.5px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">{k}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Vitals · compared to last visit" trailing={<Chip intent="success" icon={TrendingUp}>Better</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="grid grid-cols-3 gap-2.5">
                {readings.map((r) => (
                  <motion.button
                    key={r.label}
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => notify({ title: `${r.label} · ${r.value}`, body: `${r.sub} · ${r.prev} · recorded by ${nurseFirst}`, kind: 'ok' })}
                    className="flex flex-col items-center gap-1.5 rounded-2xl bg-white px-2 py-4 shadow-[0_1px_2px_rgba(11,33,27,0.06),0_14px_32px_-22px_rgba(11,33,27,0.25)] transition-colors hover:bg-emerald-500/[0.04]"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_8px_18px_-8px_rgba(16,185,129,0.7)]">
                      <r.icon className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                    </span>
                    <span className="max-w-full truncate text-[13px] font-extrabold tabular-nums leading-none text-[#0B211B]">
                      {r.value}
                    </span>
                    <span className="max-w-full truncate text-[8.5px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
                      {r.label}
                    </span>
                    <span className="flex max-w-full items-center gap-1">
                      <TrendingUp className="h-2.5 w-2.5 shrink-0 text-emerald-600" strokeWidth={3} aria-hidden />
                      <span className="truncate text-[9px] font-bold text-emerald-700/80">{r.sub}</span>
                    </span>
                    <span className="max-w-full truncate font-mono text-[8.5px] font-semibold text-[#0B211B]/35">{r.prev}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Session ledger" trailing={<Chip intent="neutral">Sealed</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative p-5">
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
                    <MapPin className="h-3 w-3" aria-hidden />
                    Verified session record
                  </div>
                  <div className="mt-3 flex flex-col gap-2.5">
                    <DarkRow k="Checked in" v="2:02 PM · 120 m radius" />
                    <DarkRow k="Checked out" v="4:30 PM · signed" />
                    <DarkRow k="Goals logged" v="3 of 3 · all met" />
                    <DarkRow k="Doses given" v="2 · Rx-verified" />
                    <DarkRow k="Incidents" v="None" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Care delivered" />
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="success">
                {care.map((c, i) => (
                  <motion.button
                    key={c}
                    type="button"
                    whileTap={{ scale: 0.99 }}
                    onClick={() => notify({ title: 'Care step', body: `${c} · verified and sealed`, kind: 'ok' })}
                    className="w-full text-left"
                  >
                    {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                    <div className={cn('flex items-center gap-3 px-4', i === 0 ? 'py-3.5' : 'py-3.5')}>
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                        <Check className="h-3.5 w-3.5" strokeWidth={3.5} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1 text-[12.5px] font-medium text-[#0B211B]/75">{c}</span>
                      <Lock className="h-3 w-3 shrink-0 text-[#0B211B]/25" aria-hidden />
                    </div>
                  </motion.button>
                ))}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Caregiver note" />
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative p-5">
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
                    <Quote className="h-3 w-3" aria-hidden />
                    Sealed note · verbatim
                  </div>
                  <p className="mt-2.5 font-serif text-pretty text-[14px] font-medium leading-relaxed text-white/90">
                    &ldquo;Walked steadier than Monday and appetite was good. Recommend keeping the current walk length until
                    Friday.&rdquo;
                  </p>
                  <div className="mt-3 flex items-center gap-2.5 border-t border-white/[0.08] pt-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-[10px] font-extrabold text-emerald-200">
                      L
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[11.5px] font-bold text-emerald-50/80">{nurse.name}</span>
                    <span className="shrink-0 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-200">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Payment" trailing={<Chip intent="success">Captured</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate('/patient/p23')}
                className="block w-full text-left"
              >
                <Card>
                  <div className="flex items-center gap-3.5 p-4">
                    <Tile icon={ReceiptText} tone="success" size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">{pricing.elderly} charged</div>
                      <div className="mt-0.5 truncate text-[11px] font-medium text-[#0B211B]/55">
                        HDFC ••8842 · receipt saved
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
                  </div>
                </Card>
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={ShieldCheck} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Every reading, dose and note above is sealed against tampering — the same record is visible to your partner
                  hospital with your consent.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of summary" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/patient/p18')}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(245,158,11,0.75)]"
        >
          <Star className="h-4 w-4 shrink-0 fill-current" strokeWidth={2.4} aria-hidden />
          <span className="truncate">Rate visit</span>
        </motion.button>
      </FootBar>
    </Screen>
  )
}
