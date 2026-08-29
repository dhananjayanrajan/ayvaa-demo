import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Download } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Section, rise, stagger } from '@/components/phone/kit'
import { earnings, payouts, professional } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { EarningsHero } from '@/components/professional/earnings/EarningsHero'
import { RatingStrip } from '@/components/professional/earnings/RatingStrip'
import { SessionEarningsCard } from '@/components/professional/earnings/SessionEarningsCard'
import { PayPolicyNotice } from '@/components/professional/earnings/PayPolicyNotice'
import { PayoutLinkCard } from '@/components/professional/earnings/PayoutLinkCard'
import { WithdrawButton, type WithdrawStatus } from '@/components/professional/earnings/WithdrawButton'
import { paidSessions } from '@/components/professional/earnings/sessionRecords'

export function PR09() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const nextPayout = payouts.find((p) => p.status === 'in-transit') ?? payouts[0]
  const [withdrawStatus, setWithdrawStatus] = useState<WithdrawStatus>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const pressSession = (s: (typeof paidSessions)[number]) =>
    notify({ title: `${s.patient}, ${s.day}`, body: `Signed off at ${s.time}. ${s.amount} credited to available.`, kind: 'info' })

  const withdraw = () => {
    if (withdrawStatus !== 'idle') return
    setWithdrawStatus('processing')
    notify({ title: 'Withdrawal started', body: `${earnings.available} to ${professional.bank}.`, kind: 'ok' })
    timers.current.push(
      setTimeout(() => {
        setWithdrawStatus('confirmed')
        notify({
          title: 'Withdrawal confirmed',
          body: `${earnings.available} on the way. Arrives by ${earnings.nextPayout}.`,
          kind: 'ok',
        })
        timers.current.push(setTimeout(() => navigate('/professional/pr10'), 1600))
      }, 1200),
    )
  }

  return (
    <Screen>
      <AppBar
        title="Earnings"
        subtitle={`${professional.name.split(' ')[0]}, March`}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => notify({ title: 'Statement queued', body: 'March earnings summary will be emailed as a PDF.', kind: 'info' })}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
            aria-label="Download statement"
          >
            <Download className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-blue-400/[0.12] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <EarningsHero
                available={earnings.available}
                status={withdrawStatus}
                thisWeek={earnings.thisWeek}
                sessions={earnings.sessions}
                nextPayout={earnings.nextPayout}
                payoutSessions={nextPayout.sessions}
                payoutAmount={nextPayout.amount}
              />
            </motion.div>

            <motion.div variants={rise}>
              <RatingStrip rating={earnings.rating} count={earnings.sessions} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Session earnings" />
            </motion.div>

            <motion.div variants={rise}>
              <SessionEarningsCard sessions={paidSessions} onPressSession={pressSession} />
            </motion.div>

            <motion.div variants={rise}>
              <PayPolicyNotice />
            </motion.div>

            <motion.div variants={rise}>
              <PayoutLinkCard
                bank={professional.bank}
                account="••4821"
                payoutCount={payouts.length}
                onPress={() => navigate('/professional/pr10')}
              />
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of earnings" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <WithdrawButton amount={earnings.available} status={withdrawStatus} onPress={withdraw} />
      </FootBar>
    </Screen>
  )
}
