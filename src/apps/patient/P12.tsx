import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  CalendarCheck,
  Check,
  ChevronRight,
  Clock,
  CreditCard,
  House,
  Lock,
  ScrollText,
  Send,
  Share2,
  ShieldCheck,
  Star,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Meter, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { carePlan, caregivers, guardian, lovedOnes, pricing } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const schedDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const visitDays = [true, false, true, false, true, false, false]

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)

function LeaderRow({ k, v, icon: Icon }: { k: string; v: string; icon?: LucideIcon }) {
  return (
    <div className="flex items-baseline">
      <span className="shrink-0 text-[11.5px] font-semibold text-[#0B211B]/60">{k}</span>
      <span aria-hidden className="mx-2.5 min-w-0 flex-1 -translate-y-1 border-b border-dotted border-[#0B211B]/20" />
      <span className="flex min-w-0 items-center gap-1.5">
        <span className="truncate font-mono text-[12px] font-bold text-[#0B211B]">{v}</span>
        {Icon && <Icon className="h-3 w-3 shrink-0 text-emerald-700" strokeWidth={2.6} aria-hidden />}
      </span>
    </div>
  )
}

function DarkRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-100/45">{k}</span>
      <span className="truncate font-mono text-[12px] font-bold text-emerald-50/90">{v}</span>
    </div>
  )
}

const nextSteps = [
  { t: 'Offers dispatched', s: 'Just now · 14 caregivers notified', done: true, active: true },
  { t: 'Caregiver matched', s: 'Usually within 2 hours · you approve', done: false, active: false },
  { t: 'Reminders before every visit', s: 'Automatic push · nobody sets them', done: false, active: false },
  { t: 'Payment captured', s: 'After each verified visit · never before', done: false, active: false },
]

export function P12() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [confirmed, setConfirmed] = useState(false)
  const [consentCare, setConsentCare] = useState(true)
  const [consentMeds, setConsentMeds] = useState(true)
  const [sheet, setSheet] = useState(false)

  const caregiver = caregivers[0]
  const father = lovedOnes[0]
  const first = father.name.split(' ')[0]
  const ready = consentCare && consentMeds

  if (confirmed) {
    return (
      <Screen>
        <AppBar
          title="Booking confirmed"
          trailing={
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => notify({ title: 'Summary shared', body: 'Booking details copied for your family', kind: 'info' })}
              aria-label="Share"
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
                    <span className="relative grid h-[72px] w-[72px] place-items-center">
                      <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30" />
                      <span className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_16px_32px_-12px_rgba(16,185,129,0.8)]">
                        <Check className="h-8 w-8 text-white" strokeWidth={3} aria-hidden />
                      </span>
                    </span>
                    <Kicker>Offers dispatched just now</Kicker>
                    <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                      Your recurring care is{' '}
                      <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">booked</span>
                    </h2>
                    <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                      Consent is sealed · caregivers near you are seeing the offer right now.
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col items-center gap-2">
                    <Chip intent="live" light dot className="border-transparent">1 event emitted</Chip>
                    <span aria-hidden className="h-3 w-px bg-gradient-to-b from-emerald-300/60 to-transparent" />
                    <div className="grid w-full grid-cols-2 gap-2">
                      {[
                        { label: `${caregiver.name.split(' ')[0]} + 13 nearby`, sub: 'Seeing the offer' },
                        { label: 'Family + partner', sub: 'Notified instantly' },
                        { label: 'Audit log', sub: 'Sealed entry' },
                        { label: 'Reminders', sub: 'Auto, every visit' },
                      ].map((d) => (
                        <div key={d.sub} className="rounded-2xl bg-white/[0.06] px-3 py-2.5">
                          <div className="truncate text-[11px] font-bold text-white">{d.label}</div>
                          <div className="mt-0.5 truncate text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">{d.sub}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Hero>
              </motion.div>

              <motion.div variants={rise}>
                <Section label="Your booking" trailing={<Chip intent="success" icon={Lock}>Sealed</Chip>} />
              </motion.div>

              <motion.div variants={rise}>
                <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                  <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                  <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                  <div className="relative p-5">
                    <div className="flex flex-col gap-2.5">
                      <DarkRow k="Caregiver pool" v={`${caregiver.name.split(' ')[0]} + 13 nearby`} />
                      <DarkRow k="Person cared for" v={father.name} />
                      <DarkRow k="Schedule" v="Mon, Wed, Fri · 2:00 PM" />
                      <DarkRow k="Duration" v="2 hours per visit" />
                      <DarkRow k="Weekly price" v={pricing.weekly} />
                      <DarkRow k="Consent record" v="Signed today" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={rise}>
                <Section label="What happens next" trailing={<Chip intent="live" dot>Live now</Chip>} />
              </motion.div>

              <motion.div variants={rise}>
                <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                  <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                  <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                  <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
                  <div className="relative p-5">
                    <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
                      <Send className="h-3 w-3" aria-hidden />
                      Dispatch · live now
                    </div>
                    <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                      The system{' '}
                      <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">takes it from here</span>
                    </h3>
                    <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/60">
                      Every step below fires on its own — you get a push for each.
                    </p>

                    <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
                      <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/60">Automatic sequence</div>
                      <div className="mt-3 flex flex-col">
                        {nextSteps.map((s, i) => {
                          const last = i === nextSteps.length - 1
                          return (
                            <div key={s.t} className="flex gap-3">
                              <div className="flex flex-col items-center">
                                {s.done ? (
                                  <span className="relative mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/90 text-white">
                                    {s.active && <span aria-hidden className="absolute h-5 w-5 animate-ping rounded-full bg-emerald-400/40" />}
                                    <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                                  </span>
                                ) : (
                                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-white/15" />
                                )}
                                {!last && <span aria-hidden className="my-1 w-px flex-1 bg-white/15" />}
                              </div>
                              <div className={last ? 'min-w-0 flex-1 pb-0.5' : 'min-w-0 flex-1 pb-4'}>
                                <div className="truncate text-[13px] font-bold leading-snug tracking-tight text-white">{s.t}</div>
                                <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-100/45">{s.s}</div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <p className="mt-2.5 text-center text-[10.5px] font-semibold leading-relaxed text-emerald-100/40">
                      Family and partner were notified the moment you confirmed.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={rise}>
                <EndOfScroll label="End of confirmation" />
              </motion.div>
            </motion.div>
          </div>
        </BodyArea>
        <FootBar>
          <div className="flex gap-2.5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/patient/p15')}
              className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
            >
              <CalendarCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              <span className="truncate">View my visits</span>
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/patient/p06')}
              className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
            >
              <House className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              <span className="truncate">Back to home</span>
            </motion.button>
          </div>
        </FootBar>
      </Screen>
    )
  }

  return (
    <Screen>
      <AppBar title="Review booking" subtitle="Step 3 of 3 · final check" onBack={() => navigate('/patient/p10')} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Kicker>Booking · step 3 of 3</Kicker>
                    <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                      One tap and{' '}
                      <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">care begins</span>
                    </h2>
                    <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                      {pricing.weekly} per week · charged only after each completed visit.
                    </p>
                  </div>
                  <Chip intent="success" light dot className="mt-1 shrink-0 border-transparent">
                    Final check
                  </Chip>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    { icon: CalendarCheck, l: 'Visits', v: '3 / week' },
                    { icon: Clock, l: 'Duration', v: '2 hours' },
                    { icon: CreditCard, l: 'Weekly', v: pricing.weekly },
                  ].map((f) => (
                    <div key={f.l} className="rounded-2xl bg-white/[0.06] px-3 py-2.5">
                      <f.icon className="h-3.5 w-3.5 text-emerald-300" strokeWidth={2.4} aria-hidden />
                      <div className="mt-1.5 truncate text-[12px] font-extrabold leading-none text-white">{f.v}</div>
                      <div className="mt-1 truncate text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/40">{f.l}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl bg-white/[0.06] p-3.5">
                  <div className="flex items-center justify-between gap-2 text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/40">
                    <span>Your week</span>
                    <span className="tabular-nums">Mon · Wed · Fri · 2 PM</span>
                  </div>
                  <div className="mt-2.5 flex gap-1.5">
                    {schedDays.map((d, i) => (
                      <span
                        key={i}
                        className={cn(
                          'grid h-8 flex-1 place-items-center rounded-xl text-[10px] font-extrabold uppercase',
                          visitDays[i]
                            ? 'bg-gradient-to-br from-emerald-400 to-teal-400 text-[#0B231C] shadow-[0_6px_14px_-8px_rgba(16,185,129,0.9)]'
                            : 'bg-white/[0.06] text-emerald-100/25',
                        )}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/40">
                    <span>Consent</span>
                    <span className={cn('tabular-nums', ready ? 'text-emerald-200' : 'text-amber-200')}>
                      {ready ? 'Complete' : '1 of 2'}
                    </span>
                  </div>
                  <Meter value={ready ? 1 : 0.5} intent={ready ? 'success' : 'warning'} delay={0.2} className="mt-2" />
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Your match" trailing={<Chip intent="neutral">Best first</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="success">
                <div className="p-5">
                  <div className="flex items-start gap-3.5">
                    <div className="relative shrink-0">
                      <span className="grid h-14 w-14 place-items-center rounded-[20px] bg-gradient-to-br from-emerald-500 to-teal-500 text-[15px] font-black tracking-tight text-white shadow-[0_12px_24px_-12px_rgba(16,185,129,0.8)]">
                        {initials(caregiver.name)}
                      </span>
                      <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                        <BadgeCheck className="h-3 w-3" strokeWidth={3} aria-hidden />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[15px] font-extrabold tracking-tight text-[#0B211B]">{caregiver.name}</div>
                      <div className="truncate text-[11.5px] font-semibold text-[#0B211B]/55">{caregiver.role}</div>
                      <div className="mt-1 flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
                        <span className="text-[11px] font-extrabold tabular-nums text-[#0B211B]/70">{caregiver.rating}</span>
                        <span className="text-[10px] font-bold text-[#0B211B]/40">· {caregiver.years} yrs · 70 sessions</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3 rounded-2xl bg-emerald-500/[0.1] px-3.5 py-3">
                    <Tile icon={Send} tone="success" size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12.5px] font-bold tracking-tight text-emerald-800">Leading match for your booking</span>
                      <span className="mt-0.5 block truncate text-[10px] font-semibold text-emerald-700/60">
                        Availability re-checked on acceptance
                      </span>
                    </span>
                    <Chip intent="success">Primary</Chip>
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.99 }}
                    onClick={() => navigate('/patient/p11')}
                    className="mt-3 flex w-full items-center gap-3 rounded-2xl px-1 py-1 text-left"
                  >
                    <span className="min-w-0 flex-1 pl-1 text-[12px] font-bold text-emerald-700">View full profile</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
                  </motion.button>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <div className="flex items-center gap-3.5 p-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[18px] bg-[#0B211B]/[0.06] text-[13px] font-black tracking-tight text-[#0B211B]/60">
                    {initials(father.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">{father.name}</div>
                    <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/50">
                      Father · age {father.age} · {carePlan.category}
                    </div>
                  </div>
                  <Chip intent="success" icon={Lock}>Consent on file</Chip>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Booking summary" trailing={<Chip intent="neutral">From your selections</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <div className="p-5">
                  <div className="flex flex-col gap-2.5">
                    <LeaderRow k="Category" v={carePlan.category} />
                    <LeaderRow k="Schedule" v="Mon, Wed, Fri · 2 PM" />
                    <LeaderRow k="Duration" v="2 hours per visit" />
                    <LeaderRow k="Visits per week" v="3" />
                    <LeaderRow k="Weekly price" v={pricing.weekly} />
                    <LeaderRow k="Platform fee" v="₹0" />
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Consent agreement" />
            </motion.div>

            <motion.div variants={rise}>
              <div
                className={cn(
                  'relative overflow-hidden rounded-[26px] border shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]',
                  ready ? 'border-emerald-200/10 bg-[#0B231C]' : 'border-amber-200/10 bg-[#241A0B] shadow-[0_28px_64px_-30px_rgba(60,40,10,0.7)]',
                )}
              >
                <div
                  aria-hidden
                  className={cn(
                    'pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full blur-3xl',
                    ready ? 'bg-emerald-400/25' : 'bg-amber-400/25',
                  )}
                />
                <div
                  aria-hidden
                  className={cn(
                    'pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full blur-3xl',
                    ready ? 'bg-teal-300/15' : 'bg-orange-400/10',
                  )}
                />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="relative p-5">
                  <div
                    className={cn(
                      'flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em]',
                      ready ? 'text-emerald-200/50' : 'text-amber-200/50',
                    )}
                  >
                    <ShieldCheck className="h-3 w-3" aria-hidden />
                    Consent agreement · {ready ? 'ready to seal' : 'incomplete'}
                  </div>
                  <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                    {ready ? (
                      <>
                        Both approvals signed,{' '}
                        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">ready to seal</span>
                      </>
                    ) : (
                      <>
                        Two approvals{' '}
                        <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">required to book</span>
                      </>
                    )}
                  </h3>
                  <p className={cn('mt-1.5 text-pretty text-[12px] font-medium leading-relaxed', ready ? 'text-emerald-100/60' : 'text-amber-100/60')}>
                    Signed electronically as {guardian.name} · sealed permanently in your records.
                  </p>

                  <div
                    className={cn(
                      'mt-4 flex items-center gap-2.5 rounded-2xl px-3.5 py-3',
                      ready ? 'bg-emerald-400/[0.12]' : 'bg-amber-400/[0.12]',
                    )}
                  >
                    <span aria-hidden className="relative flex h-2 w-2 shrink-0">
                      <span
                        className={cn(
                          'absolute inline-flex h-full w-full animate-ping rounded-full opacity-60',
                          ready ? 'bg-emerald-300' : 'bg-amber-300',
                        )}
                      />
                      <span className={cn('relative inline-flex h-2 w-2 rounded-full', ready ? 'bg-emerald-300' : 'bg-amber-300')} />
                    </span>
                    <span
                      className={cn(
                        'min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em]',
                        ready ? 'text-emerald-100' : 'text-amber-100',
                      )}
                    >
                      {ready ? 'Ready to seal' : '1 of 2 approved'}
                    </span>
                    <span className={cn('shrink-0 text-[10px] font-extrabold tabular-nums', ready ? 'text-emerald-200/70' : 'text-amber-200/70')}>
                      {ready ? '2 of 2' : 'Both required'}
                    </span>
                  </div>

                  <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
                    {[
                      {
                        on: consentCare,
                        set: setConsentCare,
                        label: `I approve care for ${first} under this plan`,
                        sub: 'Visits, vitals and goal logging as described',
                      },
                      {
                        on: consentMeds,
                        set: setConsentMeds,
                        label: 'I approve medication management by the nurse',
                        sub: 'Prescription-verified doses, logged per round',
                      },
                    ].map((c) => (
                      <motion.button
                        key={c.label}
                        type="button"
                        whileTap={{ scale: 0.99 }}
                        onClick={() => c.set(!c.on)}
                        className="flex w-full items-center gap-3 py-3 text-left first:pt-0 last:pb-0"
                      >
                        <motion.span
                          animate={{
                            backgroundColor: c.on ? 'rgb(16,185,129)' : 'rgba(255,255,255,0.12)',
                            scale: c.on ? 1 : 0.92,
                          }}
                          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                          className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-lg"
                        >
                          {c.on && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3.5} aria-hidden />}
                        </motion.span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[12.5px] font-bold leading-snug tracking-tight text-white">{c.label}</span>
                          <span className="block truncate text-[10.5px] font-semibold text-white/45">{c.sub}</span>
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSheet(true)}
                    className="mt-3 flex w-full items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-3 text-left transition-colors hover:bg-white/[0.1]"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.08] text-emerald-200">
                      <ShieldCheck className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12.5px] font-bold tracking-tight text-white">What each consent grants</span>
                      <span className="block truncate text-[10.5px] font-semibold text-white/45">Withdraw anytime · pauses next visit</span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-white/25" aria-hidden />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Payment" trailing={<Chip intent="success" icon={BadgeCheck}>Verified</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate('/patient/p24')}
                className="block w-full text-left"
              >
                <Card>
                  <div className="flex items-center gap-3.5 p-4">
                    <Tile icon={CreditCard} tone="info" size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">HDFC Card ending 8842</div>
                      <div className="mt-0.5 truncate text-[11px] font-medium text-[#0B211B]/55">
                        Charged {pricing.elderly} after each completed visit · never before
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
                  </div>
                </Card>
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={Bell} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Every consent is tied to {guardian.name}'s verified guardian account and visible in your records forever.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of review" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <div className="flex flex-col gap-2">
          <motion.button
            type="button"
            whileTap={ready ? { scale: 0.97 } : undefined}
            disabled={!ready}
            onClick={() => {
              if (!ready) return
              setConfirmed(true)
              notify({ title: 'Booking confirmed', body: 'Offers dispatched · consent sealed permanently', kind: 'ok' })
            }}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold transition-all duration-300',
              ready
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
                : 'bg-[#0B211B]/[0.06] text-[#0B211B]/30',
            )}
          >
            <span className="truncate">{ready ? 'Confirm booking' : 'Approve both consents to continue'}</span>
            {ready && <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />}
          </motion.button>
          <div className="flex items-center justify-center gap-1.5 text-[10.5px] font-semibold text-[#0B211B]/45">
            <Send className="h-3 w-3" aria-hidden />
            Caregiver offers go out the moment you confirm
          </div>
        </div>
      </FootBar>

      <AnimatePresence>
        {sheet && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSheet(false)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet && (
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex max-h-[88%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-700">
                  <ShieldCheck className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Consent scope</div>
                  <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">Exactly what each approval allows</div>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSheet(false)}
                  aria-label="Close sheet"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                >
                  <X className="h-4 w-4" aria-hidden />
                </motion.button>
              </div>

              <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
                <div className="flex flex-col gap-2.5">
                  <LeaderRow k="Care approval grants" v="Visits · vitals · goal logs" />
                  <LeaderRow k="Medication approval grants" v="Rx-verified dosing only" />
                  <LeaderRow k="Records shared with" v={`${caregiver.name} only`} />
                  <LeaderRow k="Withdraw anytime" v="Pauses next visit" />
                  <LeaderRow k="Sealed" v="Immutable audit entry" />
                </div>
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSheet(false)
                  navigate('/patient/p22')
                }}
                className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
              >
                <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Full consent records</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
