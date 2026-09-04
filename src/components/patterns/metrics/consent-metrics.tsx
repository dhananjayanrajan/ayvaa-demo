import { Stat } from '@/components/base/phone/kit'

type Props = {
  active: string | number
  due: string | number
  withdrawn: string | number
}

export function ConsentMetrics({ active, due, withdrawn }: Props) {
  return (
    <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
      <Stat label="Active" value={active} dot="bg-emerald-300" />
      <Stat label="Due" value={due} dot="bg-amber-300" />
      <Stat label="Withdrawn" value={withdrawn} dot="bg-rose-300/80" />
    </div>
  )
}
