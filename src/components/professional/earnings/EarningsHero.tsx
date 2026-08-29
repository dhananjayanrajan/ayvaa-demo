import { Check, ShieldCheck, Wallet } from 'lucide-react'
import { Chip } from '@/components/phone/kit'
import type { WithdrawStatus } from './WithdrawButton'
import { cn } from '@/lib/utils'

type Props = {
  available: string
  status: WithdrawStatus
  thisWeek: string
  sessions: number
  nextPayout: string
  payoutSessions: number
  payoutAmount: string
}

export function EarningsHero({ available, status, thisWeek, sessions, nextPayout, payoutSessions, payoutAmount }: Props) {
  const confirmed = status === 'confirmed'
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[26px] border p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)] transition-colors duration-500',
        confirmed ? 'border-emerald-200/10 bg-[#062419]' : 'border-blue-200/10 bg-[#0A1B26]',
      )}
    >
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full blur-3xl transition-colors duration-500',
          confirmed ? 'bg-emerald-400/25' : 'bg-blue-400/20',
        )}
      />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full blur-3xl transition-colors duration-500',
          confirmed ? 'bg-teal-300/15' : 'bg-sky-300/10',
        )}
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <span className={cn('text-[9px] font-extrabold uppercase tracking-[0.22em]', confirmed ? 'text-emerald-200/50' : 'text-blue-200/50')}>
            Available to withdraw
          </span>
          <Chip intent={confirmed ? 'success' : 'info'} light icon={confirmed ? Check : ShieldCheck} className="shrink-0 border-transparent">
            {confirmed ? 'Withdrawn' : 'All verified'}
          </Chip>
        </div>

        <div className="mt-2 flex items-baseline gap-1.5">
          <span className={cn('text-[18px] font-extrabold', confirmed ? 'text-emerald-200/80' : 'text-blue-200/80')}>₹</span>
          <span className="text-[38px] font-extrabold leading-none tracking-tight text-white">{available.replace('₹', '')}</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-white/[0.06] px-4 py-3">
            <div className={cn('text-[9px] font-bold uppercase tracking-[0.14em]', confirmed ? 'text-emerald-200/50' : 'text-blue-200/50')}>
              This week
            </div>
            <div className="mt-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">{thisWeek}</div>
          </div>
          <div className="rounded-2xl bg-white/[0.06] px-4 py-3">
            <div className={cn('text-[9px] font-bold uppercase tracking-[0.14em]', confirmed ? 'text-emerald-200/50' : 'text-blue-200/50')}>
              Sessions
            </div>
            <div className="mt-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">{sessions}</div>
          </div>
        </div>

        <div className="mt-2 flex items-start gap-3 rounded-2xl bg-white/[0.06] p-3.5">
          <span
            className={cn(
              'grid h-8 w-8 shrink-0 place-items-center rounded-xl',
              confirmed ? 'bg-emerald-400/15 text-emerald-200' : 'bg-blue-400/15 text-blue-200',
            )}
          >
            <Wallet className="h-4 w-4" strokeWidth={2.2} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <div className={cn('text-[9px] font-bold uppercase tracking-[0.14em]', confirmed ? 'text-emerald-200/50' : 'text-blue-200/50')}>
              Next payout
            </div>
            <div className="mt-1 text-[13px] font-extrabold tracking-tight text-white">{nextPayout}</div>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2 rounded-2xl bg-white/[0.06] px-4 py-3">
          <div>
            <div className={cn('text-[9px] font-bold uppercase tracking-[0.14em]', confirmed ? 'text-emerald-200/50' : 'text-blue-200/50')}>
              Sessions
            </div>
            <div className="mt-1 text-[13px] font-extrabold tabular-nums leading-none text-white">{payoutSessions}</div>
          </div>
          <div>
            <div className={cn('text-[9px] font-bold uppercase tracking-[0.14em]', confirmed ? 'text-emerald-200/50' : 'text-blue-200/50')}>
              Worth
            </div>
            <div className="mt-1 text-[13px] font-extrabold tabular-nums leading-none text-white">{payoutAmount}</div>
          </div>
          <div>
            <div className={cn('text-[9px] font-bold uppercase tracking-[0.14em]', confirmed ? 'text-emerald-200/50' : 'text-blue-200/50')}>
              Fee
            </div>
            <div className="mt-1 text-[13px] font-extrabold uppercase leading-none text-white">Zero</div>
          </div>
        </div>
      </div>
    </div>
  )
}
