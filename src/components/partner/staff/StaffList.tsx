import { motion } from 'motion/react'
import { BadgeCheck, ChevronRight, PauseCircle } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { Card, Chip } from '@/components/phone/kit'
import { cn } from '@/lib/utils'
import type { StaffMember } from '@/data/types'

interface StaffListProps {
  members: StaffMember[]
  variant: 'active' | 'paused'
  onOpenStaff: (member: StaffMember) => void
}

export function StaffList({ members, variant, onOpenStaff }: StaffListProps) {
  return (
    <Card>
      {members.map((s, i) => (
        <div key={s.id}>
          {i > 0 && (
            <div
              aria-hidden
              className={cn(
                'h-px',
                variant === 'active' ? 'mx-4 bg-[#0B211B]/[0.05]' : 'border-t border-[#0B211B]/[0.05]',
              )}
            />
          )}
          <motion.button
            type="button"
            whileTap={{ scale: 0.985 }}
            onClick={() => onOpenStaff(s)}
            className={cn(
              'group flex w-full items-center gap-3 px-4 py-3.5 text-left outline-none transition-colors',
              'focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2',
            )}
          >
            {variant === 'active' ? (
              <span className="relative shrink-0">
                <AgentAvatar seed={s.name} size={44} />
                <span className="absolute -bottom-0.5 -right-0.5 grid h-4.5 w-4.5 place-items-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                  <BadgeCheck className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                </span>
              </span>
            ) : (
              <AgentAvatar seed={s.name} size={40} />
            )}
            <span className="min-w-0 flex-1">
              <span
                className={cn(
                  'block truncate font-bold tracking-tight text-[#0B211B]',
                  variant === 'active' ? 'text-[13.5px] leading-snug' : 'text-[13px]',
                )}
              >
                {s.name}
              </span>
              <span
                className={cn(
                  'mt-0.5 block truncate text-[#0B211B]/45',
                  variant === 'active' ? 'text-[11px] font-semibold' : 'text-[11px] font-medium',
                )}
              >
                {variant === 'active' ? s.role : s.note}
              </span>
            </span>
            {variant === 'active' ? (
              <ChevronRight
                className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600"
                aria-hidden
              />
            ) : (
              <Chip intent="neutral" icon={PauseCircle}>
                Paused
              </Chip>
            )}
          </motion.button>
        </div>
      ))}
    </Card>
  )
}
