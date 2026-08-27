import { useState } from 'react'
import { motion } from 'motion/react'
import { Bell, ChevronRight, Clock3, History, Lock, MapPin, Pill as PillIcon, ReceiptText, Users } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Separator } from '@/components/ui/separator'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn('relative h-7 w-12 shrink-0 rounded-full transition-colors', on ? 'bg-primary' : 'bg-[#CBD9D3]')}
      aria-label="Toggle setting"
    >
      <span className={cn('absolute top-1 size-5 rounded-full bg-white transition-all', on ? 'left-6' : 'left-1')} />
    </button>
  )
}

export function P29() {
  const { navigate } = useRouter()
  const { notify } = useDemo()
  const [settings, setSettings] = useState({
    reminders: true,
    doses: true,
    receipts: true,
    marketing: false,
    location: true,
    relatives: true,
  })

  const flip = (key: keyof typeof settings) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      notify({
        title: next[key] ? 'Setting on' : 'Setting off',
        body:
          key === 'location'
            ? 'Visit verification continues either way · your address is never shared'
            : key === 'relatives'
              ? 'Family view access updated instantly'
              : 'Notification preference saved',
        kind: 'info',
      })
      return next
    })
  }

  const notifRows = [
    { key: 'reminders' as const, icon: Bell, title: 'Visit reminders', subtitle: 'Thirty minutes before each visit' },
    { key: 'doses' as const, icon: PillIcon, title: 'Dose updates', subtitle: 'When the nurse records a dose' },
    { key: 'receipts' as const, icon: ReceiptText, title: 'Payment receipts', subtitle: 'After every completed visit' },
    { key: 'marketing' as const, icon: Clock3, title: 'Ayvaa news and offers', subtitle: 'At most one message per month' },
  ]

  const privacyRows = [
    { key: 'location' as const, icon: MapPin, title: 'Live location sharing', subtitle: 'Show arrivals during home visits' },
    { key: 'relatives' as const, icon: Users, title: 'Relative view access', subtitle: 'Chitra (sister) can see visit summaries' },
  ]

  return (
    <Screen>
      <AppBar title="Notifications and privacy" subtitle="You stay in control of every alert" onBack={() => navigate('/patient/p28')} />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <SectionHeader label="Notifications" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {notifRows.map((r, i) => {
                const Icon = r.icon
                return (
                  <div key={r.key}>
                    {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                    <div className="flex items-center gap-3 px-2 py-1.5">
                      <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-tonal text-foreground/70">
                        <Icon className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-foreground">{r.title}</div>
                        <div className="text-xs font-medium text-muted-foreground">{r.subtitle}</div>
                      </div>
                      <Toggle on={settings[r.key]} onClick={() => flip(r.key)} />
                    </div>
                  </div>
                )
              })}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Privacy" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {privacyRows.map((r, i) => {
                const Icon = r.icon
                return (
                  <div key={r.key}>
                    {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                    <div className="flex items-center gap-3 px-2 py-1.5">
                      <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-tonal text-foreground/70">
                        <Icon className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-foreground">{r.title}</div>
                        <div className="text-xs font-medium text-muted-foreground">{r.subtitle}</div>
                      </div>
                      <Toggle on={settings[r.key]} onClick={() => flip(r.key)} />
                    </div>
                  </div>
                )
              })}
              <Separator className="mx-3 my-2.5 bg-border/70" />
              <button
                onClick={() => navigate('/patient/p22')}
                className="flex w-full items-center gap-3 px-2 py-1.5 text-left"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-tonal text-foreground/70">
                  <Lock className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">Consent controls</div>
                  <div className="text-xs font-medium text-muted-foreground">Review what caregivers may do</div>
                </div>
                <ChevronRight className="size-4.5 shrink-0 text-muted-foreground" />
              </button>
              <Separator className="mx-3 my-2.5 bg-border/70" />
              <button
                onClick={() => notify({ title: 'Record access log', body: 'Last view: today at 10:02 AM · by you', kind: 'info' })}
                className="flex w-full items-center gap-3 px-2 py-1.5 text-left"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-tonal text-foreground/70">
                  <History className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">Who viewed my records</div>
                  <div className="text-xs font-medium text-muted-foreground">Full access log · last view today 10:02 AM</div>
                </div>
                <ChevronRight className="size-4.5 shrink-0 text-muted-foreground" />
              </button>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={Lock}
              body="Turning location sharing off does not stop visit verification. Arrivals are still checked without showing your address to anyone new."
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of settings" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
