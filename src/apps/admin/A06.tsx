import { useState } from 'react'
import { motion } from 'motion/react'
import { Ban, CalendarClock, ShieldCheck } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import {
  Chip,
  Hero,
  Kicker,
  Section,
  Stat,
  rise,
  stagger,
} from '@/components/phone/kit'
import { consentTracking } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { DueReviewCard } from '@/components/consent/ConsentSet'
import { WithdrawalCard } from '@/components/consent/ConsentSet'
import { InfoListCard } from '@/components/ui/UiSet'
import { ConsentRecordSheet } from '@/components/sheets/SheetsSet'

export function A06() {
  const { notify } = useDemo()
  const [recordSheetOpen, setRecordSheetOpen] = useState(false)

  return (
    <Screen>
      <AppBar
        title="Consent tracking"
        subtitle="Signed · due · withdrawn"
        trailing={<AgentAvatar seed="ayvaa-consent" size={42} />}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <Kicker>Consent ledger · 90-day cycle</Kicker>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  Consent,{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">never stale</span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  Every consent renews on a clock the system enforces.
                </p>

                <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
                  <Stat label="Active" value={consentTracking.active} dot="bg-emerald-300" />
                  <Stat label="Due" value={consentTracking.due} dot="bg-amber-300" />
                  <Stat label="Withdrawn" value={consentTracking.withdrawn} dot="bg-rose-300/80" />
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Chip intent="neutral" light>Auto reminders on</Chip>
                  <Chip intent="success" light>Ledger sealed</Chip>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Due for review" trailing={<Chip intent="warning" dot>1 needs action</Chip>} />
            </motion.div>

            <DueReviewCard notify={notify} onViewRecord={() => setRecordSheetOpen(true)} />

            <motion.div variants={rise}>
              <Section label="Withdrawn" trailing={<Chip intent="danger">{consentTracking.withdrawn}</Chip>} />
            </motion.div>

            <WithdrawalCard notify={notify} />

            <motion.div variants={rise}>
              <InfoListCard
                icon={ShieldCheck}
                title="Consent is a living record"
                subtitle="The ledger enforces itself — no chasing, no expiry surprises."
                items={[
                  { icon: CalendarClock, text: 'Re-confirmed every 90 days' },
                  { icon: Ban, text: 'Withdrawals stop care immediately' },
                  { icon: ShieldCheck, text: 'Sealed record, immutable' },
                ]}
              />
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of consent tracking" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <ConsentRecordSheet
        open={recordSheetOpen}
        onClose={() => setRecordSheetOpen(false)}
        notify={notify}
      />
    </Screen>
  )
}
