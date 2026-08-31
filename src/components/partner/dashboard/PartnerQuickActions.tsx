import { motion } from 'motion/react'
import { ReceiptText, Stethoscope, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Tile } from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'

function QuickTile({
  icon,
  tone,
  label,
  value,
  onClick,
}: {
  icon: LucideIcon
  tone: TileTone
  label: string
  value: string
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onClick={onClick}
      className="flex min-w-0 flex-1 flex-col items-start gap-2.5 rounded-2xl bg-[#0B211B]/[0.04] p-3.5 transition-colors hover:bg-[#0B211B]/[0.07]"
    >
      <Tile icon={icon} tone={tone} size="sm" />
      <span className="min-w-0">
        <span className="block truncate text-[12px] font-extrabold tracking-tight text-[#0B211B]">{label}</span>
        <span className="mt-0.5 block truncate text-[9.5px] font-bold text-[#0B211B]/45">{value}</span>
      </span>
    </motion.button>
  )
}

interface PartnerQuickActionsProps {
  staffCount: number
  sessionsCount: number
  onStaffClick: () => void
  onBillingClick: () => void
  onSessionsClick: () => void
}

export function PartnerQuickActions({
  staffCount,
  sessionsCount,
  onStaffClick,
  onBillingClick,
  onSessionsClick,
}: PartnerQuickActionsProps) {
  return (
    <div className="flex gap-2.5">
      <QuickTile
        icon={Users}
        tone="info"
        label="Staff"
        value={`${staffCount} on Ayvaa`}
        onClick={onStaffClick}
      />
      <QuickTile
        icon={ReceiptText}
        tone="warning"
        label="Billing"
        value="Up to date"
        onClick={onBillingClick}
      />
      <QuickTile
        icon={Stethoscope}
        tone="ink"
        label="Sessions"
        value={`${sessionsCount} done`}
        onClick={onSessionsClick}
      />
    </div>
  )
}
