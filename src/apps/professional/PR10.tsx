import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BadgeCheck, Bell, BellOff, Check, Clock, Download, Landmark, Lock, ReceiptText, ShieldCheck, X } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Kicker, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { earnings, payouts, professional } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

type Payout = (typeof payouts)[number]

export function PR10() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [sheet, setSheet] = useState<'none' | 'confirm' | 'payout' | 'account'>('none')
  const [selected, setSelected] = useState<Payout | null>(null)
  const [alertMe, setAlertMe] = useState(true)
  const close = () => setSheet('none')

  const total = Number(earnings.available.replace(/[^\d]/g, ''))
  const avg = Math.round(total / 9)
  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <Screen>
      <AppBar
        title="Withdraw earnings"
        subtitle="Payouts run every Friday"
        onBack={() => navigate('/professional/pr09')}
      />
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
                    <Kicker>Payout breakdown</Kicker>
                    <Chip intent="success" light dot className="shrink-0 border-transparent">
                      Ready now
                    </Chip>
                  </div>

                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="text-[18px] font-extrabold text-emerald-200/80">₹</span>
                    <span className="text-[38px] font-extrabold leading-none tracking-tight text-white">
                      {total.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="mt-3.5 flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-3">
                    <div className="flex shrink-0 -space-x-1.5">
                      {Array.from({ length: 9 }, (_, i) => (
                        <motion.span
                          key={i}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3 + i * 0.05, type: 'spring', stiffness: 320, damping: 18 }}
                          className="h-4 w-4 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 ring-2 ring-[#0B231C]"
                        />
                      ))}
                    </div>
                    <span className="min-w-0 flex-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-emerald-100/70">
                      9 sessions · family-confirmed
                    </span>
                    <Check className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={3} aria-hidden />
                  </div>

                  <div className="mt-3 rounded-2xl bg-white/[0.04] p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11.5px] font-semibold text-emerald-100/55">Gross · 9 × {fmt(avg)}</span>
                      <span className="min-w-0 flex-1 border-b border-dotted border-white/15" />
                      <span className="shrink-0 font-mono text-[12.5px] font-bold tabular-nums text-emerald-50/90">{fmt(total)}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[11.5px] font-semibold text-emerald-100/55">Platform fee</span>
                      <span className="min-w-0 flex-1 border-b border-dotted border-white/15" />
                      <span className="shrink-0 font-mono text-[12.5px] font-bold tabular-nums text-emerald-300">₹0</span>
                    </div>
                    <div aria-hidden className="my-2.5 border-t border-white/15" />
                    <div className="flex items-center justify-between gap-3 rounded-xl bg-emerald-400/[0.12] px-3 py-2.5">
                      <span className="flex min-w-0 items-center gap-1.5">
                        <Landmark className="h-3.5 w-3.5 shrink-0 text-emerald-300" strokeWidth={2.4} aria-hidden />
                        <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-emerald-100">Net to bank</span>
                      </span>
                      <span className="shrink-0 font-mono text-[15px] font-black tabular-nums tracking-tight text-white">{fmt(total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Payout account" trailing={<Chip intent="success" icon={BadgeCheck}>Verified</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <motion.button type="button" whileTap={{ scale: 0.985 }} onClick={() => setSheet('account')} className="block w-full text-left">
                <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0B231C] via-[#123B2E] to-[#0F5138] p-5 shadow-[0_24px_56px_-26px_rgba(6,40,30,0.8)]">
                  <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl" />
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.12] text-emerald-100">
                        <Landmark className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[14px] font-extrabold tracking-tight text-white">{professional.bank}</div>
                        <div className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Savings · primary</div>
                      </div>
                      <Chip intent="success" light className="shrink-0 border-transparent">Default</Chip>
                    </div>

                    <div className="mt-5 font-mono text-[20px] font-black tracking-[0.18em] text-emerald-50">•••• •••• 4821</div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="truncate font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-100/60">
                        {professional.name}
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/[0.1] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100">
                        <Check className="h-2.5 w-2.5" strokeWidth={4} aria-hidden />
                        Verified Mar 1
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Arrival timeline" trailing={<Chip intent="live" dot>Today</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <div className="p-5">
                  {[
                    {
                      t: 'Withdrawal requested',
                      s: 'Just now',
                      d: 'Created from your verified balance · nothing is held back',
                      done: true,
                      active: false,
                    },
                    {
                      t: 'Ayvaa verification',
                      s: 'Instant',
                      d: 'Licence, session confirmations and fraud checks pass automatically',
                      done: true,
                      active: false,
                    },
                    {
                      t: 'Bank credit · ••4821',
                      s: 'By 6:00 PM',
                      d: 'Money lands in your account · you get a push notification the moment it arrives',
                      done: false,
                      active: true,
                    },
                  ].map((st, i) => {
                    const last = i === 2
                    return (
                      <div key={st.t} className="flex gap-3.5">
                        <div className="flex flex-col items-center">
                          <span
                            className={cn(
                              'relative mt-1 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full',
                              st.done ? 'bg-emerald-500' : 'bg-white',
                            )}
                          >
                            {st.active && (
                              <>
                                <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-emerald-400/50" />
                                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                              </>
                            )}
                          </span>
                          {!last && (
                            <span aria-hidden className="my-1 w-px flex-1 bg-gradient-to-b from-emerald-500/50 via-emerald-400/25 to-emerald-300/15" />
                          )}
                        </div>
                        <div className={cn('min-w-0 flex-1', !last && 'pb-5')}>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[13.5px] font-extrabold tracking-tight text-[#0B211B]">{st.t}</span>
                            <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-wide text-emerald-600">{st.s}</span>
                          </div>
                          <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/55">{st.d}</p>
                        </div>
                      </div>
                    )
                  })}

                  <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.04] px-4 py-3.5">
                    <Tile icon={alertMe ? Bell : BellOff} tone={alertMe ? 'success' : 'neutral'} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-bold tracking-tight text-[#0B211B]">Alert me when it lands</span>
                      <span className="mt-0.5 block text-[10.5px] font-semibold text-[#0B211B]/45">
                        Push + SMS the second the bank confirms
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setAlertMe((v) => !v)
                        notify({
                          title: alertMe ? 'Arrival alerts off' : 'Arrival alerts on',
                          body: alertMe ? 'You can re-enable any time before 6 PM' : 'We will ping you the moment money lands',
                          kind: 'info',
                        })
                      }}
                      aria-label="Toggle arrival alerts"
                      className={cn(
                        'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200',
                        alertMe ? 'bg-emerald-500' : 'bg-[#0B211B]/[0.15]',
                      )}
                    >
                      <span
                        className={cn(
                          'absolute top-1 h-5 w-5 rounded-full bg-white shadow-[0_2px_6px_rgba(11,33,27,0.3)] transition-all duration-200',
                          alertMe ? 'left-6' : 'left-1',
                        )}
                      />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Payout history" trailing={<Chip intent="neutral">Tap to inspect</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {payouts.map((p, i) => {
                  const paid = p.status === 'paid'
                  return (
                    <div key={p.date}>
                      {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.985 }}
                        onClick={() => {
                          setSelected(p)
                          setSheet('payout')
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                      >
                        <Tile icon={paid ? Check : Clock} tone={paid ? 'success' : 'warning'} size="sm" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13.5px] font-bold tracking-tight text-[#0B211B]">{p.date}</span>
                          <span className="mt-0.5 block truncate text-[11px] font-semibold text-[#0B211B]/45">
                            {p.sessions} sessions · {paid ? 'paid in full' : 'arrives by 6:00 PM today'}
                          </span>
                        </span>
                        <span className="flex shrink-0 flex-col items-end gap-1.5">
                          <span className="font-mono text-[13px] font-black tabular-nums tracking-tight text-[#0B211B]">{p.amount}</span>
                          <Chip intent={paid ? 'success' : 'warning'} dot={!paid}>
                            {paid ? 'Paid' : 'In transit'}
                          </Chip>
                        </span>
                      </motion.button>
                    </div>
                  )
                })}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of payouts" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <div className="flex flex-col gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => setSheet('confirm')}
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <Landmark className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            Withdraw {earnings.available} now
          </motion.button>
          <div className="flex items-center justify-center gap-1.5 text-[10.5px] font-semibold text-[#0B211B]/45">
            <Lock className="h-3 w-3" aria-hidden />
            Arrives within one business day · zero withdrawal fee
          </div>
        </div>
      </FootBar>

      <AnimatePresence>
        {sheet !== 'none' && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet !== 'none' && (
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

            {sheet === 'confirm' ? (
              <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
                <div className="flex items-start gap-3">
                  <Tile icon={Landmark} tone="success" size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Confirm withdrawal</div>
                    <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Review the transfer before it moves</div>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    onClick={close}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                    aria-label="Close sheet"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </motion.button>
                </div>

                <div className="rounded-3xl bg-[#0B231C] p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Amount</span>
                    <span className="font-mono text-[22px] font-black tracking-tight text-white">{earnings.available}</span>
                  </div>
                  <div aria-hidden className="my-3 h-px bg-white/[0.08]" />
                  <div className="flex flex-col gap-2.5">
                    {[
                      { k: 'To', v: `${professional.bank} ••4821` },
                      { k: 'Fee', v: '₹0 · covered by Ayvaa' },
                      { k: 'Arrives', v: 'By 6:00 PM today' },
                      { k: 'Sessions', v: '9 verified' },
                    ].map((r) => (
                      <div key={r.k} className="flex items-baseline justify-between gap-3">
                        <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-100/45">{r.k}</span>
                        <span className="truncate text-right font-mono text-[12px] font-bold text-emerald-50/90">{r.v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Panel intent="info" className="flex items-start gap-2.5 p-3.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" strokeWidth={2.4} aria-hidden />
                  <p className="min-w-0 flex-1 text-pretty text-[11.5px] font-medium leading-relaxed text-[#0B211B]/65">
                    Once confirmed, this transfer cannot be recalled. You can track it under payout history.
                  </p>
                </Panel>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    close()
                    notify({ title: 'Withdrawal sent', body: `${earnings.available} arrives within one business day · no fee`, kind: 'ok' })
                    navigate('/professional/pr09')
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                >
                  <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                  Confirm transfer
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={close}
                  className="w-full rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/70"
                >
                  Not now
                </motion.button>
              </div>
            ) : sheet === 'account' ? (
              <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
                <div className="flex items-start gap-3">
                  <Tile icon={Landmark} tone="ink" size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Payout accounts</div>
                    <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Where your earnings land every Friday</div>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    onClick={close}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                    aria-label="Close sheet"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </motion.button>
                </div>

                <div className="rounded-3xl bg-[#0B231C] p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.12] text-emerald-100">
                      <Landmark className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13.5px] font-extrabold text-white">{professional.bank}</div>
                      <div className="font-mono text-[11px] font-bold tracking-[0.14em] text-emerald-100/50">•••• 4821 · savings</div>
                    </div>
                    <Chip intent="success" light className="shrink-0 border-transparent">Default</Chip>
                  </div>
                </div>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    close()
                    notify({ title: 'Add account', body: 'Enter account details · verified within one business day', kind: 'info' })
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/70"
                >
                  Add another account
                </motion.button>
                <p className="text-center text-[10.5px] font-semibold text-[#0B211B]/45">
                  Account changes never delay an in-flight payout.
                </p>
              </div>
            ) : (
              selected && (
                <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
                  <div className="flex items-start gap-3">
                    <Tile icon={ReceiptText} tone="success" size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Payout · {selected.date}</div>
                      <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">
                        {selected.status === 'paid' ? 'Settled to your bank' : 'In transit · arrives by 6 PM'}
                      </div>
                    </div>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.92 }}
                      onClick={close}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                      aria-label="Close sheet"
                    >
                      <X className="h-4 w-4" aria-hidden />
                    </motion.button>
                  </div>

                  <div className="flex items-end justify-between rounded-3xl bg-[#0B231C] p-4">
                    <div>
                      <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Amount</div>
                      <div className="mt-1 font-mono text-[24px] font-black leading-none tracking-tight text-white">{selected.amount}</div>
                    </div>
                    <Chip intent={selected.status === 'paid' ? 'success' : 'warning'} dot={selected.status !== 'paid'}>
                      {selected.status === 'paid' ? 'Paid' : 'In transit'}
                    </Chip>
                  </div>

                  <Panel intent="neutral" className="p-4">
                    <div className="flex flex-col gap-2.5">
                      {[
                        { k: 'Sessions included', v: `${selected.sessions}` },
                        { k: 'Destination', v: '••4821 savings' },
                        { k: 'Record match', v: 'Matches your session log' },
                      ].map((r) => (
                        <div key={r.k} className="flex items-baseline">
                          <span className="shrink-0 text-[11.5px] font-semibold text-[#0B211B]/55">{r.k}</span>
                          <span aria-hidden className="mx-2.5 min-w-0 flex-1 -translate-y-1 border-b border-dotted border-[#0B211B]/20" />
                          <span className="shrink-0 font-mono text-[12px] font-bold text-[#0B211B]">{r.v}</span>
                        </div>
                      ))}
                    </div>
                  </Panel>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      close()
                      notify({ title: 'Receipt ready', body: `${selected.date} payout receipt saved as PDF`, kind: 'ok' })
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                  >
                    <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                    Download receipt
                  </motion.button>
                </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
