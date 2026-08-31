import { motion } from 'motion/react'
import { Check, CheckCircle2, Lock, ScanLine } from 'lucide-react'
import { Chip, Panel } from '@/components/phone/kit'
import { StatusStrip } from '@/components/phone/StatusStrip'
import { cn } from '@/lib/utils'

type Props = {
  checks: string[]
  allChecked: boolean
  saved: boolean
  scanned: boolean
  verifications: string[]
  total: number
  onToggleCheck: (label: string) => void
  onRescan: () => void
}

export function MedVerificationPanel({ checks, allChecked, saved, scanned, verifications, total, onToggleCheck, onRescan }: Props) {
  const verified = allChecked || saved
  return (
    <div className="flex flex-col gap-2.5">
      <Panel intent={verified ? 'success' : 'warning'} className="p-4">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              'text-[9px] font-extrabold uppercase tracking-[0.18em]',
              verified ? 'text-emerald-700/80' : 'text-amber-700/80',
            )}
          >
            {verified ? 'Verification complete' : 'Verification · all three required'}
          </span>
          <Chip intent={verified ? 'success' : 'warning'} dot={!verified}>
            {verified ? 'Done' : `${checks.length}/${total}`}
          </Chip>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {verifications.map((v) => {
            const on = checks.includes(v)
            return (
              <motion.button
                key={v}
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => onToggleCheck(v)}
                aria-pressed={on}
                className={cn(
                  'flex items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-colors',
                  on ? 'bg-emerald-500/[0.1]' : 'bg-white hover:bg-[#0B211B]/[0.02]',
                )}
              >
                <span
                  className={cn(
                    'grid h-5 w-5 shrink-0 place-items-center rounded-lg transition-colors',
                    on ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.1] text-transparent',
                  )}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3.5} aria-hidden />
                </span>
                <span
                  className={cn(
                    'min-w-0 flex-1 text-[12.5px] font-semibold leading-snug',
                    on ? 'text-emerald-800' : 'text-[#0B211B]/70',
                  )}
                >
                  {v}
                </span>
              </motion.button>
            )
          })}
        </div>
      </Panel>

      <motion.button
        type="button"
        whileTap={{ scale: 0.985 }}
        onClick={onRescan}
        className={cn(
          'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left',
          scanned ? 'bg-emerald-500/[0.1]' : 'bg-amber-500/[0.1]',
        )}
      >
        <ScanLine
          className={cn('h-5 w-5 shrink-0', scanned ? 'text-emerald-600' : 'text-amber-600')}
          strokeWidth={2.2}
          aria-hidden
        />
        <span className="min-w-0 flex-1">
          <span className={cn('block text-[13px] font-bold tracking-tight', scanned ? 'text-emerald-800' : 'text-amber-800')}>
            {scanned ? 'Pack barcode scanned · matched' : 'Scan pack barcode to verify'}
          </span>
          <span className={cn('mt-0.5 block text-[10.5px] font-semibold', scanned ? 'text-emerald-700/60' : 'text-amber-700/60')}>
            {scanned ? 'Tap to rescan' : 'Required before confirming the dose'}
          </span>
        </span>
        {scanned && <Check className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={3} aria-hidden />}
      </motion.button>

      {saved ? (
        <StatusStrip>Dose confirmed · Amlodipine 5 mg given · recorded permanently</StatusStrip>
      ) : (
        !allChecked && (
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700">
            <Lock className="h-3.5 w-3.5" aria-hidden />
            Confirm stays locked · complete all three checks first
          </div>
        )
      )}

      {allChecked && !saved && (
        <Panel intent="success" className="flex items-start gap-2.5 p-3.5">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.6} aria-hidden />
          <p className="min-w-0 flex-1 text-pretty text-[11.5px] font-semibold leading-relaxed text-[#0B211B]/70">
            All three checks done and the pack is matched. Confirming records the dose permanently.
          </p>
        </Panel>
      )}
    </div>
  )
}
