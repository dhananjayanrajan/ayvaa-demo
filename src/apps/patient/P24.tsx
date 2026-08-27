import { useState } from 'react'
import { motion } from 'motion/react'
import { Check, CreditCard, Lock, Plus, ShieldCheck, Star, Trash2 } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Field, Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { paymentCards, type PaymentCard } from '@/data/patientBilling'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P24() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [cards, setCards] = useState<PaymentCard[]>(paymentCards)
  const [removed, setRemoved] = useState<string | null>(null)

  const makeDefault = (id: string) => {
    setCards((prev) => prev.map((c) => ({ ...c, default: c.id === id })))
    notify({ title: 'Default updated', body: 'New charges will use this card', kind: 'ok' })
  }

  const removeCard = (id: string) => {
    const c = cards.find((x) => x.id === id)
    setRemoved(id)
    notify({ title: 'Card removed', body: `${c?.brand ?? 'Card'} ending ${c?.last4 ?? ''} · past receipts unaffected`, kind: 'warn' })
  }

  return (
    <Screen>
      <AppBar title="Payment methods" subtitle="Charged only after completed visits" onBack={() => navigate('/patient/p23')} />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <SectionHeader label="Your cards" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {cards
                .filter((c) => c.id !== removed)
                .map((c, i) => (
                  <div key={c.id}>
                    {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                    <div className="flex items-center gap-3 px-2 py-1.5">
                      <IconTile icon={CreditCard} tone={c.default ? 'mint' : 'tonal'} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-bold text-foreground">
                          {c.brand} ending {c.last4}
                        </div>
                        <div className="truncate text-xs font-medium text-muted-foreground">
                          Expires {c.expires} · {c.holder}
                        </div>
                      </div>
                      {c.default ? (
                        <Pill tone="ok">
                          <Star className="size-3.5 fill-current" /> Default
                        </Pill>
                      ) : (
                        <button
                          onClick={() => makeDefault(c.id)}
                          className="text-xs font-bold text-primary"
                        >
                          Set default
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Add a new card" />
          </motion.div>
          <motion.div variants={item} className="flex flex-col gap-2">
            <Field icon={CreditCard} hint="Card number" />
            <div className="flex gap-2">
              <div className="flex-1">
                <Field hint="MM / YY" />
              </div>
              <div className="flex-1">
                <Field hint="CVV" />
              </div>
            </div>
            <Field icon={ShieldCheck} hint="Name on card" />
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={Lock}
              body="Card details are encrypted and never shown to caregivers or partners. Removing a card does not affect past receipts."
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of payment methods" />
          </motion.div>
        </motion.div>
      </BodyArea>
      <FootBar>
        <SmoothButton
          variant="default"
          shape="pill"
          size="lg"
          className="w-full"
          onClick={() => notify({ title: 'Card saved', body: 'Encrypted and verified with your bank', kind: 'ok' })}
        >
          <Plus className="size-4" /> Save new card
        </SmoothButton>
        <SmoothButton
          variant="outline"
          shape="pill"
          size="lg"
          className="w-full text-destructive"
          onClick={() => removeCard(cards.find((c) => !c.default)?.id ?? '')}
        >
          <Trash2 className="size-4" /> Remove non-default card
        </SmoothButton>
      </FootBar>
    </Screen>
  )
}
