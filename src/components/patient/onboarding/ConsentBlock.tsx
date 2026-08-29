import { motion } from 'motion/react'
import { Check, ChevronDown, Clock, FileText } from 'lucide-react'
import { Expand } from '@/components/phone/kit'
import { cn } from '@/lib/utils'
import { termsDocs } from '@/data/patientOnboarding'

export function ConsentBlock({
  accepted,
  onToggle,
  openDocId,
  onSelectDoc,
}: {
  accepted: boolean
  onToggle: () => void
  openDocId: string | null
  onSelectDoc: (id: string | null) => void
}) {
  return (
    <div className="rounded-3xl border border-[#0B211B]/[0.06] bg-white p-4 shadow-[0_1px_2px_rgba(11,33,27,0.06),0_16px_36px_-24px_rgba(11,33,27,0.25)]">
      <button
        type="button"
        role="checkbox"
        aria-checked={accepted}
        onClick={onToggle}
        className="flex w-full items-start gap-3 text-left"
      >
        <span
          className={cn(
            'mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-xl transition-colors duration-300',
            accepted ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.08] text-transparent',
          )}
        >
          <Check className="h-3.5 w-3.5" strokeWidth={3.5} aria-hidden />
        </span>
        <span className="min-w-0 flex-1 text-pretty text-[12.5px] font-semibold leading-relaxed text-[#0B211B]/75">
          I accept both documents below and consent to identity verification.
        </span>
      </button>

      <div className="mt-3 flex flex-col gap-2">
        {termsDocs.map((doc) => {
          const open = openDocId === doc.id
          return (
            <div key={doc.id} className="rounded-2xl bg-[#0B211B]/[0.03]">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => onSelectDoc(open ? null : doc.id)}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-left"
              >
                <span
                  className={cn(
                    'grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors duration-300',
                    open ? 'bg-blue-500 text-white' : 'bg-blue-500/[0.1] text-blue-600',
                  )}
                >
                  <FileText className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12px] font-bold tracking-tight text-[#0B211B]">
                    {doc.title}
                  </span>
                  <span className="mt-0.5 block text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">
                    Versioned document
                  </span>
                </span>
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0"
                >
                  <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/30" aria-hidden />
                </motion.span>
              </button>
              <Expand open={open}>
                <p className="px-3.5 pb-3 text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
                  {doc.summary}
                </p>
              </Expand>
            </div>
          )
        })}
      </div>

      <div
        className={cn(
          'mt-3 flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors duration-300',
          accepted ? 'bg-emerald-500/[0.08]' : 'bg-amber-500/[0.08]',
        )}
      >
        <span
          className={cn(
            'grid h-5 w-5 shrink-0 place-items-center rounded-full transition-colors duration-300',
            accepted ? 'bg-emerald-500 text-white' : 'bg-amber-500/[0.2] text-amber-600',
          )}
        >
          {accepted ? (
            <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
          ) : (
            <Clock className="h-3 w-3" strokeWidth={2.6} aria-hidden />
          )}
        </span>
        <p
          className={cn(
            'min-w-0 flex-1 text-pretty text-[10px] font-bold leading-snug transition-colors duration-300',
            accepted ? 'text-emerald-700' : 'text-amber-700',
          )}
        >
          {accepted
            ? 'Written to your consent record'
            : 'Acceptance pending — written to your consent record once checked'}
        </p>
      </div>
    </div>
  )
}
