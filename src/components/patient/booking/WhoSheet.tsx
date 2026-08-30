import { UserRoundCheck } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'
import { OptionRow, OptionCheck } from '@/components/phone/OptionRow'
import { lovedOnes } from '@/data/seed'

export function WhoSheet({
  who,
  onPick,
  onAdd,
  onClose,
}: {
  who: number
  onPick: (index: number) => void
  onAdd: () => void
  onClose: () => void
}) {
  return (
    <SheetShell
      icon={UserRoundCheck}
      tone="success"
      title="Who is this booking for"
      subtitle="Anyone on your family plan, consent applies per person"
      onClose={onClose}
      footer={
        <button
          type="button"
          onClick={onAdd}
          className="w-full rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75 transition-colors hover:bg-[#0B211B]/[0.08]"
        >
          Add someone new from your profile
        </button>
      }
    >
      <div className="flex flex-col gap-2">
        {lovedOnes.map((p, i) => {
          const active = who === i
          return (
            <OptionRow
              key={p.name}
              selected={active}
              onSelect={() => onPick(i)}
              initial={p.name.charAt(0)}
              title={p.name}
              sub={`Age ${p.age}, ${p.category}`}
              trailing={<OptionCheck on={active} />}
            />
          )
        })}
      </div>
    </SheetShell>
  )
}
