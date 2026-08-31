import { Row } from '@/components/phone/Row'
import type { LucideIcon } from 'lucide-react'
import type { TileTone } from '@/components/phone/kit'

type Props = {
  icon: LucideIcon
  tone: TileTone
  title: string
  metaLabel: string
  metaValue: string
  onPress: () => void
}

export function PreferenceRow({ icon, tone, title, metaLabel, metaValue, onPress }: Props) {
  return (
    <Row
      icon={icon}
      tone={tone}
      title={title}
      titleClassName="text-[13px] font-extrabold"
      metaLabel={metaLabel}
      metaValue={metaValue}
      metaInline
      bodyClassName="pt-0.5"
      className="rounded-2xl px-2 py-3"
      onClick={onPress}
      showChevron={false}
      trailing={<ChevronRightLegacy />}
    />
  )
}

function ChevronRightLegacy() {
  return (
    <svg
      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0B211B]/20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
