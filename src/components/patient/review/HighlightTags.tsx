import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { HIGHLIGHT_TAGS } from '@/data/patientRating'
import { cn } from '@/lib/utils'

interface HighlightTagsProps {
  selected: string[]
  onToggle: (tag: string) => void
}

export function HighlightTags({ selected, onToggle }: HighlightTagsProps) {
  return (
    <div>
      <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">What went well</div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {HIGHLIGHT_TAGS.map((tag) => {
          const on = selected.includes(tag)
          return (
            <motion.button
              key={tag}
              type="button"
              whileTap={{ scale: 0.93 }}
              onClick={() => onToggle(tag)}
              aria-pressed={on}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-3 py-2 text-[10.5px] font-bold transition-colors duration-200',
                on ? 'bg-amber-400 text-[#0B231C]' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/55 hover:bg-[#0B211B]/[0.08]',
              )}
            >
              {on && <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />}
              {tag}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
