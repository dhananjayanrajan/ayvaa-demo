import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AlertTriangle, Clock, ShieldCheck } from 'lucide-react'
import { Card, Chip } from '@/components/phone/kit'
import { SheetShell } from '@/components/phone/SheetShell'
import { cn } from '@/lib/utils'
import { PRESETS } from '@/data/admin/a16Data'
import type { RecordType } from '@/data/admin/a16Data'

export function EditPolicySheet({ open, policy, onClose, onSave }: { open: boolean; policy: RecordType; onClose: () => void; onSave: (years: number) => void }) {
  const [years, setYears] = useState(policy.years)
  const delta = years - policy.years
  const nextPurge = delta === 0 ? policy.nextPurge : delta > 0 ? `${23 + delta * 12} days` : `${Math.max(3, 23 + delta * 7)} days`
  const affectedCount = delta === 0 ? policy.purgeCount : delta > 0 ? Math.max(0, policy.purgeCount - delta * 120) : policy.purgeCount + Math.abs(delta) * 220
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="edit-dim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]" />
          <SheetShell key="edit-sheet" icon={Clock} tone="success" title="Edit policy" subtitle={`${policy.label} · ${policy.years} yrs → ${years} yrs`} onClose={onClose} footer={<div className="flex gap-2"><button type="button" onClick={onClose} className="flex flex-1 items-center justify-center rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/75">Cancel</button><button type="button" onClick={() => onSave(years)} className={cn('flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white', delta === 0 ? 'bg-[#0B211B]/20 cursor-not-allowed' : 'bg-emerald-600')} disabled={delta === 0}><ShieldCheck className="h-4 w-4" strokeWidth={2.4} aria-hidden />Confirm change</button></div>}>
            <div className="flex flex-col gap-4">
              <Card>
                <div className="p-4">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/55">Retention period</div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {PRESETS.map((p) => (
                      <button key={p} type="button" onClick={() => setYears(p)} className={cn('rounded-xl py-2.5 text-sm font-extrabold tabular-nums transition-colors', years === p ? 'bg-emerald-600 text-white shadow-[0_8px_16px_-8px_rgba(16,185,129,0.6)]' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/70 hover:bg-[#0B211B]/[0.08]')}>{p} yrs</button>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-amber-400/[0.08] px-3 py-2.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600" strokeWidth={2.2} aria-hidden />
                    <span className="text-[11px] font-bold text-amber-800">Next purge: {nextPurge} · {affectedCount} records</span>
                    <Chip intent={delta === 0 ? 'neutral' : delta > 0 ? 'success' : 'warning'} className="ml-auto border-transparent text-[10px]">{delta === 0 ? 'No change' : delta > 0 ? `+${delta}y` : `${delta}y`}</Chip>
                  </div>
                </div>
              </Card>
            </div>
          </SheetShell>
        </>
      )}
    </AnimatePresence>
  )
}
