import AgentAvatar from '@/components/smoothui/agent-avatar'
import { Hero, Kicker, Stat } from '@/components/phone/kit'
import { cn } from '@/lib/utils'
import type { StaffMember } from '@/data/types'

interface StaffHeroProps {
  activeMembers: StaffMember[]
  pendingCount: number
  pausedCount: number
}

export function StaffHero({ activeMembers, pendingCount, pausedCount }: StaffHeroProps) {
  const total = activeMembers.length + pendingCount + pausedCount
  return (
    <Hero>
      <Kicker>Team roster · Sunrise panel</Kicker>
      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Your people,{' '}
        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">on Ayvaa</span>
      </h2>
      <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
        You approve who represents Sunrise. Ayvaa verifies everyone before their first session.
      </p>

      <div className="-mt-1 mt-4 flex items-center">
        {activeMembers.slice(0, 3).map((s, i) => (
          <span key={s.id} className={cn('rounded-full ring-2 ring-[#0B231C]', i > 0 && '-ml-2.5')}>
            <AgentAvatar seed={s.name} size={36} />
          </span>
        ))}
        {activeMembers.length > 3 && (
          <span className="-ml-2.5 grid h-9 w-9 place-items-center rounded-full bg-white/[0.1] text-[10px] font-extrabold text-emerald-100 ring-2 ring-[#0B231C]">
            +{activeMembers.length - 3}
          </span>
        )}
        <span className="ml-auto text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-100/40">
          {total} total
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
        <Stat label="Active" value={activeMembers.length} dot="bg-emerald-300" />
        <Stat label="Pending" value={pendingCount} dot="bg-amber-300" />
        <Stat label="Paused" value={pausedCount} dot="bg-white/40" />
      </div>
    </Hero>
  )
}
