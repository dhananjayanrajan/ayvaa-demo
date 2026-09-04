import { ChevronRight, Users } from 'lucide-react'
import { SheetShell } from '@/components/base/phone/sheet-shell'
import { Row } from '@/components/base/phone/row'

interface StaffMember {
  name: string
  role: string
  seed: string
}

interface PartnerStaffSheetProps {
  staffList: StaffMember[]
  staffCount: number
  onClose: () => void
  onViewAllStaff: () => void
}

export function PartnerStaffSheet({ staffList, staffCount, onClose, onViewAllStaff }: PartnerStaffSheetProps) {
  return (
    <SheetShell
      icon={Users}
      tone="info"
      title="Staff on Ayvaa"
      subtitle={`${staffCount} team members active`}
      onClose={onClose}
      height="auto"
    >
      <div className="flex flex-col">
        {staffList.map((staff) => (
          <div key={staff.name}>
            <Row
              leading={
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                  <Users className="h-5 w-5" strokeWidth={2} />
                </span>
              }
              title={staff.name}
              subtitle={staff.role}
              subtitleClassName="truncate text-xs"
              surface="none"
              padding="none"
              className="px-1"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onViewAllStaff}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3 text-sm font-bold text-[#0B211B]/75"
      >
        View all staff
        <ChevronRight className="h-4 w-4" />
      </button>
    </SheetShell>
  )
}
