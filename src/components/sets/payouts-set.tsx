import { motion } from 'motion/react'
import { Bell, BellOff, Check, ChevronRight, Download, Landmark, Plus, ReceiptText, ShieldCheck } from 'lucide-react'
import { Card, Chip, Hero, Kicker, Panel, Tile } from '@/components/base/phone/kit'
import { SheetShell } from '@/components/base/phone/sheet-shell'
import { CtaNote, LifecycleButton } from '@/components/base/phone/lifecycle-button'
import { DarkPanel } from '@/components/base/phone/dark-panel'
import { FactRows } from '@/components/base/phone/fact-rows'
import type { Payout, PayoutAccount } from '@/data/payoutData'
import { WITHDRAWAL_STEPS } from '@/data/payoutData'
import { useEffect, useRef, useState } from 'react'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'
import type { StepItem } from '@/components/base/phone/step-list'
import { StepList } from '@/components/base/phone/step-list'
import { Row } from '@/components/base/phone/row'

// ── AccountCard.tsx ──
type Props_AccountCard = {
  bankName: string
  last4: string
  holder: string
  verified: string | null
  extraCount: number
  onPress: () => void
}

export function AccountCard({ bankName, last4, holder, verified, extraCount, onPress }: Props_AccountCard) {
  return (
    <motion.button type="button" whileTap={{ scale: 0.985 }} onClick={onPress} className="block w-full text-left">
      <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#0B231C] via-[#123B2E] to-[#0F5138] p-5 shadow-[0_24px_56px_-26px_rgba(6,40,30,0.8)]">
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="relative">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.12] text-emerald-100">
              <Landmark className="h-5 w-5" strokeWidth={2.2} aria-hidden />
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="truncate text-[14px] font-extrabold tracking-tight text-white">{bankName}</div>
              <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Savings account</div>
            </div>
            <Chip intent="success" light className="shrink-0 border-transparent">
              Default
            </Chip>
          </div>

          <div className="mt-4 font-mono text-[20px] font-black tracking-[0.18em] text-emerald-50">{`•••• •••• ${last4}`}</div>

          <div className="mt-4 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Account holder</div>
              <div className="mt-1 truncate font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-100/70">{holder}</div>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Verified</div>
              <div className="mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-100/70">{verified ?? 'Pending'}</div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-white/[0.08] px-4 py-3">
            <span className="min-w-0 flex-1 text-[11px] font-bold text-emerald-50/90">
              {extraCount > 0 ? `Manage ${extraCount + 1} linked accounts` : 'Manage payout accounts'}
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-emerald-100/70" aria-hidden />
          </div>
        </div>
      </div>
    </motion.button>
  )
}

// ── AccountSheet.tsx ──
type Props_AccountSheet = {
  accounts: PayoutAccount[]
  adding: boolean
  onClose: () => void
  onAdd: () => void
}

export function AccountSheet({ accounts, adding, onClose, onAdd }: Props_AccountSheet) {
  return (
    <SheetShell
      icon={Landmark}
      tone="ink"
      title="Payout accounts"
      subtitle="Where your earnings land every Friday"
      onClose={onClose}
      footer={
        <div className="flex flex-col gap-2.5">
          <LifecycleButton
            phase="idle"
            gated={adding}
            idleIcon={Plus}
            idleLabel={adding ? 'Verifying account…' : 'Add another account'}
            workingLabel="Verifying account…"
            doneLabel="Added"
            onPress={onAdd}
          />
          <CtaNote className="font-semibold">Account changes never delay an in-flight payout.</CtaNote>
        </div>
      }
    >
      <div className="flex flex-col gap-2.5">
        {accounts.map((a) => (
          <DarkPanel key={a.id}>
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.12] text-emerald-100">
                <Landmark className="h-5 w-5" strokeWidth={2.2} aria-hidden />
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="truncate text-[13.5px] font-extrabold text-white">{a.bankName}</div>
                <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">
                  Savings account
                </div>
              </div>
              <Chip
                intent={a.primary ? 'success' : 'info'}
                light
                dot={!a.primary}
                className="shrink-0 border-transparent whitespace-nowrap"
              >
                {a.primary ? 'Default' : a.verified ? 'Backup' : 'Verifying'}
              </Chip>
            </div>

            <div className="mt-3.5">
              <FactRows
                rows={[
                  { label: 'Account', value: `••${a.last4}` },
                  { label: 'Holder', value: a.holder },
                  { label: 'Verified', value: a.verified ?? 'Within one business day' },
                ]}
              />
            </div>
          </DarkPanel>
        ))}
      </div>
    </SheetShell>
  )
}

// ── AlertToggleRow.tsx ──
export function AlertToggleRow() {
  const { notify } = useDemo()
  const [alertMe, setAlertMe] = useState(true)

  const toggle = () => {
    const next = !alertMe
    setAlertMe(next)
    notify({
      title: next ? 'Arrival alerts on' : 'Arrival alerts off',
      body: next ? 'We will ping you the moment money lands.' : 'You can re-enable any time before 6 PM.',
      kind: 'info',
    })
  }

  return (
    <div className="mt-4 flex items-start gap-3 rounded-2xl bg-[#0B211B]/[0.04] px-4 py-3.5">
      <Tile icon={alertMe ? Bell : BellOff} tone={alertMe ? 'success' : 'neutral'} size="sm" />
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="text-[13px] font-extrabold tracking-tight text-[#0B211B]">Alert me when it lands</div>
        <div className="mt-0.5 text-pretty text-[10.5px] font-semibold leading-relaxed text-[#0B211B]/45">
          Push and SMS the second the bank confirms
        </div>
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={alertMe}
        aria-label="Toggle arrival alerts"
        className={cn(
          'relative mt-1 h-7 w-12 shrink-0 rounded-full transition-colors duration-200',
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
  )
}

// ── ArrivalTimelineCard.tsx ──
export function ArrivalTimelineCard() {
  const steps: StepItem[] = WITHDRAWAL_STEPS.map((st, i) => {
    const last = i === WITHDRAWAL_STEPS.length - 1
    return {
      key: st.title,
      title: st.title,
      body: st.detail,
      state: st.done ? 'done' : st.active ? 'active' : 'pending',
      nodeClassName: cn(
        'mt-1 h-3.5 w-3.5',
        st.done ? 'bg-emerald-500' : 'bg-white',
      ),
      node: st.active ? (
        <span className="relative mt-1 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-white">
          <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-emerald-400/50" />
          <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
        </span>
      ) : undefined,
      railClassName: last
        ? undefined
        : 'bg-gradient-to-b from-emerald-500/50 via-emerald-400/25 to-emerald-300/15',
      contentClassName: last ? '' : 'pb-5',
      trailingTitle: (
        <span className="font-mono text-[10px] font-bold uppercase tabular-nums text-emerald-600">
          {st.when}
        </span>
      ),
    }
  })

  return (
    <Card>
      <div className="p-5">
        <StepList steps={steps} nodeStyle="dot" nodeSize="sm" activeStyle="ping" />
        <AlertToggleRow />
      </div>
    </Card>
  )
}

// ── ConfirmWithdrawSheet.tsx ──
type Props_ConfirmWithdrawSheet = {
  amount: string
  bankName: string
  last4: string
  sessions: number
  onClose: () => void
  onConfirmed: () => void
}

type Status_ConfirmWithdrawSheet = 'idle' | 'processing' | 'confirmed'

export function ConfirmWithdrawSheet({ amount, bankName, last4, sessions, onClose, onConfirmed }: Props_ConfirmWithdrawSheet) {
  const [status, setStatus] = useState<Status_ConfirmWithdrawSheet>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const confirm = () => {
    if (status !== 'idle') return
    setStatus('processing')
    timers.current.push(
      setTimeout(() => {
        setStatus('confirmed')
        timers.current.push(setTimeout(onConfirmed, 1400))
      }, 1200),
    )
  }

  return (
    <SheetShell
      icon={status === 'confirmed' ? Check : ShieldCheck}
      tone={status === 'confirmed' ? 'success' : 'info'}
      title={status === 'confirmed' ? 'Transfer confirmed' : 'Confirm withdrawal'}
      subtitle={
        status === 'confirmed'
          ? 'The transfer is on its way to your bank'
          : 'Review the transfer before it moves'
      }
      onClose={onClose}
      footer={
        status === 'confirmed' ? (
          <CtaNote className="text-[10.5px] font-semibold text-emerald-700/80">Returning you to earnings.</CtaNote>
        ) : (
          <div className="flex flex-col gap-2.5">
            <LifecycleButton
              phase={status === 'processing' ? 'working' : 'idle'}
              tone="accent"
              idleIcon={Check}
              idleLabel="Confirm transfer"
              workingLabel="Sending transfer…"
              doneLabel="Transfer confirmed"
              onPress={confirm}
            />
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/70 transition-colors hover:bg-[#0B211B]/[0.09]"
            >
              Not now
            </button>
          </div>
        )
      }
    >
      <div className="flex flex-col gap-3.5">
        <DarkPanel kicker="Amount">
          <div className="font-mono text-[24px] font-black leading-none tracking-tight text-white">{amount}</div>
          <div className="mt-4">
            <FactRows
              rows={[
                { label: 'To bank', value: bankName },
                { label: 'Account', value: `••${last4}` },
                { label: 'Sessions verified', value: String(sessions) },
                { label: 'Fee', value: '₹0' },
                { label: 'Arrives', value: 'By 6:00 PM today' },
              ]}
            />
          </div>
        </DarkPanel>

        <Panel intent="info" className="flex items-start gap-2.5 p-3.5">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" strokeWidth={2.4} aria-hidden />
          <p className="min-w-0 flex-1 text-pretty text-[11.5px] font-medium leading-relaxed text-[#0B211B]/65">
            Once confirmed, this transfer cannot be recalled. You can track it under payout history.
          </p>
        </Panel>
      </div>
    </SheetShell>
  )
}

// ── PayoutHistoryCard.tsx ──
type Props_PayoutHistoryCard = {
  payouts: Payout[]
  onPressPayout: (p: Payout) => void
}

export function PayoutHistoryCard({ payouts, onPressPayout }: Props_PayoutHistoryCard) {
  return (
    <Card>
      {payouts.map((p) => (
        <div key={p.date}>
          <PayoutRow
            date={p.date}
            sessions={p.sessions}
            amount={p.amount}
            paid={p.status === 'paid'}
            onPress={() => onPressPayout(p)}
          />
        </div>
      ))}
    </Card>
  )
}

// ── PayoutReceiptSheet.tsx ──
type Status_PayoutReceiptSheet = 'idle' | 'generating' | 'saved'

type Props_PayoutReceiptSheet = {
  date: string
  amount: string
  sessions: number
  paid: boolean
  bankName: string
  last4: string
  holder: string
  onClose: () => void
}

export function PayoutReceiptSheet({ date, amount, sessions, paid, bankName, last4, holder, onClose }: Props_PayoutReceiptSheet) {
  const [status, setStatus] = useState<Status_PayoutReceiptSheet>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const download = () => {
    if (status !== 'idle') return
    setStatus('generating')
    timers.current.push(
      setTimeout(() => {
        const lines = [
          'AYVAA CAREGIVER - PAYOUT RECEIPT',
          '',
          `Period: ${date}`,
          `Amount: ${amount}`,
          `Sessions included: ${sessions}`,
          `Destination: ${bankName} account ••${last4}`,
          `Account holder: ${holder}`,
          `Status_PayoutReceiptSheet: ${paid ? 'Paid' : 'In transit'}`,
          '',
          'Sealed record. Every rupee traces to a completed, family-signed-off session.',
        ]
        const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `ayvaa-payout-${date.replace(/\s+/g, '-').toLowerCase()}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        setStatus('saved')
      }, 1000),
    )
  }

  return (
    <SheetShell
      icon={ReceiptText}
      tone={paid ? 'success' : 'warning'}
      title={`Payout, ${date}`}
      subtitle={paid ? 'Settled to your bank' : 'In transit, arrives by 6 PM'}
      onClose={onClose}
      footer={
        <LifecycleButton
          phase={status === 'idle' ? 'idle' : status === 'saved' ? 'done' : 'working'}
          idleIcon={Download}
          idleLabel="Download receipt"
          workingLabel="Preparing receipt…"
          doneLabel="Receipt saved to downloads"
          onPress={download}
        />
      }
    >
      <DarkPanel
        kicker="Amount"
        kickerTrailing={
          <Chip intent={paid ? 'success' : 'warning'} dot={!paid} className="shrink-0 whitespace-nowrap">
            {paid ? 'Paid' : 'In transit'}
          </Chip>
        }
      >
        <div className="font-mono text-[24px] font-black leading-none tracking-tight text-white">{amount}</div>
        <div className="mt-4">
          <FactRows
            rows={[
              { label: 'Sessions included', value: String(sessions) },
              { label: 'Destination', value: bankName },
              { label: 'Account', value: `••${last4}` },
              { label: 'Session log', value: paid ? 'Matched' : 'Pending match' },
            ]}
          />
        </div>
      </DarkPanel>
    </SheetShell>
  )
}

// ── PayoutRow.tsx ──
type Props_PayoutRow = {
  date: string
  sessions: number
  amount: string
  paid: boolean
  onPress: () => void
}

export function PayoutRow({ date, sessions, amount, paid, onPress }: Props_PayoutRow) {
  return (
    <Row
      icon={ReceiptText}
      tone="neutral"
      tileSize="sm"
      title={date}
      titleClassName="text-[13.5px] font-extrabold"
      metaLabel={`${sessions} sessions`}
      amount={amount}
      chip={{ label: paid ? 'Paid' : 'In transit', intent: paid ? 'success' : 'warning', dot: !paid }}
      onClick={onPress}
      showChevron={false}
    />
  )
}

// ── WithdrawHero.tsx ──
type Props_WithdrawHero = {
  total: number
  sessions: number
  perSession: number
}

export function WithdrawHero({ total, sessions, perSession }: Props_WithdrawHero) {
  return (
    <Hero>
      <div className="flex items-center justify-between gap-3">
        <Kicker>Payout breakdown</Kicker>
        <Chip intent="success" light icon={ShieldCheck} className="shrink-0 border-transparent">
          Ready now
        </Chip>
      </div>

      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-[18px] font-extrabold text-emerald-200/80">₹</span>
        <span className="text-[38px] font-extrabold leading-none tracking-tight text-white">{total.toLocaleString('en-IN')}</span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-white/[0.06] px-4 py-3">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-200/50">Sessions</div>
          <div className="mt-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">{sessions}</div>
        </div>
        <div className="rounded-2xl bg-white/[0.06] px-4 py-3">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-200/50">Per session</div>
          <div className="mt-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">
            {`₹${perSession.toLocaleString('en-IN')}`}
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-2.5 rounded-2xl bg-white/[0.04] p-3.5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Gross</span>
          <span className="min-w-0 text-right font-mono text-[12.5px] font-bold tabular-nums text-emerald-50/90">
            {`₹${total.toLocaleString('en-IN')}`}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Platform fee</span>
          <span className="min-w-0 text-right font-mono text-[12.5px] font-bold tabular-nums text-emerald-300">₹0</span>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl bg-emerald-400/[0.12] px-3 py-2.5">
          <span className="flex min-w-0 items-center gap-1.5">
            <Landmark className="h-3.5 w-3.5 shrink-0 text-emerald-300" strokeWidth={2.4} aria-hidden />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-emerald-100">Net to bank</span>
          </span>
          <span className="shrink-0 font-mono text-[15px] font-black tabular-nums tracking-tight text-white">
            {`₹${total.toLocaleString('en-IN')}`}
          </span>
        </div>
      </div>
    </Hero>
  )
}
