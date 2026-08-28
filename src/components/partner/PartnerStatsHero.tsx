import { motion } from 'motion/react'
import { LiveDot, Chip } from '@/components/phone/kit'
import { UserPlus, BarChart3 } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { cn } from '@/lib/utils'

interface PartnerStatsHeroProps {
  partner: {
    name: string
    location: string
    referred: number
    activeCare: number
    staffOnAyvaa: number
    sessionsThisMonth: number
  }
  referrals: { status: 'active' | 'matching' }[]
  onOpenActivity: () => void
}

export function PartnerStatsHero({ partner, referrals, onOpenActivity }: PartnerStatsHeroProps) {
  const activeCount = referrals.filter((r) => r.status === 'active').length
  const matchingCount = referrals.length - activeCount

  const rail = [
    { label: 'Referred', value: partner.referred, width: 1, tone: 'success' as const },
    { label: 'Matching', value: matchingCount, width: Math.max(0.15, matchingCount / Math.max(1, partner.referred)), tone: 'warning' as const },
    { label: 'Staff', value: partner.staffOnAyvaa, width: Math.min(1, partner.staffOnAyvaa / 20), tone: 'info' as const },
  ]

  return (
    <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="relative shrink-0">
            <span aria-hidden className="absolute -inset-1 rounded-full bg-emerald-400/15 blur-md" />
            <span className="relative block">
              <AgentAvatar seed="sunrise" size={38} />
            </span>
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-extrabold tracking-tight text-white">Sunrise Multispeciality</div>
            <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-emerald-100/45">
              <LiveDot className="text-emerald-300" />
              Care partner since 2024
            </div>
          </div>
          <Chip intent="live" light dot className="border-transparent">
            Live
          </Chip>
        </div>

        <div className="mt-5 flex items-start justify-between gap-5">
          <div className="min-w-0 shrink">
            <span className="block bg-gradient-to-br from-emerald-200 via-teal-200 to-emerald-300 bg-clip-text text-[54px] font-black leading-none tracking-tighter text-transparent">
              {partner.activeCare}
            </span>
            <span className="mt-1.5 block text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-100/45">
              patients in care
            </span>
            <Chip intent="success" light icon={UserPlus} className="mt-2.5 border-transparent">
              +2 this week
            </Chip>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-3 pt-1">
            {rail.map((m) => (
              <div key={m.label}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-emerald-100/50">{m.label}</span>
                  <span className="text-[11px] font-extrabold tabular-nums text-emerald-50/85">{m.value}</span>
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.08]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.width * 100}%` }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className={cn(
                      'h-full rounded-full bg-gradient-to-r',
                      m.tone === 'success' && 'from-emerald-400 to-teal-300',
                      m.tone === 'warning' && 'from-amber-400 to-orange-300',
                      m.tone === 'info' && 'from-sky-400 to-blue-300',
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenActivity}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/[0.06] px-3.5 py-3 text-[11px] font-extrabold uppercase tracking-[0.1em] text-emerald-100/70 transition-colors hover:bg-white/[0.1]"
        >
          <BarChart3 className="h-4 w-4" strokeWidth={2.2} />
          View weekly activity
        </button>

        <div className="mt-3 flex items-center rounded-2xl bg-white/[0.06] px-3.5 py-3">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
            <span className="truncate text-[10px] font-extrabold uppercase tracking-[0.1em] text-emerald-100/60">
              {partner.referred} referred
            </span>
          </div>
          <span aria-hidden className="relative mx-2.5 h-px w-6 shrink-0 bg-emerald-300/40">
            <motion.span
              className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-teal-300"
              animate={{ x: [-4, 26], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
            <span className="truncate text-[10px] font-extrabold uppercase tracking-[0.1em] text-emerald-100/60">
              {partner.activeCare} in care
            </span>
          </div>
          <span aria-hidden className="relative mx-2.5 h-px w-6 shrink-0 bg-emerald-300/40">
            <motion.span
              className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-sky-300"
              animate={{ x: [-4, 26], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
            />
          </span>
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" />
            <span className="truncate text-[10px] font-extrabold uppercase tracking-[0.1em] text-emerald-100/60">
              {partner.sessionsThisMonth} sessions
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
