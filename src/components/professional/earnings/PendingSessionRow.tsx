import { Clock } from 'lucide-react'
import { Row } from '@/components/phone/Row'

type Props = {
  patient: string
  when: string
  note: string
}

export function PendingSessionRow({ patient, when, note }: Props) {
  return (
    <Row
      icon={Clock}
      tone="neutral"
      tileSize="sm"
      title={patient}
      titleClassName="text-[13px] font-extrabold"
      metaLabel="Upcoming"
      metaValue={when}
      metaNote={note}
      chip={{ label: 'Pending', intent: 'neutral' }}
      surface="inset"
      surfaceTone="rounded-2xl bg-[#0B211B]/[0.03]"
      wrapSurface
      showChevron={false}
      className="items-start"
    />
  )
}
