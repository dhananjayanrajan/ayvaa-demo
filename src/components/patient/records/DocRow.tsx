import { Lock, ShieldCheck } from 'lucide-react'
import { Card, Chip, TimeChip } from '@/components/phone/kit'
import { ExpandRow } from '@/components/phone/ExpandRow'
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
    <ExpandRow
      icon={Icon}
      tone={doc.locked ? 'warning' : 'success'}
      dense={false}
      open={open}
      onToggle={onToggle}
      title={doc.name}
      sub={doc.note}
      trailing={
        <span className="flex shrink-0 flex-col items-end gap-1.5">
          {doc.locked ? (
            <Chip intent="warning" icon={Lock}>
              Locked
            </Chip>
          ) : (
            doc.lastOpened && <TimeChip>{doc.lastOpened}</TimeChip>
          )}
        </span>
      }
    >
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
    </ExpandRow>
  )
}
