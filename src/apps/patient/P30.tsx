import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Baby,
  Check,
  ChevronRight,
  HeartPulse,
  Mail,
  UserPlus,
  UsersRound,
  X,
} from 'lucide-react'
import { AppBar } from '@/components/base/phone/app-bar'
import { BodyArea, EndOfScroll, Screen } from '@/components/base/phone/screen'
import { Card, Chip, Hero, Kicker, Meter, Panel, Section, Tile, rise, stagger } from '@/components/base/phone/kit'
import { lovedOnes } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const consentRows = [
  { key: 'guardian', label: 'I am the legal guardian', sub: 'Of Asha under Indian guardianship law' },
  { key: 'care', label: 'I consent to pediatric care visits', sub: 'Home visits by verified caregivers' },
  { key: 'meds', label: 'I consent to medication management', sub: 'Rx-verified doses only' },
]

const careCategories = ['Pediatric', 'Post-operative', 'Chronic care', 'Special needs']

function DarkRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-100/45">{k}</span>
      <span className="truncate font-mono text-[12px] font-bold text-emerald-50/90">{v}</span>
    </div>
  )
}

export function P30() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [father, daughter] = lovedOnes

  const [consents, setConsents] = useState<string[]>(['guardian'])
  const [category, setCategory] = useState('Pediatric')
  const [addOpen, setAddOpen] = useState(false)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [addName, setAddName] = useState('')
  const [addAge, setAddAge] = useState('')
  const [invites, setInvites] = useState<string[]>([])

  const ready = consents.length === consentRows.length
  const setupPct = 0.4 + (consents.length / consentRows.length) * 0.6

  const toggle = (key: string) =>
    setConsents((prev) => (prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]))

  const canAdd = addName.trim().length >= 3 && addAge.length > 0

  return (
    <Screen>
      <AppBar title="Loved ones" subtitle="People under your family plan" onBack={() => navigate('/patient/p28')} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-amber-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <Kicker>
                  <HeartPulse className="h-3 w-3 text-amber-300/80" aria-hidden />
                  Family plan · guardian controlled
                </Kicker>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  {lovedOnes.length} loved ones,{' '}
                  <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">
                    1 needs setup
                  </span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-amber-100/55">
                  Each person gets their own consent record and separate medical history.
                </p>

                <div className="mt-4 rounded-2xl bg-amber-400/[0.1] p-3.5">
                  <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em]">
                    <span className="text-amber-100/50">Asha's setup · pending</span>
                    <span className="tabular-nums text-amber-200">{Math.round(setupPct * 100)}%</span>
                  </div>
                  <Meter value={setupPct} intent="warning" delay={0.2} className="mt-2" />
                  <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-200/70">
                    <Check className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                    {ready ? 'All consents signed · submit with the form' : `${consentRows.length - consents.length} consent(s) left`}
                  </div>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Active care" trailing={<Chip intent="success">1 person</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="success">
                <div className="p-5">
                  <div className="flex items-center gap-3.5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[18px] bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_10px_22px_-10px_rgba(16,185,129,0.8)]">
                      <HeartPulse className="h-5 w-5" strokeWidth={2.4} aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="truncate text-[15px] font-extrabold tracking-tight text-[#0B211B]">{father.name}</span>
                        <Chip intent="success">Care active</Chip>
                      </div>
                      <div className="mt-0.5 truncate text-[11.5px] font-semibold text-[#0B211B]/55">
                        Father · age {father.age} · {father.category.toLowerCase()}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-emerald-500/[0.08] px-3.5 py-3">
                    <Tile icon={HeartPulse} tone="success" size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12.5px] font-bold tracking-tight text-emerald-800">
                        Lakshmi Reddy · Mon, Wed, Fri
                      </span>
                      <span className="mt-0.5 block truncate text-[10px] font-semibold text-emerald-700/60">
                        Week 9 of 12 · 3 goals on track
                      </span>
                    </span>
                    <Chip intent="success">Live</Chip>
                  </div>

                  <div className="mt-4 flex gap-2.5">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate('/patient/p13')}
                      className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
                    >
                      <HeartPulse className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                      <span className="truncate">Open plan</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate('/patient/p15')}
                      className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                    >
                      <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                      <span className="truncate">Visits</span>
                    </motion.button>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Awaiting setup" trailing={<Chip intent="warning" dot>1 person</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-amber-200/10 bg-[#241A0B] shadow-[0_28px_64px_-30px_rgba(60,40,10,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-amber-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
                <div className="relative p-5">
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-200/50">
                    <Baby className="h-3 w-3" aria-hidden />
                    Setup pending · pediatric care
                  </div>
                  <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                    {daughter.name.split(' ')[0]},{' '}
                    <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">two steps to go</span>
                  </h3>
                  <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-amber-100/60">
                    Daughter · age {daughter.age} · finish consent below to unlock booking.
                  </p>

                  <div className="mt-4 rounded-2xl bg-white/[0.06] p-4">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-amber-200/60">Guardian consent</div>
                    <div className="mt-1 flex flex-col">
                      {consentRows.map((r) => {
                        const on = consents.includes(r.key)
                        return (
                          <motion.button
                            key={r.key}
                            type="button"
                            whileTap={{ scale: 0.99 }}
                            onClick={() => {
                              toggle(r.key)
                              notify({ title: on ? 'Consent unchecked' : 'Consent given', body: r.label, kind: 'info' })
                            }}
                            className="flex w-full items-center gap-3 py-2.5 text-left first:pt-1"
                          >
                            <motion.span
                              animate={{
                                backgroundColor: on ? 'rgb(251,191,36)' : 'rgba(255,255,255,0.12)',
                                scale: on ? 1 : 0.92,
                              }}
                              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                              className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-lg"
                            >
                              {on && <Check className="h-3.5 w-3.5 text-[#241A0B]" strokeWidth={3.5} aria-hidden />}
                            </motion.span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[12px] font-bold leading-snug tracking-tight text-white">
                                {r.label}
                              </span>
                              <span className="block truncate text-[10px] font-semibold text-white/45">{r.sub}</span>
                            </span>
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-amber-200/60">Care category</div>
                      <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-amber-200/70">
                        {category}
                      </span>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {careCategories.map((c) => {
                        const on = category === c
                        return (
                          <motion.button
                            key={c}
                            type="button"
                            whileTap={{ scale: 0.93 }}
                            onClick={() => setCategory(c)}
                            className={cn(
                              'flex items-center gap-1.5 rounded-full px-3 py-2 text-[10.5px] font-bold transition-colors',
                              on ? 'bg-amber-400 text-[#241A0B]' : 'bg-white/[0.08] text-amber-50/60 hover:bg-white/[0.14]',
                            )}
                          >
                            {c}
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    whileTap={ready ? { scale: 0.97 } : undefined}
                    disabled={!ready}
                    onClick={() =>
                      notify({
                        title: 'Setup submitted',
                        body: `${daughter.name.split(' ')[0]} · ${category} · booking unlocked · consent sealed`,
                        kind: 'ok',
                      })
                    }
                    className={cn(
                      'mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all duration-300',
                      ready
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_18px_36px_-18px_rgba(245,158,11,0.75)]'
                        : 'bg-white/[0.08] text-amber-100/40',
                    )}
                  >
                    <span className="truncate">
                      {ready ? 'Finish setup' : `${consentRows.length - consents.length} consent(s) left`}
                    </span>
                    {ready && <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />}
                  </motion.button>
                  <p className="mt-2.5 text-center text-[10.5px] font-semibold leading-relaxed text-amber-100/40">
                    Setup seals the guardian consent to the record — booking unlocks instantly.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Add someone" trailing={<Chip intent="info">2 taps</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setAddOpen(true)}
                  className="flex w-full items-center gap-3.5 p-4 text-left"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_8px_18px_-8px_rgba(16,185,129,0.7)]">
                    <UserPlus className="h-5 w-5" strokeWidth={2.4} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">Add a loved one</div>
                    <div className="mt-0.5 truncate text-[11px] font-medium text-[#0B211B]/55">
                      Name, age and care category to begin
                    </div>
                  </div>
                </motion.button>
                <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setInviteOpen(true)}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                >
                  <Tile icon={Mail} tone="info" />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="truncate text-[13px] font-bold tracking-tight text-[#0B211B]">Invite relative · view only</span>
                      {invites.length > 0 && <Chip intent="success">{invites.length} sent</Chip>}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">
                      They see visit summaries only · never records
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/20" aria-hidden />
                </motion.button>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={UsersRound} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Each loved one gets their own care category, consent record and separate medical history. Guardians control
                  everything.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of family plan" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {(addOpen || inviteOpen) && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setAddOpen(false)
              setInviteOpen(false)
            }}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {addOpen && (
          <motion.div
            key="add"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />

            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-700">
                <UserPlus className="h-5 w-5" strokeWidth={2.2} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Add a loved one</div>
                <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">Takes two minutes · consent comes next</div>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setAddOpen(false)}
                aria-label="Close sheet"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex h-11 items-center gap-2.5 rounded-2xl bg-[#0B211B]/[0.04] px-3.5 transition-colors focus-within:bg-emerald-500/[0.07] focus-within:shadow-[0_14px_30px_-18px_rgba(16,185,129,0.6)]">
                <span className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/35">Name</span>
                <input
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  placeholder="Their full name"
                  className="min-w-0 flex-1 bg-transparent text-right text-[13px] font-bold tracking-tight text-[#0B211B] outline-none placeholder:text-[#0B211B]/25"
                />
              </div>
              <div className="flex h-11 items-center gap-2.5 rounded-2xl bg-[#0B211B]/[0.04] px-3.5 transition-colors focus-within:bg-emerald-500/[0.07] focus-within:shadow-[0_14px_30px_-18px_rgba(16,185,129,0.6)]">
                <span className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/35">Age</span>
                <input
                  value={addAge}
                  onChange={(e) => setAddAge(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  inputMode="numeric"
                  placeholder="Years"
                  className="min-w-0 flex-1 bg-transparent text-right font-mono text-[13px] font-bold tabular-nums text-[#0B211B] outline-none placeholder:text-[#0B211B]/25"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {careCategories.map((c) => {
                const on = category === c
                return (
                  <motion.button
                    key={c}
                    type="button"
                    whileTap={{ scale: 0.93 }}
                    onClick={() => setCategory(c)}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full px-3 py-2 text-[10.5px] font-bold transition-colors',
                      on ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/55 hover:bg-[#0B211B]/[0.08]',
                    )}
                  >
                    {on && <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />}
                    {c}
                  </motion.button>
                )
              })}
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              disabled={!canAdd}
              onClick={() => {
                notify({
                  title: `${addName.trim()} added`,
                  body: `Age ${addAge} · ${category} · consent form opens next`,
                  kind: 'ok',
                })
                setAddOpen(false)
                setAddName('')
                setAddAge('')
              }}
              className={cn(
                'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all duration-300',
                canAdd
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
                  : 'bg-[#0B211B]/[0.06] text-[#0B211B]/30',
              )}
            >
              <span className="truncate">
                {canAdd ? `Add ${addName.trim().split(' ')[0]}` : 'Name and age required'}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {inviteOpen && (
          <motion.div
            key="invite"
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
                  <Mail className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Invite relative</div>
                  <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">View access · summaries only</div>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setInviteOpen(false)}
                  aria-label="Close sheet"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                >
                  <X className="h-4 w-4" aria-hidden />
                </motion.button>
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-[#0B231C] p-4">
                <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
                <div className="relative">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">What they can see</div>
                  <div className="mt-3 flex flex-col gap-2.5">
                    <DarkRow k="Visit summaries" v="Yes · after each visit" />
                    <DarkRow k="Medical records" v="Never" />
                    <DarkRow k="Costs and receipts" v="Never" />
                    <DarkRow k="Remove access" v="Anytime · instant" />
                  </div>
                </div>
              </div>

              {invites.length > 0 && (
                <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Sent invites</div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {invites.map((inv) => (
                      <span
                        key={inv}
                        className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-2 text-[10.5px] font-bold text-emerald-700"
                      >
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                        {inv}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setInvites((prev) => [...prev, 'Chitra (sister)'])
                  notify({ title: 'Invite sent', body: 'Chitra (sister) · view access · she accepts by email', kind: 'ok' })
                }}
                className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
              >
                <Mail className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Invite Chitra (sister)</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
