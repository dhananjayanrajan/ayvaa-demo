import { ChevronRight } from 'lucide-react'
import { Row } from '@/components/base/phone/row'
import type { LucideIcon } from 'lucide-react'
import type { TileTone } from '@/components/base/phone/kit'
import type { Service } from '@/data/services'

export function ServiceRow({
  service,
  icon: Icon,
  tone,
  onPress,
}: {
  service: Service
  icon: LucideIcon
  tone: TileTone
  onPress: () => void
}) {
  return (
    <Row
      icon={Icon}
      tone={tone}
      align="start"
      title={service.name}
      titleClassName="text-[13px] leading-snug"
      subtitle={service.detail}
      subtitleClassName="text-[11px] leading-snug text-[#0B211B]/50"
      surface="inset"
      padding="comfortable"
      hoverClassName="hover:bg-[#0B211B]/[0.05]"
      showChevron={false}
      trailing={
        <>
          <span className="flex shrink-0 flex-col items-end pt-0.5">
            <span className="text-[12.5px] font-extrabold tabular-nums text-[#0B211B]">{service.from}</span>
            <span className="mt-0.5 text-[8.5px] font-extrabold uppercase tracking-[0.12em] text-[#0B211B]/35">
              from / visit
            </span>
          </span>
          <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
        </>
      }
      onClick={onPress}
    />
  )
}
