import { motion } from 'motion/react'
import { Check, UserRoundCheck } from 'lucide-react'
import { SheetShell } from '@/components/patient/onboarding/SheetShell'
import { lovedOnes } from '@/data/seed'
import { cn } from '@/lib/utils'

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
      tileTone="success"
      title="Who is this booking for"
      subtitle="Anyone on your family plan, consent applies per person"
      onClose={onClose}
      footer={
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onAdd}
          className="w-full rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75 transition-colors hover:bg-[#0B211B]/[0.08]"
        >
          Add someone new from your profile
        </motion.button>
      }
    >
      <div className="flex flex-col gap-2">
        {lovedOnes.map((p, i) => {
          const active = who === i
          return (
            <motion.button
              key={p.name}
              type="button"
              whileTap={{ scale: 0.985 }}
              onClick={() => onPick(i)}
              className={cn(
                'flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-colors',
                active ? 'bg-emerald-500/[0.08]' : 'bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.055]',
              )}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-[14px] font-extrabold text-white">
                {p.name.charAt(0)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-bold leading-snug tracking-tight text-[#0B211B]">
                  {p.name}
                </span>
                <span className="mt-0.5 block text-pretty text-[11px] font-medium leading-snug text-[#0B211B]/50">
                  Age {p.age}, {p.category}
                </span>
              </span>
              {active && (
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                </span>
              )}
            </motion.button>
          )
        })}
      </div>
    </SheetShell>
  )
}
