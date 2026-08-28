import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  CalendarCheck,
  Check,
  ChevronRight,
  Clock,
  CreditCard,
  Download,
  Lock,
  ReceiptText,
  Undo2,
  X,
} from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Meter, Panel, Section, Stat, Tile, rise, stagger } from '@/components/phone/kit'
import { carePlan, pricing, visits } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

function DarkRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-100/45">{k}</span>
      <span className="truncate font-mono text-[12px] font-bold text-emerald-50/90">{v}</span>
    </div>
  )
}

export function P23() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [sheet, setSheet] = useState(false)

  const live = visits.find((v) => v.status === 'live')
  const upcoming = visits.find((v) => v.status === 'confirmed')
  const missed = visits.find((v) => v.status === 'missed')
  const refundAmount = missed?.note?.match(/₹[\d,]+/)?.[0] ?? '₹4,800'

  const budget = 16000
  const spent = 11200
  const pct = spent / budget

  return (
    <Screen>
      <AppBar title="Payments" subtitle={`${carePlan.category} plan · March`} onBack={() => navigate('/patient/p21')} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <Kicker>
                  <CreditCard className="h-3 w-3 text-emerald-300/80" aria-hidden />
                  Monthly spend · March
                </Kicker>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-[18px] font-extrabold text-emerald-200/80">₹</span>
                  <span className="text-[36px] font-extrabold leading-none tracking-tight text-white">
                    {spent.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="mt-1.5 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  {pricing.marchVisits} visits at {pricing.elderly} each · no pending charges
                </p>

                <div className="mt-4 rounded-2xl bg-emerald-400/[0.1] p-3.5">
                  <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em]">
                    <span className="text-emerald-100/50">Budget usage</span>
                    <span className="tabular-nums text-emerald-200">{Math.round(pct * 100)}%</span>
                  </div>
                  <Meter value={pct} intent="success" delay={0.2} className="mt-2" />
                  <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-200/70">
                    <Lock className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                    Charged only after verified visits
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 divide-x divide-white/[0.08]">
                  <Stat label="Visits paid" value={pricing.marchVisits} dot="bg-emerald-300" />
                  <Stat label="Per visit" value={pricing.elderly} dot="bg-teal-300" />
                  <Stat label="Refunded" value={refundAmount} dot="bg-amber-300" />
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="March receipts" trailing={<Chip intent="neutral">3 entries</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {live && (
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.99 }}
                    onClick={() => notify({ title: 'In-progress visit', body: `${live.caregiver} · charged only at sign-off`, kind: 'info' })}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                  >
                    <span className="relative shrink-0">
                      <Tile icon={Check} tone="success" />
                      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">
                        {live.day}, {live.date}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">
                        {live.caregiver} · in progress
                      </span>
                    </span>
                    <span className="flex shrink-0 flex-col items-end gap-1.5">
                      <span className="font-mono text-[12.5px] font-bold tabular-nums text-[#0B211B]">{pricing.elderly}</span>
                      <Chip intent="success" dot>On sign-off</Chip>
                    </span>
                  </motion.button>
                )}
                <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
                {upcoming && (
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.99 }}
                    onClick={() => notify({ title: 'Planned visit', body: `${upcoming.day}, ${upcoming.date} · charged only after completion`, kind: 'info' })}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                  >
                    <Tile icon={Clock} tone="neutral" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">
                        {upcoming.day}, {upcoming.date}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">
                        Charged only after the visit is done
                      </span>
                    </span>
                    <Chip intent="neutral">Planned</Chip>
                  </motion.button>
                )}
                <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
                {missed && (
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSheet(true)}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                  >
                    <Tile icon={Undo2} tone="success" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">
                        {missed.day}, {missed.date} · refund
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">
                        Missed visit · returned automatically
                      </span>
                    </span>
                    <span className="flex shrink-0 flex-col items-end gap-1.5">
                      <span className="font-mono text-[12.5px] font-bold tabular-nums text-emerald-700">+{refundAmount}</span>
                      <span className="text-[8.5px] font-extrabold uppercase tracking-[0.12em] text-[#0B211B]/35">3 days</span>
                    </span>
                  </motion.button>
                )}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="This month at a glance" trailing={<Chip intent="success">All clear</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative p-5">
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
                    <ReceiptText className="h-3 w-3" aria-hidden />
                    Billing ledger · March
                  </div>
                  <div className="mt-3 flex flex-col gap-2.5">
                    <DarkRow k="Visits completed" v={pricing.marchVisits} />
                    <DarkRow k="Charged" v={pricing.marchSpent} />
                    <DarkRow k="Refunds issued" v={refundAmount} />
                    <DarkRow k="Pending charges" v="₹0" />
                    <DarkRow k="Every charge links to" v="A signed visit" />
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => notify({ title: 'Statement queued', body: 'March statement emailed as a PDF', kind: 'info' })}
                    className="mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white/[0.1] py-3.5 text-[13px] font-bold text-white transition-colors hover:bg-white/[0.16]"
                  >
                    <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                    <span className="truncate">Statement PDF</span>
                  </motion.button>
                </div>
              </div>
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
                    <Tile icon={CreditCard} tone="success" size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">Payment methods</div>
                      <div className="mt-0.5 truncate text-[11px] font-medium text-[#0B211B]/55">
                        Cards, defaults and billing safety
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
                  </div>
                </Card>
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={Lock} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Every charge links to exactly one signed off visit. Nothing is ever billed for missed time.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of payments" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => notify({ title: 'Statement queued', body: 'March statement will be emailed as a PDF', kind: 'info' })}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/75"
        >
          <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate">March statement</span>
        </motion.button>
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
                  <Undo2 className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                    {refundAmount} refund · in transit
                  </div>
                  <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">Missed visit · returned automatically</div>
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

              <div className="relative overflow-hidden rounded-3xl bg-[#0B231C] p-4">
                <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
                <div className="relative">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Refund record</div>
                  <div className="mt-3 flex flex-col gap-2.5">
                    <DarkRow k="Original charge" v="March 8 · ₹1,600" />
                    <DarkRow k="Visit" v="Missed · caregiver fault" />
                    <DarkRow k="Returned to" v="HDFC ••8842" />
                    <DarkRow k="Arrives" v="Within 3 days" />
                    <DarkRow k="Action needed" v="None · automatic" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSheet(false)
                    navigate('/patient/p15')
                  }}
                  className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                >
                  <CalendarCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  <span className="truncate">Visit log</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
