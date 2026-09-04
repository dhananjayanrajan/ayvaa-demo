import { Card } from '@/components/base/phone/kit'
import { CertificationRow } from '../lists/certification-row'
import { AddCertificationRow } from '../lists/add-certification-row'

export type CertRecord = {
  name: string
  valid: boolean
  isNew?: boolean
}

type Props = {
  items: CertRecord[]
  onAdd: () => void
}

export function CertificationsCard({ items, onAdd }: Props) {
  return (
    <Card>
      <div className="flex flex-col gap-1 p-3">
        {items.map((c) => (
          <CertificationRow key={c.name} name={c.name} valid={c.valid} isNew={c.isNew} />
        ))}
        <div className="mt-1">
          <AddCertificationRow onPress={onAdd} />
        </div>
      </div>
    </Card>
  )
}
