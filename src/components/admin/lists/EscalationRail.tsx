import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check, UserRound } from 'lucide-react'
import { Card, Chip } from '@/components/phone/kit'
import { cn } from '@/lib/utils'
import { ESCALATIONS } from '@/data/admin/a17Data'
import type { Escalation } from '@/data/admin/a17Data'

export function EscalationRail({ onAssign, onResolve }: { onAssign: (id: string) => void; onResolve: (id: string) => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  return (
    <Card>
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between"><span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">Tickets</span><Chip intent="warning" className="border-transparent">{ESCALATIONS.length} total</Chip></div>
        <div className="flex flex-col gap-2">
          {ESCALATIONS.map((t: Escalation) => {
            const isOpen = expanded === t.id
            return (
              <div key={t.id} className={cn('overflow-hidden rounded-2xl transition-colors', t.priority === 'P1' ? 'bg-rose-500/[0.06]' : t.priority === 'P2' ? 'bg-amber-500/[0.06]' : 'bg-[#0B211B]/[0.03]')}>
                <button type="button" onClick={() => setExpanded(isOpen ? null : t.id)} className="flex w-full items-start gap-3 px-4 py-3 text-left">
                  <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-xl text-[10px] font-extrabold text-white', t.priority === 'P1' ? 'bg-rose-500' : t.priority === 'P2' ? 'bg-amber-500' : 'bg-[#0B211B]/30')}>{t.priority}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-bold leading-snug text-[#0B211B]">{t.title}</div>
                    <div className="mt-0.5 text-[10px] font-semibold text-[#0B211B]/50">{t.raisedBy} · {t.role} · {t.time}</div>
                    <div className="mt-1"><Chip intent={t.status === 'resolved' ? 'success' : t.status === 'assigned' ? 'info' : 'warning'} className="border-transparent text-[10px]">{t.status}</Chip></div>
                  </div>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-[#0B211B]/30">⌄</motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="border-t border-[#0B211B]/[0.06] px-4 pb-3 pt-3">
                        <p className="text-[11px] font-medium leading-relaxed text-[#0B211B]/65">{t.description}</p>
                        <div className="mt-3 flex gap-2">
                          {t.status !== 'resolved' && <button type="button" onClick={() => onAssign(t.id)} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#0B211B]/[0.06] py-2 text-[11px] font-bold text-[#0B211B]/70"><UserRound className="h-3.5 w-3.5" />Assign</button>}
                          {t.status !== 'resolved' && <button type="button" onClick={() => onResolve(t.id)} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2 text-[11px] font-bold text-white"><Check className="h-3.5 w-3.5" />Resolve</button>}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
