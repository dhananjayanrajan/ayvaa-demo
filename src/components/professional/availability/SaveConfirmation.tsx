import { StatusStrip } from '@/components/phone/StatusStrip'

type Props = {
  openCount: number
}

export function SaveConfirmation({ openCount }: Props) {
  return <StatusStrip>Availability saved · {openCount} days open · visible to matching now</StatusStrip>
}
