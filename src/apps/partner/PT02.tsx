import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Bell,
  CheckCircle2,
  ReceiptText,
  X,
} from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import {
  Chip,
  Section,
  rise,
  stagger,
} from '@/components/phone/kit'
import { partner, referrals } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { PartnerStatsHero } from '@/components/partner/dashboard/PartnerStatsHero'
import { PartnerReferralCard } from '@/components/partner/dashboard/PartnerReferralCard'
import { PartnerQuickActions } from '@/components/partner/dashboard/PartnerQuickActions'
import { ReferredPatientList } from '@/components/partner/dashboard/ReferredPatientList'
import { PartnerBillingCard } from '@/components/partner/dashboard/PartnerBillingCard'
import { PartnerAlertsSheet, type AlertItem } from '@/components/partner/sheets/PartnerAlertsSheet'
import { PartnerStatsSheet } from '@/components/partner/sheets/PartnerStatsSheet'
import { PartnerReferralSheet } from '@/components/partner/sheets/PartnerReferralSheet'
import { PartnerStaffSheet } from '@/components/partner/sheets/PartnerStaffSheet'
import { PartnerBillingSheet } from '@/components/partner/sheets/PartnerBillingSheet'
import { PartnerSessionsSheet } from '@/components/partner/sheets/PartnerSessionsSheet'

const initialAlerts: AlertItem[] = [
  { icon: CheckCircle2, tone: 'success', title: 'Offer accepted', body: 'Ramesh Rao · caregiver confirmed for Friday', time: '8:12 AM' },
  { icon: ReceiptText, tone: 'ink', title: 'Invoice settled', body: 'Feb statement paid in full · PDF ready', time: 'Yesterday' },
  { icon: X, tone: 'warning', title: 'Staff request', body: 'Kavitha Nair wants to join under Sunrise', time: 'Mon' },
]

type SheetType = 'stats' | 'referral' | 'staff' | 'billing' | 'sessions' | 'alerts' | null

export function PT02() {
  const { navigate } = useRouter()
  const { notify, markAllRead } = useDemo()
  const [activeSheet, setActiveSheet] = useState<SheetType>(null)
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts)

  const closeSheet = () => setActiveSheet(null)

  const handleMarkAllRead = () => {
    markAllRead()
    setAlerts([])
    notify({ title: 'All caught up', body: 'No new partner alerts today', kind: 'ok' })
    closeSheet()
  }

  const weeklySessions = [4, 6, 5, 7, 8, 6, 9]

  const staffList = [
    { name: 'Dr. Meera Krishnan', role: 'Physician', seed: 'meera' },
    { name: 'Kavitha Nair', role: 'Care Coordinator', seed: 'kavitha' },
    { name: 'Ramesh Rao', role: 'Caregiver', seed: 'ramesh' },
  ]

  return (
    <Screen>
      <AppBar
        title="Care partnership"
        subtitle={partner.location}
        trailing={
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => setActiveSheet('alerts')}
              className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60"
              aria-label="Notifications"
            >
              <Bell className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
              {alerts.length > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-[#F4F8F6]" />}
            </motion.button>
            <AgentAvatar seed="sunrise" size={42} />
          </div>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <PartnerStatsHero
                partner={partner}
                referrals={referrals}
                onOpenActivity={() => setActiveSheet('stats')}
              />
            </motion.div>

            <motion.div variants={rise}>
              <PartnerReferralCard onOpenOptions={() => setActiveSheet('referral')} />
            </motion.div>

            <motion.div variants={rise}>
              <PartnerQuickActions
                staffCount={partner.staffOnAyvaa}
                sessionsCount={partner.sessionsThisMonth}
                onStaffClick={() => setActiveSheet('staff')}
                onBillingClick={() => setActiveSheet('billing')}
                onSessionsClick={() => setActiveSheet('sessions')}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Referred patients" trailing={<Chip intent="neutral" className="border-transparent">{referrals.length} tracked</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <ReferredPatientList referrals={referrals} onSelectReferral={() => navigate('/partner/pt04')} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Billing" trailing={<Chip intent="success" className="border-transparent">Up to date</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <PartnerBillingCard
                invoiceAmount="₹96,400"
                invoiceSessions="31 sessions · paid Feb 28"
                onViewBilling={() => navigate('/partner/pt07')}
              />
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of partnership" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {activeSheet && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSheet}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeSheet === 'stats' && (
          <PartnerStatsSheet weeklySessions={weeklySessions} onClose={closeSheet} />
        )}

        {activeSheet === 'referral' && (
          <PartnerReferralSheet
            onClose={closeSheet}
            onNewReferral={() => {
              closeSheet()
              navigate('/partner/pt03')
            }}
            onContinueDraft={() => {
              closeSheet()
              notify({ title: 'Draft not available', body: 'No drafts saved yet', kind: 'info' })
            }}
            onViewRecent={() => {
              closeSheet()
              navigate('/partner/pt04')
            }}
          />
        )}

        {activeSheet === 'staff' && (
          <PartnerStaffSheet
            staffList={staffList}
            staffCount={partner.staffOnAyvaa}
            onClose={closeSheet}
            onViewAllStaff={() => {
              closeSheet()
              navigate('/partner/pt05')
            }}
          />
        )}

        {activeSheet === 'billing' && (
          <PartnerBillingSheet
            invoiceAmount="₹96,400"
            invoiceSessions="31 sessions · paid Feb 28"
            onClose={closeSheet}
            onViewBilling={() => {
              closeSheet()
              navigate('/partner/pt07')
            }}
          />
        )}

        {activeSheet === 'sessions' && (
          <PartnerSessionsSheet
            sessionsCount={partner.sessionsThisMonth}
            onClose={closeSheet}
            onViewHistory={() => {
              closeSheet()
              notify({ title: 'Sessions', body: `${partner.sessionsThisMonth} verified sessions this month`, kind: 'info' })
            }}
          />
        )}

        {activeSheet === 'alerts' && (
          <PartnerAlertsSheet
            alerts={alerts}
            onClose={closeSheet}
            onMarkAllRead={handleMarkAllRead}
          />
        )}
      </AnimatePresence>
    </Screen>
  )
}
