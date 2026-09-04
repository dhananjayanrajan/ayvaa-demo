import { SearchX } from 'lucide-react'
import { EmptyState } from '@/components/base/phone/empty-state'
import { MATCH_REQUEST } from '@/data/patientMatching'

interface EmptyMatchesProps {
  language: string
  onClear: () => void
}

export function EmptyMatches({ language, onClear }: EmptyMatchesProps) {
  return (
    <EmptyState
      container="card"
      spacing="margin"
      padding="md"
      icon={SearchX}
      tone="amber"
      badge="square"
      size="sm"
      title={`No one in range speaks ${language}`}
      titleClassName="text-[14px] font-extrabold tracking-tight text-[#0B211B]"
      body={`Your language filter is hiding every caregiver within ${MATCH_REQUEST.radius}. Widen it to see the full match list.`}
      bodyClassName="text-[12px] leading-snug text-[#0B211B]/55 mx-auto max-w-[28ch] text-pretty"
      action={{ label: 'Show any language', onClick: onClear }}
      actionStyle="full"
    />
  )
}
