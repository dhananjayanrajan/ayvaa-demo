import { useEffect, useRef, useState } from 'react'
import { Share2 } from 'lucide-react'
import { IconLifecycleButton } from '@/components/phone/LifecycleButton'

export function ShareButton() {
  const [phase, setPhase] = useState<'idle' | 'done'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const share = () => {
    if (phase !== 'idle') return
    setPhase('done')
    timer.current = setTimeout(() => setPhase('idle'), 1800)
  }

  return (
    <IconLifecycleButton
      phase={phase}
      icon={Share2}
      revert
      ariaLabel={phase === 'done' ? 'Booking summary copied' : 'Share booking summary'}
      onPress={share}
    />
  )
}
