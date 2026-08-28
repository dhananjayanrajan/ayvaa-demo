import { motion } from 'motion/react'
import { Clock, UserCheck, X } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { Card, Chip, Panel } from '@/components/phone/kit'
import type { StaffMember } from '@/data/types'

interface StaffApprovalCardProps {
  member: StaffMember
  onApprove: (id: string) => void
  onDecline: (id: string) => void
}

export function StaffApprovalCard({ member, onApprove, onDecline }: StaffApprovalCardProps) {
  return (
    <Card intent="warning">
      <div className="p-5">
        <div className="flex items-center gap-3.5">
          <span className="rounded-full ring-4 ring-amber-500/20">
            <AgentAvatar seed={member.name} size={52} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[15px] font-extrabold tracking-tight text-[#0B211B]">{member.name}</div>
            <div className="truncate text-xs font-semibold text-[#0B211B]/55">{member.role}</div>
          </div>
          <Chip intent="warning" dot icon={Clock}>
            Waiting
          </Chip>
        </div>

        <Panel intent="warning" className="mt-4 p-3.5">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-amber-700/70">Why they want in</div>
          <p className="mt-1.5 text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/75">{member.note}</p>
        </Panel>

        <div className="mt-4 flex gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => onDecline(member.id)}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-rose-500/[0.1] py-3.5 text-[13px] font-bold text-rose-600"
          >
            <X className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Decline</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => onApprove(member.id)}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <UserCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Approve</span>
          </motion.button>
        </div>
      </div>
    </Card>
  )
}
