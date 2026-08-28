import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Bell,
  CheckCircle2,
  ReceiptText,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import {
  Card,
  Chip,
  Section,
  Tile,
  TimeChip,
  rise,
  stagger,
} from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { partner, referrals } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { PartnerStatsHero } from '@/components/partner/PartnerStatsHero'
import { PartnerReferralCard } from '@/components/partner/PartnerReferralCard'
import { PartnerQuickActions } from '@/components/partner/PartnerQuickActions'
import { ReferredPatientList } from '@/components/partner/ReferredPatientList'

const alerts: { icon: LucideIcon; tone: TileTone; title: string; body: string; time: string }[] = [
  { icon: CheckCircle2, tone: 'success', title: 'Offer accepted', body: 'Ramesh Rao · caregiver confirmed for Friday', time: '8:12 AM' },
  { icon: ReceiptText, tone: 'ink', title: 'Invoice settled', body: 'Feb statement paid in full · PDF ready', time: 'Yesterday' },
  { icon: X, tone: 'warning', title: 'Staff request', body: 'Kavitha Nair wants to join under Sunrise', time: 'Mon' },
]

export function PT02() {
  const { navigate } = useRouter()
  const { notify, markAllRead } = useDemo()
  const [sheetOpen, setSheetOpen] = useState(false)

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
              onClick={() => setSheetOpen(true)}
              className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60"
              aria-label="Notifications"
            >
              <Bell className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-[#F4F8F6]" />
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
              <PartnerStatsHero partner={partner} referrals={referrals} />
            </motion.div>

            <motion.div variants={rise}>
              <PartnerReferralCard onStartReferral={() => navigate('/partner/pt03')} />
            </motion.div>

            <motion.div variants={rise}>
              <PartnerQuickActions
                staffCount={partner.staffOnAyvaa}
                sessionsCount={partner.sessionsThisMonth}
                onStaffClick={() => navigate('/partner/pt05')}
                onBillingClick={() => navigate('/partner/pt07')}
                onSessionsClick={() => notify({ title: 'Sessions', body: `${partner.sessionsThisMonth} verified sessions this month`, kind: 'info' })}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Referred patients" trailing={<Chip intent="neutral">{referrals.length} tracked</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <ReferredPatientList referrals={referrals} onSelectReferral={() => navigate('/partner/pt04')} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Billing" trailing={<Chip intent="success">Up to date</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => navigate('/partner/pt07')}
                className="group block w-full text-left"
              >
                <Card>
                  <div className="flex items-center gap-3.5 p-4">
                    <Tile icon={ReceiptText} tone="ink" size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">February invoice</div>
                      <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">31 sessions · paid Feb 28</div>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <span className="font-mono text-[14px] font-black tabular-nums tracking-tight text-[#0B211B]">₹96,400</span>
                      <Chip intent="success">Paid</Chip>
                    </div>
                  </div>
                </Card>
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of partnership" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {sheetOpen && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSheetOpen(false)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheetOpen && (
          <motion.div
            key="alerts"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />

            <div className="flex items-start gap-3">
              <Tile icon={Bell} tone="warning" size="lg" />
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Partner alerts</div>
                <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Everything that moved while you were away</div>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setSheetOpen(false)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                aria-label="Close alerts"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>

            <div className="flex flex-col">
              {alerts.map((a, i) => (
                <div key={a.title}>
                  {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                  <div className="flex items-center gap-3 px-1 py-3.5">
                    <Tile icon={a.icon} tone={a.tone} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{a.title}</div>
                      <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">{a.body}</div>
                    </div>
                    <TimeChip>{a.time}</TimeChip>
                  </div>
                </div>
              ))}
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                markAllRead()
                setSheetOpen(false)
                notify({ title: 'All caught up', body: 'No new partner alerts today', kind: 'ok' })
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              Mark all as read
            </motion.button>
            <p className="text-center text-[10.5px] font-semibold text-[#0B211B]/45">
              Alerts are quiet between 9 PM and 8 AM unless urgent.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
