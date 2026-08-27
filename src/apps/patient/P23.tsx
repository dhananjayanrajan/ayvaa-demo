import { motion } from 'motion/react'
import { Check, ChevronRight, Clock, CreditCard, Download, Lock, Undo2 } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { carePlan, pricing, visits } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P23() {
  const { notify } = useDemo()
  const { navigate } = useRouter()

  const live = visits.find((v) => v.status === 'live')
  const upcoming = visits.find((v) => v.status === 'confirmed')
  const missed = visits.find((v) => v.status === 'missed')
  const refundAmount = missed?.note?.match(/₹[\d,]+/)?.[0] ?? '₹4,800'

  return (
    <Screen>
      <AppBar title="Payments" subtitle={`${carePlan.category} plan for your family`} onBack={() => navigate('/patient/p21')} />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.9px] text-brand-ink/70">Spent this month</div>
                  <div className="mt-0.5 text-2xl font-black text-brand-ink">{pricing.marchSpent}</div>
                </div>
                <span className="grid size-16 place-items-center rounded-full bg-white">
                  <CreditCard className="size-8 text-primary" />
                </span>
              </div>
              <div className="text-xs font-medium text-brand-ink/90">
                {pricing.marchVisits} visits at {pricing.elderly} each · no pending charges
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="March receipts" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {live && (
                <>
                  <div className="flex items-center gap-3 px-2 py-1.5">
                    <IconTile icon={Check} tone="mint" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-foreground">
                        {live.day}, {live.date}
                      </div>
                      <div className="truncate text-xs font-medium text-muted-foreground">
                        {live.caregiver} · {carePlan.category} visit
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-foreground">{pricing.elderly}</div>
                      <div className="text-[11px] font-medium text-muted-foreground">on sign off</div>
                    </div>
                  </div>
                  <Separator className="mx-3 my-2.5 bg-border/70" />
                </>
              )}
              {upcoming && (
                <>
                  <div className="flex items-center gap-3 px-2 py-1.5">
                    <IconTile icon={Clock} tone="tonal" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-foreground">
                        {upcoming.day}, {upcoming.date}
                      </div>
                      <div className="truncate text-xs font-medium text-muted-foreground">
                        Charged only after the visit is done
                      </div>
                    </div>
                    <Pill tone="grey">Planned</Pill>
                  </div>
                  <Separator className="mx-3 my-2.5 bg-border/70" />
                </>
              )}
              {missed && (
                <div className="flex items-center gap-3 px-2 py-1.5">
                  <IconTile icon={Undo2} tone="mint" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-bold text-foreground">
                      {missed.day}, {missed.date} refund
                    </div>
                    <div className="truncate text-xs font-medium text-muted-foreground">
                      Missed visit · returned to card in 3 days
                    </div>
                  </div>
                  <div className="text-sm font-bold text-primary">+{refundAmount}</div>
                </div>
              )}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={Lock}
              body="Every charge links to exactly one signed off visit. Nothing is ever billed for missed time."
            />
          </motion.div>

          <motion.div variants={item}>
            <ScreenCard className="p-2">
              <button
                onClick={() => {
                  notify({ title: 'Payment methods', body: 'Manage cards and defaults here', kind: 'info' })
                  navigate('/patient/p24')
                }}
                className="flex w-full items-center gap-3 px-2 py-1.5 text-left"
              >
                <IconTile icon={CreditCard} tone="mint" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-foreground">Payment methods</div>
                  <div className="truncate text-xs font-medium text-muted-foreground">
                    Cards, defaults and billing safety
                  </div>
                </div>
                <ChevronRight className="size-4.5 shrink-0 text-muted-foreground" />
              </button>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of payments" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton
          variant="outline"
          shape="pill"
          size="lg"
          className="w-full"
          onClick={() => notify({ title: 'Statement queued', body: 'March statement will be emailed as a PDF', kind: 'info' })}
        >
          <Download className="size-4" /> Download March statement
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}
