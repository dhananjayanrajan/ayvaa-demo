import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Gavel,
  Lock,
  MapPin,
  ScrollText,
  ShieldCheck,
  X,
} from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Expand, Hero, Kicker, Meter, Panel, Section, Stat, Tile, rise, stagger } from '@/components/phone/kit'
import { consent, guardian, lovedOnes } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const scopeDetail: Record<string, string> = {
  'Personal care': 'Mobility, meals, hygiene and companionship during every visit',
  'Medication management': 'Nurse gives and records prescribed doses with three-point verification',
  'Health monitoring': 'Vitals logged each visit and shared with your care team',
}

export function P22() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const [scopes, setScopes] = useState<string[]>(consent.covers)
  const [location, setLocation] = useState(consent.locationTracking)
  const [withdrawOpen, setWithdrawOpen] = useState(false)

  const toggleScope = (s: string) =>
    setScopes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))

  const daysLeft = 23

  return (
    <Screen>
      <AppBar
        title="Care consent"
        subtitle={`${father.name} · sealed record`}
        onBack={() => navigate('/patient/p21')}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <div className="flex items-start justify-between gap-3">
                  <Kicker>Consent ledger · sealed</Kicker>
                  <Chip intent="success" light icon={Lock} className="shrink-0 border-transparent">
                    Active
                  </Chip>
                </div>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  {father.name.split(' ')[0]}'s care,{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">on your terms</span>
                </h2>

                <div className="mt-4 rounded-2xl bg-white/[0.06] p-3.5">
                  <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/50">
                    <span>90-day cycle</span>
                    <span className="text-emerald-200">renewal due {consent.reviewDue}</span>
                  </div>
                  <Meter value={(90 - daysLeft) / 90} intent="success" delay={0.2} className="mt-2.5" />
                  <div className="mt-2 flex items-center justify-between font-mono text-[10px] font-bold text-emerald-100/45">
                    <span>Signed {consent.signed}</span>
                    <span>{daysLeft} days left</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 divide-x divide-white/[0.08]">
                  <Stat label="Scopes" value={scopes.length} dot="bg-emerald-300" />
                  <Stat label="Signed by" value="You" dot="bg-teal-300" />
                  <Stat label="Edits" value="0" dot="bg-sky-300/80" />
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section
                label="What you are approving"
                trailing={<Chip intent={scopes.length === consent.covers.length ? 'success' : 'warning'}>{scopes.length} active</Chip>}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {consent.covers.map((s, i) => {
                  const on = scopes.includes(s)
                  return (
                    <div key={s}>
                      {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.985 }}
                        onClick={() => toggleScope(s)}
                        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                      >
                        <span
                          className={cn(
                            'grid h-[22px] w-[22px] shrink-0 place-items-center rounded-lg transition-colors',
                            on ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.1] text-transparent',
                          )}
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3.5} aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{s}</div>
                          <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">{scopeDetail[s]}</div>
                        </div>
                        <Chip intent={on ? 'success' : 'neutral'} dot={!on}>
                          {on ? 'Granted' : 'Revoked'}
                        </Chip>
                      </motion.button>
                    </div>
                  )
                })}

                <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />

                <div className="flex items-center gap-3 px-4 py-3.5">
                  <span
                    className={cn(
                      'grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors',
                      location ? 'bg-emerald-500/[0.12] text-emerald-600' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/40',
                    )}
                  >
                    <MapPin className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className={cn('truncate text-[13.5px] font-bold tracking-tight', location ? 'text-[#0B211B]' : 'text-[#0B211B]/50')}>
                      Location tracking during visits
                    </div>
                    <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">
                      Optional · verifies arrivals on the visit log
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLocation((v) => !v)
                      notify({
                        title: location ? 'Location tracking off' : 'Location tracking on',
                        body: location ? 'Arrivals will show as unverified' : 'Arrivals verify against the care address',
                        kind: 'info',
                      })
                    }}
                    aria-label="Toggle location tracking"
                    className={cn(
                      'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200',
                      location ? 'bg-emerald-500' : 'bg-[#0B211B]/[0.15]',
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-1 h-5 w-5 rounded-full bg-white shadow-[0_2px_6px_rgba(11,33,27,0.3)] transition-all duration-200',
                        location ? 'left-6' : 'left-1',
                      )}
                    />
                  </button>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={CalendarDays} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Consent is re-confirmed every {consent.cycleDays} days. Care pauses automatically if a review is missed, so nothing
                  happens without your approval.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => setWithdrawOpen(true)}
                className="block w-full text-left"
              >
                <Card intent="danger">
                  <div className="flex items-center gap-3.5 p-4">
                    <Tile icon={Gavel} tone="danger" size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Withdraw consent</div>
                      <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">
                        Stops all care immediately · sealed record kept
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-rose-500/60" aria-hidden />
                  </div>
                </Card>
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Ayvaa consent · sealed record" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            notify({ title: 'Consent re-confirmed', body: `${scopes.length} scopes approved · sealed and logged`, kind: 'ok' })
            navigate('/patient/p21')
          }}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
        >
          <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Re-confirm and seal
        </motion.button>
      </FootBar>

      <AnimatePresence>
        {withdrawOpen && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWithdrawOpen(false)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {withdrawOpen && (
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />

            <div className="flex items-start gap-3">
              <Tile icon={Gavel} tone="danger" size="lg" />
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Withdraw all consent?</div>
                <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                  This stops all care for {father.name} immediately. A supervisor will call you to confirm before the final seal.
                </div>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setWithdrawOpen(false)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                aria-label="Keep consent"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>

            <div className="rounded-3xl bg-[#230D14] p-4">
              <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-200/60">
                <ScrollText className="h-3 w-3" aria-hidden />
                What happens immediately
              </div>
              <div className="mt-3 flex flex-col gap-2.5">
                {[
                  'Today\'s remaining visit is cancelled',
                  'Caregivers lose all access within minutes',
                  'A sealed withdrawal record enters the audit trail',
                  'Records stay yours · nothing is deleted',
                ].map((e) => (
                  <div key={e} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rose-300" />
                    <span className="min-w-0 flex-1 text-[12px] font-semibold leading-snug text-rose-50/85">{e}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setWithdrawOpen(false)
                notify({ title: 'Withdrawal started', body: 'A supervisor will call within 10 minutes to confirm', kind: 'warn' })
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-600 to-red-500 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(225,29,72,0.6)]"
            >
              <Gavel className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              Yes, withdraw everything
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setWithdrawOpen(false)}
              className="w-full rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/70"
            >
              Keep consent active
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
