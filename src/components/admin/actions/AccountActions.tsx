import { Check, ChevronRight, Loader2, ShieldAlert, UserRound } from 'lucide-react'
import { Card, Tile } from '@/components/phone/kit'
import { SectionHeader } from '@/components/onboarding/OnboardingSet'
import { cn } from '@/lib/utils'
import type { MergeTarget } from '@/data/admin/a13Data'

type MergeState = 'idle' | 'selecting' | 'merged'

type Props = {
  status: 'active' | 'suspended'
  mergeState: MergeState
  mergeTargets: MergeTarget[]
  selectedTarget: string
  merging: boolean
  onSuspend: () => void
  onToggleMerge: () => void
  onSelectTarget: (id: string) => void
  onConfirmMerge: () => void
}

export function AccountActions({ status, mergeState, mergeTargets, selectedTarget, merging, onSuspend, onToggleMerge, onSelectTarget, onConfirmMerge }: Props) {
  return (
    <>
      <SectionHeader label="Account actions" done={false} trailing="Role" />
      <Card>
        <div className="flex flex-col gap-2 p-2">
          <button type="button" onClick={onSuspend} disabled={status === 'suspended'} className={cn('flex items-center gap-3 rounded-2xl bg-rose-500/[0.06] px-3 py-3 text-left transition-colors', status !== 'suspended' && 'hover:bg-rose-500/[0.1]', status === 'suspended' && 'cursor-not-allowed opacity-60')}>
            <Tile icon={ShieldAlert} tone="danger" /><div className="min-w-0 flex-1"><div className="break-words text-[13px] font-bold tracking-tight text-[#0B211B]">Suspend account</div><div className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">{status === 'suspended' ? 'Account is suspended' : 'Revoke all access immediately'}</div></div><ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" />
          </button>
          <button type="button" onClick={onToggleMerge} disabled={mergeState === 'merged'} className={cn('flex items-center gap-3 rounded-2xl bg-amber-500/[0.06] px-3 py-3 text-left transition-colors', mergeState !== 'merged' && 'hover:bg-amber-500/[0.1]', mergeState === 'merged' && 'cursor-not-allowed opacity-60')}>
            <Tile icon={UserRound} tone="warning" /><div className="min-w-0 flex-1"><div className="break-words text-[13px] font-bold tracking-tight text-[#0B211B]">Merge account</div><div className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">{mergeState === 'merged' ? 'Accounts merged' : 'Combine with another guardian record'}</div></div><ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" />
          </button>
          {mergeState === 'selecting' && (
            <div className="rounded-2xl bg-amber-500/[0.06] p-3">
              <p className="break-words text-[12px] font-medium leading-relaxed text-[#0B211B]/65">Select a record to merge this account into. This cannot be undone.</p>
              <div className="mt-3 flex flex-col gap-2">
                {mergeTargets.map((target) => (
                  <button key={target.id} type="button" onClick={() => onSelectTarget(target.id)} className={cn('flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-left transition-colors', selectedTarget === target.id ? 'ring-2 ring-amber-500/40' : 'hover:bg-white/70')}>
                    <span className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-full', selectedTarget === target.id ? 'bg-amber-500 text-white' : 'bg-[#0B211B]/[0.08] text-transparent')}>{selectedTarget === target.id && <Check className="h-3 w-3" strokeWidth={3} />}</span>
                    <div className="min-w-0 flex-1"><div className="truncate text-[12px] font-bold text-[#0B211B]">{target.name}</div><div className="truncate text-[10px] font-medium text-[#0B211B]/55">{target.email}</div></div>
                  </button>
                ))}
              </div>
              <button type="button" onClick={onConfirmMerge} disabled={!selectedTarget || merging} className={cn('mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[11px] font-bold text-white', selectedTarget ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_18px_36px_-18px_rgba(245,158,11,0.75)]' : 'bg-[#0B211B]/[0.06] text-[#0B211B]/30', merging && 'cursor-wait opacity-60')}>
                {merging ? <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" /> : <UserRound className="h-3.5 w-3.5" strokeWidth={2.4} />}{merging ? 'Merging…' : 'Merge'}
              </button>
            </div>
          )}
          {mergeState === 'merged' && <div className="rounded-xl bg-emerald-500/[0.08] px-3 py-2.5"><div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" strokeWidth={2.6} /><span className="text-[11px] font-bold text-emerald-700">Accounts merged successfully</span></div></div>}
        </div>
      </Card>
    </>
  )
}
