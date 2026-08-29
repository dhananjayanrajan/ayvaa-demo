import { useState } from 'react'
import { motion } from 'motion/react'
import {
  ChevronDown,
  Siren,
} from 'lucide-react'
import {
  Card,
  Expand,
  Panel,
  Tile,
  TimeChip,
  rise,
} from '@/components/phone/kit'
import { cn } from '@/lib/utils'

const failsafeSteps: { time: string; dot: string; text: string }[] = [
  { time: '9:45', dot: 'bg-amber-500', text: 'Care team paged personally' },
  { time: '9:46', dot: 'bg-sky-500', text: 'Wider radius re-broadcast' },
  { time: '9:47', dot: 'bg-emerald-500', text: 'Family sees steps live' },
]

export function FailsafeCard() {
  const [open, setOpen] = useState(false)

  return (
    <motion.div variants={rise}>
      <Card intent="warning">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center gap-3 p-4 text-left"
        >
          <Tile icon={Siren} tone="warning" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold tracking-tight text-[#0B211B]">The 9:45 failsafe</span>
            <span className="mt-0.5 block text-xs font-medium leading-relaxed text-[#0B211B]/55">
              No acceptance by 9:45 · the team gets paged personally
            </span>
          </span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
            <ChevronDown className="h-4 w-4 text-amber-600/70" aria-hidden />
          </motion.span>
        </button>
        <Expand open={open}>
          <div className="px-4 pb-4">
            <Panel intent="warning" className="p-3.5">
              <div className="flex flex-col gap-2.5">
                {failsafeSteps.map((s) => (
                  <div key={s.time} className="flex items-center gap-2.5">
                    <TimeChip>{s.time}</TimeChip>
                    <span aria-hidden className={cn('h-1.5 w-1.5 shrink-0 rounded-full', s.dot)} />
                    <span className="min-w-0 flex-1 truncate text-xs font-semibold text-[#0B211B]/80">{s.text}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] font-medium leading-relaxed text-[#0B211B]/50">
                The family watches each step unfold on their re-dispatch screen.
              </p>
            </Panel>
          </div>
        </Expand>
      </Card>
    </motion.div>
  )
}
