import { motion } from 'motion/react'
import { ChevronRight, CreditCard } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { useRouter } from '@/lib/router'
import { MARCH, RECEIPTS } from '@/data/patientBilling'
import { BillingHero } from '@/components/patient/billing/BillingHero'
import { ReceiptList } from '@/components/patient/billing/ReceiptList'
import { LedgerCard } from '@/components/patient/billing/LedgerCard'
import { StatementButton } from '@/components/patient/billing/StatementButton'

export function P23() {
  const { navigate } = useRouter()

  return (
    <Screen>
      <AppBar
        title="Payments"
        subtitle={`${MARCH.label} · elderly care plan`}
        onBack={() => navigate('/patient/p21')}
      />
      <BodyArea>
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl"
          />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <BillingHero receipts={RECEIPTS} />
            </motion.div>

            <motion.div variants={rise}>
              <Section
                label="March receipts"
                trailing={<Chip intent="neutral">{RECEIPTS.length} entries</Chip>}
              />
            </motion.div>

            <motion.div variants={rise}>
              <ReceiptList receipts={RECEIPTS} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Billing ledger" />
            </motion.div>

            <motion.div variants={rise}>
              <LedgerCard receipts={RECEIPTS} />
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate('/patient/p24')}
                className="block w-full text-left"
              >
                <Card>
                  <div className="flex items-center gap-3.5 p-4">
                    <Tile icon={CreditCard} tone="success" size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">
                        Payment methods
                      </div>
                      <div className="mt-0.5 truncate text-[11px] font-medium text-[#0B211B]/55">
                        Cards, defaults and billing safety
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
                  </div>
                </Card>
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Every charge links to one signed-off visit" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <StatementButton receipts={RECEIPTS} variant="ghost" />
      </FootBar>
    </Screen>
  )
}
