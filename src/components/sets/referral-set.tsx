import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { Check, Copy, Info, Phone, Send, ShieldCheck, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, Chip, Hero, Section } from '@/components/base/phone/kit'
import AnimatedFileUpload from '@/components/base/smoothui/animated-file-upload'
import { Fragment } from 'react'

interface PartnerAdmissionTagProps {
  patient: {
    name: string
    age: number
    condition: string
    referredBy: string
    careArea: string
    guardian: string
    guardianPhone: string
    refCode: string
  }
  onCopyRef?: (code: string) => void
  onViewDetails?: () => void
}

const barcode = [3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2, 2, 1, 1, 3, 1, 2, 1, 3, 2, 1, 1]

export function PartnerAdmissionTag({ patient, onCopyRef, onViewDetails }: PartnerAdmissionTagProps) {
  return (
    <div className="relative overflow-hidden rounded-[26px] bg-[#0B231C] shadow-[0_24px_56px_-26px_rgba(6,40,30,0.75)]">
      <div aria-hidden className="pointer-events-none absolute -left-10 -top-12 h-36 w-36 rounded-full bg-teal-400/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-10 -bottom-12 h-36 w-36 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Admission tag · draft</div>
            <div className="mt-1.5 truncate text-[18px] font-extrabold tracking-tight text-white">{patient.name}</div>
          </div>
          <div className="flex items-center gap-1">
            {onViewDetails && (
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={onViewDetails}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.08] text-emerald-200/70"
                aria-label="View patient details"
              >
                <Info className="h-4 w-4" aria-hidden />
              </motion.button>
            )}
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.08] text-[16px] font-extrabold text-emerald-200 ring-1 ring-inset ring-white/10">
              {patient.age}
            </span>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
          <div className="min-w-0">
            <div className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/35">Condition</div>
            <div className="truncate text-[12px] font-bold text-emerald-50/85">{patient.condition}</div>
          </div>
          <div className="min-w-0">
            <div className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/35">Referred by</div>
            <div className="truncate text-[12px] font-bold text-emerald-50/85">{patient.referredBy}</div>
          </div>
          <div className="min-w-0">
            <div className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/35">Care area</div>
            <div className="truncate text-[12px] font-bold text-emerald-50/85">{patient.careArea}</div>
          </div>
          <div className="min-w-0">
            <div className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/35">Guardian</div>
            <div className="truncate text-[12px] font-bold text-emerald-50/85">{patient.guardian}</div>
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between gap-3 rounded-2xl bg-white/[0.04] p-3">
          <div className="flex h-6 items-end gap-[2.5px]" aria-hidden>
            {barcode.map((w, i) => (
              <span key={i} className="h-6 bg-emerald-200/50" style={{ width: w }} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="shrink-0 font-mono text-[10px] font-bold tracking-[0.14em] text-emerald-100/40">
              {patient.refCode}
            </span>
            {onCopyRef && (
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => onCopyRef(patient.refCode)}
                className="grid h-6 w-6 place-items-center rounded-full bg-white/[0.08] text-emerald-200/60"
                aria-label="Copy referral code"
              >
                <Copy className="h-3 w-3" aria-hidden />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface Category {
  label: string
  icon: LucideIcon
  description: string
}

interface PartnerCareCategoryGridProps {
  categories: Category[]
  selected: string
  onSelect: (label: string) => void
  onInfo?: (category: Category) => void
}

export function PartnerCareCategoryGrid({
  categories,
  selected,
  onSelect,
  onInfo,
}: PartnerCareCategoryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {categories.map((c) => {
        const active = selected === c.label
        return (
          <div
            key={c.label}
            className={cn(
              'relative flex items-center gap-2.5 rounded-2xl p-3.5 text-left transition-colors',
              active ? 'bg-emerald-500/[0.12]' : 'bg-white hover:bg-[#0B211B]/[0.03]',
            )}
          >
            {active && (
              <motion.span
                layoutId="care-category-active"
                className="absolute inset-0 rounded-2xl ring-2 ring-emerald-500/60 shadow-[0_10px_24px_-14px_rgba(16,185,129,0.8)]"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <button
              type="button"
              onClick={() => onSelect(c.label)}
              className="relative flex min-w-0 flex-1 items-center gap-2.5 text-left"
            >
              <span
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl',
                  active
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_6px_14px_-6px_rgba(16,185,129,0.8)]'
                    : 'bg-[#0B211B]/[0.05] text-[#0B211B]/55',
                )}
              >
                <c.icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              </span>
              <span
                className={cn(
                  'min-w-0 flex-1 text-[12px] font-bold leading-tight tracking-tight',
                  active ? 'text-emerald-800' : 'text-[#0B211B]/70',
                )}
              >
                {c.label}
              </span>
            </button>
            {onInfo && (
              <button
                type="button"
                onClick={() => onInfo(c)}
                className="relative grid h-6 w-6 shrink-0 place-items-center rounded-full text-[#0B211B]/30 hover:text-[#0B211B]/60"
                aria-label={`Info about ${c.label}`}
              >
                <Info className="h-3.5 w-3.5" />
              </button>
            )}
            {active && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_4px_10px_-4px_rgba(16,185,129,0.8)]"
              >
                <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
              </motion.span>
            )}
          </div>
        )
      })}
    </div>
  )
}

interface RxRow {
  label: string
  value: string
  detail: string
}

interface PartnerClinicalRecommendationProps {
  referredBy: string
  referredPhone: string
  rxRows: RxRow[]
  onRxInfo: (row: RxRow) => void
  onCallDoctor: () => void
}

function RxRowItem({
  label,
  value,
  onClick,
}: {
  label: string
  value: string
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className="flex w-full items-baseline gap-3 text-left"
    >
      <span className="shrink-0 text-[12.5px] font-bold text-emerald-100/50">{label}</span>
      <span className="min-w-0 flex-1 text-right text-[13px] font-extrabold tracking-tight text-white">{value}</span>
    </motion.button>
  )
}

export function PartnerClinicalRecommendation({
  referredBy,
  referredPhone,
  rxRows,
  onRxInfo,
  onCallDoctor,
}: PartnerClinicalRecommendationProps) {
  return (
    <div className="relative overflow-hidden rounded-[26px] bg-[#0B231C] p-5 shadow-[0_24px_56px_-26px_rgba(6,40,30,0.75)]">
      <div aria-hidden className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute right-4 top-1 select-none font-serif text-[56px] leading-none text-emerald-300/20">
        Rx
      </span>
      <div className="relative">
        <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Signed by {referredBy}</div>
        <div className="mt-3 flex flex-col gap-3.5">
          {rxRows.map((row) => (
            <RxRowItem
              key={row.label}
              label={row.label}
              value={row.value}
              onClick={() => onRxInfo(row)}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-white/[0.07] px-3.5 py-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
          </span>
          <span className="min-w-0 flex-1 text-[10.5px] font-bold leading-snug text-emerald-50/75">
            Guardian signs consent before any matching begins.
          </span>
        </div>
        <button
          type="button"
          onClick={onCallDoctor}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/[0.08] py-2.5 text-xs font-bold text-emerald-100/80"
        >
          <Phone className="h-3.5 w-3.5" />
          Call {referredBy} · {referredPhone}
        </button>
      </div>
    </div>
  )
}

export function PartnerConsentNote() {
  return (
    <Card intent="info">
      <div className="flex items-start gap-3 p-4">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500/15">
          <User className="h-3.5 w-3.5 text-sky-600" strokeWidth={2.4} aria-hidden />
        </span>
        <p className="min-w-0 flex-1 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
          Referrals are shared only with Ayvaa's care team. Nothing reaches caregivers until the guardian consents.
        </p>
      </div>
    </Card>
  )
}

interface PartnerDischargeRecordsProps {
  files: { name: string; size: string }[]
  onFilesSelected: (files: File[]) => void
}

export function PartnerDischargeRecords({
  files,
  onFilesSelected,
}: PartnerDischargeRecordsProps) {
  return (
    <>
      <Section
        label="Discharge records"
        trailing={
          <Chip intent={files.length > 0 ? 'success' : 'warning'} dot={files.length === 0} className="border-transparent">
            {files.length > 0 ? `${files.length} attached` : 'Pending'}
          </Chip>
        }
      />
      <AnimatedFileUpload
        accept=".pdf"
        onFilesSelected={onFilesSelected}
      />
    </>
  )
}

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
