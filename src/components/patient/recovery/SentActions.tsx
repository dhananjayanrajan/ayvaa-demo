import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Phone, RotateCcw } from 'lucide-react'
import { QuietLifecycleButton } from '@/components/phone/LifecycleButton'
import { guardian } from '@/data/seed'

export type CallState = 'idle' | 'working' | 'done'

export function SentActions({
  callState,
  onCall,
}: {
  callState: CallState
  onCall: () => void
}) {
  return (
    <div className="mt-3.5 flex gap-2.5">
      <motion.a
        href={`mailto:${guardian.email}`}
        whileTap={{ scale: 0.97 }}
        className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3 text-[12.5px] font-bold text-[#0B211B]/75"
      >
        <RotateCcw className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} aria-hidden />
        <span className="truncate">Open mail app</span>
      </motion.a>
      <QuietLifecycleButton
        phase={callState}
        idleIcon={Phone}
        idleLabel="Call instead"
        workingLabel="Requesting"
        doneLabel="Call requested"
        doneTone="tint"
        onPress={onCall}
      />
    </div>
  )
}
