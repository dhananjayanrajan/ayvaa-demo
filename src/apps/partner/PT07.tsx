import { motion } from 'motion/react'
import { ClipboardCheck, Download, ReceiptText } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import PriceFlow from '@/components/smoothui/price-flow'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, FootBar, Screen } from '@/components/phone/Screen'
import { ActionRow, InfoCard, ScreenCard, SectionHeader, StatRow } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { invoices, usage } from '@/data/seed'
import { useDemo } from '@/lib/store'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function PT07() {
  const { notify } = useDemo()
  const feb = invoices[0]
  return (
    <Screen>
      <AppBar title="Billing" subtitle="Sunrise Multispeciality Hospital" />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="mint">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-bold uppercase tracking-wide text-brand-ink/70">February invoice</div>
                <Pill tone="ok" className="bg-white/70">Paid Mar 5</Pill>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="grid size-10 place-items-center rounded-[14px] bg-white/70">
                  <ReceiptText className="size-5 text-brand-ink" />
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-brand-ink">₹</span>
                  <PriceFlow value={218400} className="text-3xl font-bold text-brand-ink" />
                </div>
              </div>
              <div className="mt-1 text-[13px] font-medium text-brand-ink/80">{feb.sessions} sessions · settled in full</div>
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Usage" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {usage.map((u) => (
                <div key={u.label} className="px-2 py-1.5">
                  <StatRow icon={ReceiptText} label={u.label} value={u.value} />
                </div>
              ))}
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <SectionHeader label="Invoice history" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {invoices.map((inv, i) => (
                <div key={inv.month}>
                  {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                  <div className="flex items-center gap-3 px-2 py-1.5">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-foreground">{inv.month} · {inv.sessions} sessions</div>
                      <div className="text-xs font-medium text-muted-foreground">
                        {inv.status === 'paid' ? `Paid ${inv.paidOn ?? ''}` : 'Projected · based on current usage'}
                      </div>
                    </div>
                    <span className="text-sm font-bold text-foreground">{inv.amount}</span>
                    <Pill tone={inv.status === 'paid' ? 'ok' : 'grey'}>{inv.status === 'paid' ? 'Paid' : 'Projected'}</Pill>
                  </div>
                </div>
              ))}
            </ScreenCard>
          </motion.div>
          <motion.div variants={item}>
            <InfoCard icon={ClipboardCheck} body="Invoices are generated from verified sessions only. Every session on the bill has a signed visit record." />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              <ActionRow
                icon={ReceiptText}
                title="Monthly usage report"
                subtitle="Sessions · categories · caregiver hours"
                onClick={() => notify({ title: 'Report queued', body: 'Usage report will be emailed to Sunrise', kind: 'info' })}
              />
            </ScreenCard>
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton variant="outline" shape="pill" size="lg" className="flex-1" onClick={() => notify({ title: 'Invoice opened', body: 'February invoice PDF ready to download', kind: 'info' })}>
          <Download className="size-4" /> February invoice
        </SmoothButton>
        <SmoothButton variant="soft" shape="pill" size="lg" className="flex-1" onClick={() => notify({ title: 'Report queued', body: 'Usage report will be emailed to Sunrise', kind: 'info' })}>
          <ReceiptText className="size-4" /> Usage report
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}