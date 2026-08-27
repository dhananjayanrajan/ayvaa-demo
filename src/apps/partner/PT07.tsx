import { BarChart3, Check, ChevronRight, ClipboardCheck, Clock, Download, FileText, ReceiptText } from 'lucide-react'
import { motion } from 'motion/react'
import { useDemo } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, FootBar, Screen } from '@/components/phone/Screen'
import { Pill, SectionLabel } from '@/components/phone/Controls'
import { invoices, partner, usage } from '@/data/seed'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function PT07() {
  const { notify } = useDemo()
  const feb = invoices[0]
  const jan = invoices[1]
  const mar = invoices[2]

  return (
    <Screen>
      <AppBar
        title="Billing"
        subtitle={`${partner.name} · corporate plan`}
        trailing={
          <button
            onClick={() => notify({ title: 'Invoice download', body: `${feb.month} invoice · PDF ready`, kind: 'info' })}
            className="grid size-10.5 place-items-center rounded-full bg-tonal text-foreground/70"
            aria-label="Download"
          >
            <Download className="size-5" />
          </button>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <Card className="flex flex-col gap-3 rounded-[20px] border-0 bg-mint p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wide text-brand-ink/70">February invoice</div>
                  <div className="text-2xl font-black tracking-tight text-brand-ink">{feb.amount}</div>
                </div>
                <span className="grid size-16 shrink-0 place-items-center rounded-full bg-white text-primary">
                  <ReceiptText className="size-8" />
                </span>
              </div>
              <div className="text-xs font-medium text-brand-ink/80">
                {feb.sessions} sessions · corporate rate · paid {feb.paidOn}
              </div>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <SectionLabel>Usage this month · March so far</SectionLabel>
          </motion.div>
          <motion.div variants={item}>
            <Card className="rounded-[20px] p-2">
              {usage.map((u, i) => (
                <div key={u.label}>
                  {i > 0 && <div className="mx-3 h-px bg-border" />}
                  <div className="flex items-center justify-between gap-3 rounded-[14px] px-3 py-2.5">
                    <span className="text-sm font-medium text-foreground">{u.label}</span>
                    <span className="shrink-0 text-sm font-bold text-foreground">{u.value}</span>
                  </div>
                </div>
              ))}
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <SectionLabel>Invoice history</SectionLabel>
          </motion.div>
          <motion.div variants={item}>
            <Card className="rounded-[20px] p-2">
              {[feb, jan, mar].map((inv, i) => (
                <div key={inv.month}>
                  {i > 0 && <div className="mx-3 h-px bg-border" />}
                  <div className="flex items-center gap-3 rounded-[14px] p-2">
                    <span
                      className={
                        inv.status === 'paid'
                          ? 'grid size-11 shrink-0 place-items-center rounded-[14px] bg-mint text-brand-ink'
                          : 'grid size-11 shrink-0 place-items-center rounded-[14px] bg-tonal text-foreground/70'
                      }
                    >
                      {inv.status === 'paid' ? <Check className="size-5" /> : <Clock className="size-5" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-foreground">{inv.month} 2024</span>
                      <span className="block truncate text-xs font-medium text-muted-foreground">
                        {inv.status === 'paid' ? `${inv.sessions} sessions · paid ${inv.paidOn}` : 'Invoice ready April 1'}
                      </span>
                    </span>
                    {inv.status === 'paid' ? (
                      <span className="text-right">
                        <span className="block text-sm font-bold text-foreground">{inv.amount}</span>
                        <span className="block text-xs font-medium text-muted-foreground">paid</span>
                      </span>
                    ) : (
                      <Pill tone="grey">Open</Pill>
                    )}
                  </div>
                </div>
              ))}
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card className="flex items-start gap-3 rounded-[20px] border-0 bg-tonal p-4">
              <ClipboardCheck className="mt-0.5 size-5.5 shrink-0 text-primary" />
              <p className="text-[13px] font-medium leading-[19px] text-muted-foreground">
                Every line on your invoice maps to one verified, signed off session. You can open any session&apos;s
                record from the invoice itself.
              </p>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <button
              onClick={() => notify({ title: 'Usage report', body: 'Sessions per department · PDF and spreadsheet', kind: 'info' })}
              className="flex w-full items-center gap-3 rounded-[20px] border border-border bg-card p-4 text-left"
            >
              <FileText className="size-5.5 shrink-0 text-primary" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-foreground">Monthly usage report</span>
                <span className="block text-xs font-medium text-muted-foreground">Sessions per department · PDF and spreadsheet</span>
              </span>
              <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
            </button>
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <div className="flex gap-2.5">
          <Button
            variant="secondary"
            onClick={() => notify({ title: 'Invoice download', body: `${feb.month} invoice · PDF ready`, kind: 'info' })}
            className="h-13 flex-1 rounded-full text-[15px] font-bold"
          >
            <Download className="size-5" />
            February invoice
          </Button>
          <Button
            onClick={() => notify({ title: 'Usage report', body: 'Sessions per department · PDF and spreadsheet', kind: 'ok' })}
            className="h-13 flex-1 rounded-full bg-[#DCF3EC] text-[15px] font-bold text-brand-ink hover:bg-[#DCF3EC]/80"
          >
            <BarChart3 className="size-5" />
            Usage report
          </Button>
        </div>
      </FootBar>
    </Screen>
  )
}