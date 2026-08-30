import { useState } from 'react'
import { motion } from 'motion/react'
import { Clock, Loader2, ShieldCheck, UserCheck, X } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { Card, Chip, Panel } from '@/components/phone/kit'
import { cn } from '@/lib/utils'
import type { StaffMember } from '@/data/types'

interface StaffApprovalCardProps {
  member: StaffMember
  onApprove: (id: string) => void
  onDecline: (id: string) => void
}

export function StaffApprovalCard({ member, onApprove, onDecline }: StaffApprovalCardProps) {
  const [processing, setProcessing] = useState<'approve' | 'decline' | null>(null)

  const handleApprove = () => {
    if (processing) return
    setProcessing('approve')
    onApprove(member.id)
  }

  const handleDecline = () => {
    if (processing) return
    setProcessing('decline')
    onDecline(member.id)
  }

  return (
    <Card intent="warning">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-amber-700/70">
            Approval request
          </span>
          <Chip intent="warning" dot icon={Clock}>
            Waiting
          </Chip>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="rounded-full ring-4 ring-amber-500/20">
            <AgentAvatar seed={member.name} size={52} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-extrabold tracking-tight text-[#0B211B]">{member.name}</div>
            <div className="truncate text-xs font-semibold text-[#0B211B]/55">{member.role}</div>
          </div>
        </div>

        <Panel intent="warning" className="mt-4 p-3.5">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-amber-700/70">Why they want in</div>
          <p className="mt-1.5 text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/75">{member.note}</p>
        </Panel>

        <div className="mt-4 rounded-2xl bg-amber-500/[0.06] p-3.5">
          <div className="flex items-center gap-2 text-[11px] font-bold text-[#0B211B]/70">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-600" aria-hidden />
            Verification progress
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="h-1.5 flex-1 rounded-full bg-amber-500" />
            <span className="h-1.5 flex-1 rounded-full bg-amber-500/30" />
            <span className="h-1.5 flex-1 rounded-full bg-amber-500/30" />
          </div>
          <div className="mt-2 flex justify-between text-[9px] font-semibold text-[#0B211B]/40">
            <span>Submitted</span>
            <span>Background</span>
            <span>Decision</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2.5">
          <motion.button
            type="button"
            whileTap={processing ? undefined : { scale: 0.97 }}
            onClick={handleDecline}
            disabled={processing !== null}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-rose-500/[0.1] py-3.5 text-[13px] font-bold text-rose-600 transition-opacity',
              processing && 'opacity-50',
            )}
          >
            {processing === 'decline' ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <X className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            )}
            <span className="truncate">{processing === 'decline' ? 'Declining…' : 'Decline'}</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={processing ? undefined : { scale: 0.97 }}
            onClick={handleApprove}
            disabled={processing !== null}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-opacity',
              processing && 'opacity-50',
            )}
          >
            {processing === 'approve' ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <UserCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            )}
            <span className="truncate">{processing === 'approve' ? 'Approving…' : 'Approve'}</span>
          </motion.button>
        </div>
      </div>
    </Card>
  )
}
