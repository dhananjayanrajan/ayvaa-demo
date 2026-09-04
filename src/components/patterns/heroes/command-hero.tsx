import { Chip, Hero, Kicker, Stat } from '@/components/base/phone/kit'

type Props = { stats: { label: string; value: string | number; dot: string }[] }

export function CommandHero({ stats }: Props) {
  return (
    <Hero>
      <div className="flex items-start justify-between gap-3">
        <Kicker>Live overview</Kicker>
        <Chip intent="live" light dot className="shrink-0 border-transparent">Real-time</Chip>
      </div>
      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Admin command center, <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">all systems nominal</span>
      </h2>
      <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">Oversight metrics derived from live operational data.</p>
      <div className="mt-4 grid grid-cols-3 divide-x divide-white/[0.08]">
        {stats.map((s) => <Stat key={s.label} label={s.label} value={s.value} dot={s.dot} />)}
      </div>
    </Hero>
  )
}
