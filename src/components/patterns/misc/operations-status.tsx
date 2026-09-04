import { Chip } from '@/components/base/phone/kit'

type Props = {
  openIncidents: number
}

export function OperationsStatus({ openIncidents }: Props) {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      <Chip intent="danger" light dot>
        {openIncidents} open incidents
      </Chip>
      <Chip intent="success" light>All systems normal</Chip>
    </div>
  )
}
