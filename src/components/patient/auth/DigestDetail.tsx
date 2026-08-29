import { Smartphone } from 'lucide-react'

export function DigestDetail({
  summary,
  facts,
  note,
}: {
  summary: string
  facts: { label: string; value: string }[]
  note: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl bg-[#0B231C] p-4">
        <p className="text-pretty text-[12px] font-medium leading-relaxed text-emerald-50/80">
          {summary}
        </p>
        <div className="mt-4 flex flex-col gap-3.5">
          {facts.map((fact) => (
            <div key={fact.label}>
              <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-100/45">
                {fact.label}
              </div>
              <div className="mt-0.5 break-words text-[13px] font-bold tracking-tight text-emerald-50/90">
                {fact.value}
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
