import { motion } from 'motion/react'
import { BadgeCheck, Check, ScrollText, X } from 'lucide-react'
import { Chip, Tile } from '@/components/phone/kit'

const credentials = [
  { k: 'RN licence', v: 'KNC-RN-88214 · Karnataka Nursing Council', fresh: true },
  { k: 'Licence expiry', v: 'March 2027 · auto-reminder at 90 days', fresh: true },
  { k: 'Background check', v: 'Cleared · January 2026', fresh: true },
  { k: 'First aid & BLS', v: 'Renewed · December 2025', fresh: true },
  { k: 'Last audit', v: 'February 2026 · zero findings', fresh: true },
]

interface CredentialsSheetProps {
  onClose: () => void
}

export function CredentialsSheet({ onClose }: CredentialsSheetProps) {
  return (
    <motion.div
      key="credentials-sheet"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
      className="absolute inset-x-0 bottom-0 z-50 flex max-h-[86%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
    >
      <div className="shrink-0 px-5 pt-4">
        <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
        <div className="flex items-start gap-3">
          <Tile icon={ScrollText} tone="success" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Your credentials</div>
            <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">
              What families see as verified facts on your profile
            </div>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
            aria-label="Close sheet"
          >
            <X className="h-4 w-4" aria-hidden />
          </motion.button>
        </div>

        <div className="rounded-2xl bg-[#0B231C] p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.12] text-emerald-100">
              <BadgeCheck className="h-5 w-5" strokeWidth={2.2} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13.5px] font-extrabold text-white">All checks cleared</div>
              <div className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">
                Audited February 2026
              </div>
            </div>
            <Check className="h-5 w-5 shrink-0 text-emerald-300" strokeWidth={3} aria-hidden />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          {credentials.map((c) => (
            <div key={c.k} className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.035] px-4 py-3.5">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
                <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">{c.k}</span>
                <span className="mt-0.5 block truncate text-[12.5px] font-bold text-[#0B211B]">{c.v}</span>
              </span>
              {c.fresh && <Chip intent="success" className="border-transparent">Valid</Chip>}
            </div>
          ))}
        </div>

        <p className="text-left text-[10.5px] font-semibold text-[#0B211B]/45">
          Documents stay sealed with Ayvaa · families only ever see the verified facts.
        </p>
      </div>
    </motion.div>
  )
}
