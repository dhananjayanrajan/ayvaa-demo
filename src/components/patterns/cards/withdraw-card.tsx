import { motion } from 'motion/react'
import { ChevronRight, Gavel, PhoneCall, ShieldCheck } from 'lucide-react'
import { AccentHero } from '@/components/base/phone/accent-hero'
import { StatusPill } from '@/components/base/phone/status-pill'
import { CONSENT } from '@/data/patientConsent'
import { useDemo } from '@/lib/store'

interface WithdrawCardProps {
  requested: boolean
  onOpen: () => void
  onCancel: () => void
}

export function WithdrawCard({ requested, onOpen, onCancel }: WithdrawCardProps) {
  const { notify } = useDemo()

  if (requested) {
    return (
      <AccentHero tone="rose">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/50">
            <Gavel className="h-3 w-3" aria-hidden />
            Withdrawal request
          </span>
          <StatusPill tone="rose" label="Awaiting call" live />
        </div>

        <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          Request received,{' '}
          <span className="bg-gradient-to-r from-rose-300 to-red-200 bg-clip-text text-transparent">not yet final</span>
        </h2>
        <p className="mt-1 text-[11.5px] font-semibold leading-snug text-white/55">
          The supervisor call is the final seal. You can still cancel until then.
        </p>

        <button
          type="button"
          onClick={() => {
            onCancel()
            notify({
              title: 'Withdrawal cancelled',
              body: `Consent for ${CONSENT.patientFirst} stays fully active`,
              kind: 'ok',
            })
          }}
          className="mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white/[0.08] py-3.5 text-[13px] font-bold text-white transition-colors duration-200 hover:bg-white/[0.14]"
        >
          <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate">Keep consent, cancel request</span>
        </button>
      </AccentHero>
    )
  }

  return (
    <motion.button type="button" whileTap={{ scale: 0.99 }} onClick={onOpen} className="block w-full text-left">
      <AccentHero tone="rose">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/50">
            <Gavel className="h-3 w-3" aria-hidden />
            End consent
          </span>
          <StatusPill tone="rose" label="Irreversible path" />
        </div>

        <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          Withdraw all consent for{' '}
          <span className="bg-gradient-to-r from-rose-300 to-red-200 bg-clip-text text-transparent">
            {CONSENT.patientFirst}
          </span>
        </h2>
        <p className="mt-1 text-[11.5px] font-semibold leading-snug text-white/55">
          Stops all care immediately. Nothing is deleted, and the record stays yours.
        </p>

        <div className="mt-4 rounded-2xl bg-rose-400/[0.14] p-4 text-left">
          <div className="flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-400/[0.2] text-rose-200">
                <PhoneCall className="h-4 w-4" strokeWidth={2.4} aria-hidden />
              </span>
              <span className="text-[12px] font-extrabold tracking-tight text-rose-50">
                Supervisor call confirms first
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-rose-200/70" aria-hidden />
          </div>
          <p className="mt-2 break-words text-[10.5px] font-semibold leading-snug text-rose-100/60">
            Nothing seals from this screen. You confirm verbally on the call, and you can cancel the request any time
            before it.
          </p>
        </div>
      </AccentHero>
    </motion.button>
  )
}
