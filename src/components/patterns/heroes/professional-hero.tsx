import { motion } from 'motion/react'
import { Check, Fingerprint, ScanLine, Stethoscope } from 'lucide-react'
import { Chip, Hero, Tile } from '@/components/base/phone/kit'

interface ProfessionalHeroProps {
  scanning: boolean
  onUnlock: () => void
}

export function ProfessionalHero({ scanning, onUnlock }: ProfessionalHeroProps) {
  return (
    <Hero>
      <div className="flex items-center gap-3.5">
        <Tile icon={Stethoscope} tone="white" size="lg" />
        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">Professional access</div>
          <h2 className="mt-1.5 text-[19px] font-extrabold leading-tight tracking-tight text-white">
            Good morning,{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">Arjun</span>
          </h2>
          <p className="mt-0.5 text-[11.5px] font-semibold text-emerald-100/55">RN · General care · licence verified</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center gap-3 rounded-2xl bg-white/[0.05] px-4 py-6">
        <motion.button
          type="button"
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={onUnlock}
          aria-label="Unlock with fingerprint"
          className="relative grid h-24 w-24 place-items-center rounded-full bg-white/[0.08] text-emerald-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50"
        >
          {!scanning && (
            <>
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-emerald-400/15"
                animate={{ scale: [1, 1.45], opacity: [0.5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-emerald-400/10"
                animate={{ scale: [1, 1.45], opacity: [0.4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.7 }}
              />
            </>
          )}
          {scanning ? (
            <ScanLine className="h-9 w-9 animate-pulse text-emerald-300" aria-hidden />
          ) : (
            <Fingerprint className="h-9 w-9" strokeWidth={1.8} aria-hidden />
          )}
        </motion.button>
        <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-emerald-100/60">
          {scanning ? 'Matching fingerprint…' : 'Tap to unlock instantly'}
        </span>
        {scanning && (
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: '80%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="h-1 overflow-hidden rounded-full bg-white/10"
          >
            <span className="block h-full w-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" />
          </motion.span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <Chip intent="neutral" light className="border-transparent">Encrypted session</Chip>
        <Chip intent="success" light className="border-transparent">Every sign-in logged</Chip>
        <Chip intent="success" light icon={Check} className="border-transparent">Licence verified</Chip>
      </div>
    </Hero>
  )
}
