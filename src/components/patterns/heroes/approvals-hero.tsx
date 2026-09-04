import { Chip, Hero, Kicker } from '@/components/base/phone/kit'

type Props = {
  pendingCount: number
}

export function ApprovalsHero({ pendingCount }: Props) {
  return (
    <Hero>
      <Kicker>Approvals · evidence-backed</Kicker>
      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Humans decide,{' '}
        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">evidence backs it</span>
      </h2>
      <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
        Licence, identity and history are verified before you ever see the file.
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        <Chip intent="neutral" light>{pendingCount} awaiting</Chip>
        <Chip intent="success" light>Auto checks live</Chip>
      </div>
    </Hero>
  )
}
