import { useState } from 'react'
import { motion } from 'motion/react'
import { CheckCircle2, X } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Chip, Section, rise, stagger } from '@/components/phone/kit'
import { OffersHero } from '@/components/professional/offers/OffersHero'
import { OfferCard } from '@/components/professional/offers/OfferCard'
import { EmptyState } from '@/components/phone/EmptyState'
import { AcceptedOffersCard } from '@/components/professional/offers/AcceptedOffersCard'
import { DeclinedOffersCard } from '@/components/professional/offers/DeclinedOffersCard'
import { DeclineOfferSheet } from '@/components/professional/offers/DeclineOfferSheet'
import { offers, type Offer } from '@/data/seed'
import { useDemo } from '@/lib/store'

export function PR03() {
  const { notify, dispatch } = useDemo()
  const [list, setList] = useState<Offer[]>(offers)
  const [accepting, setAccepting] = useState(true)
  const [confirming, setConfirming] = useState<Offer | null>(null)

  const active = list.filter((o) => o.status === 'active')
  const accepted = list.filter((o) => o.status === 'accepted')
  const declined = list.filter((o) => o.status === 'declined')

  const topTint = accepting ? 'bg-emerald-400/[0.16]' : 'bg-amber-400/[0.16]'

  const decide = (o: Offer, accept: boolean) => {
    setList((prev) => prev.map((x) => (x.id === o.id ? { ...x, status: accept ? 'accepted' : 'declined' } : x)))
    setConfirming(null)
    if (accept) {
      notify({ title: 'Offer accepted', body: `${o.title} · availability re-checked · session confirmed`, kind: 'ok' })
    } else {
      notify({ title: 'Offer declined', body: `${o.title} · no penalty · slot re-offered`, kind: 'warn' })
    }
  }

  const undoDecline = (o: Offer) => {
    setList((prev) => prev.map((x) => (x.id === o.id ? { ...x, status: 'active' } : x)))
    notify({ title: 'Offer restored', body: `${o.title} is back in your active offers`, kind: 'info' })
  }

  return (
    <Screen>
      <AppBar title="New care offers" subtitle={`Round ${dispatch.round} · expires ${dispatch.expiresAt}`} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className={`pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full blur-3xl ${topTint}`} />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <OffersHero
                activeCount={accepting ? active.length : 0}
                accepting={accepting}
                round={dispatch.round}
                expiresAt={dispatch.expiresAt}
                onToggleAccepting={() => {
                  setAccepting((v) => !v)
                  notify({
                    title: accepting ? 'Offers paused' : 'Accepting again',
                    body: accepting ? 'You will not receive new dispatches' : 'Realtime dispatches resumed',
                    kind: 'info',
                  })
                }}
              />
            </motion.div>

            {accepting ? (
              active.length > 0 ? (
                active.map((o) => (
                  <motion.div key={o.id} variants={rise}>
                    <OfferCard offer={o} onAccept={(offer) => decide(offer, true)} onDecline={(offer) => setConfirming(offer)} />
                  </motion.div>
                ))
              ) : (
                <motion.div variants={rise}>
                  <EmptyState
                    container="card"
                    spacing="gap"
                    padding="lg"
                    icon={CheckCircle2}
                    tone="emerald"
                    badge="round"
                    size="lg"
                    title="No open offers right now"
                    titleClassName="text-[14px] font-extrabold tracking-tight text-[#0B211B]/70"
                    body="You will be the first to know when one matches your windows"
                    bodyClassName="text-xs leading-relaxed text-[#0B211B]/45"
                  />
                </motion.div>
              )
            ) : (
              <motion.div variants={rise}>
                <div className="flex flex-col items-center gap-3 rounded-3xl border border-amber-200/60 bg-amber-50 px-6 py-10 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/[0.1] text-amber-600">
                    <X className="h-6 w-6" strokeWidth={2.2} aria-hidden />
                  </span>
                  <p className="text-[14px] font-extrabold tracking-tight text-[#0B211B]/70">Offers are paused</p>
                  <p className="text-xs font-medium leading-relaxed text-[#0B211B]/45">
                    Resume accepting to see new care offers
                  </p>
                </div>
              </motion.div>
            )}

            {accepted.length > 0 && (
              <>
                <motion.div variants={rise}>
                  <Section label="Accepted" trailing={<Chip intent="success" className="border-transparent">{accepted.length} confirmed</Chip>} />
                </motion.div>
                <motion.div variants={rise}>
                  <AcceptedOffersCard accepted={accepted} />
                </motion.div>
              </>
            )}

            {declined.length > 0 && (
              <>
                <motion.div variants={rise}>
                  <Section label="Declined · yesterday" trailing={<Chip intent="neutral" className="border-transparent">No penalty</Chip>} />
                </motion.div>

                <motion.div variants={rise}>
                  <DeclinedOffersCard declined={declined} onUndoDecline={undoDecline} />
                </motion.div>
              </>
            )}

            <motion.div variants={rise}>
              <EndOfScroll label="End of offers" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <DeclineOfferSheet
        offer={confirming}
        onClose={() => setConfirming(null)}
        onAccept={(offer) => decide(offer, true)}
        onDecline={(offer) => decide(offer, false)}
      />
    </Screen>
  )
}
