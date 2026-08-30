export interface FactRow {
  label: string
  value: string
}

export function FactRows({ rows, tone = 'dark' }: { rows: FactRow[]; tone?: 'dark' | 'light' }) {
  return (
    <div className="flex flex-col gap-2.5">
      {rows.map((row) => (
        <div key={row.label} className="flex items-baseline justify-between gap-3">
          <span
            className={
              tone === 'dark'
                ? 'shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45'
                : 'shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40'
            }
          >
            {row.label}
          </span>
          <span
            className={
              tone === 'dark'
                ? 'truncate text-[12.5px] font-bold tabular-nums text-emerald-50/90'
                : 'truncate text-[12.5px] font-bold tabular-nums text-[#0B211B]/80'
            }
          >
            {row.value}
          </span>
        </div>
      ))}
    </div>
  )
}
