import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Languages, Loader2 } from 'lucide-react'
import { SheetShell } from './SheetShell'
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
        <motion.button
          type="button"
          whileTap={!unchanged && phase === 'idle' ? { scale: 0.985 } : undefined}
          onClick={apply}
          disabled={unchanged || phase !== 'idle'}
          aria-disabled={unchanged || phase !== 'idle'}
          className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-colors ${
            phase === 'done'
              ? 'bg-emerald-600'
              : phase === 'working'
                ? 'cursor-wait bg-sky-600/60'
                : unchanged
                  ? 'cursor-not-allowed bg-[#0B211B]/[0.08] text-[#0B211B]/40'
                  : 'bg-sky-600'
          }`}
        >
          {phase === 'idle' && (unchanged ? 'Current selection' : 'Apply language')}
          {phase === 'working' && (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Applying…
            </>
          )}
          {phase === 'done' && (
            <>
              <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden />
              Filter applied
            </>
          )}
        </motion.button>
      }
    >
      <div role="radiogroup" aria-label="Preferred language" className="flex flex-col gap-2 pb-2">
        {LANGUAGE_OPTIONS.map((lang) => {
          const isSel = selected === lang
          const count = speakersIn(list, lang)
          return (
            <button
              key={lang}
              type="button"
              role="radio"
              aria-checked={isSel}
              onClick={() => { if (phase === 'idle') setSelected(lang) }}
              className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors ${
                isSel ? 'bg-sky-500/[0.1]' : 'bg-[#0B211B]/[0.035]'
              }`}
            >
              <span className="min-w-0">
                <span className="block truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{lang}</span>
                <span className="mt-0.5 block text-[10px] font-bold tabular-nums text-[#0B211B]/40">{count} in range</span>
              </span>
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full transition-colors ${
                  isSel ? 'bg-sky-600 text-white' : 'bg-[#0B211B]/[0.08]'
                }`}
              >
                {isSel && <Check className="h-3 w-3" strokeWidth={3} aria-hidden />}
              </span>
            </button>
          )
        })}
      </div>
    </SheetShell>
  )
}
