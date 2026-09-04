import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Syringe } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/base/phone/kit'
import { LifecycleButton } from '@/components/base/phone/lifecycle-button'
import { useDemo } from '@/lib/store'

interface RefillCardProps {
  medName: string
  dose: string
  dosesLeft: number
  eveningWindow: string
}

export function RefillCard({ medName, dose, dosesLeft, eveningWindow }: RefillCardProps) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const request = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 850))
    timers.current.push(
      setTimeout(
        () => notify({ title: 'Refill requested', body: `Pharmacy order created for ${medName}, nurse informed`, kind: 'ok' }),
        950,
      ),
    )
  }

  return (
    <Card>
      <div aria-hidden className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-400" />
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <Tile icon={Syringe} tone="warning" size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Refill needed</span>
              <Chip intent="warning" dot>
                Low stock
              </Chip>
            </div>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              {medName} {dose} has {dosesLeft} doses left before the {eveningWindow} round.
            </p>
          </div>
        </div>

        <LifecycleButton
          phase={phase}
          tone="warning"
          className="mt-4"
          idleLabel="Request refill"
          workingLabel="Sending request…"
          doneLabel="Refill requested"
          onPress={request}
        />

        <AnimatePresence>
          {phase === 'done' && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mt-3 flex items-center gap-2.5 rounded-xl bg-emerald-500/[0.1] px-3.5 py-3"
            >
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
              </span>
              <span className="min-w-0 text-[10.5px] font-bold text-emerald-800">
                Order sent to the pharmacy and the nurse can adjust tonight if it lands late
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  )
}
