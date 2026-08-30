import { motion } from 'motion/react'
import { Check, ClipboardList } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  note: string
  quickTags: string[]
  tags: string[]
  onToggleTag: (tag: string) => void
  onPressNote: () => void
}

export function NotesPanel({ note, quickTags, tags, onToggleTag, onPressNote }: Props) {
  return (
    <div className="flex flex-col gap-2.5">
      <motion.button
        type="button"
        whileTap={{ scale: 0.985 }}
        onClick={onPressNote}
        className="relative overflow-hidden rounded-2xl bg-[#0B231C] p-4 text-left shadow-[0_20px_44px_-24px_rgba(6,40,30,0.7)]"
      >
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">
            <ClipboardList className="h-3 w-3" aria-hidden />
            Your note · verbatim to family
          </div>
          <p className="mt-2 font-serif text-pretty text-[13.5px] font-medium leading-relaxed text-white/90">&ldquo;{note}&rdquo;</p>
        </div>
      </motion.button>

      <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Quick tags</div>
      <div className="flex flex-wrap gap-2">
        {quickTags.map((t) => {
          const on = tags.includes(t)
          return (
            <motion.button
              key={t}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggleTag(t)}
              aria-pressed={on}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-bold transition-colors',
                on ? 'bg-emerald-500/[0.14] text-emerald-700' : 'bg-[#0B211B]/[0.045] text-[#0B211B]/55',
              )}
            >
              {on && <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />}
              {t}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
