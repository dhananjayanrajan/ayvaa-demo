import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AppBar } from '@/components/base/phone/app-bar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/base/phone/screen'
import { Chip, Section, rise, stagger } from '@/components/base/phone/kit'
import { BillingHero } from '@/components/patterns/heroes/partner-billing-hero'
import { UsageLedgerCard } from '@/components/patterns/cards/usage-ledger-card'
import { StatementCarousel } from '@/components/patterns/cards/statement-carousel'
import { BillingInvoiceSheet } from '@/components/patterns/sheets/billing-invoice-sheet'
import { BillingUsageReportSheet } from '@/components/patterns/sheets/billing-usage-report-sheet'
import { BillingFooter } from '@/components/patterns/cards/billing-footer'
import { invoices, partner, usage } from '@/data/seed'
import { useDemo } from '@/lib/store'
import type { Invoice } from '@/data/partnerBillingTypes'

type SheetState = { kind: 'invoice'; inv: Invoice } | { kind: 'report' } | null

export function PT07() {
  const { notify } = useDemo()
  const latest = invoices.find((i) => i.status === 'paid') ?? invoices[0]
  const [sheet, setSheet] = useState<SheetState>(null)

  const close = () => setSheet(null)

  const openInvoice = (inv: Invoice) => setSheet({ kind: 'invoice', inv })

  return (
    <Screen>
      <AppBar title="Billing" subtitle={partner.name} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <BillingHero latest={latest} invoices={invoices} onSelectInvoice={openInvoice} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Itemized ledger" trailing={<Chip intent="neutral" className="border-transparent">{usage.length} lines</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <UsageLedgerCard usage={usage} total={latest.amount} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="All statements" trailing={<Chip intent="neutral" className="border-transparent">Tap to inspect</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <StatementCarousel invoices={invoices} onSelect={openInvoice} />
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of billing" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <BillingFooter
          latest={latest}
          onDownloadInvoice={() => openInvoice(latest)}
          onUsageReport={() => setSheet({ kind: 'report' })}
        />
      </FootBar>

      <AnimatePresence>
        {sheet && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet?.kind === 'invoice' && (
          <BillingInvoiceSheet
            invoice={sheet.inv}
            usage={usage}
            onClose={close}
            onDownload={() => {
              close()
              notify({ title: 'Download ready', body: `${sheet.inv.month} invoice PDF saved`, kind: 'ok' })
            }}
          />
        )}
        {sheet?.kind === 'report' && (
          <BillingUsageReportSheet
            usage={usage}
            onClose={close}
            onEmailReport={() => {
              close()
              notify({ title: 'Report queued', body: `Usage report will be emailed to ${partner.name}`, kind: 'info' })
            }}
          />
        )}
      </AnimatePresence>
    </Screen>
  )
}
