import { ScrollText } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'
import { consentScopeRows } from '@/data/patientReview'
import { useRouter } from '@/lib/router'

interface ConsentScopeSheetProps {
  onClose: () => void
}

export function ConsentScopeSheet({ onClose }: ConsentScopeSheetProps) {
  const { navigate } = useRouter()

  return (
    <SheetShell
      icon={ScrollText}
      title="Consent scope"
      subtitle="Exactly what each approval allows"
      tone="info"
      onClose={onClose}
      footer={
        <button
          type="button"
          onClick={() => {
            onClose()
            navigate('/patient/p22')
          }}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-sky-600 py-3.5 text-[13px] font-bold text-white"
        >
          <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Full consent records
        </button>
      }
    >
      <div className="overflow-hidden rounded-2xl bg-[#0B211B]/[0.03]">
        {consentScopeRows().map((row, i) => (
          <div key={row.label}>
            {i > 0 && <div aria-hidden className="mx-3.5 h-px bg-[#0B211B]/[0.05]" />}
            <div className="flex items-baseline justify-between gap-3 px-3.5 py-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">{row.label}</span>
              <span className="truncate text-[12.5px] font-bold text-[#0B211B]/80">{row.value}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 pb-2 text-[11px] font-medium leading-relaxed text-[#0B211B]/50">
        Every consent is tied to your verified guardian account and visible in your records forever.
      </p>
    </SheetShell>
  )
}
