import { Check } from 'lucide-react'
import { Chip } from '@/components/phone/kit'
import { SHEET_MODES, type SheetMode } from '@/data/sheetData'
import { cn } from '@/lib/utils'

type Props = {
  saved: SheetMode[]
  activeMode: SheetMode
  activeProgress: { done: number; total: number }
}

export function EntrySheetsHero({ saved, activeMode, activeProgress }: Props) {
  const complete = saved.length === SHEET_MODES.length
  const draftInProgress = !saved.includes(activeMode) && activeProgress.done > 0
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[26px] border p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]',
        complete ? 'border-emerald-200/10 bg-[#062419]' : 'border-blue-200/10 bg-[#0A1B26]',
      )}
    >
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full blur-3xl',
          complete ? 'bg-emerald-400/25' : 'bg-blue-400/20',
        )}
      />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full blur-3xl',
          complete ? 'bg-teal-300/15' : 'bg-sky-300/10',
        )}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span
            className={cn(
              'text-[9px] font-extrabold uppercase tracking-[0.22em]',
              complete ? 'text-emerald-200/50' : 'text-blue-200/50',
            )}
          >
            Entry sheets
          </span>
          <Chip
            intent={complete ? 'success' : draftInProgress ? 'warning' : 'live'}
            light
            dot={!complete}
            className="border-transparent"
          >
            {complete ? 'All recorded' : draftInProgress ? 'Draft in progress' : 'Visit live'}
          </Chip>
        </div>

        <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          {saved.length} of 3 sheets{' '}
          <span
            className={cn(
              'bg-gradient-to-r bg-clip-text text-transparent',
              complete ? 'from-emerald-300 to-teal-200' : 'from-sky-300 to-blue-200',
            )}
          >
            recorded
          </span>
        </h2>

        <div className="mt-4 flex gap-1.5">
          {SHEET_MODES.map((m) => (
            <span
              key={m.id}
              className={cn(
                'h-1.5 flex-1 rounded-full',
                saved.includes(m.id) ? 'bg-gradient-to-r from-emerald-400 to-teal-300' : 'bg-white/10',
              )}
            />
          ))}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {SHEET_MODES.map((m) => {
            const done = saved.includes(m.id)
            const drafting = m.id === activeMode && draftInProgress
            const Icon = m.icon
            return (
              <div
                key={m.id}
                className={cn(
                  'rounded-2xl px-3 py-2.5 transition-colors',
                  done ? 'bg-emerald-400/[0.12]' : drafting ? 'bg-amber-300/[0.08]' : 'bg-white/[0.06]',
                )}
              >
                <div className="flex items-center justify-between">
                  <Icon
                    className={cn(
                      'h-3.5 w-3.5',
                      done ? 'text-emerald-300' : drafting ? 'text-amber-200/80' : 'text-white/40',
                    )}
                    strokeWidth={2.4}
                    aria-hidden
                  />
                  {done ? (
                    <Check className="h-3 w-3 text-emerald-300" strokeWidth={3.5} aria-hidden />
                  ) : drafting ? (
                    <span className="text-[9px] font-extrabold tabular-nums text-amber-200/80">
                      {activeProgress.done}/{activeProgress.total}
                    </span>
                  ) : null}
                </div>
                <div
                  className={cn(
                    'mt-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em]',
                    done ? 'text-emerald-100' : drafting ? 'text-amber-100/80' : 'text-white/45',
                  )}
                >
                  {m.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
