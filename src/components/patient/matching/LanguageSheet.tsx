import { useEffect, useRef, useState } from 'react'
import { Languages } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'
import { LifecycleButton } from '@/components/phone/LifecycleButton'
import { OptionRow, OptionCheck } from '@/components/phone/OptionRow'
import { LANGUAGE_OPTIONS, speakersIn, type MatchCaregiver } from '@/data/patientMatching'

interface LanguageSheetProps {
  current: string
  list: MatchCaregiver[]
  onApply: (language: string) => void
  onClose: () => void
}

export function LanguageSheet({ current, list, onApply, onClose }: LanguageSheetProps) {
  const [selected, setSelected] = useState(current)
  const [phase, setPhase] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => { timers.current.forEach(clearTimeout) }, [])

  const unchanged = selected === current
  const apply = () => {
    if (unchanged || phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 650))
    timers.current.push(setTimeout(() => onApply(selected), 1350))
  }

  return (
    <SheetShell
      icon={Languages}
      title="Preferred language"
      subtitle="Only caregivers speaking your choice stay in the match list"
      tone={phase === 'done' ? 'success' : 'info'}
      onClose={onClose}
      footer={
        <LifecycleButton
          phase={phase}
          tone="info"
          gated={unchanged}
          idleLabel={unchanged ? 'Current selection' : 'Apply language'}
          workingLabel="Applying…"
          doneLabel="Filter applied"
          onPress={apply}
        />
      }
    >
      <div role="radiogroup" aria-label="Preferred language" className="flex flex-col gap-2 pb-2">
        {LANGUAGE_OPTIONS.map((lang) => {
          const isSel = selected === lang
          const count = speakersIn(list, lang)
          return (
            <OptionRow
              key={lang}
              role="radio"
              selected={isSel}
              onSelect={() => { if (phase === 'idle') setSelected(lang) }}
              disabled={phase !== 'idle'}
              title={lang}
              sub={`${count} in range`}
              tone="sky"
              trailing={<OptionCheck on={isSel} accent="sky" />}
            />
          )
        })}
      </div>
    </SheetShell>
  )
}
