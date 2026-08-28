import { Lock } from 'lucide-react'

export function PerformancePrivacyNote() {
  return (
    <div className="flex items-start gap-2.5 rounded-2xl bg-[#0B211B]/[0.035] px-4 py-3">
      <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600/70" strokeWidth={2.4} aria-hidden />
      <p className="min-w-0 flex-1 text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
        Feedback reaches partners only after the family approves sharing. Reviews are never edited.
      </p>
    </div>
  )
}
