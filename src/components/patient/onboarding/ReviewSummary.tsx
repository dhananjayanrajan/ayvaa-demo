import { Check, Smartphone } from 'lucide-react'

export type ReviewEntry = { label: string; value: string }

export function ReviewSummary({
  entries,
  note,
}: {
  entries: ReviewEntry[]
  note: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl bg-[#0B231C] p-4">
        <div className="flex flex-col gap-3.5">
          {entries.map((entry) => (
            <div key={entry.label} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-100/45">
                  {entry.label}
                </div>
                <div className="mt-0.5 break-words text-[13px] font-bold tracking-tight text-emerald-50/90">
                  {entry.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2.5 rounded-xl bg-blue-500/[0.08] px-3.5 py-2.5">
        <Smartphone className="h-4 w-4 shrink-0 text-blue-600" aria-hidden />
        <p className="min-w-0 flex-1 text-pretty text-[10px] font-bold leading-snug text-blue-700">
          {note}
        </p>
      </div>
    </div>
  )
}
