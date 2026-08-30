import { useEffect, useRef, useState } from 'react'
import { Share2 } from 'lucide-react'
import { IconLifecycleButton } from '@/components/phone/LifecycleButton'
import { summaryShareText } from '@/data/patientVisitSummary'
import { useDemo } from '@/lib/store'

export function ShareSummaryButton() {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const share = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 700))
    timers.current.push(
      setTimeout(() => {
        void navigator.clipboard?.writeText(summaryShareText())
        notify({ title: 'Summary copied', body: 'Visit record copied to clipboard', kind: 'ok' })
      }, 1200),
    )
    timers.current.push(setTimeout(() => setPhase('idle'), 2600))
  }

  return (
    <IconLifecycleButton
      phase={phase}
      icon={Share2}
      revert
      ariaLabel="Share visit summary"
      onPress={share}
    />
  )
}
