import { ChevronRight, Users } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'

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
        {staffList.map((staff, i) => (
          <div key={staff.name}>
            {i > 0 && <div className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
            <div className="flex items-center gap-3 px-1 py-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                <Users className="h-5 w-5" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13.5px] font-bold text-[#0B211B]">{staff.name}</div>
                <div className="text-xs font-medium text-[#0B211B]/55">{staff.role}</div>
              </div>
            </div>
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
