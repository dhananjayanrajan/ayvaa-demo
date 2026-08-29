import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { Tile, TimeChip } from '@/components/phone/kit'
import type { NotificationEntry } from '@/data/patientNotifications'

export function EntryRow({
  entry,
  unread,
  onPress,
}: {
  entry: NotificationEntry
  unread: boolean
  onPress: (entry: NotificationEntry) => void
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.99 }}
      onClick={() => onPress(entry)}
      className="flex w-full items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-3.5 py-3 text-left transition-colors hover:bg-[#0B211B]/[0.05]"
    >
      <span className="relative shrink-0">
        <Tile icon={entry.icon} tone={entry.tone} />
        {unread && (
          <span
            className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
            aria-label="Unread"
          />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">
          {entry.title}
        </span>
        <span className="mt-0.5 block text-pretty text-[11px] font-medium leading-snug text-[#0B211B]/50">
          {entry.body}
        </span>
      </span>
      <TimeChip>{entry.time}</TimeChip>
      <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
    </motion.button>
  )
}
