import { motion } from 'motion/react'
import { Check, ChevronRight, Clock, Download, Star, Target, TrendingUp, Wallet } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { ActionRow, IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill, StatCard } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { earnings, payouts, professional } from '@/data/seed'
import { pastSessions } from '@/data/professionalHistory'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function PR09() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const nextPayout = payouts.find((p) => p.status === 'in-transit') ?? payouts[0]
  const done = pastSessions.filter((s) => !s.incident)

  return (
    <Screen>
      <AppBar
        title="Earnings"
        subtitle={`${professional.name.split(' ')[0]} · March 2024`}
        trailing={
          <button
            onClick={() => notify({ title: 'Statement queued', body: 'March earnings summary will be emailed', kind: 'info' })}
            className="grid size-10.5 shrink-0 place-items-center rounded-full bg-tonal text-foreground/70 transition-colors hover:bg-mint"
            aria-label="Download earnings"
          >
            <Download className="size-5" />
          </button>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.9px] text-brand-ink/70">Available now</div>
                  <div className="mt-0.5 text-2xl font-black text-brand-ink">{earnings.available}</div>
                </div>
                <span className="grid size-16 place-items-center rounded-full bg-white">
                  <Wallet className="size-8 text-primary" />
                </span>
              </div>
              <div className="text-xs font-medium text-brand-ink/90">
                Next payout {earnings.nextPayout} · {nextPayout.sessions} verified sessions worth {nextPayout.amount}
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item} className="flex gap-2.5">
            <StatCard icon={TrendingUp} value={earnings.thisWeek} label="This week" tone="mint" />
            <StatCard icon={Check} value={String(earnings.sessions)} label="Sessions done" />
            <StatCard icon={Star} value={String(earnings.rating)} label="Rating" />
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Session earnings · this week" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {done.map((s, i) => (
                <div key={s.id}>
                  {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                  <div className="flex items-center gap-3 px-2 py-1.5">
                    <IconTile icon={Check} tone="mint" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-foreground">{s.date}</div>
                      <div className="truncate text-xs font-medium text-muted-foreground">
                        {s.patient} · signed off
                      </div>
                    </div>
                    <div className="text-sm font-bold text-foreground">{s.amount}</div>
                  </div>
                </div>
              ))}
              <Separator className="mx-3 my-2.5 bg-border/70" />
              <div className="flex items-center gap-3 px-2 py-1.5 opacity-70">
                <IconTile icon={Clock} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-foreground">Tonight · Ramesh Sharma</div>
                  <div className="truncate text-xs font-medium text-muted-foreground">Pays only after the visit is signed off</div>
                </div>
                <Pill tone="grey">Pending</Pill>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={Target}
              body="A session pays only after sign off. This keeps earnings honest for you and families alike."
            />
          </motion.div>

          <motion.div variants={item}>
            <ScreenCard tone="tonal" className="p-2">
              <ActionRow
                icon={Target}
                title="Payout history & withdrawal"
                subtitle={`${payouts.length} payouts · ${professional.bank}`}
                onClick={() => navigate('/professional/pr10')}
              />
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of earnings" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton
          variant="default"
          shape="pill"
          size="lg"
          className="w-full"
          onClick={() => {
            notify({ title: 'Withdrawal started', body: `${earnings.available} to ${professional.bank}`, kind: 'ok' })
            navigate('/professional/pr10')
          }}
        >
          <ChevronRight className="size-4" /> Withdraw to bank
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}
