import { ConfirmStrip } from '@/components/phone/ConfirmStrip'

type Props = {
  certName: string
  matchedCategory: string | null
}

export function UploadConfirmation({ certName, matchedCategory }: Props) {
  return (
    <ConfirmStrip>
      {certName} submitted for review.
      {matchedCategory ? ` ${matchedCategory} matching activates once verified.` : ' In review with Ayvaa now.'}
    </ConfirmStrip>
  )
}
