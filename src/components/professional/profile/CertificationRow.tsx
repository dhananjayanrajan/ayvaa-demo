import { Award } from 'lucide-react'
import { Row } from '@/components/phone/Row'

type Props = {
  name: string
  valid: boolean
  isNew?: boolean
}

const statusText = (valid: boolean) =>
  valid ? 'Verified by Ayvaa, currently valid' : 'Uploaded, review completes within 2 days'

export function CertificationRow({ name, valid, isNew }: Props) {
  return (
    <Row
      icon={Award}
      tone={isNew ? 'success' : 'neutral'}
      title={name}
      titleClassName="text-[13px] font-extrabold"
      subtitle={statusText(valid)}
      subtitleClassName="truncate text-[10.5px] font-semibold text-[#0B211B]/45"
      chip={{
        label: isNew ? 'Just added' : valid ? 'Valid' : 'In review',
        intent: isNew ? 'live' : valid ? 'success' : 'warning',
        dot: isNew || !valid,
      }}
      bodyClassName="pt-0.5"
      fresh={isNew}
      surface={isNew ? 'tint' : 'none'}
      surfaceTone={isNew ? 'rounded-2xl bg-emerald-500/[0.06]' : undefined}
      className={isNew ? undefined : 'rounded-2xl px-2 py-3'}
      showChevron={false}
    />
  )
}
