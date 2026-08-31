import { motion } from 'motion/react'
import { Check, ChevronRight, FileText } from 'lucide-react'
import { Chip } from '@/components/phone/kit'
import type { HistorySession } from '@/data/historyData'

type Props = {
  session: HistorySession
  onOpen: () => void
}

export function SessionRecordCard({ session, onOpen }: Props) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onOpen}
      className="block w-full rounded-2xl bg-white p-5 text-left shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)] transition-shadow hover:shadow-[0_1px_2px_rgba(11,33,27,0.06),0_24px_52px_-22px_rgba(11,33,27,0.35)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[15px] font-extrabold tabular-nums tracking-tight text-[#0B211B]">{session.date}</span>
        {session.incident ? (
          <Chip intent="warning" dot className="whitespace-nowrap">
            Incident
          </Chip>
        ) : (
          <Chip intent="success" icon={Check} className="whitespace-nowrap">
            Complete
          </Chip>
        )}
      </div>

      <p className="mt-3 line-clamp-2 text-pretty text-[13px] font-medium leading-relaxed text-[#0B211B]/65">{session.detail}</p>

      <div className="mt-3.5 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {session.note && (
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/[0.1] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-sky-700">
              <FileText className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
              Note sent
            </span>
          )}
          {session.incident && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/[0.1] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-emerald-700">
              <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
              Resolved
            </span>
          )}
        </div>
        <span className="flex shrink-0 items-center gap-0.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-700">
          Record
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden />
        </span>
      </div>
    </motion.button>
  )
}
