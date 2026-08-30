import { useState } from 'react'
import { FileText } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'
import { DocRow } from './DocRow'
import { lockedCount, type RecordDoc } from '@/data/patientRecords'

interface RecordsCardProps {
  docs: RecordDoc[]
  onRequireConsent: () => void
}

export function RecordsCard({ docs, onRequireConsent }: RecordsCardProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const locked = lockedCount(docs)

  return (
    <Card>
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <Tile icon={FileText} tone="success" size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                Document vault
              </span>
              {locked > 0 ? (
                <Chip intent="warning" dot>
                  {locked} consent locked
                </Chip>
              ) : (
                <Chip intent="success">All open</Chip>
              )}
            </div>
            <p className="mt-1 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              Tap a file to see who opened it and under which consent.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2.5">
          {docs.map((doc) => (
            <DocRow
              key={doc.id}
              doc={doc}
              open={openId === doc.id}
              onToggle={() => setOpenId((cur) => (cur === doc.id ? null : doc.id))}
              onRequireConsent={doc.locked ? onRequireConsent : undefined}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
