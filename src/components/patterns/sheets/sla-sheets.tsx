import { AnimatePresence, motion } from 'motion/react'
import { Phone, UserRound } from 'lucide-react'
import { SheetShell } from '@/components/base/phone/sheet-shell'
import { CONTACTS } from '@/data/admin/a17Data'

export function ContactSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="c-dim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]" />
          <SheetShell key="c-sheet" icon={Phone} tone="info" title="Contact supervisor" subtitle="Escalation line" onClose={onClose} footer={<button type="button" onClick={onClose} className="flex w-full items-center justify-center rounded-2xl bg-[#0B211B]/[0.05] py-3 text-sm font-bold text-[#0B211B]/75">Close</button>}>
            <div className="flex flex-col gap-2">
              {CONTACTS.map((c) => (
                <div key={c.name} className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0B211B]/10 text-[10px] font-extrabold text-[#0B211B]/60">{c.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>
                  <div className="min-w-0 flex-1"><div className="text-[12px] font-bold text-[#0B211B]">{c.name}</div><div className="text-[11px] font-medium text-[#0B211B]/50">{c.role} · {c.phone}</div></div>
                </div>
              ))}
            </div>
          </SheetShell>
        </>
      )}
    </AnimatePresence>
  )
}

export function AssignSheet({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: (name: string) => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="a-dim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]" />
          <SheetShell key="a-sheet" icon={UserRound} tone="success" title="Assign ticket" subtitle="Choose assignee" onClose={onClose} footer={<button type="button" onClick={onClose} className="flex w-full items-center justify-center rounded-2xl bg-[#0B211B]/[0.05] py-3 text-sm font-bold text-[#0B211B]/75">Cancel</button>}>
            <div className="flex flex-col gap-2">
              {CONTACTS.map((c) => (
                <button key={c.name} type="button" onClick={() => { onConfirm(c.name); onClose() }} className="flex items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3 text-left hover:bg-[#0B211B]/[0.06]">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500 text-white text-[10px] font-extrabold">{c.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>
                  <span className="text-[12px] font-bold text-[#0B211B]">{c.name}</span>
                  <span className="ml-auto text-[#0B211B]/30">→</span>
                </button>
              ))}
            </div>
          </SheetShell>
        </>
      )}
    </AnimatePresence>
  )
}
