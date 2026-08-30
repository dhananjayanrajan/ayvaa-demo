import { AnimatePresence, motion } from 'motion/react'
import { PauseCircle, PlayCircle, X } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { Chip } from '@/components/phone/kit'
import type { StaffMember } from '@/data/types'

interface StaffDetailSheetProps {
  member: StaffMember | null
  onClose: () => void
  onStatusChange: (id: string, newStatus: 'active' | 'paused') => void
}

export function StaffDetailSheet({ member, onClose, onStatusChange }: StaffDetailSheetProps) {
  return (
    <AnimatePresence>
      {member && (
        <motion.div
          className="absolute inset-0 z-50 flex flex-col justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative rounded-t-[28px] bg-white p-5 pb-7 shadow-2xl"
          >
            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#0B211B]/10" />
            <div className="flex items-start gap-4">
              <span className="rounded-full ring-4 ring-emerald-500/20">
                <AgentAvatar seed={member.name} size={56} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[15px] font-extrabold tracking-tight text-[#0B211B]">{member.name}</h3>
                <p className="mt-0.5 truncate text-[13px] font-semibold text-[#0B211B]/60">{member.role}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Chip intent={member.status === 'active' ? 'success' : 'neutral'} dot>
                    {member.status === 'active' ? 'Active' : 'Paused'}
                  </Chip>
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
                    Joined {member.joinedAt ?? '—'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/5 text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/10 focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                aria-label="Close staff details"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
                <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Note</div>
                <p className="mt-1 text-[12.5px] font-medium leading-relaxed text-[#0B211B]/75">{member.note}</p>
              </div>
            </div>

            <div className="mt-5">
              {member.status === 'active' ? (
                <button
                  type="button"
                  onClick={() => onStatusChange(member.id, 'paused')}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-500/[0.1] py-3.5 text-[13px] font-bold text-amber-700 transition-transform active:scale-[0.98]"
                >
                  <PauseCircle className="h-4 w-4" aria-hidden />
                  Pause staff member
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onStatusChange(member.id, 'active')}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-transform active:scale-[0.98]"
                >
                  <PlayCircle className="h-4 w-4" aria-hidden />
                  Resume staff member
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
