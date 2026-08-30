import { useState } from 'react'
import { ReceiptRow } from './ReceiptRow'
import type { Receipt } from '@/data/patientBilling'

interface ReceiptListProps {
  receipts: Receipt[]
}

export function ReceiptList({ receipts }: ReceiptListProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-2.5">
      {receipts.map((receipt) => (
        <ReceiptRow
          key={receipt.id}
          receipt={receipt}
          open={openId === receipt.id}
          onToggle={() => setOpenId((cur) => (cur === receipt.id ? null : receipt.id))}
        />
      ))}
    </div>
  )
}
