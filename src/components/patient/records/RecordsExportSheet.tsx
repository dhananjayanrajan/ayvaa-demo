import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Download, FileText, Loader2, ScrollText } from 'lucide-react'
import { SheetShell } from '@/components/patient/matching/SheetShell'
import { AUDIT_ENTRIES, RECORD_DOCS, VAULT_FACTS, buildExportLines } from '@/data/patientRecords'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

type Phase = 'idle' | 'working' | 'done'

interface RecordsExportSheetProps {
  onClose: () => void
}

export function RecordsExportSheet({ onClose }: RecordsExportSheetProps) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const urlRef = useRef<string | null>(null)
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout)
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    },
    [],
  )

  const exportRecords = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(
      setTimeout(() => {
        const blob = new Blob([buildExportLines(RECORD_DOCS, AUDIT_ENTRIES)], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        urlRef.current = url
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = 'ayvaa-care-records.txt'
        anchor.click()
        setPhase('done')
      }, 900),
    )
    timers.current.push(
      setTimeout(
        () => notify({ title: 'Export saved', body: 'The private export landed in your downloads', kind: 'ok' }),
        1000,
      ),
    )
    timers.current.push(
      setTimeout(() => {
        if (urlRef.current) {
          URL.revokeObjectURL(urlRef.current)
          urlRef.current = null
        }
      }, 4000),
    )
  }

  return (
    <SheetShell
      icon={Download}
      tone={phase === 'done' ? 'success' : 'info'}
      title={phase === 'done' ? 'Export saved' : 'Export records'}
      subtitle="A private copy, watermarked to you"
      onClose={onClose}
      footer={
        <div>
          <motion.button
            type="button"
            whileTap={phase === 'idle' ? { scale: 0.97 } : undefined}
            onClick={exportRecords}
            disabled={phase !== 'idle'}
            aria-disabled={phase !== 'idle'}
            className={cn(
              'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-colors',
              phase === 'done'
                ? 'bg-emerald-600'
                : phase === 'working'
                  ? 'cursor-wait bg-emerald-600/60'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
            )}
          >
            {phase === 'working' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                <span className="truncate">Preparing file…</span>
              </>
            ) : phase === 'done' ? (
              <>
                <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                <span className="truncate">Saved to downloads</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Download private export</span>
              </>
            )}
          </motion.button>
          <p className="mt-2 text-center text-[10px] font-bold text-[#0B211B]/45">
            The export itself is logged to the audit ledger
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-5 pb-2">
        <div>
          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/40">
            <FileText className="h-3 w-3" aria-hidden />
            Included in the file
          </div>
          <div className="mt-3 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="shrink-0 text-[12px] font-semibold text-[#0B211B]/65">Documents</span>
                <span className="shrink-0 text-[12.5px] font-bold text-[#0B211B]/80 tabular-nums">
                  {RECORD_DOCS.length}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="shrink-0 text-[12px] font-semibold text-[#0B211B]/65">Audit ledger entries</span>
                <span className="shrink-0 text-[12.5px] font-bold text-[#0B211B]/80 tabular-nums">
                  {AUDIT_ENTRIES.length}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="shrink-0 text-[12px] font-semibold text-[#0B211B]/65">Consent records</span>
                <span className="shrink-0 text-[12.5px] font-bold text-[#0B211B]/80">Summary</span>
              </div>
            </div>
            <p className="mt-3.5 break-words text-[10.5px] font-medium leading-snug text-[#0B211B]/50">
              Locked documents export as sealed placeholders until consent unlocks them.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-[#0B231C] p-5">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Chain of custody</div>
          <p className="mt-2.5 break-words text-[12px] font-medium leading-relaxed text-emerald-100/60">
            The export is tied to {VAULT_FACTS.patientFirst}&apos;s record and to your account. Whoever opens the file
            later is your responsibility, but Ayvaa&apos;s ledger always shows that it left the vault today.
          </p>
        </div>
      </div>
    </SheetShell>
  )
}
