import { Hero, Kicker } from '@/components/base/phone/kit'
import { AccountSearch } from '@/components/patterns/forms'
import { DirectoryMetrics } from '@/components/patterns/metrics/directory-metrics'
import { DirectoryStatus } from '@/components/patterns/misc/directory-status'

type Props = {
  onSelect: (name: string) => void
}

export function DirectoryHero({ onSelect }: Props) {
  return (
    <Hero className="overflow-visible">
      <Kicker>Directory · live</Kicker>
      <h2 className="mt-2 text-[19px] font-extrabold leading-snug tracking-tight text-white">
        One console,{' '}
        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">every account</span>
      </h2>
      <div className="relative z-30 mt-4">
        <AccountSearch onSelect={onSelect} />
      </div>
      <DirectoryMetrics />
      <DirectoryStatus />
    </Hero>
  )
}
