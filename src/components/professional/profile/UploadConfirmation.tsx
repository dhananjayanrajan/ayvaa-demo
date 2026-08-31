import { StatusStrip } from '@/components/phone/StatusStrip'

type Props = {
  certName: string
  matchedCategory: string | null
}

export function UploadConfirmation({ certName, matchedCategory }: Props) {
  return (
    <StatusStrip>
      {certName} submitted for review.
      {matchedCategory ? ` ${matchedCategory} matching activates once verified.` : ' In review with Ayvaa now.'}
    </StatusStrip>
  )
}
