import { ChevronRight } from 'lucide-react'
import { Row } from '@/components/phone/Row'
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
    <Row
      icon={entry.icon}
      tone={entry.tone}
      liveDot={unread}
      title={entry.title}
      titleClassName="text-[13px]"
      subtitle={entry.body}
      subtitleClassName="text-[11px] text-[#0B211B]/50"
      time={entry.time}
      surface="inset"
      padding="comfortable"
      hoverClassName="hover:bg-[#0B211B]/[0.05]"
      showChevron={false}
      trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />}
      onClick={() => onPress(entry)}
    />
  )
}
