import { motion } from 'motion/react'
import { Check, ClipboardList } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SHEET_MODES, type SheetMode } from './sheetData'

type Props = {
  saved: SheetMode[]
  onPress: () => void
}

export function ReopenSheetsBar({ saved, onPress }: Props) {
  const doneCount = SHEET_MODES.filter((m) => saved.includes(m.id)).length
  const complete = doneCount === SHEET_MODES.length
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onPress}
      className={cn(
        'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-colors',
        complete
          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
          : 'bg-[#0B211B]/[0.06] text-[#0B211B]/75',
      )}
    >
      <ClipboardList
        className={cn('h-4 w-4 shrink-0', complete ? 'text-white' : 'text-[#0B211B]/45')}
        strokeWidth={2.4}
        aria-hidden
      />
      <span className="truncate">{complete ? 'All sheets recorded · review' : 'Open entry sheets'}</span>
      {doneCount > 0 && (
        <span
          className={cn(
            'flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold tabular-nums',
            complete ? 'bg-white/15 text-white' : 'bg-emerald-500/[0.12] text-emerald-700',
          )}
        >
          {complete && <Check className="h-2.5 w-2.5" strokeWidth={4} aria-hidden />}
          {doneCount}/{SHEET_MODES.length}
        </span>
      )}
    </motion.button>
  )
}
