import { motion } from 'motion/react'
import { Check, ChevronRight, Clock, Download, Landmark, ShieldCheck, Star, TrendingUp, Wallet } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Meter, Panel, Section, Stat, Tile, rise, stagger } from '@/components/phone/kit'
import { earnings, payouts, professional } from '@/data/seed'
import { pastSessions } from '@/data/professionalHistory'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

export function PR09() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const nextPayout = payouts.find((p) => p.status === 'in-transit') ?? payouts[0]
  const done = pastSessions.filter((s) => !s.incident)

  const amounts = done.map((s) => Number(s.amount.replace(/[^\d]/g, '')) || 0)
  const maxAmount = Math.max(...amounts, 1)
  const avg = Math.round(amounts.reduce((a, b) => a + b, 0) / Math.max(1, amounts.length))

  return (
    <Screen>
      <AppBar
        title="Earnings"
        subtitle={`${professional.name.split(' ')[0]} · March`}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => notify({ title: 'Statement queued', body: 'March earnings summary will be emailed as a PDF', kind: 'info' })}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60"
            aria-label="Download statement"
          >
            <Download className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <div className="flex items-start justify-between gap-3">
                  <Kicker>Available to withdraw</Kicker>
                  <Chip intent="success" light icon={ShieldCheck} className="shrink-0 border-transparent">
                    All verified
                  </Chip>
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-[18px] font-extrabold text-emerald-200/80">₹</span>
                  <span className="text-[38px] font-extrabold leading-none tracking-tight text-white">
                    {earnings.available.replace('₹', '')}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/[0.1] text-emerald-200">
                    <Wallet className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[12.5px] font-bold text-emerald-50/90">Next payout {earnings.nextPayout}</div>
                    <div className="mt-0.5 truncate text-[10px] font-semibold text-emerald-100/45">
                      {nextPayout.sessions} sessions worth {nextPayout.amount} · zero fee
                    </div>
                  </div>
                  <Chip intent="live" light dot className="shrink-0 border-transparent">
                    In transit
                  </Chip>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <div className="grid grid-cols-3 divide-x divide-[#0B211B]/[0.07] rounded-3xl border border-[#0B211B]/[0.06] bg-white shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
                {[
                  { v: earnings.thisWeek, l: 'This week', icon: TrendingUp },
                  { v: String(earnings.sessions), l: 'Sessions', icon: Check },
                  { v: String(earnings.rating), l: 'Rating', icon: Star },
                ].map((s) => (
                  <div key={s.l} className="flex min-w-0 flex-col items-center gap-1.5 px-2 py-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/[0.1] text-emerald-600">
                      <s.icon className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                    </span>
                    <span className="text-[15px] font-extrabold tabular-nums leading-none text-[#0B211B]">{s.v}</span>
                    <span className="text-[8.5px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/45">{s.l}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Session earnings · this week" trailing={<Chip intent="neutral">avg ₹{avg.toLocaleString('en-IN')}</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {done.map((s, i) => {
                  const amt = Number(s.amount.replace(/[^\d]/g, '')) || 0
                  return (
                    <div key={s.id}>
                      {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.985 }}
                        onClick={() =>
                          notify({ title: s.date, body: `${s.patient} · signed off · ${s.amount} credited to available`, kind: 'info' })
                        }
                        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                      >
                        <Tile icon={Check} tone="success" size="sm" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-bold tabular-nums text-[#0B211B]/60">{s.date}</span>
                            <span className="truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{s.patient}</span>
                          </div>
                          <Meter value={amt / maxAmount} intent="success" delay={0.2 + i * 0.08} className="mt-2 max-w-[140px]" />
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1.5">
                          <span className="font-mono text-[13px] font-black tabular-nums tracking-tight text-[#0B211B]">{s.amount}</span>
                          <Chip intent="success" icon={Check}>
                            Signed off
                          </Chip>
                        </div>
                      </motion.button>
                    </div>
                  )
                })}

                <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
                <div className="flex items-center gap-3 px-4 py-3.5 opacity-75">
                  <Tile icon={Clock} tone="neutral" size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-bold tracking-tight text-[#0B211B]">Tonight · Ramesh Sharma</div>
                    <div className="mt-0.5 truncate text-[10.5px] font-semibold text-[#0B211B]/45">
                      Pays only after the family signs off
                    </div>
                  </div>
                  <Chip intent="neutral">Pending</Chip>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={ShieldCheck} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  A session pays only after sign-off. This keeps earnings honest for you and families alike — every rupee traces to a
                  completed visit.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => navigate('/professional/pr10')}
                className="group block w-full text-left"
              >
                <Card>
                  <div className="flex items-center gap-3.5 p-4">
                    <Tile icon={Landmark} tone="ink" size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Payout history & withdrawal</div>
                      <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">
                        {payouts.length} payouts · {professional.bank} ••4821
                      </div>
                    </div>
                    <ChevronRight
                      className="h-4 w-4 shrink-0 text-[#0B211B]/20 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </div>
                </Card>
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of earnings" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            notify({ title: 'Withdrawal started', body: `${earnings.available} to ${professional.bank}`, kind: 'ok' })
            navigate('/professional/pr10')
          }}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
        >
          <Wallet className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Withdraw {earnings.available} to bank
        </motion.button>
      </FootBar>
    </Screen>
  )
}
