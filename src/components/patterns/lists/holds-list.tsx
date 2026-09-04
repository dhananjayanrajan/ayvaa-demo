import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Unlock } from 'lucide-react'
import { Card, Chip } from '@/components/base/phone/kit'
import { cn } from '@/lib/utils'
import type { LegalHold } from '@/data/admin/a16Data'

function SectionMarker({ label, trail, tone = 'emerald' }: { label: string; trail?: React.ReactNode; tone?: 'emerald' | 'rose' | 'blue' }) {
  const toneClass = tone === 'rose' ? 'bg-rose-500' : tone === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'
  return (
    <div className="flex items-center gap-2.5 px-1">
      <div className={cn('h-3 w-1 rounded-full', toneClass)} />
      <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/55">{label}</span>
      <div className="h-px flex-1 bg-[#0B211B]/[0.08]" />
      {trail}
    </div>
  )
}

export function HoldsList({ holds, onLift }: { holds: LegalHold[]; onLift: (id: string) => void }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const activeHolds = holds.filter((h) => h.status === 'active')
  const liftedHolds = holds.filter((h) => h.status === 'lifted')
  return (
    <div className="shrink-0 flex flex-col gap-3">
      <SectionMarker label="Active legal holds" trail={<Chip intent="danger" dot className="border-transparent">{activeHolds.length}</Chip>} tone="rose" />
      <Card>
        <div className="p-5">
          <p className="mb-4 text-[11px] font-semibold leading-relaxed text-[#0B211B]/55">Frozen records exempt from auto-purge. Lifted only by admin with case ref.</p>
          <div className="flex flex-col gap-2">
            {activeHolds.map((h) => {
              const isExpanded = expandedId === h.id
              return (
                <div key={h.id} className="overflow-hidden rounded-2xl bg-[#0B211B]/[0.03] transition-colors hover:bg-[#0B211B]/[0.05]">
                  <button type="button" onClick={() => setExpandedId(isExpanded ? null : h.id)} className="flex w-full items-start gap-3 px-4 py-3.5 text-left">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-rose-400 to-red-500 text-[11px] font-extrabold text-white shadow-[0_6px_12px_-6px_rgba(225,29,72,0.5)]">{h.initials}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-[13px] font-extrabold tracking-tight text-[#0B211B]">{h.patient}</span>
                        <Chip intent="danger" className="shrink-0 border-transparent bg-rose-500/[0.08] text-rose-600">Frozen</Chip>
                      </div>
                      <div className="mt-1 text-[10px] font-semibold tabular-nums text-[#0B211B]/50">{h.caseRef}</div>
                      <div className="text-[10px] font-semibold text-[#0B211B]/40">Placed {h.placedOn}</div>
                    </div>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 pt-1 text-[#0B211B]/40">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }} className="overflow-hidden">
                        <div className="border-t border-[#0B211B]/[0.06] px-4 pb-4 pt-3.5">
                          <div className="rounded-xl bg-[#0B211B]/[0.03] px-3.5 py-3">
                            <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">Reason for hold</div>
                            <p className="mt-1.5 text-pretty text-[11.5px] font-semibold leading-relaxed text-[#0B211B]/75">{h.reason}</p>
                          </div>
                          <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={(e) => { e.stopPropagation(); onLift(h.id) }} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500/[0.08] py-2.5 text-[12px] font-bold text-rose-600 transition-colors hover:bg-rose-500/[0.14]">
                            <Unlock className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden /> Lift legal hold
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
          {liftedHolds.length > 0 && (
            <div className="mt-5">
              <div className="mb-2.5 flex items-center gap-2">
                <div className="h-2.5 w-0.5 rounded-full bg-[#0B211B]/25" />
                <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Lifted</span>
                <span className="text-[9.5px] font-bold tabular-nums text-[#0B211B]/30">{liftedHolds.length}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {liftedHolds.map((h) => (
                  <div key={h.id} className="flex items-center gap-2.5 rounded-xl bg-[#0B211B]/[0.02] px-3.5 py-2.5">
                    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#0B211B]/[0.05] text-[9px] font-extrabold text-[#0B211B]/40">{h.initials}</div>
                    <span className="min-w-0 flex-1 truncate text-[11.5px] font-semibold text-[#0B211B]/55 line-through decoration-[#0B211B]/20">{h.patient}</span>
                    <Chip intent="neutral" className="shrink-0 border-transparent bg-[#0B211B]/[0.05] text-[#0B211B]/45">Resolved</Chip>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
