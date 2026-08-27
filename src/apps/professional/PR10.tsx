import { motion } from 'motion/react'
import { Check, Clock, Landmark, Lock, ReceiptText } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { earnings, payouts, professional } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function PR10() {
  const { notify } = useDemo()
  const { navigate } = useRouter()

  return (
    <Screen>
      <AppBar title="Withdraw earnings" subtitle="Payouts run every Friday" onBack={() => navigate('/professional/pr09')} />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.9px] text-brand-ink/70">Withdrawing today</div>
                  <div className="mt-0.5 text-2xl font-black text-brand-ink">{earnings.available}</div>
                </div>
                <Pill tone="ok" className="bg-white/80">
                  <Check className="size-3.5" /> All verified
                </Pill>
              </div>
              <div className="text-xs font-medium text-brand-ink/90">
                Nine sessions · every one family confirmed
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Payout account" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="flex flex-col gap-3 border-l-4 border-l-primary">
              <div className="flex items-center gap-3">
                <IconTile icon={Landmark} tone="mint" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">{professional.bank}</div>
                  <div className="text-xs font-medium text-muted-foreground">{professional.name} · verified March 1</div>
                </div>
                <Pill tone="ok">Default</Pill>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <button
                  onClick={() => notify({ title: 'Change account', body: 'Bank details verified within one business day', kind: 'info' })}
                  className="text-xs font-bold text-primary"
                >
                  Change account
                </button>
                <button
                  onClick={() => notify({ title: 'Add account', body: 'Add another verified bank for payouts', kind: 'info' })}
                  className="text-xs font-bold text-primary"
                >
                  Add another
                </button>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Payout history" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {payouts.map((p, i) => (
                <div key={p.date}>
                  {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                  <div className="flex items-center gap-3 px-2 py-1.5">
                    <IconTile icon={p.status === 'paid' ? Check : Clock} tone={p.status === 'paid' ? 'mint' : 'tonal'} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-foreground">{p.date}</div>
                      <div className="truncate text-xs font-medium text-muted-foreground">
                        {p.sessions} sessions ·{' '}
                        {p.status === 'paid' ? 'paid in full' : 'arrives by 6:00 PM today'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-foreground">{p.amount}</div>
                      <Pill tone={p.status === 'paid' ? 'ok' : 'warn'}>{p.status === 'paid' ? 'Paid' : 'In transit'}</Pill>
                    </div>
                  </div>
                </div>
              ))}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={ReceiptText}
              body="Every payout lists the sessions inside it, so your records always match what Ayvaa paid."
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of payouts" />
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
            notify({ title: 'Withdrawal sent', body: `${earnings.available} arrives within one business day · no fee`, kind: 'ok' })
            navigate('/professional/pr09')
          }}
        >
          <Landmark className="size-4" /> Withdraw {earnings.available} now
        </SmoothButton>
        <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Lock className="size-3.5" /> Arrives within one business day · no withdrawal fee.
        </div>
      </FootBar>
    </Screen>
  )
}
