import { cn } from '@/lib/utils'

export interface FactRow {
  label: string
  value: string
}

export function FactRows({
  rows,
  tone = 'dark',
  mono = false,
  labelClassName,
  valueClassName,
}: {
  rows: FactRow[]
  tone?: 'dark' | 'light'
  mono?: boolean
  labelClassName?: string
  valueClassName?: string
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {rows.map((row) => (
        <div key={row.label} className="flex items-baseline justify-between gap-3">
          <span
            className={cn(
              'shrink-0 text-[9px] font-bold uppercase',
              mono ? 'tracking-[0.12em]' : 'tracking-[0.14em]',
              tone === 'dark' ? 'text-emerald-100/45' : 'text-[#0B211B]/40',
              labelClassName
            )}
          >
            {row.label}
          </span>
          <span
            className={cn(
              'text-[12.5px] font-bold',
              mono ? 'min-w-0 truncate text-right font-mono' : 'truncate tabular-nums',
              tone === 'dark' ? 'text-emerald-50/90' : 'text-[#0B211B]/80',
              valueClassName
            )}
          >
            {row.value}
          </span>
        </div>
      ))}
    </div>
  )
}
