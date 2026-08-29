import { Landmark, ShieldCheck } from 'lucide-react'
import { Chip, Kicker } from '@/components/phone/kit'

type Props = {
  total: number
  sessions: number
  perSession: number
}

export function WithdrawHero({ total, sessions, perSession }: Props) {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <Kicker>Payout breakdown</Kicker>
          <Chip intent="success" light icon={ShieldCheck} className="shrink-0 border-transparent">
            Ready now
          </Chip>
        </div>

        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="text-[18px] font-extrabold text-emerald-200/80">₹</span>
          <span className="text-[38px] font-extrabold leading-none tracking-tight text-white">{total.toLocaleString('en-IN')}</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-white/[0.06] px-4 py-3">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-200/50">Sessions</div>
            <div className="mt-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">{sessions}</div>
          </div>
          <div className="rounded-2xl bg-white/[0.06] px-4 py-3">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-200/50">Per session</div>
            <div className="mt-1.5 text-[15px] font-extrabold tabular-nums leading-none text-white">
              {`₹${perSession.toLocaleString('en-IN')}`}
            </div>
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-2.5 rounded-2xl bg-white/[0.04] p-3.5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Gross</span>
            <span className="min-w-0 text-right font-mono text-[12.5px] font-bold tabular-nums text-emerald-50/90">
              {`₹${total.toLocaleString('en-IN')}`}
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">Platform fee</span>
            <span className="min-w-0 text-right font-mono text-[12.5px] font-bold tabular-nums text-emerald-300">₹0</span>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl bg-emerald-400/[0.12] px-3 py-2.5">
            <span className="flex min-w-0 items-center gap-1.5">
              <Landmark className="h-3.5 w-3.5 shrink-0 text-emerald-300" strokeWidth={2.4} aria-hidden />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-emerald-100">Net to bank</span>
            </span>
            <span className="shrink-0 font-mono text-[15px] font-black tabular-nums tracking-tight text-white">
              {`₹${total.toLocaleString('en-IN')}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
