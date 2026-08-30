import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Lock, ShieldCheck } from 'lucide-react'
import { Card, Chip, Tile, TimeChip } from '@/components/phone/kit'
import type { RecordDoc } from '@/data/patientRecords'

interface DocRowProps {
  doc: RecordDoc
  open: boolean
  onToggle: () => void
  onRequireConsent?: () => void
}

function FactBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/45">{label}</div>
      <div className="mt-0.5 break-words text-[12.5px] font-bold leading-snug text-[#0B211B]/80">{value}</div>
    </div>
  )
}

export function DocRow({ doc, open, onToggle, onRequireConsent }: DocRowProps) {
  const Icon = doc.icon

  return (
    <div className="rounded-2xl bg-[#0B211B]/[0.03]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start gap-3.5 rounded-2xl p-4 text-left transition-colors duration-200 hover:bg-[#0B211B]/[0.06]"
      >
        <Tile icon={Icon} tone={doc.locked ? 'warning' : 'success'} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-extrabold tracking-tight text-[#0B211B]">{doc.name}</span>
          <span className="mt-1 block break-words text-[11.5px] font-medium leading-snug text-[#0B211B]/55">
            {doc.note}
          </span>
        </span>
        <span className="flex shrink-0 flex-col items-end gap-1.5">
          {doc.locked ? (
            <Chip intent="warning" icon={Lock}>
              Locked
            </Chip>
          ) : (
            doc.lastOpened && <TimeChip>{doc.lastOpened}</TimeChip>
          )}
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown className="h-4 w-4 text-[#0B211B]/40" aria-hidden />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <Card className="px-4 py-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {doc.locked ? (
                    <>
                      <FactBlock label="Sealed by" value={doc.sealedBy ?? 'Consent gate'} />
                      <FactBlock label="Type" value={doc.category} />
                    </>
                  ) : (
                    <>
                      <FactBlock label="Last opened" value={doc.lastOpened ?? 'Never'} />
                      <FactBlock label="Type" value={doc.category} />
                    </>
                  )}
                </div>
                <div className="mt-3.5">
                  <FactBlock
                    label={doc.locked ? 'Unlocks with' : 'Consent basis'}
                    value={
                      doc.locked
                        ? (doc.unlockNote ?? 'Guardian consent')
                        : (doc.consentBasis ?? 'Guardian consent')
                    }
                  />
                </div>
                {!doc.locked && doc.openedBy && (
                  <div className="mt-3.5">
                    <FactBlock label="Opened by" value={doc.openedBy} />
                  </div>
                )}
                {doc.locked && onRequireConsent && (
                  <button
                    type="button"
                    onClick={onRequireConsent}
                    className="mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3 text-[12.5px] font-bold text-white shadow-[0_14px_28px_-14px_rgba(5,150,105,0.75)]"
                  >
                    <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                    <span className="truncate">Review consent to unlock</span>
                  </button>
                )}
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
