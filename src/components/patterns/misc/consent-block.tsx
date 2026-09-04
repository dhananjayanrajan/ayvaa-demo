import { motion } from 'motion/react'
import { Check, Clock, FileText } from 'lucide-react'
import { ChevronDown } from 'lucide-react'
import { Row } from '@/components/base/phone/row'
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
              <Row
                padding="px-3 py-2.5"
                leading={
                  <span
                    className={cn(
                      'grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors duration-300',
                      open ? 'bg-blue-500 text-white' : 'bg-blue-500/[0.1] text-blue-600',
                    )}
                  >
                    <FileText className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                  </span>
                }
                title={doc.title}
                titleClassName="text-[12px]"
                subtitle="Versioned document"
                subtitleClassName="mt-0.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40"
                expandable
                open={open}
                onToggle={() => onSelectDoc(open ? null : doc.id)}
                chevronVisible={false}
                hoverClassName=""
                whileTapDisabled
                trailing={
                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/30" aria-hidden />
                  </motion.span>
                }
                expansionPadded={false}
                expansion={
                  <p className="px-3.5 pb-3 text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
                    {doc.summary}
                  </p>
                }
              />
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
