import { Plus } from 'lucide-react'
import { Row } from '@/components/base/phone/row'

type Props = {
  onPress: () => void
}

export function AddCertificationRow({ onPress }: Props) {
  return (
    <Row
      icon={Plus}
      tone="ink"
      title="Add a certification"
      titleClassName="text-[13px] font-extrabold"
      subtitle="Unlocks new care categories once verified"
      subtitleClassName="truncate text-[10.5px] font-semibold text-[#0B211B]/45"
      bodyClassName="pt-0.5"
      surface="inset"
      padding="inset"
      hoverClassName="hover:bg-[#0B211B]/[0.06]"
      onClick={onPress}
    />
  )
}
