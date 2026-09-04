import { Fragment } from 'react'
import { motion } from 'motion/react'
import { Check, Send } from 'lucide-react'
import { Hero, Chip } from '@/components/base/phone/kit'
import { cn } from '@/lib/utils'

type StepState = 'done' | 'current' | 'todo'

export interface WizardStep {
  label: string
  state: StepState
  description: string
}

interface PartnerReferralWizardHeroProps {
  steps: WizardStep[]
  ready: number
  total: number
  onStepClick?: (step: WizardStep) => void
}

function HeroStep({
  label,
  state,
  onClick,
}: {
  label: string
  state: StepState
  onClick?: () => void
}) {
  const isClickable = Boolean(onClick)
  return (
    <motion.button
      type="button"
      whileTap={isClickable ? { scale: 0.95 } : undefined}
      onClick={onClick}
      className={cn(
        'flex min-w-0 flex-col items-center gap-1.5',
        isClickable ? 'cursor-pointer' : 'cursor-default',
      )}
    >
      {state === 'done' ? (
        <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400 text-[#0B231C]">
          <Check className="h-3 w-3" strokeWidth={4} aria-hidden />
        </span>
      ) : state === 'current' ? (
        <span className="relative grid h-5 w-5 place-items-center">
          <span aria-hidden className="absolute h-5 w-5 animate-ping rounded-full bg-emerald-300/50" />
          <span className="relative h-3.5 w-3.5 rounded-full bg-emerald-300 ring-4 ring-emerald-300/20" />
        </span>
      ) : (
        <span className="h-3.5 w-3.5 rounded-full bg-white/15" />
      )}
      <span
        className={cn(
          'text-[8px] font-extrabold uppercase tracking-[0.12em]',
          state === 'todo' ? 'text-emerald-100/30' : 'text-emerald-100/70',
        )}
      >
        {label}
      </span>
    </motion.button>
  )
}

export function PartnerReferralWizardHero({
  steps,
  ready,
  total,
  onStepClick,
}: PartnerReferralWizardHeroProps) {
  const percentage = Math.round((ready / total) * 100)
  return (
    <Hero>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
            <Send className="h-3 w-3" aria-hidden />
            Referral wizard
          </div>
          <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
            Four steps to{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">continuity of care</span>
          </h2>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Chip intent="live" light dot className="border-transparent">
            {ready}/{total}
          </Chip>
          <span className="text-[10px] font-bold text-emerald-100/40">{percentage}% complete</span>
        </div>
      </div>

      <div className="mt-5 flex items-start">
        {steps.map((s, i) => (
          <Fragment key={s.label}>
            {i > 0 && (
              <span
                aria-hidden
                className={cn('mt-2.5 h-px flex-1', s.state === 'todo' ? 'bg-white/15' : 'bg-emerald-300/50')}
              />
            )}
            <HeroStep
              label={s.label}
              state={s.state}
              onClick={onStepClick ? () => onStepClick(s) : undefined}
            />
          </Fragment>
        ))}
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      </div>
    </Hero>
  )
}
