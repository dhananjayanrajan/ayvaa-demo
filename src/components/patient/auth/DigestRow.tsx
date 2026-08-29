import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { LiveDot, TimeChip } from '@/components/phone/kit'
import { cn } from '@/lib/utils'
import type { DigestEntry } from '@/data/patientAuth'

const toneTile: Record<DigestEntry['tone'], string> = {
  emerald: 'bg-emerald-400/15 text-emerald-200',
  teal: 'bg-teal-400/15 text-teal-200',
  inverse: 'bg-white/[0.12] text-emerald-100',
}

export function DigestRow({
  entry,
  reviewed,
  onPress,
}: {
  entry: DigestEntry
  reviewed: boolean
  onPress: (entry: DigestEntry) => void
}) {
  const live = entry.marker.kind === 'live' && !reviewed
  const Icon = entry.icon
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={() => onPress(entry)}
      className={cn(
        'flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-colors duration-300',
        live ? 'bg-emerald-400/[0.14]' : 'bg-white/[0.06]',
      )}
    >
      <span
        className={cn(
          'grid h-9 w-9 shrink-0 place-items-center rounded-xl',
          toneTile[entry.tone],
        )}
      >
        <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12px] font-bold text-emerald-50/90">
          {entry.title}
        </span>
        <span className="mt-0.5 block truncate text-[10px] font-semibold text-emerald-100/70">
          {entry.detail}
        </span>
      </span>
      {reviewed ? (
        <span
          aria-label="Reviewed"
          className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-400/20 text-emerald-200"
        >
          <Check className="h-3 w-3" strokeWidth={3.2} aria-hidden />
        </span>
      ) : live ? (
        <LiveDot className="shrink-0 text-emerald-300" />
      ) : (
        <TimeChip>{entry.marker.kind === 'time' ? entry.marker.value : ''}</TimeChip>
      )}
    </motion.button>
  )
}
