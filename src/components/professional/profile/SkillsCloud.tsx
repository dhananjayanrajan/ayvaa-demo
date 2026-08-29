import { motion } from 'motion/react'
import { Check, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Skill = {
  label: string
  matched: boolean
}

type Props = {
  skills: Skill[]
  addLabel: string
  onPressSkill: (skill: Skill) => void
  onPressAdd: () => void
}

export function SkillsCloud({ skills, addLabel, onPressSkill, onPressAdd }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((s) => (
        <motion.button
          key={s.label}
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={() => onPressSkill(s)}
          aria-pressed={s.matched}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-bold transition-colors',
            s.matched ? 'bg-emerald-500/[0.12] text-emerald-700' : 'bg-amber-500/[0.12] text-amber-700',
          )}
        >
          {s.matched ? (
            <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
          ) : (
            <Plus className="h-3 w-3" strokeWidth={3} aria-hidden />
          )}
          {s.label}
        </motion.button>
      ))}
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={onPressAdd}
        className="inline-flex items-center gap-1.5 rounded-full bg-[#0B211B]/[0.045] px-3.5 py-2 text-[12px] font-bold text-[#0B211B]/55 transition-colors hover:bg-[#0B211B]/[0.08]"
      >
        <Plus className="h-3 w-3" strokeWidth={3} aria-hidden />
        {addLabel}
      </motion.button>
    </div>
  )
}
