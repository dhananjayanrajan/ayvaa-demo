import { Check, UserRound } from 'lucide-react'
import { Chip, Section, Tile } from '@/components/base/phone/kit'
import { Card } from '@/components/base/phone/kit'
import { cn } from '@/lib/utils'
import type { Investigator } from '@/data/admin/a11Data'

type Props = {
  investigators: Investigator[]
  selectedId: string
  assigned: boolean
  assigning: boolean
  onSelect: (id: string) => void
}

export function InvestigatorPicker({ investigators, selectedId, assigned, assigning, onSelect }: Props) {
  const disabled = assigned || assigning
  return (
    <>
      <Section
        label="Assign investigator"
        trailing={
          assigned ? <Chip intent="success">Assigned</Chip> : selectedId ? <Chip intent="warning">Ready</Chip> : <Chip intent="warning" dot>Required</Chip>
        }
      />
      <Card>
        <div className="flex flex-col gap-2 p-2">
          {investigators.map((inv) => {
            const isSelected = selectedId === inv.id
            return (
              <button
                key={inv.id}
                type="button"
                onClick={() => onSelect(inv.id)}
                disabled={disabled}
                className={cn(
                  'flex items-start gap-3 rounded-2xl px-3 py-3 text-left transition-colors',
                  isSelected ? 'bg-rose-500/[0.06] ring-2 ring-rose-500/40' : 'bg-[#0B211B]/[0.035] hover:bg-[#0B211B]/[0.06]',
                  disabled && 'cursor-not-allowed opacity-60',
                )}
              >
                <Tile icon={UserRound} tone={isSelected ? 'danger' : 'neutral'} />
                <div className="min-w-0 flex-1">
                  <div className="break-words text-[13px] font-bold tracking-tight text-[#0B211B]">{inv.name}</div>
                  <div className="mt-0.5 break-words text-[11px] font-semibold text-[#0B211B]/55">{inv.role}</div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-start gap-2">
                      <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.1em] text-[#0B211B]/40">Expertise</span>
                      <span className="min-w-0 break-words text-[11px] font-medium text-[#0B211B]/55">{inv.expertise}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.1em] text-[#0B211B]/40">Active cases</span>
                      <span className="min-w-0 break-words text-[11px] font-medium text-[#0B211B]/55">{inv.activeCases}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.1em] text-[#0B211B]/40">Availability</span>
                      <span className="min-w-0 break-words text-[11px] font-medium text-[#0B211B]/55">{inv.availability}</span>
                    </div>
                  </div>
                </div>
                {isSelected ? (
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-rose-500 text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                ) : (
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.08] text-[#0B211B]/40">
                    <UserRound className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </Card>
    </>
  )
}
