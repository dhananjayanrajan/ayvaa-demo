import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BadgeCheck, Landmark, Lock } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Chip, Section, rise, stagger } from '@/components/phone/kit'
import { earnings, payouts, professional } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { WithdrawHero } from '@/components/professional/payouts/WithdrawHero'
import { AccountCard } from '@/components/professional/payouts/AccountCard'
import { ArrivalTimelineCard } from '@/components/professional/payouts/ArrivalTimelineCard'
import { PayoutHistoryCard } from '@/components/professional/payouts/PayoutHistoryCard'
import { ConfirmWithdrawSheet } from '@/components/professional/payouts/ConfirmWithdrawSheet'
import { AccountSheet } from '@/components/professional/payouts/AccountSheet'
import { PayoutReceiptSheet } from '@/components/professional/payouts/PayoutReceiptSheet'
import { parseBank, type Payout, type PayoutAccount } from '@/components/professional/payouts/payoutData'

type Sheet = 'none' | 'confirm' | 'account' | 'payout'

const parseINR = (raw: string) => Number(raw.replace(/[^\d]/g, '')) || 0

export function PR10() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const primary = parseBank(professional.bank)
  const [sheet, setSheet] = useState<Sheet>('none')
  const [selected, setSelected] = useState<Payout | null>(null)
  const [accounts, setAccounts] = useState<PayoutAccount[]>([
    {
      id: 'primary',
      bankName: primary.name,
      last4: primary.last4,
      holder: professional.name,
      verified: 'March 1',
      primary: true,
    },
  ])
  const [adding, setAdding] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const close = () => setSheet('none')

  const total = parseINR(earnings.available)
  const sessionCount = 9
  const perSession = Math.round(total / sessionCount)

  const confirmWithdrawal = () => {
    close()
    notify({
      title: 'Withdrawal sent',
      body: `${earnings.available} arrives within one business day. No fee.`,
      kind: 'ok',
    })
    navigate('/professional/pr09')
  }

  const addAccount = () => {
    if (adding) return
    setAdding(true)
    timers.current.push(
      setTimeout(() => {
        const next = accounts.filter((a) => !a.primary).length + 1
        setAccounts((prev) => [
          ...prev,
          {
            id: `added-${prev.length}`,
            bankName: 'State Bank of India',
            last4: String(2200 + next).slice(-4),
            holder: professional.name,
            verified: null,
            primary: false,
          },
        ])
        setAdding(false)
        notify({
          title: 'Account added',
          body: 'Verifying ownership. Payouts can be switched once verified.',
          kind: 'ok',
        })
      }, 1200),
    )
  }

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
              <WithdrawHero total={total} sessions={sessionCount} perSession={perSession} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Payout account" trailing={<Chip intent="success" icon={BadgeCheck}>Verified</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <AccountCard
                bankName={primary.name}
                last4={primary.last4}
                holder={professional.name}
                verified="March 1"
                extraCount={accounts.length - 1}
                onPress={() => setSheet('account')}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Arrival timeline" trailing={<Chip intent="live" dot>Today</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <ArrivalTimelineCard />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Payout history" trailing={<Chip intent="neutral">Tap to inspect</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <PayoutHistoryCard payouts={payouts} onPressPayout={(p) => { setSelected(p); setSheet('payout') }} />
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
            Arrives within one business day. Zero withdrawal fee.
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
            transition={{ duration: 0.2 }}
            onClick={close}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet === 'confirm' && (
          <ConfirmWithdrawSheet
            key="confirm"
            amount={earnings.available}
            bankName={primary.name}
            last4={primary.last4}
            sessions={sessionCount}
            onClose={close}
            onConfirmed={confirmWithdrawal}
          />
        )}
        {sheet === 'account' && (
          <AccountSheet key="account" accounts={accounts} adding={adding} onClose={close} onAdd={addAccount} />
        )}
        {sheet === 'payout' && selected && (
          <PayoutReceiptSheet
            key="payout"
            date={selected.date}
            amount={selected.amount}
            sessions={selected.sessions}
            paid={selected.status === 'paid'}
            bankName={primary.name}
            last4={primary.last4}
            holder={professional.name}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </Screen>
  )
}
