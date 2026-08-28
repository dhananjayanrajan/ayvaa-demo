import { motion } from 'motion/react'
import { X, Users, ChevronRight } from 'lucide-react'
import { Tile } from '@/components/phone/kit'

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
    <motion.div
      key="staff-sheet"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
      className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
    >
      <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />
      <div className="flex items-start gap-3">
        <Tile icon={Users} tone="info" size="lg" />
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Staff on Ayvaa</div>
          <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">{staffCount} team members active</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
          aria-label="Close staff list"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

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
    </motion.div>
  )
}
