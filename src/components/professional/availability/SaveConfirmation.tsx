import { ConfirmStrip } from '@/components/phone/ConfirmStrip'

type Props = {
  openCount: number
}

export function SaveConfirmation({ openCount }: Props) {
  return <ConfirmStrip>Availability saved · {openCount} days open · visible to matching now</ConfirmStrip>
}
