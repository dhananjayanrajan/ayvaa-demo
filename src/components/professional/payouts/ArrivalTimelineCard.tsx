import { Card } from '@/components/phone/kit'
import { StepList } from '@/components/phone/StepList'
import type { StepItem } from '@/components/phone/StepList'
import { AlertToggleRow } from './AlertToggleRow'
import { WITHDRAWAL_STEPS } from '@/data/payoutData'
import { cn } from '@/lib/utils'

export function ArrivalTimelineCard() {
  const steps: StepItem[] = WITHDRAWAL_STEPS.map((st, i) => {
    const last = i === WITHDRAWAL_STEPS.length - 1
    return {
      key: st.title,
      title: st.title,
      body: st.detail,
      state: st.done ? 'done' : st.active ? 'active' : 'pending',
      nodeClassName: cn(
        'mt-1 h-3.5 w-3.5',
        st.done ? 'bg-emerald-500' : 'bg-white',
      ),
      node: st.active ? (
        <span className="relative mt-1 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-white">
          <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-emerald-400/50" />
          <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
        </span>
      ) : undefined,
      railClassName: last
        ? undefined
        : 'bg-gradient-to-b from-emerald-500/50 via-emerald-400/25 to-emerald-300/15',
      contentClassName: last ? '' : 'pb-5',
      trailingTitle: (
        <span className="font-mono text-[10px] font-bold uppercase tabular-nums text-emerald-600">
          {st.when}
        </span>
      ),
    }
  })

  return (
    <Card>
      <div className="p-5">
        <StepList steps={steps} nodeStyle="dot" nodeSize="sm" activeStyle="ping" />
        <AlertToggleRow />
      </div>
    </Card>
  )
}
