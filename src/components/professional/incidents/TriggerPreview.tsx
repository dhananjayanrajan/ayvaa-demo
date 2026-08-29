import { Chip } from '@/components/phone/kit'
import type { SeverityConfig } from './incidentData'
import { cn } from '@/lib/utils'

type Props = {
  config: SeverityConfig
  severity: string
}

export function TriggerPreview({ config, severity }: Props) {
  return (
    <div className={cn('relative overflow-hidden rounded-3xl p-4', config.panel.bg)}>
      <div aria-hidden className={cn('pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full blur-3xl', config.panel.glow)} />
      <div className="relative">
        <div className="flex items-center justify-between gap-2">
          <span className={cn('text-[9px] font-extrabold uppercase tracking-[0.18em]', config.panel.overline)}>
            What submitting triggers
          </span>
          <Chip intent={config.chipLight} light dot={severity !== 'Minor'} className="border-transparent">
            {severity}
          </Chip>
        </div>
        <div className="mt-3 flex flex-col gap-2.5">
          {config.effects.map((e) => {
            const Icon = e.icon
            return (
              <div key={e.text} className="flex items-start gap-3">
                <span className={cn('grid h-6 w-6 shrink-0 place-items-center rounded-lg', config.panel.dot)}>
                  <Icon className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                </span>
                <span className={cn('min-w-0 flex-1 pt-0.5 text-[12.5px] font-semibold leading-snug', config.panel.text)}>
                  {e.text}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
