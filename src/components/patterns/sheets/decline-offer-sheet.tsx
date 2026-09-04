import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Loader2, Send, X } from 'lucide-react'
import { Tile } from '@/components/base/phone/kit'
import { SheetShell } from '@/components/base/phone/sheet-shell'
import { cn } from '@/lib/utils'
import type { Offer } from '@/data/seed'

interface DeclineOfferSheetProps {
  offer: Offer | null
  onClose: () => void
  onAccept: (offer: Offer) => void
  onDecline: (offer: Offer) => void
}

export function DeclineOfferSheet({ offer, onClose, onAccept, onDecline }: DeclineOfferSheetProps) {
  const [declineLoading, setDeclineLoading] = useState(false)
  const [acceptLoading, setAcceptLoading] = useState(false)

  const handleDecline = () => {
    if (!offer || declineLoading || acceptLoading) return
    setDeclineLoading(true)
    setTimeout(() => {
      setDeclineLoading(false)
      onDecline(offer)
    }, 700)
  }

  const handleAccept = () => {
    if (!offer || declineLoading || acceptLoading) return
    setAcceptLoading(true)
    setTimeout(() => {
      setAcceptLoading(false)
      onAccept(offer)
    }, 700)
  }

  return (
    <AnimatePresence>
      {offer && (
        <motion.div
          className="absolute inset-0 z-50 flex flex-col justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <SheetShell onClose={onClose} height="scroll">
            <div className="flex items-start gap-3">
              <Tile icon={Check} tone="warning" size="lg" />
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Decline this offer?</div>
                <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                  {offer.title} · the slot is re-offered to other professionals immediately. No penalty on your priority.
                </div>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={onClose}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                aria-label="Keep offer"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>

            <motion.button
              type="button"
              whileTap={acceptLoading ? undefined : { scale: 0.97 }}
              onClick={handleAccept}
              disabled={acceptLoading || declineLoading}
              className={cn(
                'mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
                acceptLoading && 'opacity-80',
              )}
            >
              {acceptLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Send className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              )}
              {acceptLoading ? 'Accepting…' : 'Actually, accept it'}
            </motion.button>
            <motion.button
              type="button"
              whileTap={declineLoading ? undefined : { scale: 0.97 }}
              onClick={handleDecline}
              disabled={declineLoading || acceptLoading}
              className={cn(
                'mt-2 w-full rounded-2xl bg-rose-500/10 py-3.5 text-sm font-bold text-rose-600',
                declineLoading && 'opacity-70',
              )}
            >
              {declineLoading ? 'Declining…' : 'Yes, decline'}
            </motion.button>
          </SheetShell>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
