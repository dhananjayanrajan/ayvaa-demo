import { BadgeCheck, PauseCircle } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { Card, Chip } from '@/components/phone/kit'
import { Row } from '@/components/phone/Row'
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
                              )}
            />
          )}
          <Row
            leading={
              variant === 'active' ? (
                <span className="relative shrink-0">
                  <AgentAvatar seed={s.name} size={44} />
                  <span className="absolute -bottom-0.5 -right-0.5 grid h-4.5 w-4.5 place-items-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                    <BadgeCheck className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                  </span>
                </span>
              ) : (
                <AgentAvatar seed={s.name} size={44} />
              )
            }
            title={s.name}
            titleClassName={variant === 'active' ? 'text-[13.5px] leading-snug' : 'text-[13px]'}
            subtitle={variant === 'active' ? s.role : s.note}
            subtitleClassName={variant === 'active' ? 'text-[11px] font-semibold' : 'text-[11px] font-medium'}
            trailing={
              variant === 'active' ? undefined : (
                <Chip intent="neutral" icon={PauseCircle}>
                  Paused
                </Chip>
              )
            }
            onClick={() => onOpenStaff(s)}
            showChevron={variant === 'active'}
          />
        </div>
      ))}
    </Card>
  )
}
