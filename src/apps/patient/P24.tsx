import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  BadgeCheck,
  Check,
  ChevronRight,
  CreditCard,
  Landmark,
  Lock,
  Plus,
  ShieldCheck,
  Star,
  Trash2,
  X,
} from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Meter, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { paymentCards, type PaymentCard } from '@/data/patientBilling'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'


export function P24() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [cards, setCards] = useState<PaymentCard[]>(paymentCards)
  const [sheet, setSheet] = useState(false)
  const [confirmRemove, setConfirmRemove] = useState<PaymentCard | null>(null)

  const makeDefault = (id: string) => {
    setCards((prev) => prev.map((c) => ({ ...c, default: c.id === id })))
    notify({ title: 'Default updated', body: 'New charges will use this card', kind: 'ok' })
  }

  const doRemove = () => {
    if (!confirmRemove) return
    setCards((prev) => prev.filter((c) => c.id !== confirmRemove.id))
    notify({
      title: 'Card removed',
      body: `${confirmRemove.brand} ending ${confirmRemove.last4} · past receipts unaffected`,
      kind: 'warn',
    })
    setConfirmRemove(null)
  }

  const defaultCard = cards.find((c) => c.default) ?? cards[0]

  return (
    <Screen>
      <AppBar title="Payment methods" subtitle="Charged only after completed visits" onBack={() => navigate('/patient/p23')} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <Kicker>
                  <Lock className="h-3 w-3 text-emerald-300/80" aria-hidden />
                  Default card · charged per visit
                </Kicker>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  {defaultCard ? `${defaultCard.brand} ••${defaultCard.last4}` : 'No card set'}
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  {defaultCard ? `${defaultCard.holder} · expires ${defaultCard.expires}` : 'Add a card to keep care running'}
                </p>

                <div className="mt-4 rounded-2xl bg-emerald-400/[0.1] p-3.5">
                  <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em]">
                    <span className="text-emerald-100/50">Billing safety</span>
                    <span className="tabular-nums text-emerald-200">100%</span>
                  </div>
                  <Meter value={1} intent="success" delay={0.2} className="mt-2" />
                  <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-200/70">
                    <ShieldCheck className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                    Encrypted · never shown to caregivers
                  </div>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Your cards" trailing={<Chip intent="neutral">{cards.length} saved</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {cards.map((c, i) => (
                  <div key={c.id}>
                    {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.99 }}
                      onClick={() => makeDefault(c.id)}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                    >
                      <span
                        className={cn(
                          'grid h-10 w-10 shrink-0 place-items-center rounded-2xl',
                          c.default
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_8px_18px_-8px_rgba(16,185,129,0.7)]'
                            : 'bg-[#0B211B]/[0.05] text-[#0B211B]/50',
                        )}
                      >
                        <CreditCard className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="truncate text-[13px] font-bold tracking-tight text-[#0B211B]">
                            {c.brand} ••{c.last4}
                          </span>
                          {c.default && <Chip intent="success" icon={Star}>Default</Chip>}
                        </span>
                        <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">
                          Expires {c.expires} · {c.holder}
                        </span>
                      </span>
                      {!c.default && (
                        <span className="shrink-0 text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-emerald-700">
                          Set default
                        </span>
                      )}
                    </motion.button>
                  </div>
                ))}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Add a card" trailing={<Chip intent="info">Encrypted</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
                    <Plus className="h-3 w-3" aria-hidden />
                    New card · draft
                  </div>

                  <div className="mt-4 flex flex-col gap-2.5">
                    <div className="flex h-11 items-center gap-2.5 rounded-2xl bg-white/[0.08] px-3.5 transition-colors focus-within:bg-white/[0.12]">
                      <CreditCard className="h-4 w-4 shrink-0 text-emerald-100/50" strokeWidth={2.4} aria-hidden />
                      <span className="min-w-0 flex-1 truncate font-mono text-[13px] font-bold tracking-wider text-white">
                        4242 •••• •••• 8842
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="flex h-11 items-center gap-2.5 rounded-2xl bg-white/[0.08] px-3.5">
                        <span className="min-w-0 flex-1 truncate font-mono text-[13px] font-bold text-white">09 / 28</span>
                      </div>
                      <div className="flex h-11 items-center gap-2.5 rounded-2xl bg-white/[0.08] px-3.5">
                        <span className="min-w-0 flex-1 truncate font-mono text-[13px] font-bold text-white">•••</span>
                      </div>
                    </div>
                    <div className="flex h-11 items-center gap-2.5 rounded-2xl bg-white/[0.08] px-3.5">
                      <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-100/50" strokeWidth={2.4} aria-hidden />
                      <span className="min-w-0 flex-1 truncate text-[13px] font-bold text-white">Priya Sharma</span>
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSheet(true)}
                    className="mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-[13px] font-bold text-white shadow-[0_12px_28px_-12px_rgba(16,185,129,0.8)]"
                  >
                    <Lock className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                    <span className="truncate">Save card</span>
                  </motion.button>
                  <p className="mt-2.5 text-center text-[10.5px] font-semibold leading-relaxed text-emerald-100/40">
                    Verified with your bank · details never shown to caregivers or partners.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Card safety" trailing={<Chip intent="danger">{cards.length - 1 > 0 ? `${cards.length - 1} removable` : '1 card'}</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {cards
                  .filter((c) => !c.default)
                  .map((c, i) => (
                    <div key={c.id}>
                      {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setConfirmRemove(c)}
                        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                      >
                        <Tile icon={Trash2} tone="danger" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">
                            Remove {c.brand} ••{c.last4}
                          </span>
                          <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/50">
                            Past receipts stay unaffected
                          </span>
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/20" aria-hidden />
                      </motion.button>
                    </div>
                  ))}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={BadgeCheck} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Card changes never delay or interrupt an in-flight visit charge.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of payment methods" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => setSheet(true)}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
        >
          <Plus className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate">Save card</span>
        </motion.button>
      </FootBar>

      <AnimatePresence>
        {(sheet || confirmRemove) && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSheet(false)
              setConfirmRemove(null)
            }}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet && !confirmRemove && (
          <motion.div
            key="save"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex max-h-[88%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-700">
                  <Landmark className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Save this card</div>
                  <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">HDFC ••8842 · Priya Sharma</div>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSheet(false)}
                  aria-label="Close sheet"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                >
                  <X className="h-4 w-4" aria-hidden />
                </motion.button>
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-[#0B231C] p-4">
                <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
                <div className="relative">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Bank verification</div>
                  <div className="mt-3 flex flex-col gap-2.5">
                    {[
                      ['Card', 'HDFC ••8842'],
                      ['Holder', 'Priya Sharma'],
                      ['Expires', '09 / 28'],
                      ['Verification', 'Instant · bank-side'],
                      ['Visible to', 'Only you'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-3">
                        <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-100/45">{k}</span>
                        <span className="truncate font-mono text-[12px] font-bold text-emerald-50/90">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSheet(false)
                    notify({ title: 'Card saved', body: 'Encrypted and verified with your bank', kind: 'ok' })
                  }}
                  className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                >
                  <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                  <span className="truncate">Confirm save</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmRemove && (
          <motion.div
            key="remove"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex max-h-[88%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>
            <div className="flex flex-col gap-3.5 px-5 pb-7 pt-3">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-rose-500/10 text-rose-600">
                  <Trash2 className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                    Remove {confirmRemove.brand} ••{confirmRemove.last4}?
                  </div>
                  <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">This cannot be undone</div>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setConfirmRemove(null)}
                  aria-label="Close sheet"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                >
                  <X className="h-4 w-4" aria-hidden />
                </motion.button>
              </div>

              <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
                <div className="flex flex-col gap-2.5">
                  {[
                    ['Past receipts', 'Stay exactly as they are'],
                    ['In-flight charges', 'Not interrupted'],
                    ['Re-adding', 'Anytime · re-verified'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline">
                      <span className="shrink-0 text-[11.5px] font-semibold text-[#0B211B]/55">{k}</span>
                      <span aria-hidden className="mx-2.5 min-w-0 flex-1 -translate-y-1 border-b border-dotted border-[#0B211B]/20" />
                      <span className="shrink-0 font-mono text-[12px] font-bold text-[#0B211B]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2.5">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setConfirmRemove(null)}
                  className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
                >
                  <span className="truncate">Keep card</span>
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={doRemove}
                  className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(244,63,94,0.75)]"
                >
                  <Trash2 className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  <span className="truncate">Remove</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
