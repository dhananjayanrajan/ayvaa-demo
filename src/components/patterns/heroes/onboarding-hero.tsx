import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BadgeCheck, ChevronDown, Fingerprint, IdCard, ShieldCheck } from 'lucide-react'
import { Chip, Hero, Kicker } from '@/components/base/phone/kit'
import { cn } from '@/lib/utils'

interface OnboardingHeroProps {
  name: string
  role: string
  licence: string
  initials: string
}

const identityFacts = [
  { icon: ShieldCheck, label: 'Licence verified', detail: 'Karnataka Nursing Council confirmed active status.' },
  { icon: IdCard, label: 'ID matched', detail: 'Government ID and selfie matched at 99.2% confidence.' },
  { icon: Fingerprint, label: 'Biometric ready', detail: 'Fingerprint unlock enabled for instant sign-in.' },
]

export function OnboardingHero({ name, role, licence, initials }: OnboardingHeroProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Hero>
      <div className="flex items-start gap-3.5">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[20px] bg-gradient-to-br from-emerald-400/30 to-teal-400/20 text-[15px] font-black tracking-tight text-emerald-100">
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <Kicker>Onboarding · final step</Kicker>
          <h2 className="mt-1.5 text-[19px] font-extrabold leading-tight tracking-tight text-white">
            {name}
          </h2>
          <p className="mt-0.5 text-[12px] font-semibold leading-snug text-emerald-100/55">
            {role} · licence {licence}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50 rounded-full"
        >
          <Chip intent="success" light icon={BadgeCheck} className="border-transparent">
            Verified
          </Chip>
        </button>
      </div>

      <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-white/[0.06] px-3.5 py-3">
        <Fingerprint className="h-5 w-5 shrink-0 text-emerald-300" strokeWidth={2} aria-hidden />
        <p className="min-w-0 flex-1 text-[11px] font-bold leading-snug text-emerald-50/80">
          Your identity is the credential. Families see verified facts — never documents.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-4 flex w-full items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50 transition-colors hover:bg-white/[0.07]"
      >
        <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-emerald-200/70">
          Identity breakdown
        </span>
        <ChevronDown
          className={cn('h-4 w-4 text-emerald-200/50 transition-transform', expanded && 'rotate-180')}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="mt-3 flex flex-col gap-2">
              {identityFacts.map((fact) => (
                <div key={fact.label} className="flex items-start gap-2.5 rounded-xl bg-white/[0.05] px-3.5 py-2.5">
                  <fact.icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-extrabold text-emerald-50">{fact.label}</div>
                    <div className="mt-0.5 text-[10.5px] font-medium leading-snug text-emerald-100/60">{fact.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Hero>
  )
}
