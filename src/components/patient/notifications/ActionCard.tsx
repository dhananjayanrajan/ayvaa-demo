import { ChevronRight, Clock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PhaseHero, PHASE_THEME } from '@/components/phone/PhaseHero'
import { Row } from '@/components/phone/Row'
import { JourneyTime } from '@/components/patient/identity/JourneyTime'
import type { NotificationEntry } from '@/data/patientNotifications'

export function ActionCard({
  entries,
  oldestLabel,
  onPress,
}: {
  entries: NotificationEntry[]
  oldestLabel: string
  onPress: (entry: NotificationEntry) => void
}) {
  return (
    <PhaseHero
      theme={{
        ...PHASE_THEME.amber,
        border: 'border-amber-200/10',
        shell: 'bg-[#241A0B]',
        hairline: 'via-amber-300/40',
        shadow: 'shadow-[0_28px_64px_-30px_rgba(60,40,10,0.7)]',
      }}
    >
      <div className="relative">
        <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-200/50">
          <Clock className="h-3 w-3" aria-hidden />
          Needs your action
        </div>
        <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          {entries.length} things{' '}
          <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">
            wait on you
          </span>
        </h3>
        <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-amber-100/70">
          Care continues as scheduled either way. These need your decision.
        </p>

        <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-amber-400/[0.12] px-3.5 py-3">
          <span aria-hidden className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-300" />
          </span>
          <span className="min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-amber-100">
            Oldest waits since {oldestLabel}
          </span>
          <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-amber-200/80">
            {entries.length} open
          </span>
        </div>

        <div className="mt-3 rounded-2xl bg-white/[0.06] p-3">
          <div className="flex flex-col gap-1">
            {entries.map((entry) => {
              const Icon: LucideIcon = entry.icon
              return (
                <Row
                  key={entry.key}
                  dark="white"
                  padding="px-2 py-2.5"
                  align="start"
                  leading={
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-400/15 text-amber-300">
                      <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                    </span>
                  }
                  title={entry.title}
                  titleClassName="text-[13px]"
                  subtitle={entry.body}
                  subtitleClassName="mt-0.5 text-pretty text-[11px] font-medium leading-snug text-amber-100/60"
                  onClick={() => onPress(entry)}
                  whileTapDisabled={false}
                  showChevron={false}
                  trailing={
                    <>
                      <JourneyTime value={entry.time} tone="amber" />
                      <ChevronRight className="h-4 w-4 shrink-0 text-amber-200/40" aria-hidden />
                    </>
                  }
                />
              )
            })}
          </div>
        </div>
      </div>
    </PhaseHero>
  )
}
