import { ReceiptText, Stethoscope, Users } from 'lucide-react'
import { ActionTile } from './tile-button'

export function PartnerQuickActions({
  staffCount,
  sessionsCount,
  onStaffClick,
  onBillingClick,
  onSessionsClick,
}: {
  staffCount: number
  sessionsCount: number
  onStaffClick: () => void
  onBillingClick: () => void
  onSessionsClick: () => void
}) {
  return (
    <div className="flex gap-2.5">
      <ActionTile icon={Users} tone="info" label="Staff" value={`${staffCount} on Ayvaa`} onClick={onStaffClick} />
      <ActionTile icon={ReceiptText} tone="warning" label="Billing" value="Up to date" onClick={onBillingClick} />
      <ActionTile icon={Stethoscope} tone="ink" label="Sessions" value={`${sessionsCount} done`} onClick={onSessionsClick} />
    </div>
  )
}
