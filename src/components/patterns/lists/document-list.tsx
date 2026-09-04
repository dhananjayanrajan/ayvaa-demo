import { ChevronDown, FileText } from 'lucide-react'
import { Card, Chip, Expand, Tile } from '@/components/base/phone/kit'
import { cn } from '@/lib/utils'
import type { Document } from '@/data/admin/a12Data'

type Props = { documents: Document[]; openId: string | null; onToggle: (id: string) => void }

export function DocumentList({ documents, openId, onToggle }: Props) {
  return (
    <Card>
      <div className="flex flex-col gap-2 p-2">
        {documents.map((doc) => {
          const isOpen = openId === doc.id
          const isPending = doc.status === 'pending'
          return (
            <div key={doc.id} className="rounded-2xl bg-[#0B211B]/[0.035]">
              <button type="button" onClick={() => onToggle(doc.id)} aria-expanded={isOpen} className="flex w-full items-start gap-3 px-3 py-3 text-left">
                <Tile icon={FileText} tone={isPending ? 'warning' : 'success'} />
                <div className="min-w-0 flex-1">
                  <div className="break-words text-[13px] font-bold tracking-tight text-[#0B211B]">{doc.name}</div>
                  <div className="mt-0.5 text-[11px] font-semibold text-[#0B211B]/55">{doc.type} · {doc.size}</div>
                  <div className="mt-1.5"><Chip intent={isPending ? 'warning' : 'success'} dot={isPending}>{isPending ? 'Pending' : 'Verified'}</Chip></div>
                </div>
                <ChevronDown className={cn('h-4 w-4 shrink-0 text-[#0B211B]/30 transition-transform duration-200', isOpen && 'rotate-180')} />
              </button>
              <Expand open={isOpen}>
                <div className="px-3 pb-3">
                  <div className="rounded-2xl bg-[#0B211B]/[0.03] p-3">
                    <div className="flex flex-col gap-2.5">
                      {doc.details.map((detail) => (
                        <div key={detail.label} className="flex items-baseline justify-between gap-3">
                          <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">{detail.label}</span>
                          <span className="min-w-0 break-words text-right text-[12px] font-bold text-[#0B211B]/80">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Expand>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
