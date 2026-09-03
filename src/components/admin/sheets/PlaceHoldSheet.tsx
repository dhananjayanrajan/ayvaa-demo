import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ShieldAlert } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'
import { cn } from '@/lib/utils'
import { PATIENTS } from '@/data/admin/a16Data'

export function PlaceHoldSheet({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: (patientName: string, reason: string) => void }) {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [reason, setReason] = useState('')
  const canConfirm = selectedPatient !== null && reason.trim().length >= 10
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="hold-dim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]" />
          <SheetShell key="hold-sheet" icon={ShieldAlert} tone="warning" title="Place legal hold" subtitle="Freeze records from auto-purge" onClose={onClose} footer={<div className="flex gap-2"><button type="button" onClick={onClose} className="flex flex-1 items-center justify-center rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/75">Cancel</button><button type="button" disabled={!canConfirm} onClick={() => { if (canConfirm && selectedPatient) { const name = PATIENTS.find((p) => p.name === selectedPatient)?.name ?? selectedPatient; onConfirm(name, reason.trim()); setReason(''); setSelectedPatient(null) } }} className={cn('flex flex-1 items-center justify-center rounded-2xl py-3.5 text-sm font-bold text-white', canConfirm ? 'bg-amber-600' : 'bg-[#0B211B]/20 cursor-not-allowed')}>Confirm hold</button></div>}>
            <div className="flex flex-col gap-4">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/55">Select patient</div>
              <div className="grid grid-cols-2 gap-2">
                {PATIENTS.map((p) => (
                  <button key={p.name} type="button" onClick={() => setSelectedPatient(p.name)} className={cn('flex items-center gap-2 rounded-xl px-3 py-2.5 text-left transition-colors', selectedPatient === p.name ? 'bg-amber-500 text-white' : 'bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.06]')}>
                    <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[10px] font-extrabold', selectedPatient === p.name ? 'bg-white/20 text-white' : 'bg-[#0B211B]/10 text-[#0B211B]/60')}>{p.initials}</span>
                    <span className={cn('min-w-0 flex-1 truncate text-[11px] font-bold', selectedPatient === p.name ? 'text-white' : 'text-[#0B211B]/75')}>{p.name}</span>
                  </button>
                ))}
              </div>
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/55">Reason</div>
                <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Minimum 10 characters — legal context for the hold" rows={3} className="mt-2 w-full rounded-xl border border-[#0B211B]/10 bg-white px-3 py-2.5 text-[12px] font-medium text-[#0B211B] placeholder:text-[#0B211B]/40 focus:border-amber-400 focus:outline-none" />
                <div className="mt-1 text-right text-[10px] font-bold tabular-nums text-[#0B211B]/40">{reason.length}/10 min</div>
              </div>
            </div>
          </SheetShell>
        </>
      )}
    </AnimatePresence>
  )
}
